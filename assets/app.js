/* ============================================================
   PyStart — app logic
   - Pyodide (WebAssembly Python) running in the page
   - lightweight code editor with syntax highlight
   - lesson rendering, runnable examples, auto-graded exercises
   - progress tracking + lesson gating (localStorage)
   ============================================================ */
(function () {
"use strict";

/* ---------------------------------------------------------
   1. Python engine  (Pyodide in a Web Worker)
   Running off the main thread lets us terminate a runaway
   loop by killing the worker, without freezing the page.
   --------------------------------------------------------- */
const Engine = {
  worker: null,
  ready: false,
  _readyResolve: null,
  _readyPromise: null,
  _jobId: 0,
  _pending: null,     // { id, resolve, timer } for the in-flight run
  _queue: Promise.resolve(),

  setStatus(state, label) {
    const elx = document.getElementById("engineStatus");
    if (!elx) return;
    elx.className = "engine-status " + (state || "");
    elx.querySelector(".engine-label").textContent = label;
  },

  _spawn() {
    this.ready = false;
    this._readyPromise = new Promise((res) => { this._readyResolve = res; });
    this.worker = new Worker("assets/py-worker.js", { type: "module" });
    this.worker.onmessage = (e) => this._onMessage(e.data || {});
    this.worker.onerror = (e) => {
      this.setStatus("err", "Python engine error — see console");
      console.error("py-worker error:", e.message || e);
    };
  },

  _onMessage(m) {
    if (m.type === "ready") {
      this.ready = true;
      this.setStatus("ready", "Python engine: ready ✓");
      if (this._readyResolve) this._readyResolve();
      return;
    }
    if (m.type === "error" && m.fatal) {
      this.setStatus("err", "Python engine failed to load — check your connection");
      console.error(m.error);
      return;
    }
    if (m.type === "result" && this._pending && m.id === this._pending.id) {
      const p = this._pending;
      this._pending = null;
      clearTimeout(p.timer);
      p.resolve({ ok: m.ok, stdout: m.stdout || "", error: m.error || null, timedOut: false });
    }
  },

  init() {
    if (!this.worker) {
      this.setStatus("", "Python engine: starting…");
      this._spawn();
    }
    return this._readyPromise;
  },

  /* run `code`; returns {ok, stdout, error, timedOut} — serialised, one at a time */
  run(code, opts) {
    opts = opts || {};
    const timeoutMs = (opts.timeout || 10) * 1000;
    const job = () => new Promise((resolve) => {
      this.init().then(() => {
        const id = ++this._jobId;
        const timer = setTimeout(() => {
          // runaway job: kill the worker and start a fresh one
          if (this._pending && this._pending.id === id) {
            this._pending = null;
            try { this.worker.terminate(); } catch (_) {}
            this.setStatus("", "Python engine: restarting after a long-running program…");
            this._spawn();
            resolve({
              ok: false, stdout: "",
              error: "Stopped: your program ran longer than " + (timeoutMs / 1000) +
                     " seconds. Look for a loop whose condition never becomes False.",
              timedOut: true,
            });
          }
        }, timeoutMs);
        this._pending = { id, resolve, timer };
        this.worker.postMessage({ type: "run", id, code, stdin: opts.stdin || "" });
      });
    });
    // chain so runs never overlap on the single worker
    const p = this._queue.then(job, job);
    this._queue = p.catch(() => {});
    return p;
  },
};

/* ---------------------------------------------------------
   2. Syntax highlight (decorative overlay)
   --------------------------------------------------------- */
const PY_KW = new Set(("False None True and as assert async await break class continue def del " +
  "elif else except finally for from global if import in is lambda nonlocal not or pass raise " +
  "return try while with yield match case").split(" "));
const PY_BIF = new Set(("print input len range int str float bool list tuple set dict type abs round " +
  "min max sum sorted reversed enumerate zip map filter open help id isinstance format repr " +
  "ord chr divmod pow all any next iter").split(" "));

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightPy(src) {
  const esc = escapeHtml(src);
  const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
  return esc.replace(re, (m, com, str, num, word) => {
    if (com) return `<span class="tok-com">${com}</span>`;
    if (str) return `<span class="tok-str">${str}</span>`;
    if (num) return `<span class="tok-num">${num}</span>`;
    if (word) {
      if (PY_KW.has(word)) return `<span class="tok-kw">${word}</span>`;
      if (PY_BIF.has(word)) return `<span class="tok-bif">${word}</span>`;
    }
    return m;
  });
}

/* ---------------------------------------------------------
   3. Code editor component (with VS Code-style autocomplete)
   --------------------------------------------------------- */
const PAIR_OPEN = { "(": ")", "[": "]", "{": "}" };
const PAIR_QUOTE = { '"': '"', "'": "'" };
const PAIR_CLOSE = new Set([")", "]", "}", '"', "'"]);

const PY_MEMBERS = ("append insert pop remove sort reverse count index copy clear extend " +
  "keys values items get update setdefault add discard union intersection difference " +
  "upper lower strip lstrip rstrip replace split rsplit splitlines join title capitalize " +
  "startswith endswith find rfind format isdigit isalpha isalnum isspace isupper islower " +
  "zfill center ljust rjust").split(" ");

function makeEditor(mount, initial) {
  const scroll = el("div", "editor-scroll");
  const hl = el("pre", "editor-hl");
  const ta = el("textarea", "editor-ta");
  ta.spellcheck = false;
  ta.autocapitalize = "off";
  ta.setAttribute("autocomplete", "off");
  ta.setAttribute("autocorrect", "off");
  ta.setAttribute("wrap", "off");
  ta.value = initial || "";

  const gutter = el("div", "gutter");

  const wrap = el("div", "editor");
  wrap.appendChild(gutter);
  scroll.appendChild(hl);
  scroll.appendChild(ta);
  wrap.appendChild(scroll);
  mount.appendChild(wrap);

  /* ---- autocomplete popup ---- */
  const pop = el("div", "ac-pop");
  pop.style.display = "none";
  document.body.appendChild(pop);
  let acItems = [], acSel = 0;

  function hideAC() { pop.style.display = "none"; acItems = []; }

  function caretXY() {
    const r = ta.getBoundingClientRect();
    const cs = getComputedStyle(ta);
    const mir = document.createElement("div");
    ["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "tabSize",
     "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
     "borderTopWidth", "borderLeftWidth"].forEach((p) => { mir.style[p] = cs[p]; });
    mir.style.position = "fixed";
    mir.style.visibility = "hidden";
    mir.style.whiteSpace = "pre";
    mir.style.left = r.left + "px";
    mir.style.top = r.top + "px";
    mir.textContent = ta.value.slice(0, ta.selectionStart);
    const marker = document.createElement("span");
    marker.textContent = "​";
    mir.appendChild(marker);
    document.body.appendChild(mir);
    const mx = marker.offsetLeft, my = marker.offsetTop;
    document.body.removeChild(mir);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
    return { x: r.left + mx - ta.scrollLeft, y: r.top + my - ta.scrollTop, lh };
  }

  function renderAC() {
    if (!acItems.length) { hideAC(); return; }
    pop.innerHTML = acItems.map((it, i) =>
      `<div class="ac-item${i === acSel ? " sel" : ""}" data-i="${i}">` +
      `<span>${it.w}</span><span class="ac-kind">${it.k}</span></div>`).join("");
    const xy = caretXY();
    const maxL = window.innerWidth - 190;
    pop.style.left = Math.max(6, Math.min(xy.x, maxL)) + "px";
    pop.style.top = (xy.y + xy.lh + 3) + "px";
    pop.style.display = "block";
    const selEl = pop.querySelector(".ac-item.sel");
    if (selEl) selEl.scrollIntoView({ block: "nearest" });
  }

  function refreshAC() {
    if (ta.selectionStart !== ta.selectionEnd) { hideAC(); return; }
    const before = ta.value.slice(0, ta.selectionStart);
    const tok = (before.match(/[A-Za-z_]\w*$/) || [""])[0];
    if (tok.length < 1) { hideAC(); return; }
    const member = before[before.length - tok.length - 1] === ".";
    let pool;
    if (member) {
      pool = PY_MEMBERS.map((w) => ({ w, k: "method" }));
    } else {
      const ids = new Set();
      (ta.value.match(/[A-Za-z_]\w*/g) || []).forEach((w) => {
        if (w !== tok && !PY_KW.has(w) && !PY_BIF.has(w)) ids.add(w);
      });
      pool = [].concat(
        [...PY_KW].map((w) => ({ w, k: "keyword" })),
        [...PY_BIF].map((w) => ({ w, k: "builtin" })),
        [...ids].map((w) => ({ w, k: "name" }))
      );
    }
    const lt = tok.toLowerCase();
    const seen = new Set();
    acItems = pool
      .filter((it) => it.w.toLowerCase().startsWith(lt) && it.w !== tok)
      .filter((it) => (seen.has(it.w) ? false : seen.add(it.w)))
      .sort((a, b) => (a.w.startsWith(tok) - b.w.startsWith(tok)) || a.w.length - b.w.length || a.w.localeCompare(b.w))
      .slice(0, 8);
    acSel = 0;
    renderAC();
  }

  function acceptAC(i) {
    const it = acItems[i];
    if (!it) return;
    const caret = ta.selectionStart;
    const before = ta.value.slice(0, caret);
    const tok = (before.match(/[A-Za-z_]\w*$/) || [""])[0];
    const s0 = caret - tok.length;
    ta.value = ta.value.slice(0, s0) + it.w + ta.value.slice(caret);
    ta.selectionStart = ta.selectionEnd = s0 + it.w.length;
    hideAC();
    render();
    ta.focus();
  }

  pop.addEventListener("mousedown", (e) => {
    const row = e.target.closest(".ac-item");
    if (row) { e.preventDefault(); acceptAC(+row.dataset.i); }
  });

  function render() {
    const val = ta.value;
    hl.innerHTML = highlightPy(val) + "\n";
    const n = Math.max(1, val.split("\n").length);
    let g = "";
    for (let i = 1; i <= n; i++) g += i + "\n";
    gutter.textContent = g;
    // size by row count — reliable even while the editor is still detached
    ta.rows = n;
  }
  function sync() {
    const top = ta.scrollTop || scroll.scrollTop;
    hl.scrollTop = top;
    hl.scrollLeft = ta.scrollLeft;
    gutter.style.transform = "translateY(" + (-top) + "px)";
    if (pop.style.display !== "none") renderAC();
  }

  ta.addEventListener("input", () => { render(); refreshAC(); });
  ta.addEventListener("scroll", sync);
  scroll.addEventListener("scroll", sync);
  ta.addEventListener("blur", () => setTimeout(hideAC, 120));
  ta.addEventListener("keydown", (e) => {
    if (pop.style.display !== "none" && acItems.length) {
      if (e.key === "ArrowDown") { acSel = (acSel + 1) % acItems.length; renderAC(); e.preventDefault(); return; }
      if (e.key === "ArrowUp") { acSel = (acSel - 1 + acItems.length) % acItems.length; renderAC(); e.preventDefault(); return; }
      if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); acceptAC(acSel); return; }
      if (e.key === "Escape") { hideAC(); e.preventDefault(); return; }
    }

    /* ---- auto-close / auto-pair brackets and quotes ---- */
    {
      const ss = ta.selectionStart, ee = ta.selectionEnd, s = ta.value;
      const k = e.key;
      const nextCh = s[ee] || "";
      const prevCh = s[ss - 1] || "";
      const setVal = (val, a, b) => { ta.value = val; ta.selectionStart = a; ta.selectionEnd = b == null ? a : b; hideAC(); render(); };

      // type a closer that's already there -> just step over it
      if (ss === ee && PAIR_CLOSE.has(k) && nextCh === k) {
        e.preventDefault(); ta.selectionStart = ta.selectionEnd = ss + 1; hideAC(); return;
      }
      // opening bracket -> insert the pair (or wrap the selection)
      if (PAIR_OPEN[k]) {
        e.preventDefault();
        const sel = s.slice(ss, ee), close = PAIR_OPEN[k];
        setVal(s.slice(0, ss) + k + sel + close + s.slice(ee), ss + 1, sel ? ee + 1 : ss + 1);
        return;
      }
      // quote -> wrap selection, or pair when not in the middle of a word
      // (so apostrophes in words still work, but string prefixes f"" r"" b"" do pair)
      if (PAIR_QUOTE[k]) {
        const sel = s.slice(ss, ee);
        if (sel) {
          e.preventDefault();
          setVal(s.slice(0, ss) + k + sel + k + s.slice(ee), ss + 1, ee + 1);
          return;
        }
        const wordBefore = (s.slice(0, ss).match(/[A-Za-z_]\w*$/) || [""])[0];
        const touchingWord = (wordBefore !== "" && !/^[rbfu]{1,2}$/i.test(wordBefore)) || /\w/.test(nextCh);
        if (!touchingWord && prevCh !== k) {
          e.preventDefault();
          setVal(s.slice(0, ss) + k + k + s.slice(ee), ss + 1);
          return;
        }
        // otherwise fall through to normal single-character insertion
      }
      if (k === "Backspace" && ss === ee && ss > 0) {
        const p = s[ss - 1], n = s[ss];
        // inside an empty pair -> remove both halves
        if ((PAIR_OPEN[p] && PAIR_OPEN[p] === n) || (PAIR_QUOTE[p] && p === n)) {
          e.preventDefault();
          setVal(s.slice(0, ss - 1) + s.slice(ss + 1), ss - 1);
          return;
        }
        // in the leading indent -> delete a whole 4-space step, not one space
        const lineStart = s.lastIndexOf("\n", ss - 1) + 1;
        const before = s.slice(lineStart, ss);
        if (before.length && /^ +$/.test(before)) {
          e.preventDefault();
          const remove = ((before.length - 1) % 4) + 1;
          setVal(s.slice(0, ss - remove) + s.slice(ss), ss - remove);
          return;
        }
      }
      // Enter between an open/close pair -> expand into an indented block
      if (k === "Enter" && ss === ee) {
        const p = s[ss - 1], n = s[ss];
        if (PAIR_OPEN[p] && PAIR_OPEN[p] === n) {
          e.preventDefault();
          const lineStart = s.lastIndexOf("\n", ss - 1) + 1;
          const indent = (s.slice(lineStart, ss).match(/^\s*/) || [""])[0];
          const mid = "\n" + indent + "    ";
          setVal(s.slice(0, ss) + mid + "\n" + indent + s.slice(ss), ss + mid.length);
          return;
        }
      }
    }

    const start = ta.selectionStart, end = ta.selectionEnd, v = ta.value;
    if (e.key === "Tab") {
      e.preventDefault();
      if (start !== end && v.slice(start, end).includes("\n")) {
        // indent / dedent selected block
        const s0 = v.lastIndexOf("\n", start - 1) + 1;
        const block = v.slice(s0, end);
        let nb;
        if (e.shiftKey) nb = block.replace(/^( {1,4}|\t)/gm, "");
        else nb = block.replace(/^/gm, "    ");
        ta.value = v.slice(0, s0) + nb + v.slice(end);
        ta.selectionStart = s0; ta.selectionEnd = s0 + nb.length;
      } else {
        ta.value = v.slice(0, start) + "    " + v.slice(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
      }
      render();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = v.lastIndexOf("\n", start - 1) + 1;
      const cur = v.slice(lineStart, start);
      let indent = (cur.match(/^\s*/) || [""])[0];
      if (/:\s*$/.test(cur.trim() ? cur : "")) indent += "    ";
      else if (/:\s*$/.test(v.slice(lineStart, start).replace(/\s+$/, ""))) indent += "    ";
      const ins = "\n" + indent;
      ta.value = v.slice(0, start) + ins + v.slice(end);
      ta.selectionStart = ta.selectionEnd = start + ins.length;
      render();
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      const ev = new CustomEvent("run-request", { bubbles: true });
      ta.dispatchEvent(ev);
    }
  });

  render();
  // re-measure once the node is attached / fonts have settled
  requestAnimationFrame(render);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  return {
    get value() { return ta.value; },
    set value(x) { ta.value = x; hideAC(); render(); },
    focus() { ta.focus(); },
    textarea: ta,
  };
}

/* ---------------------------------------------------------
   4. Runnable code cell
   --------------------------------------------------------- */
function detectInput(code) {
  return /(^|[^.\w])input\s*\(/.test(code);
}

function askForStdin(codePreview) {
  return new Promise((resolve) => {
    const backdrop = document.getElementById("inputModal");
    const txt = document.getElementById("inputModalText");
    const runBtn = document.getElementById("inputModalRun");
    const cancelBtn = document.getElementById("inputModalCancel");
    txt.value = "";
    backdrop.hidden = false;
    setTimeout(() => txt.focus(), 30);
    function done(val) {
      backdrop.hidden = true;
      runBtn.removeEventListener("click", ok);
      cancelBtn.removeEventListener("click", no);
      resolve(val);
    }
    function ok() { done(txt.value); }
    function no() { done(null); }
    runBtn.addEventListener("click", ok);
    cancelBtn.addEventListener("click", no);
  });
}

/* opts: {title, code, stdin, minimal} */
function makeCodeCell(opts) {
  opts = opts || {};
  const cell = el("div", "cell");
  const bar = el("div", "cell-bar");
  bar.innerHTML = `<span class="cell-title">${opts.title || "Python"}</span><span class="spacer"></span><span>▶ Run to see output</span>`;
  cell.appendChild(bar);

  const edMount = el("div");
  cell.appendChild(edMount);
  const ed = makeEditor(edMount, (opts.code || "").replace(/\s+$/, ""));

  const actions = el("div", "cell-actions");
  const runBtn = el("button", "primary-btn");
  runBtn.textContent = "▶ Run";
  const resetBtn = el("button", "subtle-btn");
  resetBtn.textContent = "↺ Reset";
  actions.appendChild(runBtn);
  actions.appendChild(resetBtn);
  const hintSpan = el("span");
  hintSpan.style.cssText = "font-size:12px;color:var(--muted);margin-left:auto";
  hintSpan.innerHTML = 'Tip: <span class="kbd">Ctrl</span>+<span class="kbd">Enter</span> runs';
  actions.appendChild(hintSpan);
  cell.appendChild(actions);

  const cons = el("div", "console");
  cell.appendChild(cons);

  const original = opts.code || "";
  resetBtn.addEventListener("click", () => { ed.value = original.replace(/\s+$/, ""); cons.textContent = ""; });

  async function doRun() {
    const code = ed.value;
    let stdin = opts.stdin || "";
    if (detectInput(code) && !stdin) {
      const got = await askForStdin(code);
      if (got === null) return;
      stdin = got;
    }
    runBtn.disabled = true;
    const label = runBtn.textContent;
    runBtn.textContent = "running…";
    cons.innerHTML = '<span class="c-sys">running…</span>';
    const res = await Engine.run(code, { stdin });
    renderConsole(cons, res);
    runBtn.disabled = false;
    runBtn.textContent = label;
  }
  runBtn.addEventListener("click", doRun);
  cell.addEventListener("run-request", doRun);

  cell._editor = ed;
  return cell;
}

/* Map a common Python traceback to one plain-language sentence. Returns HTML or null. */
function annotateError(txt) {
  if (!txt) return null;
  const rules = [
    [/NameError: name '([^']+)' is not defined/, (m) =>
      `Python doesn't recognise <code>${escapeHtml(m[1])}</code>. Check the spelling, make sure it's created <i>before</i> this line, and that any text has quotes around it.`],
    [/(IndentationError|TabError)/, () =>
      `Indentation is off. Every line inside an <code>if</code> / <code>for</code> / <code>def</code> must be indented the same amount — 4 spaces — and don't mix tabs with spaces.`],
    [/(unterminated string literal|EOL while scanning string literal)/, () =>
      `A string is missing its closing quote.`],
    [/SyntaxError: .*was never closed/, () =>
      `Something was opened and never closed — look for a missing <code>)</code>, <code>]</code> or <code>}</code>.`],
    [/SyntaxError: .*expected ':'/, () =>
      `A block header (<code>if</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>) needs a colon <code>:</code> at the end of the line.`],
    [/'NoneType' object is not (subscriptable|iterable|callable)/, () =>
      `A value is <code>None</code> where data was expected — often a function that finished without a <code>return</code>.`],
    [/'(\w+)' object is not subscriptable/, (m) =>
      `You used <code>[ ]</code> indexing on a <code>${escapeHtml(m[1])}</code>. That works on strings, lists, tuples and dicts — not <code>${escapeHtml(m[1])}</code>.`],
    [/(can only concatenate str|unsupported operand type\(s\) for .*: 'str' and 'int'|must be str, not int|can't multiply sequence by non-int)/, () =>
      `You're mixing text and numbers in one expression. Convert first with <code>str(...)</code> or <code>int(...)</code>.`],
    [/missing \d+ required positional argument|takes \d+ positional arguments? but \d+/, () =>
      `A function call has the wrong number of arguments — compare it with the function's <code>def</code> line.`],
    [/IndexError: (list|string|tuple) index out of range/, () =>
      `You asked for an item past the end. Valid indexes run from <code>0</code> to <code>len(x) - 1</code>.`],
    [/KeyError: (.+)/, (m) =>
      `The dictionary has no key <code>${escapeHtml(m[1].trim())}</code>. Check the spelling, or use <code>d.get(key, default)</code> for a safe lookup.`],
    [/ZeroDivisionError/, () =>
      `Something was divided by zero. Guard the divisor with an <code>if</code> before dividing.`],
    [/RecursionError/, () =>
      `A function keeps calling itself without hitting a base case that stops it.`],
    [/ModuleNotFoundError: No module named '([^']+)'/, (m) =>
      `The module <code>${escapeHtml(m[1])}</code> isn't available in this in-browser Python. Most of the standard library works; packages you'd normally <code>pip install</code> don't.`],
    [/AttributeError: '?(\w+)'? object has no attribute '(\w+)'/, (m) =>
      `A <code>${escapeHtml(m[1])}</code> has no <code>.${escapeHtml(m[2])}</code>. Check the method name and what type the variable actually holds.`],
    [/invalid literal for int\(\) with base 10: (.+)/, (m) =>
      `<code>int()</code> was given text that isn't a whole number: ${escapeHtml(m[1].trim())}.`],
    [/(not enough|too many) values to unpack/, () =>
      `The names on the left of <code>=</code> don't match the number of values on the right.`],
    [/SyntaxError: invalid syntax/, () =>
      `Python got confused here. Look just <i>before</i> the marked spot for a missing <code>:</code>, <code>,</code>, <code>)</code> or a typo.`],
  ];
  for (const [re, fn] of rules) {
    const m = txt.match(re);
    if (m) return fn(m);
  }
  return null;
}

