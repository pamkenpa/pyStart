/* ============================================================
   PyStart — Python worker  (ES module worker)
   Runs Pyodide (CPython -> WebAssembly) off the main thread so a
   student's infinite loop can be terminated without freezing the tab.
   Pyodide is vendored in assets/pyodide/ so everything loads same-origin.
   ============================================================ */
import { loadPyodide } from "./pyodide/pyodide.mjs";

let pyodide = null;
let stdinLines = [];
let stdinPos = 0;

const ready = (async () => {
  pyodide = await loadPyodide({ indexURL: "./pyodide/" });
  pyodide.setStdin({
    stdin: () => {
      if (stdinPos < stdinLines.length) return stdinLines[stdinPos++] + "\n";
      return null; // EOF -> input() raises EOFError
    },
  });
  postMessage({ type: "ready" });
})().catch((err) => {
  postMessage({ type: "error", fatal: true, error: String((err && err.message) || err) });
});

self.onmessage = async (e) => {
  const msg = e.data || {};
  if (msg.type !== "run") return;
  const { id, code, stdin } = msg;

  await ready;
  if (!pyodide) {
    postMessage({ type: "result", id, ok: false, stdout: "", error: "Python engine unavailable." });
    return;
  }

  stdinLines = (stdin != null && stdin !== "") ? String(stdin).replace(/\r/g, "").split("\n") : [];
  stdinPos = 0;

  let out = "";
  pyodide.setStdout({ batched: (s) => { out += s + "\n"; } });
  pyodide.setStderr({ batched: (s) => { out += s + "\n"; } });

  try {
    const ns = pyodide.runPython("dict()");     // fresh namespace per run
    await pyodide.runPythonAsync(code, { globals: ns });
    try { ns.destroy(); } catch (_) {}
    postMessage({ type: "result", id, ok: true, stdout: out, error: null });
  } catch (err) {
    postMessage({ type: "result", id, ok: false, stdout: out, error: cleanTraceback(String((err && err.message) || err)) });
  }
};

function cleanTraceback(raw) {
  const idx = raw.lastIndexOf("Traceback (most recent call last):");
  let t = idx >= 0 ? raw.slice(idx) : raw;
  t = t.split("\n").filter((ln) => !/[/\\]lib[/\\]python3|pyodide\/_base|eval_code|runPythonAsync|coroutine/.test(ln)).join("\n");
  t = t.replace(/File "<exec>", line (\d+)/g, "line $1");
  return t.trim();
}