function renderConsole(cons, res) {
  cons.innerHTML = "";
  const out = (res.stdout || "").replace(/\n+$/, "");
  if (out) {
    const pre = document.createTextNode(out + "\n");
    cons.appendChild(pre);
  }
  if (res.error) {
    const e = el("span", "c-err");
    e.textContent = res.error + "\n";
    cons.appendChild(e);
    const hint = res.timedOut ? null : annotateError(res.error);
    if (hint) {
      const h = el("div", "err-hint");
      h.innerHTML = "<b>Hint:</b> " + hint;
      cons.appendChild(h);
    }
  }
  if (!out && !res.error) {
    const s = el("span", "c-sys");
    s.textContent = "(no output — this program didn't print anything)";
    cons.appendChild(s);
  }
}

/* ---------------------------------------------------------
   5. Progress store
   --------------------------------------------------------- */
const KEY = "pystart.progress.v1";
const Progress = {
  data: load(),
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) {} },
  exDone(lessonId, exIdx) { return !!(this.data[lessonId] && this.data[lessonId].ex && this.data[lessonId].ex[exIdx]); },
  markEx(lessonId, exIdx) {
    this.data[lessonId] = this.data[lessonId] || { ex: {} };
    this.data[lessonId].ex = this.data[lessonId].ex || {};
    this.data[lessonId].ex[exIdx] = true;
    this.save();
  },
  lessonComplete(lesson) {
    const st = this.data[lesson.id];
    if (!st || !st.ex) return lesson.exercises.length === 0;
    for (let i = 0; i < lesson.exercises.length; i++) if (!st.ex[i]) return false;
    return true;
  },
  reset() { this.data = {}; this.save(); },
};
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }

function lessonUnlocked(i) {
  if (i <= 0) return true;
  return Progress.lessonComplete(CURRICULUM[i - 1]);
}
function completedCount() {
  return CURRICULUM.filter((l) => Progress.lessonComplete(l)).length;
}
function isCheckpoint(l) { return !!(l && l.kind === "checkpoint"); }
/* displayed lesson number: checkpoints don't take one, so earlier refs like "(L17)" stay accurate */
function lessonNumber(i) {
  if (isCheckpoint(CURRICULUM[i])) return null;
  let n = 0;
  for (let k = 0; k <= i; k++) if (!isCheckpoint(CURRICULUM[k])) n++;
  return n;
}
function regularTotal() { return CURRICULUM.reduce((a, l) => a + (isCheckpoint(l) ? 0 : 1), 0); }
/* tiny markdown: `code` spans only — used in realworld notes */
function mdCode(s) { return String(s == null ? "" : s).replace(/`([^`]+)`/g, "<code>$1</code>"); }

/* ---------------------------------------------------------
   6. Rendering: sidebar, home, lesson, playground
   --------------------------------------------------------- */
function el(tag, cls) { const e = document.createElement(tag); if (cls) e.className = cls; return e; }
const view = document.getElementById("view");

function renderSidebar() {
  const nav = document.getElementById("lessonNav");
  nav.innerHTML = "";
  const homeBtn = el("button", "nav-item");
  homeBtn.innerHTML = `<span class="nav-badge">⌂</span><span><span class="nav-title">Overview</span><br><span class="nav-sub">Start here</span></span>`;
  homeBtn.addEventListener("click", () => { location.hash = "#/"; });
  if (location.hash === "#/" || location.hash === "") homeBtn.classList.add("active");
  nav.appendChild(homeBtn);

  let lastSection = null;
  CURRICULUM.forEach((lesson, i) => {
    if (lesson.section && lesson.section !== lastSection) {
      lastSection = lesson.section;
      const h = el("div", "nav-section");
      h.textContent = lesson.section;
      nav.appendChild(h);
    }
    const b = el("button", "nav-item");
    const unlocked = lessonUnlocked(i);
    const done = Progress.lessonComplete(lesson);
    const cp = isCheckpoint(lesson);
    if (done) b.classList.add("done");
    if (cp) b.classList.add("checkpoint");
    if (location.hash === "#/lesson/" + lesson.id) b.classList.add("active");
    b.disabled = !unlocked;
    const badge = done ? "✓" : (unlocked ? (cp ? "◆" : String(lessonNumber(i))) : "🔒");
    const sub = cp
      ? "Checkpoint · " + lesson.exercises.length + " part" + (lesson.exercises.length === 1 ? "" : "s")
      : lesson.exercises.length + " exercise" + (lesson.exercises.length === 1 ? "" : "s");
    b.innerHTML = `<span class="nav-badge">${badge}</span><span><span class="nav-title">${lesson.title}</span><br><span class="nav-sub">${sub}</span></span>`;
    b.addEventListener("click", () => { if (unlocked) location.hash = "#/lesson/" + lesson.id; });
    nav.appendChild(b);
  });

  const pct = Math.round((completedCount() / CURRICULUM.length) * 100);
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById("progressText").textContent = pct + "% complete · " + completedCount() + "/" + CURRICULUM.length + " done";
}

function renderHome() {
  view.innerHTML = "";
  const SECTION_COUNT = new Set(CURRICULUM.map((l) => l.section)).size;
  const CP_COUNT = CURRICULUM.reduce((a, l) => a + (isCheckpoint(l) ? 1 : 0), 0);
  const hero = el("div", "home-hero");
  hero.innerHTML = `
    <div class="eyebrow">Interactive course</div>
    <h1>Python, from first line to shipping a framework</h1>
    <p>${regularTotal()} hands-on lessons across ${SECTION_COUNT} sections — plus ${CP_COUNT}
    checkpoint projects that make you combine what you've learned. The language fundamentals, data
    structures &amp; algorithms, then the working toolkit: modules, packaging, OOP, environments,
    concurrency, typing, formatters, docs, testing, and web frameworks. Every idea comes with a
    diagram, runnable examples you can edit, "what if?" experiments, and auto-checked exercises on a
    difficulty ramp. Nothing is quizzed before it is taught. Python runs right here in your browser.</p>
    <p style="font-size:13.5px;color:var(--muted)">Fundamentals adapted from
    <a href="https://cs50.harvard.edu/python/" target="_blank" rel="noopener">Harvard CS50’s Introduction to Programming with Python</a>
    and the <a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener">official Python Tutorial</a>;
    later sections draw on the official docs and each tool's own documentation
    (<a href="https://peps.python.org/pep-0008/" target="_blank" rel="noopener">PEP 8</a>,
    <a href="https://docs.pytest.org/" target="_blank" rel="noopener">pytest</a>,
    <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener">FastAPI</a>, and more).</p>
  `;
  view.appendChild(hero);

  let homeSection = null;
  let grid = null;
  CURRICULUM.forEach((lesson, i) => {
    if (lesson.section && lesson.section !== homeSection) {
      homeSection = lesson.section;
      const h = el("h2", "home-section");
      h.textContent = lesson.section;
      view.appendChild(h);
      grid = el("div", "home-grid");
      view.appendChild(grid);
    }
    if (!grid) { grid = el("div", "home-grid"); view.appendChild(grid); }
    const c = el("button", "home-card");
    const unlocked = lessonUnlocked(i);
    const done = Progress.lessonComplete(lesson);
    const cp = isCheckpoint(lesson);
    if (cp) c.classList.add("checkpoint");
    c.disabled = !unlocked;
    const state = done ? '<span class="hc-state done">✓ Completed</span>'
      : unlocked ? `<span class="hc-state open">● ${cp ? "Ready" : "Available"}</span>`
      : '<span class="hc-state locked">🔒 Finish the previous lesson</span>';
    const num = cp ? "Checkpoint" : "Lesson " + lessonNumber(i);
    c.innerHTML = `<div class="hc-num${cp ? " checkpoint" : ""}">${num}</div><div class="hc-title">${lesson.title}</div>
      <div class="hc-desc">${lesson.summary}</div>${state}`;
    c.addEventListener("click", () => { if (unlocked) location.hash = "#/lesson/" + lesson.id; });
    grid.appendChild(c);
  });

  const pgCard = el("div");
  pgCard.style.cssText = "margin-top:26px;padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--panel)";
  pgCard.innerHTML = `<strong>🧪 Playground IDE</strong><p style="margin:6px 0 10px;color:var(--ink-soft);font-size:14px">
    A free coding space with the full Python engine. Great for experimenting with anything you’ve learned.</p>`;
  const goPg = el("button", "primary-btn");
  goPg.textContent = "Open Playground";
  goPg.addEventListener("click", () => { location.hash = "#/playground"; });
  pgCard.appendChild(goPg);
  view.appendChild(pgCard);
}

function renderLesson(id) {
  const i = CURRICULUM.findIndex((l) => l.id === id);
  if (i < 0) { renderHome(); return; }
  if (!lessonUnlocked(i)) { location.hash = "#/"; return; }
  const lesson = CURRICULUM[i];
  view.innerHTML = "";
  view.scrollIntoView({ block: "start" });
  window.scrollTo(0, 0);

  const cp = isCheckpoint(lesson);
  const head = el("div", "lesson-head");
  const eyebrow = cp
    ? `Checkpoint${lesson.section ? " · " + lesson.section : ""}`
    : `${lesson.section ? lesson.section + " · " : ""}Lesson ${lessonNumber(i)} of ${regularTotal()}`;
  head.innerHTML = `<div class="eyebrow">${eyebrow}</div>
    <h1 class="lesson-title">${lesson.title}</h1>
    <p class="lesson-lead">${lesson.lead}</p>`;
  view.appendChild(head);

  const body = el("div", "lesson-body");
  view.appendChild(body);
  // lesson.blocks: array of {type:'html', html} or {type:'code', title, code, stdin}
  lesson.blocks.forEach((blk) => {
    if (blk.type === "code") {
      body.appendChild(makeCodeCell(blk));
    } else {
      const d = el("div");
      d.innerHTML = blk.html;
      // move each child up (so headings sit at body level for spacing)
      while (d.firstChild) body.appendChild(d.firstChild);
    }
  });

  // "Try this for real" — commands to run outside the sandbox (concept lessons)
  if (lesson.realworld) {
    const rw = lesson.realworld;
    const box = el("div", "real-world");
    box.innerHTML = "<b>Try this for real</b>" +
      `<p>${mdCode(rw.blurb) || "On your own machine, with Python installed:"}</p>` +
      `<pre>${escapeHtml((rw.cmds || []).join("\n"))}</pre>` +
      (rw.note ? `<p class="rw-note">${mdCode(rw.note)}</p>` : "");
    body.appendChild(box);
  }

  // References
  if (lesson.refs && lesson.refs.length) {
    const r = el("div", "note");
    r.innerHTML = "<b>Go deeper — reputable sources</b>" +
      "<ul style='margin:6px 0 0'>" +
      lesson.refs.map((x) => `<li><a href="${x.url}" target="_blank" rel="noopener">${x.label}</a></li>`).join("") +
      "</ul>";
    body.appendChild(r);
  }

  // Exercises
  const exWrap = el("div", "exercises");
  const doneN = lesson.exercises.filter((_, k) => Progress.exDone(lesson.id, k)).length;
  const exIntro = cp
    ? `Build the project one part at a time — each part is checked on its own, and later parts reuse the
       shape of the earlier ones. Finish all ${lesson.exercises.length} to unlock what's next.`
    : `They build up: <b>warm-up</b> → <b>practice</b> → <b>challenge</b> → <b>boss</b>,
       and most of them also lean on earlier lessons. If your code produces the right result it <strong>passes</strong>;
       when there's a cleaner, more Pythonic way, a <strong>"level it up"</strong> tip appears with the ✓. A worked solution
       sits at the bottom of each. Pass them all to unlock the next lesson.`;
  exWrap.innerHTML = `<h2>${cp ? "Project" : "Exercises"} <span class="ex-count">${doneN}/${lesson.exercises.length} ${cp ? "done" : "passed"}</span></h2>
    <p style="color:var(--ink-soft);margin-top:-4px">${exIntro}</p>`;
  if (lesson.spiral && lesson.spiral.length) {
    const yn = el("div", "you-need");
    yn.innerHTML = "<b>Keep these fresh — the exercises use them:</b><br>" + lesson.spiral.join(" &nbsp;·&nbsp; ");
    exWrap.appendChild(yn);
  }
  view.appendChild(exWrap);
  lesson.exercises.forEach((ex, k) => exWrap.appendChild(makeExercise(lesson, ex, k)));

  // completion banner + nav
  const banner = el("div", "complete-banner");
  refreshBanner();
  view.appendChild(banner);
  function refreshBanner() {
    if (Progress.lessonComplete(lesson)) {
      banner.className = "complete-banner";
      banner.innerHTML = (i + 1 < CURRICULUM.length)
        ? `✅ <span>${cp ? "Checkpoint" : "Lesson"} complete! <b>${CURRICULUM[i + 1].title}</b> is now unlocked.</span>`
        : `🎉 <span>That’s the whole course — every lesson, every checkpoint. Keep building in the Playground!</span>`;
    } else {
      banner.className = "complete-banner locked";
      banner.innerHTML = `🔒 <span>${cp ? "Finish" : "Pass"} all ${lesson.exercises.length} ${cp ? "parts" : "exercises"} above to unlock the next lesson.</span>`;
    }
  }
  view.addEventListener("ex-passed", () => { refreshBanner(); renderSidebar(); });

  const foot = el("div", "lesson-foot");
  const prev = el("button", "subtle-btn");
  prev.textContent = i > 0 ? "← " + CURRICULUM[i - 1].title : "← Overview";
  prev.addEventListener("click", () => { location.hash = i > 0 ? "#/lesson/" + CURRICULUM[i - 1].id : "#/"; });
  const next = el("button", "primary-btn");
  const canNext = i + 1 < CURRICULUM.length;
  next.textContent = canNext ? CURRICULUM[i + 1].title + " →" : "Finish 🎉";
  next.addEventListener("click", () => {
    if (!canNext) { location.hash = "#/"; return; }
    if (lessonUnlocked(i + 1)) location.hash = "#/lesson/" + CURRICULUM[i + 1].id;
    else alert("Finish this lesson’s exercises first — then the next one opens up.");
  });
  foot.appendChild(prev);
  foot.appendChild(next);
  view.appendChild(foot);
}

const TIERS = {
  warm: { label: "warm-up", cls: "t-warm" },
  core: { label: "practice", cls: "t-core" },
  challenge: { label: "challenge", cls: "t-chal" },
  boss: { label: "boss", cls: "t-boss" },
  project: { label: "project", cls: "t-proj" },
};

function makeExercise(lesson, ex, k) {
  const wrap = el("div", "exercise");
  const passed = Progress.exDone(lesson.id, k);
  const head = el("div", "ex-head");
  const tier = TIERS[ex.tier] || TIERS.core;
  const uses = (ex.uses && ex.uses.length)
    ? `<span class="ex-uses">recalls: ${ex.uses.map((u) => `<span>${u}</span>`).join("")}</span>`
    : "";
  const tag = ex.tier === "project" ? "Part " + (k + 1) : "Exercise " + (k + 1);
  head.innerHTML = `<span class="ex-status ${passed ? "done" : ""}" data-role="status">${passed ? "✓ passed" : ""}</span>
    <span class="ex-tag">${tag}</span><span class="ex-tier ${tier.cls}">${tier.label}</span>
    <h3>${ex.title}</h3>${uses}`;
  wrap.appendChild(head);

  const bodyEl = el("div", "ex-body");
  const prompt = el("div");
  prompt.innerHTML = ex.prompt;
  bodyEl.appendChild(prompt);
  wrap.appendChild(bodyEl);

  const edMount = el("div");
  bodyEl.appendChild(edMount);
  const ed = makeEditor(edMount, (ex.starter || "").replace(/\s+$/, ""));

  const actions = el("div", "cell-actions");
  actions.style.padding = "10px 0 0";
  const runBtn = el("button", "primary-btn"); runBtn.textContent = "▶ Run";
  const checkBtn = el("button", "check-btn"); checkBtn.textContent = "✓ Check answer";
  const resetBtn = el("button", "subtle-btn"); resetBtn.textContent = "↺ Reset";
  actions.appendChild(runBtn); actions.appendChild(checkBtn); actions.appendChild(resetBtn);
  bodyEl.appendChild(actions);

  const cons = el("div", "console"); cons.style.borderRadius = "8px"; cons.style.marginTop = "10px";
  cons.style.border = "1px solid var(--line)";
  bodyEl.appendChild(cons);
  const verdict = el("div", "verdict"); verdict.style.borderRadius = "8px"; verdict.style.marginTop = "8px";
  verdict.style.border = "1px solid var(--line)"; verdict.hidden = true;
  verdict.setAttribute("role", "status"); verdict.setAttribute("aria-live", "polite");
  bodyEl.appendChild(verdict);

  if (ex.solution) {
    const det = el("details", "solution");
    det.innerHTML = `<summary>Show a worked solution</summary><pre>${escapeHtml(ex.solution.trim())}</pre>`;
    bodyEl.appendChild(det);
  }

  resetBtn.addEventListener("click", () => { ed.value = (ex.starter || "").replace(/\s+$/, ""); cons.textContent = ""; verdict.hidden = true; });

  async function collectStdin(code, fallback) {
    if (fallback != null) return fallback;
    if (detectInput(code)) {
      const got = await askForStdin(code);
      return got === null ? null : got;
    }
    return "";
  }

  runBtn.addEventListener("click", async () => {
    const code = ed.value;
    const sIn = await collectStdin(code, (ex.tests && ex.tests[0] && ex.tests[0].stdin) || "");
    if (sIn === null) return;
    runBtn.disabled = true; runBtn.textContent = "running…";
    cons.innerHTML = '<span class="c-sys">running…</span>';
    const res = await Engine.run(code, { stdin: sIn });
    renderConsole(cons, res);
    runBtn.disabled = false; runBtn.textContent = "▶ Run";
  });

  checkBtn.addEventListener("click", async () => {
    checkBtn.disabled = true; checkBtn.textContent = "checking…";
    verdict.hidden = true;
    const result = await gradeExercise(ex, ed.value);
    checkBtn.disabled = false; checkBtn.textContent = "✓ Check answer";
    verdict.hidden = false;
    if (result.pass) {
      verdict.className = "verdict pass";
      verdict.innerHTML = "<b>✓ Correct — nice work!</b> " + (ex.success || "");
      if (result.note) {
        const notes = Array.isArray(result.note) ? result.note : [result.note];
        const nt = el("div", "review-note");
        nt.innerHTML = "<b>It works — now level it up ↗</b>" +
          notes.map((n) => `<p>${n}</p>`).join("");
        verdict.appendChild(nt);
      }
      Progress.markEx(lesson.id, k);
      head.querySelector('[data-role="status"]').textContent = "✓ passed";
      head.querySelector('[data-role="status"]').className = "ex-status done";
      const cnt = view.querySelector(".ex-count");
      if (cnt) {
        const doneN = lesson.exercises.filter((_, x) => Progress.exDone(lesson.id, x)).length;
        cnt.textContent = doneN + "/" + lesson.exercises.length + " passed";
      }
      view.dispatchEvent(new CustomEvent("ex-passed"));
    } else {
      verdict.className = "verdict fail";
      // message is authored in curriculum.js (trusted) — render its HTML like ex.success / notes do
      verdict.innerHTML = "<b>Not yet.</b> " + (result.message || "Output didn’t match what was expected.");
      if (result.diff) {
        const d = el("div", "diff");
        d.textContent = result.diff;
        verdict.appendChild(d);
      }
    }
  });

  return wrap;
}

/* ---------------------------------------------------------
   7. Grading
   --------------------------------------------------------- */
function norm(s) {
  return String(s == null ? "" : s)
    .replace(/\r/g, "")
    .split("\n").map((l) => l.replace(/[ \t]+$/g, "")).join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

/* Grading philosophy: if the learner's code produces the right result for the task,
   it PASSES — full stop. Anything else (works only for the sample, non-idiomatic,
   skipped the intended technique) is collected as friendly guidance shown afterward,
   never a rejection. Only `.hard` requirements and a wrong core result fail. */
async function gradeExercise(ex, code) {
  const advice = [];
  const addAdvice = (m) => { if (m && advice.indexOf(m) === -1) advice.push(m); };

  if (ex.mustDefine) {
    for (const name of ex.mustDefine) {
      if (!new RegExp("(def|class)\\s+" + name + "\\s*[(:]").test(code)) {
        return { pass: false, message: `Define ${name} (a function or class).` };
      }
    }
  }
  if (ex.require) {
    for (const r of ex.require) {
      if (!new RegExp(r.pattern).test(code)) {
        if (r.hard) return { pass: false, message: r.message };
        addAdvice(r.tip || r.message);
      }
    }
  }
  if (ex.forbid) {
    for (const f of ex.forbid) {
      if (new RegExp(f.pattern).test(code)) {
        if (f.hard) return { pass: false, message: f.message };
        addAdvice(f.tip || f.message);
      }
    }
  }

  const tests = ex.tests && ex.tests.length ? ex.tests : [{}];
  for (const t of tests) {
    const advisory = t.advisory === true;   // this test only produces guidance, never a fail
    let full = code + (t.append ? "\n\n" + t.append : "");
    if (t.subst) {
      const pairs = Array.isArray(t.subst[0]) ? t.subst : [t.subst];
      for (const [a, b] of pairs) {
        const rx = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ +/g, "\\s*"), "g");
        full = full.replace(rx, () => b);
      }
    }
    if (t.rewrite) {
      const pairs = Array.isArray(t.rewrite[0]) ? t.rewrite : [t.rewrite];
      // "gm" so patterns can anchor with ^ / $ to a single line (avoids matching e.g.
      // the "3" in `n = 3 * n + 1` when swapping an initial `n = 6`)
      for (const [pat, rep] of pairs) full = full.replace(new RegExp(pat, "gm"), () => rep);
    }
    const res = await Engine.run(full, { stdin: t.stdin != null ? t.stdin : (ex.stdin || "") });

    if (!res.ok) {
      if (advisory) { addAdvice(t.why || "It works for the shown case but raises an error on other inputs — a more general approach would handle them."); continue; }
      return { pass: false, message: "Your code raised an error:", diff: res.error };
    }
    const got = norm(res.stdout);
    let bad = null;

    if (t.expect != null && got !== norm(t.expect)) {
      bad = {
        message: t.why || (t.stdin ? `With input:\n${t.stdin}\nyour output didn’t match.` : "Your output didn’t match what was expected."),
        diff: `expected:\n${norm(t.expect)}\n\nyour output:\n${got || "(nothing)"}`,
      };
    } else if (t.expectContains) {
      const needles = Array.isArray(t.expectContains) ? t.expectContains : [t.expectContains];
      for (const n of needles) {
        if (!got.includes(norm(n))) { bad = { message: `Expected the output to contain "${n}".`, diff: `your output:\n${got || "(nothing)"}` }; break; }
      }
    } else if (t.expectMatch && !new RegExp(t.expectMatch, "m").test(got)) {
      bad = { message: "Output wasn’t in the expected shape.", diff: `your output:\n${got || "(nothing)"}` };
    } else if (t.check && !got.includes("__PASS__")) {
      bad = { message: t.checkMessage || "An automated check on your code failed.", diff: `your output:\n${got || "(nothing)"}` };
    }

    if (bad) {
      if (advisory) { addAdvice(t.why || bad.message); continue; }
      return { pass: false, message: bad.message, diff: bad.diff };
    }
  }

  // passed — collect idiom nudges
  if (ex.review) {
    for (const r of ex.review) {
      if (new RegExp(r.pattern).test(code)) addAdvice(r.tip);
    }
  }
  return { pass: true, note: advice.length ? advice : null };
}

/* ---------------------------------------------------------
   8. Playground
   --------------------------------------------------------- */
function renderPlayground() {
  view.innerHTML = "";
  window.scrollTo(0, 0);
  const w = el("div", "pg-wrap");
  w.innerHTML = `<div class="eyebrow">Sandbox</div><h1>Playground IDE</h1>
    <p class="lesson-lead">Write and run any Python here. If your program calls <code>input()</code>,
    you’ll be asked to supply the responses first.</p>`;
  view.appendChild(w);
  const cell = makeCodeCell({
    title: "main.py",
    code: PLAYGROUND_SAMPLE,
  });
  cell.classList.add("pg-cell");
  view.appendChild(cell);
  const back = el("button", "subtle-btn");
  back.textContent = "← Back to Overview";
  back.style.marginTop = "18px";
  back.addEventListener("click", () => { location.hash = "#/"; });
  view.appendChild(back);
}
const PLAYGROUND_SAMPLE = "";

/* ---------------------------------------------------------
   8b. Reference card — a syntax cheat-sheet that grows as
       lessons unlock (reads lesson.card)
   --------------------------------------------------------- */
function renderReference() {
  view.innerHTML = "";
  window.scrollTo(0, 0);
  const head = el("div");
  head.innerHTML = `<div class="eyebrow">Cheat sheet</div><h1>Reference card</h1>
    <p class="ref-intro">A quick syntax reminder for everything you've unlocked so far. It fills in
    as you complete lessons — nothing here you haven't been taught.</p>`;
  view.appendChild(head);

  let any = false, lastSection = null;
  CURRICULUM.forEach((lesson, i) => {
    if (isCheckpoint(lesson) || !lesson.card || !lessonUnlocked(i)) return;
    any = true;
    if (lesson.section !== lastSection) {
      lastSection = lesson.section;
      const h = el("div", "ref-section");
      h.textContent = lesson.section;
      view.appendChild(h);
    }
    const card = el("div", "ref-card");
    card.innerHTML = `<h3>${lesson.title}</h3><p class="ref-sum">${lesson.summary}</p>` +
      `<pre>${escapeHtml(lesson.card)}</pre>`;
    view.appendChild(card);
  });
  if (!any) {
    const p = el("p", "ref-locked");
    p.textContent = "Finish a lesson and its syntax summary shows up here.";
    view.appendChild(p);
  }
  const back = el("button", "subtle-btn");
  back.textContent = "← Back to Overview";
  back.style.marginTop = "18px";
  back.addEventListener("click", () => { location.hash = "#/"; });
  view.appendChild(back);
}

/* ---------------------------------------------------------
   8c. Review mode — reshuffled practice from already-passed
       exercises across the whole course
   --------------------------------------------------------- */
function renderReview() {
  view.innerHTML = "";
  window.scrollTo(0, 0);
  const head = el("div");
  head.innerHTML = `<div class="eyebrow">Spaced practice</div><h1>Review mode</h1>
    <p class="ref-intro">A shuffled set drawn from exercises you've already passed — anywhere in the
    course. Nothing here changes your progress; it's just to keep the earlier skills sharp.</p>`;
  view.appendChild(head);

  const pool = [];
  CURRICULUM.forEach((lesson, i) => {
    if (isCheckpoint(lesson) || !lessonUnlocked(i)) return;
    lesson.exercises.forEach((ex, k) => {
      if (Progress.exDone(lesson.id, k)) pool.push({ lesson, ex, k });
    });
  });

  if (pool.length < 3) {
    const p = el("p", "ref-locked");
    p.textContent = "Pass at least 3 exercises first — then there's something to review.";
    view.appendChild(p);
    const back0 = el("button", "subtle-btn");
    back0.textContent = "← Back to Overview";
    back0.style.marginTop = "16px";
    back0.addEventListener("click", () => { location.hash = "#/"; });
    view.appendChild(back0);
    return;
  }

  const controls = el("div", "review-controls");
  const sizeSel = el("select");
  [5, 8, 12].forEach((n) => {
    const o = el("option"); o.value = String(n); o.textContent = n + " exercises"; sizeSel.appendChild(o);
  });
  const scopeSel = el("select");
  const secs = [];
  pool.forEach((p) => { if (!secs.includes(p.lesson.section)) secs.push(p.lesson.section); });
  { const o = el("option"); o.value = "*"; o.textContent = "All sections"; scopeSel.appendChild(o); }
  secs.forEach((s) => { const o = el("option"); o.value = s; o.textContent = s; scopeSel.appendChild(o); });
  const shuffleBtn = el("button", "primary-btn");
  shuffleBtn.textContent = "↻ New set";
  const tally = el("div", "review-tally");
  controls.appendChild(sizeSel);
  controls.appendChild(scopeSel);
  controls.appendChild(shuffleBtn);
  controls.appendChild(tally);
  view.appendChild(controls);

  const host = el("div");
  view.appendChild(host);
  let roundPassed = 0;

  function draw() {
    host.innerHTML = "";
    roundPassed = 0;
    const scope = scopeSel.value;
    const cand = pool.filter((p) => scope === "*" || p.lesson.section === scope).slice();
    for (let x = cand.length - 1; x > 0; x--) {
      const j = Math.floor(Math.random() * (x + 1));
      const tmp = cand[x]; cand[x] = cand[j]; cand[j] = tmp;
    }
    const pick = cand.slice(0, parseInt(sizeSel.value, 10));
    tally.textContent = `0 / ${pick.length} this round`;
    pick.forEach(({ lesson, ex, k }) => {
      const node = makeExercise(lesson, ex, k);
      const origin = el("div", "review-origin");
      origin.textContent = "from " + lesson.title + (isCheckpoint(lesson) ? " (checkpoint)" : "");
      const b = node.querySelector(".ex-body");
      if (b) b.appendChild(origin);
      host.appendChild(node);
    });
  }
  view.addEventListener("ex-passed", () => {
    if (location.hash !== "#/review") return;
    roundPassed++;
    const total = host.querySelectorAll(".exercise").length;
    tally.textContent = `${roundPassed} / ${total} this round`;
  });
  shuffleBtn.addEventListener("click", draw);
  sizeSel.addEventListener("change", draw);
  scopeSel.addEventListener("change", draw);
  draw();

  const back = el("button", "subtle-btn");
  back.textContent = "← Back to Overview";
  back.style.marginTop = "18px";
  back.addEventListener("click", () => { location.hash = "#/"; });
  view.appendChild(back);
}

/* ---------------------------------------------------------
   8d. Progress export / import (a single JSON file)
   --------------------------------------------------------- */
function exportProgress() {
  const payload = { app: "pystart", v: 1, savedAt: new Date().toISOString(), data: Progress.data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pystart-progress.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
}
function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let data = null;
    try {
      const parsed = JSON.parse(reader.result);
      if (parsed && parsed.data && typeof parsed.data === "object") data = parsed.data;
      else if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) data = parsed;
    } catch (e) { /* fall through */ }
    // shape check: an object whose every value is itself an object shaped like { ex: {...} }
    const looksOk = data && typeof data === "object" && !Array.isArray(data) &&
      Object.keys(data).every((k) => {
        const v = data[k];
        return v && typeof v === "object" && !Array.isArray(v) &&
          (v.ex == null || (typeof v.ex === "object" && !Array.isArray(v.ex)));
      });
    if (!looksOk) { alert("That file doesn't look like a PyStart progress export."); return; }
    if (!confirm("Replace your current progress with the contents of this file?")) return;
    Progress.data = data;
    Progress.save();
    route();
    alert("Progress imported.");
  };
  reader.readAsText(file);
}

/* ---------------------------------------------------------
   9. Router + boot
   --------------------------------------------------------- */
function route() {
  document.querySelectorAll(".ac-pop").forEach((n) => n.remove()); // drop popups from the previous view
  const h = location.hash || "#/";
  if (h.startsWith("#/lesson/")) renderLesson(h.slice("#/lesson/".length));
  else if (h === "#/playground") renderPlayground();
  else if (h === "#/reference") renderReference();
  else if (h === "#/review") renderReview();
  else renderHome();
  renderSidebar();
}
window.addEventListener("hashchange", route);

document.getElementById("playgroundBtn").addEventListener("click", () => { location.hash = "#/playground"; });
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Erase all saved progress and start over?")) { Progress.reset(); route(); }
});
(function wireExtras() {
  const on = (id, fn) => { const b = document.getElementById(id); if (b) b.addEventListener("click", fn); };
  on("reviewBtn", () => { location.hash = "#/review"; });
  on("referenceBtn", () => { location.hash = "#/reference"; });
  on("exportBtn", exportProgress);
  const fileInput = document.getElementById("importFile");
  on("importBtn", () => { if (fileInput) fileInput.click(); });
  if (fileInput) fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) importProgress(fileInput.files[0]);
    fileInput.value = "";
  });
})();
const themeBtn = document.getElementById("themeBtn");
function applyTheme(t) {
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
let theme = null;
try { theme = localStorage.getItem("pystart.theme"); } catch (e) {}
applyTheme(theme);
themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const nextT = cur === "dark" ? "light" : "dark";
  applyTheme(nextT);
  try { localStorage.setItem("pystart.theme", nextT); } catch (e) {}
});

route();
Engine.init();

/* ---------------------------------------------------------
   10. Dev-only: grader self-test.
   Confirms every reference solution PASSES and every
   `antisolutions` entry FAILS. Run from the console:
   await window.__pystart.selfTest()          // whole course
   await window.__pystart.selfTest({only:"letter-grade"})
   --------------------------------------------------------- */
async function selfTest(opts) {
  opts = opts || {};
  const only = opts.only ? new Set([].concat(opts.only)) : null;
  const rep = { checked: 0, solutionsOK: 0, solutionsFailed: [], antiChecked: 0, antiOK: 0, antiLeaked: [] };
  for (const l of CURRICULUM) {
    if (only && !only.has(l.id)) continue;
    for (let k = 0; k < l.exercises.length; k++) {
      const ex = l.exercises[k];
      if (!ex.solution) continue;
      rep.checked++;
      let r;
      try { r = await gradeExercise(ex, ex.solution); }
      catch (e) { rep.solutionsFailed.push(`${l.id} #${k + 1} "${ex.title}" — threw ${e}`); continue; }
      if (r.pass) rep.solutionsOK++;
      else rep.solutionsFailed.push(`${l.id} #${k + 1} "${ex.title}" — ${r.message || "did not pass"}`);
      for (const anti of (ex.antisolutions || [])) {
        rep.antiChecked++;
        let ar;
        try { ar = await gradeExercise(ex, anti.code); }
        catch (e) { rep.antiOK++; continue; }
        if (!ar.pass) rep.antiOK++;
        else rep.antiLeaked.push(`${l.id} #${k + 1} "${ex.title}" — WRONG code passed (${anti.why})`);
      }
    }
  }
  rep.ok = rep.solutionsFailed.length === 0 && rep.antiLeaked.length === 0;
  return rep;
}

/* minimal debug hook */
window.__pystart = { Engine, gradeExercise, CURRICULUM, Progress, selfTest };
})();
