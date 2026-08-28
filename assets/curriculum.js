/* ============================================================
   PyStart curriculum
   Ordered so every lesson only relies on earlier ones.
   Each lesson: { id, title, summary, lead, spiral[], blocks[], refs[], exercises[] }
     blocks: { type:"html", html }  |  { type:"code", title, code, stdin? }
     exercise: { title, tier:"warm|core|challenge|boss", uses:[...], prompt, starter,
                 solution, success, mustDefine[], require[], forbid[], review[], stdin,
                 tests:[ { stdin, append, subst, rewrite, advisory,
                           expect | expectContains | expectMatch | check, why } ] }
   ============================================================ */

/* small helpers for building illustration HTML */
function fig(svg, caption) {
  return `<figure class="ill-fig">${svg}` +
    (caption ? `<figcaption>${caption}</figcaption>` : "") + `</figure>`;
}

/* "What if…?" — hypotheticals the learner should try in the editor to build intuition.
   Not graded; pure exploration. Pass a list of questions and (optionally) a custom footer. */
function whatif(items, foot) {
  return `<div class="whatif"><b>What if…?</b><ul>` +
    items.map((q) => `<li>${q}</li>`).join("") + `</ul>` +
    `<p class="wi-foot">${foot || "Change the example above, run it, and see what happens."}</p></div>`;
}

const CURRICULUM = [

/* ========================================================== 1 */
{
  id: "syntax",
  section: "Learn the basics",
  title: "Basic syntax",
  summary: "How a Python program is written and run: statements, print(), quotes, escape characters, and the # comment.",
  lead: "A program is a list of instructions the computer follows from top to bottom. Before anything clever, you need to be fluent in the shapes: a call, a string, a comment, a newline.",
  spiral: ["everything here is brand new — no earlier lessons yet"],
  blocks: [
    { type: "html", html: `
      <h2>1 · A program is a to-do list</h2>
      <p>Python opens your file, does line 1, then line 2, then line 3, and stops. That's the whole
      model. Nothing runs \u201clater\u201d or \u201cin the background\u201d — <strong>top to bottom, once.</strong></p>
      <p>The instruction you'll write most is <code>print(...)</code>. It takes a value and shows it
      on the screen. Look at every piece of it:</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anatomy of a print statement">
        <text x="90" y="95" font-size="34" font-family="monospace" fill="var(--tok-kw,#ff7b72)">print</text>
        <text x="188" y="95" font-size="34" font-family="monospace" fill="var(--ink)">(</text>
        <text x="205" y="95" font-size="34" font-family="monospace" fill="var(--accent)">"Hello, world!"</text>
        <text x="470" y="95" font-size="34" font-family="monospace" fill="var(--ink)">)</text>
        <line x1="110" y1="110" x2="110" y2="150" stroke="var(--ink-soft)"/>
        <text x="55" y="172" font-size="12" fill="var(--ink-soft)">the name of the tool you're using</text>
        <line x1="200" y1="110" x2="200" y2="135" stroke="var(--ink-soft)"/>
        <line x1="478" y1="110" x2="478" y2="135" stroke="var(--ink-soft)"/>
        <text x="150" y="30" font-size="12" fill="var(--ink-soft)">parentheses = \u201chere is what to work on\u201d</text>
        <line x1="200" y1="35" x2="200" y2="60" stroke="var(--ink-soft)"/>
        <line x1="478" y1="35" x2="478" y2="60" stroke="var(--ink-soft)"/>
        <text x="290" y="172" font-size="12" fill="var(--ink-soft)">quotes mark where the text starts and ends</text>
        <line x1="330" y1="112" x2="330" y2="150" stroke="var(--ink-soft)"/>
      </svg>`, `Miss the closing quote or a parenthesis and Python stops with a SyntaxError. That's normal.`)}
      <p>Run this. Then change the words inside the quotes and run again.</p>` },
    { type: "code", title: "Your first program", code: `print("Hello, world!")` },
    { type: "html", html: whatif([
      "you delete the closing <code>)</code>?",
      "you remove both quote marks around the text?",
      "you write <code>Print</code> with a capital P?",
    ], "Break it on purpose above — read the error message, then fix it. Errors are how you learn the rules.") },
    { type: "html", html: `
      <h3>Line by line, in order</h3>
      <p>Three statements, three lines. Python does them strictly in sequence — swap two lines and the
      output order swaps too.</p>` },
    { type: "code", title: "Top to bottom", code: `print("Good morning.")
print("Time to learn Python.")
print("Let's go!")` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Before running the next cell: what three lines will it
      print, and in what order? Then run it and check.</div>` },
    { type: "code", title: "Check your prediction", code: `print("third?")
print("first?")
print("second?")` },

    { type: "html", html: `
      <h2>2 · Strings: text lives inside quotes</h2>
      <p>A piece of text is called a <strong>string</strong>. Python needs to know exactly where your
      text begins and ends, so you wrap it in quotes: <code>"like this"</code> or <code>'like this'</code>.
      Both work; pick one and be consistent.</p>
      <div class="warn"><b>The #1 beginner error</b>Leave the quotes off and Python reads your words as
      the names of things. <code>print(Hello)</code> → <code>NameError: name 'Hello' is not defined</code>.
      The words weren't a string; they were treated as code.</div>` },
    { type: "code", title: "Break it on purpose, then fix it", code: `print("This line is fine.")
print(This line is missing its quotes)` },
    { type: "html", html: `
      <h3>Quotes inside quotes</h3>
      <p>Need a quote character <em>inside</em> your text? Use the other kind on the outside:</p>` },
    { type: "code", title: "Nesting quotes", code: `print('She said "hello" and left.')
print("It's a sunny day.")` },

    { type: "html", html: `
      <h2>3 · Escape characters: \\n and friends</h2>
      <p>Some characters are hard to type inside a string — a newline, a tab, a literal backslash.
      You write them with a backslash <code>\\</code> plus a letter. These pairs are
      <strong>escape sequences</strong>:</p>
      <table class="tbl">
        <tr><th>You type</th><th>You get</th></tr>
        <tr><td><code>\\n</code></td><td>a new line (line break)</td></tr>
        <tr><td><code>\\t</code></td><td>a tab</td></tr>
        <tr><td><code>\\"</code></td><td>a literal double-quote (inside a "…" string)</td></tr>
        <tr><td><code>\\\\</code></td><td>a single backslash</td></tr>
      </table>
      <p>So one <code>print</code> can produce several lines:</p>` },
    { type: "code", title: "One print, many lines", code: `print("Line one\\nLine two\\nLine three")
print("Name:\\tAda")
print("Path: C:\\\\Users\\\\Ada")` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>How many lines does <code>print("a\\nb\\nc")</code> put
      on the screen? Run the cell above and count.</div>` },
    { type: "html", html: whatif([
      "you use <code>\\m</code> instead of <code>\\n</code>? (there's no such escape)",
      "you write a single <code>\\\\</code> — one backslash — before a normal letter like <code>\\p</code>?",
      "you actually want the two characters <code>\\</code> and <code>n</code> to show, not a line break?",
    ]) },

    { type: "html", html: `
      <h2>4 · print() can take several values</h2>
      <p>Give <code>print</code> more than one value, separated by commas. It prints them left to right
      with <strong>one space</strong> between each. The values don't all have to be strings — a bare
      number like <code>42</code> is fine.</p>` },
    { type: "code", title: "Commas insert spaces", code: `print("Python", "is", "fun")
print("Answer:", 42)
print("x", "y", "z")` },
    { type: "html", html: `
      <div class="tip"><b>Two ways to get <code>a b</code></b>
      <code>print("a", "b")</code> — two values, comma. &nbsp; <code>print("a b")</code> — one value
      with the space typed in. Same output, different structure. You'll meet a third way (f-strings) soon.</div>` },

    { type: "html", html: `
      <h2>5 · Comments: notes Python ignores</h2>
      <p>Anything after a <code>#</code> on a line is a <strong>comment</strong>. Python skips it
      completely. Comments are for humans — to record <em>why</em> something is written the way it is.
      You can also \u201ccomment out\u201d a line to switch it off without deleting it.</p>` },
    { type: "code", title: "The # symbol", code: `# This whole line is a note and does nothing.
print("Visible output")   # a comment can sit at the end of a line too
# print("This line is switched off")` },
    { type: "html", html: `
      <div class="tip"><b>Recap — the shapes to know cold</b>
      <ul style="margin:6px 0 0">
        <li>Code runs top to bottom, one statement per line.</li>
        <li><code>print(value)</code> shows a value. Commas → several values, spaced.</li>
        <li>A <strong>string</strong> is text in matching quotes. Wrong/missing quotes → error.</li>
        <li>Escapes: <code>\\n</code> newline, <code>\\t</code> tab, <code>\\"</code> quote, <code>\\\\</code> backslash.</li>
        <li><code>#</code> starts a comment — Python ignores the rest of the line.</li>
        <li>Python is case-sensitive: <code>Print</code> \u2260 <code>print</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "CS50P — Lecture 0: Functions & Variables (notes)", url: "https://cs50.harvard.edu/python/notes/0/" },
    { label: "Python Tutorial — An Informal Introduction to Python", url: "https://docs.python.org/3/tutorial/introduction.html" },
    { label: "Python docs — String literals & escape sequences", url: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals" },
  ],
  exercises: [
    {
      title: "Say hello",
      tier: "warm", uses: [],
      prompt: `<p>Make the program print exactly this line:</p><pre>Hello, Python!</pre>`,
      solution: `print("Hello, Python!")`,
      success: "That's a complete program.",
      tests: [{ expect: "Hello, Python!" }],
    },
    {
      title: "Three lines, three statements",
      tier: "warm", uses: [],
      prompt: `<p>Using <strong>three separate <code>print</code> statements</strong>, produce exactly:</p><pre>ready\nset\ngo</pre>`,
      solution: `print("ready")\nprint("set")\nprint("go")`,
      success: "One statement per line, run in order.",
      tests: [{ expect: "ready\nset\ngo" }],
    },
    {
      title: "Three lines, one statement",
      tier: "core", uses: [],
      prompt: `<p>Now produce the <em>same</em> output — <pre>ready\nset\ngo</pre> — using
        <strong>a single <code>print</code></strong> and <code>\\n</code>.</p>`,
      solution: `print("ready\\nset\\ngo")`,
      success: "\\n is a newline inside one string.",
      review: [{ pattern: "print[\\s\\S]*?print", tip: `That works — but this task was about feeling that one <code>"ready\\nset\\ngo"</code> string equals three prints. Try it with a single <code>print</code>.` }],
      tests: [{ expect: "ready\nset\ngo" }],
    },
    {
      title: "Commas, not glue",
      tier: "core", uses: [],
      prompt: `<p>Print this line using <strong>three comma-separated values</strong> in one <code>print</code>
        — two words as strings and the number with no quotes:</p><pre>Level up 9000</pre>`,
      solution: `print("Level", "up", 9000)`,
      success: "Commas add the spaces for you; 9000 needs no quotes.",
      tests: [{ expect: "Level up 9000" }],
      review: [{ pattern: '"Level up 9000"|"Level up "', tip: `You can also type it as one string. The point of this one was to use commas — <code>print("Level", "up", 9000)</code>.` }],
    },
    {
      title: "Mind the inner quote",
      tier: "core", uses: [],
      prompt: `<p>Print this line <em>exactly</em>, apostrophe and all:</p><pre>It's alive!</pre>`,
      solution: `print("It's alive!")`,
      success: "Double quotes outside let a single quote sit inside untouched.",
      tests: [{ expect: "It's alive!" }],
    },
    {
      title: "A tab between",
      tier: "core", uses: [],
      prompt: `<p>Print the name and score separated by a <strong>tab</strong> (<code>\\t</code>), on one line:</p><pre>Ada\t95</pre>`,
      solution: `print("Ada\\t95")`,
      success: "\\t is one tab character.",
      tests: [{ expect: "Ada\t95" }],
    },
    {
      title: "Comment it",
      tier: "core", uses: [],
      prompt: `<p>The program must still print <code>Ready to code</code>, and your file must also contain
        at least one <strong>comment</strong> starting with <code>#</code>.</p>`,
      solution: `# greet the coder\nprint("Ready to code")`,
      success: "Comments are how code explains itself.",
      require: [{ pattern: "#", hard: true, message: "Add a comment — a line (or part of one) starting with #." }],
      tests: [{ expect: "Ready to code" }],
    },
    {
      title: "The Windows path",
      tier: "challenge", uses: [],
      prompt: `<p>Print this exact line. Watch the backslashes — each one you want to <em>see</em> must be
        written as <code>\\\\</code>.</p><pre>C:\\Users\\Ada\\notes.txt</pre>`,
      solution: `print("C:\\\\Users\\\\Ada\\\\notes.txt")`,
      success: "\\\\ produces one literal backslash.",
      tests: [{ expect: "C:\\Users\\Ada\\notes.txt" }],
    },
    {
      title: "The receipt",
      tier: "challenge", uses: [],
      prompt: `<p>Produce this 4-line receipt <strong>exactly</strong>. Use any mix of <code>print</code>
        statements and <code>\\n</code>. There is a tab between each item and its price.</p>
        <pre>=== RECEIPT ===\nCoffee\t3\nMuffin\t4\n=== TOTAL 7 ===</pre>`,
      solution: `print("=== RECEIPT ===")\nprint("Coffee\\t3")\nprint("Muffin\\t4")\nprint("=== TOTAL 7 ===")`,
      success: "You controlled layout with nothing but print, \\n and \\t.",
      tests: [{ expect: "=== RECEIPT ===\nCoffee\t3\nMuffin\t4\n=== TOTAL 7 ===" }],
    },
    {
      title: "The quote card",
      tier: "boss", uses: [],
      prompt: `<p>Print this exactly — three lines, including the double-quotes around the sentence and the
        attribution line. Contains: nested quotes, <code>\\n</code>, and a comment somewhere in your file.</p>
        <pre>Quote of the day:\n"Simple is better than complex."\n    — The Zen of Python</pre>`,
      solution: `# a favourite line from PEP 20\nprint('Quote of the day:\\n"Simple is better than complex."\\n    \u2014 The Zen of Python')`,
      success: "Every shape from this lesson, in four lines of code.",
      require: [{ pattern: "#", hard: true, message: "Include a comment somewhere in the file." }],
      tests: [{ expect: 'Quote of the day:\n"Simple is better than complex."\n    \u2014 The Zen of Python' }],
    },
  ],
},

/* ========================================================== 2 */
{
  id: "variables",
  section: "Learn the basics",
  title: "Variables & data types",
  summary: "Store values in named variables; know Python's core types: int, float, str, bool, None.",
  lead: "A variable is a name tied to a value. Master this and you stop repeating yourself — compute once, name it, reuse it everywhere.",
  spiral: ["print() with commas (L1)", "strings & quotes (L1)", "\\n / \\t escapes (L1)", "comments (L1)"],
  blocks: [
    { type: "html", html: `
      <h2>Assigning a variable</h2>
      <p>The <code>=</code> sign means \u201cput the value on the right into the name on the left.\u201d
      It is <em>not</em> the maths \u201cequals\u201d.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A variable is a labelled box holding a value">
        <rect x="40" y="60" width="150" height="70" rx="10" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="115" y="45" font-size="13" text-anchor="middle" fill="var(--ink-soft)">name</text>
        <text x="115" y="103" font-size="20" font-family="monospace" text-anchor="middle" fill="var(--ink)">age</text>
        <text x="215" y="103" font-size="26" fill="var(--ink-soft)">=</text>
        <rect x="260" y="60" width="120" height="70" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="320" y="45" font-size="13" text-anchor="middle" fill="var(--ink-soft)">value</text>
        <text x="320" y="105" font-size="24" font-family="monospace" text-anchor="middle" fill="var(--accent)">30</text>
        <text x="420" y="88" font-size="13" fill="var(--ink-soft)">read it back later</text>
        <text x="420" y="110" font-size="13" font-family="monospace" fill="var(--ink)">print(age)</text>
      </svg>`, `age = 30  →  the name "age" now refers to the value 30.`)}
    ` },
    { type: "code", title: "Store, then use", code: `city = "Nairobi"
population = 4397000
print("City:", city)
print("People:", population)` },
    { type: "html", html: `
      <h3>Variables can change</h3>
      <p>Assign again and the name points to the new value.</p>` },
    { type: "code", title: "Reassigning", code: `score = 0
print("start:", score)
score = 10
print("after round 1:", score)
score = 10 + 5
print("after round 2:", score)` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Line by line: what is <code>score</code> after each
      assignment above? Run it and check every step.</div>
      <h3>Assigning several names at once</h3>
      <p>Python can set multiple variables on one line — and <strong>swap</strong> two without a
      temporary variable, because the whole right-hand side is built first, then handed out.</p>` },
    { type: "code", title: "Multiple assignment & swap", code: `a, b = 1, 2
print(a, b)
a, b = b, a
print(a, b)` },
    { type: "html", html: whatif([
      "you try to swap with two separate lines — <code>a = b</code> then <code>b = a</code>? Does it still work?",
      "you name a variable <code>2nd</code>? Or <code>my-score</code>?",
      "you use a name before you've assigned it — <code>print(total)</code> with no <code>total =</code> above?",
    ]) },
    { type: "html", html: `
      <div class="note"><b>Naming rules & style</b>
      <ul style="margin:6px 0 0">
        <li>Letters, digits, underscores. <strong>Cannot start with a digit.</strong></li>
        <li>Case-sensitive: <code>total</code> and <code>Total</code> are different.</li>
        <li>Convention: <code>lower_case_with_underscores</code> (\u201csnake_case\u201d).</li>
        <li>Choose meaningful names: <code>speed</code>, not <code>s</code>.</li>
      </ul></div>` },
    { type: "html", html: `
      <h2>The core data types</h2>
      <p>Every value has a <strong>type</strong>. The built-in <code>type(...)</code> tells you which.</p>
      <table class="tbl">
        <tr><th>Type</th><th>What it is</th><th>Examples</th><th><code>type(x)</code></th></tr>
        <tr><td><code>int</code></td><td>whole number</td><td><code>0  42  -7</code></td><td><code>&lt;class 'int'&gt;</code></td></tr>
        <tr><td><code>float</code></td><td>number with a decimal point</td><td><code>3.14  -0.5  2.0</code></td><td><code>&lt;class 'float'&gt;</code></td></tr>
        <tr><td><code>str</code></td><td>text (\u201cstring\u201d)</td><td><code>"hi"  'a'  ""</code></td><td><code>&lt;class 'str'&gt;</code></td></tr>
        <tr><td><code>bool</code></td><td>truth value</td><td><code>True  False</code></td><td><code>&lt;class 'bool'&gt;</code></td></tr>
      </table>
      <p>There is also <code>None</code> (type <code>NoneType</code>) meaning \u201cno value yet.\u201d</p>` },
    { type: "code", title: "Ask the type", code: `print(type(42))
print(type(3.14))
print(type("42"))
print(type(True))
print(type(None))` },
    { type: "html", html: whatif([
      "you check <code>type(2.0)</code> — <code>int</code> or <code>float</code>?",
      "you check <code>type(\"\")</code> — the empty string?",
      "you check <code>type(true)</code> with a lowercase t?",
    ]) },
    { type: "html", html: `
      <div class="warn"><b>Type traps to remember</b>
      <ul style="margin:6px 0 0">
        <li><code>"42"</code> is a <strong>str</strong>, not a number — quotes change everything.</li>
        <li><code>2.0</code> is a <strong>float</strong> even though it looks whole.</li>
        <li><code>True</code> / <code>False</code> have <em>no</em> quotes; <code>"True"</code> is just text.</li>
      </ul></div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>name = value</code> ties a name to a value; reassigning re-points it.</li>
        <li><code>a, b = b, a</code> swaps in one line.</li>
        <li>Core types: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>, <code>None</code>.</li>
        <li><code>type(x)</code> reports a value's type.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "CS50P — Lecture 0: Variables, Integers, Floats (notes)", url: "https://cs50.harvard.edu/python/notes/0/" },
    { label: "Real Python — Basic Data Types in Python", url: "https://realpython.com/python-data-types/" },
  ],
  exercises: [
    {
      title: "Name three things",
      tier: "warm", uses: ["print with commas (L1)"],
      prompt: `<p>Create <code>planet = "Earth"</code>, <code>moons = 1</code>, and <code>day_hours = 24</code>.
        With <strong>one</strong> <code>print</code> and commas, produce:</p><pre>Earth 1 24</pre>`,
      solution: `planet = "Earth"\nmoons = 1\nday_hours = 24\nprint(planet, moons, day_hours)`,
      success: "Three names, three types, one print.",
      tests: [{ expect: "Earth 1 24" }],
    },
    {
      title: "Reassign in place",
      tier: "warm", uses: [],
      prompt: `<p>Keep the line <code>temperature = 25</code>. Reassign it to <code>30</code>, then print it.</p><pre>30</pre>`,
      starter: `temperature = 25\n`,
      solution: `temperature = 25\ntemperature = 30\nprint(temperature)`,
      success: "The name points at the newer value.",
      tests: [{ expect: "30" }],
    },
    {
      title: "What type is it?",
      tier: "core", uses: [],
      prompt: `<p>On three lines, print the type of <code>True</code>, then <code>"True"</code>, then <code>2.0</code>.</p>
        <pre>&lt;class 'bool'&gt;\n&lt;class 'str'&gt;\n&lt;class 'float'&gt;</pre>`,
      solution: `print(type(True))\nprint(type("True"))\nprint(type(2.0))`,
      success: "Quotes and dots decide the type.",
      tests: [{ expect: "<class 'bool'>\n<class 'str'>\n<class 'float'>" }],
    },
    {
      title: "The swap",
      tier: "core", uses: ["multiple assignment"],
      prompt: `<p>Given <code>left = "A"</code> and <code>right = "B"</code>, swap them in one line, then
        print <code>left</code> and <code>right</code>.</p><pre>B A</pre>`,
      starter: `left = "A"\nright = "B"\n`,
      solution: `left = "A"\nright = "B"\nleft, right = right, left\nprint(left, right)`,
      success: "No temporary variable needed.",
      review: [{ pattern: "temp|tmp|\\bhold\\b", tip: `Do it without a helper: <code>left, right = right, left</code>.` }],
      tests: [{ expect: "B A" }],
    },
    {
      title: "Label the reading",
      tier: "core", uses: ["variables (L2)", "print with commas (L1)"],
      prompt: `<p>Given <code>label = "CPU temp"</code> and <code>celsius = 63</code>, print these two
        lines — the label on its own, then the number followed by <code>C</code>:</p><pre>CPU temp\n63 C</pre>
        <p>Two <code>print</code> statements is the natural way here; you'll get slicker tools for this
        in later lessons.</p>`,
      starter: `label = "CPU temp"\ncelsius = 63\n`,
      solution: `label = "CPU temp"\ncelsius = 63\nprint(label)\nprint(celsius, "C")`,
      success: "Variables slot into print alongside literal text.",
      tests: [{ expect: "CPU temp\n63 C" }],
    },
    {
      title: "Evolving counter",
      tier: "core", uses: [],
      prompt: `<p>Set <code>coins = 0</code>. Then reassign to <code>3</code> and print, reassign to
        <code>3 + 4</code> and print, reassign to <code>0</code> and print.</p><pre>3\n7\n0</pre>`,
      solution: `coins = 0\ncoins = 3\nprint(coins)\ncoins = 3 + 4\nprint(coins)\ncoins = 0\nprint(coins)`,
      success: "One name, a whole history of values.",
      tests: [{ expect: "3\n7\n0" }],
    },
    {
      title: "Three-way rotate",
      tier: "challenge", uses: ["multiple assignment"],
      prompt: `<p>Given <code>a, b, c = 1, 2, 3</code>, rotate values so afterward <code>a</code> holds
        <code>c</code>'s old value, <code>b</code> holds <code>a</code>'s, <code>c</code> holds
        <code>b</code>'s. Print <code>a b c</code>.</p><pre>3 1 2</pre>`,
      starter: `a, b, c = 1, 2, 3\n`,
      solution: `a, b, c = 1, 2, 3\na, b, c = c, a, b\nprint(a, b, c)`,
      success: "The right-hand side is built first, then unpacked.",
      tests: [{ expect: "3 1 2" }],
    },
    {
      title: "Type report card",
      tier: "challenge", uses: ["print with commas (L1)"],
      prompt: `<p>Using the starter variables, print one line per variable, exactly:</p>
        <pre>count -> &lt;class 'int'&gt;\nratio -> &lt;class 'float'&gt;\nname -> &lt;class 'str'&gt;\nready -> &lt;class 'bool'&gt;</pre>`,
      starter: `count = 7\nratio = 0.5\nname = "Sam"\nready = False\n`,
      solution: `count = 7\nratio = 0.5\nname = "Sam"\nready = False\nprint("count ->", type(count))\nprint("ratio ->", type(ratio))\nprint("name ->", type(name))\nprint("ready ->", type(ready))`,
      success: "type(x) returns a value you can print like any other.",
      tests: [{ expect: "count -> <class 'int'>\nratio -> <class 'float'>\nname -> <class 'str'>\nready -> <class 'bool'>" }],
    },
    {
      title: "Mini profile",
      tier: "boss", uses: ["print with commas (L1)", "comments (L1)"],
      prompt: `<p>Store first name <code>Ada</code>, last name <code>Lovelace</code>, birth year
        <code>1815</code> as well-named variables. Include a comment. Print exactly:</p>
        <pre>Name: Ada Lovelace\nBorn: 1815\nType of birth year: &lt;class 'int'&gt;</pre>`,
      solution: `# a short profile record\nfirst = "Ada"\nlast = "Lovelace"\nbirth_year = 1815\nprint("Name:", first, last)\nprint("Born:", birth_year)\nprint("Type of birth year:", type(birth_year))`,
      success: "Naming, reuse, types and print — together.",
      require: [{ pattern: "#", hard: true, message: "Include a comment." }],
      tests: [{ expect: "Name: Ada Lovelace\nBorn: 1815\nType of birth year: <class 'int'>" }],
    },
  ],
},

/* ========================================================== 3 */
{
  id: "operators",
  section: "Learn the basics",
  title: "Operators",
  summary: "Do arithmetic, compare values, and combine yes/no facts with and / or / not.",
  lead: "Operators are how values interact: +, -, *, /, the comparisons, and the logical words. Get comfortable here and conditionals & loops become easy.",
  spiral: ["variables & reassigning (L2)", "int vs float (L2)", "type() (L2)", "print with commas (L1)"],
  blocks: [
    { type: "html", html: `
      <h2>Arithmetic</h2>
      <table class="tbl">
        <tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
        <tr><td><code>+ - *</code></td><td>add, subtract, multiply</td><td><code>3 * 4</code></td><td><code>12</code></td></tr>
        <tr><td><code>/</code></td><td>divide (always gives a <code>float</code>)</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
        <tr><td><code>//</code></td><td>floor division (drops the remainder)</td><td><code>7 // 2</code></td><td><code>3</code></td></tr>
        <tr><td><code>%</code></td><td>modulo (the remainder)</td><td><code>7 % 2</code></td><td><code>1</code></td></tr>
        <tr><td><code>**</code></td><td>power</td><td><code>2 ** 10</code></td><td><code>1024</code></td></tr>
      </table>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dividing 17 by 5">
        <text x="20" y="40" font-size="14" fill="var(--ink-soft)">17 split into groups of 5:</text>
        <g font-family="monospace">
          <rect x="20"  y="60" width="70" height="40" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="100" y="60" width="70" height="40" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="180" y="60" width="70" height="40" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="260" y="60" width="46" height="40" rx="6" fill="var(--panel-2)" stroke="var(--line)"/>
        </g>
        <text x="55"  y="86" font-size="13" text-anchor="middle" fill="var(--ink)">5</text>
        <text x="135" y="86" font-size="13" text-anchor="middle" fill="var(--ink)">5</text>
        <text x="215" y="86" font-size="13" text-anchor="middle" fill="var(--ink)">5</text>
        <text x="283" y="86" font-size="13" text-anchor="middle" fill="var(--ink)">2</text>
        <text x="20"  y="128" font-size="14" font-family="monospace" fill="var(--accent)">17 // 5  ->  3</text>
        <text x="200" y="128" font-size="14" font-family="monospace" fill="var(--accent)">17 % 5  ->  2</text>
      </svg>`, `// is how many whole groups fit; % is what's left over.`)}
    ` },
    { type: "code", title: "Number crunching", code: `print(7 / 2)
print(7 // 2)
print(7 % 2)
print(2 ** 10)` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Which of these is a <code>float</code> and which is an
      <code>int</code>: <code>7 / 2</code>, <code>6 / 2</code>, <code>7 // 2</code>? Check with
      <code>type(...)</code>.</div>
      <div class="tip"><b>Key fact</b><code>/</code> <em>always</em> gives a float — even
      <code>6 / 2</code> is <code>3.0</code>. Want a whole number back? Use <code>//</code>.</div>
      <h3>Precedence: what happens first</h3>
      <p><code>**</code> before <code>* / // %</code> before <code>+ -</code>. Parentheses override everything.
      When in doubt, add parentheses — clearer beats clever.</p>` },
    { type: "code", title: "Order matters", code: `print(2 + 3 * 4)
print((2 + 3) * 4)
print(2 ** 3 ** 2)   # right to left: 2 ** 9` },
    { type: "html", html: whatif([
      "you divide by zero — <code>5 / 0</code>? What error, and what does it mean?",
      "you compute <code>10 % 3</code> vs <code>3 % 10</code> — which is bigger?",
      "you do <code>\"ab\" * 3</code>? And <code>\"ab\" + 3</code>?",
      "you write <code>2 ** 0.5</code>?",
    ]) },
    { type: "html", html: `
      <h2>Comparisons — they produce a <code>bool</code></h2>
      <table class="tbl">
        <tr><th>Operator</th><th>True when…</th></tr>
        <tr><td><code>==</code></td><td>values are equal (two equals signs!)</td></tr>
        <tr><td><code>!=</code></td><td>values are different</td></tr>
        <tr><td><code>&lt;  &gt;  &lt;=  &gt;=</code></td><td>less / greater (or equal)</td></tr>
      </table>` },
    { type: "code", title: "Asking questions", code: `print(5 == 5)
print(5 != 5)
print(3 < 10)
print(10 <= 9)` },
    { type: "html", html: `
      <div class="warn"><b><code>=</code> vs <code>==</code></b>
      One <code>=</code> <em>assigns</em> (<code>x = 5</code>). Two <code>==</code> <em>asks</em>
      “are these equal?” and gives back <code>True</code>/<code>False</code>. Mixing them up is
      the single most common early bug.</div>
      <h3>Comparisons can chain</h3>
      <p><code>0 &lt;= n &lt;= 100</code> reads exactly like maths and means “n is between 0 and 100”.</p>` },
    { type: "code", title: "Chained comparison", code: `n = 42
print(0 <= n <= 100)
print(1 <= n <= 10)` },
    { type: "html", html: whatif([
      "you write <code>if n = 42:</code> with one equals sign?",
      "you compare different types — <code>3 == \"3\"</code>? <code>3 == 3.0</code>?",
      "you write <code>not 0</code>? <code>not \"\"</code>? <code>not \"hi\"</code>?",
    ]) },
    { type: "html", html: `
      <h2>Logical operators: and / or / not</h2>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Truth tables for and, or, not">
        <g font-family="monospace" font-size="13">
          <text x="20" y="24" fill="var(--ink-soft)">a and b</text>
          <text x="20" y="48" fill="var(--ink)">T and T = T</text>
          <text x="20" y="68" fill="var(--ink)">T and F = F</text>
          <text x="20" y="88" fill="var(--ink)">F and F = F</text>
          <text x="220" y="24" fill="var(--ink-soft)">a or b</text>
          <text x="220" y="48" fill="var(--ink)">T or T = T</text>
          <text x="220" y="68" fill="var(--ink)">T or F = T</text>
          <text x="220" y="88" fill="var(--ink)">F or F = F</text>
          <text x="420" y="24" fill="var(--ink-soft)">not a</text>
          <text x="420" y="48" fill="var(--ink)">not T = F</text>
          <text x="420" y="68" fill="var(--ink)">not F = T</text>
        </g>
        <text x="20" y="130" font-size="12" fill="var(--ink-soft)">"and" needs both sides true. "or" needs at least one. "not" flips it.</text>
      </svg>`, `Combine yes/no facts into a single yes/no answer.`)}
    ` },
    { type: "code", title: "Combining conditions", code: `age = 20
print(age >= 18 and age < 65)
print(age < 13 or age > 19)
print(not age == 20)` },
    { type: "html", html: `
      <h3>Update-in-place shortcuts</h3>
      <p><code>x += 1</code> means <code>x = x + 1</code>. Also <code>-= *= /= //= %= **=</code>.</p>` },
    { type: "code", title: "Accumulating", code: `count = 0
count += 5
count += 5
count -= 2
print(count)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>/</code> gives a float; <code>//</code> and <code>%</code> give quotient and remainder.</li>
        <li><code>**</code> is power; parentheses control order.</li>
        <li>Comparisons and <code>and/or/not</code> evaluate to <code>True</code>/<code>False</code>.</li>
        <li><code>+=</code> and friends update a variable in place.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — Operator precedence", url: "https://docs.python.org/3/reference/expressions.html#operator-precedence" },
    { label: "CS50P — Lecture 0 (arithmetic) & Lecture 1 (boolean expressions)", url: "https://cs50.harvard.edu/python/notes/1/" },
  ],
  exercises: [
    {
      title: "Quotient and remainder",
      tier: "warm", uses: [],
      prompt: `<p>Print <code>17 // 5</code> on the first line and <code>17 % 5</code> on the second.</p><pre>3\n2</pre>`,
      solution: `print(17 // 5)\nprint(17 % 5)`,
      success: "Floor division and modulo are a pair.",
      tests: [{ expect: "3\n2" }],
    },
    {
      title: "Total cost",
      tier: "warm", uses: ["variables (L2)"],
      prompt: `<p>Given <code>price = 20</code> and <code>qty = 3</code>, print the total.</p><pre>60</pre>`,
      starter: `price = 20\nqty = 3\n`,
      solution: `price = 20\nqty = 3\nprint(price * qty)`,
      success: "Arithmetic works on variables just like on numbers.",
      tests: [{ expect: "60" }],
    },
    {
      title: "One or many",
      tier: "core", uses: ["/ vs // (this lesson)", "print with commas (L1)"],
      prompt: `<p>Given <code>total = 30</code> and <code>people = 4</code>, print two lines:
        the exact share (<code>/</code>) and the whole share each person gets (<code>//</code>).</p><pre>7.5\n7</pre>`,
      starter: `total = 30\npeople = 4\n`,
      solution: `total = 30\npeople = 4\nprint(total / people)\nprint(total // people)`,
      success: "/ keeps the decimal, // throws it away.",
      tests: [{ expect: "7.5\n7" }],
    },
    {
      title: "Leftover slices",
      tier: "core", uses: ["% operator (this lesson)", "variables (L2)"],
      prompt: `<p><code>slices = 8</code> and <code>friends = 3</code> are already set. Each friend takes an
        equal <em>whole</em> number of slices; print how many slices are <strong>left over</strong>.
        Use the two variables so your code stays correct if the numbers change.</p><pre>2</pre>`,
      starter: `slices = 8\nfriends = 3\n`,
      solution: `slices = 8\nfriends = 3\nprint(slices % friends)`,
      success: "% is the remainder — what's left after taking out every whole group.",
      require: [
        { pattern: "\\bslices\\b", hard: true, message: "Use the slices variable that's already set — don't hard-code the answer." },
        { pattern: "\\bfriends\\b", hard: true, message: "Use the friends variable that's already set — don't hard-code the answer." },
      ],
      tests: [
        { rewrite: [["slices\\s*=\\s*\\d+", "slices = 8"], ["friends\\s*=\\s*\\d+", "friends = 3"]], expect: "2" },
        { rewrite: [["slices\\s*=\\s*\\d+", "slices = 10"], ["friends\\s*=\\s*\\d+", "friends = 3"]], expect: "1",
          why: `10 slices, 3 friends → <code>1</code> left over. If you got <code>3</code>, you used <code>//</code> (how many slices <em>each</em>) instead of <code>%</code> (what <em>remains</em>).` },
        { rewrite: [["slices\\s*=\\s*\\d+", "slices = 9"], ["friends\\s*=\\s*\\d+", "friends = 5"]], expect: "4",
          why: `9 shared among 5 leaves <code>4</code>. <code>%</code> gives the remainder for any pair of numbers.` },
      ],
      antisolutions: [
        { code: `slices = 8\nfriends = 3\nprint(slices // friends)`, why: "// gives slices-per-friend, not the leftover" },
      ],
    },
    {
      title: "Evaluate the logic",
      tier: "core", uses: [],
      prompt: `<p>Print the result of <code>10 &gt; 3 and 3 &gt; 5</code>.</p><pre>False</pre>`,
      solution: `print(10 > 3 and 3 > 5)`,
      success: "Both sides must hold for `and`.",
      tests: [{ expect: "False" }],
    },
    {
      title: "In range?",
      tier: "core", uses: ["variables (L2)", "chained comparison (this lesson)"],
      prompt: `<p>Given <code>n = 47</code>: is <code>n</code> between <code>1</code> and <code>100</code>
        <strong>inclusive</strong> (both ends count)? Print the single <code>True</code>/<code>False</code>
        answer using one chained comparison.</p><pre>True</pre>`,
      starter: `n = 47\n`,
      solution: `n = 47\nprint(1 <= n <= 100)`,
      success: "1 <= n <= 100 reads like maths and works like it.",
      review: [{ pattern: "\\band\\b", tip: `<code>1 &lt;= n and n &lt;= 100</code> works, but Python lets you chain: <code>1 &lt;= n &lt;= 100</code>.` }],
      tests: [
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 47"]], expect: "True" },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 1"]], expect: "True",
          why: `<code>1</code> is inside the range — "inclusive" means use <code>&lt;=</code>, not <code>&lt;</code>.` },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 100"]], expect: "True",
          why: `<code>100</code> is inside the range — the upper end counts too.` },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 0"]], expect: "False",
          why: `<code>0</code> is below the range — you need a lower bound, not just <code>n &lt;= 100</code>.` },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 101"]], expect: "False",
          why: `<code>101</code> is above the range.` },
      ],
      antisolutions: [
        { code: `n = 47\nprint(1 < n < 100)`, why: "strict < excludes the endpoints 1 and 100" },
        { code: `n = 47\nprint(n <= 100)`, why: "no lower bound — 0 and negatives would pass" },
      ],
    },
    {
      title: "Use +=",
      tier: "core", uses: ["variables & reassigning (L2)"],
      prompt: `<p>Start from <code>score = 8</code>. Add <code>4</code> to it with <code>+=</code>, then
        double it with <code>*= 2</code>, then print <code>score</code>. (Order matters: add first,
        then double — <code>(8 + 4) * 2</code>.)</p><pre>24</pre>`,
      starter: `score = 8\n`,
      solution: `score = 8\nscore += 4\nscore *= 2\nprint(score)`,
      success: "The augmented operators all follow the same shape.",
      require: [{ pattern: "\\+=", tip: `If you wrote it out longhand: correct. <code>score += 4</code> / <code>score *= 2</code> is the shorthand you'll see everywhere.` }],
      tests: [
        { rewrite: [["score\\s*=\\s*8\\b", "score = 8"]], expect: "24" },
        { rewrite: [["score\\s*=\\s*8\\b", "score = 10"]], expect: "28",
          why: `From <code>score = 10</code>: <code>(10 + 4) * 2 = 28</code>. If you got <code>24</code> you hard-coded the answer instead of computing from <code>score</code>.` },
        { rewrite: [["score\\s*=\\s*8\\b", "score = 0"]], expect: "8",
          why: `From <code>score = 0</code>: <code>(0 + 4) * 2 = 8</code>.` },
      ],
      antisolutions: [
        { code: `score = 8\nprint(24)`, why: "hard-codes the result instead of computing from score" },
        { code: `score = 8\nscore *= 2\nscore += 4\nprint(score)`, why: "doubles before adding — wrong order, gives 20" },
      ],
    },
    {
      title: "Even or odd, no if",
      tier: "challenge", uses: ["% operator", "== comparison", "variables (L2)"],
      prompt: `<p>Given <code>n = 14</code>, print <code>True</code> if <code>n</code> is even, else
        <code>False</code> — using only operators, <strong>no <code>if</code></strong>.</p><pre>True</pre>`,
      starter: `n = 14\n`,
      solution: `n = 14\nprint(n % 2 == 0)`,
      success: "n % 2 == 0 is already a boolean. No if needed.",
      tests: [
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 14"]], expect: "True" },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 7"]], expect: "False",
          why: `An odd <code>n</code> like <code>7</code> must print <code>False</code>. <code>n % 2 == 0</code> works for any number; printing <code>n % 2</code> alone would show <code>1</code> instead.` },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 0"]], expect: "True",
          why: `<code>0</code> is even.` },
      ],
      antisolutions: [
        { code: `n = 14\nprint(n % 2)`, why: "prints 0/1, not True/False" },
        { code: `n = 14\nprint(True)`, why: "hard-coded — fails for odd n" },
      ],
    },
    {
      title: "Seconds to clock parts",
      tier: "challenge", uses: ["// and %", "variables (L2)", "print with commas (L1)"],
      prompt: `<p>Given <code>seconds = 3725</code>, print the hours, minutes and seconds it represents,
        space-separated on one line.</p><pre>1 2 5</pre>`,
      starter: `seconds = 3725\n`,
      solution: `seconds = 3725\nhours = seconds // 3600\nminutes = seconds % 3600 // 60\nsecs = seconds % 60\nprint(hours, minutes, secs)`,
      success: "// pulls out whole units, % gives what's left for the next unit down.",
      tests: [
        { rewrite: [["seconds\\s*=\\s*\\d+", "seconds = 3725"]], expect: "1 2 5" },
        { rewrite: [["seconds\\s*=\\s*\\d+", "seconds = 90"]], expect: "0 1 30",
          why: `<code>seconds = 90</code> → <code>0 1 30</code>. Compute every part from <code>seconds</code>, not from the sample.` },
        { rewrite: [["seconds\\s*=\\s*\\d+", "seconds = 7384"]], expect: "2 3 4",
          why: `<code>seconds = 7384</code> → <code>2 3 4</code> (2h 3m 4s).` },
      ],
    },
    {
      title: "The gatekeeper",
      tier: "boss", uses: ["comparisons", "and / or / not", "variables (L2)", "chained comparison"],
      prompt: `<p>A user may enter if they are a member <em>and</em> either an adult (18+) <em>or</em>
        accompanied. Given the three starter variables, print one <code>True</code>/<code>False</code>.</p>
        <pre>True</pre>`,
      starter: `is_member = True\nage = 15\naccompanied = True\n`,
      solution: `is_member = True\nage = 15\naccompanied = True\nprint(is_member and (age >= 18 or accompanied))`,
      success: "Parentheses make the and/or grouping unambiguous.",
      tests: [
        { expect: "True" },
        { rewrite: [["accompanied\\s*=\\s*True", "accompanied = False"]], expect: "False",
          why: `A 15-year-old member who is <em>not</em> accompanied must get <code>False</code>. Without parentheses, <code>and</code> binds tighter than <code>or</code> and the grouping is wrong — use <code>is_member and (age &gt;= 18 or accompanied)</code>.` },
        { rewrite: [["is_member\\s*=\\s*True", "is_member = False"]], expect: "False",
          why: `Not a member → <code>False</code> no matter what else is true.` },
        { rewrite: [["age\\s*=\\s*15", "age = 20"], ["accompanied\\s*=\\s*True", "accompanied = False"]], expect: "True",
          why: `An unaccompanied 20-year-old member may enter (adult).` },
      ],
      antisolutions: [
        { code: `is_member = True\nage = 15\naccompanied = True\nprint(is_member and age >= 18 or accompanied)`,
          why: "no parentheses — evaluates as (is_member and age>=18) or accompanied, wrong grouping" },
      ],
    },
  ],
},

/* ========================================================== 4 */
{
  id: "strings",
  section: "Learn the basics",
  title: "Working with strings",
  summary: "Index, slice, join, and transform text; build messages with f-strings.",
  lead: "Text is data. To work with it fluently you need to reach any character by position, take any slice, and reshape it with methods — without ever mutating the original.",
  spiral: ["variables (L2)", "+ and * operators (L3)", "comparisons → bool (L3)", "print with commas (L1)", "\\n escape (L1)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Joining and repeating</h2>
      <p>Two string operators you already met in Lesson 3, now on text: <code>+</code> glues strings
      together (concatenation), <code>*</code> repeats one. Both make a <strong>new</strong> string.</p>` },
    { type: "code", title: "Concatenate & repeat", code: `first = "Grace"
last = "Hopper"
print(first + " " + last)
print("=" * 20)
print("ab" * 3)` },
    { type: "html", html: `
      <div class="warn"><b>You cannot <code>+</code> a string and a number</b>
      <code>"Age: " + 30</code> is a <code>TypeError</code>. Either make both strings, or use an
      f-string (below). This trips up everyone once.</div>` },
    { type: "html", html: `
      <h2>Every character has a position</h2>
      <p>Index from <strong>0</strong> at the front, or from <strong>-1</strong> at the back.
      A <strong>slice</strong> <code>s[start:stop]</code> takes a run of characters — <em>stop is not included</em>.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Indexing and slicing the string PYTHON">
        <g font-family="monospace" font-size="24">
          <rect x="60"  y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="130" y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="200" y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="270" y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="340" y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="410" y="60" width="70" height="60" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="95"  y="100" text-anchor="middle" fill="var(--ink)">P</text>
          <text x="165" y="100" text-anchor="middle" fill="var(--ink)">Y</text>
          <text x="235" y="100" text-anchor="middle" fill="var(--ink)">T</text>
          <text x="305" y="100" text-anchor="middle" fill="var(--ink)">H</text>
          <text x="375" y="100" text-anchor="middle" fill="var(--ink)">O</text>
          <text x="445" y="100" text-anchor="middle" fill="var(--ink)">N</text>
        </g>
        <g font-family="monospace" font-size="12" fill="var(--accent)">
          <text x="95"  y="50" text-anchor="middle">0</text>
          <text x="165" y="50" text-anchor="middle">1</text>
          <text x="235" y="50" text-anchor="middle">2</text>
          <text x="305" y="50" text-anchor="middle">3</text>
          <text x="375" y="50" text-anchor="middle">4</text>
          <text x="445" y="50" text-anchor="middle">5</text>
        </g>
        <g font-family="monospace" font-size="12" fill="var(--ink-soft)">
          <text x="95"  y="140" text-anchor="middle">-6</text>
          <text x="165" y="140" text-anchor="middle">-5</text>
          <text x="235" y="140" text-anchor="middle">-4</text>
          <text x="305" y="140" text-anchor="middle">-3</text>
          <text x="375" y="140" text-anchor="middle">-2</text>
          <text x="445" y="140" text-anchor="middle">-1</text>
        </g>
        <line x1="130" y1="165" x2="340" y2="165" stroke="var(--accent)" stroke-width="3"/>
        <text x="235" y="178" text-anchor="middle" font-size="12" fill="var(--accent)">"PYTHON"[1:4]  ->  "YTH"</text>
      </svg>`, `s[1:4] takes positions 1, 2, 3 — up to but not including 4.`)}
    ` },
    { type: "code", title: "Index & slice", code: `s = "PYTHON"
print(s[0])
print(s[-1])
print(s[1:4])
print(s[:3])
print(s[::2])
print(len(s))` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>For <code>s = "PYTHON"</code>: what are
      <code>s[2]</code>, <code>s[-2]</code>, <code>s[2:]</code>, and <code>s[:-1]</code>?
      Change the cell above and check each one.</div>
      <div class="tip"><b>Slice rules that never change</b>
      <ul style="margin:6px 0 0">
        <li><code>s[a:b]</code> includes <code>a</code>, excludes <code>b</code> — so its length is <code>b - a</code>.</li>
        <li>Leave a side blank to mean “the end”: <code>s[:3]</code>, <code>s[3:]</code>.</li>
        <li><code>s[::-1]</code> reverses the string.</li>
        <li>An out-of-range <em>index</em> errors; an out-of-range <em>slice</em> just clips.</li>
      </ul></div>` },
    { type: "html", html: whatif([
      "you ask for <code>s[99]</code> on a 6-letter string? Now try the <em>slice</em> <code>s[1:99]</code> — different?",
      "<code>s = \"\"</code> and you do <code>s[0]</code>? What about <code>len(s)</code>?",
      "you try to change a character — <code>s[0] = \"x\"</code>?",
      "you write <code>s[::2]</code>? <code>s[1::2]</code>?",
    ]) },
    { type: "html", html: `
      <div class="warn"><b>Strings don't change in place</b>
      They are <strong>immutable</strong>. Methods like <code>.upper()</code> return a <em>new</em>
      string; the original is untouched unless you reassign it.</div>
      <h2>Handy string methods</h2>
      <table class="tbl">
        <tr><th>Method</th><th>Does</th><th>Example → result</th></tr>
        <tr><td><code>.upper() / .lower()</code></td><td>change case</td><td><code>"Hi".upper()</code> → <code>"HI"</code></td></tr>
        <tr><td><code>.strip()</code></td><td>trim whitespace at both ends</td><td><code>"  hi  ".strip()</code> → <code>"hi"</code></td></tr>
        <tr><td><code>.replace(a, b)</code></td><td>swap text</td><td><code>"2024".replace("2","3")</code> → <code>"3034"</code></td></tr>
        <tr><td><code>.split(sep)</code></td><td>break into a list of pieces</td><td><code>"a,b,c".split(",")</code> → <code>['a','b','c']</code></td></tr>
        <tr><td><code>.title()</code></td><td>Capitalise Each Word</td><td><code>"ada lovelace".title()</code></td></tr>
        <tr><td><code>x in s</code></td><td>membership test → bool</td><td><code>"cat" in "concatenate"</code> → <code>True</code></td></tr>
      </table>` },
    { type: "code", title: "Transforming text", code: `name = "  ADA lovelace  "
clean = name.strip().title()
print(clean)
print(clean.split(" "))
print("Lovelace" in clean)` },
    { type: "html", html: `
      <h2>f-strings: fill in the blanks</h2>
      <p>Put <code>f</code> before the quote, then drop any value into <code>{ }</code>.</p>` },
    { type: "code", title: "Readable messages", code: `name = "Sam"
pets = 2
print(f"{name} has {pets} pet(s).")
print(f"Uppercase name: {name.upper()}")
print(f"{name} + {pets} more")` },
    { type: "html", html: `
      <p>An f-string handles the number-to-text problem for you: <code>f"Age: {30}"</code> just works.
      You can even format: <code>f"{3.14159:.2f}"</code> → <code>"3.14"</code>.</p>
      <div class="predict"><b>Predict first</b><code>x = 7</code>. What do these print?
      <code>f"{x}"</code>, <code>f"{x + 1}"</code>, <code>f"{'x'}"</code>, <code>f"x = {x}"</code>.</div>` },
    { type: "html", html: whatif([
      "you forget the <code>f</code> — just <code>\"{name}\"</code>? What actually prints?",
      "you put a method call inside — <code>f\"{name.upper()}\"</code>?",
      "you leave the braces empty — <code>f\"{}\"</code>?",
      "you need a literal <code>{</code> in the text — how? (hint: <code>{{</code>)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>+</code> joins, <code>*</code> repeats, <code>len(s)</code> counts characters.</li>
        <li><code>s[i]</code> indexes (0-based, negatives from the end); <code>s[a:b]</code> slices (b excluded).</li>
        <li>Strings are immutable — methods return new strings.</li>
        <li><code>.strip() .upper() .lower() .replace() .split() .title()</code>; <code>x in s</code>.</li>
        <li><code>f"{value}"</code> builds strings cleanly.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — String methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
    { label: "Real Python — Python f-strings", url: "https://realpython.com/python-f-strings/" },
    { label: "CS50P — Lecture 0: More on Strings", url: "https://cs50.harvard.edu/python/notes/0/" },
  ],
  exercises: [
    {
      title: "Shout it",
      tier: "warm", uses: ["variables (L2)"],
      prompt: `<p>Given <code>word = "python"</code>, print it in capitals.</p><pre>PYTHON</pre>`,
      starter: `word = "python"\n`,
      solution: `word = "python"\nprint(word.upper())`,
      success: "Methods are called with a dot after the value.",
      tests: [{ expect: "PYTHON" }],
    },
    {
      title: "Ends and middle",
      tier: "warm", uses: ["indexing"],
      prompt: `<p>Given <code>code = "ABCDEFG"</code>, print the first character, the last character, and
        the middle character (index 3), space-separated on one line.</p><pre>A G D</pre>`,
      starter: `code = "ABCDEFG"\n`,
      solution: `code = "ABCDEFG"\nprint(code[0], code[-1], code[3])`,
      success: "Index from the front with 0, from the back with -1.",
      tests: [{ expect: "A G D" }],
    },
    {
      title: "Reverse it",
      tier: "core", uses: ["slicing"],
      prompt: `<p>Given <code>s = "stressed"</code>, print it reversed.</p><pre>desserts</pre>`,
      starter: `s = "stressed"\n`,
      solution: `s = "stressed"\nprint(s[::-1])`,
      success: "s[::-1] — a step of -1 walks the string backwards.",
      tests: [
        { expect: "desserts" },
        { advisory: true, subst: [['"stressed"', '"live"']], expect: "evil",
          why: `Should reverse <em>any</em> string — <code>s[::-1]</code> does.` },
      ],
    },
    {
      title: "First name only",
      tier: "core", uses: ["split()", "indexing"],
      prompt: `<p>Given <code>full = "Ada Lovelace"</code>, print just the first name. Must work for
        <strong>any</strong> first name.</p><pre>Ada</pre>`,
      starter: `full = "Ada Lovelace"\n`,
      solution: `full = "Ada Lovelace"\nprint(full.split(" ")[0])`,
      success: "split turns text into pieces you can index — no counting characters.",
      tests: [
        { expect: "Ada" },
        { advisory: true, subst: [['"Ada Lovelace"', '"Grace Hopper"']], expect: "Grace",
          why: `Works here — but for a name like <code>"Grace Hopper"</code> a fixed slice length breaks. <code>full.split(" ")[0]</code> takes the first word whatever its length.` },
      ],
      review: [
        { pattern: "\\[\\s*\\d*\\s*:\\s*\\d+\\s*\\]",
          tip: `You sliced by a fixed number of characters. <code>full.split(" ")[0]</code> is idiomatic — it works for any first name.` },
      ],
    },
    {
      title: "Domain from email",
      tier: "core", uses: ["split()", "indexing"],
      prompt: `<p>Given <code>email = "ada@example.com"</code>, print just the domain (everything after
        the <code>@</code>). Must work for any address.</p><pre>example.com</pre>`,
      starter: `email = "ada@example.com"\n`,
      solution: `email = "ada@example.com"\nprint(email.split("@")[1])`,
      success: "split on any separator, then index the piece you want.",
      tests: [
        { expect: "example.com" },
        { advisory: true, subst: [['"ada@example.com"', '"bob@school.edu"']], expect: "school.edu",
          why: `Should work for any email — <code>email.split("@")[1]</code>.` },
      ],
    },
    {
      title: "Build a full name",
      tier: "core", uses: ["f-strings", "variables (L2)"],
      prompt: `<p>Given <code>first = "Grace"</code> and <code>last = "Hopper"</code>, use an
        <strong>f-string</strong> to print:</p><pre>Grace Hopper</pre>`,
      starter: `first = "Grace"\nlast = "Hopper"\n`,
      solution: `first = "Grace"\nlast = "Hopper"\nprint(f"{first} {last}")`,
      success: "f-strings keep message-building readable.",
      require: [{ pattern: "f[\"']", tip: `If you joined with <code>+</code>: that works. An f-string — <code>f"{first} {last}"</code> — is the readable, idiomatic way.` }],
      tests: [{ expect: "Grace Hopper" }],
    },
    {
      title: "Trimmed length",
      tier: "core", uses: ["strip()", "len()"],
      prompt: `<p>Given <code>s = "  hello  "</code>, print the length of the string <em>after</em>
        removing the surrounding spaces. Correct for any <code>s</code>.</p><pre>5</pre>`,
      starter: `s = "  hello  "\n`,
      solution: `s = "  hello  "\nprint(len(s.strip()))`,
      success: "Chaining reads left to right: strip, then measure.",
      tests: [
        { expect: "5" },
        { advisory: true, subst: [['"  hello  "', '"   hi   "']], expect: "2",
          why: `Works for this string — <code>len(s.strip())</code> is right for any <code>s</code>.` },
      ],
      review: [{ pattern: "print\\(\\s*5\\s*\\)", tip: `If you printed <code>5</code> directly: correct here, but <code>len(s.strip())</code> actually computes it.` }],
    },
    {
      title: "Number in a sentence",
      tier: "challenge", uses: ["f-strings", "operators (L3)", "variables (L2)"],
      prompt: `<p>Given <code>qty = 3</code> and <code>price = 4</code>, print exactly (note: the total is
        computed, and formatted to 2 decimals):</p><pre>3 items cost $12.00</pre>`,
      starter: `qty = 3\nprice = 4\n`,
      solution: `qty = 3\nprice = 4\nprint(f"{qty} items cost \${qty * price:.2f}")`,
      success: "f-strings can do arithmetic and formatting inside the braces.",
      tests: [
        { expect: "3 items cost $12.00" },
        { advisory: true, rewrite: [["qty\\s*=\\s*\\d+", "qty = 5"]], expect: "5 items cost $20.00",
          why: `Compute the total from the variables so it's right for any qty.` },
      ],
    },
    {
      title: "Censor a word",
      tier: "challenge", uses: ["replace()", "* operator (L3)", "len()"],
      prompt: `<p>Given <code>text = "the secret is hidden"</code> and <code>word = "secret"</code>,
        print the text with <code>word</code> replaced by asterisks of the same length.</p>
        <pre>the ****** is hidden</pre>`,
      starter: `text = "the secret is hidden"\nword = "secret"\n`,
      solution: `text = "the secret is hidden"\nword = "secret"\nprint(text.replace(word, "*" * len(word)))`,
      success: "\"*\" * len(word) builds the mask; replace swaps it in.",
      tests: [{ expect: "the ****** is hidden" }],
    },
    {
      title: "Palindrome check",
      tier: "challenge", uses: ["slicing", "lower()", "== comparison (L3)"],
      prompt: `<p>Given <code>s = "Racecar"</code>, print <code>True</code> if it reads the same
        forwards and backwards ignoring case, else <code>False</code>.</p><pre>True</pre>`,
      starter: `s = "Racecar"\n`,
      solution: `s = "Racecar"\nlow = s.lower()\nprint(low == low[::-1])`,
      success: "Lowercase first, then compare to the reverse.",
      tests: [
        { expect: "True" },
        { advisory: true, subst: [['"Racecar"', '"Python"']], expect: "False",
          why: `Should give <code>False</code> for a non-palindrome like "Python".` },
      ],
    },
    {
      title: "The name badge",
      tier: "boss", uses: ["split()", "title()", "indexing", "f-strings", "* operator (L3)", "len()"],
      prompt: `<p>Given <code>raw = "  ada LOVELACE  "</code>, produce a 3-line badge <strong>exactly</strong>:
        a rule of <code>=</code> as long as the tidied full name, the full name in Title Case, then the
        initials with dots. Tidied name here is <code>"Ada Lovelace"</code> (12 chars).</p>
        <pre>============\nAda Lovelace\nA.L.</pre>`,
      starter: `raw = "  ada LOVELACE  "\n`,
      solution: `raw = "  ada LOVELACE  "\nname = raw.strip().title()\nparts = name.split(" ")\nprint("=" * len(name))\nprint(name)\nprint(f"{parts[0][0]}.{parts[1][0]}.")`,
      success: "strip, title, split, index, f-string, repeat — the whole lesson in one badge.",
      tests: [{ expect: "============\nAda Lovelace\nA.L." }],
    },
  ],
},

/* ========================================================== 5 */
{
  id: "conditionals",
  section: "Learn the basics",
  title: "Conditionals",
  summary: "Run different code depending on whether a condition is True: if / elif / else.",
  lead: "Programs make decisions. Everything here rests on Lesson 3: a condition is just an expression that evaluates to True or False. The new part is choosing what runs next.",
  spiral: ["comparisons ==, <, >= (L3)", "and / or / not (L3)", "chained comparison (L3)", "% operator (L3)", "variables (L2)", "strings & f-strings (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>if / else</h2>
      <p>Write <code>if</code>, a condition, then a colon. The <strong>indented</strong> lines below
      run only when the condition is <code>True</code>. An optional <code>else:</code> block runs otherwise.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="if elif else flowchart">
        <rect x="200" y="10" width="160" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="280" y="35" text-anchor="middle" font-size="13" fill="var(--ink)">start</text>
        <polygon points="280,60 380,100 280,140 180,100" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="280" y="98" text-anchor="middle" font-size="12" fill="var(--ink)">score >= 90 ?</text>
        <text x="280" y="115" text-anchor="middle" font-size="11" fill="var(--ink-soft)">condition</text>
        <line x1="380" y1="100" x2="470" y2="100" stroke="var(--ink-soft)"/>
        <text x="400" y="92" font-size="11" fill="var(--good)">True</text>
        <rect x="470" y="80" width="80" height="40" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="510" y="104" text-anchor="middle" font-size="12" fill="var(--good)">print "A"</text>
        <line x1="280" y1="140" x2="280" y2="175" stroke="var(--ink-soft)"/>
        <text x="292" y="162" font-size="11" fill="var(--bad)">False</text>
        <polygon points="280,175 360,205 280,235 200,205" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="280" y="208" text-anchor="middle" font-size="11" fill="var(--ink)">score >= 80 ?</text>
        <line x1="360" y1="205" x2="450" y2="205" stroke="var(--ink-soft)"/>
        <text x="380" y="197" font-size="11" fill="var(--good)">True</text>
        <rect x="450" y="185" width="90" height="40" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="495" y="209" text-anchor="middle" font-size="12" fill="var(--good)">print "B"</text>
        <line x1="200" y1="205" x2="120" y2="205" stroke="var(--ink-soft)"/>
        <text x="150" y="197" font-size="11" fill="var(--bad)">False</text>
        <rect x="30" y="185" width="90" height="40" rx="8" fill="var(--bad-bg)" stroke="var(--bad)"/>
        <text x="75" y="209" text-anchor="middle" font-size="12" fill="var(--bad)">print "C"</text>
      </svg>`, `elif adds more forks; else is the catch-all. Only one branch runs.`)}
    ` },
    { type: "code", title: "A simple decision", code: `age = 20
if age >= 18:
    print("You may vote.")
else:
    print("Too young to vote.")
print("This line always runs.")` },
    { type: "html", html: `
      <div class="warn"><b>Two syntax rules you'll forget once</b>
      <ul style="margin:6px 0 0">
        <li>The line ends with a <strong>colon</strong>: <code>if age >= 18<b>:</b></code></li>
        <li>The body is <strong>indented</strong> (4 spaces). The indent <em>is</em> the block —
        mixed or missing indentation is an <code>IndentationError</code>.</li>
      </ul>
      And remember from L3: <code>if x = 5:</code> is an error — you mean <code>if x == 5:</code>.</div>
      <div class="predict"><b>Predict first</b>For <code>age = 20</code>: which of the three lines
      above print? What about for <code>age = 10</code>? The last line — does it depend on <code>age</code>?</div>
      <h2>elif: more than two paths</h2>
      <p>Check conditions <strong>in order, top to bottom</strong>. The first one that's <code>True</code>
      wins; its block runs and the rest are skipped entirely.</p>` },
    { type: "code", title: "Grade letters", code: `score = 72
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")` },
    { type: "html", html: whatif([
      "<code>score = 90</code> exactly — which letter? Now try <code>score = 89</code>.",
      "you move the <code>elif score >= 70</code> branch to the <em>top</em> of the chain — what does <code>95</code> print now?",
      "you change every <code>elif</code> to a separate <code>if</code> — does <code>95</code> print one letter or three?",
      "you forget the colon after <code>else</code>? Or don't indent a branch's body?",
    ]) },
    { type: "html", html: `
      <h3>Conditions can be combined</h3>
      <p>Use <code>and</code>, <code>or</code>, <code>not</code> from the operators lesson.</p>` },
    { type: "code", title: "Combined test", code: `hour = 14
if 12 <= hour < 18:
    print("Good afternoon")
elif hour < 12:
    print("Good morning")
else:
    print("Good evening")` },
    { type: "html", html: `
      <div class="warn"><b>Order matters in an elif chain</b>
      Put <code>if score >= 70</code> <em>before</em> <code>if score >= 90</code> and every 90+ score
      is caught by the 70 branch first. Check the <strong>strictest</strong> condition first.</div>
      <h3>Nesting: an if inside an if</h3>
      <p>The body of an <code>if</code> can contain another <code>if</code> — one more indent per level.</p>` },
    { type: "code", title: "Nested decision", code: `logged_in = True
is_admin = False
if logged_in:
    if is_admin:
        print("admin panel")
    else:
        print("user dashboard")
else:
    print("please log in")` },
    { type: "html", html: whatif([
      "<code>logged_in = False</code> — does the inner <code>if is_admin</code> even get checked?",
      "you rewrite it with one condition — <code>if logged_in and is_admin:</code> — what cases does that miss?",
      "both are <code>True</code>? Both <code>False</code>?",
    ]) },
    { type: "html", html: `
      <h3>Truthiness</h3>
      <p>Non-boolean values also count as True/False in a condition. <strong>Falsy:</strong>
      <code>0</code>, <code>0.0</code>, <code>""</code>, empty list/dict/set, <code>None</code>.
      Everything else is <strong>truthy</strong>.</p>` },
    { type: "code", title: "Empty means falsy", code: `name = ""
if name:
    print("Hi,", name)
else:
    print("No name given")` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>if condition:</code> then an indented block; optional <code>elif</code> / <code>else</code>.</li>
        <li>Exactly one branch of an if/elif/else chain runs.</li>
        <li>Indentation defines the block — be consistent (4 spaces).</li>
        <li>Empty / zero / <code>None</code> values are \u201cfalsy\u201d.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "CS50P — Lecture 1: Conditionals (notes)", url: "https://cs50.harvard.edu/python/notes/1/" },
    { label: "Python Tutorial — if Statements", url: "https://docs.python.org/3/tutorial/controlflow.html#if-statements" },
    { label: "Real Python — Conditional Statements in Python", url: "https://realpython.com/python-conditional-statements/" },
  ],
  exercises: [
    {
      title: "Pass or fail",
      tier: "warm", uses: ["comparison >= (L3)", "variables (L2)"],
      prompt: `<p>Given <code>mark = 55</code>, print <code>pass</code> if it is 50 or more, else <code>fail</code>.</p><pre>pass</pre>`,
      starter: `mark = 55\n`,
      solution: `mark = 55\nif mark >= 50:\n    print("pass")\nelse:\n    print("fail")`,
      success: "The shape: if condition: … else: …",
      tests: [
        { rewrite: [["mark\\s*=\\s*-?\\d+", "mark = 55"]], expect: "pass" },
        { rewrite: [["mark\\s*=\\s*-?\\d+", "mark = 49"]], expect: "fail",
          why: `<code>49</code> is below 50 → <code>fail</code>. Both branches must be reachable.` },
        { rewrite: [["mark\\s*=\\s*-?\\d+", "mark = 50"]], expect: "pass",
          why: `Exactly <code>50</code> counts as "50 or more" → <code>pass</code>. Use <code>&gt;= 50</code>, not <code>&gt; 50</code>.` },
      ],
      antisolutions: [
        { code: `mark = 55\nif mark > 50:\n    print("pass")\nelse:\n    print("fail")`, why: "> 50 excludes 50 itself, but the spec says '50 or more'" },
      ],
    },
    {
      title: "Sign of a number",
      tier: "warm", uses: ["comparisons (L3)"],
      prompt: `<p>Given <code>n = -4</code>, print <code>positive</code>, <code>negative</code>, or
        <code>zero</code>.</p><pre>negative</pre>`,
      starter: `n = -4\n`,
      solution: `n = -4\nif n > 0:\n    print("positive")\nelif n < 0:\n    print("negative")\nelse:\n    print("zero")`,
      success: "Three outcomes → if / elif / else.",
      tests: [
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = -4"]], expect: "negative" },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 9"]], expect: "positive", why: `<code>9</code> is positive.` },
        { rewrite: [["n\\s*=\\s*-?\\d+", "n = 0"]], expect: "zero",
          why: `<code>0</code> is neither positive nor negative — you need all three branches.` },
      ],
      antisolutions: [
        { code: `n = -4\nif n > 0:\n    print("positive")\nelse:\n    print("negative")`, why: "no zero case — 0 wrongly reports negative" },
      ],
    },
    {
      title: "Adult or minor",
      tier: "core", uses: ["comparison >= (L3)"],
      prompt: `<p><code>age = 20</code> is given. Print <code>adult</code> if <code>age</code> is 18 or more,
        otherwise print <code>minor</code>.</p><pre>adult</pre>`,
      starter: `age = 20\n`,
      solution: `age = 20\nif age >= 18:\n    print("adult")\nelse:\n    print("minor")`,
      success: "One test, two possible outcomes.",
      tests: [
        { rewrite: [["age\\s*=\\s*-?\\d+", "age = 20"]], expect: "adult" },
        { rewrite: [["age\\s*=\\s*-?\\d+", "age = 15"]], expect: "minor",
          why: `<code>age = 15</code> must print <code>minor</code> — cover both branches.` },
        { rewrite: [["age\\s*=\\s*-?\\d+", "age = 18"]], expect: "adult",
          why: `<code>18</code> itself counts as an adult ("18 or more"). Use <code>age &gt;= 18</code>, not <code>&gt; 18</code>.` },
      ],
      antisolutions: [
        { code: `age = 20\nif age > 18:\n    print("adult")\nelse:\n    print("minor")`, why: "> 18 makes an 18-year-old a minor" },
      ],
    },
    {
      title: "Larger of two",
      tier: "core", uses: ["comparisons (L3)", "print (L1)"],
      prompt: `<p>Given <code>a = 8</code> and <code>b = 5</code>, print the larger — <strong>without</strong>
        using <code>max()</code>.</p><pre>8</pre>`,
      starter: `a = 8\nb = 5\n`,
      solution: `a = 8\nb = 5\nif a > b:\n    print(a)\nelse:\n    print(b)`,
      success: "A branch can print a variable, not just a literal.",
      tests: [
        { expect: "8" },
        { rewrite: [["b\\s*=\\s*\\d+", "b = 20"]], expect: "20",
          why: `When <code>b</code> is the larger, print <code>b</code>. Compare the variables — don't just print <code>a</code>.` },
        { rewrite: [["a\\s*=\\s*\\d+", "a = 3"], ["b\\s*=\\s*\\d+", "b = 3"]], expect: "3",
          why: `Equal values → either branch is fine, but something must print <code>3</code>.` },
      ],
      review: [{ pattern: "max\\(", tip: `You'll meet <code>max(a, b)</code> in Lesson 10 — for now the if/else is the point.` }],
      antisolutions: [
        { code: `a = 8\nb = 5\nprint(a)`, why: "always prints a — wrong when b is larger" },
      ],
    },
    {
      title: "Letter grade",
      tier: "core", uses: ["elif ordering", "comparison >= (L3)"],
      prompt: `<p><code>score = 72</code>. Print the letter: <code>A</code> for 90+, <code>B</code> for 80–89,
        <code>C</code> for 70–79, otherwise <code>F</code>.</p><pre>C</pre>`,
      starter: `score = 72\n`,
      solution: `score = 72\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("F")`,
      success: "elif chains handle ranges cleanly.",
      tests: [
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 72"]], expect: "C" },
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 95"]], expect: "A",
          why: `<code>score = 95</code> → <code>A</code> (90+).` },
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 90"]], expect: "A",
          why: `Exactly <code>90</code> is an <code>A</code>. Use <code>score &gt;= 90</code>, not <code>&gt; 90</code>.` },
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 80"]], expect: "B",
          why: `Exactly <code>80</code> is a <code>B</code>. Every band boundary uses <code>&gt;=</code>.` },
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 70"]], expect: "C",
          why: `<code>70</code> is the bottom of the C band — <code>&gt;= 70</code>.` },
        { rewrite: [["score\\s*=\\s*-?\\d+", "score = 69"]], expect: "F",
          why: `Below <code>70</code> → <code>F</code>.` },
      ],
      antisolutions: [
        { code: `score = 72\nif score > 90:\n    print("A")\nelif score > 80:\n    print("B")\nelif score > 70:\n    print("C")\nelse:\n    print("F")`,
          why: "> instead of >= — 90/80/70 fall through to the wrong band" },
      ],
    },
    {
      title: "Freezing?",
      tier: "core", uses: ["comparison <= (L3)", "negative numbers (L2)"],
      prompt: `<p><code>temp = -3</code>. Print <code>freezing</code> if <code>temp</code> is 0 or below,
        else <code>above freezing</code>.</p><pre>freezing</pre>`,
      starter: `temp = -3\n`,
      solution: `temp = -3\nif temp <= 0:\n    print("freezing")\nelse:\n    print("above freezing")`,
      success: "Negatives compare just like you'd expect.",
      tests: [
        { rewrite: [["temp\\s*=\\s*-?\\d+", "temp = -3"]], expect: "freezing" },
        { rewrite: [["temp\\s*=\\s*-?\\d+", "temp = 8"]], expect: "above freezing",
          why: `At <code>temp = 8</code> it should say <code>above freezing</code> — both branches must work.` },
        { rewrite: [["temp\\s*=\\s*-?\\d+", "temp = 0"]], expect: "freezing",
          why: `Exactly <code>0</code> counts as freezing — use <code>temp &lt;= 0</code>, not <code>&lt; 0</code>.` },
      ],
      antisolutions: [
        { code: `temp = -3\nif temp < 0:\n    print("freezing")\nelse:\n    print("above freezing")`, why: "< 0 wrongly calls 0 'above freezing'" },
      ],
    },
    {
      title: "Part of the day",
      tier: "core", uses: ["chained comparison (L3)"],
      prompt: `<p><code>hour = 14</code> (24-hour clock). Print <code>afternoon</code> when <code>hour</code>
        is from 12 up to (but not including) 18, otherwise print <code>not afternoon</code>.</p><pre>afternoon</pre>`,
      starter: `hour = 14\n`,
      solution: `hour = 14\nif 12 <= hour < 18:\n    print("afternoon")\nelse:\n    print("not afternoon")`,
      success: "Chained comparisons read like maths.",
      tests: [
        { rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 14"]], expect: "afternoon" },
        { rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 9"]], expect: "not afternoon",
          why: `9am isn't the afternoon.` },
        { rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 18"]], expect: "not afternoon",
          why: `"up to but not including 18" → <code>18</code> is NOT afternoon. Use <code>&lt; 18</code> on the upper end.` },
        { rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 12"]], expect: "afternoon",
          why: `<code>12:00</code> counts — the range starts <em>at</em> 12, so <code>&lt;=</code> on the lower end.` },
        { rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 17"]], expect: "afternoon",
          why: `<code>17</code> is still before 18.` },
      ],
      antisolutions: [
        { code: `hour = 14\nif 12 <= hour <= 18:\n    print("afternoon")\nelse:\n    print("not afternoon")`, why: "<= 18 wrongly includes 18:00" },
        { code: `hour = 14\nif 12 < hour < 18:\n    print("afternoon")\nelse:\n    print("not afternoon")`, why: "< 12 wrongly excludes 12:00" },
      ],
    },
    {
      title: "FizzBuzz, one number",
      tier: "challenge", uses: ["% operator (L3)", "and (L3)", "elif ordering", "f-strings (L4)"],
      prompt: `<p>Given <code>n = 15</code>, print <code>FizzBuzz</code> if <code>n</code> is divisible by
        both 3 and 5, else <code>Fizz</code> if by 3, else <code>Buzz</code> if by 5, else <code>n</code>
        itself. Must be right for any <code>n</code>.</p><pre>FizzBuzz</pre>`,
      starter: `n = 15\n`,
      solution: `n = 15\nif n % 3 == 0 and n % 5 == 0:\n    print("FizzBuzz")\nelif n % 3 == 0:\n    print("Fizz")\nelif n % 5 == 0:\n    print("Buzz")\nelse:\n    print(n)`,
      success: "Check the most specific case (both) first.",
      tests: [
        { rewrite: [["n\\s*=\\s*\\d+", "n = 15"]], expect: "FizzBuzz" },
        { rewrite: [["n\\s*=\\s*\\d+", "n = 9"]], expect: "Fizz", why: `<code>9</code> → <code>Fizz</code> (÷3 only).` },
        { rewrite: [["n\\s*=\\s*\\d+", "n = 20"]], expect: "Buzz", why: `<code>20</code> → <code>Buzz</code> (÷5 only).` },
        { rewrite: [["n\\s*=\\s*\\d+", "n = 7"]], expect: "7", why: `<code>7</code> → the number itself.` },
        { rewrite: [["n\\s*=\\s*\\d+", "n = 30"]], expect: "FizzBuzz", why: `<code>30</code> is ÷3 and ÷5 → check that combined case <em>first</em>, or it prints <code>Fizz</code>.` },
      ],
      antisolutions: [
        { code: `n = 15\nif n % 3 == 0:\n    print("Fizz")\nelif n % 5 == 0:\n    print("Buzz")\nelif n % 3 == 0 and n % 5 == 0:\n    print("FizzBuzz")\nelse:\n    print(n)`,
          why: "FizzBuzz case is unreachable — the ÷3 branch catches 15 first" },
      ],
    },
    {
      title: "Ticket price",
      tier: "challenge", uses: ["comparisons (L3)", "elif ordering", "variables (L2)"],
      prompt: `<p>Given <code>age = 70</code>, print the ticket price: <code>5</code> for under 13,
        <code>8</code> for 65 and over, <code>12</code> for everyone in between.</p><pre>8</pre>`,
      starter: `age = 70\n`,
      solution: `age = 70\nif age < 13:\n    print(5)\nelif age >= 65:\n    print(8)\nelse:\n    print(12)`,
      success: "Two boundaries, three prices — the middle is the else.",
      tests: [
        { rewrite: [["age\\s*=\\s*\\d+", "age = 70"]], expect: "8" },
        { rewrite: [["age\\s*=\\s*\\d+", "age = 10"]], expect: "5", why: `Under 13 → <code>5</code>.` },
        { rewrite: [["age\\s*=\\s*\\d+", "age = 30"]], expect: "12", why: `In between → <code>12</code>.` },
        { rewrite: [["age\\s*=\\s*\\d+", "age = 65"]], expect: "8", why: `Exactly <code>65</code> → <code>8</code> (use <code>&gt;= 65</code>).` },
        { rewrite: [["age\\s*=\\s*\\d+", "age = 12"]], expect: "5", why: `<code>12</code> is still "under 13" → <code>5</code>.` },
      ],
    },
    {
      title: "Water state",
      tier: "challenge", uses: ["comparisons (L3)", "float values (L2)", "elif ordering"],
      prompt: `<p>Given <code>c = 20.0</code> (degrees Celsius), print <code>ice</code> at 0 or below,
        <code>steam</code> at 100 or above, otherwise <code>liquid</code>.</p><pre>liquid</pre>`,
      starter: `c = 20.0\n`,
      solution: `c = 20.0\nif c <= 0:\n    print("ice")\nelif c >= 100:\n    print("steam")\nelse:\n    print("liquid")`,
      success: "Floats compare exactly like ints.",
      tests: [
        { rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = 20.0"]], expect: "liquid" },
        { rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = -5.0"]], expect: "ice", why: `Below 0 → <code>ice</code>.` },
        { rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = 0.0"]], expect: "ice", why: `Exactly <code>0</code> → <code>ice</code> (use <code>&lt;= 0</code>).` },
        { rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = 100.0"]], expect: "steam", why: `Exactly <code>100</code> → <code>steam</code> (use <code>&gt;= 100</code>).` },
      ],
    },
    {
      title: "Rock paper scissors",
      tier: "boss", uses: ["== comparison (L3)", "and / or (L3)", "nested / chained conditions", "strings (L4)"],
      prompt: `<p>Given <code>p1</code> and <code>p2</code> (each <code>"rock"</code>, <code>"paper"</code>,
        or <code>"scissors"</code>), print <code>p1</code> if player 1 wins, <code>p2</code> if player 2
        wins, or <code>tie</code>.</p><pre>p1</pre>`,
      starter: `p1 = "rock"\np2 = "scissors"\n`,
      solution: `p1 = "rock"\np2 = "scissors"\nif p1 == p2:\n    print("tie")\nelif (p1 == "rock" and p2 == "scissors") or (p1 == "paper" and p2 == "rock") or (p1 == "scissors" and p2 == "paper"):\n    print("p1")\nelse:\n    print("p2")`,
      success: "Handle the tie first, then the three ways p1 wins; everything else is p2.",
      tests: [
        { expect: "p1" },
        { rewrite: [['p2\\s*=\\s*"scissors"', 'p2 = "rock"']], expect: "tie",
          why: `rock vs rock → same choice → <code>tie</code> (check equality first).` },
        { rewrite: [['p1\\s*=\\s*"rock"', 'p1 = "paper"']], expect: "p2",
          why: `paper vs scissors → scissors wins → <code>p2</code>.` },
        { rewrite: [['p1\\s*=\\s*"rock"', 'p1 = "scissors"'], ['p2\\s*=\\s*"scissors"', 'p2 = "paper"']], expect: "p1",
          why: `scissors vs paper → scissors wins → <code>p1</code>.` },
        { rewrite: [['p1\\s*=\\s*"rock"', 'p1 = "paper"'], ['p2\\s*=\\s*"scissors"', 'p2 = "rock"']], expect: "p1",
          why: `paper vs rock → paper wins → <code>p1</code>.` },
      ],
    },
  ],
},

/* ========================================================== 6 */
{
  id: "loops",
  section: "Learn the basics",
  title: "Loops",
  summary: "Repeat work with for and while; steer them with break and continue; master the accumulator.",
  lead: "This is where programs get powerful. A loop plus a condition plus an accumulator variable can answer almost any 'how many / what's the total / does any of them' question.",
  spiral: ["conditionals if/elif/else (L5)", "% operator (L3)", "comparisons & and/or (L3)", "variables & += (L2, L3)", "strings: len, indexing, in (L4)", "f-strings (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · for: do this for each item</h2>
      <p><code>range(n)</code> hands out <code>0, 1, … n-1</code>, one at a time. The loop variable
      takes each value in turn, the indented body runs, then it moves on.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="for loop iterating over range 3">
        <rect x="30" y="60" width="150" height="50" rx="8" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="105" y="90" text-anchor="middle" font-size="13" font-family="monospace" fill="var(--ink)">for i in range(3)</text>
        <g font-family="monospace" font-size="13">
          <rect x="240" y="20" width="120" height="36" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
          <text x="300" y="43" text-anchor="middle" fill="var(--ink)">i = 0 → run body</text>
          <rect x="240" y="66" width="120" height="36" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
          <text x="300" y="89" text-anchor="middle" fill="var(--ink)">i = 1 → run body</text>
          <rect x="240" y="112" width="120" height="36" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
          <text x="300" y="135" text-anchor="middle" fill="var(--ink)">i = 2 → run body</text>
        </g>
        <line x1="180" y1="85" x2="240" y2="38" stroke="var(--ink-soft)"/>
        <line x1="180" y1="85" x2="240" y2="84" stroke="var(--ink-soft)"/>
        <line x1="180" y1="85" x2="240" y2="130" stroke="var(--ink-soft)"/>
        <rect x="420" y="66" width="120" height="36" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="480" y="89" text-anchor="middle" font-size="12" fill="var(--good)">continue after</text>
        <line x1="360" y1="84" x2="420" y2="84" stroke="var(--ink-soft)"/>
      </svg>`, `The body runs once per value, then the program moves on.`)}
    ` },
    { type: "code", title: "Counting with range", code: `for i in range(5):
    print("i is", i)

for n in range(1, 6):
    print(n, "squared is", n ** 2)` },
    { type: "html", html: whatif([
      "you use <code>range(3, 3)</code>? How many times does the body run?",
      "you use <code>range(5, 0, -1)</code>? <code>range(0, 10, 3)</code>?",
      "you <em>don't</em> indent the line under <code>for</code>?",
      "you change <code>n</code> inside the loop with <code>n = 99</code> — does the loop stop early?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Three ways to call <code>range</code></b>
      <ul style="margin:6px 0 0">
        <li><code>range(5)</code> → 0 1 2 3 4</li>
        <li><code>range(2, 6)</code> → 2 3 4 5 &nbsp;(start included, stop excluded)</li>
        <li><code>range(0, 10, 2)</code> → 0 2 4 6 8 &nbsp;(step)</li>
      </ul></div>
      <div class="predict"><b>Predict first</b>How many lines does <code>for i in range(3, 3):</code>
      print? And <code>for i in range(5, 0, -1):</code>?</div>
      <h3>Looping over a string</h3>
      <p>A <code>for</code> loop walks anything that holds items — including a string, character by
      character. (Lists are next lesson; the loop is identical.)</p>` },
    { type: "code", title: "Each character", code: `for letter in "cat":
    print(letter)` },
    { type: "html", html: `
      <h2>2 · The accumulator pattern — learn this cold</h2>
      <p>Almost every "compute something over a collection" task has the same three parts:</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="accumulator pattern">
        <rect x="20" y="20" width="180" height="34" rx="7" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="110" y="42" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">total = 0   (before)</text>
        <rect x="20" y="64" width="270" height="34" rx="7" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="155" y="86" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">for n in ...:  total += n   (during)</text>
        <rect x="20" y="108" width="180" height="34" rx="7" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="110" y="130" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--good)">print(total)   (after)</text>
        <text x="330" y="45" font-size="11" fill="var(--ink-soft)">1. start the result</text>
        <text x="330" y="87" font-size="11" fill="var(--ink-soft)">2. update it each pass</text>
        <text x="330" y="129" font-size="11" fill="var(--ink-soft)">3. use it once the loop ends</text>
      </svg>`, `Sum: start 0, add. Count: start 0, +1 when a test passes. Build text: start "", += each piece.`)}` },
    { type: "code", title: "Sum, count, and build — same shape", code: `total = 0
count = 0
letters = ""
for ch in "banana":
    total += 1              # count everything
    if ch == "a":
        count += 1          # count only the a's
    letters += ch.upper()   # build a new string
print(total, count, letters)` },
    { type: "html", html: `
      <h2>3 · while: repeat until a condition fails</h2>
      <p>Use <code>for</code> when you know how many times (or you have items to walk). Use
      <code>while</code> when you'll stop on a <em>condition</em> — and something in the body must
      move you toward that stop.</p>
      <div class="warn"><b>Watch the exit</b>If nothing inside the loop can make the condition
      <code>False</code>, it runs forever. This app stops runaway loops after ~10 seconds — but a
      frozen tab is still no fun. Always ask: "what makes this end?"</div>` },
    { type: "code", title: "Countdown", code: `n = 3
while n > 0:
    print(n)
    n -= 1        # <-- this is what ends the loop
print("Lift off!")` },
    { type: "html", html: whatif([
      "you delete the <code>n -= 1</code> line? (the app will stop it after ~10s — but why does it never end?)",
      "you start with <code>n = 0</code>? Does the body run at all?",
      "you move <code>n -= 1</code> <em>above</em> the <code>print(n)</code>?",
    ], "Think it through first. Only run the runaway version if you're ready to wait ~10 seconds for the auto-stop.") },
    { type: "html", html: `
      <h2>4 · Steering: break and continue</h2>
      <p><code>break</code> leaves the loop <em>immediately</em>. <code>continue</code> skips the rest
      of this pass and jumps to the next one. Both usually sit inside an <code>if</code>.</p>` },
    { type: "code", title: "Steering the loop", code: `for n in range(1, 11):
    if n == 7:
        break
    if n % 2 == 0:
        continue
    print(n)` },
    { type: "html", html: `
      <h2>5 · Loops inside loops</h2>
      <p>A loop's body can contain another loop. The inner one runs fully for <em>each</em> pass of
      the outer one. Great for grids, pairs, and tables.</p>` },
    { type: "code", title: "A little multiplication table", code: `for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end=" ")
    print()   # newline after each row` },
    { type: "html", html: whatif([
      "you move the bare <code>print()</code> <em>inside</em> the inner loop (indent it one more)?",
      "you remove the <code>end=\" \"</code> from the inner print?",
      "the inner loop is <code>range(1, 4)</code> but the outer is <code>range(1, 3)</code> — how many numbers print in total?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>for x in range(a, b):</code> — repeat with <code>x</code> = a … b-1.</li>
        <li><code>for x in "text":</code> — repeat once per character.</li>
        <li>Accumulator: initialise before the loop, update inside.</li>
        <li><code>while condition:</code> — repeat while it stays True; ensure it can end.</li>
        <li><code>break</code> exits; <code>continue</code> skips to the next iteration.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "CS50P — Lecture 2: Loops (notes)", url: "https://cs50.harvard.edu/python/notes/2/" },
    { label: "Python Tutorial — for Statements & range()", url: "https://docs.python.org/3/tutorial/controlflow.html#for-statements" },
    { label: "Real Python — Python for Loops", url: "https://realpython.com/python-for-loop/" },
  ],
  exercises: [
    {
      title: "One to five",
      tier: "warm", uses: ["range()"],
      prompt: `<p>Print the numbers 1 through 5, one per line.</p><pre>1\n2\n3\n4\n5</pre>`,
      solution: `for n in range(1, 6):\n    print(n)`,
      success: "range stops one before its second number.",
      tests: [{ expect: "1\n2\n3\n4\n5" }],
    },
    {
      title: "Countdown",
      tier: "warm", uses: ["range() step", "print (L1)"],
      prompt: `<p>Print 5 down to 1, one per line, then <code>go</code>.</p><pre>5\n4\n3\n2\n1\ngo</pre>`,
      solution: `for n in range(5, 0, -1):\n    print(n)\nprint("go")`,
      success: "A negative step counts backwards.",
      tests: [{ expect: "5\n4\n3\n2\n1\ngo" }],
    },
    {
      title: "Sum to 100",
      tier: "core", uses: ["accumulator", "+= (L3)"],
      prompt: `<p>Print the sum of every whole number from 1 to 100. Compute it with a loop
        (or <code>sum(...)</code>).</p><pre>5050</pre>`,
      solution: `total = 0\nfor n in range(1, 101):\n    total += n\nprint(total)`,
      success: "Start at 0 before the loop, add inside, print after.",
      forbid: [{ pattern: "print\\(\\s*5050\\s*\\)",
        tip: `You printed <code>5050</code> directly — correct! To show the method, compute it: a loop with <code>total += n</code>, or <code>sum(range(1, 101))</code>.` }],
      tests: [{ expect: "5050" }],
    },
    {
      title: "Count the vowels",
      tier: "core", uses: ["loop over string (L4)", "in operator (L4)", "if (L5)", "accumulator"],
      prompt: `<p>Given <code>word = "education"</code>, count how many characters are vowels
        (<code>a e i o u</code>) and print the count. Right for any word.</p><pre>5</pre>`,
      starter: `word = "education"\n`,
      solution: `word = "education"\ncount = 0\nfor ch in word:\n    if ch in "aeiou":\n        count += 1\nprint(count)`,
      success: "ch in \"aeiou\" is a clean membership test.",
      tests: [
        { expect: "5" },
        { advisory: true, subst: [['"education"', '"rhythm"']], expect: "0",
          why: `Should give <code>0</code> for a word with no vowels — scan every character.` },
      ],
    },
    {
      title: "Evens to twenty",
      tier: "core", uses: ["range() step OR % + if (L3, L5)"],
      prompt: `<p>Print the even numbers from 2 to 20 inclusive, one per line.</p>
        <pre>2\n4\n6\n8\n10\n12\n14\n16\n18\n20</pre>`,
      solution: `for n in range(2, 21, 2):\n    print(n)`,
      success: "range(2, 21, 2) — or loop 1..20 and test n % 2 == 0.",
      tests: [{ expect: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20" }],
    },
    {
      title: "Largest so far",
      tier: "core", uses: ["accumulator", "if + comparison (L5, L3)", "loop over string digits"],
      prompt: `<p>Given <code>digits = "3719284"</code>, find and print the largest single digit.
        Track a "best so far" as you loop. (Compare the characters directly — <code>"7" &gt; "3"</code>
        works.) Right for any digit string.</p><pre>9</pre>`,
      starter: `digits = "3719284"\n`,
      solution: `digits = "3719284"\nbest = digits[0]\nfor ch in digits:\n    if ch > best:\n        best = ch\nprint(best)`,
      success: "Seed 'best' with the first item, then upgrade it whenever you see bigger.",
      tests: [
        { expect: "9" },
        { advisory: true, subst: [['"3719284"', '"111"']], expect: "1",
          why: `Should work when nothing beats the seed — print <code>1</code> for "111".` },
      ],
      review: [{ pattern: "max\\(", tip: `<code>max(digits)</code> is the one-liner — but the "best so far" loop is a pattern you'll reuse constantly.` }],
    },
    {
      title: "Fizz or number",
      tier: "challenge", uses: ["loop", "% (L3)", "if/else (L5)"],
      prompt: `<p>For 1 to 15: print <code>Fizz</code> if divisible by 3, else the number. One per line.
        Build it with a loop.</p><pre>1\n2\nFizz\n4\n5\nFizz\n7\n8\nFizz\n10\n11\nFizz\n13\n14\nFizz</pre>`,
      solution: `for n in range(1, 16):\n    if n % 3 == 0:\n        print("Fizz")\n    else:\n        print(n)`,
      success: "Loop + modulo + conditional.",
      tests: [
        { expect: "1\n2\nFizz\n4\n5\nFizz\n7\n8\nFizz\n10\n11\nFizz\n13\n14\nFizz" },
        { advisory: true, rewrite: [["range\\(\\s*1\\s*,\\s*16\\s*\\)", "range(1, 8)"]], expect: "1\n2\nFizz\n4\n5\nFizz\n7",
          why: `If you typed the lines out: it works, but the loop over <code>range(1, 16)</code> is the point.` },
      ],
    },
    {
      title: "First multiple of 7",
      tier: "challenge", uses: ["while OR for", "break", "% (L3)", "if (L5)"],
      prompt: `<p>Given <code>start = 100</code>, print the first number ≥ <code>start</code> that is
        divisible by 7. Use a loop that <code>break</code>s when it finds it.</p><pre>105</pre>`,
      starter: `start = 100\n`,
      solution: `start = 100\nn = start\nwhile True:\n    if n % 7 == 0:\n        print(n)\n        break\n    n += 1`,
      success: "break is how a loop says 'found it, stop looking'.",
      tests: [
        { rewrite: [["start\\s*=\\s*\\d+", "start = 100"]], expect: "105" },
        { advisory: true, rewrite: [["start\\s*=\\s*\\d+", "start = 49"]], expect: "49",
          why: `If <code>start</code> is already a multiple of 7, that's the answer.` },
      ],
    },
    {
      title: "Running total ticket",
      tier: "challenge", uses: ["loop over string", ".index() (L4)", "accumulator", "f-strings (L4)"],
      prompt: `<p>Given <code>digits = "13005"</code>, print each digit and a running total, one line per
        digit, in this shape (digit, then total-so-far):</p>
        <pre>1 -> 1\n3 -> 4\n0 -> 4\n0 -> 4\n5 -> 9</pre>
        <p>You haven't done number-conversion yet (Lesson 9). Trick: the numeric value of a digit
        character <code>ch</code> is its position in <code>"0123456789"</code> —
        <code>"0123456789".index(ch)</code>.</p>`,
      starter: `digits = "13005"\n`,
      solution: `digits = "13005"\ntotal = 0\nfor ch in digits:\n    total += "0123456789".index(ch)\n    print(f"{ch} -> {total}")`,
      success: "Accumulate as you go, print the state each pass.",
      tests: [{ expect: "1 -> 1\n3 -> 4\n0 -> 4\n0 -> 4\n5 -> 9" }],
    },
    {
      title: "Triangle of stars",
      tier: "challenge", uses: ["nested loops", "* operator (L3) OR inner loop", "range()"],
      prompt: `<p>Print a left-aligned triangle of <code>*</code>, 5 rows: row 1 has one star, row 5 has five.</p>
        <pre>*\n**\n***\n****\n*****</pre>`,
      solution: `for row in range(1, 6):\n    print("*" * row)`,
      success: "\"*\" * row is the quick way; a nested loop also works.",
      tests: [{ expect: "*\n**\n***\n****\n*****" }],
    },
    {
      title: "Collatz steps",
      tier: "boss", uses: ["while", "if/else (L5)", "% and // (L3)", "accumulator (step count)"],
      prompt: `<p>The Collatz process: while <code>n</code> is not 1, replace it with <code>n // 2</code> if
        even, else <code>3 * n + 1</code>. Given <code>n = 6</code>, print how many steps it takes to
        reach 1.</p><pre>8</pre>`,
      starter: `n = 6\n`,
      solution: `n = 6\nsteps = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        n = 3 * n + 1\n    steps += 1\nprint(steps)`,
      success: "A while loop whose body changes n toward the exit, counting as it goes.",
      tests: [
        { rewrite: [["^n\\s*=\\s*\\d+\\s*$", "n = 6"]], expect: "8" },
        { advisory: true, rewrite: [["^n\\s*=\\s*\\d+\\s*$", "n = 1"]], expect: "0",
          why: `If <code>n</code> starts at 1, it takes 0 steps — the <code>while</code> condition is false immediately.` },
        { advisory: true, rewrite: [["^n\\s*=\\s*\\d+\\s*$", "n = 27"]], expect: "111",
          why: `27 famously takes 111 steps — your loop should handle it.` },
      ],
    },
  ],
},

/* ========================================================== 7 */
{
  id: "collections",
  section: "Learn the basics",
  title: "Lists, tuples, sets",
  summary: "Three ways to hold many values: the mutable list, the fixed tuple, the unique set.",
  lead: "You already looped over strings and built up totals. Now the thing you loop over — and the thing you build up — can be a collection of any values.",
  spiral: ["for loops & accumulator (L6)", "indexing & slicing (L4)", "split() returns a list (L4)", "if / in (L5, L4)", "sorted / sum (built-ins)", "f-strings (L4)"],
  blocks: [
    { type: "html", html: `
      ${fig(`
      <svg class="ill" viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="list vs tuple vs set">
        <text x="90" y="24" text-anchor="middle" font-size="13" fill="var(--ink)">list  [ ]</text>
        <text x="90" y="40" text-anchor="middle" font-size="11" fill="var(--ink-soft)">ordered · changeable</text>
        <g font-family="monospace" font-size="13">
          <rect x="30" y="55" width="40" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="70" y="55" width="40" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="110" y="55" width="40" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="50" y="80" text-anchor="middle" fill="var(--ink)">10</text>
          <text x="90" y="80" text-anchor="middle" fill="var(--ink)">20</text>
          <text x="130" y="80" text-anchor="middle" fill="var(--ink)">30</text>
          <text x="50" y="110" text-anchor="middle" font-size="10" fill="var(--accent)">0</text>
          <text x="90" y="110" text-anchor="middle" font-size="10" fill="var(--accent)">1</text>
          <text x="130" y="110" text-anchor="middle" font-size="10" fill="var(--accent)">2</text>
        </g>
        <text x="320" y="24" text-anchor="middle" font-size="13" fill="var(--ink)">tuple  ( )</text>
        <text x="320" y="40" text-anchor="middle" font-size="11" fill="var(--ink-soft)">ordered · locked</text>
        <g font-family="monospace" font-size="13">
          <rect x="260" y="55" width="40" height="40" fill="var(--panel-2)" stroke="var(--line)"/>
          <rect x="300" y="55" width="40" height="40" fill="var(--panel-2)" stroke="var(--line)"/>
          <text x="280" y="80" text-anchor="middle" fill="var(--ink)">3</text>
          <text x="320" y="80" text-anchor="middle" fill="var(--ink)">4</text>
          <text x="345" y="50" font-size="16" fill="var(--ink-soft)">🔒</text>
        </g>
        <text x="540" y="24" text-anchor="middle" font-size="13" fill="var(--ink)">set  { }</text>
        <text x="540" y="40" text-anchor="middle" font-size="11" fill="var(--ink-soft)">unordered · unique</text>
        <g font-family="monospace" font-size="13">
          <circle cx="500" cy="78" r="22" fill="var(--box)" stroke="var(--box-line)"/>
          <circle cx="548" cy="70" r="22" fill="var(--box)" stroke="var(--box-line)"/>
          <circle cx="530" cy="110" r="22" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="500" y="83" text-anchor="middle" fill="var(--ink)">1</text>
          <text x="548" y="75" text-anchor="middle" fill="var(--ink)">2</text>
          <text x="530" y="115" text-anchor="middle" fill="var(--ink)">3</text>
        </g>
        <text x="320" y="160" text-anchor="middle" font-size="12" fill="var(--ink-soft)">list([1, 1, 2, 3])  ->  [1, 1, 2, 3]        set([1, 1, 2, 3])  ->  {1, 2, 3}</text>
      </svg>`, `Pick by what you need: change items → list; fixed pair/record → tuple; membership & de-dup → set.`)}
      <h2>List — the workhorse</h2>` },
    { type: "code", title: "Make & modify a list", code: `nums = [4, 8, 15]
nums.append(16)
nums.append(23)
print(nums)
print(nums[0], nums[-1])
print(nums[1:3])
print(len(nums))
print(23 in nums)` },
    { type: "html", html: whatif([
      "you <code>nums.append([9, 9])</code> — what's <code>len(nums)</code> now, and what is <code>nums[-1]</code>?",
      "you ask for <code>nums[99]</code>? What about the slice <code>nums[1:99]</code>?",
      "you <code>nums.remove(100)</code> — a value that isn't there?",
      "two names point at the same list: <code>a = nums</code>, then <code>a.append(0)</code> — did <code>nums</code> change too?",
    ]) },
    { type: "code", title: "Loop, sort, sum", code: `scores = [7, 2, 9, 1]
for s in scores:
    print("score:", s)
scores.sort()
print("sorted:", scores)
print("sum:", sum(scores))` },
    { type: "html", html: `
      <div class="warn"><b><code>.sort()</code> vs <code>sorted()</code></b>
      <code>scores.sort()</code> rearranges the list <em>in place</em> and returns <code>None</code>.
      <code>sorted(scores)</code> leaves the original alone and hands back a <em>new</em> sorted list.
      Writing <code>scores = scores.sort()</code> is a classic bug — you just set <code>scores</code> to <code>None</code>.</div>
      <h3>Build a list the way you built a total</h3>
      <p>Start with <code>[]</code>, <code>.append(...)</code> inside a loop. Same accumulator pattern
      from Lesson 6 — the accumulator is just a list now.</p>` },
    { type: "code", title: "Accumulate into a list", code: `squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)

# a list also comes straight out of split()
parts = "a,b,c,d".split(",")
print(parts, len(parts))` },
    { type: "html", html: whatif([
      "you write <code>squares = squares.sort()</code> and then print <code>squares</code>?",
      "you put <code>squares = []</code> <em>inside</em> the loop instead of before it?",
      "you <code>.split(\",\")</code> a string that has no comma in it?",
      "you <code>.split()</code> with no argument on <code>\"  a   b \"</code> — how many pieces, and any blanks?",
    ]) },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Method</th><th>Effect</th></tr>
        <tr><td><code>.append(x)</code></td><td>add <code>x</code> to the end</td></tr>
        <tr><td><code>.insert(i, x)</code></td><td>put <code>x</code> at position <code>i</code></td></tr>
        <tr><td><code>.pop()</code> / <code>.pop(i)</code></td><td>remove & return last (or item <code>i</code>)</td></tr>
        <tr><td><code>.remove(x)</code></td><td>delete the first <code>x</code></td></tr>
        <tr><td><code>.sort()</code> / <code>.reverse()</code></td><td>reorder in place</td></tr>
      </table>
      <h2>Tuple — a fixed group</h2>
      <p>Same indexing/slicing as a list, but you <strong>cannot</strong> change it after creation.
      Great for values that belong together, like a coordinate.</p>` },
    { type: "code", title: "Packing & unpacking", code: `point = (3, 4)
x, y = point
print("x =", x, " y =", y)
print(point[0])
# point[0] = 9   # -> TypeError: tuples are immutable` },
    { type: "html", html: `
      <h2>Set — unique members, fast lookup</h2>` },
    { type: "code", title: "De-duplicate", code: `visits = [7, 3, 9, 3, 1, 9, 7]
unique = set(visits)
print(unique)
print("how many unique:", len(unique))
print(3 in unique)
unique.add(100)
print(unique)` },
    { type: "html", html: whatif([
      "the list already had no duplicates — does <code>set(...)</code> change anything you can see?",
      "you <code>set(\"banana\")</code> — a string instead of a list?",
      "you <code>unique.add(3)</code> when <code>3</code> is already in there?",
      "you need the items back in a fixed order afterward — is a set the right tool?",
    ]) },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Given <code>a = [1, 2, 3]</code>:
      what is <code>a + [4]</code>? What does <code>a * 2</code> give? And after
      <code>a.append([9, 9])</code>, what is <code>len(a)</code>?</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>list</code> <code>[...]</code>: ordered, changeable, indexable; <code>.append/.pop/.sort</code>.</li>
        <li><code>tuple</code> <code>(...)</code>: ordered, <em>immutable</em>; supports unpacking <code>a, b = pair</code>.</li>
        <li><code>set</code> <code>{...}</code> / <code>set(seq)</code>: unordered, no duplicates, fast <code>in</code>.</li>
        <li><code>len</code>, <code>in</code>, and <code>for</code> work on all three.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Data Structures (lists, tuples, sets)", url: "https://docs.python.org/3/tutorial/datastructures.html" },
    { label: "Real Python — Lists and Tuples in Python", url: "https://realpython.com/python-lists-tuples/" },
    { label: "Real Python — Sets in Python", url: "https://realpython.com/python-sets/" },
  ],
  exercises: [
    {
      title: "Ends of the list",
      tier: "warm", uses: ["indexing (L4)"],
      prompt: `<p>Given <code>nums = [4, 8, 15, 16, 23, 42]</code>, print the first and last elements
        on one line.</p><pre>4 42</pre>`,
      starter: `nums = [4, 8, 15, 16, 23, 42]\n`,
      solution: `nums = [4, 8, 15, 16, 23, 42]\nprint(nums[0], nums[-1])`,
      success: "Indexing works on lists exactly like strings.",
      tests: [{ expect: "4 42" }],
    },
    {
      title: "Grow the list",
      tier: "warm", uses: [".append()"],
      prompt: `<p>Start with <code>fruits = ["apple", "banana"]</code>. Append <code>"cherry"</code>,
        then print the list.</p><pre>['apple', 'banana', 'cherry']</pre>`,
      starter: `fruits = ["apple", "banana"]\n`,
      solution: `fruits = ["apple", "banana"]\nfruits.append("cherry")\nprint(fruits)`,
      success: "append adds to the end, in place.",
      tests: [{ expect: "['apple', 'banana', 'cherry']" }],
    },
    {
      title: "Table of cubes",
      tier: "core", uses: ["for + range (L6)", "accumulate into a list", "** (L3)"],
      prompt: `<p>Build a list of the cubes of 1 to 5 (<code>[1, 8, 27, 64, 125]</code>) with a loop and
        <code>.append()</code>, then print it.</p><pre>[1, 8, 27, 64, 125]</pre>`,
      solution: `cubes = []\nfor n in range(1, 6):\n    cubes.append(n ** 3)\nprint(cubes)`,
      success: "Same accumulator pattern as summing — the accumulator is a list.",
      tests: [{ expect: "[1, 8, 27, 64, 125]" }],
    },
    {
      title: "Sum a list, by hand",
      tier: "core", uses: ["for over list (L6)", "accumulator (L6)"],
      prompt: `<p>Given <code>nums = [10, 4, 7, 1]</code>, print the total <strong>without</strong>
        <code>sum()</code>. Right for any list.</p><pre>22</pre>`,
      starter: `nums = [10, 4, 7, 1]\n`,
      solution: `nums = [10, 4, 7, 1]\ntotal = 0\nfor x in nums:\n    total += x\nprint(total)`,
      success: "You've done this over a string; a list is the same.",
      tests: [
        { expect: "22" },
        { advisory: true, subst: [["[10, 4, 7, 1]", "[5]"]], expect: "5", why: `Should also work for a one-item list.` },
      ],
      review: [{ pattern: "sum\\(nums\\)|sum\\(\\s*nums", tip: `<code>sum(nums)</code> is the real answer — this exercise just wanted the loop.` }],
    },
    {
      title: "Keep the evens",
      tier: "core", uses: ["for (L6)", "if + % (L5, L3)", "build a list"],
      prompt: `<p>Given <code>nums = [3, 8, 1, 6, 7, 4]</code>, print a new list containing only the even
        numbers, in the same order.</p><pre>[8, 6, 4]</pre>`,
      starter: `nums = [3, 8, 1, 6, 7, 4]\n`,
      solution: `nums = [3, 8, 1, 6, 7, 4]\nevens = []\nfor x in nums:\n    if x % 2 == 0:\n        evens.append(x)\nprint(evens)`,
      success: "Loop, test, append — the filter pattern.",
      tests: [
        { expect: "[8, 6, 4]" },
        { advisory: true, subst: [["[3, 8, 1, 6, 7, 4]", "[1, 3, 5]"]], expect: "[]",
          why: `An all-odd list should give <code>[]</code>.` },
      ],
    },
    {
      title: "Word count",
      tier: "core", uses: ["split() (L4)", "len()"],
      prompt: `<p>Given <code>sentence = "the quick brown fox"</code>, print how many words it has.
        Right for any sentence (single spaces).</p><pre>4</pre>`,
      starter: `sentence = "the quick brown fox"\n`,
      solution: `sentence = "the quick brown fox"\nprint(len(sentence.split(" ")))`,
      success: "split turns text into a list; len counts it.",
      tests: [
        { expect: "4" },
        { advisory: true, subst: [['"the quick brown fox"', '"one two"']], expect: "2", why: `Should work for any word count.` },
      ],
    },
    {
      title: "How many distinct?",
      tier: "core", uses: ["set()", "len()"],
      prompt: `<p>Given <code>scores = [7, 3, 9, 3, 1, 9, 7]</code>, print how many <em>different</em>
        values it contains. Any list.</p><pre>4</pre>`,
      starter: `scores = [7, 3, 9, 3, 1, 9, 7]\n`,
      solution: `scores = [7, 3, 9, 3, 1, 9, 7]\nprint(len(set(scores)))`,
      success: "set(...) is the idiomatic de-dup.",
      tests: [
        { expect: "4" },
        { advisory: true, subst: [["[7, 3, 9, 3, 1, 9, 7]", "[5, 5, 5, 5]"]], expect: "1",
          why: `Works for this list — <code>len(set(scores))</code> is right for any list.` },
      ],
    },
    {
      title: "Max without max()",
      tier: "challenge", uses: ["'best so far' loop (L6)", "if + comparison (L5, L3)"],
      prompt: `<p>Given <code>nums = [4, 19, 7, 25, 11]</code>, print the largest — <strong>without</strong>
        <code>max()</code>. Any non-empty list.</p><pre>25</pre>`,
      starter: `nums = [4, 19, 7, 25, 11]\n`,
      solution: `nums = [4, 19, 7, 25, 11]\nbest = nums[0]\nfor x in nums:\n    if x > best:\n        best = x\nprint(best)`,
      success: "Seed with the first item, upgrade whenever you see bigger.",
      tests: [
        { expect: "25" },
        { advisory: true, subst: [["[4, 19, 7, 25, 11]", "[-5, -1, -9]"]], expect: "-1",
          why: `Must also work when every value is negative — seed with <code>nums[0]</code>, not 0.` },
      ],
      review: [{ pattern: "max\\(", tip: `<code>max(nums)</code> is the answer in real code — the loop is the skill here.` }],
    },
    {
      title: "Unique, order kept",
      tier: "challenge", uses: ["for (L6)", "not in (L4)", "build a list"],
      prompt: `<p>Given <code>items = [3, 1, 3, 2, 1, 4, 2]</code>, print a list with duplicates removed
        but the <strong>first-seen order preserved</strong> (a plain <code>set</code> loses order).</p>
        <pre>[3, 1, 2, 4]</pre>`,
      starter: `items = [3, 1, 3, 2, 1, 4, 2]\n`,
      solution: `items = [3, 1, 3, 2, 1, 4, 2]\nseen = []\nfor x in items:\n    if x not in seen:\n        seen.append(x)\nprint(seen)`,
      success: "'if x not in seen' is the order-preserving de-dup.",
      tests: [{ expect: "[3, 1, 2, 4]" }],
    },
    {
      title: "Unpack in a loop",
      tier: "challenge", uses: ["tuple unpacking", "for (L6)", "f-strings (L4)"],
      prompt: `<p>Given <code>pairs = [("Ada", 90), ("Bob", 75), ("Cy", 88)]</code>, print one line per
        pair in the shape <code>name: score</code>.</p><pre>Ada: 90\nBob: 75\nCy: 88</pre>`,
      starter: `pairs = [("Ada", 90), ("Bob", 75), ("Cy", 88)]\n`,
      solution: `pairs = [("Ada", 90), ("Bob", 75), ("Cy", 88)]\nfor name, score in pairs:\n    print(f"{name}: {score}")`,
      success: "The loop variable can unpack each tuple straight into two names.",
      tests: [{ expect: "Ada: 90\nBob: 75\nCy: 88" }],
    },
    {
      title: "Score report",
      tier: "boss", uses: ["sum/len/min", "loop + if (L5, L6)", "round", "f-strings (L4)", "count above average"],
      prompt: `<p>Given <code>scores = [72, 88, 91, 64, 88, 100]</code>, print four lines exactly:</p>
        <pre>lowest: 64\nhighest: 100\naverage: 83.8\nabove average: 4</pre>
        <p>Average is rounded to 1 decimal. "above average" counts scores strictly greater than the
        (unrounded) mean.</p>`,
      starter: `scores = [72, 88, 91, 64, 88, 100]\n`,
      solution: `scores = [72, 88, 91, 64, 88, 100]\navg = sum(scores) / len(scores)\nabove = 0\nfor s in scores:\n    if s > avg:\n        above += 1\nprint("lowest:", min(scores))\nprint("highest:", max(scores))\nprint(f"average: {round(avg, 1)}")\nprint("above average:", above)`,
      success: "Compute the mean once, then loop to count against it.",
      tests: [{ expect: "lowest: 64\nhighest: 100\naverage: 83.8\nabove average: 4" }],
    },
  ],
},

/* ========================================================== 8 */
{
  id: "dicts",
  section: "Learn the basics",
  title: "Dictionaries",
  summary: "Store data as key → value pairs and look things up by name instead of position.",
  lead: "A list finds things by position; a dictionary finds them by name. Once you can loop-and-count into a dict, you can summarise almost any data.",
  spiral: ["for loops (L6)", "if / in (L5, L4)", "tuple unpacking in a for (L7)", "accumulator pattern (L6)", "f-strings (L4)", "sorted / max (built-ins)"],
  blocks: [
    { type: "html", html: `
      ${fig(`
      <svg class="ill" viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="dictionary as labelled drawers">
        <g font-family="monospace" font-size="14">
          <rect x="60" y="30" width="240" height="44" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="80" y="58" fill="var(--accent)">"France"</text>
          <text x="200" y="58" fill="var(--ink)">→  "Paris"</text>
          <rect x="60" y="84" width="240" height="44" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="80" y="112" fill="var(--accent)">"Japan"</text>
          <text x="200" y="112" fill="var(--ink)">→  "Tokyo"</text>
          <rect x="60" y="138" width="240" height="44" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="80" y="166" fill="var(--accent)">"Kenya"</text>
          <text x="200" y="166" fill="var(--ink)">→  "Nairobi"</text>
        </g>
        <text x="360" y="60" font-size="13" font-family="monospace" fill="var(--ink-soft)">caps["Japan"]</text>
        <text x="360" y="82" font-size="13" font-family="monospace" fill="var(--ink)">-> "Tokyo"</text>
        <text x="360" y="120" font-size="12" fill="var(--ink-soft)">keys are unique</text>
        <text x="360" y="140" font-size="12" fill="var(--ink-soft)">look up by key,</text>
        <text x="360" y="156" font-size="12" fill="var(--ink-soft)">not by position</text>
      </svg>`, `Each key appears once and points to one value. Access is caps[key].`)}
      <h2>Create and read</h2>` },
    { type: "code", title: "Key/value access", code: `caps = {"France": "Paris", "Japan": "Tokyo"}
print(caps["Japan"])
print(len(caps))
print("France" in caps)` },
    { type: "html", html: `
      <h3>Add, update, and safe lookup</h3>
      <p>Assigning to a new key adds it; assigning to an existing key overwrites it.
      <code>.get(key, default)</code> avoids a <code>KeyError</code> when the key might be missing.</p>` },
    { type: "code", title: "Changing a dict", code: `inv = {"apples": 5}
inv["bananas"] = 3      # add
inv["apples"] = 6       # update
print(inv)
print(inv.get("cherries", 0))   # missing -> default 0` },
    { type: "html", html: whatif([
      "you read a missing key three ways: <code>inv[\"pears\"]</code>, <code>inv.get(\"pears\")</code>, <code>inv.get(\"pears\", 0)</code> — which crash, which don't?",
      "you write <code>inv[\"apples\"] = 6</code> when <code>\"apples\"</code> already exists — add or overwrite?",
      "the same key twice in the literal: <code>{\"a\": 1, \"a\": 2}</code> — what wins?",
      "you check <code>5 in inv</code> — does <code>in</code> look at keys or values?",
    ]) },
    { type: "html", html: `
      <div class="warn"><b><code>d[k]</code> vs <code>d.get(k)</code></b>
      <code>d["missing"]</code> is a <code>KeyError</code> — it stops the program.
      <code>d.get("missing")</code> returns <code>None</code>; <code>d.get("missing", 0)</code>
      returns your default. Use <code>.get</code> whenever the key might not be there.</div>
      <div class="predict"><b>Predict first</b>For <code>d = {"a": 1}</code>: what is <code>d.get("b", 9)</code>?
      What is <code>"a" in d</code>? What is <code>1 in d</code>? (<code>in</code> checks <em>keys</em>.)</div>
      <h3>Looping over a dictionary</h3>
      <p>Looping a dict directly gives you its <strong>keys</strong>. <code>.items()</code> gives key
      and value together — unpack them like the tuples from Lesson 7. Insertion order is kept.</p>` },
    { type: "code", title: "Iterate items", code: `prices = {"pen": 2, "book": 12, "bag": 20}
for name, price in prices.items():
    print(f"{name}: {price}")` },
    { type: "html", html: `
      <h3>A classic use: counting</h3>` },
    { type: "code", title: "Tally characters", code: `word = "mississippi"
counts = {}
for ch in word:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)
print("s appears", counts["s"], "times")` },
    { type: "html", html: `
      <p>That <code>counts[k] = counts.get(k, 0) + 1</code> line is the single most useful dictionary
      idiom: <em>“add one to k's tally, starting from zero if it's new.”</em> Memorise its shape.</p>` },
    { type: "html", html: whatif([
      "the word is <code>\"\"</code> (empty) — what does the count dict look like?",
      "you replace <code>counts.get(ch, 0)</code> with <code>counts[ch]</code> — what happens on the first time a character appears?",
      "you want the count for a letter that never appeared — <code>counts[\"z\"]</code> vs <code>counts.get(\"z\", 0)</code>?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>{key: value, ...}</code>; access with <code>d[key]</code>.</li>
        <li><code>d[newkey] = v</code> adds; same syntax updates an existing key.</li>
        <li><code>d.get(key, default)</code> is the safe lookup.</li>
        <li><code>in</code> checks keys; iterate with <code>for k, v in d.items():</code>.</li>
        <li>The <code>get(k, 0) + 1</code> trick counts occurrences.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Dictionaries", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" },
    { label: "Real Python — Dictionaries in Python", url: "https://realpython.com/python-dicts/" },
    { label: "CS50P — Lecture 1: Dictionaries", url: "https://cs50.harvard.edu/python/notes/1/" },
  ],
  exercises: [
    {
      title: "Look up a capital",
      tier: "warm", uses: ["d[key] access"],
      prompt: `<p>Given <code>caps = {"France": "Paris", "Japan": "Tokyo"}</code>, print the capital of Japan.</p><pre>Tokyo</pre>`,
      starter: `caps = {"France": "Paris", "Japan": "Tokyo"}\n`,
      solution: `caps = {"France": "Paris", "Japan": "Tokyo"}\nprint(caps["Japan"])`,
      success: "Square brackets with the key, not a number.",
      tests: [{ expect: "Tokyo" }],
    },
    {
      title: "Add an item",
      tier: "warm", uses: ["d[newkey] = value"],
      prompt: `<p>Start with <code>inventory = {"apples": 5}</code>. Add a key <code>"bananas"</code>
        with value <code>3</code>, then print the dictionary.</p><pre>{'apples': 5, 'bananas': 3}</pre>`,
      starter: `inventory = {"apples": 5}\n`,
      solution: `inventory = {"apples": 5}\ninventory["bananas"] = 3\nprint(inventory)`,
      success: "New key on the left of = means \u201cadd it\u201d.",
      tests: [{ expect: "{'apples': 5, 'bananas': 3}" }],
    },
    {
      title: "Safe default",
      tier: "core", uses: [".get(k, default)"],
      prompt: `<p>Given <code>d = {"a": 1, "b": 2}</code>, print the value for key <code>"z"</code>,
        falling back to <code>0</code> if it is missing.</p><pre>0</pre>`,
      starter: `d = {"a": 1, "b": 2}\n`,
      solution: `d = {"a": 1, "b": 2}\nprint(d.get("z", 0))`,
      success: ".get spares you a KeyError.",
      tests: [{ expect: "0" }],
    },
    {
      title: "Price list",
      tier: "core", uses: [".items()", "tuple unpack in for (L7)", "f-strings (L4)"],
      prompt: `<p>Given <code>prices = {"pen": 2, "book": 12, "bag": 20}</code>, loop over it and print
        one <code>name: price</code> line per entry, in order.</p><pre>pen: 2\nbook: 12\nbag: 20</pre>`,
      starter: `prices = {"pen": 2, "book": 12, "bag": 20}\n`,
      solution: `prices = {"pen": 2, "book": 12, "bag": 20}\nfor name, price in prices.items():\n    print(f"{name}: {price}")`,
      success: "items() unpacks straight into two loop variables.",
      tests: [{ expect: "pen: 2\nbook: 12\nbag: 20" }],
    },
    {
      title: "Letter tally",
      tier: "core", uses: ["get(k, 0) + 1 idiom", "loop over string (L4, L6)"],
      prompt: `<p>Given <code>word = "mississippi"</code>, build a count dictionary and print how many
        times <code>"s"</code> appears. It must work for any <code>word</code>.</p><pre>4</pre>`,
      starter: `word = "mississippi"\n`,
      solution: `word = "mississippi"\ncounts = {}\nfor ch in word:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts["s"])`,
      success: "The counting idiom you'll reuse forever.",
      tests: [
        { expect: "4" },
        { advisory: true, subst: [['"mississippi"', '"tennessee"']], expect: "2",
          why: `Works for <code>"mississippi"</code> — build the counts by scanning the characters so it's right for any word.` },
      ],
    },
    {
      title: "Total the basket",
      tier: "core", uses: [".values()", "accumulator (L6)"],
      prompt: `<p>Given <code>cart = {"pen": 2, "book": 12, "bag": 20}</code>, print the sum of the
        values. Any dict.</p><pre>34</pre>`,
      starter: `cart = {"pen": 2, "book": 12, "bag": 20}\n`,
      solution: `cart = {"pen": 2, "book": 12, "bag": 20}\ntotal = 0\nfor v in cart.values():\n    total += v\nprint(total)`,
      success: ".values() gives just the values to loop over.",
      tests: [
        { expect: "34" },
        { advisory: true, subst: [['{"pen": 2, "book": 12, "bag": 20}', '{"x": 100}']], expect: "100", why: `Works for any dict.` },
      ],
      review: [{ pattern: "sum\\(\\s*cart\\.values", tip: `<code>sum(cart.values())</code> is the one-liner — the loop is the pattern practice.` }],
    },
    {
      title: "Word frequency",
      tier: "challenge", uses: ["split() (L4)", "get idiom", "loop (L6)"],
      prompt: `<p>Given <code>text = "go dog go"</code>, build a word-count dict and print how many times
        <code>"go"</code> appears.</p><pre>2</pre>`,
      starter: `text = "go dog go"\n`,
      solution: `text = "go dog go"\ncounts = {}\nfor w in text.split(" "):\n    counts[w] = counts.get(w, 0) + 1\nprint(counts["go"])`,
      success: "Same tally idiom — the loop walks words instead of characters.",
      tests: [{ expect: "2" }],
    },
    {
      title: "Invert the map",
      tier: "challenge", uses: [".items()", "build a dict", "for (L6)"],
      prompt: `<p>Given <code>codes = {"red": 1, "green": 2, "blue": 3}</code>, build and print the
        <strong>reversed</strong> dict (value &rarr; key).</p><pre>{1: 'red', 2: 'green', 3: 'blue'}</pre>`,
      starter: `codes = {"red": 1, "green": 2, "blue": 3}\n`,
      solution: `codes = {"red": 1, "green": 2, "blue": 3}\nflipped = {}\nfor k, v in codes.items():\n    flipped[v] = k\nprint(flipped)`,
      success: "Loop the items, assign each backwards into a new dict.",
      tests: [{ expect: "{1: 'red', 2: 'green', 3: 'blue'}" }],
    },
    {
      title: "Group by parity",
      tier: "challenge", uses: ["dict of lists", "if/else (L5)", "% (L3)"],
      prompt: `<p>Given <code>nums = [1, 2, 3, 4, 5, 6]</code>, build a dict
        <code>{"even": [...], "odd": [...]}</code> and print it.</p>
        <pre>{'even': [2, 4, 6], 'odd': [1, 3, 5]}</pre>`,
      starter: `nums = [1, 2, 3, 4, 5, 6]\n`,
      solution: `nums = [1, 2, 3, 4, 5, 6]\ngroups = {"even": [], "odd": []}\nfor n in nums:\n    if n % 2 == 0:\n        groups["even"].append(n)\n    else:\n        groups["odd"].append(n)\nprint(groups)`,
      success: "A dict value can be a list you append to.",
      tests: [{ expect: "{'even': [2, 4, 6], 'odd': [1, 3, 5]}" }],
    },
    {
      title: "Count the votes",
      tier: "challenge", uses: ["list of strings (L7)", "tally idiom", "loop (L6)"],
      prompt: `<p>Given <code>votes = ["yes", "no", "yes", "yes", "no", "abstain"]</code>, print the
        tally dict.</p><pre>{'yes': 3, 'no': 2, 'abstain': 1}</pre>`,
      starter: `votes = ["yes", "no", "yes", "yes", "no", "abstain"]\n`,
      solution: `votes = ["yes", "no", "yes", "yes", "no", "abstain"]\ntally = {}\nfor v in votes:\n    tally[v] = tally.get(v, 0) + 1\nprint(tally)`,
      success: "The tally idiom works on any list of things.",
      tests: [{ expect: "{'yes': 3, 'no': 2, 'abstain': 1}" }],
    },
    {
      title: "Most common word",
      tier: "boss", uses: ["tally idiom", ".items()", "'best so far' loop (L6)", "f-strings (L4)"],
      prompt: `<p>Given <code>text = "the cat sat on the mat the cat"</code>, print the most frequent word
        and its count:</p><pre>the appears 3 times</pre>
        <p>On a tie, the first word to reach that count wins.</p>`,
      starter: `text = "the cat sat on the mat the cat"\n`,
      solution: `text = "the cat sat on the mat the cat"\ncounts = {}\nfor w in text.split(" "):\n    counts[w] = counts.get(w, 0) + 1\nbest_word = None\nbest_count = 0\nfor w, c in counts.items():\n    if c > best_count:\n        best_word = w\n        best_count = c\nprint(f"{best_word} appears {best_count} times")`,
      success: "Tally into a dict, then a 'best so far' loop over items() to find the winner.",
      tests: [{ expect: "the appears 3 times" }],
    },
  ],
},

/* ========================================================== 9 */
{
  id: "casting",
  section: "Learn the basics",
  title: "Type casting",
  summary: "Convert between types with int(), float(), str(), bool() — and read input().",
  lead: "Data arrives as the wrong type constantly — text from input(), digits inside a string. Casting is the bridge, and it's where a lot of real bugs live.",
  spiral: ["int / float / str / bool & type() (L2)", "+ and * on numbers vs strings (L3)", "if/else (L5)", "loops (L6)", "lists (L7)", "f-strings (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>Why convert?</h2>
      <p>Python won't mix types silently. <code>"3" + 4</code> is a <code>TypeError</code>.
      You must convert one side so both are numbers, or both are strings.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="casting a string to an int">
        <rect x="40" y="60" width="110" height="50" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="95" y="90" text-anchor="middle" font-size="16" font-family="monospace" fill="var(--accent)">"42"</text>
        <text x="95" y="130" text-anchor="middle" font-size="11" fill="var(--ink-soft)">str</text>
        <text x="175" y="90" font-size="22" fill="var(--ink-soft)">→</text>
        <rect x="210" y="55" width="90" height="60" rx="8" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="255" y="92" text-anchor="middle" font-size="14" font-family="monospace" fill="var(--ink)">int()</text>
        <text x="320" y="90" font-size="22" fill="var(--ink-soft)">→</text>
        <rect x="355" y="60" width="90" height="50" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="400" y="90" text-anchor="middle" font-size="16" font-family="monospace" fill="var(--ink)">42</text>
        <text x="400" y="130" text-anchor="middle" font-size="11" fill="var(--ink-soft)">int</text>
        <text x="470" y="70" font-size="11" fill="var(--bad)">int("3.9") → error</text>
        <text x="470" y="92" font-size="11" fill="var(--ink-soft)">float("3.9") → 3.9</text>
        <text x="470" y="114" font-size="11" fill="var(--ink-soft)">int(3.9) → 3 (truncates)</text>
      </svg>`, `int() on a string needs it to look like a whole number.`)}
    ` },
    { type: "code", title: "Number ↔ text", code: `print(int("10") + 5)
print("Year " + str(2024))
print(float("3.14"))
print(int(3.99))     # truncates toward zero, not rounds` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Which of these work, and what do they give?
      <code>int("42")</code>, <code>int("42abc")</code>, <code>int("3.0")</code>, <code>int(3.9)</code>,
      <code>float("3")</code>, <code>str(3.0)</code>.</div>
      <div class="tip"><b>The rules worth memorising</b>
      <ul style="margin:6px 0 0">
        <li><code>int("...")</code> needs a clean whole-number string. <code>"3.0"</code>, <code>"3 "</code> (trailing junk) → <code>ValueError</code>.</li>
        <li><code>int(3.9)</code> chops toward zero → <code>3</code>. It does <em>not</em> round.</li>
        <li><code>float("3")</code> is fine → <code>3.0</code>.</li>
        <li>Chained safely: <code>int(float("3.9"))</code> → <code>3</code>.</li>
      </ul></div>` },
    { type: "html", html: whatif([
      "you <code>int(\"\")</code> — the empty string? <code>int(\"  \")</code>?",
      "you <code>int(\"3.9\")</code> vs <code>int(3.9)</code> — one errors, one doesn't. Why?",
      "you <code>str(3.0)</code> then check its length? <code>str(True)</code>?",
      "you <code>bool(\"0\")</code> — a string containing zero?",
    ]) },
    { type: "html", html: `
      <h2>Reading input()</h2>
      <p><code>input()</code> is a built-in function (more on functions next lesson). It shows an
      optional prompt and returns whatever the user typed — <strong>always as a <code>str</code></strong>.
      Cast it if you need a number.</p>
      <div class="note"><b>In this app</b>When you run code that calls <code>input()</code>, a box asks
      you to type the responses first, one per line.</div>` },
    { type: "code", title: "input is text until you cast it", code: `age = int(input("How old are you? "))
print("Next year you'll be", age + 1)`, stdin: "29" },
    { type: "html", html: whatif([
      "you drop the <code>int(...)</code> and just do <code>age = input(...)</code>, then <code>age + 1</code>?",
      "the user types <code>abc</code> instead of a number? (you'll handle this properly in Lesson 11)",
      "the user types <code>29.5</code> and you used <code>int(input())</code>?",
    ], "In this app you type the responses in the pop-up box. Try a few.") },
    { type: "html", html: `
      <h2>bool() and truthiness</h2>
      <p><code>bool(x)</code> follows the falsy rules from the conditionals lesson:
      <code>0</code>, <code>0.0</code>, <code>""</code>, empty containers and <code>None</code> → <code>False</code>.</p>` },
    { type: "code", title: "Converting to bool", code: `print(bool(0))
print(bool(""))
print(bool("False"))   # non-empty string -> True (!)
print(bool([1, 2]))` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>, <code>list()</code> convert types.</li>
        <li><code>input()</code> always returns a string — wrap it in <code>int(...)</code> / <code>float(...)</code> for maths.</li>
        <li><code>int("3.9")</code> errors; <code>int(3.9)</code> truncates to <code>3</code>.</li>
        <li>A bad conversion raises <code>ValueError</code> (handled properly in the Exceptions lesson).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — Built-in Functions (int, float, str, bool)", url: "https://docs.python.org/3/library/functions.html" },
    { label: "CS50P — Lecture 0: int(), str(), type conversion", url: "https://cs50.harvard.edu/python/notes/0/" },
    { label: "Real Python — Basic Data Types (conversion)", url: "https://realpython.com/python-data-types/" },
  ],
  exercises: [
    {
      title: "Square the input",
      tier: "warm", uses: ["input()", "int()", "* (L3)"],
      prompt: `<p>Read one number with <code>input()</code> and print its square. Input <code>6</code> → <code>36</code>.</p>`,
      solution: `n = int(input())\nprint(n * n)`,
      success: "Cast first, then do maths.",
      tests: [{ stdin: "6", expect: "36" }, { stdin: "10", expect: "100" }],
    },
    {
      title: "Add two text numbers",
      tier: "warm", uses: ["int()", "+ (L3)"],
      prompt: `<p>Given <code>x = "7"</code> and <code>y = "8"</code> (strings), print their <em>numeric</em>
        sum.</p><pre>15</pre>`,
      starter: `x = "7"\ny = "8"\n`,
      solution: `x = "7"\ny = "8"\nprint(int(x) + int(y))`,
      success: "Without casting you'd get \"78\".",
      tests: [{ expect: "15" }],
    },
    {
      title: "Greeting builder",
      tier: "core", uses: ["input()", "str() OR f-string (L4)", "+ / concat (L3)"],
      prompt: `<p>Read a name, then an age (two input lines). Print exactly <code>NAME is AGE next year: AGE+1</code>
        — e.g. for <code>Ada</code> / <code>30</code>:</p><pre>Ada is 30 next year: 31</pre>`,
      solution: `name = input()\nage = int(input())\nprint(f"{name} is {age} next year: {age + 1}")`,
      success: "input() gives a str; cast the age so age + 1 is arithmetic, not concatenation.",
      tests: [
        { stdin: "Ada\n30", expect: "Ada is 30 next year: 31" },
        { stdin: "Bo\n9", expect: "Bo is 9 next year: 10" },
      ],
    },
    {
      title: "Larger of two",
      tier: "core", uses: ["input()", "int()", "if/else (L5)"],
      prompt: `<p>Read two numbers, each on its own line, print the larger. <code>4</code> then <code>9</code> → <code>9</code>.</p>`,
      solution: `a = int(input())\nb = int(input())\nif a > b:\n    print(a)\nelse:\n    print(b)`,
      success: "Two inputs, two casts, one comparison.",
      tests: [{ stdin: "4\n9", expect: "9" }, { stdin: "12\n3", expect: "12" }, { stdin: "5\n5", expect: "5" }],
    },
    {
      title: "Truncate vs round",
      tier: "core", uses: ["int()", "round (built-in)"],
      prompt: `<p>Given <code>value = 3.99</code>, print <code>int(value)</code> then <code>round(value)</code>,
        on two lines.</p><pre>3\n4</pre>`,
      starter: `value = 3.99\n`,
      solution: `value = 3.99\nprint(int(value))\nprint(round(value))`,
      success: "int() chops; round() rounds — very different.",
      tests: [{ expect: "3\n4" }],
    },
    {
      title: "Bool of things",
      tier: "core", uses: ["bool()", "truthiness (L5)"],
      prompt: `<p>Print, on four lines: <code>bool("")</code>, <code>bool("False")</code>, <code>bool(0)</code>,
        <code>bool([1])</code>.</p><pre>False\nTrue\nFalse\nTrue</pre>`,
      solution: `print(bool(""))\nprint(bool("False"))\nprint(bool(0))\nprint(bool([1]))`,
      success: "Falsy = empty or zero. \"False\" is a non-empty string → truthy.",
      tests: [{ expect: "False\nTrue\nFalse\nTrue" }],
    },
    {
      title: "Sum the input line",
      tier: "challenge", uses: ["input()", "split() (L4)", "loop (L6)", "int()", "accumulator (L6)"],
      prompt: `<p>Read one line of space-separated integers and print their sum.
        Input <code>3 10 4 1</code> → <code>18</code>.</p>`,
      solution: `parts = input().split(" ")\ntotal = 0\nfor p in parts:\n    total += int(p)\nprint(total)`,
      success: "split gives strings; cast each one before adding.",
      tests: [
        { stdin: "3 10 4 1", expect: "18" },
        { stdin: "42", expect: "42" },
        { stdin: "5 5 5", expect: "15" },
      ],
    },
    {
      title: "Average of the inputs",
      tier: "challenge", uses: ["input()", "split()", "loop", "int()", "float division / (L3)", "round"],
      prompt: `<p>Read one line of space-separated integers, print their average rounded to 1 decimal.
        Input <code>2 4 9</code> → <code>5.0</code>.</p>`,
      solution: `parts = input().split(" ")\ntotal = 0\nfor p in parts:\n    total += int(p)\nprint(round(total / len(parts), 1))`,
      success: "Sum with a loop, divide by the count, round.",
      tests: [
        { stdin: "2 4 9", expect: "5.0" },
        { stdin: "10 20", expect: "15.0" },
      ],
    },
    {
      title: "Digit sum",
      tier: "challenge", uses: ["str()", "loop over string (L6)", "int()", "accumulator"],
      prompt: `<p>Given <code>n = 90210</code>, print the sum of its digits. Turn the number into a string,
        loop its characters, cast each back. Any non-negative <code>n</code>.</p><pre>12</pre>`,
      starter: `n = 90210\n`,
      solution: `n = 90210\ntotal = 0\nfor ch in str(n):\n    total += int(ch)\nprint(total)`,
      success: "str(n) makes the digits loopable; int(ch) makes each addable.",
      tests: [
        { rewrite: [["^n\\s*=\\s*\\d+\\s*$", "n = 90210"]], expect: "12" },
        { advisory: true, rewrite: [["^n\\s*=\\s*\\d+\\s*$", "n = 999"]], expect: "27", why: `Should work for any number.` },
      ],
    },
    {
      title: "Receipt parser",
      tier: "boss", uses: ["input()", "split()", "loop", "int()/float()", "f-strings (L4)", "accumulator"],
      prompt: `<p>Read <code>N</code> (a count) on the first line, then <code>N</code> more lines each like
        <code>apple 3</code> (name space quantity). Print each line as <code>name x quantity</code> and
        finally <code>TOTAL items: SUM</code>.</p>
        <p>For input <code>2</code> / <code>apple 3</code> / <code>pen 5</code>:</p>
        <pre>apple x 3\npen x 5\nTOTAL items: 8</pre>`,
      solution: `count = int(input())\ntotal = 0\nfor _ in range(count):\n    parts = input().split(" ")\n    name = parts[0]\n    qty = int(parts[1])\n    total += qty\n    print(f"{name} x {qty}")\nprint(f"TOTAL items: {total}")`,
      success: "Loop N times reading & parsing a line each pass, accumulating the total.",
      tests: [
        { stdin: "2\napple 3\npen 5", expect: "apple x 3\npen x 5\nTOTAL items: 8" },
        { stdin: "1\nbox 10", expect: "box x 10\nTOTAL items: 10" },
      ],
    },
  ],
},

/* ========================================================== 10 */
{
  id: "functions",
  section: "Learn the basics",
  title: "Functions & built-in functions",
  summary: "Package code into reusable functions with def and return; tour the essential built-ins.",
  lead: "Everything you've written so far has been a one-shot script. A function lets you name a piece of logic and reuse it — with different inputs — anywhere. This is the biggest step-up in the course.",
  spiral: ["everything: variables, operators, strings, if/else, loops, lists, dicts, casting", "return a value the caller uses (new)", "f-strings for the return string (L4)", "the loop patterns from L6 now live inside functions"],
  blocks: [
    { type: "html", html: `
      ${fig(`
      <svg class="ill" viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a function as a machine">
        <text x="70" y="70" font-size="12" fill="var(--ink-soft)">arguments in</text>
        <text x="70" y="90" font-size="13" font-family="monospace" fill="var(--accent)">2, 3</text>
        <line x1="120" y1="85" x2="200" y2="85" stroke="var(--ink-soft)"/>
        <rect x="200" y="40" width="200" height="100" rx="12" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="300" y="80" text-anchor="middle" font-size="13" font-family="monospace" fill="var(--ink)">def add(a, b):</text>
        <text x="300" y="104" text-anchor="middle" font-size="13" font-family="monospace" fill="var(--ink)">return a + b</text>
        <line x1="400" y1="85" x2="480" y2="85" stroke="var(--ink-soft)"/>
        <text x="470" y="70" font-size="12" fill="var(--ink-soft)">value out</text>
        <text x="470" y="90" font-size="13" font-family="monospace" fill="var(--ink)">5</text>
        <text x="300" y="165" text-anchor="middle" font-size="11" fill="var(--ink-soft)">same inputs → same output, every time</text>
      </svg>`, `Define once, call as many times as you like with different inputs.`)}
      <h2>Defining and calling</h2>` },
    { type: "code", title: "Your first function", code: `def greet(name):
    return f"Hello, {name}!"

print(greet("Ada"))
print(greet("Sam"))` },
    { type: "html", html: `
      <div class="note"><b>return vs print — the distinction that trips everyone</b>
      <code>print</code> puts text on the screen and produces <em>nothing</em> for your code to use.
      <code>return</code> hands a value <em>back to whoever called the function</em>, so you can store
      it, pass it on, or do maths with it. A function with no <code>return</code> hands back <code>None</code>.</div>` },
    { type: "code", title: "Feel the difference", code: `def add_return(a, b):
    return a + b

def add_print(a, b):
    print(a + b)

x = add_return(2, 3)
print("x is", x, "and I can keep using it:", x * 10)

y = add_print(2, 3)          # prints 5 as a side-effect
print("y is", y)            # ...but y is None` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Above: what does <code>x * 10</code> print? Why is
      <code>y</code> <code>None</code> even though "5" appeared on screen?</div>` },
    { type: "html", html: whatif([
      "you give <code>add_print</code> a <code>return a + b</code> as well — what is <code>y</code> then?",
      "a function's last line is <code>a + b</code> with no <code>return</code> in front — what comes back?",
      "you call a function but never use what it returns — is that an error?",
      "<code>return</code> is inside an <code>if</code> that turns out <code>False</code> — what does the function give back?",
    ]) },
    { type: "code", title: "Parameters, defaults, multiple returns", code: `def power(base, exp=2):      # exp defaults to 2
    return base ** exp

print(power(5))
print(power(2, 10))

def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([4, 9, 1, 7])
print("low", low, "high", high)` },
    { type: "html", html: `
      <h3>Scope, briefly</h3>
      <p>Names created <em>inside</em> a function are <strong>local</strong> — they vanish when the
      function returns and don't clash with names outside.</p>` },
    { type: "code", title: "Local names stay local", code: `def make_label():
    text = "inside"
    return text

print(make_label())
# print(text)   # -> NameError: 'text' is not defined out here` },
    { type: "html", html: whatif([
      "you call <code>power(2)</code> with only one argument? And <code>power()</code> with none?",
      "you call <code>power(exp=3, base=2)</code> — arguments by name, out of order?",
      "there's a variable <code>text</code> <em>outside</em> the function too — does the one inside overwrite it?",
      "you <code>return</code> two values — <code>return a, b</code> — what type does the caller get?",
    ]) },
    { type: "html", html: `
      <h2>Built-in functions you'll use constantly</h2>
      <p>You've already met <code>print</code>, <code>input</code>, <code>len</code>,
      <code>range</code>, <code>type</code>, and the casts. A few more:</p>
      <table class="tbl">
        <tr><th>Function</th><th>Does</th><th>Example → result</th></tr>
        <tr><td><code>abs(x)</code></td><td>absolute value</td><td><code>abs(-4)</code> → <code>4</code></td></tr>
        <tr><td><code>round(x, n)</code></td><td>round to n decimals</td><td><code>round(3.14159, 2)</code> → <code>3.14</code></td></tr>
        <tr><td><code>min / max</code></td><td>smallest / largest</td><td><code>max(3, 9, 1)</code> → <code>9</code></td></tr>
        <tr><td><code>sum(seq)</code></td><td>add up a sequence</td><td><code>sum([1,2,3])</code> → <code>6</code></td></tr>
        <tr><td><code>sorted(seq)</code></td><td>new sorted list</td><td><code>sorted([3,1,2])</code> → <code>[1,2,3]</code></td></tr>
        <tr><td><code>enumerate(seq)</code></td><td>index + item pairs</td><td>see below</td></tr>
      </table>` },
    { type: "code", title: "Built-ins in action", code: `nums = [5, -2, 9, 3]
print("sum:", sum(nums))
print("max:", max(nums))
print("avg:", round(sum(nums) / len(nums), 2))

for i, value in enumerate(["a", "b", "c"]):
    print(i, value)` },
    { type: "html", html: `
      <div class="tip"><b>When to write your own vs reach for a built-in</b>
      If Python already has it (<code>sum</code>, <code>max</code>, <code>sorted</code>,
      <code>len</code>) — use it. Write a function when you have <em>your</em> logic to name and reuse
      (a scoring rule, a validation, a formatter). Wrapping a built-in in a well-named function is
      also fine when it makes the calling code read better.</div>` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>def name(params):</code> then an indented body; call with <code>name(args)</code>.</li>
        <li><code>return</code> sends a value back; no return → <code>None</code>.</li>
        <li>Parameters can have defaults; a function can return several values (a tuple).</li>
        <li>Names inside a function are local.</li>
        <li>Lean on built-ins: <code>len, sum, min, max, sorted, round, abs, enumerate</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
    { label: "Python docs — Built-in Functions (full list)", url: "https://docs.python.org/3/library/functions.html" },
    { label: "CS50P — Lecture 0: Defining functions, return values", url: "https://cs50.harvard.edu/python/notes/0/" },
  ],
  exercises: [
    {
      title: "square(n)",
      tier: "warm", uses: ["def / return", "* (L3)"],
      prompt: `<p>Define <code>square(n)</code> that <strong>returns</strong> <code>n * n</code>.
        Don't print inside the function.</p>`,
      solution: `def square(n):\n    return n * n`,
      success: "Reusable and testable — the point of functions.",
      mustDefine: ["square"],
      tests: [
        { append: `print(square(5))`, expect: "25" },
        { append: `print(square(-3))`, expect: "9" },
        { append: `print(square(0))`, expect: "0" },
      ],
    },
    {
      title: "is_even(n)",
      tier: "warm", uses: ["return a bool", "% and == (L3)"],
      prompt: `<p>Define <code>is_even(n)</code> returning <code>True</code> when <code>n</code> is even.</p>`,
      solution: `def is_even(n):\n    return n % 2 == 0`,
      success: "A comparison already is a bool — no if needed.",
      mustDefine: ["is_even"],
      tests: [
        { append: `print(is_even(4), is_even(7))`, expect: "True False" },
        { append: `print(is_even(0))`, expect: "True" },
      ],
    },
    {
      title: "greet(name, excited=False)",
      tier: "core", uses: ["default parameter", "if/else (L5)", "f-strings (L4)"],
      prompt: `<p>Define <code>greet(name, excited=False)</code> returning <code>"Hi, NAME"</code>, or
        <code>"Hi, NAME!"</code> when <code>excited</code> is true.</p>`,
      solution: `def greet(name, excited=False):\n    if excited:\n        return f"Hi, {name}!"\n    return f"Hi, {name}"`,
      success: "A default parameter makes the second argument optional.",
      mustDefine: ["greet"],
      tests: [
        { append: `print(greet("Ada"))`, expect: "Hi, Ada" },
        { append: `print(greet("Bo", True))`, expect: "Hi, Bo!" },
        { append: `print(greet("Cy", excited=True))`, expect: "Hi, Cy!" },
      ],
    },
    {
      title: "count_vowels(word)",
      tier: "core", uses: ["loop over string (L6)", "in (L4)", "accumulator (L6)", "return"],
      prompt: `<p>Define <code>count_vowels(word)</code> returning how many characters are vowels
        (<code>aeiou</code>, lowercase).</p>`,
      solution: `def count_vowels(word):\n    count = 0\n    for ch in word:\n        if ch in "aeiou":\n            count += 1\n    return count`,
      success: "The L6 loop pattern, now packaged and returnable.",
      mustDefine: ["count_vowels"],
      tests: [
        { append: `print(count_vowels("education"))`, expect: "5" },
        { append: `print(count_vowels("rhythm"))`, expect: "0" },
        { append: `print(count_vowels(""))`, expect: "0" },
      ],
    },
    {
      title: "letter_grade(score)",
      tier: "core", uses: ["if/elif chain (L5)", "return early"],
      prompt: `<p>Define <code>letter_grade(score)</code> returning <code>"A"</code> (90+),
        <code>"B"</code> (80–89), <code>"C"</code> (70–79), else <code>"F"</code>.</p>`,
      solution: `def letter_grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    return "F"`,
      success: "return inside a branch exits the function immediately.",
      mustDefine: ["letter_grade"],
      tests: [
        { append: `print(letter_grade(95), letter_grade(80), letter_grade(72), letter_grade(40))`, expect: "A B C F" },
        { append: `print(letter_grade(90), letter_grade(70))`, expect: "A C" },
      ],
    },
    {
      title: "stats(numbers)",
      tier: "challenge", uses: ["multiple return (tuple)", "min/max/sum/len", "round"],
      prompt: `<p>Define <code>stats(numbers)</code> returning a tuple <code>(minimum, maximum, average)</code>
        where the average is rounded to 1 decimal. Assume a non-empty list.</p>`,
      solution: `def stats(numbers):\n    return min(numbers), max(numbers), round(sum(numbers) / len(numbers), 1)`,
      success: "return a, b, c hands back one tuple; the caller can unpack it.",
      mustDefine: ["stats"],
      tests: [
        { append: `print(stats([5, -2, 9, 3]))`, expect: "(-2, 9, 3.8)" },
        { append: `lo, hi, avg = stats([10, 20, 30])\nprint(lo, hi, avg)`, expect: "10 30 20.0" },
      ],
    },
    {
      title: "is_prime(n)",
      tier: "challenge", uses: ["loop + range (L6)", "% (L3)", "if / return (L5)", "bool"],
      prompt: `<p>Define <code>is_prime(n)</code> returning <code>True</code> if <code>n</code> is a prime
        number (a whole number ≥ 2 with no divisors other than 1 and itself), else <code>False</code>.</p>`,
      solution: `def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True`,
      success: "Return False the moment you find a divisor; if the loop finishes, it's prime.",
      mustDefine: ["is_prime"],
      tests: [
        { append: `print(is_prime(2), is_prime(7), is_prime(1), is_prime(9), is_prime(13))`, expect: "True True False False True" },
        { append: `print(is_prime(0), is_prime(-5))`, expect: "False False" },
      ],
    },
    {
      title: "word_count(text)",
      tier: "challenge", uses: ["split() (L4)", "tally dict idiom (L8)", "return a dict"],
      prompt: `<p>Define <code>word_count(text)</code> returning a dict mapping each word to how many
        times it appears (single-spaced input).</p>`,
      solution: `def word_count(text):\n    counts = {}\n    for w in text.split(" "):\n        counts[w] = counts.get(w, 0) + 1\n    return counts`,
      success: "The L8 counting idiom, now a reusable function.",
      mustDefine: ["word_count"],
      tests: [
        { append: `print(word_count("go dog go"))`, expect: "{'go': 2, 'dog': 1}" },
        { append: `print(word_count("a a a"))`, expect: "{'a': 3}" },
      ],
    },
    {
      title: "password_ok(pw)",
      tier: "challenge", uses: ["len() (L4)", "loop over string (L6)", "in / .isdigit-style test", "and (L3)", "bool return"],
      prompt: `<p>Define <code>password_ok(pw)</code> returning <code>True</code> only if <code>pw</code> is at
        least 8 characters <strong>and</strong> contains at least one digit
        (a character in <code>"0123456789"</code>).</p>`,
      solution: `def password_ok(pw):\n    if len(pw) < 8:\n        return False\n    for ch in pw:\n        if ch in "0123456789":\n            return True\n    return False`,
      success: "Length check first, then scan for a digit; return True on the first one found.",
      mustDefine: ["password_ok"],
      tests: [
        { append: `print(password_ok("abcdefg1"))`, expect: "True" },
        { append: `print(password_ok("short1"))`, expect: "False" },
        { append: `print(password_ok("nodigitshere"))`, expect: "False" },
      ],
    },
    {
      title: "summarise(scores)",
      tier: "boss", uses: ["stats-style function", "loop + if (L5, L6)", "f-strings (L4)", "return a formatted string"],
      prompt: `<p>Define <code>summarise(scores)</code> that <strong>returns</strong> (does not print) a
        3-line string. For <code>summarise([40, 60, 90, 60])</code> the returned string is:</p>
        <pre>count: 4\naverage: 62.5\npassed: 3</pre>
        <p>"passed" counts scores ≥ 50. Average rounded to 1 decimal. Lines joined by <code>\\n</code>.
        Assume a non-empty list.</p>`,
      solution: `def summarise(scores):\n    passed = 0\n    for s in scores:\n        if s >= 50:\n            passed += 1\n    avg = round(sum(scores) / len(scores), 1)\n    return f"count: {len(scores)}\\naverage: {avg}\\npassed: {passed}"`,
      success: "A function that builds and returns a multi-line report — everything you've learned.",
      mustDefine: ["summarise"],
      tests: [
        { append: `print(summarise([40, 60, 90, 60]))`, expect: "count: 4\naverage: 62.5\npassed: 3" },
        { append: `print(summarise([10, 20]))`, expect: "count: 2\naverage: 15.0\npassed: 0" },
      ],
    },
  ],
},

/* ========================================================== 11 */
{
  id: "exceptions",
  section: "Learn the basics",
  title: "Exceptions",
  summary: "Handle errors gracefully with try / except / else / finally, and raise your own.",
  lead: "Real input is messy. int() gets a word, a list index is off the end, a divisor is zero. Exceptions let your program notice, respond, and carry on instead of crashing.",
  spiral: ["int() / float() and their ValueError (L9)", "functions & return (L10)", "if / return (L5)", "list indexing (L7)", "dict key access (L8)", "/ and ZeroDivisionError (L3)"],
  blocks: [
    { type: "html", html: `
      <h2>What an exception looks like</h2>
      <p>An uncaught exception stops the program and prints a <strong>traceback</strong>. Read it
      bottom-up: the last line names the error type and message.</p>
      <table class="tbl">
        <tr><th>Exception</th><th>Typical cause</th></tr>
        <tr><td><code>ValueError</code></td><td><code>int("hello")</code> — right type, bad value</td></tr>
        <tr><td><code>TypeError</code></td><td><code>"3" + 4</code> — incompatible types</td></tr>
        <tr><td><code>ZeroDivisionError</code></td><td><code>10 / 0</code></td></tr>
        <tr><td><code>IndexError</code> / <code>KeyError</code></td><td>list index / dict key that isn't there</td></tr>
        <tr><td><code>NameError</code></td><td>using a variable that was never assigned</td></tr>
      </table>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="try except finally flow">
        <rect x="40" y="30" width="150" height="46" rx="8" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="115" y="58" text-anchor="middle" font-size="13" font-family="monospace" fill="var(--ink)">try: risky()</text>
        <line x1="115" y1="76" x2="115" y2="100" stroke="var(--ink-soft)"/>
        <text x="128" y="94" font-size="11" fill="var(--bad)">error raised</text>
        <rect x="40" y="100" width="150" height="46" rx="8" fill="var(--bad-bg)" stroke="var(--bad)"/>
        <text x="115" y="128" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--bad)">except ValueError:</text>
        <line x1="190" y1="53" x2="330" y2="53" stroke="var(--ink-soft)"/>
        <text x="215" y="45" font-size="11" fill="var(--good)">no error</text>
        <rect x="330" y="30" width="130" height="46" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="395" y="58" text-anchor="middle" font-size="13" font-family="monospace" fill="var(--good)">else:</text>
        <line x1="115" y1="146" x2="115" y2="168" stroke="var(--ink-soft)"/>
        <line x1="395" y1="76" x2="395" y2="168" stroke="var(--ink-soft)"/>
        <rect x="250" y="168" width="150" height="30" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="325" y="188" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">finally: always</text>
        <line x1="115" y1="168" x2="250" y2="183" stroke="var(--ink-soft)"/>
      </svg>`, `except runs on a matching error; else runs when there was none; finally runs no matter what.`)}
    ` },
    { type: "code", title: "Catch a bad conversion", code: `text = "not a number"
try:
    value = int(text)
    print("Parsed:", value)
except ValueError:
    print("That wasn't a valid integer.")` },
    { type: "html", html: `
      <div class="tip"><b>The mental model</b>
      Python runs the <code>try</code> block. If a line raises an error, it <em>stops right there</em>
      and jumps to a matching <code>except</code>. If no line raises, the <code>except</code> is
      skipped entirely. Either way, code after the whole <code>try/except</code> continues normally.</div>
      <div class="predict"><b>Predict first</b>In the cell above, does <code>print("Parsed:", value)</code>
      run? Change <code>text</code> to <code>"55"</code> and predict again before running.</div>` },
    { type: "html", html: whatif([
      "<code>text = \"55\"</code> — does the <code>except</code> block run at all?",
      "you catch <code>TypeError</code> instead of <code>ValueError</code> — does it still catch <code>int(\"abc\")</code>?",
      "the line <em>after</em> a caught error — does the program keep going, or stop?",
      "you use a bare <code>except:</code> with no error type — what does it catch, and why is that risky?",
    ]) },
    { type: "code", title: "else and finally", code: `try:
    result = 10 / 2
except ZeroDivisionError:
    print("cannot divide by zero")
else:
    print("division ok:", result)
finally:
    print("done trying")` },
    { type: "html", html: whatif([
      "you change <code>10 / 2</code> to <code>10 / 0</code> — which of <code>else</code> and <code>finally</code> still run?",
      "the <code>try</code> block succeeds — does <code>finally</code> run anyway?",
      "you put a <code>return</code> inside the <code>try</code> (in a function) — does <code>finally</code> still fire before the function exits?",
    ]) },
    { type: "html", html: `
      <h3>Inspect the error, catch several kinds</h3>` },
    { type: "code", title: "as e / multiple except", code: `for text in ["10", "3.5", "oops"]:
    try:
        print(int(text))
    except ValueError as e:
        print("skip:", e)` },
    { type: "html", html: `
      <h2>Raising your own</h2>
      <p>Use <code>raise</code> to signal a problem the caller should deal with.</p>` },
    { type: "code", title: "raise", code: `def set_age(years):
    if years < 0:
        raise ValueError("age cannot be negative")
    return years

print(set_age(25))
try:
    set_age(-4)
except ValueError as e:
    print("rejected:", e)` },
    { type: "html", html: `
      <div class="warn"><b>Catch narrowly</b>
      Prefer <code>except ValueError:</code> over a bare <code>except:</code>. Catching everything
      hides bugs you actually wanted to see.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Wrap risky code in <code>try:</code>; handle failures in <code>except SomeError:</code>.</li>
        <li><code>except SomeError as e:</code> gives you the error object (and its message).</li>
        <li><code>else:</code> runs if no exception; <code>finally:</code> always runs (cleanup).</li>
        <li><code>raise SomeError("message")</code> reports a problem yourself.</li>
        <li>Catch specific exception types, not everything.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Errors and Exceptions", url: "https://docs.python.org/3/tutorial/errors.html" },
    { label: "CS50P — Lecture 3: Exceptions (notes)", url: "https://cs50.harvard.edu/python/notes/3/" },
    { label: "Real Python — Python Exceptions: An Introduction", url: "https://realpython.com/python-exceptions/" },
  ],
  exercises: [
    {
      title: "safe_div(a, b)",
      tier: "warm", uses: ["try/except", "functions (L10)", "/ ZeroDivisionError (L3)"],
      prompt: `<p>Define <code>safe_div(a, b)</code> that returns <code>a / b</code>, but returns the string
        <code>"undefined"</code> if <code>b</code> is 0 (catch <code>ZeroDivisionError</code>).</p>`,
      solution: `def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "undefined"`,
      success: "The caller never sees a crash.",
      mustDefine: ["safe_div"],
      tests: [
        { append: `print(safe_div(10, 2), safe_div(5, 0))`, expect: "5.0 undefined" },
      ],
    },
    {
      title: "to_int(s)",
      tier: "warm", uses: ["try/except ValueError", "int() (L9)", "return None (L10)"],
      prompt: `<p>Define <code>to_int(s)</code> that returns <code>int(s)</code>, or <code>None</code> if the
        text can't be converted (catch <code>ValueError</code>).</p>`,
      solution: `def to_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None`,
      success: "Returning None is a common \u201ccouldn't do it\u201d signal.",
      mustDefine: ["to_int"],
      tests: [
        { append: `print(to_int("42"), to_int("x"))`, expect: "42 None" },
      ],
    },
    {
      title: "Parse or complain",
      tier: "core", uses: ["input() (L9)", "try/except", "f-strings (L4)"],
      prompt: `<p>Read one line of input. If it's a whole number, print <code>Got: N</code>.
        Otherwise print <code>Not a number</code>.</p>
        <p>Input <code>15</code> → <code>Got: 15</code>. Input <code>hello</code> → <code>Not a number</code>.</p>`,
      solution: `text = input()\ntry:\n    n = int(text)\n    print(f"Got: {n}")\nexcept ValueError:\n    print("Not a number")`,
      success: "This is the standard input-validation shape.",
      tests: [
        { stdin: "15", expect: "Got: 15" },
        { stdin: "hello", expect: "Not a number" },
      ],
    },
    {
      title: "Safe index",
      tier: "core", uses: ["list indexing (L7)", "try/except IndexError"],
      prompt: `<p>Given <code>data = [10, 20, 30]</code> and <code>i = 5</code>, print <code>data[i]</code>
        if it exists, otherwise print <code>out of range</code> (catch <code>IndexError</code>).</p><pre>out of range</pre>`,
      starter: `data = [10, 20, 30]\ni = 5\n`,
      solution: `data = [10, 20, 30]\ni = 5\ntry:\n    print(data[i])\nexcept IndexError:\n    print("out of range")`,
      success: "Different failures have different exception types.",
      tests: [{ expect: "out of range" }],
    },
    {
      title: "withdraw(balance, amount)",
      tier: "challenge", uses: ["raise", "if (L5)", "functions (L10)", "except ... as e"],
      prompt: `<p>Define <code>withdraw(balance, amount)</code>. If <code>amount &gt; balance</code>,
        <code>raise ValueError("insufficient funds")</code>. Otherwise return the new balance
        (<code>balance - amount</code>).</p>`,
      solution: `def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("insufficient funds")\n    return balance - amount`,
      success: "raise pushes the decision up to the caller.",
      mustDefine: ["withdraw"],
      tests: [
        { append: `print(withdraw(100, 40))`, expect: "60" },
        { append: `try:\n    withdraw(50, 100)\nexcept ValueError as e:\n    print(e)`, expect: "insufficient funds" },
      ],
    },
    {
      title: "lookup(d, key)",
      tier: "core", uses: ["dict access (L8)", "try/except KeyError", "functions (L10)"],
      prompt: `<p>Define <code>lookup(d, key)</code> returning <code>d[key]</code>, or the string
        <code>"?"</code> if the key is missing. Catch <code>KeyError</code> — don't use <code>.get</code>.</p>`,
      solution: `def lookup(d, key):\n    try:\n        return d[key]\n    except KeyError:\n        return "?"`,
      success: "try/except is the general tool; .get is the dict-specific shortcut.",
      mustDefine: ["lookup"],
      tests: [
        { append: `print(lookup({"a": 1}, "a"), lookup({"a": 1}, "z"))`, expect: "1 ?" },
      ],
    },
    {
      title: "average(nums)",
      tier: "challenge", uses: ["sum/len", "try/except ZeroDivisionError", "functions (L10)"],
      prompt: `<p>Define <code>average(nums)</code> returning the mean, or <code>0</code> for an empty list
        (an empty list makes <code>len(nums)</code> zero — catch the <code>ZeroDivisionError</code>).</p>`,
      solution: `def average(nums):\n    try:\n        return sum(nums) / len(nums)\n    except ZeroDivisionError:\n        return 0`,
      success: "Let the natural error happen, then handle it.",
      mustDefine: ["average"],
      tests: [
        { append: `print(average([2, 4, 9]))`, expect: "5.0" },
        { append: `print(average([]))`, expect: "0" },
      ],
    },
    {
      title: "read_ints — skip the junk",
      tier: "challenge", uses: ["input().split() (L4, L9)", "loop (L6)", "try/except in a loop", "build a list (L7)"],
      prompt: `<p>Read one line of space-separated tokens. Print a list of just the ones that are valid
        integers, in order. Input <code>4 x 9 -2 hi</code> → <code>[4, 9, -2]</code>.</p>`,
      solution: `nums = []\nfor tok in input().split(" "):\n    try:\n        nums.append(int(tok))\n    except ValueError:\n        pass\nprint(nums)`,
      success: "try/except inside the loop lets one bad token not kill the whole parse.",
      tests: [
        { stdin: "4 x 9 -2 hi", expect: "[4, 9, -2]" },
        { stdin: "all bad", expect: "[]" },
        { stdin: "1 2 3", expect: "[1, 2, 3]" },
      ],
    },
    {
      title: "safe_calc(a, op, b)",
      tier: "boss", uses: ["functions (L10)", "if/elif (L5)", "raise", "try/except", "return None"],
      prompt: `<p>Define <code>safe_calc(a, op, b)</code> where <code>op</code> is <code>"+"</code>,
        <code>"-"</code>, <code>"*"</code>, or <code>"/"</code>. Return the result. For <code>"/"</code>
        by zero return <code>None</code>. For an unknown <code>op</code>,
        <code>raise ValueError("bad op")</code>.</p>`,
      solution: `def safe_calc(a, op, b):\n    if op == "+":\n        return a + b\n    elif op == "-":\n        return a - b\n    elif op == "*":\n        return a * b\n    elif op == "/":\n        try:\n            return a / b\n        except ZeroDivisionError:\n            return None\n    raise ValueError("bad op")`,
      success: "Dispatch on op, guard the risky division, raise for the unexpected.",
      mustDefine: ["safe_calc"],
      tests: [
        { append: `print(safe_calc(6, "+", 4), safe_calc(6, "*", 4), safe_calc(6, "/", 0))`, expect: "10 24 None" },
        { append: `try:\n    safe_calc(1, "^", 2)\nexcept ValueError as e:\n    print(e)`, expect: "bad op" },
        { append: `print(safe_calc(9, "/", 2))`, expect: "4.5" },
      ],
    },
  ],
},

/* ========================================================== 12 */
{
  id: "comments-annotations",
  section: "Learn the basics",
  title: "Comments & type annotations",
  summary: "Write comments and docstrings that help, and add type hints that document your intent.",
  lead: "You can now write real programs. This last lesson is about writing them so a human — future you, a teammate — can read them: comments that add value, docstrings, and type hints.",
  spiral: ["# comments (L1)", "functions & parameters (L10)", "return values (L10)", "list[...] / dict[...] from L7–L8", "str | None ties to 'return None' (L10, L11)"],
  blocks: [
    { type: "html", html: `
      <h2>Comments that earn their place</h2>
      <p>You met <code>#</code> in Lesson 1. Now the craft: a good comment explains <strong>why</strong>,
      not <strong>what</strong>. The code already says what it does.</p>` },
    { type: "code", title: "Redundant vs useful", code: `# BAD: just restates the code
count = count + 1  # add one to count

# GOOD: explains the reason
count += 1  # skip the header row we already printed

# TODO: handle the empty-file case (see issue #14)` },
    { type: "html", html: `
      <h3>Docstrings</h3>
      <p>A string literal as the <em>first line</em> of a function is its <strong>docstring</strong>.
      Tools and <code>help()</code> display it; it's stored on <code>func.__doc__</code>.</p>` },
    { type: "code", title: "A documented function", code: `def area(radius):
    """Return the area of a circle with the given radius."""
    return 3.141592653589793 * radius ** 2

print(area(2))
print(area.__doc__)
help(area)` },
    { type: "html", html: whatif([
      "you remove the <code>\"\"\"...\"\"\"</code> line — does <code>area(2)</code> still work? What does <code>area.__doc__</code> print now?",
      "you put the docstring on the <em>second</em> line of the body instead of the first — is it still the docstring?",
      "you make the comment a <code>#</code> line instead of a <code>\"\"\"</code> string — does <code>help(area)</code> show it?",
    ]) },
    { type: "html", html: `
      <h2>Type annotations (type hints)</h2>
      <p>Optional labels that say what type a value <em>should</em> be. Python does
      <strong>not</strong> enforce them at runtime — they're for readers, editors, and checkers
      like <code>mypy</code>.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="annotated function signature">
        <text x="20" y="70" font-size="20" font-family="monospace" fill="var(--ink)">def  repeat(text</text>
        <text x="232" y="70" font-size="20" font-family="monospace" fill="var(--tok-kw,#ff7b72)">: str</text>
        <text x="285" y="70" font-size="20" font-family="monospace" fill="var(--ink)">, n</text>
        <text x="325" y="70" font-size="20" font-family="monospace" fill="var(--tok-kw,#ff7b72)">: int</text>
        <text x="373" y="70" font-size="20" font-family="monospace" fill="var(--ink)">)</text>
        <text x="388" y="70" font-size="20" font-family="monospace" fill="var(--accent)">-> str</text>
        <text x="455" y="70" font-size="20" font-family="monospace" fill="var(--ink)">:</text>
        <line x1="240" y1="80" x2="240" y2="110" stroke="var(--ink-soft)"/>
        <text x="150" y="128" font-size="12" fill="var(--ink-soft)">parameter types</text>
        <line x1="410" y1="80" x2="410" y2="110" stroke="var(--ink-soft)"/>
        <text x="380" y="128" font-size="12" fill="var(--ink-soft)">return type</text>
      </svg>`, `name: Type for parameters and variables; -> Type for the return.`)}
    ` },
    { type: "code", title: "Hints on functions and variables", code: `def repeat(text: str, n: int) -> str:
    return text * n

print(repeat("ab", 3))

names: list[str] = ["Ada", "Grace"]
count: int = len(names)
print(count)

# Not enforced: this still runs, though a type checker would flag it
print(repeat("x", "2".__len__()))` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Given <code>def f(x: int) -> int: return x * 2</code>,
      what does <code>f("ab")</code> return? (Hints aren't enforced — think about what <code>"ab" * 2</code> is.)</div>
      <div class="whatif"><b>What if…?</b><ul>
        <li>you call <code>double("ab")</code> when <code>double</code> is annotated <code>(x: int) -> int</code> — does Python stop you? What comes back?</li>
        <li>you annotate the return as <code>-> str</code> but actually <code>return 5</code> — any error at runtime?</li>
        <li>you write <code>names: list[str]</code> but put numbers in the list?</li>
      </ul><p class="wi-foot">The whole point: annotations are notes for humans and tools, <em>not</em> runtime checks. Prove it to yourself.</p></div>
      <div class="tip"><b>Annotating the functions from Lesson 10</b>
      <code>def is_even(n: int) -> bool:</code> · <code>def count_vowels(word: str) -> int:</code> ·
      <code>def stats(numbers: list[int]) -> tuple[int, int, float]:</code> ·
      <code>def word_count(text: str) -> dict[str, int]:</code>. The hint just names what you already
      knew the types were.</div>` },
    { type: "html", html: `
      <h3>Common annotation shapes</h3>
      <table class="tbl">
        <tr><th>Annotation</th><th>Means</th></tr>
        <tr><td><code>int</code>, <code>str</code>, <code>float</code>, <code>bool</code></td><td>a single value of that type</td></tr>
        <tr><td><code>list[int]</code></td><td>a list of integers</td></tr>
        <tr><td><code>dict[str, int]</code></td><td>dict with string keys, int values</td></tr>
        <tr><td><code>tuple[int, int]</code></td><td>a 2-tuple of ints</td></tr>
        <tr><td><code>str | None</code></td><td>a string <em>or</em> <code>None</code></td></tr>
      </table>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Comment the <em>why</em>; let code speak for the <em>what</em>. Use <code>TODO:</code> for follow-ups.</li>
        <li>A <code>"""docstring"""</code> as a function's first line documents it (<code>help()</code>, <code>__doc__</code>).</li>
        <li>Hints: <code>name: Type</code>, and <code>-> Type</code> for returns; <code>list[int]</code>, <code>str | None</code>, etc.</li>
        <li>Hints are documentation — Python doesn't check them while running.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "PEP 8 — Comments", url: "https://peps.python.org/pep-0008/#comments" },
    { label: "PEP 484 — Type Hints", url: "https://peps.python.org/pep-0484/" },
    { label: "Python docs — typing module", url: "https://docs.python.org/3/library/typing.html" },
    { label: "Real Python — Python Type Checking", url: "https://realpython.com/python-type-checking/" },
  ],
  exercises: [
    {
      title: "Annotate double()",
      tier: "warm", uses: ["parameter & return hints", "functions (L10)"],
      prompt: `<p>Define <code>double</code> with the exact signature
        <code>def double(x: int) -> int:</code>, returning <code>x * 2</code>.</p>`,
      solution: `def double(x: int) -> int:\n    return x * 2`,
      success: "name: Type on the parameter, -> Type before the colon.",
      mustDefine: ["double"],
      require: [
        { pattern: "x\\s*:\\s*int", hard: true, message: "Annotate the parameter as x: int." },
        { pattern: "->\\s*int", hard: true, message: "Annotate the return type as -> int." },
      ],
      tests: [{ append: `print(double(21))`, expect: "42" }],
    },
    {
      title: "Document it",
      tier: "warm", uses: ["docstring", "functions (L10)"],
      prompt: `<p>The function below works. Add a <strong>docstring</strong> as its first line (any helpful
        sentence). Keep the behaviour identical.</p>`,
      starter: `def to_celsius(f):\n    return (f - 32) * 5 / 9\n`,
      solution: `def to_celsius(f):\n    """Convert a Fahrenheit temperature to Celsius."""\n    return (f - 32) * 5 / 9`,
      success: "help(to_celsius) would now show your sentence.",
      mustDefine: ["to_celsius"],
      require: [{ pattern: "def to_celsius\\([^)]*\\):\\s*\\n\\s*(\"\"\"|''')", hard: true, message: "Add a triple-quoted docstring as the first line inside the function." }],
      tests: [
        { append: `print(round(to_celsius(212), 1))`, expect: "100.0" },
        { append: `print(to_celsius(32))`, expect: "0.0" },
        { append: `print(to_celsius.__doc__ is not None)`, expect: "True" },
      ],
    },
    {
      title: "Annotate repeat()",
      tier: "core", uses: ["parameter & return hints", "functions (L10)", "str * int (L3)"],
      prompt: `<p>Define <code>repeat</code> so its signature is exactly
        <code>def repeat(text: str, times: int) -> str:</code> and it returns <code>text</code>
        repeated <code>times</code> times.</p>`,
      solution: `def repeat(text: str, times: int) -> str:\n    return text * times`,
      success: "Editors will now hint the types at every call site.",
      mustDefine: ["repeat"],
      require: [
        { pattern: "text\\s*:\\s*str", hard: true, message: "Annotate the text parameter as : str." },
        { pattern: "times\\s*:\\s*int", hard: true, message: "Annotate the times parameter as : int." },
        { pattern: "->\\s*str", hard: true, message: "Annotate the return type as -> str." },
      ],
      tests: [
        { append: `print(repeat("ab", 3))`, expect: "ababab" },
        { append: `print("return" in repeat.__annotations__)`, expect: "True" },
      ],
    },
    {
      title: "Explain the tricky line",
      tier: "core", uses: ["# comments (L1)", "slicing s[::-1] (L4)", "functions (L10)"],
      prompt: `<p>This one-liner is not obvious. Add a <code>#</code> comment on (or above) the return line
        that explains <em>why</em> it works. Behaviour must not change.</p>`,
      starter: `def is_palindrome(s):\n    return s == s[::-1]\n`,
      solution: `def is_palindrome(s):\n    # a palindrome equals its own reverse (s[::-1])\n    return s == s[::-1]`,
      success: "Now the next reader doesn't have to decode the slice.",
      mustDefine: ["is_palindrome"],
      require: [{ pattern: "#", hard: true, message: "Add a # comment explaining the line." }],
      tests: [
        { append: `print(is_palindrome("racecar"))`, expect: "True" },
        { append: `print(is_palindrome("python"))`, expect: "False" },
      ],
    },
    {
      title: "Variable annotations",
      tier: "core", uses: ["variable hints", "list[str] (L7)", "len()"],
      prompt: `<p>Create <code>colors</code> annotated as <code>list[str]</code> holding
        <code>["red", "green", "blue"]</code>, and <code>count</code> annotated as <code>int</code>
        holding its length. Print <code>count</code>.</p><pre>3</pre>`,
      solution: `colors: list[str] = ["red", "green", "blue"]\ncount: int = len(colors)\nprint(count)`,
      success: "Annotations work on plain variables too.",
      require: [
        { pattern: "colors\\s*:\\s*list\\[str\\]", hard: true, message: "Annotate colors as list[str]." },
        { pattern: "count\\s*:\\s*int", hard: true, message: "Annotate count as int." },
      ],
      tests: [{ expect: "3" }],
    },
    {
      title: "find_user with str | None",
      tier: "challenge", uses: ["str | None hint", "if / return None (L10, L11)", "== (L3)"],
      prompt: `<p>Define <code>find_user(user_id: int) -> str | None</code>: return <code>"admin"</code>
        when <code>user_id</code> is <code>1</code>, otherwise return <code>None</code>.</p>`,
      solution: `def find_user(user_id: int) -> str | None:\n    if user_id == 1:\n        return "admin"\n    return None`,
      success: "\u201cA string or nothing\u201d is written str | None.",
      mustDefine: ["find_user"],
      require: [{ pattern: "->\\s*str\\s*\\|\\s*None", hard: true, message: "Annotate the return type as -> str | None." }],
      tests: [
        { append: `print(find_user(1), find_user(2))`, expect: "admin None" },
      ],
    },
    {
      title: "Fully annotate average()",
      tier: "challenge", uses: ["list[float] hint", "-> float", "sum/len", "functions (L10)"],
      prompt: `<p>Define <code>average</code> with the exact signature
        <code>def average(nums: list[float]) -> float:</code>, returning the mean. Assume non-empty.</p>`,
      solution: `def average(nums: list[float]) -> float:\n    return sum(nums) / len(nums)`,
      success: "list[float] documents what's inside the list, not just that it's a list.",
      mustDefine: ["average"],
      require: [
        { pattern: "nums\\s*:\\s*list\\[float\\]", hard: true, message: "Annotate nums as list[float]." },
        { pattern: "->\\s*float", hard: true, message: "Annotate the return type as -> float." },
      ],
      tests: [
        { append: `print(average([2.0, 4.0, 9.0]))`, expect: "5.0" },
        { append: `print(average([10, 20]))`, expect: "15.0" },
      ],
    },
    {
      title: "Documented & typed tally",
      tier: "challenge", uses: ["docstring", "str -> dict[str, int] hints", "tally idiom (L8)", "split() (L4)"],
      prompt: `<p>Define <code>tally</code> with signature
        <code>def tally(text: str) -> dict[str, int]:</code>, a one-line docstring, and a body that
        returns a word-count dict (single-spaced input).</p>`,
      solution: `def tally(text: str) -> dict[str, int]:\n    """Return a dict mapping each word in text to its count."""\n    counts = {}\n    for w in text.split(" "):\n        counts[w] = counts.get(w, 0) + 1\n    return counts`,
      success: "Signature says the shape; docstring says the intent; body does the work.",
      mustDefine: ["tally"],
      require: [
        { pattern: "text\\s*:\\s*str", hard: true, message: "Annotate text as : str." },
        { pattern: "->\\s*dict\\[str,\\s*int\\]", hard: true, message: "Annotate the return as -> dict[str, int]." },
        { pattern: "def tally\\([^)]*\\)[^:]*:\\s*\\n\\s*(\"\"\"|''')", hard: true, message: "Add a docstring as the first line inside the function." },
      ],
      tests: [
        { append: `print(tally("go dog go"))`, expect: "{'go': 2, 'dog': 1}" },
        { append: `print(tally("a a a")["a"])`, expect: "3" },
      ],
    },
    {
      title: "Clean up this function",
      tier: "boss", uses: ["docstring", "full annotations", "one why-comment", "behaviour unchanged"],
      prompt: `<p>Here is a working but bare function. Rewrite it with: the exact signature
        <code>def clamp(value: int, low: int, high: int) -> int:</code>, a one-line docstring, and a
        <code>#</code> comment explaining the return line. It must still clamp <code>value</code> into
        the range <code>[low, high]</code>.</p>`,
      starter: `def clamp(value, low, high):\n    return max(low, min(value, high))\n`,
      solution: `def clamp(value: int, low: int, high: int) -> int:\n    """Return value limited to the inclusive range [low, high]."""\n    # min pulls it below high, max then lifts it up to low\n    return max(low, min(value, high))`,
      success: "Signature, docstring, and a comment that decodes the clever line \u2014 production-ready.",
      mustDefine: ["clamp"],
      require: [
        { pattern: "value\\s*:\\s*int", hard: true, message: "Annotate value as : int." },
        { pattern: "->\\s*int", hard: true, message: "Annotate the return type as -> int." },
        { pattern: "def clamp\\([^)]*\\)[^:]*:\\s*\\n\\s*(\"\"\"|''')", hard: true, message: "Add a docstring as the first line inside clamp." },
        { pattern: "#", hard: true, message: "Add a # comment explaining the return line." },
      ],
      tests: [
        { append: `print(clamp(5, 0, 10), clamp(-3, 0, 10), clamp(99, 0, 10))`, expect: "5 0 10" },
        { append: `print(clamp.__doc__ is not None)`, expect: "True" },
      ],
    },
  ],
},

/* ========================================================== 13 */
{
  id: "arrays-linked-lists",
  section: "Data Structures & Algorithms",
  title: "Arrays and Linked Lists",
  summary: "Two ways to store a sequence: a contiguous array (fast index) vs a chain of linked nodes (fast insert).",
  lead: "You've used Python's list for a dozen lessons. Now look under the hood — and meet its opposite. The choice between them is the first real data-structure decision.",
  spiral: ["lists: index, append, insert, slice (L7)", "dicts as records (L8)", "functions & return (L10)", "while loops (L6)", "None (L2, L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Two shapes for \u201ca sequence of things\u201d</h2>
      <p>An <strong>array</strong> stores its items <em>side by side</em> in memory. Item <code>i</code>
      lives at <code>start + i * size</code>, so <code>a[i]</code> is one instant jump — no matter how
      big the array. The catch: inserting at the front means <em>shifting every other item over</em>.</p>
      <p>A <strong>linked list</strong> stores each item in its own little box (a <em>node</em>) that also
      holds a pointer to the <em>next</em> box. The boxes can be anywhere. Following the chain to item
      <code>i</code> takes <code>i</code> hops — but adding a new box at the front is a single step.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="array versus linked list">
        <text x="20" y="24" font-size="13" font-weight="bold" fill="var(--ink)">array — contiguous, index = address maths</text>
        <g font-family="monospace" font-size="14">
          <rect x="20" y="34" width="56" height="44" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="76" y="34" width="56" height="44" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="132" y="34" width="56" height="44" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="188" y="34" width="56" height="44" fill="var(--box)" stroke="var(--box-line)"/>
          <rect x="244" y="34" width="56" height="44" fill="var(--box)" stroke="var(--box-line)"/>
          <text x="48" y="61" text-anchor="middle" fill="var(--ink)">10</text>
          <text x="104" y="61" text-anchor="middle" fill="var(--ink)">20</text>
          <text x="160" y="61" text-anchor="middle" fill="var(--ink)">30</text>
          <text x="216" y="61" text-anchor="middle" fill="var(--ink)">40</text>
          <text x="272" y="61" text-anchor="middle" fill="var(--ink)">50</text>
        </g>
        <g font-family="monospace" font-size="11" fill="var(--accent)">
          <text x="48" y="94" text-anchor="middle">0</text><text x="104" y="94" text-anchor="middle">1</text>
          <text x="160" y="94" text-anchor="middle">2</text><text x="216" y="94" text-anchor="middle">3</text>
          <text x="272" y="94" text-anchor="middle">4</text>
        </g>
        <text x="330" y="61" font-size="12" fill="var(--ink-soft)">a[3] &rarr; one jump. insert(0, x) &rarr; shift 4 items.</text>

        <text x="20" y="140" font-size="13" font-weight="bold" fill="var(--ink)">linked list — scattered nodes joined by \u201cnext\u201d</text>
        <text x="20" y="164" font-size="11" font-family="monospace" fill="var(--accent)">head</text>
        <line x1="20" y1="170" x2="20" y2="188" stroke="var(--ink-soft)"/>
        <g font-family="monospace" font-size="13">
          <rect x="20" y="188" width="90" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <line x1="80" y1="188" x2="80" y2="228" stroke="var(--box-line)"/>
          <text x="50" y="213" text-anchor="middle" fill="var(--ink)">10</text>
          <rect x="180" y="188" width="90" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <line x1="240" y1="188" x2="240" y2="228" stroke="var(--box-line)"/>
          <text x="210" y="213" text-anchor="middle" fill="var(--ink)">20</text>
          <rect x="340" y="188" width="90" height="40" fill="var(--box)" stroke="var(--box-line)"/>
          <line x1="400" y1="188" x2="400" y2="228" stroke="var(--box-line)"/>
          <text x="370" y="213" text-anchor="middle" fill="var(--ink)">30</text>
        </g>
        <line x1="80" y1="208" x2="180" y2="208" stroke="var(--accent)" marker-end="url(#ah13)"/>
        <line x1="240" y1="208" x2="340" y2="208" stroke="var(--accent)" marker-end="url(#ah13)"/>
        <text x="430" y="213" font-size="13" font-family="monospace" fill="var(--ink-soft)">&rarr; None</text>
        <defs><marker id="ah13" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
      </svg>`, `Same five values, two layouts. Arrays win at random access; linked lists win at front insertion.`)}
      <table class="tbl">
        <tr><th>Operation</th><th>Array (Python <code>list</code>)</th><th>Linked list</th></tr>
        <tr><td>read item <code>i</code></td><td><b>fast</b> — one step</td><td>slow — <code>i</code> hops</td></tr>
        <tr><td>insert / remove at front</td><td>slow — shift everything</td><td><b>fast</b> — one step</td></tr>
        <tr><td>insert / remove at back</td><td><b>fast</b> (amortised)</td><td>slow — walk to the tail</td></tr>
        <tr><td>memory</td><td>tight, one block</td><td>extra pointer per item</td></tr>
      </table>` },

    { type: "html", html: `
      <h2>2 · Python's <code>list</code> is a dynamic array</h2>
      <p>Everything you know about <code>list</code> from Lesson 7 is an array in disguise:
      <code>a[i]</code> is instant; <code>a.append(x)</code> is (usually) instant; but
      <code>a.insert(0, x)</code> and <code>a.pop(0)</code> quietly move every other element.</p>` },
    { type: "code", title: "Array moves you don't see", code: `a = [10, 20, 30, 40, 50]
print(a[3])          # instant, no matter the size

a.insert(0, 5)       # every element shifted right by one
print(a)

a.pop(2)             # everything after index 2 shifts left
print(a)` },
    { type: "html", html: whatif([
      "the list had a million items — would <code>a[500000]</code> be slower than <code>a[3]</code>?",
      "you called <code>a.insert(0, x)</code> a million times — fast or slow overall?",
      "you only ever add/remove at the <em>end</em> — is a plain list a good choice?",
    ]) },

    { type: "html", html: `
      <h2>3 · Building a linked list with dict nodes</h2>
      <p>A real linked list uses a class (a later topic). To see the <em>structure</em> clearly we'll
      use a <strong>dict per node</strong>: <code>{"val": ..., "next": ...}</code>. The last node's
      <code>"next"</code> is <code>None</code>. One variable, <code>head</code>, points at the first node.</p>` },
    { type: "code", title: "Three nodes, chained", code: `third  = {"val": 30, "next": None}
second = {"val": 20, "next": third}
head   = {"val": 10, "next": second}

print(head["val"])
print(head["next"]["val"])
print(head["next"]["next"]["val"])
print(head["next"]["next"]["next"])   # None -> end of the list` },

    { type: "html", html: `
      <h2>4 · The traversal loop — memorise this shape</h2>
      <p>Start at <code>head</code>. While the current node isn't <code>None</code>, use it, then
      <em>step to <code>node["next"]</code></em>. This loop is to linked lists what
      <code>for x in list</code> is to arrays.</p>` },
    { type: "code", title: "Walk every node", code: `head = {"val": 10, "next": {"val": 20, "next": {"val": 30, "next": None}}}

node = head
while node is not None:
    print(node["val"])
    node = node["next"]      # <-- the step that ends the loop` },
    { type: "html", html: whatif([
      "you forget the <code>node = node[\"next\"]</code> line — what happens?",
      "the list is empty (<code>head is None</code>) — does the loop body run at all?",
      "you write <code>while node[\"next\"] is not None</code> instead — which node gets missed?",
    ]) },

    { type: "html", html: `
      <h2>5 · Prepend is cheap; append is a walk</h2>
      <p>To add to the <strong>front</strong>: make a new node whose <code>"next"</code> is the old
      head, then move <code>head</code>. One step. To add to the <strong>back</strong>: you must walk
      all the way to the last node first.</p>` },
    { type: "code", title: "push_front vs append", code: `head = {"val": 20, "next": {"val": 30, "next": None}}

# prepend 10  (O(1))
head = {"val": 10, "next": head}

# append 40  (O(n): walk to the tail)
node = head
while node["next"] is not None:
    node = node["next"]
node["next"] = {"val": 40, "next": None}

node = head
while node is not None:
    print(node["val"], end=" ")
    node = node["next"]` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>After the two operations above, what does the final loop
      print? Now: if you swapped the order (append first, then prepend), would the output change?</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><strong>Array</strong>: contiguous; <code>a[i]</code> is O(1); front insert/remove is O(n).</li>
        <li>Python's <code>list</code> is a dynamic array — <code>insert(0, …)</code> / <code>pop(0)</code> are secretly O(n).</li>
        <li><strong>Linked list</strong>: nodes <code>{"val", "next"}</code> chained to <code>None</code>; one <code>head</code>.</li>
        <li>Traversal: <code>node = head; while node is not None: … ; node = node["next"]</code>.</li>
        <li>Prepend is O(1); reaching or appending at the end is O(n).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — Using lists as arrays / data structures", url: "https://docs.python.org/3/tutorial/datastructures.html" },
    { label: "Python Wiki — Time complexity of list operations", url: "https://wiki.python.org/moin/TimeComplexity" },
    { label: "CS50 — Data Structures (linked lists)", url: "https://cs50.harvard.edu/x/notes/5/" },
  ],
  exercises: [
    {
      title: "Front vs back",
      tier: "warm", uses: ["list.insert / append (L7)"],
      prompt: `<p>Start from <code>a = [1, 2, 3]</code>. Append <code>4</code>, then insert <code>0</code>
        at the front. Print the list.</p><pre>[0, 1, 2, 3, 4]</pre>`,
      starter: `a = [1, 2, 3]\n`,
      solution: `a = [1, 2, 3]\na.append(4)\na.insert(0, 0)\nprint(a)`,
      success: "append is cheap; insert(0, …) shifts everything — cheap here, costly at scale.",
      tests: [{ expect: "[0, 1, 2, 3, 4]" }],
    },
    {
      title: "Read the third node",
      tier: "warm", uses: ["dict access (L8)"],
      prompt: `<p>The starter builds a 3-node list. Print the value of the <strong>third</strong> node by
        following <code>"next"</code> twice.</p><pre>30</pre>`,
      starter: `head = {"val": 10, "next": {"val": 20, "next": {"val": 30, "next": None}}}\n`,
      solution: `head = {"val": 10, "next": {"val": 20, "next": {"val": 30, "next": None}}}\nprint(head["next"]["next"]["val"])`,
      success: "Each [\"next\"] is one hop along the chain.",
      tests: [{ expect: "30" }],
    },
    {
      title: "length(head)",
      tier: "core", uses: ["traversal loop", "accumulator (L6)", "functions (L10)"],
      prompt: `<p>Define <code>length(head)</code> returning how many nodes are in the linked list
        (<code>0</code> for an empty list, i.e. <code>head is None</code>).</p>`,
      solution: `def length(head):\n    n = 0\n    node = head\n    while node is not None:\n        n += 1\n        node = node["next"]\n    return n`,
      success: "The traversal loop with a counter.",
      mustDefine: ["length"],
      tests: [
        { append: `print(length({"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}))`, expect: "3" },
        { append: `print(length(None))`, expect: "0" },
        { append: `print(length({"val": 9, "next": None}))`, expect: "1" },
      ],
    },
    {
      title: "sum_list(head)",
      tier: "core", uses: ["traversal", "accumulator (L6)"],
      prompt: `<p>Define <code>sum_list(head)</code> returning the total of every node's <code>"val"</code>
        (<code>0</code> for empty).</p>`,
      solution: `def sum_list(head):\n    total = 0\n    node = head\n    while node is not None:\n        total += node["val"]\n        node = node["next"]\n    return total`,
      success: "Same loop, different accumulator.",
      mustDefine: ["sum_list"],
      tests: [
        { append: `print(sum_list({"val": 5, "next": {"val": 10, "next": {"val": 2, "next": None}}}))`, expect: "17" },
        { append: `print(sum_list(None))`, expect: "0" },
      ],
    },
    {
      title: "to_list(head)",
      tier: "core", uses: ["traversal", "build a list (L7)", "functions (L10)"],
      prompt: `<p>Define <code>to_list(head)</code> returning a plain Python list of the node values in
        order.</p>`,
      solution: `def to_list(head):\n    out = []\n    node = head\n    while node is not None:\n        out.append(node["val"])\n        node = node["next"]\n    return out`,
      success: "Collect values into an array as you walk the chain.",
      mustDefine: ["to_list"],
      tests: [
        { append: `print(to_list({"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}))`, expect: "[1, 2, 3]" },
        { append: `print(to_list(None))`, expect: "[]" },
      ],
    },
    {
      title: "from_list(values)",
      tier: "core", uses: ["loop over list (L6, L7)", "node dicts", "prepend trick"],
      prompt: `<p>Define <code>from_list(values)</code> that builds a linked list from a Python list and
        returns its <code>head</code>. Order must match. (Tip: walk <code>values</code> backwards and
        prepend, or build front-to-back tracking a <code>tail</code>.)</p>`,
      solution: `def from_list(values):\n    head = None\n    for v in reversed(values):\n        head = {"val": v, "next": head}\n    return head`,
      success: "Prepending in reverse order lands everything in the right place.",
      mustDefine: ["from_list"],
      tests: [
        { append: `h = from_list([1, 2, 3])\nout = []\nwhile h is not None:\n    out.append(h["val"])\n    h = h["next"]\nprint(out)`, expect: "[1, 2, 3]" },
        { append: `print(from_list([]))`, expect: "None" },
      ],
    },
    {
      title: "contains(head, target)",
      tier: "challenge", uses: ["traversal", "if / return early (L5, L10)", "bool"],
      prompt: `<p>Define <code>contains(head, target)</code> returning <code>True</code> if any node's
        value equals <code>target</code>, else <code>False</code>.</p>`,
      solution: `def contains(head, target):\n    node = head\n    while node is not None:\n        if node["val"] == target:\n            return True\n        node = node["next"]\n    return False`,
      success: "Return True the moment you find it; if the loop ends, it's not there.",
      mustDefine: ["contains"],
      tests: [
        { append: `h = {"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}\nprint(contains(h, 2), contains(h, 9))`, expect: "True False" },
        { append: `print(contains(None, 1))`, expect: "False" },
      ],
    },
    {
      title: "nth(head, i)",
      tier: "challenge", uses: ["traversal with a counter", "if / return (L5)"],
      prompt: `<p>Define <code>nth(head, i)</code> returning the value of node <code>i</code> (0-indexed),
        or the string <code>"out of range"</code> if <code>i</code> is too big or negative.</p>`,
      solution: `def nth(head, i):\n    if i < 0:\n        return "out of range"\n    node = head\n    count = 0\n    while node is not None:\n        if count == i:\n            return node["val"]\n        count += 1\n        node = node["next"]\n    return "out of range"`,
      success: "Hop i times; if you fall off the end first, it's out of range.",
      mustDefine: ["nth"],
      tests: [
        { append: `h = {"val": 10, "next": {"val": 20, "next": {"val": 30, "next": None}}}\nprint(nth(h, 0), nth(h, 2), nth(h, 3), nth(h, -1))`, expect: "10 30 out of range out of range" },
      ],
    },
    {
      title: "reverse(head)",
      tier: "challenge", uses: ["traversal", "three-pointer rewiring", "None (L2)"],
      prompt: `<p>Define <code>reverse(head)</code> that reverses the links and returns the new head.
        Classic technique: keep <code>prev</code>, walk the list, and on each node point its
        <code>"next"</code> back at <code>prev</code>.</p>`,
      solution: `def reverse(head):\n    prev = None\n    node = head\n    while node is not None:\n        nxt = node["next"]\n        node["next"] = prev\n        prev = node\n        node = nxt\n    return prev`,
      success: "Save the next node before you overwrite the pointer — then slide prev and node forward.",
      mustDefine: ["reverse"],
      tests: [
        { append: `h = {"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}\nr = reverse(h)\nout = []\nwhile r is not None:\n    out.append(r["val"])\n    r = r["next"]\nprint(out)`, expect: "[3, 2, 1]" },
        { append: `print(reverse(None))`, expect: "None" },
      ],
    },
    {
      title: "middle(head)",
      tier: "boss", uses: ["two-pointer (slow / fast)", "traversal", "functions (L10)"],
      prompt: `<p>Define <code>middle(head)</code> returning the value of the middle node in one pass —
        <strong>without</strong> first counting the length. Use two pointers: <code>slow</code> moves
        one step, <code>fast</code> moves two; when <code>fast</code> runs off the end, <code>slow</code>
        is at the middle. For an even count, return the <em>second</em> of the two middles. Assume
        a non-empty list.</p>`,
      solution: `def middle(head):\n    slow = head\n    fast = head\n    while fast is not None and fast["next"] is not None:\n        slow = slow["next"]\n        fast = fast["next"]["next"]\n    return slow["val"]`,
      success: "The fast pointer covers the list in half the steps, so slow lands dead centre.",
      mustDefine: ["middle"],
      tests: [
        { append: `print(middle({"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}))`, expect: "2" },
        { append: `print(middle({"val": 1, "next": {"val": 2, "next": {"val": 3, "next": {"val": 4, "next": None}}}}))`, expect: "3" },
        { append: `print(middle({"val": 42, "next": None}))`, expect: "42" },
      ],
    },
  ],
},

/* ========================================================== 14 */
{
  id: "hashmaps",
  section: "Data Structures & Algorithms",
  title: "HashMaps",
  summary: "How a dictionary gives O(1) lookups: hashing a key to a bucket, handling collisions, and why it beats scanning a list.",
  lead: "You've used Python's dict since Lesson 8. Now see the machine inside it — a hash function, an array of buckets — and build a tiny one yourself.",
  spiral: ["dicts: keys, .get, .items (L8)", "lists & append (L7)", "loops (L6)", "% operator (L3)", "loop over a string (L4, L6)", "functions & return (L10)", "sorted (built-in)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The idea: turn a key into an index</h2>
      <p>An array gives instant access <em>by number</em>. A hashmap gives instant access <em>by any
      key</em> — by running the key through a <strong>hash function</strong> that spits out a number,
      then folding that number into a valid slot with <code>% number_of_slots</code>.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="key hashed to a bucket index">
        <rect x="20" y="70" width="90" height="44" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
        <text x="65" y="97" text-anchor="middle" font-size="14" font-family="monospace" fill="var(--accent)">"cat"</text>
        <text x="120" y="97" font-size="20" fill="var(--ink-soft)">&rarr;</text>
        <rect x="150" y="64" width="140" height="56" rx="10" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="220" y="88" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">hash("cat")</text>
        <text x="220" y="108" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">= 312</text>
        <text x="300" y="97" font-size="20" fill="var(--ink-soft)">&rarr;</text>
        <rect x="330" y="64" width="140" height="56" rx="10" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="400" y="88" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--ink)">312 % 8</text>
        <text x="400" y="108" text-anchor="middle" font-size="12" font-family="monospace" fill="var(--accent)">= 0</text>
        <text x="480" y="97" font-size="20" fill="var(--ink-soft)">&rarr;</text>
        <g font-family="monospace" font-size="11">
          <rect x="510" y="30" width="34" height="24" fill="var(--accent)" stroke="var(--box-line)"/>
          <text x="527" y="47" text-anchor="middle" fill="#fff">0</text>
          <rect x="510" y="54" width="34" height="24" fill="var(--panel-2)" stroke="var(--line)"/><text x="527" y="71" text-anchor="middle" fill="var(--ink-soft)">1</text>
          <rect x="510" y="78" width="34" height="24" fill="var(--panel-2)" stroke="var(--line)"/><text x="527" y="95" text-anchor="middle" fill="var(--ink-soft)">2</text>
          <rect x="510" y="102" width="34" height="24" fill="var(--panel-2)" stroke="var(--line)"/><text x="527" y="119" text-anchor="middle" fill="var(--ink-soft)">…</text>
          <rect x="510" y="126" width="34" height="24" fill="var(--panel-2)" stroke="var(--line)"/><text x="527" y="143" text-anchor="middle" fill="var(--ink-soft)">7</text>
        </g>
        <text x="527" y="170" text-anchor="middle" font-size="11" fill="var(--ink-soft)">buckets</text>
      </svg>`, `Same key -> same number -> same bucket, every time. That's why lookup is one step, not a search.`)}
      <p>Python has a built-in <code>hash(x)</code> for this. It returns a (possibly huge, possibly
      negative) integer. To turn any hashable value into a bucket slot: <code>hash(key) % n_buckets</code>
      — take <code>abs(...)</code> first if you want to avoid a negative index.</p>` },
    { type: "code", title: "hash() and a bucket index", code: `print(hash(42))
print(hash("cat") == hash("cat"))   # always equal for the same value in one run
n = 8
key = 42
print(hash(key) % n)` },
    { type: "html", html: `
      <div class="note"><b>Why we'll use our own hash below</b>
      Python randomises string hashing between program runs (a security feature), so
      <code>hash("cat")</code> isn't the same number tomorrow. For predictable exercises we'll build a
      tiny deterministic hash from <code>ord(ch)</code> — the code number of a character
      (<code>ord("A")</code> is 65).</p></div>` },
    { type: "code", title: "ord() and a toy hash", code: `print(ord("A"), ord("a"), ord("0"))

def simple_hash(s):
    total = 0
    for ch in s:
        total += ord(ch)
    return total

print(simple_hash("cat"))
print(simple_hash("act"))   # same letters -> same toy hash (a real one wouldn't collide so easily)` },

    { type: "html", html: `
      <h2>2 · Why it beats a list</h2>
      <p>Find a key in a list of <code>n</code> pairs: you might check all <code>n</code>. Find a key in
      a hashmap: hash it, go straight to one bucket, check the handful of items there. On average that's
      <strong>constant time</strong> regardless of size.</p>
      <table class="tbl">
        <tr><th>Operation</th><th>list of pairs</th><th>hashmap (dict)</th></tr>
        <tr><td>look up / update by key</td><td>O(n) scan</td><td><b>O(1)</b> average</td></tr>
        <tr><td>membership test <code>key in d</code></td><td>O(n)</td><td><b>O(1)</b> average</td></tr>
        <tr><td>keep sorted order</td><td>you can</td><td>no (insertion order only)</td></tr>
      </table>` },

    { type: "html", html: `
      <h2>3 · Collisions — two keys, one bucket</h2>
      <p>Different keys can hash to the same slot. The fix used here is <strong>chaining</strong>: each
      bucket holds a small <em>list of <code>[key, value]</code> pairs</em>. To find a key you hash to
      the bucket, then linearly scan that short list.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="buckets with chained pairs">
        <g font-family="monospace" font-size="12">
          <rect x="20" y="20" width="40" height="28" fill="var(--panel-2)" stroke="var(--line)"/><text x="40" y="39" text-anchor="middle" fill="var(--ink-soft)">0</text>
          <rect x="20" y="48" width="40" height="28" fill="var(--panel-2)" stroke="var(--line)"/><text x="40" y="67" text-anchor="middle" fill="var(--ink-soft)">1</text>
          <rect x="20" y="76" width="40" height="28" fill="var(--panel-2)" stroke="var(--line)"/><text x="40" y="95" text-anchor="middle" fill="var(--ink-soft)">2</text>
          <rect x="20" y="104" width="40" height="28" fill="var(--panel-2)" stroke="var(--line)"/><text x="40" y="123" text-anchor="middle" fill="var(--ink-soft)">3</text>
        </g>
        <line x1="60" y1="62" x2="100" y2="62" stroke="var(--accent)"/>
        <rect x="100" y="48" width="130" height="28" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="165" y="67" text-anchor="middle" font-size="11" font-family="monospace" fill="var(--ink)">["cat", 9]</text>
        <line x1="230" y1="62" x2="260" y2="62" stroke="var(--accent)"/>
        <rect x="260" y="48" width="130" height="28" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="325" y="67" text-anchor="middle" font-size="11" font-family="monospace" fill="var(--ink)">["dog", 4]</text>
        <text x="420" y="67" font-size="11" fill="var(--ink-soft)">both hashed to bucket 1 &rarr; scan this short chain</text>
        <line x1="60" y1="118" x2="100" y2="118" stroke="var(--accent)"/>
        <rect x="100" y="104" width="130" height="28" rx="6" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="165" y="123" text-anchor="middle" font-size="11" font-family="monospace" fill="var(--ink)">["fish", 7]</text>
      </svg>`, `A good hash spreads keys out so chains stay tiny — then a scan of "a few" is effectively O(1).`)}
      <h2>4 · Build a mini hashmap</h2>
      <p><code>buckets</code> is a list of lists. <code>put</code> replaces the value if the key is
      already in its bucket, otherwise appends a new pair. <code>get</code> hashes, then scans.</p>` },
    { type: "code", title: "put and get from scratch", code: `def new_map(n=8):
    buckets = []
    for _ in range(n):
        buckets.append([])
    return buckets

def _index(buckets, key):
    return simple_hash(key) % len(buckets)

def put(buckets, key, value):
    chain = buckets[_index(buckets, key)]
    for pair in chain:
        if pair[0] == key:
            pair[1] = value          # update
            return
    chain.append([key, value])       # insert

def get(buckets, key):
    chain = buckets[_index(buckets, key)]
    for pair in chain:
        if pair[0] == key:
            return pair[1]
    return None

m = new_map()
put(m, "apples", 5)
put(m, "pears", 2)
put(m, "apples", 6)     # update, not a second entry
print(get(m, "apples"), get(m, "pears"), get(m, "bananas"))` },
    { type: "html", html: whatif([
      "two different keys hash to the same bucket — does <code>get</code> still return the right value?",
      "you <code>put</code> the same key twice with different values — one entry or two?",
      "<code>n</code> is 1 (a single bucket) — does it still work? What's the lookup speed then?",
      "a key isn't in the map at all — what does <code>get</code> return?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Hashmap = hash function + array of buckets. <code>index = hash(key) % n</code>.</li>
        <li>Python's <code>dict</code> is a hashmap: <code>d[k]</code>, <code>k in d</code>, <code>.get</code> are O(1) average.</li>
        <li>Collisions are handled by <strong>chaining</strong> — a short list of <code>[key, value]</code> per bucket.</li>
        <li>Reach for a dict whenever you'd otherwise <em>search a list to match a key</em>.</li>
        <li><code>hash(x)</code> and <code>ord(ch)</code> are the built-ins used here.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Dictionaries", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" },
    { label: "Python docs — hash()", url: "https://docs.python.org/3/library/functions.html#hash" },
    { label: "Wikipedia — Hash table", url: "https://en.wikipedia.org/wiki/Hash_table" },
  ],
  exercises: [
    {
      title: "Phonebook",
      tier: "warm", uses: ["dict (L8)"],
      prompt: `<p>Build <code>book = {"Ada": 111, "Bo": 222}</code>. Add <code>"Cy": 333</code>, then print
        Bo's number and whether <code>"Dan"</code> is in the book.</p><pre>222 False</pre>`,
      starter: `book = {"Ada": 111, "Bo": 222}\n`,
      solution: `book = {"Ada": 111, "Bo": 222}\nbook["Cy"] = 333\nprint(book["Bo"], "Dan" in book)`,
      success: "A dict IS a hashmap — this is the O(1) lookup you're studying.",
      tests: [{ expect: "222 False" }],
    },
    {
      title: "simple_hash(s)",
      tier: "warm", uses: ["ord()", "loop over string (L6)", "accumulator (L6)"],
      prompt: `<p>Define <code>simple_hash(s)</code> returning the sum of <code>ord(ch)</code> over every
        character.</p>`,
      solution: `def simple_hash(s):\n    total = 0\n    for ch in s:\n        total += ord(ch)\n    return total`,
      success: "A tiny deterministic hash — real ones mix the bits far more.",
      mustDefine: ["simple_hash"],
      tests: [
        { append: `print(simple_hash("abc"))`, expect: "294" },
        { append: `print(simple_hash(""))`, expect: "0" },
        { append: `print(simple_hash("A"))`, expect: "65" },
      ],
    },
    {
      title: "bucket_index(key, n)",
      tier: "core", uses: ["simple_hash", "% operator (L3)"],
      prompt: `<p>Define <code>bucket_index(key, n)</code> returning <code>simple_hash(key) % n</code>.
        Assume <code>simple_hash</code> from the previous exercise is available (it's included below
        when we test).</p>`,
      solution: `def bucket_index(key, n):\n    return simple_hash(key) % n`,
      success: "% folds any hash value into a valid slot 0..n-1.",
      mustDefine: ["bucket_index"],
      tests: [
        { append: `def simple_hash(s):\n    return sum(ord(c) for c in s)\nprint(bucket_index("abc", 8))`, expect: "6" },
        { append: `def simple_hash(s):\n    return sum(ord(c) for c in s)\nprint(bucket_index("abc", 1))`, expect: "0" },
      ],
    },
    {
      title: "put(buckets, key, value)",
      tier: "core", uses: ["list of lists", "loop + if (L5, L6)", "update-or-append"],
      prompt: `<p>Define <code>put(buckets, key, value)</code>: find the key's chain (using
        <code>simple_hash(key) % len(buckets)</code>); if a <code>[key, value]</code> pair with that
        key exists, overwrite its value; otherwise append a new pair. Return nothing.</p>`,
      solution: `def put(buckets, key, value):\n    chain = buckets[simple_hash(key) % len(buckets)]\n    for pair in chain:\n        if pair[0] == key:\n            pair[1] = value\n            return\n    chain.append([key, value])`,
      success: "Scan the short chain first — update if found, insert if not.",
      mustDefine: ["put"],
      tests: [
        { append: `def simple_hash(s):\n    return sum(ord(c) for c in s)\nm = [[] for _ in range(4)]\nput(m, "a", 1)\nput(m, "a", 9)\nput(m, "b", 2)\ntotal = 0\nfor ch in m:\n    total += len(ch)\nprint(total)`, expect: "2" },
      ],
    },
    {
      title: "get(buckets, key)",
      tier: "core", uses: ["hash to a bucket", "linear scan of a chain", "return None"],
      prompt: `<p>Define <code>get(buckets, key)</code> returning the stored value for <code>key</code>,
        or <code>None</code> if it isn't present.</p>`,
      solution: `def get(buckets, key):\n    chain = buckets[simple_hash(key) % len(buckets)]\n    for pair in chain:\n        if pair[0] == key:\n            return pair[1]\n    return None`,
      success: "One hash, then a scan of only that bucket.",
      mustDefine: ["get"],
      tests: [
        { append: `def simple_hash(s):\n    return sum(ord(c) for c in s)\nm = [[] for _ in range(4)]\nm[simple_hash("x") % 4].append(["x", 42])\nprint(get(m, "x"), get(m, "y"))`, expect: "42 None" },
      ],
    },
    {
      title: "Two-sum",
      tier: "challenge", uses: ["dict for O(1) lookup (L8)", "loop with index (L6)", "return a list"],
      prompt: `<p>Define <code>two_sum(nums, target)</code> returning a list <code>[i, j]</code> of the two
        indices whose values add to <code>target</code> (<code>i &lt; j</code>). Use a dict mapping
        <em>value &rarr; index</em> so each number is checked in O(1). Assume exactly one answer.</p>`,
      solution: `def two_sum(nums, target):\n    seen = {}\n    for i in range(len(nums)):\n        need = target - nums[i]\n        if need in seen:\n            return [seen[need], i]\n        seen[nums[i]] = i`,
      success: "For each number, ask the dict 'have I already seen what I need?' — no inner loop.",
      mustDefine: ["two_sum"],
      tests: [
        { append: `print(two_sum([2, 7, 11, 15], 9))`, expect: "[0, 1]" },
        { append: `print(two_sum([3, 2, 4], 6))`, expect: "[1, 2]" },
        { append: `print(two_sum([1, 5, 5, 2], 10))`, expect: "[1, 2]" },
      ],
      review: [{ pattern: "for .*:\\s*\\n\\s*for ", tip: `That's the O(n\u00b2) double loop. The dict version checks each number once — O(n).` }],
    },
    {
      title: "First non-repeating",
      tier: "challenge", uses: ["tally dict (L8)", "two passes", "loop over string (L6)"],
      prompt: `<p>Define <code>first_unique(s)</code> returning the first character in <code>s</code> that
        appears exactly once, or <code>""</code> if there is none. Pass 1: count. Pass 2: find.</p>`,
      solution: `def first_unique(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return ""`,
      success: "Counting into a dict makes the second pass O(n) instead of O(n\u00b2).",
      mustDefine: ["first_unique"],
      tests: [
        { append: `print(first_unique("leetcode"))`, expect: "l" },
        { append: `print(first_unique("aabb"))`, expect: "" },
        { append: `print(first_unique("swiss"))`, expect: "w" },
      ],
    },
    {
      title: "Word frequencies with your map",
      tier: "challenge", uses: ["your put/get", "split() (L4)", "loop (L6)"],
      prompt: `<p>Define <code>counts(words)</code> that takes a list of words and returns a plain dict of
        word &rarr; count. (You may just use a normal dict — you've now seen what it's doing inside.)</p>`,
      solution: `def counts(words):\n    d = {}\n    for w in words:\n        d[w] = d.get(w, 0) + 1\n    return d`,
      success: "The tally idiom — now you know the O(1) machinery behind d[w].",
      mustDefine: ["counts"],
      tests: [
        { append: `print(counts(["a", "b", "a", "c", "a", "b"]))`, expect: "{'a': 3, 'b': 2, 'c': 1}" },
        { append: `print(counts([]))`, expect: "{}" },
      ],
    },
    {
      title: "Group anagrams",
      tier: "boss", uses: ["dict of lists (L8)", "sorted() on a string", "\"\".join", "loop (L6)"],
      prompt: `<p>Define <code>group_anagrams(words)</code> returning a dict whose key is the word's
        letters <strong>sorted and joined</strong> (e.g. <code>"eat" &rarr; "aet"</code>) and whose
        value is the list of original words with those letters, in input order.</p>
        <p><code>group_anagrams(["eat", "tea", "tan", "ate", "nat"])</code> &rarr;
        <code>{'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat']}</code></p>`,
      solution: `def group_anagrams(words):\n    groups = {}\n    for w in words:\n        key = "".join(sorted(w))\n        if key not in groups:\n            groups[key] = []\n        groups[key].append(w)\n    return groups`,
      success: "The sorted-letters string is a perfect hashmap key for 'same letters'.",
      mustDefine: ["group_anagrams"],
      tests: [
        { append: `print(group_anagrams(["eat", "tea", "tan", "ate", "nat"]))`, expect: "{'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat']}" },
        { append: `print(group_anagrams([]))`, expect: "{}" },
      ],
    },
  ],
},

/* ========================================================== 15 */
{
  id: "stacks-queues-heaps",
  section: "Data Structures & Algorithms",
  title: "Heaps, Stacks and Queues",
  summary: "Three access disciplines: last-in-first-out (stack), first-in-first-out (queue), and always-smallest-first (heap).",
  lead: "Same storage — a list — but different rules about which end you touch. That one rule changes what each is good for.",
  spiral: ["list.append / pop / [-1] (L7)", "loops (L6)", "if / while (L5, L6)", "// and % for indices (L3)", "functions (L10)", "int() (L9)", "None (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Stack — Last In, First Out</h2>
      <p>Like a stack of plates: you add and remove from the <strong>top</strong> only. The last thing
      you pushed is the first thing you pop. Python's list already is a stack:
      <code>push</code> = <code>.append(x)</code>, <code>pop</code> = <code>.pop()</code>,
      <code>peek</code> = <code>a[-1]</code> — all O(1).</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a stack">
        <g font-family="monospace" font-size="13">
          <rect x="60" y="120" width="120" height="30" fill="var(--box)" stroke="var(--box-line)"/><text x="120" y="140" text-anchor="middle" fill="var(--ink)">1  (first in)</text>
          <rect x="60" y="90" width="120" height="30" fill="var(--box)" stroke="var(--box-line)"/><text x="120" y="110" text-anchor="middle" fill="var(--ink)">2</text>
          <rect x="60" y="60" width="120" height="30" fill="var(--accent)" stroke="var(--box-line)"/><text x="120" y="80" text-anchor="middle" fill="#fff">3  (top)</text>
        </g>
        <text x="210" y="70" font-size="12" font-family="monospace" fill="var(--ink-soft)">push(4) &rarr; goes on top</text>
        <text x="210" y="90" font-size="12" font-family="monospace" fill="var(--ink-soft)">pop() &rarr; returns 3</text>
        <text x="210" y="110" font-size="12" font-family="monospace" fill="var(--ink-soft)">peek &rarr; a[-1]</text>
        <text x="60" y="175" font-size="11" fill="var(--ink-soft)">Uses: undo history, bracket matching, depth-first search, the call stack itself.</text>
      </svg>`, `Only the top is reachable. That constraint is the whole point.`)}
    ` },
    { type: "code", title: "A stack is just a list", code: `stack = []
stack.append("a")
stack.append("b")
stack.append("c")
print(stack)
print("peek:", stack[-1])
print("pop:", stack.pop())
print(stack)` },

    { type: "html", html: `
      <h2>2 · Queue — First In, First Out</h2>
      <p>Like a checkout line: join at the <strong>back</strong>, leave from the <strong>front</strong>.
      With a list: <code>enqueue</code> = <code>.append(x)</code>, <code>dequeue</code> =
      <code>.pop(0)</code>. But <code>pop(0)</code> shifts every remaining item — O(n).</p>
      <div class="warn"><b>For a real queue, use <code>deque</code></b>
      <code>from collections import deque</code> gives O(1) at <em>both</em> ends
      (<code>.append</code> / <code>.popleft</code>). We'll use a plain list here to keep it to what
      you know — just remember <code>pop(0)</code> isn't free.</div>` },
    { type: "code", title: "A queue with a list", code: `queue = []
queue.append("first")
queue.append("second")
queue.append("third")
print("serve:", queue.pop(0))
print("serve:", queue.pop(0))
print("waiting:", queue)` },
    { type: "html", html: whatif([
      "you <code>pop()</code> instead of <code>pop(0)</code> on the queue — LIFO or FIFO?",
      "the queue holds a million items and you <code>pop(0)</code> — why is that slow?",
      "a stack and a queue both receive <code>1, 2, 3</code>. In what order does each hand them back?",
    ]) },

    { type: "html", html: `
      <h2>3 · Heap — the smallest is always at the front</h2>
      <p>A <strong>binary heap</strong> keeps a tree's shape inside a flat array. For the item at
      index <code>i</code>: its children are at <code>2i+1</code> and <code>2i+2</code>, its parent is
      at <code>(i-1)//2</code>. A <strong>min-heap</strong> keeps every parent
      <code>&le;</code> its children — so <code>heap[0]</code> is always the minimum.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="binary min-heap as tree and array">
        <g font-family="monospace" font-size="13">
          <circle cx="300" cy="30" r="18" fill="var(--accent)" stroke="var(--box-line)"/><text x="300" y="35" text-anchor="middle" fill="#fff">1</text>
          <circle cx="220" cy="90" r="18" fill="var(--box)" stroke="var(--box-line)"/><text x="220" y="95" text-anchor="middle" fill="var(--ink)">3</text>
          <circle cx="380" cy="90" r="18" fill="var(--box)" stroke="var(--box-line)"/><text x="380" y="95" text-anchor="middle" fill="var(--ink)">2</text>
          <circle cx="180" cy="150" r="18" fill="var(--box)" stroke="var(--box-line)"/><text x="180" y="155" text-anchor="middle" fill="var(--ink)">7</text>
          <circle cx="260" cy="150" r="18" fill="var(--box)" stroke="var(--box-line)"/><text x="260" y="155" text-anchor="middle" fill="var(--ink)">4</text>
          <circle cx="360" cy="150" r="18" fill="var(--box)" stroke="var(--box-line)"/><text x="360" y="155" text-anchor="middle" fill="var(--ink)">9</text>
        </g>
        <line x1="288" y1="44" x2="232" y2="76" stroke="var(--ink-soft)"/><line x1="312" y1="44" x2="368" y2="76" stroke="var(--ink-soft)"/>
        <line x1="208" y1="104" x2="188" y2="134" stroke="var(--ink-soft)"/><line x1="232" y1="104" x2="252" y2="134" stroke="var(--ink-soft)"/>
        <line x1="380" y1="108" x2="362" y2="134" stroke="var(--ink-soft)"/>
        <g font-family="monospace" font-size="12">
          <rect x="120" y="195" width="46" height="28" fill="var(--accent)" stroke="var(--box-line)"/><text x="143" y="214" text-anchor="middle" fill="#fff">1</text>
          <rect x="166" y="195" width="46" height="28" fill="var(--box)" stroke="var(--box-line)"/><text x="189" y="214" text-anchor="middle" fill="var(--ink)">3</text>
          <rect x="212" y="195" width="46" height="28" fill="var(--box)" stroke="var(--box-line)"/><text x="235" y="214" text-anchor="middle" fill="var(--ink)">2</text>
          <rect x="258" y="195" width="46" height="28" fill="var(--box)" stroke="var(--box-line)"/><text x="281" y="214" text-anchor="middle" fill="var(--ink)">7</text>
          <rect x="304" y="195" width="46" height="28" fill="var(--box)" stroke="var(--box-line)"/><text x="327" y="214" text-anchor="middle" fill="var(--ink)">4</text>
          <rect x="350" y="195" width="46" height="28" fill="var(--box)" stroke="var(--box-line)"/><text x="373" y="214" text-anchor="middle" fill="var(--ink)">9</text>
        </g>
        <g font-family="monospace" font-size="10" fill="var(--accent)">
          <text x="143" y="190" text-anchor="middle">0</text><text x="189" y="190" text-anchor="middle">1</text>
          <text x="235" y="190" text-anchor="middle">2</text><text x="281" y="190" text-anchor="middle">3</text>
          <text x="327" y="190" text-anchor="middle">4</text><text x="373" y="190" text-anchor="middle">5</text>
        </g>
        <text x="430" y="214" font-size="11" fill="var(--ink-soft)">children of i: 2i+1, 2i+2</text>
      </svg>`, `The tree is imaginary — it's all one array. heap[0] is the smallest; getting it is O(1).`)}
      <p><strong>push</strong>: append the new value, then <em>bubble up</em> — swap with the parent
      while it's bigger. <strong>pop-min</strong>: take <code>heap[0]</code>, move the last item to the
      front, then <em>bubble down</em> — swap with the smaller child while it's out of order. Both are
      O(log n) because the tree is only that tall.</p>` },
    { type: "code", title: "A min-heap from scratch", code: `def heap_push(heap, x):
    heap.append(x)
    i = len(heap) - 1
    while i > 0:
        parent = (i - 1) // 2
        if heap[parent] <= heap[i]:
            break
        heap[i], heap[parent] = heap[parent], heap[i]
        i = parent

def heap_pop_min(heap):
    if not heap:
        return None
    top = heap[0]
    last = heap.pop()
    if heap:
        heap[0] = last
        i, n = 0, len(heap)
        while True:
            small = i
            for child in (2*i + 1, 2*i + 2):
                if child < n and heap[child] < heap[small]:
                    small = child
            if small == i:
                break
            heap[i], heap[small] = heap[small], heap[i]
            i = small
    return top

h = []
for x in [5, 3, 8, 1, 9, 2]:
    heap_push(h, x)
print("min at front:", h[0])
print("pop order:", heap_pop_min(h), heap_pop_min(h), heap_pop_min(h))` },
    { type: "html", html: `
      <div class="predict"><b>Predict first</b>Push <code>5, 3, 8, 1</code> into an empty min-heap.
      What is <code>heap[0]</code> after each push? What's the first thing <code>heap_pop_min</code>
      returns?</div>
      <table class="tbl">
        <tr><th>Operation</th><th>Stack</th><th>Queue (list)</th><th>Min-heap</th></tr>
        <tr><td>add</td><td>O(1)</td><td>O(1)</td><td>O(log n)</td></tr>
        <tr><td>remove the \u201cnext\u201d one</td><td>O(1) (newest)</td><td>O(n) (oldest)</td><td>O(log n) (smallest)</td></tr>
        <tr><td>look at the \u201cnext\u201d one</td><td>O(1)</td><td>O(1)</td><td>O(1)</td></tr>
      </table>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><strong>Stack (LIFO)</strong>: list + <code>append</code> / <code>pop</code> / <code>a[-1]</code>. Undo, brackets, DFS.</li>
        <li><strong>Queue (FIFO)</strong>: <code>append</code> / <code>pop(0)</code> (O(n) with a list; use <code>deque</code> for real). BFS, scheduling.</li>
        <li><strong>Min-heap</strong>: array where child(i) = <code>2i+1</code>, <code>2i+2</code>; <code>heap[0]</code> is the min. push/pop O(log n).</li>
        <li>Choose by which item you always need next: newest &rarr; stack, oldest &rarr; queue, smallest &rarr; heap.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — heapq (real priority queue)", url: "https://docs.python.org/3/library/heapq.html" },
    { label: "Python docs — collections.deque", url: "https://docs.python.org/3/library/collections.html#collections.deque" },
    { label: "Wikipedia — Binary heap", url: "https://en.wikipedia.org/wiki/Binary_heap" },
  ],
  exercises: [
    {
      title: "Push and pop",
      tier: "warm", uses: ["list append / pop (L7)"],
      prompt: `<p>Start with an empty <code>stack</code>. Push <code>10</code>, <code>20</code>,
        <code>30</code>. Pop once. Print the popped value, then the stack.</p><pre>30\n[10, 20]</pre>`,
      starter: `stack = []\n`,
      solution: `stack = []\nstack.append(10)\nstack.append(20)\nstack.append(30)\nprint(stack.pop())\nprint(stack)`,
      success: "Last in, first out.",
      tests: [{ expect: "30\n[10, 20]" }],
    },
    {
      title: "Peek, don't take",
      tier: "warm", uses: ["negative index (L4)"],
      prompt: `<p>Given <code>stack = [1, 2, 3, 4]</code>, print the top item <em>without</em> removing it,
        then print the stack (unchanged).</p><pre>4\n[1, 2, 3, 4]</pre>`,
      starter: `stack = [1, 2, 3, 4]\n`,
      solution: `stack = [1, 2, 3, 4]\nprint(stack[-1])\nprint(stack)`,
      success: "a[-1] reads the top; .pop() would remove it.",
      tests: [{ expect: "4\n[1, 2, 3, 4]" }],
    },
    {
      title: "Queue order",
      tier: "core", uses: ["append / pop(0)", "build a list (L7)", "loop (L6)"],
      prompt: `<p>Define <code>serve_all(items)</code>: put every item into a queue, then repeatedly
        dequeue and collect into a result list. Return that list — it should equal the input order.</p>`,
      solution: `def serve_all(items):\n    q = []\n    for x in items:\n        q.append(x)\n    out = []\n    while q:\n        out.append(q.pop(0))\n    return out`,
      success: "FIFO: what goes in first comes out first.",
      mustDefine: ["serve_all"],
      tests: [
        { append: `print(serve_all([1, 2, 3, 4]))`, expect: "[1, 2, 3, 4]" },
        { append: `print(serve_all([]))`, expect: "[]" },
      ],
    },
    {
      title: "Reverse with a stack",
      tier: "core", uses: ["stack push/pop", "loop over string (L6)", "build a string"],
      prompt: `<p>Define <code>reverse(s)</code> that reverses a string by pushing every character onto a
        stack and popping them off. (Yes, <code>s[::-1]</code> is shorter — the point is the stack.)</p>`,
      solution: `def reverse(s):\n    stack = []\n    for ch in s:\n        stack.append(ch)\n    out = ""\n    while stack:\n        out += stack.pop()\n    return out`,
      success: "Popping a stack gives you everything back in reverse.",
      mustDefine: ["reverse"],
      tests: [
        { append: `print(reverse("stack"))`, expect: "kcats" },
        { append: `print(reverse(""))`, expect: "" },
      ],
      review: [{ pattern: "\\[::-1\\]", tip: `<code>s[::-1]</code> is the real answer — this exercise wanted the stack to build intuition.` }],
    },
    {
      title: "Balanced brackets",
      tier: "challenge", uses: ["stack", "dict lookup (L8)", "loop + if (L5, L6)", "early return (L10)"],
      prompt: `<p>Define <code>balanced(s)</code> returning <code>True</code> if every opening bracket in
        <code>s</code> (<code>(</code> <code>[</code> <code>{</code>) has a matching closer in the right
        order. Push openers; on a closer, the top of the stack must be its partner.</p>`,
      solution: `def balanced(s):\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        elif ch in ")]}":\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack`,
      success: "The stack remembers what still needs closing; it must be empty at the end.",
      mustDefine: ["balanced"],
      tests: [
        { append: `print(balanced("([]{})"), balanced("([)]"), balanced("((("), balanced(""))`, expect: "True False False True" },
        { append: `print(balanced("a(b)c[d]"), balanced("}"))`, expect: "True False" },
      ],
    },
    {
      title: "Evaluate postfix (RPN)",
      tier: "challenge", uses: ["stack", "int() (L9)", "if/elif (L5)", "loop (L6)"],
      prompt: `<p>Define <code>eval_rpn(tokens)</code>. Tokens are a list of strings: numbers, or one of
        <code>"+" "-" "*"</code>. Push numbers; on an operator, pop two, apply, push the result.
        Return the final number. <code>["3","4","+","2","*"]</code> &rarr; <code>14</code>.</p>`,
      solution: `def eval_rpn(tokens):\n    stack = []\n    for t in tokens:\n        if t == "+":\n            b = stack.pop(); a = stack.pop(); stack.append(a + b)\n        elif t == "-":\n            b = stack.pop(); a = stack.pop(); stack.append(a - b)\n        elif t == "*":\n            b = stack.pop(); a = stack.pop(); stack.append(a * b)\n        else:\n            stack.append(int(t))\n    return stack[0]`,
      success: "The second value popped is the left operand — order matters for -.",
      mustDefine: ["eval_rpn"],
      tests: [
        { append: `print(eval_rpn(["3", "4", "+", "2", "*"]))`, expect: "14" },
        { append: `print(eval_rpn(["10", "2", "-"]))`, expect: "8" },
        { append: `print(eval_rpn(["5"]))`, expect: "5" },
      ],
    },
    {
      title: "heap_push(heap, x)",
      tier: "challenge", uses: ["array-as-tree indices", "while + swap (L6)", "// (L3)"],
      prompt: `<p>Define <code>heap_push(heap, x)</code>: append <code>x</code>, then bubble it up — while
        it has a parent (<code>(i-1)//2</code>) that is <strong>larger</strong>, swap. Min-heap: keep
        <code>heap[0]</code> the smallest.</p>`,
      solution: `def heap_push(heap, x):\n    heap.append(x)\n    i = len(heap) - 1\n    while i > 0:\n        parent = (i - 1) // 2\n        if heap[parent] <= heap[i]:\n            break\n        heap[i], heap[parent] = heap[parent], heap[i]\n        i = parent`,
      success: "The new value rises until its parent is no bigger than it.",
      mustDefine: ["heap_push"],
      tests: [
        { append: `h = []\nfor x in [5, 3, 8, 1, 9, 2]:\n    heap_push(h, x)\nprint(h[0])`, expect: "1" },
        { append: `h = []\nfor x in [4, 4, 4]:\n    heap_push(h, x)\nprint(h)`, expect: "[4, 4, 4]" },
        { append: `h = []\nfor x in [10, 9, 8, 7]:\n    heap_push(h, x)\nprint(h[0], min(h) == h[0])`, expect: "7 True" },
      ],
    },
    {
      title: "heap_pop_min(heap)",
      tier: "challenge", uses: ["array-as-tree indices", "bubble down", "while + for over children"],
      prompt: `<p>Define <code>heap_pop_min(heap)</code> for a min-heap: return <code>None</code> if empty;
        otherwise save <code>heap[0]</code>, move the last element to the front, bubble it down (swap
        with the smaller child while a child is smaller), and return the saved value.</p>`,
      solution: `def heap_pop_min(heap):\n    if not heap:\n        return None\n    top = heap[0]\n    last = heap.pop()\n    if heap:\n        heap[0] = last\n        i, n = 0, len(heap)\n        while True:\n            small = i\n            for child in (2*i + 1, 2*i + 2):\n                if child < n and heap[child] < heap[small]:\n                    small = child\n            if small == i:\n                break\n            heap[i], heap[small] = heap[small], heap[i]\n            i = small\n    return top`,
      success: "Root out, last item in, sink it until both children are no smaller.",
      mustDefine: ["heap_pop_min"],
      tests: [
        { append: `def heap_push(heap, x):\n    heap.append(x); i = len(heap) - 1\n    while i > 0:\n        p = (i - 1) // 2\n        if heap[p] <= heap[i]: break\n        heap[i], heap[p] = heap[p], heap[i]; i = p\nh = []\nfor x in [5, 3, 8, 1, 9, 2, 7]:\n    heap_push(h, x)\nout = []\nwhile h:\n    out.append(heap_pop_min(h))\nprint(out)`, expect: "[1, 2, 3, 5, 7, 8, 9]" },
        { append: `print(heap_pop_min([]))`, expect: "None" },
        { append: `print(heap_pop_min([42]))`, expect: "42" },
      ],
    },
    {
      title: "heap_sort(nums)",
      tier: "boss", uses: ["your heap_push + heap_pop_min", "loop (L6)", "functions (L10)"],
      prompt: `<p>Define <code>heap_sort(nums)</code> returning a new ascending list: push every value into
        a fresh heap, then pop the min repeatedly. Assume <code>heap_push</code> and
        <code>heap_pop_min</code> are available.</p>`,
      solution: `def heap_sort(nums):\n    heap = []\n    for x in nums:\n        heap_push(heap, x)\n    out = []\n    while heap:\n        out.append(heap_pop_min(heap))\n    return out`,
      success: "Feed everything in, drain smallest-first — that's heapsort, O(n log n).",
      mustDefine: ["heap_sort"],
      tests: [
        { append: `def heap_push(heap, x):\n    heap.append(x); i = len(heap) - 1\n    while i > 0:\n        p = (i - 1) // 2\n        if heap[p] <= heap[i]: break\n        heap[i], heap[p] = heap[p], heap[i]; i = p\ndef heap_pop_min(heap):\n    if not heap: return None\n    top = heap[0]; last = heap.pop()\n    if heap:\n        heap[0] = last; i, n = 0, len(heap)\n        while True:\n            s = i\n            for c in (2*i+1, 2*i+2):\n                if c < n and heap[c] < heap[s]: s = c\n            if s == i: break\n            heap[i], heap[s] = heap[s], heap[i]; i = s\n    return top\nprint(heap_sort([5, 2, 9, 1, 5, 6]))`, expect: "[1, 2, 5, 5, 6, 9]" },
        { append: `def heap_push(heap, x):\n    heap.append(x); i = len(heap) - 1\n    while i > 0:\n        p = (i - 1) // 2\n        if heap[p] <= heap[i]: break\n        heap[i], heap[p] = heap[p], heap[i]; i = p\ndef heap_pop_min(heap):\n    if not heap: return None\n    top = heap[0]; last = heap.pop()\n    if heap:\n        heap[0] = last; i, n = 0, len(heap)\n        while True:\n            s = i\n            for c in (2*i+1, 2*i+2):\n                if c < n and heap[c] < heap[s]: s = c\n            if s == i: break\n            heap[i], heap[s] = heap[s], heap[i]; i = s\n    return top\nprint(heap_sort([]))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 16 */
{
  id: "binary-search-tree",
  section: "Data Structures & Algorithms",
  title: "Binary Search Tree",
  summary: "A tree that keeps values ordered so search, insert, min and max each take one path from root to leaf.",
  lead: "Take the halving idea behind binary search and freeze it into a structure. Every node splits the remaining values into 'smaller — go left' and 'larger — go right'.",
  spiral: ["dict nodes with pointers (L13)", "while loops (L6)", "comparisons < == > (L3)", "if / elif (L5)", "stack for traversal (L15)", "functions & return (L10)", "None (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The ordering rule</h2>
      <p>A node holds a value and two child pointers, <code>"left"</code> and <code>"right"</code>.
      The <strong>BST property</strong>: <em>every</em> value in the left subtree is smaller than the
      node, and <em>every</em> value in the right subtree is larger. That rule, held everywhere, is
      what makes lookup fast.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a binary search tree">
        <g font-family="monospace" font-size="14">
          <circle cx="300" cy="30" r="20" fill="var(--accent)" stroke="var(--box-line)"/><text x="300" y="35" text-anchor="middle" fill="#fff">8</text>
          <circle cx="200" cy="95" r="20" fill="var(--box)" stroke="var(--box-line)"/><text x="200" y="100" text-anchor="middle" fill="var(--ink)">3</text>
          <circle cx="400" cy="95" r="20" fill="var(--box)" stroke="var(--box-line)"/><text x="400" y="100" text-anchor="middle" fill="var(--ink)">10</text>
          <circle cx="140" cy="165" r="20" fill="var(--box)" stroke="var(--box-line)"/><text x="140" y="170" text-anchor="middle" fill="var(--ink)">1</text>
          <circle cx="255" cy="165" r="20" fill="var(--box)" stroke="var(--box-line)"/><text x="255" y="170" text-anchor="middle" fill="var(--ink)">6</text>
          <circle cx="450" cy="165" r="20" fill="var(--box)" stroke="var(--box-line)"/><text x="450" y="170" text-anchor="middle" fill="var(--ink)">14</text>
        </g>
        <line x1="286" y1="44" x2="214" y2="81" stroke="var(--ink-soft)"/><line x1="314" y1="44" x2="386" y2="81" stroke="var(--ink-soft)"/>
        <line x1="188" y1="111" x2="152" y2="149" stroke="var(--ink-soft)"/><line x1="212" y1="111" x2="243" y2="149" stroke="var(--ink-soft)"/>
        <line x1="410" y1="111" x2="440" y2="149" stroke="var(--ink-soft)"/>
        <text x="130" y="205" font-size="11" fill="var(--ink-soft)">everything left of 8 is &lt; 8; everything right is &gt; 8 — and the same holds at every node</text>
      </svg>`, `Search for 6: 6 < 8 go left, 6 > 3 go right, found. Three steps for six values; ~log n for a million.`)}
      <p>We'll use the same dict-node trick as linked lists:
      <code>{"val": v, "left": None, "right": None}</code>.</p>` },

    { type: "html", html: `
      <h2>2 · Search — walk one path down</h2>
      <p>Start at the root. If <code>target</code> equals the node, done. If it's smaller, go
      <code>left</code>; if larger, go <code>right</code>. Fall off the bottom (<code>None</code>) and
      it isn't there. No backtracking — one straight path.</p>` },
    { type: "code", title: "Iterative search", code: `def bst_search(root, target):
    node = root
    while node is not None:
        if target == node["val"]:
            return True
        if target < node["val"]:
            node = node["left"]
        else:
            node = node["right"]
    return False

root = {"val": 8,
        "left":  {"val": 3, "left": {"val": 1, "left": None, "right": None},
                             "right": {"val": 6, "left": None, "right": None}},
        "right": {"val": 10, "left": None, "right": None}}
print(bst_search(root, 6), bst_search(root, 7))` },

    { type: "html", html: `
      <h2>3 · Insert — search, then attach</h2>
      <p>Walk down exactly like a search. When the direction you want is <code>None</code>, that's
      where the new node hangs.</p>` },
    { type: "code", title: "Iterative insert", code: `def bst_insert(root, val):
    new = {"val": val, "left": None, "right": None}
    if root is None:
        return new
    node = root
    while True:
        if val < node["val"]:
            if node["left"] is None:
                node["left"] = new
                return root
            node = node["left"]
        else:
            if node["right"] is None:
                node["right"] = new
                return root
            node = node["right"]

root = None
for v in [8, 3, 10, 1, 6, 14]:
    root = bst_insert(root, v)
print(root["val"], root["left"]["val"], root["right"]["val"])` },

    { type: "html", html: `
      <h2>4 · Min, max, and sorted order</h2>
      <p>The <strong>smallest</strong> value is as far <code>left</code> as you can go; the
      <strong>largest</strong> is as far <code>right</code>. And an <strong>in-order</strong> walk —
      left subtree, then node, then right subtree — visits values in <em>sorted order</em>. Here it is
      iteratively, with an explicit stack (Lesson 15). Next lesson, recursion makes it three lines.</p>` },
    { type: "code", title: "In-order traversal with a stack", code: `def in_order(root):
    out = []
    stack = []
    node = root
    while stack or node is not None:
        while node is not None:      # dive left, remembering the way back
            stack.append(node)
            node = node["left"]
        node = stack.pop()           # deepest unvisited node
        out.append(node["val"])
        node = node["right"]         # then its right subtree
    return out

root = None
for v in [8, 3, 10, 1, 6, 14, 4]:
    root = bst_insert(root, v)
print(in_order(root))` },
    { type: "html", html: whatif([
      "you insert values <em>already sorted</em> — <code>1, 2, 3, 4, 5</code>. What shape is the tree? How fast is search now?",
      "you search for a value smaller than everything in the tree — how many steps before you hit <code>None</code>?",
      "two nodes have the same value — where does the second one go with the insert rule above?",
      "the tree is one node — what do <code>bst_min</code> and <code>bst_max</code> both return?",
    ]) },
    { type: "html", html: `
      <div class="warn"><b>Balance is everything</b>
      A BST is O(log n) <em>only if it stays bushy</em>. Feed it sorted data and it degenerates into a
      linked list — O(n). Real libraries use self-balancing trees (AVL, red-black) that rotate nodes to
      stay short. The idea is the same; the bookkeeping is more.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Node: <code>{"val", "left", "right"}</code>. BST rule: left subtree &lt; node &lt; right subtree, everywhere.</li>
        <li>Search / insert: one path from root down, choosing left/right by comparison — O(height).</li>
        <li>Min = leftmost, max = rightmost.</li>
        <li>In-order traversal (left, node, right) yields <strong>sorted</strong> values.</li>
        <li>Height is O(log n) only when balanced; sorted inserts make it O(n).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Wikipedia — Binary search tree", url: "https://en.wikipedia.org/wiki/Binary_search_tree" },
    { label: "CS50 — Data Structures (trees)", url: "https://cs50.harvard.edu/x/notes/5/" },
    { label: "Python docs — bisect (arrays kept sorted)", url: "https://docs.python.org/3/library/bisect.html" },
  ],
  exercises: [
    {
      title: "Build three nodes",
      tier: "warm", uses: ["dict nodes (L13)"],
      prompt: `<p>By hand, build this tiny BST — root <code>5</code>, left child <code>2</code>, right child
        <code>9</code> — as nested dicts in a variable <code>root</code>. Print
        <code>root["val"] root["left"]["val"] root["right"]["val"]</code>.</p><pre>5 2 9</pre>`,
      solution: `root = {"val": 5, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 9, "left": None, "right": None}}\nprint(root["val"], root["left"]["val"], root["right"]["val"])`,
      success: "Every node has exactly the three keys, leaves included.",
      tests: [{ expect: "5 2 9" }],
    },
    {
      title: "Which way?",
      tier: "warm", uses: ["comparisons (L3)", "dict access (L8)"],
      prompt: `<p>Given the starter <code>root</code> and <code>target = 7</code>, print <code>left</code>
        or <code>right</code> — the direction you'd step from the root to look for <code>target</code>.</p>
        <pre>right</pre>`,
      starter: `root = {"val": 5, "left": None, "right": None}\ntarget = 7\n`,
      solution: `root = {"val": 5, "left": None, "right": None}\ntarget = 7\nif target < root["val"]:\n    print("left")\nelse:\n    print("right")`,
      success: "Smaller → left, bigger → right. That single comparison is the whole search step.",
      tests: [
        { expect: "right" },
        { advisory: true, rewrite: [["^target\\s*=\\s*\\d+\\s*$", "target = 2"]], expect: "left", why: `2 is smaller than 5 → left.` },
      ],
    },
    {
      title: "bst_search(root, target)",
      tier: "core", uses: ["while loop (L6)", "if/elif (L5)", "walk left/right"],
      prompt: `<p>Define <code>bst_search(root, target)</code> returning <code>True</code>/<code>False</code>,
        iteratively (no recursion yet).</p>`,
      solution: `def bst_search(root, target):\n    node = root\n    while node is not None:\n        if target == node["val"]:\n            return True\n        if target < node["val"]:\n            node = node["left"]\n        else:\n            node = node["right"]\n    return False`,
      success: "One path down; fall off the bottom and it's absent.",
      mustDefine: ["bst_search"],
      tests: [
        { append: `r = {"val": 8, "left": {"val": 3, "left": {"val": 1, "left": None, "right": None}, "right": {"val": 6, "left": None, "right": None}}, "right": {"val": 10, "left": None, "right": None}}\nprint(bst_search(r, 6), bst_search(r, 1), bst_search(r, 7), bst_search(r, 8))`, expect: "True True False True" },
        { append: `print(bst_search(None, 5))`, expect: "False" },
      ],
    },
    {
      title: "bst_insert(root, val)",
      tier: "core", uses: ["while loop", "if/elif", "create a node", "return root"],
      prompt: `<p>Define <code>bst_insert(root, val)</code> that inserts a new node and returns the (possibly
        new) root. Values equal or greater go right.</p>`,
      solution: `def bst_insert(root, val):\n    new = {"val": val, "left": None, "right": None}\n    if root is None:\n        return new\n    node = root\n    while True:\n        if val < node["val"]:\n            if node["left"] is None:\n                node["left"] = new\n                return root\n            node = node["left"]\n        else:\n            if node["right"] is None:\n                node["right"] = new\n                return root\n            node = node["right"]`,
      success: "Walk like a search; attach where the branch is None.",
      mustDefine: ["bst_insert"],
      tests: [
        { append: `r = None\nfor v in [8, 3, 10, 1, 6, 14]:\n    r = bst_insert(r, v)\nprint(r["val"], r["left"]["val"], r["right"]["val"], r["left"]["right"]["val"])`, expect: "8 3 10 6" },
        { append: `r = bst_insert(None, 42)\nprint(r["val"], r["left"], r["right"])`, expect: "42 None None" },
      ],
    },
    {
      title: "bst_min(root) & bst_max(root)",
      tier: "core", uses: ["while walking one direction", "functions (L10)"],
      prompt: `<p>Define <code>bst_min(root)</code> (walk <code>left</code> to the end) and
        <code>bst_max(root)</code> (walk <code>right</code>). Return the value, or <code>None</code>
        for an empty tree.</p>`,
      solution: `def bst_min(root):\n    if root is None:\n        return None\n    node = root\n    while node["left"] is not None:\n        node = node["left"]\n    return node["val"]\n\ndef bst_max(root):\n    if root is None:\n        return None\n    node = root\n    while node["right"] is not None:\n        node = node["right"]\n    return node["val"]`,
      success: "Extremes live at the ends of the leftmost / rightmost path.",
      mustDefine: ["bst_min", "bst_max"],
      tests: [
        { append: `def ins(root, v):\n    n = {"val": v, "left": None, "right": None}\n    if root is None: return n\n    cur = root\n    while True:\n        if v < cur["val"]:\n            if cur["left"] is None: cur["left"] = n; return root\n            cur = cur["left"]\n        else:\n            if cur["right"] is None: cur["right"] = n; return root\n            cur = cur["right"]\nr = None\nfor v in [8, 3, 10, 1, 6, 14]:\n    r = ins(r, v)\nprint(bst_min(r), bst_max(r))`, expect: "1 14" },
        { append: `print(bst_min(None), bst_max(None))`, expect: "None None" },
      ],
    },
    {
      title: "in_order(root)",
      tier: "challenge", uses: ["explicit stack (L15)", "while loop", "build a list (L7)"],
      prompt: `<p>Define <code>in_order(root)</code> returning a list of all values in <strong>sorted</strong>
        order, using an explicit stack (left, node, right). No recursion yet.</p>`,
      solution: `def in_order(root):\n    out = []\n    stack = []\n    node = root\n    while stack or node is not None:\n        while node is not None:\n            stack.append(node)\n            node = node["left"]\n        node = stack.pop()\n        out.append(node["val"])\n        node = node["right"]\n    return out`,
      success: "Dive left pushing as you go; pop, record, then turn right.",
      mustDefine: ["in_order"],
      tests: [
        { append: `def ins(root, v):\n    n = {"val": v, "left": None, "right": None}\n    if root is None: return n\n    cur = root\n    while True:\n        if v < cur["val"]:\n            if cur["left"] is None: cur["left"] = n; return root\n            cur = cur["left"]\n        else:\n            if cur["right"] is None: cur["right"] = n; return root\n            cur = cur["right"]\nr = None\nfor v in [8, 3, 10, 1, 6, 14, 4, 7, 13]:\n    r = ins(r, v)\nprint(in_order(r))`, expect: "[1, 3, 4, 6, 7, 8, 10, 13, 14]" },
        { append: `print(in_order(None))`, expect: "[]" },
      ],
    },
    {
      title: "is_bst(root)",
      tier: "challenge", uses: ["in_order", "loop + comparison (L6, L3)", "early return"],
      prompt: `<p>Define <code>is_bst(root)</code> returning <code>True</code> if the tree obeys the BST
        rule. Easiest check: an in-order traversal must come out <strong>strictly ascending</strong>.
        (Assume <code>in_order</code> from the previous exercise is available; a copy is included when
        we test.)</p>`,
      solution: `def is_bst(root):\n    vals = in_order(root)\n    for i in range(1, len(vals)):\n        if vals[i] <= vals[i - 1]:\n            return False\n    return True`,
      success: "In-order sorted ⇔ valid BST. Reuse, don't re-derive.",
      mustDefine: ["is_bst"],
      tests: [
        { append: `def in_order(root):\n    out, st, node = [], [], root\n    while st or node is not None:\n        while node is not None:\n            st.append(node); node = node["left"]\n        node = st.pop(); out.append(node["val"]); node = node["right"]\n    return out\ngood = {"val": 5, "left": {"val": 3, "left": None, "right": None}, "right": {"val": 8, "left": None, "right": None}}\nbad  = {"val": 5, "left": {"val": 3, "left": None, "right": None}, "right": {"val": 4, "left": None, "right": None}}\nprint(is_bst(good), is_bst(bad), is_bst(None))`, expect: "True False True" },
      ],
    },
    {
      title: "range_sum(root, lo, hi)",
      tier: "boss", uses: ["stack traversal (L15)", "BST pruning", "if + comparison (L5, L3)", "accumulator (L6)"],
      prompt: `<p>Define <code>range_sum(root, lo, hi)</code> — the sum of every value <code>v</code> with
        <code>lo &le; v &le; hi</code>. Use the BST rule to <strong>prune</strong>: don't descend
        <code>left</code> when the node is already <code>&le; lo</code>, don't descend <code>right</code>
        when it's <code>&ge; hi</code>.</p>`,
      solution: `def range_sum(root, lo, hi):\n    total = 0\n    stack = [root]\n    while stack:\n        node = stack.pop()\n        if node is None:\n            continue\n        if lo <= node["val"] <= hi:\n            total += node["val"]\n        if node["val"] > lo:\n            stack.append(node["left"])\n        if node["val"] < hi:\n            stack.append(node["right"])\n    return total`,
      success: "The ordering lets you skip whole subtrees that can't contain an in-range value.",
      mustDefine: ["range_sum"],
      tests: [
        { append: `def ins(root, v):\n    n = {"val": v, "left": None, "right": None}\n    if root is None: return n\n    cur = root\n    while True:\n        if v < cur["val"]:\n            if cur["left"] is None: cur["left"] = n; return root\n            cur = cur["left"]\n        else:\n            if cur["right"] is None: cur["right"] = n; return root\n            cur = cur["right"]\nr = None\nfor v in [10, 5, 15, 3, 7, 13, 18, 1]:\n    r = ins(r, v)\nprint(range_sum(r, 7, 15))`, expect: "45" },
        { append: `print(range_sum(None, 0, 100))`, expect: "0" },
      ],
    },
  ],
},

/* ========================================================== 17 */
{
  id: "recursion",
  section: "Data Structures & Algorithms",
  title: "Recursion",
  summary: "A function that solves a problem by calling itself on a smaller piece — a base case to stop, a recursive case to shrink.",
  lead: "Some problems are self-similar: a tree is a node with two smaller trees; a list is a head plus a smaller list. Recursion lets your code mirror that shape exactly.",
  spiral: ["functions & return (L10)", "if / else for the base case (L5)", "the call stack (L15)", "lists & slicing (L4, L7)", "dict for memoisation (L8, L14)", "BST nodes left/right (L16)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Two parts, always</h2>
      <p>A recursive function has:</p>
      <ul>
        <li>a <strong>base case</strong> — a version so small you answer it directly, no more calls;</li>
        <li>a <strong>recursive case</strong> — call yourself on something <em>smaller</em>, then combine
        that answer with the current step.</li>
      </ul>
      <p>Miss the base case (or never reach it) and the calls never stop —
      Python bails out with <code>RecursionError</code> after ~1000 nested calls.</p>` },
    { type: "code", title: "The classic: factorial", code: `def factorial(n):
    if n <= 1:            # base case
        return 1
    return n * factorial(n - 1)   # recursive case: smaller n

print(factorial(5))` },
    { type: "html", html: `
      ${fig(`
      <svg class="ill" viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="factorial call stack building and unwinding">
        <g font-family="monospace" font-size="12">
          <rect x="40" y="20" width="220" height="26" fill="var(--box)" stroke="var(--box-line)"/><text x="50" y="38" fill="var(--ink)">factorial(3) = 3 * factorial(2)</text>
          <rect x="60" y="52" width="220" height="26" fill="var(--box)" stroke="var(--box-line)"/><text x="70" y="70" fill="var(--ink)">factorial(2) = 2 * factorial(1)</text>
          <rect x="80" y="84" width="220" height="26" fill="var(--accent)" stroke="var(--box-line)"/><text x="90" y="102" fill="#fff">factorial(1) = 1   (base case)</text>
        </g>
        <text x="330" y="40" font-size="11" fill="var(--ink-soft)">calls pile up (pushed on the call stack)</text>
        <g font-family="monospace" font-size="12">
          <text x="80" y="150" fill="var(--ink-soft)">&rarr; returns 1</text>
          <text x="60" y="172" fill="var(--ink-soft)">&rarr; 2 * 1 = 2</text>
          <text x="40" y="194" fill="var(--ink-soft)">&rarr; 3 * 2 = 6</text>
        </g>
        <text x="330" y="172" font-size="11" fill="var(--ink-soft)">then they unwind, each multiplying on the way out</text>
      </svg>`, `Every call waits, holding its "n", until the one below it returns. The call stack from Lesson 15 — Python's own.`)}
      <div class="predict"><b>Predict first</b>How many times is <code>factorial</code> called for
      <code>factorial(4)</code>? What's the deepest the stack gets?</div>` },

    { type: "html", html: `
      <h2>2 · Recursion on a list</h2>
      <p>A list is <em>the first item</em> plus <em>a smaller list</em>. So "sum a list" is
      "first item + sum of the rest".</p>` },
    { type: "code", title: "Sum by shrinking", code: `def sum_list(nums):
    if not nums:              # base case: empty list
        return 0
    return nums[0] + sum_list(nums[1:])   # first + sum of the rest

print(sum_list([4, 8, 15, 16, 23, 42]))` },
    { type: "html", html: whatif([
      "you remove the <code>if not nums:</code> base case — what error, and roughly after how many calls?",
      "the base case is <code>if len(nums) == 5:</code> instead — does it ever trigger for a 3-item list?",
      "the list has a million items — is deep recursion a good fit here, or would a loop be safer?",
    ]) },

    { type: "html", html: `
      <h2>3 · Where recursion truly shines: trees</h2>
      <p>A binary tree <em>is</em> a node with a smaller left tree and a smaller right tree. The
      iterative traversals from Lesson 16 needed an explicit stack. Recursively they're almost the
      definition read aloud:</p>` },
    { type: "code", title: "Tree traversal, three lines", code: `def in_order(node):
    if node is None:                 # base case: empty subtree
        return []
    return in_order(node["left"]) + [node["val"]] + in_order(node["right"])

def tree_sum(node):
    if node is None:
        return 0
    return node["val"] + tree_sum(node["left"]) + tree_sum(node["right"])

root = {"val": 8,
        "left":  {"val": 3, "left": {"val": 1, "left": None, "right": None},
                             "right": {"val": 6, "left": None, "right": None}},
        "right": {"val": 10, "left": None, "right": None}}
print(in_order(root))
print(tree_sum(root))` },

    { type: "html", html: `
      <h2>4 · When recursion is slow — and the fix</h2>
      <p>Naive Fibonacci recomputes the same values a mind-boggling number of times —
      <code>fib(n)</code> makes about <code>2ⁿ</code> calls. <strong>Memoisation</strong>: cache each
      answer in a dict (Lesson 8) so it's computed once. That drops it to O(n).</p>` },
    { type: "code", title: "Slow, then fast", code: `def fib_slow(n):
    if n < 2:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

def fib_fast(n, memo=None):
    if memo is None:
        memo = {}
    if n < 2:
        return n
    if n not in memo:
        memo[n] = fib_fast(n - 1, memo) + fib_fast(n - 2, memo)
    return memo[n]

print(fib_slow(20))
print(fib_fast(60))     # try fib_slow(60) and you'll be waiting a long time` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Base case stops; recursive case calls itself on something <strong>smaller</strong>, then combines.</li>
        <li>Each call sits on the call stack until the calls below it return — depth is limited (~1000).</li>
        <li>Self-similar data (trees, nested lists, linked lists) maps directly onto recursion.</li>
        <li>Repeated subproblems? Cache them in a dict — <strong>memoisation</strong> — to avoid re-computing.</li>
        <li>A loop is often fine too; use recursion when it makes the code match the structure.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Defining Functions (recursion follows naturally)", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
    { label: "Real Python — Recursion in Python", url: "https://realpython.com/python-recursion/" },
    { label: "CS50x — Algorithms (recursion)", url: "https://cs50.harvard.edu/x/notes/3/" },
  ],
  exercises: [
    {
      title: "Countdown",
      tier: "warm", uses: ["base case + recursive call", "print (L1)"],
      prompt: `<p>Define <code>countdown(n)</code> that prints <code>n, n-1, … 1</code> one per line, then
        <code>go</code> — using recursion, no loop.</p>`,
      solution: `def countdown(n):\n    if n <= 0:\n        print("go")\n        return\n    print(n)\n    countdown(n - 1)`,
      success: "Print, then hand the smaller problem to yourself.",
      mustDefine: ["countdown"],
      forbid: [{ pattern: "\\bfor\\b|\\bwhile\\b", tip: `A loop works — this one is for practising recursion.` }],
      tests: [
        { append: `countdown(3)`, expect: "3\n2\n1\ngo" },
        { append: `countdown(0)`, expect: "go" },
      ],
    },
    {
      title: "factorial(n)",
      tier: "warm", uses: ["base case", "multiply on the way out"],
      prompt: `<p>Define <code>factorial(n)</code> recursively. <code>factorial(0)</code> and
        <code>factorial(1)</code> are <code>1</code>.</p>`,
      solution: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)`,
      success: "n! = n × (n-1)!",
      mustDefine: ["factorial"],
      tests: [
        { append: `print(factorial(5), factorial(0), factorial(1))`, expect: "120 1 1" },
      ],
    },
    {
      title: "sum_list(nums)",
      tier: "core", uses: ["slicing nums[1:] (L4)", "empty-list base case"],
      prompt: `<p>Define <code>sum_list(nums)</code> recursively: first element plus the sum of the rest.
        Empty list &rarr; <code>0</code>.</p>`,
      solution: `def sum_list(nums):\n    if not nums:\n        return 0\n    return nums[0] + sum_list(nums[1:])`,
      success: "nums[1:] is 'the rest' — one item smaller each call.",
      mustDefine: ["sum_list"],
      forbid: [{ pattern: "\\bfor\\b|\\bwhile\\b|sum\\(", tip: `<code>sum(nums)</code> is the real answer — recurse here for the practice.` }],
      tests: [
        { append: `print(sum_list([4, 8, 15, 16, 23, 42]))`, expect: "108" },
        { append: `print(sum_list([]))`, expect: "0" },
      ],
    },
    {
      title: "power(base, exp)",
      tier: "core", uses: ["base case exp == 0", "multiply down"],
      prompt: `<p>Define <code>power(base, exp)</code> for a non-negative integer <code>exp</code>, recursively
        (no <code>**</code>). <code>power(b, 0)</code> is <code>1</code>.</p>`,
      solution: `def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)`,
      success: "b^e = b × b^(e-1).",
      mustDefine: ["power"],
      forbid: [{ pattern: "\\*\\*|pow\\(", tip: `<code>base ** exp</code> is the real answer — this practises recursion.` }],
      tests: [
        { append: `print(power(2, 10), power(5, 0), power(7, 1))`, expect: "1024 1 7" },
      ],
    },
    {
      title: "reverse(s)",
      tier: "core", uses: ["slicing (L4)", "string base case"],
      prompt: `<p>Define <code>reverse(s)</code> recursively: the reverse of a string is
        <em>reverse(everything after the first char) + first char</em>. Empty &rarr; empty.</p>`,
      solution: `def reverse(s):\n    if s == "":\n        return ""\n    return reverse(s[1:]) + s[0]`,
      success: "Peel off the front, reverse the rest, stick the front on the end.",
      mustDefine: ["reverse"],
      forbid: [{ pattern: "\\[::-1\\]|\\bfor\\b|\\bwhile\\b", tip: `<code>s[::-1]</code> is the real answer — recursion practice here.` }],
      tests: [
        { append: `print(reverse("recursion"))`, expect: "noisrucer" },
        { append: `print(reverse(""))`, expect: "" },
      ],
    },
    {
      title: "list_length(head)",
      tier: "core", uses: ["linked-list nodes (L13)", "None base case"],
      prompt: `<p>Define <code>list_length(head)</code> for a linked list of
        <code>{"val", "next"}</code> nodes, recursively: <code>0</code> if <code>head is None</code>,
        otherwise <code>1 + list_length(head["next"])</code>.</p>`,
      solution: `def list_length(head):\n    if head is None:\n        return 0\n    return 1 + list_length(head["next"])`,
      success: "The list's length is 1 plus the tail's length.",
      mustDefine: ["list_length"],
      tests: [
        { append: `print(list_length({"val": 1, "next": {"val": 2, "next": {"val": 3, "next": None}}}))`, expect: "3" },
        { append: `print(list_length(None))`, expect: "0" },
      ],
    },
    {
      title: "tree_height(root)",
      tier: "challenge", uses: ["BST nodes (L16)", "max (built-in)", "None base case"],
      prompt: `<p>Define <code>tree_height(root)</code>: <code>0</code> for an empty tree, otherwise
        <code>1 + max(height of left, height of right)</code>.</p>`,
      solution: `def tree_height(root):\n    if root is None:\n        return 0\n    return 1 + max(tree_height(root["left"]), tree_height(root["right"]))`,
      success: "A tree's height is one more than its taller subtree.",
      mustDefine: ["tree_height"],
      tests: [
        { append: `r = {"val": 8, "left": {"val": 3, "left": {"val": 1, "left": None, "right": None}, "right": None}, "right": {"val": 10, "left": None, "right": None}}\nprint(tree_height(r))`, expect: "3" },
        { append: `print(tree_height(None), tree_height({"val": 1, "left": None, "right": None}))`, expect: "0 1" },
      ],
    },
    {
      title: "in_order(root)",
      tier: "challenge", uses: ["BST nodes (L16)", "list concatenation (L7)", "compare to L16's stack version"],
      prompt: `<p>Define <code>in_order(root)</code> returning the sorted list of values — recursively this
        time: <code>in_order(left) + [val] + in_order(right)</code>. Empty &rarr; <code>[]</code>.</p>`,
      solution: `def in_order(root):\n    if root is None:\n        return []\n    return in_order(root["left"]) + [root["val"]] + in_order(root["right"])`,
      success: "Three lines vs the stack machinery — recursion matches the tree's shape.",
      mustDefine: ["in_order"],
      forbid: [{ pattern: "\\bwhile\\b|\\bstack\\b", tip: `You built the iterative version in Lesson 16 — this one's about the recursive elegance.` }],
      tests: [
        { append: `def ins(root, v):\n    n = {"val": v, "left": None, "right": None}\n    if root is None: return n\n    c = root\n    while True:\n        if v < c["val"]:\n            if c["left"] is None: c["left"] = n; return root\n            c = c["left"]\n        else:\n            if c["right"] is None: c["right"] = n; return root\n            c = c["right"]\nr = None\nfor v in [8, 3, 10, 1, 6, 14, 4]:\n    r = ins(r, v)\nprint(in_order(r))`, expect: "[1, 3, 4, 6, 8, 10, 14]" },
        { append: `print(in_order(None))`, expect: "[]" },
      ],
    },
    {
      title: "fib(n) — memoised",
      tier: "challenge", uses: ["recursion", "dict cache (L8, L14)", "default parameter (L10)"],
      prompt: `<p>Define <code>fib(n)</code> — the nth Fibonacci number (<code>fib(0)=0</code>,
        <code>fib(1)=1</code>) — using a dict to <strong>memoise</strong> so <code>fib(50)</code> is
        instant. Signature: <code>def fib(n, memo=None):</code>.</p>`,
      solution: `def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n < 2:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]`,
      success: "Cache before you recurse deeper — each fib(k) is computed once.",
      mustDefine: ["fib"],
      tests: [
        { append: `print(fib(10), fib(20), fib(50))`, expect: "55 6765 12586269025" },
        { append: `print(fib(0), fib(1), fib(2))`, expect: "0 1 1" },
      ],
    },
    {
      title: "flatten(items)",
      tier: "boss", uses: ["recursion on nested structure", "type(x) is list (L2)", "build a list (L7)", "loop (L6)"],
      prompt: `<p>Define <code>flatten(items)</code>: given a list that may contain other lists (nested to
        any depth), return a single flat list of all the non-list values, left to right.
        <code>flatten([1, [2, [3, 4]], 5])</code> &rarr; <code>[1, 2, 3, 4, 5]</code>. Use
        <code>type(x) is list</code> to test each element.</p>`,
      solution: `def flatten(items):\n    out = []\n    for x in items:\n        if type(x) is list:\n            out += flatten(x)\n        else:\n            out.append(x)\n    return out`,
      success: "A list element that is itself a list → recurse into it and splice the result in.",
      mustDefine: ["flatten"],
      tests: [
        { append: `print(flatten([1, [2, [3, 4]], 5]))`, expect: "[1, 2, 3, 4, 5]" },
        { append: `print(flatten([[[[7]]]]))`, expect: "[7]" },
        { append: `print(flatten([]))`, expect: "[]" },
        { append: `print(flatten([1, [], [2, [], [3]]]))`, expect: "[1, 2, 3]" },
      ],
    },
  ],
},

/* ========================================================== 18 */
{
  id: "sorting-algorithms",
  section: "Data Structures & Algorithms",
  title: "Sorting Algorithms",
  summary: "Five ways to put a list in order — the O(n²) trio (bubble, selection, insertion) and the O(n log n) pair (merge, quick).",
  lead: "Sorting is the classic lens on algorithm design: same result, wildly different speed. Build them by hand and you'll feel why n log n beats n squared.",
  spiral: ["loops & nested loops (L6)", "list indexing & swap (L7)", "comparisons (L3)", "functions & return (L10)", "recursion: split / combine (L17)", "the 'best so far' scan (L6)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Vocabulary</h2>
      <ul>
        <li><strong>In-place</strong>: rearranges the given list using O(1) extra memory (bubble,
        selection, insertion, quick). <strong>Out-of-place</strong>: builds a new list (merge).</li>
        <li><strong>Stable</strong>: equal items keep their original relative order (merge, insertion;
        <em>not</em> selection or plain quick).</li>
        <li>Any sort that only <em>compares</em> pairs needs at least about <strong>n log n</strong>
        comparisons in the worst case — you can't beat that by being clever with comparisons alone.</li>
      </ul>` },

    { type: "html", html: `
      <h2>2 · Bubble sort — O(n²)</h2>
      <p>Walk the list comparing each pair of neighbours; swap them if they're out of order. After one
      full pass the largest value has "bubbled" to the end. Repeat for the rest.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="one bubble-sort pass">
        <g font-family="monospace" font-size="13">
          <text x="20" y="30" fill="var(--ink-soft)">start</text>
          <text x="90" y="30" fill="var(--ink)">5  1  4  2  8</text>
          <text x="20" y="58" fill="var(--ink-soft)">swap 5,1</text>
          <text x="90" y="58" fill="var(--ink)">1  5  4  2  8</text>
          <text x="20" y="86" fill="var(--ink-soft)">swap 5,4</text>
          <text x="90" y="86" fill="var(--ink)">1  4  5  2  8</text>
          <text x="20" y="114" fill="var(--ink-soft)">swap 5,2</text>
          <text x="90" y="114" fill="var(--ink)">1  4  2  5  8</text>
          <text x="20" y="142" fill="var(--accent)">end of pass 1 — 8 is parked at the end</text>
        </g>
      </svg>`, `n passes, each up to n comparisons → about n² work. Simple, and slow.`)}
    ` },
    { type: "code", title: "bubble sort", code: `def bubble_sort(nums):
    a = nums[:]                       # work on a copy
    n = len(a)
    for i in range(n):
        for j in range(n - 1 - i):   # last i items are already parked
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a

print(bubble_sort([5, 1, 4, 2, 8]))` },

    { type: "html", html: `
      <h2>3 · Selection sort — O(n²)</h2>
      <p>Scan the unsorted part for its smallest item (the "best so far" loop from Lesson 6), then
      swap that into the first unsorted slot. Fewer swaps than bubble, same comparison count.</p>` },
    { type: "code", title: "selection sort", code: `def selection_sort(nums):
    a = nums[:]
    n = len(a)
    for i in range(n):
        smallest = i
        for j in range(i + 1, n):
            if a[j] < a[smallest]:
                smallest = j
        a[i], a[smallest] = a[smallest], a[i]
    return a

print(selection_sort([5, 1, 4, 2, 8]))` },

    { type: "html", html: `
      <h2>4 · Insertion sort — O(n²), but great when nearly sorted</h2>
      <p>Grow a sorted region on the left. Take the next item and slide it leftwards past everything
      bigger, then drop it in. On an <em>almost-sorted</em> list each item barely moves — close to
      O(n). This is why Python's real sort uses it for small runs.</p>` },
    { type: "code", title: "insertion sort", code: `def insertion_sort(nums):
    a = nums[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]          # shift bigger items right
            j -= 1
        a[j + 1] = key              # drop key into the gap
    return a

print(insertion_sort([5, 1, 4, 2, 8]))` },
    { type: "html", html: whatif([
      "the input is <em>already sorted</em> — how much work does insertion sort do? And bubble sort?",
      "the input is sorted <em>backwards</em> — which of the three is worst?",
      "you sort a list of 10 items vs 10,000 — O(n²) means the second takes about how many times longer?",
    ]) },

    { type: "html", html: `
      <h2>5 · Merge sort — O(n log n), stable</h2>
      <p>Pure recursion (Lesson 17): <strong>split</strong> the list in half, sort each half, then
      <strong>merge</strong> the two sorted halves by repeatedly taking the smaller front item. The
      splitting is log n deep; each level does n work.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="merge sort split and merge">
        <g font-family="monospace" font-size="12" fill="var(--ink)">
          <text x="230" y="20">[5, 1, 4, 2]</text>
          <text x="120" y="60">[5, 1]</text><text x="360" y="60">[4, 2]</text>
          <text x="70" y="100">[5]</text><text x="170" y="100">[1]</text>
          <text x="320" y="100">[4]</text><text x="420" y="100">[2]</text>
        </g>
        <g stroke="var(--ink-soft)">
          <line x1="255" y1="26" x2="140" y2="48"/><line x1="290" y1="26" x2="380" y2="48"/>
          <line x1="135" y1="66" x2="80" y2="88"/><line x1="150" y1="66" x2="180" y2="88"/>
          <line x1="375" y1="66" x2="330" y2="88"/><line x1="390" y1="66" x2="430" y2="88"/>
        </g>
        <g font-family="monospace" font-size="12" fill="var(--accent)">
          <text x="110" y="140">merge &rarr; [1, 5]</text>
          <text x="340" y="140">merge &rarr; [2, 4]</text>
          <text x="210" y="175">merge &rarr; [1, 2, 4, 5]</text>
        </g>
      </svg>`, `Halve until size 1 (trivially sorted), then merge back up. log n levels × n work per level.`)}
    ` },
    { type: "code", title: "merge, then merge_sort", code: `def merge(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out += a[i:]
    out += b[j:]
    return out

def merge_sort(nums):
    if len(nums) <= 1:
        return nums[:]
    mid = len(nums) // 2
    return merge(merge_sort(nums[:mid]), merge_sort(nums[mid:]))

print(merge_sort([5, 1, 4, 2, 8, 3]))` },

    { type: "html", html: `
      <h2>6 · Quicksort — O(n log n) average</h2>
      <p>Pick a <strong>pivot</strong>. Partition the rest into "less than pivot" and "the rest".
      Recurse on each part, then stitch: <code>quick(less) + [pivot] + quick(more)</code>. Fast in
      practice, but a bad pivot on already-sorted data degrades to O(n²).</p>` },
    { type: "code", title: "quicksort", code: `def quicksort(nums):
    if len(nums) <= 1:
        return nums[:]
    pivot = nums[0]
    less, more = [], []
    for x in nums[1:]:
        if x < pivot:
            less.append(x)
        else:
            more.append(x)
    return quicksort(less) + [pivot] + quicksort(more)

print(quicksort([5, 1, 4, 2, 8, 3]))` },

    { type: "html", html: `
      <table class="tbl">
        <tr><th>Sort</th><th>Best</th><th>Worst</th><th>Extra memory</th><th>Stable?</th><th>Good for</th></tr>
        <tr><td>Bubble</td><td>O(n)*</td><td>O(n²)</td><td>O(1)</td><td>yes</td><td>teaching only</td></tr>
        <tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>no</td><td>fewest swaps</td></tr>
        <tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(1)</td><td>yes</td><td>small / nearly-sorted</td></tr>
        <tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>yes</td><td>guaranteed speed, linked lists</td></tr>
        <tr><td>Quick</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>no</td><td>general in-memory (with good pivots)</td></tr>
      </table>
      <p style="font-size:12px;color:var(--muted)">*with an early-exit check for "no swaps this pass".</p>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Bubble / selection / insertion: two nested loops → O(n²). Insertion wins on nearly-sorted input.</li>
        <li>Merge: split, recurse, <code>merge</code> two sorted lists → O(n log n) guaranteed, stable, uses O(n) space.</li>
        <li>Quick: partition around a pivot, recurse → O(n log n) average, O(n²) on bad pivots, in-place-ish.</li>
        <li>In real code: <code>sorted(nums)</code> / <code>nums.sort()</code> — Python's Timsort (merge + insertion).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — sorted() & list.sort() (Timsort)", url: "https://docs.python.org/3/howto/sorting.html" },
    { label: "Wikipedia — Sorting algorithm (comparison table)", url: "https://en.wikipedia.org/wiki/Sorting_algorithm" },
    { label: "CS50x — Algorithms (sorting, big-O)", url: "https://cs50.harvard.edu/x/notes/3/" },
  ],
  exercises: [
    {
      title: "is_sorted(nums)",
      tier: "warm", uses: ["loop + comparison (L6, L3)", "early return (L10)"],
      prompt: `<p>Define <code>is_sorted(nums)</code> returning <code>True</code> if the list is in
        non-decreasing order. Empty and single-item lists are sorted.</p>`,
      solution: `def is_sorted(nums):\n    for i in range(1, len(nums)):\n        if nums[i] < nums[i - 1]:\n            return False\n    return True`,
      success: "One pass comparing each item to the one before it.",
      mustDefine: ["is_sorted"],
      tests: [
        { append: `print(is_sorted([1, 2, 2, 5]), is_sorted([1, 3, 2]), is_sorted([]), is_sorted([9]))`, expect: "True False True True" },
      ],
    },
    {
      title: "One bubble pass",
      tier: "warm", uses: ["loop over indices (L6)", "swap (L7)"],
      prompt: `<p>Define <code>one_pass(nums)</code>: return a copy of the list after a <strong>single</strong>
        left-to-right pass of adjacent swaps (the largest item should reach the end).</p>`,
      solution: `def one_pass(nums):\n    a = nums[:]\n    for j in range(len(a) - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\n    return a`,
      success: "This inner loop, repeated n times, IS bubble sort.",
      mustDefine: ["one_pass"],
      tests: [
        { append: `print(one_pass([5, 1, 4, 2, 8]))`, expect: "[1, 4, 2, 5, 8]" },
        { append: `print(one_pass([3, 2, 1]))`, expect: "[2, 1, 3]" },
      ],
    },
    {
      title: "bubble_sort(nums)",
      tier: "core", uses: ["nested loops (L6)", "swap (L7)", "return a copy"],
      prompt: `<p>Define <code>bubble_sort(nums)</code> returning a new ascending list. Don't mutate the
        input.</p>`,
      solution: `def bubble_sort(nums):\n    a = nums[:]\n    n = len(a)\n    for i in range(n):\n        for j in range(n - 1 - i):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a`,
      success: "Each pass parks one more big value at the back.",
      mustDefine: ["bubble_sort"],
      forbid: [{ pattern: "sorted\\(|\\.sort\\(", tip: `<code>sorted(nums)</code> is the real answer — this is about seeing the O(n²) machinery.` }],
      tests: [
        { append: `print(bubble_sort([5, 1, 4, 2, 8, 3]))`, expect: "[1, 2, 3, 4, 5, 8]" },
        { append: `src = [3, 1, 2]\nprint(bubble_sort(src), src)`, expect: "[1, 2, 3] [3, 1, 2]" },
      ],
    },
    {
      title: "selection_sort(nums)",
      tier: "core", uses: ["'smallest so far' scan (L6)", "swap (L7)"],
      prompt: `<p>Define <code>selection_sort(nums)</code> returning a new ascending list: for each
        position, find the smallest of the remaining items and swap it in.</p>`,
      solution: `def selection_sort(nums):\n    a = nums[:]\n    n = len(a)\n    for i in range(n):\n        smallest = i\n        for j in range(i + 1, n):\n            if a[j] < a[smallest]:\n                smallest = j\n        a[i], a[smallest] = a[smallest], a[i]\n    return a`,
      success: "Exactly one swap per position — the minimum-swaps sort.",
      mustDefine: ["selection_sort"],
      forbid: [{ pattern: "sorted\\(|\\.sort\\(", tip: `Use the real <code>sorted()</code> in real code — practise the algorithm here.` }],
      tests: [
        { append: `print(selection_sort([64, 25, 12, 22, 11]))`, expect: "[11, 12, 22, 25, 64]" },
        { append: `print(selection_sort([]))`, expect: "[]" },
      ],
    },
    {
      title: "insertion_sort(nums)",
      tier: "core", uses: ["while + shift (L6)", "grow a sorted prefix"],
      prompt: `<p>Define <code>insertion_sort(nums)</code> returning a new ascending list: take each item
        and slide it left past everything larger.</p>`,
      solution: `def insertion_sort(nums):\n    a = nums[:]\n    for i in range(1, len(a)):\n        key = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > key:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = key\n    return a`,
      success: "On a nearly-sorted list the inner while barely runs — near O(n).",
      mustDefine: ["insertion_sort"],
      forbid: [{ pattern: "sorted\\(|\\.sort\\(", tip: `Real code: <code>sorted()</code>. Here: the algorithm.` }],
      tests: [
        { append: `print(insertion_sort([5, 2, 4, 6, 1, 3]))`, expect: "[1, 2, 3, 4, 5, 6]" },
        { append: `print(insertion_sort([1, 2, 3]))`, expect: "[1, 2, 3]" },
      ],
    },
    {
      title: "merge(a, b)",
      tier: "core", uses: ["two-pointer walk", "build a list (L7)", "slicing (L4)"],
      prompt: `<p>Define <code>merge(a, b)</code>: given two <strong>already-sorted</strong> lists, return
        one sorted list containing all their items. Walk both with a pointer each, always taking the
        smaller front value.</p>`,
      solution: `def merge(a, b):\n    out = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i])\n            i += 1\n        else:\n            out.append(b[j])\n            j += 1\n    out += a[i:]\n    out += b[j:]\n    return out`,
      success: "This linear merge is the engine inside merge sort.",
      mustDefine: ["merge"],
      tests: [
        { append: `print(merge([1, 4, 7], [2, 3, 8, 9]))`, expect: "[1, 2, 3, 4, 7, 8, 9]" },
        { append: `print(merge([], [1, 2]))`, expect: "[1, 2]" },
        { append: `print(merge([5], [1]))`, expect: "[1, 5]" },
      ],
    },
    {
      title: "merge_sort(nums)",
      tier: "challenge", uses: ["recursion: split/combine (L17)", "your merge", "// for the midpoint (L3)"],
      prompt: `<p>Define <code>merge_sort(nums)</code> recursively: base case length &le; 1; otherwise split
        at <code>len // 2</code>, sort each half, and <code>merge</code> them. Assume <code>merge</code>
        is available.</p>`,
      solution: `def merge_sort(nums):\n    if len(nums) <= 1:\n        return nums[:]\n    mid = len(nums) // 2\n    return merge(merge_sort(nums[:mid]), merge_sort(nums[mid:]))`,
      success: "Split log n times; merge n items per level → O(n log n), always.",
      mustDefine: ["merge_sort"],
      tests: [
        { append: `def merge(a, b):\n    out, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]: out.append(a[i]); i += 1\n        else: out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]\nprint(merge_sort([5, 2, 9, 1, 5, 6, 3]))`, expect: "[1, 2, 3, 5, 5, 6, 9]" },
        { append: `def merge(a, b):\n    out, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]: out.append(a[i]); i += 1\n        else: out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]\nprint(merge_sort([]), merge_sort([1]))`, expect: "[] [1]" },
      ],
    },
    {
      title: "quicksort(nums)",
      tier: "challenge", uses: ["recursion (L17)", "partition with two lists", "list concat (L7)"],
      prompt: `<p>Define <code>quicksort(nums)</code> recursively: base case length &le; 1; else take
        <code>nums[0]</code> as the pivot, split the rest into <code>less</code> (&lt; pivot) and
        <code>more</code> (&ge; pivot), and return
        <code>quicksort(less) + [pivot] + quicksort(more)</code>.</p>`,
      solution: `def quicksort(nums):\n    if len(nums) <= 1:\n        return nums[:]\n    pivot = nums[0]\n    less, more = [], []\n    for x in nums[1:]:\n        if x < pivot:\n            less.append(x)\n        else:\n            more.append(x)\n    return quicksort(less) + [pivot] + quicksort(more)`,
      success: "Partition, recurse, stitch. Average O(n log n).",
      mustDefine: ["quicksort"],
      tests: [
        { append: `print(quicksort([5, 2, 9, 1, 5, 6, 3]))`, expect: "[1, 2, 3, 5, 5, 6, 9]" },
        { append: `print(quicksort([3, 3, 3]))`, expect: "[3, 3, 3]" },
      ],
    },
    {
      title: "k_smallest(nums, k)",
      tier: "challenge", uses: ["partial selection sort (L6)", "swap (L7)", "slicing (L4)"],
      prompt: `<p>Define <code>k_smallest(nums, k)</code> returning the <code>k</code> smallest values in
        ascending order — by doing only <strong>k passes</strong> of selection sort, not a full sort.</p>`,
      solution: `def k_smallest(nums, k):\n    a = nums[:]\n    for i in range(k):\n        smallest = i\n        for j in range(i + 1, len(a)):\n            if a[j] < a[smallest]:\n                smallest = j\n        a[i], a[smallest] = a[smallest], a[i]\n    return a[:k]`,
      success: "You only need the front k in place — O(nk) beats a full O(n²) when k is small.",
      mustDefine: ["k_smallest"],
      tests: [
        { append: `print(k_smallest([7, 2, 9, 1, 5, 3], 3))`, expect: "[1, 2, 3]" },
        { append: `print(k_smallest([4, 4, 4], 2))`, expect: "[4, 4]" },
        { append: `print(k_smallest([5], 0))`, expect: "[]" },
      ],
    },
    {
      title: "sort_012(nums)",
      tier: "boss", uses: ["three-pointer partition (Dutch flag)", "while + swap (L6, L7)", "if/elif (L5)"],
      prompt: `<p>The list contains only <code>0</code>, <code>1</code>, <code>2</code>. Define
        <code>sort_012(nums)</code> that sorts it <strong>in one pass</strong> with three pointers —
        <code>lo</code>, <code>mid</code>, <code>hi</code> — and returns the list. (Mutating the input
        is fine.)</p>`,
      solution: `def sort_012(nums):\n    lo = 0\n    mid = 0\n    hi = len(nums) - 1\n    while mid <= hi:\n        if nums[mid] == 0:\n            nums[lo], nums[mid] = nums[mid], nums[lo]\n            lo += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[hi] = nums[hi], nums[mid]\n            hi -= 1\n    return nums`,
      success: "One left-to-right sweep, O(n), O(1) extra — you can't sort general data this fast, but you can with only three values.",
      mustDefine: ["sort_012"],
      forbid: [{ pattern: "sorted\\(|\\.sort\\(|\\.count\\(", tip: `Counting 0s/1s/2s also works and is fine — the challenge was the single-pass three-pointer sweep.` }],
      tests: [
        { append: `print(sort_012([2, 0, 2, 1, 1, 0]))`, expect: "[0, 0, 1, 1, 2, 2]" },
        { append: `print(sort_012([0, 0, 0]))`, expect: "[0, 0, 0]" },
        { append: `print(sort_012([2, 1, 0]))`, expect: "[0, 1, 2]" },
        { append: `print(sort_012([]))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 19 */
{
  id: "modules",
  section: "Modules",
  title: "Modules (Built-in & Custom)",
  summary: "Split code across files and pull in the standard library with import; understand __name__ and namespaces.",
  lead: "Every .py file is a module. import runs another file once and hands you its names under a namespace — that's how programs grow past one screen.",
  spiral: ["functions & return (L10)", "dicts as namespaces (L8)", "attribute access with a dot (L4, L8)", "if / __main__ guard (L5)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · <code>import</code> = run a file, get its namespace</h2>
      <p>A <strong>module</strong> is a file of Python. <code>import math</code> finds
      <code>math</code>, runs it top to bottom <em>once</em>, and binds the name <code>math</code> to
      an object whose attributes are everything the file defined. You reach them with a dot.</p>` },
    { type: "code", title: "Three ways to import", code: `import math
print(math.sqrt(16), math.pi)

from math import sqrt, pi          # pull names straight into your namespace
print(sqrt(25), pi)

import statistics as stats         # alias a long name
print(stats.mean([2, 4, 9]))` },
    { type: "html", html: `
      <div class="tip"><b>Which form?</b>
      <ul style="margin:6px 0 0">
        <li><code>import mod</code> — keeps everything behind <code>mod.</code> (clearest for readers).</li>
        <li><code>from mod import name</code> — handy for a few frequently-used names.</li>
        <li><code>from mod import *</code> — avoid; it dumps unknown names into your file.</li>
        <li><code>import mod as m</code> — a shorter handle (the <code>np</code>, <code>pd</code> convention).</li>
      </ul></div>` },
    { type: "html", html: whatif([
      "you <code>import math</code> twice in one program — does the file run twice?",
      "two modules both define <code>helper</code> and you do <code>from a import *</code> then <code>from b import *</code> — which wins?",
      "you name your own file <code>random.py</code> and then <code>import random</code>?",
    ]) },

    { type: "html", html: `
      <h2>2 · A tour of the standard library</h2>
      <p>Python ships with hundreds of modules — "batteries included". A handful you'll use constantly:</p>
      <table class="tbl">
        <tr><th>Module</th><th>For</th><th>Example</th></tr>
        <tr><td><code>math</code></td><td>numbers</td><td><code>math.floor(3.7)</code>, <code>math.gcd(12, 8)</code></td></tr>
        <tr><td><code>random</code></td><td>randomness</td><td><code>random.randint(1, 6)</code>, <code>random.choice(xs)</code></td></tr>
        <tr><td><code>statistics</code></td><td>mean / median / stdev</td><td><code>statistics.median([3, 1, 2])</code></td></tr>
        <tr><td><code>json</code></td><td>text ↔ data</td><td><code>json.dumps(obj)</code>, <code>json.loads(text)</code></td></tr>
        <tr><td><code>collections</code></td><td>Counter, defaultdict, deque</td><td><code>Counter("banana")</code></td></tr>
        <tr><td><code>datetime</code></td><td>dates & times</td><td><code>datetime.date(2026, 1, 1)</code></td></tr>
      </table>` },
    { type: "code", title: "random (seeded for repeatability)", code: `import random
random.seed(0)                       # fixed seed -> same "random" numbers every run
print(random.randint(1, 100))
print(random.choice(["red", "green", "blue"]))
nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
print(nums)` },
    { type: "code", title: "json round-trip", code: `import json
data = {"name": "Ada", "scores": [90, 85, 88]}
text = json.dumps(data)
print(text)
back = json.loads(text)
print(back["scores"][0], type(back))` },

    { type: "html", html: `
      <h2>3 · Your own module &amp; the <code>__main__</code> guard</h2>
      <p>Put reusable functions in <code>tools.py</code>, then <code>from tools import clean</code>
      elsewhere. But importing a file <em>runs</em> it — so any "do it now" code at the bottom would
      fire on import. The fix: guard it.</p>` },
    { type: "code", title: "The pattern every script uses", code: `def greet(name):
    return f"Hello, {name}!"

# __name__ is "__main__" only when this file is run directly,
# not when it's imported by another file.
if __name__ == "__main__":
    print(greet("world"))       # runs now, but stays quiet on import` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>A module is a <code>.py</code> file; <code>import</code> runs it once and namespaces its names.</li>
        <li><code>import m</code> / <code>from m import x</code> / <code>import m as alias</code>.</li>
        <li>Standard library staples: <code>math</code>, <code>random</code>, <code>statistics</code>, <code>json</code>, <code>collections</code>, <code>datetime</code>.</li>
        <li><code>if __name__ == "__main__":</code> keeps run-now code from firing on import.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Modules", url: "https://docs.python.org/3/tutorial/modules.html" },
    { label: "Python — The Standard Library", url: "https://docs.python.org/3/library/index.html" },
    { label: "Real Python — Python Modules and Packages", url: "https://realpython.com/python-modules-packages/" },
  ],
  exercises: [
    {
      title: "Import three ways",
      tier: "warm", uses: ["import forms"],
      prompt: `<p>Print, on three lines: <code>math.factorial(5)</code> using
        <code>import math</code>; then <code>sqrt(81)</code> using <code>from math import sqrt</code>;
        then <code>gcd(24, 36)</code> using <code>from math import gcd</code>.</p><pre>120\n9.0\n12</pre>`,
      solution: `import math\nfrom math import sqrt, gcd\nprint(math.factorial(5))\nprint(sqrt(81))\nprint(gcd(24, 36))`,
      success: "Each import style, one line each.",
      tests: [{ expect: "120\n9.0\n12" }],
    },
    {
      title: "Seeded dice",
      tier: "warm", uses: ["random module", "seed for repeatability"],
      prompt: `<p>Import <code>random</code>, seed it with <code>42</code>, then print two
        <code>random.randint(1, 6)</code> rolls space-separated.</p><pre>6 1</pre>`,
      solution: `import random\nrandom.seed(42)\nprint(random.randint(1, 6), random.randint(1, 6))`,
      success: "A fixed seed makes randomness reproducible — essential for tests.",
      tests: [{ expect: "6 1" }],
    },
    {
      title: "median with statistics",
      tier: "core", uses: ["from ... import", "list (L7)"],
      prompt: `<p>Given <code>data = [7, 1, 3, 9, 5]</code>, use <code>statistics.median</code> to print
        the median.</p><pre>5</pre>`,
      starter: `data = [7, 1, 3, 9, 5]\n`,
      solution: `import statistics\ndata = [7, 1, 3, 9, 5]\nprint(statistics.median(data))`,
      success: "Don't reimplement median — the stdlib has it.",
      tests: [{ expect: "5" }],
    },
    {
      title: "JSON round-trip",
      tier: "core", uses: ["json.dumps / loads", "dicts (L8)"],
      prompt: `<p>Define <code>roundtrip(obj)</code> that serialises <code>obj</code> to a JSON string with
        <code>json.dumps</code> and parses it straight back with <code>json.loads</code>, returning the
        result.</p>`,
      solution: `import json\n\ndef roundtrip(obj):\n    return json.loads(json.dumps(obj))`,
      success: "dumps → text, loads → data. The workhorse of config and APIs.",
      mustDefine: ["roundtrip"],
      tests: [
        { append: `print(roundtrip({"a": 1, "b": [2, 3]}))`, expect: "{'a': 1, 'b': [2, 3]}" },
        { append: `print(roundtrip([1, "two", True]))`, expect: "[1, 'two', True]" },
      ],
    },
    {
      title: "Counter shortcut",
      tier: "core", uses: ["collections.Counter", "dict (L8)"],
      prompt: `<p>Using <code>collections.Counter</code>, define <code>top_letter(s)</code> returning the
        most common character in <code>s</code>. (<code>Counter(s).most_common(1)[0][0]</code>.)</p>`,
      solution: `from collections import Counter\n\ndef top_letter(s):\n    return Counter(s).most_common(1)[0][0]`,
      success: "Counter is the tally-dict from Lesson 8, done for you.",
      mustDefine: ["top_letter"],
      tests: [
        { append: `print(top_letter("aaab"))`, expect: "a" },
        { append: `print(top_letter("xyzzy"))`, expect: "y" },
      ],
    },
    {
      title: "The __main__ guard",
      tier: "challenge", uses: ["__name__", "if (L5)", "functions (L10)"],
      prompt: `<p>Define <code>main()</code> that prints <code>running</code>, then add the
        <code>if __name__ == "__main__":</code> guard that calls it. Because your code is loaded as a
        module here (not run directly), <code>main()</code> should <strong>not</strong> fire on its
        own — the test calls it explicitly.</p>`,
      solution: `def main():\n    print("running")\n\nif __name__ == "__main__":\n    main()`,
      success: "This exact shape sits at the bottom of almost every real script.",
      mustDefine: ["main"],
      require: [{ pattern: "if\\s+__name__\\s*==\\s*[\"']__main__[\"']\\s*:", hard: true, message: "Add the `if __name__ == \"__main__\":` guard that calls main()." }],
      tests: [
        { append: `main()`, expect: "running" },
      ],
    },
    {
      title: "Frequency report (stdlib only)",
      tier: "boss", uses: ["Counter", "json (formatting)", "sorted", "functions (L10)"],
      prompt: `<p>Define <code>report(text)</code>: split on spaces, count words with <code>Counter</code>,
        and return a JSON string of the counts with keys <strong>sorted alphabetically</strong>
        (<code>json.dumps(d, sort_keys=True)</code>).</p>
        <p><code>report("a b a c b a")</code> &rarr; <code>'{"a": 3, "b": 2, "c": 1}'</code></p>`,
      solution: `import json\nfrom collections import Counter\n\ndef report(text):\n    counts = dict(Counter(text.split(" ")))\n    return json.dumps(counts, sort_keys=True)`,
      success: "Three stdlib modules composed into one small tool.",
      mustDefine: ["report"],
      tests: [
        { append: `print(report("a b a c b a"))`, expect: '{"a": 3, "b": 2, "c": 1}' },
        { append: `print(report("x"))`, expect: '{"x": 1}' },
      ],
    },
  ],
},

/* ========================================================== 20 */
{
  id: "lambdas",
  section: "Modules",
  title: "Lambdas",
  summary: "Tiny one-expression functions written inline — mostly as the key= argument to sort/min/max/filter.",
  lead: "A lambda is a function with no name and no def — just parameters, a colon, and one expression. Small, and used in one specific place.",
  spiral: ["functions & return (L10)", "sorted / min / max (L10)", "tuples (L7)", "strings & len (L4)", "f-strings (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · <code>lambda args: expression</code></h2>
      <p>These two define the same function:</p>` },
    { type: "code", title: "def vs lambda", code: `def double_a(x):
    return x * 2

double_b = lambda x: x * 2      # same thing, one line, no name of its own

print(double_a(5), double_b(5))
print((lambda a, b: a + b)(3, 4))   # define and call on the spot` },
    { type: "html", html: `
      <div class="warn"><b>Rules & etiquette</b>
      <ul style="margin:6px 0 0">
        <li>The body is a <strong>single expression</strong> — no statements, no <code>return</code>, no <code>if:</code> blocks (a conditional <em>expression</em> <code>a if c else b</code> is fine).</li>
        <li>If you're assigning it a name (<code>f = lambda ...</code>), just use <code>def</code> — it's clearer and shows in tracebacks.</li>
        <li>The right home for a lambda is <em>as an argument</em> to another function.</li>
      </ul></div>` },

    { type: "html", html: `
      <h2>2 · The real use: <code>key=</code></h2>
      <p><code>sorted</code>, <code>min</code>, <code>max</code> take a <code>key=</code> function that
      turns each item into the value to compare by. A lambda expresses that rule inline.</p>` },
    { type: "code", title: "Sort by something other than the value", code: `words = ["banana", "kiwi", "apple", "fig"]
print(sorted(words, key=len))                 # by length
print(sorted(words, key=lambda w: w[-1]))     # by last letter

people = [("Ada", 36), ("Bo", 19), ("Cy", 28)]
print(sorted(people, key=lambda p: p[1]))     # by age (the 2nd tuple item)
print(max(people, key=lambda p: p[1]))        # oldest
print(sorted(people, key=lambda p: -p[1]))    # age, descending` },
    { type: "html", html: whatif([
      "you sort <code>people</code> with no <code>key=</code> — what does it compare?",
      "two items have the same key value — does <code>sorted</code> keep or scramble their order? (it's stable)",
      "<code>key=lambda p: (len(p[0]), p[1])</code> — what does sorting by a <em>tuple</em> key do?",
    ]) },

    { type: "html", html: `
      <h2>3 · With <code>filter</code> and <code>map</code></h2>
      <p><code>filter(fn, xs)</code> keeps items where <code>fn(x)</code> is truthy;
      <code>map(fn, xs)</code> applies <code>fn</code> to each. Both return lazy iterators — wrap in
      <code>list(...)</code> to see them. (A list comprehension, next section, often reads better.)</p>` },
    { type: "code", title: "filter / map", code: `nums = [1, 2, 3, 4, 5, 6]
print(list(filter(lambda n: n % 2 == 0, nums)))   # evens
print(list(map(lambda n: n * n, nums)))           # squares` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>lambda params: expression</code> — an anonymous one-expression function.</li>
        <li>Don't name them; do pass them as <code>key=</code> / to <code>filter</code> / <code>map</code>.</li>
        <li><code>key=</code> maps each item to its comparison value; return a tuple to sort by several things.</li>
        <li>Negate a numeric key (<code>-x</code>) or pass <code>reverse=True</code> for descending.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — Lambda expressions", url: "https://docs.python.org/3/reference/expressions.html#lambda" },
    { label: "Python HOWTO — Sorting (key functions)", url: "https://docs.python.org/3/howto/sorting.html#key-functions" },
    { label: "Real Python — How to Use Python Lambda Functions", url: "https://realpython.com/python-lambda/" },
  ],
  exercises: [
    {
      title: "Inline double",
      tier: "warm", uses: ["lambda basics"],
      prompt: `<p>Without <code>def</code>: build a lambda that triples its argument, and print it called
        with <code>7</code>.</p><pre>21</pre>`,
      solution: `print((lambda x: x * 3)(7))`,
      success: "Define and call in one expression.",
      tests: [{ expect: "21" }],
    },
    {
      title: "Sort by length",
      tier: "warm", uses: ["sorted key=", "len (L4)"],
      prompt: `<p>Given <code>words = ["pear", "fig", "banana", "kiwi"]</code>, print them sorted by
        length (shortest first).</p><pre>['fig', 'pear', 'kiwi', 'banana']</pre>`,
      starter: `words = ["pear", "fig", "banana", "kiwi"]\n`,
      solution: `words = ["pear", "fig", "banana", "kiwi"]\nprint(sorted(words, key=len))`,
      success: "key=len — no lambda even needed here.",
      tests: [{ expect: "['fig', 'pear', 'kiwi', 'banana']" }],
    },
    {
      title: "Sort pairs by second item",
      tier: "core", uses: ["lambda key=", "tuple indexing (L7)"],
      prompt: `<p>Given <code>scores = [("Ada", 88), ("Bo", 72), ("Cy", 95)]</code>, print the list
        sorted by score ascending.</p><pre>[('Bo', 72), ('Ada', 88), ('Cy', 95)]</pre>`,
      starter: `scores = [("Ada", 88), ("Bo", 72), ("Cy", 95)]\n`,
      solution: `scores = [("Ada", 88), ("Bo", 72), ("Cy", 95)]\nprint(sorted(scores, key=lambda p: p[1]))`,
      success: "The lambda pulls out the field to compare on.",
      tests: [{ expect: "[('Bo', 72), ('Ada', 88), ('Cy', 95)]" }],
    },
    {
      title: "Highest scorer",
      tier: "core", uses: ["max key=", "lambda"],
      prompt: `<p>Define <code>top(scores)</code> returning the name of the person with the highest score
        (a list of <code>(name, score)</code> tuples).</p>`,
      solution: `def top(scores):\n    return max(scores, key=lambda p: p[1])[0]`,
      success: "max with key= finds the item; [0] takes its name.",
      mustDefine: ["top"],
      tests: [
        { append: `print(top([("Ada", 88), ("Bo", 72), ("Cy", 95)]))`, expect: "Cy" },
        { append: `print(top([("Solo", 1)]))`, expect: "Solo" },
      ],
    },
    {
      title: "Filter then map",
      tier: "challenge", uses: ["filter + lambda", "map + lambda", "list()"],
      prompt: `<p>Define <code>squared_evens(nums)</code> returning a list of the squares of just the
        even numbers, in order. Use <code>filter</code> and <code>map</code>.</p>`,
      solution: `def squared_evens(nums):\n    evens = filter(lambda n: n % 2 == 0, nums)\n    return list(map(lambda n: n * n, evens))`,
      success: "filter narrows, map transforms — both take a lambda.",
      mustDefine: ["squared_evens"],
      tests: [
        { append: `print(squared_evens([1, 2, 3, 4, 5, 6]))`, expect: "[4, 16, 36]" },
        { append: `print(squared_evens([1, 3, 5]))`, expect: "[]" },
      ],
    },
    {
      title: "Two-key sort",
      tier: "challenge", uses: ["tuple key", "sorted", "lambda"],
      prompt: `<p>Given a list of <code>(name, age)</code> tuples, define <code>arrange(people)</code>
        that sorts by <strong>age descending</strong>, and for equal ages, by <strong>name
        ascending</strong>.</p>`,
      solution: `def arrange(people):\n    return sorted(people, key=lambda p: (-p[1], p[0]))`,
      success: "A tuple key sorts by the first element, then the second as a tie-breaker.",
      mustDefine: ["arrange"],
      tests: [
        { append: `print(arrange([("Bo", 30), ("Ada", 30), ("Cy", 25)]))`, expect: "[('Ada', 30), ('Bo', 30), ('Cy', 25)]" },
      ],
    },
    {
      title: "Sort words by vowel count",
      tier: "boss", uses: ["lambda calling a helper", "loop/comprehension-free count", "sorted stable (L18)"],
      prompt: `<p>Define <code>by_vowels(words)</code> sorting words by how many vowels
        (<code>aeiou</code>) they contain, fewest first; ties keep input order (sort is stable).</p>`,
      solution: `def by_vowels(words):\n    def vcount(w):\n        c = 0\n        for ch in w:\n            if ch in "aeiou":\n                c += 1\n        return c\n    return sorted(words, key=vcount)`,
      success: "When the key rule needs more than one expression, name it — a def, not a lambda.",
      mustDefine: ["by_vowels"],
      tests: [
        { append: `print(by_vowels(["sky", "apple", "be", "queue"]))`, expect: "['sky', 'be', 'apple', 'queue']" },
      ],
    },
  ],
},

/* ========================================================== 21 */
{
  id: "decorators",
  section: "Modules",
  title: "Decorators",
  summary: "A function that wraps another function to add behaviour — logging, timing, caching — without touching its code.",
  lead: "Functions are values (Lesson 10). A decorator takes a function, returns a new one that calls the original plus something extra. @name is just sugar for that swap.",
  spiral: ["functions are values (L10)", "*args / **kwargs (new)", "closures & scope (this section)", "return a function", "dict for a cache (L8, L17)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · A function that returns a function</h2>
      <p>Because a function is a value, one function can take another as an argument and hand back a
      <em>replacement</em>. The replacement usually calls the original in the middle.</p>` },
    { type: "code", title: "Wrapping by hand", code: `def shout(fn):
    def wrapper(*args, **kwargs):        # accept ANY arguments
        result = fn(*args, **kwargs)     # call the real function
        return str(result).upper()       # ...and change the result
    return wrapper

def greet(name):
    return f"hello, {name}"

greet = shout(greet)      # replace greet with the wrapped version
print(greet("ada"))` },
    { type: "html", html: `
      <p><code>*args</code> collects positional arguments into a tuple; <code>**kwargs</code> collects
      keyword arguments into a dict. Passing <code>*args, **kwargs</code> straight through lets the
      wrapper work for <em>any</em> function.</p>` },
    { type: "code", title: "The @ is just that swap", code: `def shout(fn):
    def wrapper(*args, **kwargs):
        return str(fn(*args, **kwargs)).upper()
    return wrapper

@shout                     # <-- exactly the same as:  greet = shout(greet)
def greet(name):
    return f"hello, {name}"

print(greet("bo"))` },
    { type: "html", html: whatif([
      "the wrapper forgets to <code>return fn(...)</code>'s result — what does the decorated function return?",
      "you stack two: <code>@a</code> then <code>@b</code> above a function — which runs first, and does order matter?",
      "the wrapped function takes keyword arguments but the wrapper only accepts <code>*args</code> — what breaks?",
    ]) },

    { type: "html", html: `
      <h2>2 · Two everyday decorators</h2>
      <p><strong>Timing / counting</strong> a function, and <strong>memoising</strong> it (a cache
      dict — Lesson 17's Fibonacci trick, but reusable).</p>` },
    { type: "code", title: "A call counter and a cache", code: `def counted(fn):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return fn(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

def memoize(fn):
    cache = {}
    def wrapper(n):
        if n not in cache:
            cache[n] = fn(n)
        return cache[n]
    return wrapper

@counted
@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(30))
print("fib called", fib.calls, "times (memoised)")` },
    { type: "html", html: `
      <div class="note"><b>Real code adds <code>@functools.wraps(fn)</code></b>
      inside the decorator, so the wrapper keeps the original's <code>__name__</code> and docstring.
      We'll skip it here to keep the mechanism bare.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>A decorator: <code>def deco(fn): def wrapper(*a, **kw): ...; return wrapper</code>.</li>
        <li><code>@deco</code> above <code>def f</code> means <code>f = deco(f)</code>.</li>
        <li><code>*args</code> = tuple of positionals; <code>**kwargs</code> = dict of keywords; forward both to be generic.</li>
        <li>Uses: logging, timing, caching, access checks, retries — cross-cutting behaviour, added once.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Glossary — decorator", url: "https://docs.python.org/3/glossary.html#term-decorator" },
    { label: "PEP 318 — Decorators for Functions and Methods", url: "https://peps.python.org/pep-0318/" },
    { label: "Real Python — Primer on Python Decorators", url: "https://realpython.com/primer-on-python-decorators/" },
  ],
  exercises: [
    {
      title: "Manual wrap",
      tier: "warm", uses: ["function as argument (L10)", "nested function"],
      prompt: `<p>Define <code>add_bang(fn)</code> returning a new function that calls <code>fn</code>
        (which takes one argument) and appends <code>"!"</code> to its string result.</p>`,
      solution: `def add_bang(fn):\n    def wrapper(x):\n        return str(fn(x)) + "!"\n    return wrapper`,
      success: "Inner function calls the outer's fn and tweaks the result.",
      mustDefine: ["add_bang"],
      tests: [
        { append: `f = add_bang(lambda x: "hi " + x)\nprint(f("ada"))`, expect: "hi ada!" },
      ],
    },
    {
      title: "Use the @ syntax",
      tier: "warm", uses: ["@decorator", "*args"],
      prompt: `<p>Define a decorator <code>squared</code> so that a decorated one-argument function's
        result is squared. Then <code>@squared</code>-decorate <code>plus_one(n)</code> which returns
        <code>n + 1</code>.</p>`,
      solution: `def squared(fn):\n    def wrapper(*args, **kwargs):\n        r = fn(*args, **kwargs)\n        return r * r\n    return wrapper\n\n@squared\ndef plus_one(n):\n    return n + 1`,
      success: "@squared above the def is plus_one = squared(plus_one).",
      mustDefine: ["plus_one"],
      require: [{ pattern: "@squared", hard: true, message: "Use the @squared decorator syntax on plus_one." }],
      tests: [
        { append: `print(plus_one(4))`, expect: "25" },
        { append: `print(plus_one(0))`, expect: "1" },
      ],
    },
    {
      title: "Call counter",
      tier: "core", uses: ["attribute on the wrapper", "*args/**kwargs", "closure"],
      prompt: `<p>Define <code>counted(fn)</code>: the returned wrapper works for any signature, forwards
        the call, and keeps a running <code>wrapper.calls</code> count starting at 0.</p>`,
      solution: `def counted(fn):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return fn(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper`,
      success: "Store state as an attribute on the wrapper function object.",
      mustDefine: ["counted"],
      tests: [
        { append: `g = counted(lambda a, b: a + b)\ng(1, 2); g(3, 4); g(5, 6)\nprint(g.calls, g(10, 10))`, expect: "3 20" },
      ],
    },
    {
      title: "Memoize decorator",
      tier: "core", uses: ["cache dict (L8, L17)", "closure over the cache"],
      prompt: `<p>Define <code>memoize(fn)</code> for a single-argument function: cache results in a dict
        so repeat calls with the same argument don't recompute.</p>`,
      solution: `def memoize(fn):\n    cache = {}\n    def wrapper(x):\n        if x not in cache:\n            cache[x] = fn(x)\n        return cache[x]\n    return wrapper`,
      success: "The cache lives in the enclosing scope, shared by every call to wrapper.",
      mustDefine: ["memoize"],
      tests: [
        { append: `calls = []\n@memoize\ndef slow(n):\n    calls.append(n)\n    return n * n\nprint(slow(4), slow(4), slow(5))\nprint(calls)`, expect: "16 16 25\n[4, 5]" },
      ],
    },
    {
      title: "require_positive",
      tier: "challenge", uses: ["raise (L11)", "arg inspection", "@decorator"],
      prompt: `<p>Define <code>require_positive(fn)</code>: the wrapper checks its first positional
        argument; if it's <code>&lt; 0</code> it <code>raise ValueError("negative")</code>, otherwise
        it forwards the call.</p>`,
      solution: `def require_positive(fn):\n    def wrapper(*args, **kwargs):\n        if args and args[0] < 0:\n            raise ValueError("negative")\n        return fn(*args, **kwargs)\n    return wrapper`,
      success: "A decorator is a natural spot for a precondition check.",
      mustDefine: ["require_positive"],
      tests: [
        { append: `@require_positive\ndef root(x):\n    return x ** 0.5\nprint(root(9))\ntry:\n    root(-1)\nexcept ValueError as e:\n    print(e)`, expect: "3.0\nnegative" },
      ],
    },
    {
      title: "Decorator that takes an argument",
      tier: "boss", uses: ["three nested functions", "*args", "@deco(arg)"],
      prompt: `<p>Define <code>repeat(times)</code> — a decorator <em>factory</em>. <code>@repeat(3)</code>
        above a function makes each call run the function <code>times</code> times and return a
        <strong>list</strong> of the results.</p>`,
      solution: `def repeat(times):\n    def deco(fn):\n        def wrapper(*args, **kwargs):\n            out = []\n            for _ in range(times):\n                out.append(fn(*args, **kwargs))\n            return out\n        return wrapper\n    return deco`,
      success: "@repeat(3) calls repeat(3) to GET the decorator, then applies it. Three layers.",
      mustDefine: ["repeat"],
      tests: [
        { append: `n = [0]\n@repeat(3)\ndef tick():\n    n[0] += 1\n    return n[0]\nprint(tick())`, expect: "[1, 2, 3]" },
        { append: `@repeat(2)\ndef hi(name):\n    return "hi " + name\nprint(hi("bo"))`, expect: "['hi bo', 'hi bo']" },
      ],
    },
  ],
},

/* ========================================================== 22 */
{
  id: "iterators",
  section: "Modules",
  title: "Iterators",
  summary: "The protocol behind every for loop: __iter__ gives an iterator, __next__ yields values until StopIteration.",
  lead: "You've written for x in ... dozens of times. This is what Python actually does — and how to make your own objects loopable, and lazy.",
  spiral: ["for loops (L6)", "classes & __methods__ (preview of OOP)", "StopIteration / exceptions (L11)", "generators next (companion topic)", "range / enumerate / zip (L10)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · What <code>for</code> really does</h2>
      <p>An <strong>iterable</strong> is anything you can loop over (list, str, dict, range…). Calling
      <code>iter(x)</code> on it returns an <strong>iterator</strong>: an object with a
      <code>__next__()</code> method that returns the next value, and raises
      <code>StopIteration</code> when there are no more.</p>` },
    { type: "code", title: "Driving a loop by hand", code: `nums = [10, 20, 30]
it = iter(nums)          # get an iterator
print(next(it))          # 10
print(next(it))          # 20
print(next(it))          # 30
try:
    next(it)
except StopIteration:
    print("exhausted")

# a for loop is exactly this, with the try/except built in:
for x in nums:
    print(x)` },
    { type: "html", html: whatif([
      "you call <code>iter()</code> on the same list twice — one iterator or two independent ones?",
      "an iterator is exhausted and you loop over it again — how many items do you get?",
      "you pass a <em>list iterator</em> straight to <code>for</code> — does it need <code>iter()</code> again? (an iterator's <code>__iter__</code> returns itself)",
    ]) },

    { type: "html", html: `
      <h2>2 · Your own iterator</h2>
      <div class="note"><b>A 60-second <code>class</code> primer</b> (full lesson later):
      <code>class Name:</code> groups data + functions. <code>__init__(self, …)</code> runs when you
      create one and sets up <code>self.x</code> attributes. Other <code>def</code>s inside take
      <code>self</code> first. <code>Name(args)</code> makes an instance; <code>obj.x</code>,
      <code>obj.method()</code> use it. Names wrapped in <code>__…__</code> hook into Python
      (<code>__iter__</code>, <code>__next__</code>, <code>__len__</code>, …).</div>
      <p>An iterator class needs <code>__iter__</code> (returns something with <code>__next__</code> —
      usually <code>self</code>) and <code>__next__</code> (returns the next value or raises
      <code>StopIteration</code>).</p>` },
    { type: "code", title: "A countdown iterator", code: `class CountDown:
    def __init__(self, start):
        self.n = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

for x in CountDown(4):
    print(x)
print(list(CountDown(3)))` },

    { type: "html", html: `
      <h2>3 · Laziness — the point of iterators</h2>
      <p>An iterator computes each value <em>on demand</em>. It can be infinite, or wrap a huge file,
      because it never holds everything at once. <code>enumerate</code>, <code>zip</code>,
      <code>map</code>, <code>filter</code>, <code>range</code> are all lazy iterators.</p>` },
    { type: "code", title: "Lazy tools", code: `pairs = zip([1, 2, 3], ["a", "b", "c"])
print(type(pairs))
print(list(pairs))              # consume it -> now empty

for i, letter in enumerate(["x", "y", "z"], start=1):
    print(i, letter)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><strong>Iterable</strong>: has <code>__iter__</code>. <strong>Iterator</strong>: has <code>__next__</code> (and returns itself from <code>__iter__</code>).</li>
        <li><code>iter(x)</code> then <code>next(it)</code> … until <code>StopIteration</code>. A <code>for</code> loop wraps that.</li>
        <li>Iterators are <strong>lazy</strong> and <strong>one-shot</strong> — consumed once, then empty.</li>
        <li><code>zip</code>, <code>map</code>, <code>filter</code>, <code>enumerate</code>, <code>range</code> return iterators.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Iterators", url: "https://docs.python.org/3/tutorial/classes.html#iterators" },
    { label: "Python docs — Iterator types", url: "https://docs.python.org/3/library/stdtypes.html#iterator-types" },
    { label: "Real Python — Iterators and Iterables", url: "https://realpython.com/python-iterators-iterables/" },
  ],
  exercises: [
    {
      title: "next() by hand",
      tier: "warm", uses: ["iter / next", "StopIteration (L11)"],
      prompt: `<p>Given <code>it = iter([5, 6, 7])</code>, print the first two values with <code>next</code>,
        then print <code>"done"</code> after catching <code>StopIteration</code> from two more calls.</p>
        <pre>5\n6\ndone</pre>`,
      starter: `it = iter([5, 6, 7])\n`,
      solution: `it = iter([5, 6, 7])\nprint(next(it))\nprint(next(it))\ntry:\n    next(it)\n    next(it)\nexcept StopIteration:\n    print("done")`,
      success: "next() advances; StopIteration signals the end.",
      tests: [{ expect: "5\n6\ndone" }],
    },
    {
      title: "One-shot",
      tier: "warm", uses: ["iterator exhaustion"],
      prompt: `<p>Define <code>count_twice(iterable)</code> that makes an iterator from <code>iterable</code>,
        then returns a tuple <code>(first_len, second_len)</code> where each is the number of items a
        <code>for</code> loop over that <em>same iterator</em> sees. (The second is always 0.)</p>`,
      solution: `def count_twice(iterable):\n    it = iter(iterable)\n    a = 0\n    for _ in it:\n        a += 1\n    b = 0\n    for _ in it:\n        b += 1\n    return (a, b)`,
      success: "An iterator is consumed once. The second pass sees nothing.",
      mustDefine: ["count_twice"],
      tests: [
        { append: `print(count_twice([1, 2, 3, 4]))`, expect: "(4, 0)" },
        { append: `print(count_twice([]))`, expect: "(0, 0)" },
      ],
    },
    {
      title: "CountUp iterator",
      tier: "core", uses: ["__iter__ / __next__", "class basics", "StopIteration"],
      prompt: `<p>Define a class <code>CountUp</code> so that <code>list(CountUp(4))</code> is
        <code>[1, 2, 3, 4]</code> — <code>__init__(self, stop)</code>, <code>__iter__</code> returns
        <code>self</code>, <code>__next__</code> yields 1..stop then raises <code>StopIteration</code>.</p>`,
      solution: `class CountUp:\n    def __init__(self, stop):\n        self.stop = stop\n        self.cur = 0\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.cur >= self.stop:\n            raise StopIteration\n        self.cur += 1\n        return self.cur`,
      success: "Track state on self; stop by raising StopIteration.",
      mustDefine: ["CountUp"],
      tests: [
        { append: `print(list(CountUp(4)))`, expect: "[1, 2, 3, 4]" },
        { append: `out = []\nfor x in CountUp(2):\n    out.append(x)\nprint(out)`, expect: "[1, 2]" },
        { append: `print(list(CountUp(0)))`, expect: "[]" },
      ],
    },
    {
      title: "my_enumerate",
      tier: "challenge", uses: ["iterator protocol", "tuples (L7)", "loop (L6)"],
      prompt: `<p>Define <code>my_enumerate(iterable, start=0)</code> returning a <strong>list</strong> of
        <code>(index, item)</code> tuples — your own <code>enumerate</code>.</p>`,
      solution: `def my_enumerate(iterable, start=0):\n    out = []\n    i = start\n    for item in iterable:\n        out.append((i, item))\n        i += 1\n    return out`,
      success: "enumerate is just a running counter alongside the loop.",
      mustDefine: ["my_enumerate"],
      tests: [
        { append: `print(my_enumerate(["a", "b", "c"]))`, expect: "[(0, 'a'), (1, 'b'), (2, 'c')]" },
        { append: `print(my_enumerate("xy", start=10))`, expect: "[(10, 'x'), (11, 'y')]" },
      ],
    },
    {
      title: "take(it, n)",
      tier: "challenge", uses: ["next()", "StopIteration handling", "build a list"],
      prompt: `<p>Define <code>take(iterable, n)</code> returning a list of the first <code>n</code> items
        (fewer if the iterable is shorter). Pull with <code>next()</code> and stop on
        <code>StopIteration</code> — don't loop the whole thing.</p>`,
      solution: `def take(iterable, n):\n    it = iter(iterable)\n    out = []\n    for _ in range(n):\n        try:\n            out.append(next(it))\n        except StopIteration:\n            break\n    return out`,
      success: "This is how you slice a possibly-infinite iterator safely.",
      mustDefine: ["take"],
      tests: [
        { append: `print(take([1, 2, 3, 4, 5], 3))`, expect: "[1, 2, 3]" },
        { append: `print(take([1, 2], 5))`, expect: "[1, 2]" },
        { append: `print(take(range(1000000), 4))`, expect: "[0, 1, 2, 3]" },
      ],
    },
    {
      title: "Round-robin iterator",
      tier: "boss", uses: ["__iter__ / __next__", "multiple sub-iterators", "StopIteration bookkeeping"],
      prompt: `<p>Define a class <code>RoundRobin</code> taking a list of lists. Iterating it yields one
        item from each sub-list in turn, cycling, skipping lists that run out, until all are empty.
        <code>list(RoundRobin([[1, 2, 3], [4], [5, 6]]))</code> &rarr; <code>[1, 4, 5, 2, 6, 3]</code>.</p>`,
      solution: `class RoundRobin:\n    def __init__(self, lists):\n        self.iters = [iter(x) for x in lists]\n        self.i = 0\n    def __iter__(self):\n        return self\n    def __next__(self):\n        while self.iters:\n            self.i %= len(self.iters)\n            try:\n                val = next(self.iters[self.i])\n                self.i += 1\n                return val\n            except StopIteration:\n                self.iters.pop(self.i)\n        raise StopIteration`,
      success: "Keep a list of live iterators; drop each one as it empties.",
      mustDefine: ["RoundRobin"],
      tests: [
        { append: `print(list(RoundRobin([[1, 2, 3], [4], [5, 6]])))`, expect: "[1, 4, 5, 2, 6, 3]" },
        { append: `print(list(RoundRobin([[], [1], []])))`, expect: "[1]" },
      ],
    },
  ],
},

/* ========================================================== 23 */
{
  id: "regex",
  section: "Modules",
  title: "Regular Expressions",
  summary: "A mini-language for describing text patterns: search, match, findall, sub, and capture groups via the re module.",
  lead: "When 'does this string look like X?' gets complicated — an email, a date, a code — a regex says it in one line. Powerful, and easy to overuse.",
  spiral: ["strings & methods (L4)", "import a module (L19)", "None as 'no match' (L11)", "loops over results (L6)", "tuples & groups (L7)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The pieces</h2>
      <table class="tbl">
        <tr><th>Pattern</th><th>Matches</th></tr>
        <tr><td><code>.</code></td><td>any one character (except newline)</td></tr>
        <tr><td><code>\\d</code> <code>\\w</code> <code>\\s</code></td><td>a digit / word-char / whitespace</td></tr>
        <tr><td><code>[abc]</code> <code>[a-z]</code> <code>[^0-9]</code></td><td>one char in a set / range / not in a set</td></tr>
        <tr><td><code>*</code> <code>+</code> <code>?</code></td><td>0+ / 1+ / 0-or-1 of the thing before</td></tr>
        <tr><td><code>{2}</code> <code>{2,4}</code></td><td>exactly 2 / between 2 and 4</td></tr>
        <tr><td><code>^</code> <code>$</code></td><td>start / end of the string</td></tr>
        <tr><td><code>(...)</code></td><td>a <strong>capture group</strong> — pull this part out</td></tr>
        <tr><td><code>a|b</code></td><td>a or b</td></tr>
      </table>
      <div class="note"><b>Always use raw strings</b> for patterns:
      <code>r"\\d+"</code>, not <code>"\\d+"</code> — so Python doesn't eat the backslashes first.</div>` },
    { type: "code", title: "search / match / fullmatch", code: `import re
text = "order 4472 shipped"
m = re.search(r"\\d+", text)      # first match anywhere
print(m)
print(m.group())                # the matched text
print(re.search(r"^\\d+$", "12345").group())   # whole string is digits
print(re.match(r"\\d+", "abc123"))              # match() anchors at the start -> None` },

    { type: "html", html: `
      <h2>2 · findall, finditer, sub, split</h2>` },
    { type: "code", title: "Working over all matches", code: `import re
log = "cat=3 dog=10 fish=2"
print(re.findall(r"\\d+", log))                 # ['3', '10', '2']
print(re.findall(r"(\\w+)=(\\d+)", log))        # [('cat','3'), ('dog','10'), ('fish','2')]

print(re.sub(r"\\d+", "#", log))                # replace every number
print(re.split(r"\\s+", "a  b   c"))            # split on runs of whitespace` },
    { type: "html", html: whatif([
      "your pattern is <code>\\d*</code> (zero or more) on the string <code>\"abc\"</code> — does <code>search</code> match? what does it capture?",
      "you forget the <code>r</code> prefix and write <code>\"\\d+\"</code> — does it still work? why is <code>r\"...\"</code> the habit?",
      "<code>.+</code> is 'greedy' — on <code>\"&lt;a&gt;&lt;b&gt;\"</code> what does <code>&lt;.+&gt;</code> match vs <code>&lt;.+?&gt;</code>?",
    ]) },

    { type: "html", html: `
      <h2>3 · Groups &amp; a compiled pattern</h2>
      <p>Parentheses capture; <code>m.group(1)</code>, <code>m.group(2)</code> pull them out
      (<code>m.groups()</code> gives the tuple). <code>re.compile(pattern)</code> once, reuse many
      times.</p>` },
    { type: "code", title: "Parse a date", code: `import re
pat = re.compile(r"(\\d{4})-(\\d{2})-(\\d{2})")
m = pat.search("today is 2026-08-28 ok")
print(m.groups())
year, month, day = m.groups()
print(f"{day}/{month}/{year}")` },
    { type: "html", html: `
      <div class="warn"><b>Don't reach for regex when a string method will do.</b>
      <code>"a,b,c".split(",")</code>, <code>s.startswith("http")</code>, <code>"x" in s</code> are
      clearer and faster. Regex earns its keep on <em>structured</em> patterns.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>re.search</code> (anywhere), <code>re.match</code> (at start), <code>re.fullmatch</code> (whole string).</li>
        <li><code>re.findall</code> → list, <code>re.finditer</code> → match iterator, <code>re.sub</code> → replace, <code>re.split</code>.</li>
        <li>A no-match returns <code>None</code> — check before <code>.group()</code>.</li>
        <li><code>(...)</code> captures; <code>m.group(n)</code> / <code>m.groups()</code>. Use raw strings <code>r"..."</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — re module", url: "https://docs.python.org/3/library/re.html" },
    { label: "Python HOWTO — Regular Expression HOWTO", url: "https://docs.python.org/3/howto/regex.html" },
    { label: "regex101 — interactive tester", url: "https://regex101.com/" },
  ],
  exercises: [
    {
      title: "First number",
      tier: "warm", uses: ["re.search", ".group()"],
      prompt: `<p>Define <code>first_number(s)</code> returning the first run of digits in <code>s</code> as
        a string, or <code>""</code> if there is none.</p>`,
      solution: `import re\n\ndef first_number(s):\n    m = re.search(r"\\d+", s)\n    return m.group() if m else ""`,
      success: "search returns a match object or None — guard before .group().",
      mustDefine: ["first_number"],
      tests: [
        { append: `print(first_number("room 402, floor 3"))`, expect: "402" },
        { append: `print(first_number("no digits here"))`, expect: "" },
      ],
    },
    {
      title: "All the numbers",
      tier: "warm", uses: ["re.findall"],
      prompt: `<p>Define <code>all_numbers(s)</code> returning a list of every digit-run in <code>s</code>,
        <strong>as integers</strong>.</p>`,
      solution: `import re\n\ndef all_numbers(s):\n    out = []\n    for x in re.findall(r"\\d+", s):\n        out.append(int(x))\n    return out`,
      success: "findall gives strings; cast each.",
      mustDefine: ["all_numbers"],
      tests: [
        { append: `print(all_numbers("a1b22c333"))`, expect: "[1, 22, 333]" },
        { append: `print(all_numbers("none"))`, expect: "[]" },
      ],
    },
    {
      title: "Valid identifier?",
      tier: "core", uses: ["re.fullmatch", "^ $ anchors", "character classes"],
      prompt: `<p>Define <code>is_identifier(s)</code>: <code>True</code> if <code>s</code> is a letter or
        underscore followed by any number of letters, digits, or underscores (a Python-name shape).</p>`,
      solution: `import re\n\ndef is_identifier(s):\n    return re.fullmatch(r"[A-Za-z_]\\w*", s) is not None`,
      success: "fullmatch means the WHOLE string must fit the pattern.",
      mustDefine: ["is_identifier"],
      tests: [
        { append: `print(is_identifier("_x1"), is_identifier("2fast"), is_identifier("total_count"), is_identifier("a b"))`, expect: "True False True False" },
      ],
    },
    {
      title: "Mask card numbers",
      tier: "core", uses: ["re.sub"],
      prompt: `<p>Define <code>mask(s)</code> replacing every run of 4-or-more digits with the same number
        of <code>*</code>… actually simpler: replace every digit with <code>*</code>.</p>`,
      solution: `import re\n\ndef mask(s):\n    return re.sub(r"\\d", "*", s)`,
      success: "sub replaces every match of the pattern.",
      mustDefine: ["mask"],
      tests: [
        { append: `print(mask("card 4472 1234"))`, expect: "card **** ****" },
        { append: `print(mask("clean"))`, expect: "clean" },
      ],
    },
    {
      title: "Parse key=value pairs",
      tier: "challenge", uses: ["capture groups", "re.findall with groups", "dict (L8)"],
      prompt: `<p>Define <code>parse(s)</code> turning a string like <code>"a=1 b=22 c=3"</code> into a
        dict <code>{"a": 1, "b": 22, "c": 3}</code> (values as ints). Use one pattern with two groups.</p>`,
      solution: `import re\n\ndef parse(s):\n    out = {}\n    for k, v in re.findall(r"(\\w+)=(\\d+)", s):\n        out[k] = int(v)\n    return out`,
      success: "findall with groups yields a list of tuples — one per match.",
      mustDefine: ["parse"],
      tests: [
        { append: `print(parse("a=1 b=22 c=3"))`, expect: "{'a': 1, 'b': 22, 'c': 3}" },
        { append: `print(parse(""))`, expect: "{}" },
      ],
    },
    {
      title: "Greedy vs lazy",
      tier: "challenge", uses: ["quantifiers", ".+ vs .+?", "re.findall"],
      prompt: `<p>Define <code>tags(s)</code> returning a list of the <em>tag names</em> inside
        <code>&lt;...&gt;</code> — e.g. <code>"&lt;p&gt;hi&lt;/p&gt;"</code> &rarr;
        <code>['p', '/p']</code>. You'll need a <strong>non-greedy</strong> match so
        <code>&lt;p&gt;hi&lt;/p&gt;</code> isn't captured as one blob.</p>`,
      solution: `import re\n\ndef tags(s):\n    return re.findall(r"<(.+?)>", s)`,
      success: "<(.+?)> stops at the first '>'; <(.+)> would grab everything to the last one.",
      mustDefine: ["tags"],
      tests: [
        { append: `print(tags("<p>hi</p><br/>"))`, expect: "['p', '/p', 'br/']" },
        { append: `print(tags("plain text"))`, expect: "[]" },
      ],
    },
    {
      title: "Simple email check",
      tier: "boss", uses: ["character classes", "anchors", "escaping the dot", "fullmatch"],
      prompt: `<p>Define <code>is_email(s)</code>: one-or-more of <code>[\\w.-]</code>, then <code>@</code>,
        then one-or-more of <code>[\\w-]</code>, then a literal <code>.</code>, then 2–6 letters —
        matching the <strong>whole</strong> string, case-insensitively.</p>`,
      solution: `import re\n\ndef is_email(s):\n    return re.fullmatch(r"[\\w.-]+@[\\w-]+\\.[A-Za-z]{2,6}", s) is not None`,
      success: "A real email regex is monstrous — this catches the common shape, which is usually enough.",
      mustDefine: ["is_email"],
      tests: [
        { append: `print(is_email("ada.lovelace@example.com"))`, expect: "True" },
        { append: `print(is_email("bob@school.edu"))`, expect: "True" },
        { append: `print(is_email("no-at-sign.com"), is_email("a@b"), is_email("x@y.toolongtld"))`, expect: "False False False" },
      ],
    },
  ],
},

/* ========================================================== 24 */
{
  id: "variable-scope",
  section: "Modules",
  title: "Variable Scope",
  summary: "Where a name is visible: the LEGB rule, why assignment makes a name local, and the global / nonlocal keywords.",
  lead: "You've relied on scope working 'the obvious way' since Lesson 10. Here's the actual rule — and the two keywords for the cases where obvious isn't enough.",
  spiral: ["functions & parameters (L10)", "closures inside decorators (L21)", "nested functions", "UnboundLocalError / NameError (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · LEGB — the lookup order</h2>
      <p>When Python sees a name, it searches four scopes, in order:</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LEGB scope layers">
        <rect x="20" y="10" width="520" height="180" rx="10" fill="none" stroke="var(--line)"/>
        <text x="30" y="28" font-size="11" font-family="monospace" fill="var(--ink-soft)">B — Built-in (print, len, range…)</text>
        <rect x="45" y="36" width="470" height="146" rx="10" fill="none" stroke="var(--line)"/>
        <text x="55" y="54" font-size="11" font-family="monospace" fill="var(--ink-soft)">G — Global (module top level)</text>
        <rect x="70" y="62" width="420" height="112" rx="10" fill="none" stroke="var(--box-line)"/>
        <text x="80" y="80" font-size="11" font-family="monospace" fill="var(--ink-soft)">E — Enclosing (outer function)</text>
        <rect x="95" y="88" width="370" height="78" rx="10" fill="var(--box)" stroke="var(--box-line)"/>
        <text x="105" y="106" font-size="11" font-family="monospace" fill="var(--accent)">L — Local (this function) — searched first</text>
        <text x="115" y="132" font-size="12" font-family="monospace" fill="var(--ink)">x = 1   # looked up L → E → G → B</text>
      </svg>`, `First hit wins. A name not found anywhere is a NameError.`)}
    ` },
    { type: "code", title: "Reading from an outer scope is automatic", code: `TAX = 0.2                     # global

def price_with_tax(base):
    def add_tax(n):
        return n + n * TAX    # TAX found in Global; base found in Enclosing
    return add_tax(base)

print(price_with_tax(100))` },

    { type: "html", html: `
      <h2>2 · Assignment makes a name <strong>local</strong></h2>
      <p>If a function <em>assigns</em> to a name <em>anywhere</em> in its body, that name is local for
      the whole function — even on lines before the assignment. Reading it first is an
      <code>UnboundLocalError</code>.</p>` },
    { type: "code", title: "The classic gotcha", code: `count = 0

def bump_broken():
    # count += 1  would be:  count = count + 1
    # -> 'count' is local (it's assigned), but read before it's set -> UnboundLocalError
    count = count + 1
    return count

try:
    bump_broken()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)` },
    { type: "html", html: whatif([
      "the function only <em>reads</em> <code>count</code> (no assignment) — does it see the global? (yes)",
      "you add <code>count = 5</code> as the <em>last</em> line — is <code>count</code> local on the <em>first</em> line? (yes)",
      "there's no global <code>count</code> at all and the function reads it — <code>NameError</code> or <code>UnboundLocalError</code>?",
    ]) },

    { type: "html", html: `
      <h2>3 · <code>global</code> and <code>nonlocal</code></h2>
      <p><code>global x</code> — "assignments to <code>x</code> in here change the module-level
      <code>x</code>". <code>nonlocal x</code> — "…change <code>x</code> in the nearest enclosing
      function". Use both sparingly; passing values in and returning them out is usually cleaner.</p>` },
    { type: "code", title: "When you actually need them", code: `hits = 0
def record():
    global hits
    hits += 1

record(); record(); record()
print("hits:", hits)

def make_counter():
    n = 0
    def step():
        nonlocal n           # rebind the enclosing n, don't shadow it
        n += 1
        return n
    return step

c = make_counter()
print(c(), c(), c())` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Name lookup order: <strong>L</strong>ocal → <strong>E</strong>nclosing → <strong>G</strong>lobal → <strong>B</strong>uilt-in.</li>
        <li>Reading an outer name is free; <em>assigning</em> a name makes it local for the whole function.</li>
        <li><code>global x</code> / <code>nonlocal x</code> let assignments reach the module / enclosing scope.</li>
        <li>Prefer parameters and return values; reach for <code>global</code>/<code>nonlocal</code> only for counters, caches, closures.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Scopes and Namespaces", url: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces" },
    { label: "Python docs — global / nonlocal statements", url: "https://docs.python.org/3/reference/simple_stmts.html#the-global-statement" },
    { label: "Real Python — Python Scope & the LEGB Rule", url: "https://realpython.com/python-scope-legb-rule/" },
  ],
  exercises: [
    {
      title: "Read the global",
      tier: "warm", uses: ["reading an outer name (LEGB)"],
      prompt: `<p><code>RATE = 3</code> is defined at module level. Define <code>apply(n)</code> returning
        <code>n * RATE</code> — no <code>global</code> needed, just read it.</p>`,
      solution: `RATE = 3\n\ndef apply(n):\n    return n * RATE`,
      success: "Reading an enclosing/global name works automatically.",
      mustDefine: ["apply"],
      tests: [
        { append: `print(apply(10))`, expect: "30" },
      ],
    },
    {
      title: "Spot the shadow",
      tier: "warm", uses: ["local shadows global", "no mutation of the global"],
      prompt: `<p><code>x = 100</code> at module level. Define <code>f()</code> that sets a <em>local</em>
        <code>x = 1</code> and returns it. After calling <code>f()</code>, the module <code>x</code>
        must still be <code>100</code>. The test prints <code>f()</code> then <code>x</code>.</p>
        <pre>1\n100</pre>`,
      solution: `x = 100\n\ndef f():\n    x = 1\n    return x`,
      success: "Assigning x inside f creates a separate local — the global is untouched.",
      mustDefine: ["f"],
      tests: [
        { append: `print(f())\nprint(x)`, expect: "1\n100" },
      ],
    },
    {
      title: "global counter",
      tier: "core", uses: ["global keyword", "mutating a module variable"],
      prompt: `<p><code>total = 0</code> at module level. Define <code>add(n)</code> that adds <code>n</code>
        to the module-level <code>total</code> (using <code>global</code>) and returns nothing.</p>`,
      solution: `total = 0\n\ndef add(n):\n    global total\n    total += n`,
      success: "global total lets the += reach the module variable.",
      mustDefine: ["add"],
      require: [{ pattern: "global\\s+total", hard: true, message: "Use the `global total` statement." }],
      tests: [
        { append: `add(5)\nadd(10)\nadd(2)\nprint(total)`, expect: "17" },
      ],
    },
    {
      title: "make_counter",
      tier: "core", uses: ["nonlocal", "closure (L21)", "return a function (L10)"],
      prompt: `<p>Define <code>make_counter()</code> returning a function that returns 1 on its first call,
        2 on its second, and so on — using <code>nonlocal</code> over a variable in
        <code>make_counter</code>.</p>`,
      solution: `def make_counter():\n    n = 0\n    def step():\n        nonlocal n\n        n += 1\n        return n\n    return step`,
      success: "nonlocal n rebinds the enclosing n instead of shadowing it.",
      mustDefine: ["make_counter"],
      require: [{ pattern: "nonlocal\\s+n", hard: true, message: "Use `nonlocal n` in the inner function." }],
      tests: [
        { append: `c = make_counter()\nprint(c(), c(), c())\nd = make_counter()\nprint(d())`, expect: "1 2 3\n1" },
      ],
    },
    {
      title: "Fix the UnboundLocalError",
      tier: "challenge", uses: ["why assignment makes a name local", "global"],
      prompt: `<p><code>score = 0</code> at module level. The intent: <code>bump()</code> should increase
        the module <code>score</code> by 1 each call and return the new value. Write it correctly (the
        naive <code>score = score + 1</code> without <code>global</code> raises
        <code>UnboundLocalError</code>).</p>`,
      solution: `score = 0\n\ndef bump():\n    global score\n    score += 1\n    return score`,
      success: "Declare the intent to write the global, then += works.",
      mustDefine: ["bump"],
      tests: [
        { append: `print(bump(), bump(), bump())\nprint(score)`, expect: "1 2 3\n3" },
      ],
    },
    {
      title: "running_stats()",
      tier: "boss", uses: ["nonlocal over several vars", "closure returning a dict of functions", "L10 + L21"],
      prompt: `<p>Define <code>running_stats()</code> returning a tuple <code>(add, summary)</code> of two
        functions sharing enclosed state. <code>add(x)</code> records a number; <code>summary()</code>
        returns <code>(count, total, average)</code> with average rounded to 2dp (or
        <code>(0, 0, 0)</code> before any adds).</p>`,
      solution: `def running_stats():\n    count = 0\n    total = 0\n    def add(x):\n        nonlocal count, total\n        count += 1\n        total += x\n    def summary():\n        if count == 0:\n            return (0, 0, 0)\n        return (count, total, round(total / count, 2))\n    return add, summary`,
      success: "Two closures over the same enclosing variables — a tiny object without a class.",
      mustDefine: ["running_stats"],
      tests: [
        { append: `add, summary = running_stats()\nprint(summary())\nadd(10); add(20); add(30)\nprint(summary())`, expect: "(0, 0, 0)\n(3, 60, 20.0)" },
      ],
    },
  ],
},

/* ========================================================== 25 */
{
  id: "list-comprehensions",
  section: "Package Managers & Idioms",
  title: "List Comprehensions",
  summary: "Build a list from a loop in one expression: [f(x) for x in xs if cond] — and the dict/set versions.",
  lead: "The 'make a list by looping, transforming, maybe filtering' pattern is so common Python gave it a one-line form. Used well, it reads like a sentence.",
  spiral: ["for loops & accumulate-into-a-list (L6, L7)", "if as a filter (L5)", "map / filter / lambda (L20)", "dicts & sets (L7, L8)", "functions (L10)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · From loop to comprehension</h2>
      <p>These build the same list:</p>` },
    { type: "code", title: "The transformation", code: `# the long way
squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)

# the comprehension
squares = [n * n for n in range(1, 6)]
print(squares)` },
    { type: "html", html: `
      <p>Read it left to right as <em>"[ <b>expression</b> &nbsp; for &nbsp; <b>item</b> &nbsp; in
      &nbsp; <b>iterable</b> &nbsp; if &nbsp; <b>condition</b> ]"</em>. The <code>if</code> at the end
      <strong>filters</strong>; an <code>if/else</code> in <em>front</em> of the <code>for</code> is a
      conditional <strong>expression</strong> that transforms.</p>` },
    { type: "code", title: "Filter vs transform", code: `nums = [1, 2, 3, 4, 5, 6, 7, 8]

print([n for n in nums if n % 2 == 0])          # filter: keep evens
print([n * 10 for n in nums if n % 2 == 0])     # filter then transform
print(["even" if n % 2 == 0 else "odd" for n in nums])   # transform every item

pairs = [(x, y) for x in range(3) for y in range(3) if x < y]   # nested loops
print(pairs)` },
    { type: "html", html: whatif([
      "you put the <code>if x % 2</code> <em>before</em> the <code>for</code> without an <code>else</code> — syntax error or not?",
      "the comprehension has two <code>for</code> clauses — which one is the outer loop?",
      "you build <code>[print(n) for n in range(3)]</code> — what's in the resulting list, and why is this a bad idea?",
    ]) },

    { type: "html", html: `
      <h2>2 · Dict and set comprehensions</h2>` },
    { type: "code", title: "Same shape, different braces", code: `words = ["apple", "banana", "cherry"]

print({w: len(w) for w in words})               # dict: {key: value for ...}
print({len(w) for w in words})                  # set: unique lengths
print({w[0].upper() for w in words})            # set of first letters` },

    { type: "html", html: `
      <h2>3 · When NOT to</h2>
      <div class="warn"><b>Keep them small.</b>
      If it wraps two lines, has multiple <code>if</code>s, or you'd struggle to say it aloud — use a
      normal loop. Comprehensions are for <em>readability</em>, not for winning a code-golf. And never
      use one just for its side effects (the <code>[print(...) ...]</code> anti-pattern).</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>[expr for x in xs]</code> — transform. Add <code>if cond</code> at the end to filter.</li>
        <li><code>[a if c else b for x in xs]</code> — conditional expression in front transforms every item.</li>
        <li><code>{k: v for ...}</code> dict, <code>{expr for ...}</code> set.</li>
        <li>Multiple <code>for</code>s = nested loops, left = outer. Reach for a plain loop when it gets hairy.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — List Comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions" },
    { label: "Python Tutorial — Nested & dict/set comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions" },
    { label: "Real Python — When to Use a List Comprehension", url: "https://realpython.com/list-comprehension-python/" },
  ],
  exercises: [
    {
      title: "Squares",
      tier: "warm", uses: ["basic comprehension"],
      prompt: `<p>Using a list comprehension, print the squares of <code>1..10</code>.</p>
        <pre>[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]</pre>`,
      solution: `print([n * n for n in range(1, 11)])`,
      success: "[expr for x in iterable].",
      require: [{ pattern: "\\[.*for .*in .*\\]", hard: true, message: "Use a list comprehension." }],
      tests: [{ expect: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]" }],
    },
    {
      title: "Keep the evens",
      tier: "warm", uses: ["comprehension with if filter"],
      prompt: `<p>Given <code>nums = [4, 7, 2, 9, 6, 1, 8]</code>, print a list of just the even ones, in
        order, using a comprehension.</p><pre>[4, 2, 6, 8]</pre>`,
      starter: `nums = [4, 7, 2, 9, 6, 1, 8]\n`,
      solution: `nums = [4, 7, 2, 9, 6, 1, 8]\nprint([n for n in nums if n % 2 == 0])`,
      success: "The trailing `if` filters.",
      require: [{ pattern: "\\[.*for .*in .*if.*\\]", hard: true, message: "Use a comprehension with an `if` filter." }],
      tests: [{ expect: "[4, 2, 6, 8]" }],
    },
    {
      title: "Labels",
      tier: "core", uses: ["conditional expression in front", "% (L3)"],
      prompt: `<p>Define <code>labels(nums)</code> returning a list where each number becomes
        <code>"fizz"</code> if divisible by 3, else the number itself — via one comprehension with an
        <code>if/else</code> in front.</p>`,
      solution: `def labels(nums):\n    return ["fizz" if n % 3 == 0 else n for n in nums]`,
      success: "a if cond else b — before the for — transforms every item.",
      mustDefine: ["labels"],
      tests: [
        { append: `print(labels([1, 2, 3, 4, 5, 6]))`, expect: "[1, 2, 'fizz', 4, 5, 'fizz']" },
      ],
    },
    {
      title: "Word lengths dict",
      tier: "core", uses: ["dict comprehension", "len (L4)"],
      prompt: `<p>Define <code>lengths(words)</code> returning <code>{word: len(word)}</code> for every
        word, using a dict comprehension.</p>`,
      solution: `def lengths(words):\n    return {w: len(w) for w in words}`,
      success: "{key: value for x in xs}.",
      mustDefine: ["lengths"],
      require: [{ pattern: "\\{.*:.*for .*in.*\\}", hard: true, message: "Use a dict comprehension." }],
      tests: [
        { append: `print(lengths(["a", "bb", "ccc"]))`, expect: "{'a': 1, 'bb': 2, 'ccc': 3}" },
      ],
    },
    {
      title: "Unique initials",
      tier: "core", uses: ["set comprehension", "string indexing (L4)"],
      prompt: `<p>Define <code>initials(names)</code> returning a <strong>set</strong> of uppercase first
        letters. <code>initials(["ada", "bo", "amy"])</code> &rarr; <code>{'A', 'B'}</code>.</p>`,
      solution: `def initials(names):\n    return {n[0].upper() for n in names}`,
      success: "{expr for x in xs} with braces and no colon = a set.",
      mustDefine: ["initials"],
      tests: [
        { append: `print(sorted(initials(["ada", "bo", "amy", "ben"])))`, expect: "['A', 'B']" },
      ],
    },
    {
      title: "Flatten one level",
      tier: "challenge", uses: ["two for clauses", "nested iteration"],
      prompt: `<p>Define <code>flatten(rows)</code> — given a list of lists, return a single flat list —
        using one comprehension with two <code>for</code> clauses.
        <code>flatten([[1, 2], [3], [4, 5]])</code> &rarr; <code>[1, 2, 3, 4, 5]</code>.</p>`,
      solution: `def flatten(rows):\n    return [x for row in rows for x in row]`,
      success: "Left `for` is the outer loop, right `for` the inner — same order you'd nest them.",
      mustDefine: ["flatten"],
      tests: [
        { append: `print(flatten([[1, 2], [3], [4, 5]]))`, expect: "[1, 2, 3, 4, 5]" },
        { append: `print(flatten([]))`, expect: "[]" },
      ],
    },
    {
      title: "Pythagorean triples",
      tier: "boss", uses: ["three for clauses", "if filter", "tuples (L7)"],
      prompt: `<p>Define <code>triples(n)</code> returning a list of tuples <code>(a, b, c)</code> with
        <code>1 &le; a &le; b &le; c &le; n</code> and <code>a*a + b*b == c*c</code>, using a single
        comprehension.</p>`,
      solution: `def triples(n):\n    return [(a, b, c) for a in range(1, n + 1) for b in range(a, n + 1) for c in range(b, n + 1) if a * a + b * b == c * c]`,
      success: "Readable enough — but past three `for`s / two `if`s, switch to a loop.",
      mustDefine: ["triples"],
      tests: [
        { append: `print(triples(20))`, expect: "[(3, 4, 5), (5, 12, 13), (6, 8, 10), (8, 15, 17), (9, 12, 15), (12, 16, 20)]" },
        { append: `print(triples(4))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 26 */
{
  id: "generator-expressions",
  section: "Package Managers & Idioms",
  title: "Generator Expressions",
  summary: "A comprehension that stays lazy: (expr for x in xs) yields one value at a time, using almost no memory.",
  lead: "Swap a comprehension's [ ] for ( ) and it stops building a list — it becomes an iterator that computes each value only when asked. Perfect for feeding sum/any/max or streaming huge data.",
  spiral: ["comprehensions (L25)", "iterators & laziness (L22)", "yield-style thinking", "sum / any / all / max (L10)", "functions (L10)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Brackets vs parentheses</h2>` },
    { type: "code", title: "list vs generator", code: `nums = [1, 2, 3, 4, 5]

lst = [n * n for n in nums]      # a list: all 5 values built now, held in memory
gen = (n * n for n in nums)      # a generator: nothing computed yet

print(lst)
print(gen)                       # <generator object ...>
print(next(gen))                 # 1  -- computed on demand
print(list(gen))                 # [4, 9, 16, 25]  -- the rest; gen is now spent` },
    { type: "html", html: `
      <div class="tip"><b>When the parens are already there</b>
      <code>sum(n * n for n in nums)</code> — no extra <code>()</code> needed inside a single-argument
      call. This is the most common way you'll write one.</div>` },
    { type: "code", title: "Feeding aggregate functions", code: `words = ["hi", "there", "friend", "yo"]

print(sum(len(w) for w in words))            # total characters, no list built
print(max(len(w) for w in words))            # longest word length
print(any(len(w) > 5 for w in words))        # is there a word longer than 5?
print(all(w.islower() for w in words))       # are they all lowercase?` },
    { type: "html", html: whatif([
      "you call <code>list(gen)</code> twice on the same generator — what does the second call give?",
      "you write <code>sum([n for n in range(10**8)])</code> vs <code>sum(n for n in range(10**8))</code> — which one risks running out of memory?",
      "<code>any(...)</code> over a generator — does it keep evaluating after it finds the first <code>True</code>? (no — short-circuits)",
    ]) },

    { type: "html", html: `
      <h2>2 · <code>yield</code>: the generator <em>function</em></h2>
      <p>A <code>def</code> with <code>yield</code> instead of <code>return</code> is a
      <strong>generator function</strong>. Calling it runs nothing; it returns a generator. Each
      <code>next()</code> runs to the next <code>yield</code>, hands back that value, and <em>pauses</em>
      — local state and all — until asked again.</p>` },
    { type: "code", title: "A generator function", code: `def first_n_squares(n):
    for i in range(1, n + 1):
        yield i * i          # pause here, resume on the next next()

g = first_n_squares(4)
print(list(g))

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>(expr for x in xs)</code> — a lazy iterator, not a list. One value per <code>next()</code>.</li>
        <li>Drop the inner <code>()</code> when it's the sole argument: <code>sum(x for x in xs)</code>.</li>
        <li>Great for <code>sum/any/all/max/min/join</code> and for pipelines over big/infinite data.</li>
        <li>A <code>def</code> with <code>yield</code> is a generator function — it pauses at each <code>yield</code>.</li>
        <li>Generators are one-shot (Lesson 22) — consumed once, then empty.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Generator Expressions", url: "https://docs.python.org/3/tutorial/classes.html#generator-expressions" },
    { label: "PEP 289 — Generator Expressions", url: "https://peps.python.org/pep-0289/" },
    { label: "Real Python — Introduction to Python Generators", url: "https://realpython.com/introduction-to-python-generators/" },
  ],
  exercises: [
    {
      title: "Sum of squares, lazily",
      tier: "warm", uses: ["genexpr as sole arg", "sum (L10)"],
      prompt: `<p>Print the sum of the squares of <code>1..100</code> using a generator expression inside
        <code>sum(...)</code> (no square brackets).</p><pre>338350</pre>`,
      solution: `print(sum(n * n for n in range(1, 101)))`,
      success: "sum(n*n for n in ...) — no list is ever built.",
      require: [{ pattern: "sum\\(\\s*[^\\[]*for .*in", hard: true, message: "Use a generator expression (no [ ]) inside sum()." }],
      tests: [{ expect: "338350" }],
    },
    {
      title: "Any long word?",
      tier: "warm", uses: ["any + genexpr", "len (L4)"],
      prompt: `<p>Define <code>has_long(words, n)</code> returning <code>True</code> if any word is longer
        than <code>n</code> characters, using <code>any(...)</code> with a generator expression.</p>`,
      solution: `def has_long(words, n):\n    return any(len(w) > n for w in words)`,
      success: "any short-circuits — stops at the first True.",
      mustDefine: ["has_long"],
      tests: [
        { append: `print(has_long(["hi", "hello", "hey"], 4))`, expect: "True" },
        { append: `print(has_long(["a", "bb"], 4))`, expect: "False" },
      ],
    },
    {
      title: "Total price",
      tier: "core", uses: ["genexpr over tuples", "sum", "unpacking in a for"],
      prompt: `<p>Given <code>cart = [("pen", 2, 3), ("pad", 5, 1), ("ink", 4, 2)]</code> as
        <code>(name, price, qty)</code>, define <code>total(cart)</code> returning the sum of
        <code>price * qty</code> across the cart, with a generator expression.</p>`,
      solution: `def total(cart):\n    return sum(price * qty for name, price, qty in cart)`,
      success: "Unpack right in the `for` clause, multiply in the expression.",
      mustDefine: ["total"],
      tests: [
        { append: `print(total([("pen", 2, 3), ("pad", 5, 1), ("ink", 4, 2)]))`, expect: "19" },
        { append: `print(total([]))`, expect: "0" },
      ],
    },
    {
      title: "join with a genexpr",
      tier: "core", uses: ["str.join (L4)", "genexpr", "str() (L9)"],
      prompt: `<p>Define <code>csv_line(values)</code> returning the values joined by commas, each
        converted to a string. <code>csv_line([1, "a", True])</code> &rarr; <code>"1,a,True"</code>.
        Use <code>",".join(...)</code> with a generator expression.</p>`,
      solution: `def csv_line(values):\n    return ",".join(str(v) for v in values)`,
      success: "join needs strings; the genexpr converts each on the fly.",
      mustDefine: ["csv_line"],
      tests: [
        { append: `print(csv_line([1, "a", True]))`, expect: "1,a,True" },
        { append: `print(csv_line([]))`, expect: "" },
      ],
    },
    {
      title: "Generator function: evens",
      tier: "challenge", uses: ["yield", "while / for (L6)"],
      prompt: `<p>Define <code>evens_up_to(n)</code> as a <strong>generator function</strong> (uses
        <code>yield</code>) that yields <code>2, 4, 6, …</code> up to and including <code>n</code>.</p>`,
      solution: `def evens_up_to(n):\n    i = 2\n    while i <= n:\n        yield i\n        i += 2`,
      success: "yield pauses the function; each next() resumes it.",
      mustDefine: ["evens_up_to"],
      require: [{ pattern: "yield", hard: true, message: "Use `yield` — it must be a generator function." }],
      tests: [
        { append: `print(list(evens_up_to(10)))`, expect: "[2, 4, 6, 8, 10]" },
        { append: `print(list(evens_up_to(1)))`, expect: "[]" },
        { append: `g = evens_up_to(100)\nprint(next(g), next(g))`, expect: "2 4" },
      ],
    },
    {
      title: "Running sums",
      tier: "challenge", uses: ["yield inside a loop", "accumulator (L6)"],
      prompt: `<p>Define <code>running_sum(nums)</code> — a generator that yields the cumulative total
        after each item. <code>list(running_sum([1, 2, 3, 4]))</code> &rarr; <code>[1, 3, 6, 10]</code>.</p>`,
      solution: `def running_sum(nums):\n    total = 0\n    for n in nums:\n        total += n\n        yield total`,
      success: "Keep the accumulator in a local, yield it each pass.",
      mustDefine: ["running_sum"],
      require: [{ pattern: "yield", hard: true, message: "Use `yield`." }],
      tests: [
        { append: `print(list(running_sum([1, 2, 3, 4])))`, expect: "[1, 3, 6, 10]" },
        { append: `print(list(running_sum([])))`, expect: "[]" },
      ],
    },
    {
      title: "take from an infinite generator",
      tier: "boss", uses: ["infinite generator (yield)", "next() + break (L22)", "build a list"],
      prompt: `<p>Define <code>naturals()</code> — an <strong>infinite</strong> generator yielding
        <code>1, 2, 3, …</code> forever. Then define <code>first(gen, k)</code> returning a list of the
        first <code>k</code> values pulled from any generator. <code>first(naturals(), 5)</code> &rarr;
        <code>[1, 2, 3, 4, 5]</code>.</p>`,
      solution: `def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\ndef first(gen, k):\n    out = []\n    for _ in range(k):\n        out.append(next(gen))\n    return out`,
      success: "An infinite generator is fine — laziness means it never tries to finish.",
      mustDefine: ["naturals", "first"],
      tests: [
        { append: `print(first(naturals(), 5))`, expect: "[1, 2, 3, 4, 5]" },
        { append: `g = naturals()\nfirst(g, 3)\nprint(first(g, 2))`, expect: "[4, 5]" },
      ],
    },
  ],
},

/* ========================================================== 27 */
{
  id: "context-managers",
  section: "Package Managers & Idioms",
  title: "Context Manager",
  summary: "The with statement: guaranteed setup and cleanup via __enter__ / __exit__, or @contextmanager.",
  lead: "Open a file, acquire a lock, start a timer — and be certain it's closed / released / stopped even if the code in between blows up. That's what with guarantees.",
  spiral: ["exceptions & finally (L11)", "classes & __methods__ (L22 primer)", "decorators & yield (L21, L26)", "functions (L10)", "file handling (companion topic)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The problem <code>with</code> solves</h2>
      <p>Without it you'd write <code>try/finally</code> every time:</p>` },
    { type: "code", title: "try/finally vs with", code: `# the manual way
f = open("notes.txt", "w")
try:
    f.write("hello")
finally:
    f.close()          # runs no matter what

# the with way — same guarantee, no boilerplate
with open("notes.txt", "w") as f:
    f.write("hello again")
# f is closed here, exception or not

with open("notes.txt") as f:
    print(f.read())` },
    { type: "html", html: `
      <p><code>with EXPR as name:</code> calls <code>EXPR.__enter__()</code> (its result is bound to
      <code>name</code>), runs the block, then <em>always</em> calls <code>EXPR.__exit__(...)</code> —
      even on <code>return</code>, <code>break</code>, or an exception.</p>` },

    { type: "html", html: `
      <h2>2 · Write one as a class</h2>` },
    { type: "code", title: "A timing context manager", code: `import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self                          # what 'as t' receives
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        return False                         # False -> don't swallow exceptions

with Timer() as t:
    total = sum(range(1_000_00))
print("took", round(t.elapsed, 4), "seconds")` },
    { type: "html", html: whatif([
      "<code>__exit__</code> returns <code>True</code> — what happens to an exception raised inside the <code>with</code> block?",
      "the block raises before reaching the end — does <code>__exit__</code> still run?",
      "you open a file with <code>with</code> and <code>return</code> from inside the block — is the file closed?",
    ]) },

    { type: "html", html: `
      <h2>3 · The easy way: <code>@contextmanager</code></h2>
      <p><code>contextlib.contextmanager</code> turns a generator into a context manager. Code
      <em>before</em> <code>yield</code> is the setup; the value yielded is the <code>as</code> target;
      code <em>after</em> <code>yield</code> (best in a <code>finally</code>) is the cleanup.</p>` },
    { type: "code", title: "Generator-style", code: `from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    try:
        yield
    finally:
        print(f"</{name}>")

with tag("p"):
    print("  hello")` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>with expr as x:</code> — <code>__enter__</code> (setup, returns <code>x</code>), block, then <code>__exit__</code> (cleanup) — always.</li>
        <li><code>__exit__</code> returning <code>True</code> suppresses an exception; return <code>False</code> to let it propagate.</li>
        <li><code>@contextmanager</code> + a generator: setup, <code>yield value</code>, cleanup in <code>finally</code>.</li>
        <li>Use for files, locks, DB connections, temp state changes, timers — anything with a paired "open/close".</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — with statement & context managers", url: "https://docs.python.org/3/reference/compound_stmts.html#the-with-statement" },
    { label: "Python docs — contextlib", url: "https://docs.python.org/3/library/contextlib.html" },
    { label: "Real Python — Context Managers and the with Statement", url: "https://realpython.com/python-with-statement/" },
  ],
  exercises: [
    {
      title: "Write then read",
      tier: "warm", uses: ["with open (file handling preview)"],
      prompt: `<p>Using two <code>with open(...)</code> blocks, write <code>"line1\\nline2"</code> to
        <code>data.txt</code>, then read the whole file back and print it.</p><pre>line1\nline2</pre>`,
      solution: `with open("data.txt", "w") as f:\n    f.write("line1\\nline2")\nwith open("data.txt") as f:\n    print(f.read())`,
      success: "No explicit .close() — with handles it.",
      require: [{ pattern: "with\\s+open", hard: true, message: "Use `with open(...)`." }],
      tests: [{ expect: "line1\nline2" }],
    },
    {
      title: "Class context manager",
      tier: "core", uses: ["__enter__ / __exit__", "class (L22 primer)"],
      prompt: `<p>Define a class <code>Banner</code> that on entry prints <code>=== start ===</code> and on
        exit prints <code>=== end ===</code>. <code>__enter__</code> should return <code>self</code>;
        <code>__exit__</code> should return <code>False</code>.</p>`,
      solution: `class Banner:\n    def __enter__(self):\n        print("=== start ===")\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print("=== end ===")\n        return False`,
      success: "Two methods with the exact __enter__/__exit__ signatures.",
      mustDefine: ["Banner"],
      tests: [
        { append: `with Banner():\n    print("body")`, expect: "=== start ===\nbody\n=== end ===" },
      ],
    },
    {
      title: "Exit still runs on error",
      tier: "core", uses: ["__exit__ runs on exception", "try/except (L11)"],
      prompt: `<p>Using your <code>Banner</code>-style manager idea, define <code>Guard</code> whose
        <code>__exit__</code> prints <code>cleaned up</code> and returns <code>False</code>. Show it
        runs even when the block raises: the test raises inside and catches outside.</p>`,
      solution: `class Guard:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print("cleaned up")\n        return False`,
      success: "__exit__ fires on the way out no matter how you leave the block.",
      mustDefine: ["Guard"],
      tests: [
        { append: `try:\n    with Guard():\n        raise ValueError("boom")\nexcept ValueError as e:\n    print("caught", e)`, expect: "cleaned up\ncaught boom" },
      ],
    },
    {
      title: "@contextmanager",
      tier: "challenge", uses: ["contextlib.contextmanager", "yield (L26)", "try/finally (L11)"],
      prompt: `<p>Using <code>@contextmanager</code>, define <code>brackets()</code>: print <code>[</code>
        on entry, <code>]</code> on exit (in a <code>finally</code>), yielding nothing.</p>`,
      solution: `from contextlib import contextmanager\n\n@contextmanager\ndef brackets():\n    print("[")\n    try:\n        yield\n    finally:\n        print("]")`,
      success: "Before yield = setup, after (finally) = teardown.",
      mustDefine: ["brackets"],
      require: [{ pattern: "@contextmanager", hard: true, message: "Use the @contextmanager decorator." }],
      tests: [
        { append: `with brackets():\n    print("inside")`, expect: "[\ninside\n]" },
        { append: `try:\n    with brackets():\n        raise RuntimeError()\nexcept RuntimeError:\n    print("ok")`, expect: "[\n]\nok" },
      ],
    },
    {
      title: "Suppressing errors",
      tier: "challenge", uses: ["__exit__ return value controls propagation", "exc_type"],
      prompt: `<p>Define <code>ignore(*types)</code> as a class context manager: if the block raises an
        exception whose type is in <code>types</code>, swallow it (return <code>True</code> from
        <code>__exit__</code>); otherwise let it through.</p>`,
      solution: `class ignore:\n    def __init__(self, *types):\n        self.types = types\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return exc_type is not None and issubclass(exc_type, self.types)`,
      success: "Returning True from __exit__ tells Python 'handled, don't re-raise'.",
      mustDefine: ["ignore"],
      tests: [
        { append: `with ignore(ValueError):\n    int("nope")\nprint("survived")`, expect: "survived" },
        { append: `try:\n    with ignore(KeyError):\n        int("nope")\nexcept ValueError:\n    print("not swallowed")`, expect: "not swallowed" },
      ],
    },
    {
      title: "Temporary attribute",
      tier: "boss", uses: ["@contextmanager", "yield a value", "restore in finally", "dict as state"],
      prompt: `<p>Using <code>@contextmanager</code>, define <code>temp_set(d, key, value)</code>: inside
        the block, <code>d[key]</code> equals <code>value</code> (yield <code>d</code>); on exit,
        restore <code>d[key]</code> to whatever it was before (or remove it if it wasn't there).</p>`,
      solution: `from contextlib import contextmanager\n\n@contextmanager\ndef temp_set(d, key, value):\n    had = key in d\n    old = d.get(key)\n    d[key] = value\n    try:\n        yield d\n    finally:\n        if had:\n            d[key] = old\n        else:\n            del d[key]`,
      success: "Record the old state before changing it; restore it in the finally.",
      mustDefine: ["temp_set"],
      tests: [
        { append: `cfg = {"debug": False}\nwith temp_set(cfg, "debug", True) as c:\n    print(c["debug"])\nprint(cfg["debug"])`, expect: "True\nFalse" },
        { append: `cfg = {}\nwith temp_set(cfg, "x", 1):\n    print("x" in cfg)\nprint("x" in cfg)`, expect: "True\nFalse" },
      ],
    },
  ],
},

/* ========================================================== 28 */
{
  id: "package-managers",
  section: "Package Managers & Idioms",
  title: "Package Managers (PyPI, pip, Conda, uv, Poetry, pdm)",
  summary: "Where third-party code comes from and how to install it reproducibly: PyPI, pip, lockfiles, and the modern tools.",
  lead: "The standard library is huge, but everything else lives on PyPI. A package manager downloads it, resolves versions, and — crucially — lets someone else recreate your exact set-up.",
  spiral: ["import & modules (L19)", "reading config text", "string parsing & split (L4)", "comparisons for version logic (L3)", "functions (L10)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · PyPI + pip</h2>
      <p><strong>PyPI</strong> (the Python Package Index, <code>pypi.org</code>) hosts ~half a million
      packages. <strong>pip</strong> is the installer that ships with Python.</p>
      <table class="tbl">
        <tr><th>Command</th><th>Does</th></tr>
        <tr><td><code>pip install requests</code></td><td>download &amp; install the latest <code>requests</code> (+ its dependencies)</td></tr>
        <tr><td><code>pip install "django&gt;=4.2,&lt;5"</code></td><td>install within a version range</td></tr>
        <tr><td><code>pip install -r requirements.txt</code></td><td>install everything listed in a file</td></tr>
        <tr><td><code>pip freeze &gt; requirements.txt</code></td><td>write out every installed package + exact version</td></tr>
        <tr><td><code>pip uninstall requests</code></td><td>remove it</td></tr>
        <tr><td><code>pip list</code> / <code>pip show requests</code></td><td>inspect what's installed</td></tr>
      </table>
      <div class="note"><b>Always install into a virtual environment</b>, never system-wide — that's
      the Environments section. One project, one isolated set of packages.</div>` },

    { type: "html", html: `
      <h2>2 · Version specifiers &amp; lockfiles</h2>
      <p>A <em>requirement</em> like <code>flask&gt;=2.0</code> is a <em>range</em>. Resolving all your
      ranges together produces one concrete set of versions; writing that set down is a
      <strong>lockfile</strong> — so CI and teammates get byte-identical installs.</p>
      <table class="tbl">
        <tr><th>Specifier</th><th>Means</th></tr>
        <tr><td><code>==2.1.0</code></td><td>exactly this version</td></tr>
        <tr><td><code>&gt;=2.1</code></td><td>this or newer</td></tr>
        <tr><td><code>&gt;=2.1,&lt;3</code></td><td>2.1 up to (not including) 3.0</td></tr>
        <tr><td><code>~=2.1.0</code></td><td>"compatible release": <code>&gt;=2.1.0, &lt;2.2.0</code></td></tr>
      </table>` },
    { type: "code", title: "A requirements.txt is just lines", code: `reqs = """# runtime deps
requests==2.31.0
flask>=2.0
pytest>=7,<8

rich
"""
for line in reqs.splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    print(line)` },

    { type: "html", html: `
      <h2>3 · The tooling landscape</h2>
      <table class="tbl">
        <tr><th>Tool</th><th>What it is</th></tr>
        <tr><td><b>pip</b></td><td>the built-in installer. Low-level; no dependency locking on its own.</td></tr>
        <tr><td><b>venv</b></td><td>built-in; creates the isolated environment pip installs into.</td></tr>
        <tr><td><b>uv</b></td><td>very fast (Rust) drop-in for pip + venv + lock; the current momentum.</td></tr>
        <tr><td><b>Poetry</b></td><td>project + dependency manager: <code>pyproject.toml</code>, a lockfile, builds &amp; publishes.</td></tr>
        <tr><td><b>pdm</b></td><td>standards-focused alternative to Poetry (PEP 621 <code>pyproject.toml</code>).</td></tr>
        <tr><td><b>Conda</b></td><td>separate ecosystem; installs Python <em>and</em> non-Python binaries (great for data/science, CUDA, etc.).</td></tr>
      </table>
      <div class="predict"><b>Predict first</b>Two machines run <code>pip install flask</code> six months
      apart with no lockfile. Do they get the same Flask version? What would a lockfile change?</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Third-party code lives on <strong>PyPI</strong>; <strong>pip</strong> installs it.</li>
        <li>Requirements are <em>ranges</em>; a <strong>lockfile</strong> pins the resolved <em>exact</em> versions for reproducibility.</li>
        <li><code>requirements.txt</code> is the classic list; <code>pyproject.toml</code> (next lesson) is the modern home.</li>
        <li>pip/venv are built-in and low-level; <strong>uv / Poetry / pdm</strong> add locking &amp; project management; <strong>Conda</strong> is its own world for binary-heavy stacks.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "pip — user guide", url: "https://pip.pypa.io/en/stable/user_guide/" },
    { label: "Python Packaging User Guide — Tool recommendations", url: "https://packaging.python.org/en/latest/guides/tool-recommendations/" },
    { label: "uv documentation", url: "https://docs.astral.sh/uv/" },
    { label: "Poetry documentation", url: "https://python-poetry.org/docs/" },
  ],
  exercises: [
    {
      title: "Parse requirements.txt",
      tier: "warm", uses: ["splitlines / strip (L4)", "skip comments & blanks", "build a list (L7)"],
      prompt: `<p>Define <code>parse_reqs(text)</code> returning a list of requirement lines — trimmed,
        with blank lines and <code>#</code> comment lines removed.</p>`,
      solution: `def parse_reqs(text):\n    out = []\n    for line in text.splitlines():\n        line = line.strip()\n        if line and not line.startswith("#"):\n            out.append(line)\n    return out`,
      success: "Every requirements.txt reader does exactly this first.",
      mustDefine: ["parse_reqs"],
      tests: [
        { append: `t = "# deps\\nrequests==2.31.0\\n\\n  flask>=2.0  \\n# comment\\nrich\\n"\nprint(parse_reqs(t))`, expect: "['requests==2.31.0', 'flask>=2.0', 'rich']" },
        { append: `print(parse_reqs("# only comments\\n\\n"))`, expect: "[]" },
      ],
    },
    {
      title: "Split name and specifier",
      tier: "core", uses: ["string scanning (L4, L6)", "return a tuple (L7)"],
      prompt: `<p>Define <code>split_req(req)</code> returning <code>(name, specifier)</code> — the package
        name and the rest. Split at the first of <code>=</code> <code>&lt;</code> <code>&gt;</code>
        <code>~</code> <code>!</code>. If there's no specifier, return <code>(req, "")</code>.</p>`,
      solution: `def split_req(req):\n    for i, ch in enumerate(req):\n        if ch in "=<>~!":\n            return (req[:i].strip(), req[i:].strip())\n    return (req.strip(), "")`,
      success: "Scan for the first operator character; slice around it.",
      mustDefine: ["split_req"],
      tests: [
        { append: `print(split_req("flask>=2.0,<3"))`, expect: "('flask', '>=2.0,<3')" },
        { append: `print(split_req("requests==2.31.0"))`, expect: "('requests', '==2.31.0')" },
        { append: `print(split_req("rich"))`, expect: "('rich', '')" },
      ],
    },
    {
      title: "Which tool?",
      tier: "core", uses: ["dict lookup (L8)", "functions (L10)"],
      prompt: `<p>Define <code>tool_for(job)</code> mapping a short job name to a tool:
        <code>"fast-install"</code>&rarr;<code>"uv"</code>, <code>"lock-and-publish"</code>&rarr;<code>"poetry"</code>,
        <code>"non-python-binaries"</code>&rarr;<code>"conda"</code>, <code>"builtin-installer"</code>&rarr;<code>"pip"</code>.
        Unknown &rarr; <code>"pip"</code>.</p>`,
      solution: `def tool_for(job):\n    table = {\n        "fast-install": "uv",\n        "lock-and-publish": "poetry",\n        "non-python-binaries": "conda",\n        "builtin-installer": "pip",\n    }\n    return table.get(job, "pip")`,
      success: "A dict with .get(job, default) is the clean lookup.",
      mustDefine: ["tool_for"],
      tests: [
        { append: `print(tool_for("fast-install"), tool_for("lock-and-publish"), tool_for("mystery"))`, expect: "uv poetry pip" },
      ],
    },
    {
      title: "Compatible-release expansion",
      tier: "challenge", uses: ["string split (L4)", "int() (L9)", "f-strings (L4)"],
      prompt: `<p>Define <code>expand_tilde(spec)</code> turning <code>"~=2.1.0"</code> into the equivalent
        <code>">=2.1.0,&lt;2.2.0"</code> (bump the second number, drop the third to 0). Assume exactly
        three dotted parts after <code>~=</code>.</p>`,
      solution: `def expand_tilde(spec):\n    ver = spec[2:]\n    major, minor, patch = ver.split(".")\n    lower = ver\n    upper = f"{major}.{int(minor) + 1}.0"\n    return f">={lower},<{upper}"`,
      success: "~=X.Y.Z means >=X.Y.Z and <X.(Y+1).0.",
      mustDefine: ["expand_tilde"],
      tests: [
        { append: `print(expand_tilde("~=2.1.0"))`, expect: ">=2.1.0,<2.2.0" },
        { append: `print(expand_tilde("~=1.4.9"))`, expect: ">=1.4.9,<1.5.0" },
      ],
    },
    {
      title: "Version compare",
      tier: "boss", uses: ["split + int() (L4, L9)", "tuple comparison (L7)", "if/elif (L5)"],
      prompt: `<p>Define <code>satisfies(version, spec)</code> where <code>spec</code> is one of
        <code>"==X.Y.Z"</code>, <code>"&gt;=X.Y.Z"</code>, <code>"&lt;X.Y.Z"</code>. Compare the
        dotted versions <em>numerically</em> (turn each into a tuple of ints) and return a bool.</p>`,
      solution: `def satisfies(version, spec):\n    def parts(v):\n        return tuple(int(x) for x in v.split("."))\n    v = parts(version)\n    if spec.startswith("=="):\n        return v == parts(spec[2:])\n    if spec.startswith(">="):\n        return v >= parts(spec[2:])\n    if spec.startswith("<"):\n        return v < parts(spec[1:])\n    return False`,
      success: "Tuple comparison does version ordering for you: (2,10,0) > (2,9,0).",
      mustDefine: ["satisfies"],
      tests: [
        { append: `print(satisfies("2.10.0", ">=2.9.0"))`, expect: "True" },
        { append: `print(satisfies("2.1.0", "==2.1.0"), satisfies("3.0.0", "<3.0.0"), satisfies("1.2.9", "<1.3.0"))`, expect: "True False True" },
      ],
    },
  ],
},

/* ========================================================== 29 */
{
  id: "common-packages",
  section: "Package Managers & Idioms",
  title: "Common Packages",
  summary: "A field guide to the third-party libraries you'll meet everywhere — and the stdlib option to try first.",
  lead: "Before adding a dependency, ask: does the standard library already do this? Often yes. When it doesn't, here's the go-to for each job.",
  spiral: ["stdlib modules (L19)", "json / collections (L19)", "import conventions (L19)", "dicts (L8)", "functions (L10)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The map</h2>
      <table class="tbl">
        <tr><th>Job</th><th>Reach for</th><th>Try the stdlib first</th></tr>
        <tr><td>HTTP requests</td><td><code>requests</code>, <code>httpx</code></td><td><code>urllib.request</code></td></tr>
        <tr><td>Arrays &amp; math</td><td><code>numpy</code></td><td><code>array</code>, <code>statistics</code></td></tr>
        <tr><td>Tables / dataframes</td><td><code>pandas</code>, <code>polars</code></td><td><code>csv</code> + dicts</td></tr>
        <tr><td>Plotting</td><td><code>matplotlib</code>, <code>plotly</code></td><td>—</td></tr>
        <tr><td>Web API</td><td><code>fastapi</code>, <code>flask</code>, <code>django</code></td><td><code>http.server</code> (toy only)</td></tr>
        <tr><td>Data validation</td><td><code>pydantic</code></td><td><code>dataclasses</code> + manual checks</td></tr>
        <tr><td>Databases (ORM)</td><td><code>sqlalchemy</code>, <code>django.db</code></td><td><code>sqlite3</code></td></tr>
        <tr><td>Testing</td><td><code>pytest</code></td><td><code>unittest</code>, <code>doctest</code></td></tr>
        <tr><td>CLI apps</td><td><code>click</code>, <code>typer</code>, <code>rich</code></td><td><code>argparse</code></td></tr>
        <tr><td>HTML parsing</td><td><code>beautifulsoup4</code>, <code>lxml</code></td><td><code>html.parser</code></td></tr>
        <tr><td>Images</td><td><code>pillow</code></td><td>—</td></tr>
        <tr><td>Dates</td><td><code>arrow</code>, <code>pendulum</code></td><td><code>datetime</code>, <code>zoneinfo</code></td></tr>
      </table>` },
    { type: "html", html: `
      <h2>2 · Import conventions</h2>
      <p>Communities settle on standard aliases — recognising them helps you read code fast:</p>` },
    { type: "code", title: "The ones you'll see constantly", code: `# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# import tensorflow as tf
# from datetime import datetime, timedelta
print("np, pd, plt, tf — memorise these on sight")` },
    { type: "html", html: `
      <div class="warn"><b>Dependencies have a cost.</b>
      Each one is code you don't control, a supply-chain risk, a thing that can break on upgrade, and
      weight in every install. "Is 15 lines of stdlib enough?" is always worth asking first.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Check the standard library before adding a package — <code>csv</code>, <code>sqlite3</code>, <code>datetime</code>, <code>argparse</code>, <code>http</code>, <code>statistics</code> cover a lot.</li>
        <li>Know the big names by job: <code>requests</code>, <code>numpy</code>/<code>pandas</code>, <code>fastapi</code>/<code>flask</code>/<code>django</code>, <code>pytest</code>, <code>pydantic</code>, <code>sqlalchemy</code>.</li>
        <li>Learn the conventional aliases: <code>np</code>, <code>pd</code>, <code>plt</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Awesome Python — curated package list", url: "https://github.com/vinta/awesome-python" },
    { label: "Python — The Standard Library", url: "https://docs.python.org/3/library/index.html" },
    { label: "PyPI — browse & search", url: "https://pypi.org/" },
  ],
  exercises: [
    {
      title: "Pick the library",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>lib_for(job)</code>: <code>"http"</code>&rarr;<code>"requests"</code>,
        <code>"dataframe"</code>&rarr;<code>"pandas"</code>, <code>"web-api"</code>&rarr;<code>"fastapi"</code>,
        <code>"validation"</code>&rarr;<code>"pydantic"</code>, <code>"testing"</code>&rarr;<code>"pytest"</code>.
        Unknown &rarr; <code>"stdlib"</code>.</p>`,
      solution: `def lib_for(job):\n    m = {"http": "requests", "dataframe": "pandas", "web-api": "fastapi", "validation": "pydantic", "testing": "pytest"}\n    return m.get(job, "stdlib")`,
      success: "A lookup table with a sensible default.",
      mustDefine: ["lib_for"],
      tests: [
        { append: `print(lib_for("http"), lib_for("dataframe"), lib_for("logging"))`, expect: "requests pandas stdlib" },
      ],
    },
    {
      title: "Read the alias",
      tier: "warm", uses: ["string parsing (L4)", "import statement shape"],
      prompt: `<p>Define <code>alias_of(line)</code>: given an import line like
        <code>"import numpy as np"</code>, return the alias (<code>"np"</code>). If there's no
        <code>as</code>, return the module name. <code>"import os"</code> &rarr; <code>"os"</code>.</p>`,
      solution: `def alias_of(line):\n    parts = line.split()\n    if "as" in parts:\n        return parts[parts.index("as") + 1]\n    return parts[1]`,
      success: "Split on whitespace; the token after `as` is the alias.",
      mustDefine: ["alias_of"],
      tests: [
        { append: `print(alias_of("import numpy as np"))`, expect: "np" },
        { append: `print(alias_of("import matplotlib.pyplot as plt"))`, expect: "plt" },
        { append: `print(alias_of("import os"))`, expect: "os" },
      ],
    },
    {
      title: "stdlib-first check",
      tier: "core", uses: ["set membership (L7)", "bool"],
      prompt: `<p>Define <code>needs_pip(module)</code> returning <code>False</code> if <code>module</code>
        is one of the stdlib names <code>csv, json, sqlite3, datetime, argparse, statistics, math,
        random, os, re</code>, else <code>True</code>.</p>`,
      solution: `def needs_pip(module):\n    stdlib = {"csv", "json", "sqlite3", "datetime", "argparse", "statistics", "math", "random", "os", "re"}\n    return module not in stdlib`,
      success: "Knowing what's already built in saves dependencies.",
      mustDefine: ["needs_pip"],
      tests: [
        { append: `print(needs_pip("csv"), needs_pip("requests"), needs_pip("re"), needs_pip("numpy"))`, expect: "False True False True" },
      ],
    },
    {
      title: "Count dependencies by category",
      tier: "core", uses: ["dict tally (L8)", "loop (L6)", "the job map"],
      prompt: `<p>Given a list of package names, define <code>categorise(pkgs)</code> returning a dict of
        <code>{category: count}</code> using this fixed map:
        <code>requests,httpx&rarr;"web"</code>, <code>numpy,pandas&rarr;"data"</code>,
        <code>pytest&rarr;"test"</code>. Anything else &rarr; <code>"other"</code>.</p>`,
      solution: `def categorise(pkgs):\n    cat = {"requests": "web", "httpx": "web", "numpy": "data", "pandas": "data", "pytest": "test"}\n    out = {}\n    for p in pkgs:\n        c = cat.get(p, "other")\n        out[c] = out.get(c, 0) + 1\n    return out`,
      success: "Classify each, then tally with the get(k, 0) + 1 idiom.",
      mustDefine: ["categorise"],
      tests: [
        { append: `print(categorise(["requests", "numpy", "pandas", "pytest", "rich"]))`, expect: "{'web': 1, 'data': 2, 'test': 1, 'other': 1}" },
      ],
    },
  ],
},

/* ========================================================== 30 */
{
  id: "pyproject-toml",
  section: "Package Managers & Idioms",
  title: "pyproject.toml / Configuration",
  summary: "The single standardised config file for a Python project: build system, metadata, dependencies, and tool settings.",
  lead: "One file, TOML format, defined by PEPs 517/518/621. It replaced setup.py + setup.cfg + a scatter of tool-specific dotfiles.",
  spiral: ["dicts & nested dicts (L8)", "import a stdlib module (L19)", "reading structured text", "functions (L10)", "lists (L7)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The shape of the file</h2>
      <p>TOML is "obvious config": <code>key = value</code>, <code>[tables]</code> for sections,
      <code>[[arrays.of.tables]]</code>, real types (strings, numbers, booleans, arrays, dates).</p>` },
    { type: "code", title: "A typical pyproject.toml", code: `sample = '''
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "todo-cli"
version = "0.3.1"
requires-python = ">=3.10"
dependencies = [
    "click>=8.1",
    "rich>=13",
]

[project.optional-dependencies]
dev = ["pytest>=7", "ruff"]

[tool.ruff]
line-length = 100
'''
print(sample.strip()[:60], "...")` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Section</th><th>For</th></tr>
        <tr><td><code>[build-system]</code></td><td>how to build the package (PEP 518) — needed to install/publish</td></tr>
        <tr><td><code>[project]</code></td><td>metadata &amp; runtime <code>dependencies</code> (PEP 621) — the standard, tool-agnostic table</td></tr>
        <tr><td><code>[project.optional-dependencies]</code></td><td>extras like <code>dev</code>, <code>docs</code> — install with <code>pip install ".[dev]"</code></td></tr>
        <tr><td><code>[tool.<name>]</code></td><td>settings for ruff, black, mypy, pytest, poetry… each tool owns its sub-table</td></tr>
      </table>` },

    { type: "html", html: `
      <h2>2 · Reading it with <code>tomllib</code></h2>
      <p>Python 3.11+ has a built-in TOML <em>reader</em>: <code>tomllib.loads(text)</code> returns
      nested dicts and lists. (There's no writer in the stdlib — use <code>tomli-w</code> or edit by
      hand.)</p>` },
    { type: "code", title: "Parse and inspect", code: `import tomllib

text = '''
[project]
name = "todo-cli"
version = "0.3.1"
dependencies = ["click>=8.1", "rich>=13"]

[tool.ruff]
line-length = 100
'''
data = tomllib.loads(text)
print(data["project"]["name"], data["project"]["version"])
print(data["project"]["dependencies"])
print(data["tool"]["ruff"]["line-length"])` },
    { type: "html", html: whatif([
      "a key has a dot in it, like <code>line-length</code> — how do you access it in the parsed dict?",
      "<code>[tool.ruff]</code> vs <code>[tool.black]</code> — do they collide? why does each tool get its own sub-table?",
      "you need to <em>write</em> a value back — does <code>tomllib</code> help? (no — read-only)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>pyproject.toml</code> — one standardised file: build backend, project metadata, dependencies, per-tool config.</li>
        <li><code>[project]</code> (PEP 621) is the tool-neutral place for <code>name</code>, <code>version</code>, <code>dependencies</code>.</li>
        <li>Each tool reads its own <code>[tool.NAME]</code> table.</li>
        <li>Parse it in code with <code>tomllib.loads</code> → nested dicts/lists (read-only, 3.11+).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Packaging — Writing pyproject.toml", url: "https://packaging.python.org/en/latest/guides/writing-pyproject-toml/" },
    { label: "PEP 621 — Project metadata in pyproject.toml", url: "https://peps.python.org/pep-0621/" },
    { label: "Python docs — tomllib", url: "https://docs.python.org/3/library/tomllib.html" },
    { label: "TOML spec", url: "https://toml.io/en/" },
  ],
  exercises: [
    {
      title: "Project name & version",
      tier: "warm", uses: ["tomllib.loads", "nested dict access (L8)"],
      prompt: `<p>Define <code>name_version(text)</code> that parses a pyproject TOML string and returns
        the tuple <code>(project_name, project_version)</code>.</p>`,
      solution: `import tomllib\n\ndef name_version(text):\n    d = tomllib.loads(text)\n    return (d["project"]["name"], d["project"]["version"])`,
      success: "loads → dict; then it's just [\"project\"][\"name\"].",
      mustDefine: ["name_version"],
      tests: [
        { append: `t = '[project]\\nname = "app"\\nversion = "1.2.0"\\n'\nprint(name_version(t))`, expect: "('app', '1.2.0')" },
      ],
    },
    {
      title: "List the dependencies",
      tier: "core", uses: ["tomllib", "dict.get with default (L8)", "lists (L7)"],
      prompt: `<p>Define <code>deps(text)</code> returning the <code>[project] dependencies</code> list, or
        <code>[]</code> if the key is absent.</p>`,
      solution: `import tomllib\n\ndef deps(text):\n    d = tomllib.loads(text)\n    return d.get("project", {}).get("dependencies", [])`,
      success: "Chain .get with defaults so a missing section doesn't crash.",
      mustDefine: ["deps"],
      tests: [
        { append: `t = '[project]\\nname = "x"\\ndependencies = ["click>=8", "rich"]\\n'\nprint(deps(t))`, expect: "['click>=8', 'rich']" },
        { append: `print(deps('[project]\\nname = "x"\\n'))`, expect: "[]" },
      ],
    },
    {
      title: "Tool setting",
      tier: "core", uses: ["tomllib", "keys with dashes", "dict.get chain"],
      prompt: `<p>Define <code>line_length(text)</code> returning <code>[tool.ruff] line-length</code> as an
        int, defaulting to <code>88</code> if not set.</p>`,
      solution: `import tomllib\n\ndef line_length(text):\n    d = tomllib.loads(text)\n    return d.get("tool", {}).get("ruff", {}).get("line-length", 88)`,
      success: "A dashed key is just a normal string dict key.",
      mustDefine: ["line_length"],
      tests: [
        { append: `print(line_length('[tool.ruff]\\nline-length = 120\\n'))`, expect: "120" },
        { append: `print(line_length('[project]\\nname = "x"\\n'))`, expect: "88" },
      ],
    },
    {
      title: "All extras flattened",
      tier: "challenge", uses: ["tomllib", "loop over dict items (L8)", "build a list", "sorted"],
      prompt: `<p>Define <code>all_extra_deps(text)</code>: collect every dependency string from every group
        under <code>[project.optional-dependencies]</code> into one <strong>sorted, de-duplicated</strong>
        list. Missing table &rarr; <code>[]</code>.</p>`,
      solution: `import tomllib\n\ndef all_extra_deps(text):\n    d = tomllib.loads(text)\n    groups = d.get("project", {}).get("optional-dependencies", {})\n    found = set()\n    for name, items in groups.items():\n        for item in items:\n            found.add(item)\n    return sorted(found)`,
      success: "Iterate the groups, union their lists, sort.",
      mustDefine: ["all_extra_deps"],
      tests: [
        { append: `t = '[project.optional-dependencies]\\ndev = ["pytest", "ruff"]\\ndocs = ["sphinx", "ruff"]\\n'\nprint(all_extra_deps(t))`, expect: "['pytest', 'ruff', 'sphinx']" },
        { append: `print(all_extra_deps('[project]\\nname = "x"\\n'))`, expect: "[]" },
      ],
    },
    {
      title: "Validate metadata",
      tier: "boss", uses: ["tomllib", "required-key checks", "build an error list (L7)", "f-strings (L4)"],
      prompt: `<p>Define <code>validate(text)</code> returning a list of problems (empty = valid). Rules:
        <code>[project]</code> must exist and contain <code>name</code> and <code>version</code>;
        <code>[build-system]</code> must exist and contain a non-empty <code>requires</code> list.
        Report each missing thing as <code>"missing project.name"</code> etc., in that order.</p>`,
      solution: `import tomllib\n\ndef validate(text):\n    d = tomllib.loads(text)\n    errors = []\n    proj = d.get("project")\n    if proj is None:\n        errors.append("missing project")\n    else:\n        if "name" not in proj:\n            errors.append("missing project.name")\n        if "version" not in proj:\n            errors.append("missing project.version")\n    bs = d.get("build-system")\n    if bs is None:\n        errors.append("missing build-system")\n    elif not bs.get("requires"):\n        errors.append("missing build-system.requires")\n    return errors`,
      success: "Real config validators are just this: parse, then check the shape.",
      mustDefine: ["validate"],
      tests: [
        { append: `good = '[build-system]\\nrequires = ["hatchling"]\\n[project]\\nname = "x"\\nversion = "1.0"\\n'\nprint(validate(good))`, expect: "[]" },
        { append: `bad = '[project]\\nname = "x"\\n'\nprint(validate(bad))`, expect: "['missing project.version', 'missing build-system']" },
      ],
    },
  ],
},

/* ========================================================== 31 */
{
  id: "paradigms",
  section: "Package Managers & Idioms",
  title: "Paradigms",
  summary: "Three ways to organise the same logic: imperative (step-by-step), functional (transform data), object-oriented (bundle state + behaviour).",
  lead: "Python lets you mix all three. Knowing the styles — and their trade-offs — helps you pick the clearest one for the job.",
  spiral: ["loops & accumulators (L6)", "map / filter / lambda (L20)", "comprehensions & generators (L25, L26)", "closures (L24)", "classes (L22 primer, OOP next section)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Imperative — describe the steps</h2>
      <p>Explicit loops, mutable variables, "do this, then this". The default style, and often the
      clearest for a linear process.</p>` },
    { type: "code", title: "Sum the even squares — imperative", code: `nums = [1, 2, 3, 4, 5, 6]
total = 0
for n in nums:
    if n % 2 == 0:
        total += n * n
print(total)` },

    { type: "html", html: `
      <h2>2 · Functional — transform, don't mutate</h2>
      <p>Build the result out of pure functions (<code>map</code>, <code>filter</code>,
      <code>functools.reduce</code>, comprehensions). No loop variable, nothing reassigned. Pure
      functions — same input, same output, no side effects — are easy to test and reason about.</p>` },
    { type: "code", title: "Same result — functional", code: `from functools import reduce
nums = [1, 2, 3, 4, 5, 6]

evens = filter(lambda n: n % 2 == 0, nums)
squares = map(lambda n: n * n, evens)
total = reduce(lambda a, b: a + b, squares, 0)
print(total)

# usually you'd just write the comprehension:
print(sum(n * n for n in nums if n % 2 == 0))` },

    { type: "html", html: `
      <h2>3 · Object-oriented — bundle state with behaviour</h2>
      <p>When data and the operations on it belong together — and there'll be many instances with
      their own state — a class keeps them in one place. (Full treatment next section.)</p>` },
    { type: "code", title: "Same result — OOP", code: `class EvenSquareSummer:
    def __init__(self):
        self.total = 0
    def add(self, n):
        if n % 2 == 0:
            self.total += n * n
        return self

s = EvenSquareSummer()
for n in [1, 2, 3, 4, 5, 6]:
    s.add(n)
print(s.total)` },
    { type: "html", html: whatif([
      "the data is a one-off list you process once — does OOP earn its keep, or is a comprehension clearer?",
      "a function reads a global and modifies it — is it <em>pure</em>? why does that make it harder to test?",
      "you need 10,000 game entities each with position + health + inventory — which paradigm fits?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><strong>Imperative</strong>: explicit loops &amp; mutation. Clearest for linear procedures.</li>
        <li><strong>Functional</strong>: compose pure functions; no shared mutable state. Great for data pipelines &amp; testability. In Python this usually means comprehensions/generators.</li>
        <li><strong>OOP</strong>: classes bundling state + methods. Fits when you have many stateful things of the same kind.</li>
        <li>Python is multi-paradigm — mix freely, and pick the one that makes <em>this</em> code easiest to read.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python HOWTO — Functional Programming", url: "https://docs.python.org/3/howto/functional.html" },
    { label: "Python docs — functools (reduce, partial…)", url: "https://docs.python.org/3/library/functools.html" },
    { label: "Real Python — Functional Programming in Python", url: "https://realpython.com/python-functional-programming/" },
  ],
  exercises: [
    {
      title: "Imperative product",
      tier: "warm", uses: ["loop + accumulator (L6)"],
      prompt: `<p>Define <code>product(nums)</code> — the product of all items — with an explicit
        <code>for</code> loop and a running variable. Empty list &rarr; <code>1</code>.</p>`,
      solution: `def product(nums):\n    result = 1\n    for n in nums:\n        result *= n\n    return result`,
      success: "Start at the identity (1 for ×), fold each item in.",
      mustDefine: ["product"],
      tests: [
        { append: `print(product([1, 2, 3, 4]))`, expect: "24" },
        { append: `print(product([]))`, expect: "1" },
      ],
    },
    {
      title: "Functional product",
      tier: "core", uses: ["functools.reduce", "lambda (L20)"],
      prompt: `<p>Define <code>product(nums)</code> again — this time with <code>functools.reduce</code>
        and a lambda, no loop, no reassignment of your own.</p>`,
      solution: `from functools import reduce\n\ndef product(nums):\n    return reduce(lambda a, b: a * b, nums, 1)`,
      success: "reduce folds a 2-arg function across the sequence, starting from the initial value.",
      mustDefine: ["product"],
      require: [{ pattern: "reduce", hard: true, message: "Use functools.reduce." }],
      tests: [
        { append: `print(product([1, 2, 3, 4]), product([]))`, expect: "24 1" },
      ],
    },
    {
      title: "Pure vs impure",
      tier: "core", uses: ["side effects", "global (L24)", "bool"],
      prompt: `<p>Define <code>is_pure(fn_source)</code> — a rough heuristic: given a function's source as a
        string, return <code>False</code> if it contains <code>global </code>, <code>print(</code>, or
        <code>.append(</code>; else <code>True</code>.</p>`,
      solution: `def is_pure(fn_source):\n    for bad in ["global ", "print(", ".append("]:\n        if bad in fn_source:\n            return False\n    return True`,
      success: "Not rigorous — but 'no visible side effects' is the smell test for purity.",
      mustDefine: ["is_pure"],
      tests: [
        { append: `print(is_pure("def f(x):\\n    return x * 2"))`, expect: "True" },
        { append: `print(is_pure("def f(x):\\n    print(x)\\n    return x"))`, expect: "False" },
      ],
    },
    {
      title: "Three styles, one answer",
      tier: "challenge", uses: ["imperative loop", "comprehension (L25)", "reduce/sum"],
      prompt: `<p>Define three functions that each return the sum of the <em>positive</em> numbers in a
        list: <code>sum_pos_loop(nums)</code> (explicit loop), <code>sum_pos_comp(nums)</code> (one
        comprehension inside <code>sum</code>), <code>sum_pos_func(nums)</code> (using
        <code>filter</code> + <code>sum</code>). All must agree.</p>`,
      solution: `def sum_pos_loop(nums):\n    total = 0\n    for n in nums:\n        if n > 0:\n            total += n\n    return total\n\ndef sum_pos_comp(nums):\n    return sum(n for n in nums if n > 0)\n\ndef sum_pos_func(nums):\n    return sum(filter(lambda n: n > 0, nums))`,
      success: "Same result, three vocabularies — read them side by side.",
      mustDefine: ["sum_pos_loop", "sum_pos_comp", "sum_pos_func"],
      tests: [
        { append: `xs = [3, -1, 4, -5, 9, -2]\nprint(sum_pos_loop(xs), sum_pos_comp(xs), sum_pos_func(xs))`, expect: "16 16 16" },
        { append: `print(sum_pos_loop([-1, -2]), sum_pos_comp([]), sum_pos_func([5]))`, expect: "0 0 5" },
      ],
    },
    {
      title: "Compose functions",
      tier: "boss", uses: ["higher-order functions (L20)", "closures (L24)", "*functions"],
      prompt: `<p>Define <code>compose(*funcs)</code> returning a function that applies the given functions
        <strong>right to left</strong>: <code>compose(f, g, h)(x)</code> is <code>f(g(h(x)))</code>.
        With no functions, it returns its argument unchanged.</p>`,
      solution: `def compose(*funcs):\n    def composed(x):\n        result = x\n        for fn in reversed(funcs):\n            result = fn(result)\n        return result\n    return composed`,
      success: "Fold the input through each function, starting from the last.",
      mustDefine: ["compose"],
      tests: [
        { append: `inc = lambda n: n + 1\ndouble = lambda n: n * 2\nprint(compose(inc, double)(5))`, expect: "11" },
        { append: `inc = lambda n: n + 1\ndouble = lambda n: n * 2\nprint(compose(double, inc)(5))`, expect: "12" },
        { append: `print(compose()(42))`, expect: "42" },
      ],
    },
  ],
},

/* ========================================================== 32 */
{
  id: "classes",
  section: "Object-Oriented Programming",
  title: "Classes",
  summary: "Define your own types: a class is a blueprint; __init__ builds instances; self carries each instance's data.",
  lead: "You've used classes all along — str, list, dict are classes. Now build your own: a name for a kind of thing, with its data and the operations that belong to it.",
  spiral: ["functions & parameters (L10)", "the class primer (L22)", "dicts as ad-hoc records (L8)", "f-strings (L4)", "__methods__ hooks (L22, L27)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · class, <code>__init__</code>, <code>self</code></h2>
      <p>A <strong>class</strong> is a template. Calling it (<code>Dog("Rex")</code>) makes an
      <strong>instance</strong>. Python creates the blank instance and calls
      <code>__init__(self, ...)</code> to fill it in — <code>self</code> <em>is</em> that instance, and
      <code>self.name = name</code> stores data on it.</p>` },
    { type: "code", title: "A first class", code: `class Dog:
    def __init__(self, name, age):
        self.name = name        # instance attributes
        self.age = age

    def bark(self):             # a method — self is the instance
        return f"{self.name} says woof"

rex = Dog("Rex", 3)
fido = Dog("Fido", 7)
print(rex.name, rex.age)
print(rex.bark())
print(fido.bark())
fido.age += 1                    # each instance has its own state
print(fido.age, rex.age)` },
    { type: "html", html: whatif([
      "you forget <code>self</code> in a method's parameter list — what error when you call it?",
      "you set <code>rex.color = \"brown\"</code> — does <code>fido</code> get a <code>color</code> too?",
      "you call <code>Dog.bark(rex)</code> directly — does it work? (yes — <code>rex.bark()</code> is sugar for that)",
    ]) },

    { type: "html", html: `
      <h2>2 · <code>__str__</code> and <code>__repr__</code></h2>
      <p>Define <code>__str__</code> for a friendly <code>print()</code> string; <code>__repr__</code>
      for an unambiguous debugging one (what you see in the REPL / a list).</p>` },
    { type: "code", title: "Making instances printable", code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(2, 5)
print(p)              # uses __str__ -> (2, 5)
print([p, p])         # uses __repr__ -> [Point(2, 5), Point(2, 5)]
print(str(p), repr(p))` },

    { type: "html", html: `
      <h2>3 · Class attributes vs instance attributes</h2>
      <p>A name assigned in the class body (not on <code>self</code>) is shared by <em>all</em>
      instances. Good for constants and defaults; a classic trap if it's mutable.</p>` },
    { type: "code", title: "Shared vs per-instance", code: `class Counter:
    total_made = 0                # class attribute: one, shared

    def __init__(self):
        Counter.total_made += 1
        self.id = Counter.total_made   # instance attribute: one each

a = Counter()
b = Counter()
c = Counter()
print(a.id, b.id, c.id)
print(Counter.total_made)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>class Name:</code> defines a type; <code>Name(args)</code> makes an instance.</li>
        <li><code>__init__(self, …)</code> initialises; <code>self.x = …</code> stores per-instance data.</li>
        <li>Methods take <code>self</code> first; <code>obj.method()</code> passes <code>obj</code> as <code>self</code> automatically.</li>
        <li><code>__repr__</code> (debug) / <code>__str__</code> (friendly) control how instances display.</li>
        <li>Class-body assignments are shared across instances — keep them immutable.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
    { label: "Python docs — Data model (__init__, __repr__…)", url: "https://docs.python.org/3/reference/datamodel.html" },
    { label: "Real Python — Object-Oriented Programming in Python 3", url: "https://realpython.com/python3-object-oriented-programming/" },
  ],
  exercises: [
    {
      title: "Rectangle",
      tier: "warm", uses: ["class / __init__ / self", "a method"],
      prompt: `<p>Define <code>Rectangle</code> with <code>__init__(self, width, height)</code> and a method
        <code>area(self)</code> returning <code>width * height</code>.</p>`,
      solution: `class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height`,
      success: "Store the inputs on self; the method reads them back.",
      mustDefine: ["Rectangle"],
      tests: [
        { append: `r = Rectangle(3, 4)\nprint(r.area())`, expect: "12" },
        { append: `print(Rectangle(5, 5).area())`, expect: "25" },
      ],
    },
    {
      title: "BankAccount",
      tier: "core", uses: ["mutable instance state", "methods that change self", "if (L5)"],
      prompt: `<p>Define <code>BankAccount</code>: <code>__init__(self, balance=0)</code>;
        <code>deposit(self, n)</code> adds; <code>withdraw(self, n)</code> subtracts but returns
        <code>False</code> (and changes nothing) if <code>n</code> exceeds the balance, else returns
        <code>True</code>; <code>get_balance(self)</code>.</p>`,
      solution: `class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, n):\n        self.balance += n\n    def withdraw(self, n):\n        if n > self.balance:\n            return False\n        self.balance -= n\n        return True\n    def get_balance(self):\n        return self.balance`,
      success: "Methods mutate self.balance; withdraw guards before it does.",
      mustDefine: ["BankAccount"],
      tests: [
        { append: `a = BankAccount(100)\na.deposit(50)\nprint(a.withdraw(200), a.get_balance())\nprint(a.withdraw(120), a.get_balance())`, expect: "False 150\nTrue 30" },
      ],
    },
    {
      title: "__repr__",
      tier: "core", uses: ["__repr__", "f-strings (L4)"],
      prompt: `<p>Define <code>Point</code> with <code>__init__(self, x, y)</code> and <code>__repr__</code>
        returning <code>"Point(x, y)"</code>. Test prints a list of points.</p>`,
      solution: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __repr__(self):\n        return f"Point({self.x}, {self.y})"`,
      success: "__repr__ is what shows inside a list or the REPL.",
      mustDefine: ["Point"],
      tests: [
        { append: `print([Point(1, 2), Point(3, 4)])`, expect: "[Point(1, 2), Point(3, 4)]" },
      ],
    },
    {
      title: "Instance count",
      tier: "challenge", uses: ["class attribute", "class-name access in __init__"],
      prompt: `<p>Define <code>Widget</code> so that <code>Widget.count</code> tracks how many have been
        created (starts at 0, +1 per <code>__init__</code>). <code>__init__(self, label)</code> stores
        <code>self.label</code>.</p>`,
      solution: `class Widget:\n    count = 0\n    def __init__(self, label):\n        self.label = label\n        Widget.count += 1`,
      success: "The counter lives on the class; each __init__ bumps it.",
      mustDefine: ["Widget"],
      tests: [
        { append: `print(Widget.count)\nWidget("a"); Widget("b"); w = Widget("c")\nprint(Widget.count, w.label)`, expect: "0\n3 c" },
      ],
    },
    {
      title: "The mutable class-attr trap",
      tier: "challenge", uses: ["class attribute pitfall", "per-instance list in __init__"],
      prompt: `<p>Define <code>Basket</code> so each basket has its <strong>own</strong> <code>items</code>
        list. <code>__init__(self)</code> must set <code>self.items = []</code> (NOT a class-body
        <code>items = []</code>). <code>add(self, x)</code> appends.</p>`,
      solution: `class Basket:\n    def __init__(self):\n        self.items = []\n    def add(self, x):\n        self.items.append(x)`,
      success: "A class-body list would be SHARED — always build per-instance mutables in __init__.",
      mustDefine: ["Basket"],
      require: [{ pattern: "self\\.items\\s*=\\s*\\[\\]", hard: true, message: "Initialise self.items = [] inside __init__." }],
      tests: [
        { append: `a = Basket(); b = Basket()\na.add(1); a.add(2); b.add(9)\nprint(a.items, b.items)`, expect: "[1, 2] [9]" },
      ],
    },
    {
      title: "Vector with operators",
      tier: "boss", uses: ["__add__ / __eq__ / __repr__", "dunder methods (L22, L27)"],
      prompt: `<p>Define <code>Vec</code> (<code>x</code>, <code>y</code>) supporting: <code>v1 + v2</code>
        (<code>__add__</code> &rarr; new <code>Vec</code>), <code>v1 == v2</code> (<code>__eq__</code>,
        component-wise), and <code>__repr__</code> as <code>"Vec(x, y)"</code>.</p>`,
      solution: `class Vec:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vec(self.x + other.x, self.y + other.y)\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n    def __repr__(self):\n        return f"Vec({self.x}, {self.y})"`,
      success: "Dunder methods let YOUR types use Python's operators.",
      mustDefine: ["Vec"],
      tests: [
        { append: `print(Vec(1, 2) + Vec(3, 4))`, expect: "Vec(4, 6)" },
        { append: `print(Vec(1, 1) == Vec(1, 1), Vec(1, 1) == Vec(2, 1))`, expect: "True False" },
      ],
    },
  ],
},

/* ========================================================== 33 */
{
  id: "methods",
  section: "Object-Oriented Programming",
  title: "Methods",
  summary: "Instance methods (self), class methods (@classmethod, cls), static methods (@staticmethod), and @property.",
  lead: "Not every function on a class needs an instance. Three kinds of method, plus properties for computed attributes.",
  spiral: ["classes & self (L32)", "decorators (L21)", "class vs instance attributes (L32)", "functions (L10)", "raise (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The three method kinds</h2>
      <table class="tbl">
        <tr><th>Kind</th><th>First arg</th><th>Sees</th><th>Use for</th></tr>
        <tr><td>instance method</td><td><code>self</code></td><td>this instance's data</td><td>the normal case</td></tr>
        <tr><td><code>@classmethod</code></td><td><code>cls</code></td><td>the class (not an instance)</td><td>alternative constructors, class-wide state</td></tr>
        <tr><td><code>@staticmethod</code></td><td>— nothing —</td><td>neither</td><td>a helper that just belongs here namespace-wise</td></tr>
      </table>` },
    { type: "code", title: "All three on one class", code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def to_fahrenheit(self):                 # instance: needs self.celsius
        return self.celsius * 9 / 5 + 32

    @classmethod
    def from_fahrenheit(cls, f):             # class: builds an instance a different way
        return cls((f - 32) * 5 / 9)

    @staticmethod
    def is_freezing(celsius):                # static: pure helper, no self/cls
        return celsius <= 0

t = Temperature(25)
print(t.to_fahrenheit())
t2 = Temperature.from_fahrenheit(212)
print(t2.celsius)
print(Temperature.is_freezing(-3), Temperature.is_freezing(10))` },
    { type: "html", html: whatif([
      "<code>from_fahrenheit</code> used <code>Temperature(...)</code> instead of <code>cls(...)</code> — would a subclass's alternative constructor still return the subclass?",
      "you call <code>Temperature.to_fahrenheit()</code> with no instance — what happens?",
      "a <code>@staticmethod</code> needs <code>self.celsius</code> — is it the wrong kind of method?",
    ]) },

    { type: "html", html: `
      <h2>2 · <code>@property</code> — a method that looks like an attribute</h2>
      <p>Expose a computed value as <code>obj.area</code> (no parentheses), and optionally intercept
      writes with a <code>@x.setter</code> to validate.</p>` },
    { type: "code", title: "Computed + validated attributes", code: `class Circle:
    def __init__(self, radius):
        self._radius = radius            # leading _ : "internal, please use .radius"

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("radius can't be negative")
        self._radius = value

    @property
    def area(self):                      # read-only computed attribute
        return 3.141592653589793 * self._radius ** 2

c = Circle(2)
print(round(c.area, 2))
c.radius = 5                              # goes through the setter
print(round(c.area, 2))
try:
    c.radius = -1
except ValueError as e:
    print(e)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Instance method → <code>self</code>. <code>@classmethod</code> → <code>cls</code> (use it to build instances). <code>@staticmethod</code> → no implicit arg.</li>
        <li>Alternative constructors are the killer use of <code>@classmethod</code>; return <code>cls(...)</code> so subclasses work.</li>
        <li><code>@property</code> turns a method into a read-only attribute; <code>@name.setter</code> guards writes.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — classmethod / staticmethod", url: "https://docs.python.org/3/library/functions.html#classmethod" },
    { label: "Python docs — property()", url: "https://docs.python.org/3/library/functions.html#property" },
    { label: "Real Python — Python's property()", url: "https://realpython.com/python-property/" },
  ],
  exercises: [
    {
      title: "Instance method",
      tier: "warm", uses: ["self (L32)", "method"],
      prompt: `<p>Define <code>Greeter</code>: <code>__init__(self, name)</code>, and
        <code>hello(self)</code> returning <code>"Hello, NAME"</code>.</p>`,
      solution: `class Greeter:\n    def __init__(self, name):\n        self.name = name\n    def hello(self):\n        return f"Hello, {self.name}"`,
      success: "The method reads self.name.",
      mustDefine: ["Greeter"],
      tests: [
        { append: `print(Greeter("Ada").hello())`, expect: "Hello, Ada" },
      ],
    },
    {
      title: "@staticmethod helper",
      tier: "warm", uses: ["@staticmethod", "no self/cls"],
      prompt: `<p>Define <code>MathUtils</code> with a <strong>static</strong> method
        <code>clamp(x, lo, hi)</code> returning <code>x</code> limited to <code>[lo, hi]</code>. It
        takes no <code>self</code>.</p>`,
      solution: `class MathUtils:\n    @staticmethod\n    def clamp(x, lo, hi):\n        return max(lo, min(x, hi))`,
      success: "A staticmethod is just a plain function that lives in the class namespace.",
      mustDefine: ["MathUtils"],
      require: [{ pattern: "@staticmethod", hard: true, message: "Use @staticmethod." }],
      tests: [
        { append: `print(MathUtils.clamp(15, 0, 10), MathUtils.clamp(-3, 0, 10), MathUtils.clamp(5, 0, 10))`, expect: "10 0 5" },
      ],
    },
    {
      title: "Alternative constructor",
      tier: "core", uses: ["@classmethod", "cls(...)", "split (L4)"],
      prompt: `<p>Define <code>Date</code>: <code>__init__(self, year, month, day)</code>, and a
        <strong>classmethod</strong> <code>from_string(cls, s)</code> that parses
        <code>"2026-08-28"</code> and returns <code>cls(2026, 8, 28)</code>.</p>`,
      solution: `class Date:\n    def __init__(self, year, month, day):\n        self.year = year\n        self.month = month\n        self.day = day\n    @classmethod\n    def from_string(cls, s):\n        y, m, d = s.split("-")\n        return cls(int(y), int(m), int(d))`,
      success: "Return cls(...), not Date(...), so subclasses build themselves.",
      mustDefine: ["Date"],
      require: [{ pattern: "@classmethod", hard: true, message: "Use @classmethod for from_string." }],
      tests: [
        { append: `d = Date.from_string("2026-08-28")\nprint(d.year, d.month, d.day)`, expect: "2026 8 28" },
      ],
    },
    {
      title: "@property area",
      tier: "core", uses: ["@property", "computed attribute"],
      prompt: `<p>Define <code>Square</code>: <code>__init__(self, side)</code>, and a read-only
        <strong>property</strong> <code>area</code> returning <code>side * side</code>. Access it as
        <code>sq.area</code> — no parentheses.</p>`,
      solution: `class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n    def area(self):\n        return self.side * self.side`,
      success: "@property lets a method be read like a plain attribute.",
      mustDefine: ["Square"],
      require: [{ pattern: "@property", hard: true, message: "Use @property." }],
      tests: [
        { append: `s = Square(4)\nprint(s.area)\ns.side = 5\nprint(s.area)`, expect: "16\n25" },
      ],
    },
    {
      title: "Validating setter",
      tier: "challenge", uses: ["@property + @x.setter", "raise (L11)", "_private convention"],
      prompt: `<p>Define <code>Account</code>: <code>__init__(self, balance=0)</code> storing
        <code>self._balance</code>. A property <code>balance</code> returns it; its setter rejects
        negatives with <code>raise ValueError("negative")</code>.</p>`,
      solution: `class Account:\n    def __init__(self, balance=0):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError("negative")\n        self._balance = value`,
      success: "The setter is the gatekeeper for every write to .balance.",
      mustDefine: ["Account"],
      tests: [
        { append: `a = Account(100)\na.balance = 50\nprint(a.balance)\ntry:\n    a.balance = -1\nexcept ValueError as e:\n    print(e)`, expect: "50\nnegative" },
      ],
    },
    {
      title: "Registry via classmethod",
      tier: "boss", uses: ["class-level dict", "@classmethod for class-wide state", "instance + class methods together"],
      prompt: `<p>Define <code>Plugin</code>: a class-level dict <code>registry</code>;
        <code>__init__(self, name)</code> stores <code>self.name</code> <em>and</em> registers itself
        as <code>Plugin.registry[name] = self</code>. A classmethod <code>get(cls, name)</code> returns
        the registered instance or <code>None</code>. A classmethod <code>names(cls)</code> returns a
        sorted list of registered names.</p>`,
      solution: `class Plugin:\n    registry = {}\n    def __init__(self, name):\n        self.name = name\n        Plugin.registry[name] = self\n    @classmethod\n    def get(cls, name):\n        return cls.registry.get(name)\n    @classmethod\n    def names(cls):\n        return sorted(cls.registry)`,
      success: "The class itself holds shared state; classmethods are its API.",
      mustDefine: ["Plugin"],
      tests: [
        { append: `Plugin.registry.clear()\np = Plugin("auth")\nPlugin("cache")\nprint(Plugin.get("auth") is p, Plugin.get("missing"))\nprint(Plugin.names())`, expect: "True None\n['auth', 'cache']" },
      ],
    },
  ],
},

/* ========================================================== 34 */
{
  id: "inheritance",
  section: "Object-Oriented Programming",
  title: "Inheritance",
  summary: "A subclass reuses and specialises a base class: override methods, call super(), and check the MRO.",
  lead: "When B 'is a kind of' A, B can inherit A's attributes and methods, keep what fits, and override the rest.",
  spiral: ["classes, __init__, methods (L32, L33)", "isinstance / type (L2, L17)", "super() and method resolution", "raise NotImplementedError (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · <code>class Sub(Base):</code></h2>
      <p>A subclass gets everything the base has. Redefine a method to <strong>override</strong> it;
      call <code>super().method(...)</code> to run the base version too.</p>` },
    { type: "code", title: "Extend and override", code: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."
    def describe(self):
        return f"{self.name} says {self.speak()}"

class Dog(Animal):
    def speak(self):                 # override
        return "woof"

class Puppy(Dog):
    def speak(self):
        return super().speak() + " (tiny)"   # extend the parent's version

print(Dog("Rex").describe())
print(Puppy("Fido").describe())
print(isinstance(Puppy("x"), Animal))       # True — a Puppy IS an Animal` },

    { type: "html", html: `
      <h2>2 · <code>super().__init__()</code></h2>
      <p>If the subclass has its own <code>__init__</code>, it must call the base's to set up the
      inherited attributes.</p>` },
    { type: "code", title: "Chaining constructors", code: `class Shape:
    def __init__(self, color):
        self.color = color

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)      # sets self.color
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

c = Circle("red", 3)
print(c.color, round(c.area(), 2))` },
    { type: "html", html: whatif([
      "<code>Circle.__init__</code> forgets <code>super().__init__(color)</code> — what's missing when you read <code>c.color</code>?",
      "both <code>Dog</code> and <code>Cat</code> override <code>speak</code> but you loop over a list of mixed animals calling <code>.speak()</code> — does it just work? (polymorphism)",
      "class <code>C(A, B)</code> and both define <code>foo</code> — which runs? (the MRO: <code>C.__mro__</code>)",
    ]) },

    { type: "html", html: `
      <h2>3 · Abstract-ish base &amp; the MRO</h2>
      <p>A base can declare a method it expects subclasses to implement by
      <code>raise NotImplementedError</code>. And <code>Class.__mro__</code> shows the exact
      left-to-right, depth-avoiding order Python searches for attributes.</p>` },
    { type: "code", title: "Contract + lookup order", code: `class Serializer:
    def dump(self, obj):
        raise NotImplementedError("subclasses must implement dump")

class JsonSerializer(Serializer):
    def dump(self, obj):
        import json
        return json.dumps(obj)

print(JsonSerializer().dump({"a": 1}))
print([c.__name__ for c in JsonSerializer.__mro__])` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>class Sub(Base):</code> inherits all attributes/methods; redefine to override.</li>
        <li><code>super().method(...)</code> calls the parent's version (for <code>__init__</code> too).</li>
        <li><strong>Polymorphism</strong>: call the same method on different subclasses, each does its own thing.</li>
        <li><code>isinstance(obj, Base)</code> is <code>True</code> for subclass instances; <code>Class.__mro__</code> is the lookup order.</li>
        <li>Favour composition when "is-a" doesn't really hold — deep inheritance trees get brittle.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Inheritance", url: "https://docs.python.org/3/tutorial/classes.html#inheritance" },
    { label: "Python docs — super()", url: "https://docs.python.org/3/library/functions.html#super" },
    { label: "Real Python — Inheritance and Composition", url: "https://realpython.com/inheritance-composition-python/" },
  ],
  exercises: [
    {
      title: "Override speak",
      tier: "warm", uses: ["class Sub(Base)", "override a method"],
      prompt: `<p>Given <code>Animal</code> with <code>speak(self)</code> returning <code>"..."</code>,
        define <code>Cat(Animal)</code> whose <code>speak</code> returns <code>"meow"</code>.</p>`,
      solution: `class Animal:\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return "meow"`,
      success: "Same method name in the subclass shadows the base one.",
      mustDefine: ["Cat"],
      tests: [
        { append: `print(Cat().speak(), isinstance(Cat(), Animal))`, expect: "meow True" },
      ],
    },
    {
      title: "super().__init__",
      tier: "core", uses: ["super()", "__init__ chaining"],
      prompt: `<p>Define <code>Person</code> (<code>__init__(self, name)</code>) and
        <code>Employee(Person)</code> (<code>__init__(self, name, salary)</code>) that calls
        <code>super().__init__(name)</code> and also stores <code>self.salary</code>.</p>`,
      solution: `class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Employee(Person):\n    def __init__(self, name, salary):\n        super().__init__(name)\n        self.salary = salary`,
      success: "Let the base set up its own attributes, then add yours.",
      mustDefine: ["Employee"],
      require: [{ pattern: "super\\(\\)\\.__init__", hard: true, message: "Call super().__init__(name)." }],
      tests: [
        { append: `e = Employee("Ada", 90000)\nprint(e.name, e.salary)`, expect: "Ada 90000" },
      ],
    },
    {
      title: "extend, don't replace",
      tier: "core", uses: ["super().method()", "override + extend"],
      prompt: `<p>Given <code>Logger</code> with <code>log(self, msg)</code> returning
        <code>f"[log] {msg}"</code>, define <code>TimestampLogger(Logger)</code> whose <code>log</code>
        returns <code>"12:00 " + super().log(msg)</code>.</p>`,
      solution: `class Logger:\n    def log(self, msg):\n        return f"[log] {msg}"\n\nclass TimestampLogger(Logger):\n    def log(self, msg):\n        return "12:00 " + super().log(msg)`,
      success: "super() reuses the parent's work instead of copy-pasting it.",
      mustDefine: ["TimestampLogger"],
      tests: [
        { append: `print(TimestampLogger().log("hi"))`, expect: "12:00 [log] hi" },
      ],
    },
    {
      title: "Polymorphism",
      tier: "challenge", uses: ["a list of mixed subclasses", "same method call", "loop (L6)"],
      prompt: `<p>Define <code>Shape</code> with <code>area(self)</code> raising
        <code>NotImplementedError</code>; <code>Square(Shape)</code> (<code>side</code>) and
        <code>Rect(Shape)</code> (<code>w, h</code>). Then define <code>total_area(shapes)</code>
        summing <code>s.area()</code> over a mixed list.</p>`,
      solution: `class Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nclass Rect(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\ndef total_area(shapes):\n    total = 0\n    for s in shapes:\n        total += s.area()\n    return total`,
      success: "total_area doesn't care which subclass — it just calls .area().",
      mustDefine: ["Shape", "Square", "Rect", "total_area"],
      tests: [
        { append: `print(total_area([Square(2), Rect(3, 4), Square(5)]))`, expect: "41" },
        { append: `print(total_area([]))`, expect: "0" },
      ],
    },
    {
      title: "Mixin",
      tier: "challenge", uses: ["multiple bases", "MRO", "a small reusable behaviour"],
      prompt: `<p>Define <code>ReprMixin</code> with <code>__repr__(self)</code> returning
        <code>ClassName(vars-as-dict)</code> — e.g. <code>"User({'name': 'Ada'})"</code> using
        <code>type(self).__name__</code> and <code>vars(self)</code>. Then define
        <code>User(ReprMixin)</code> with <code>__init__(self, name)</code>.</p>`,
      solution: `class ReprMixin:\n    def __repr__(self):\n        return f"{type(self).__name__}({vars(self)})"\n\nclass User(ReprMixin):\n    def __init__(self, name):\n        self.name = name`,
      success: "A mixin is a small class that adds one behaviour to whatever inherits it.",
      mustDefine: ["ReprMixin", "User"],
      tests: [
        { append: `print(repr(User("Ada")))`, expect: "User({'name': 'Ada'})" },
      ],
    },
    {
      title: "Shape hierarchy with super chains",
      tier: "boss", uses: ["3-level inheritance", "super() at each level", "@property (L33)", "__repr__ (L32)"],
      prompt: `<p>Define <code>Shape</code> (<code>name</code>), <code>Polygon(Shape)</code>
        (<code>name, sides</code> via <code>super</code>), <code>RegularPolygon(Polygon)</code>
        (<code>name, sides, length</code> via <code>super</code>) with a <code>perimeter</code>
        <strong>property</strong> = <code>sides * length</code> and <code>__repr__</code> =
        <code>"RegularPolygon(name, sides, length)"</code>.</p>`,
      solution: `class Shape:\n    def __init__(self, name):\n        self.name = name\n\nclass Polygon(Shape):\n    def __init__(self, name, sides):\n        super().__init__(name)\n        self.sides = sides\n\nclass RegularPolygon(Polygon):\n    def __init__(self, name, sides, length):\n        super().__init__(name, sides)\n        self.length = length\n    @property\n    def perimeter(self):\n        return self.sides * self.length\n    def __repr__(self):\n        return f"RegularPolygon({self.name}, {self.sides}, {self.length})"`,
      success: "Each level calls up; each adds one attribute.",
      mustDefine: ["RegularPolygon"],
      tests: [
        { append: `p = RegularPolygon("hexagon", 6, 5)\nprint(p.name, p.sides, p.perimeter)\nprint(p)`, expect: "hexagon 6 30\nRegularPolygon(hexagon, 6, 5)" },
      ],
    },
  ],
},

/* ========================================================== 35 */
{
  id: "encapsulation",
  section: "Object-Oriented Programming",
  title: "Encapsulation",
  summary: "Hiding internals behind a stable interface: the _ / __ conventions, name mangling, properties, and dataclasses.",
  lead: "The point of a class isn't the attributes — it's the promise: 'use these methods, don't poke at the rest, and I can change the rest freely'.",
  spiral: ["classes & methods (L32, L33)", "@property for controlled access (L33)", "raise (L11)", "decorators (L21)", "__repr__ / __eq__ (L32)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Python's honour system</h2>
      <p>Python has <em>no</em> real <code>private</code>. Instead, conventions:</p>
      <table class="tbl">
        <tr><th>Name</th><th>Means</th></tr>
        <tr><td><code>public</code></td><td>part of the interface — use freely</td></tr>
        <tr><td><code>_internal</code></td><td>"implementation detail, may change — don't rely on it"</td></tr>
        <tr><td><code>__mangled</code></td><td>Python rewrites it to <code>_ClassName__mangled</code> to avoid accidental clashes in subclasses (not security)</td></tr>
      </table>` },
    { type: "code", title: "Name mangling in action", code: `class Vault:
    def __init__(self, secret):
        self.__secret = secret          # becomes self._Vault__secret

    def reveal(self, key):
        return self.__secret if key == "open" else "denied"

v = Vault("gold")
print(v.reveal("open"))
try:
    print(v.__secret)                   # AttributeError
except AttributeError as e:
    print("blocked:", e)
print(v._Vault__secret)                 # ...still reachable if you insist` },

    { type: "html", html: `
      <h2>2 · A real interface: getters via <code>@property</code></h2>
      <p>Keep the field <code>_x</code> internal; expose a read-only <code>x</code> property, or a
      validated setter. Callers write <code>obj.x</code>; you control what that means.</p>` },
    { type: "code", title: "Invariant-protecting class", code: `class Rectangle:
    def __init__(self, width, height):
        self._width = 0
        self._height = 0
        self.width = width               # go through the setters
        self.height = height

    @property
    def width(self):
        return self._width
    @width.setter
    def width(self, v):
        if v <= 0:
            raise ValueError("width must be positive")
        self._width = v

    @property
    def height(self):
        return self._height
    @height.setter
    def height(self, v):
        if v <= 0:
            raise ValueError("height must be positive")
        self._height = v

    @property
    def area(self):
        return self._width * self._height

r = Rectangle(3, 4)
print(r.area)
try:
    r.width = -5
except ValueError as e:
    print(e)
print(r.area)          # unchanged — the invariant held` },
    { type: "html", html: whatif([
      "a subclass also defines <code>__secret</code> — do the two collide, or does mangling keep them apart?",
      "you expose <code>area</code> as a plain attribute set in <code>__init__</code> — what happens to it when <code>width</code> later changes?",
      "everything is public and mutable — what's the risk when you refactor the internals in six months?",
    ]) },

    { type: "html", html: `
      <h2>3 · <code>@dataclass</code> — boilerplate, gone</h2>
      <p>For a class that's mostly "a bundle of fields", <code>@dataclass</code> writes
      <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> for you.
      <code>frozen=True</code> makes instances immutable.</p>` },
    { type: "code", title: "dataclass", code: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int
    label: str = "origin"

p = Point(2, 5)
print(p)                 # Point(x=2, y=5, label='origin')
print(p == Point(2, 5))  # True — field-wise __eq__ for free

@dataclass(frozen=True)
class Config:
    debug: bool = False

c = Config(debug=True)
try:
    c.debug = False
except Exception as e:
    print(type(e).__name__)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>No real <code>private</code>: <code>_name</code> = "internal", <code>__name</code> = name-mangled to dodge subclass clashes.</li>
        <li>Encapsulation is about a <strong>stable interface</strong> — methods/properties — over a <strong>changeable</strong> implementation.</li>
        <li><code>@property</code> + setter protects invariants (a value can never go invalid).</li>
        <li><code>@dataclass</code> generates <code>__init__</code>/<code>__repr__</code>/<code>__eq__</code>; <code>frozen=True</code> for immutability.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" },
    { label: "Python Tutorial — private variables (name mangling)", url: "https://docs.python.org/3/tutorial/classes.html#private-variables" },
    { label: "Real Python — Encapsulation in Python", url: "https://realpython.com/python-encapsulation/" },
  ],
  exercises: [
    {
      title: "Internal by convention",
      tier: "warm", uses: ["_name convention", "a method as the interface"],
      prompt: `<p>Define <code>Stack</code>: <code>__init__</code> sets <code>self._items = []</code>;
        <code>push(self, x)</code>, <code>pop(self)</code>, <code>size(self)</code>. Callers use the
        methods, not <code>_items</code>.</p>`,
      solution: `class Stack:\n    def __init__(self):\n        self._items = []\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        return self._items.pop()\n    def size(self):\n        return len(self._items)`,
      success: "_items is the implementation; push/pop/size are the promise.",
      mustDefine: ["Stack"],
      tests: [
        { append: `s = Stack()\ns.push(1); s.push(2); s.push(3)\nprint(s.pop(), s.size())`, expect: "3 2" },
      ],
    },
    {
      title: "Name mangling",
      tier: "core", uses: ["__name -> _Class__name", "AttributeError (L11)"],
      prompt: `<p>Define <code>Box</code>: <code>__init__(self, value)</code> stores
        <code>self.__value</code>; <code>get(self)</code> returns it. The test checks that
        <code>box.__value</code> raises <code>AttributeError</code> but
        <code>box._Box__value</code> works.</p>`,
      solution: `class Box:\n    def __init__(self, value):\n        self.__value = value\n    def get(self):\n        return self.__value`,
      success: "__value is rewritten to _Box__value — hidden by convention, not by force.",
      mustDefine: ["Box"],
      tests: [
        { append: `b = Box(42)\nprint(b.get())\ntry:\n    b.__value\nexcept AttributeError:\n    print("mangled")\nprint(b._Box__value)`, expect: "42\nmangled\n42" },
      ],
    },
    {
      title: "Read-only property",
      tier: "core", uses: ["@property with no setter", "AttributeError on write"],
      prompt: `<p>Define <code>Celsius</code>: <code>__init__(self, degrees)</code> stores
        <code>self._degrees</code>; a property <code>degrees</code> returns it (no setter — writes
        should fail).</p>`,
      solution: `class Celsius:\n    def __init__(self, degrees):\n        self._degrees = degrees\n    @property\n    def degrees(self):\n        return self._degrees`,
      success: "A property with only a getter is read-only.",
      mustDefine: ["Celsius"],
      tests: [
        { append: `c = Celsius(25)\nprint(c.degrees)\ntry:\n    c.degrees = 30\nexcept AttributeError:\n    print("read-only")`, expect: "25\nread-only" },
      ],
    },
    {
      title: "Protected invariant",
      tier: "challenge", uses: ["@property + setter", "raise (L11)", "constructor uses setters"],
      prompt: `<p>Define <code>Percentage</code>: a property <code>value</code> that must always be
        <code>0 &le; value &le; 100</code>. <code>__init__(self, value)</code> assigns through the
        setter; out-of-range writes <code>raise ValueError("0..100")</code>.</p>`,
      solution: `class Percentage:\n    def __init__(self, value):\n        self.value = value\n    @property\n    def value(self):\n        return self._value\n    @value.setter\n    def value(self, v):\n        if not (0 <= v <= 100):\n            raise ValueError("0..100")\n        self._value = v`,
      success: "There is no way to get an invalid Percentage — the setter is the only door.",
      mustDefine: ["Percentage"],
      tests: [
        { append: `p = Percentage(40)\np.value = 90\nprint(p.value)\nfor bad in (-1, 101):\n    try:\n        p.value = bad\n    except ValueError as e:\n        print(e)`, expect: "90\n0..100\n0..100" },
        { append: `try:\n    Percentage(200)\nexcept ValueError as e:\n    print(e)`, expect: "0..100" },
      ],
    },
    {
      title: "dataclass",
      tier: "challenge", uses: ["@dataclass", "type annotations (L12)", "auto __eq__ / __repr__"],
      prompt: `<p>Using <code>@dataclass</code>, define <code>Book</code> with fields <code>title: str</code>,
        <code>pages: int</code>, and <code>read: bool = False</code>.</p>`,
      solution: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int\n    read: bool = False`,
      success: "The decorator writes __init__, __repr__, __eq__ from the annotated fields.",
      mustDefine: ["Book"],
      require: [{ pattern: "@dataclass", hard: true, message: "Use the @dataclass decorator." }],
      tests: [
        { append: `b = Book("Dune", 412)\nprint(b)\nprint(b == Book("Dune", 412))`, expect: "Book(title='Dune', pages=412, read=False)\nTrue" },
      ],
    },
    {
      title: "Immutable Money",
      tier: "boss", uses: ["@dataclass(frozen=True)", "a method returning a new instance", "encapsulated arithmetic"],
      prompt: `<p>Using <code>@dataclass(frozen=True)</code>, define <code>Money</code> with
        <code>cents: int</code>. Add a method <code>plus(self, other)</code> returning a <em>new</em>
        <code>Money</code> with the summed cents (can't mutate — it's frozen). Add a property
        <code>dollars</code> returning <code>cents / 100</code>.</p>`,
      solution: `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Money:\n    cents: int\n    def plus(self, other):\n        return Money(self.cents + other.cents)\n    @property\n    def dollars(self):\n        return self.cents / 100`,
      success: "Frozen = every 'change' is a new object. Safe to share, hash, cache.",
      mustDefine: ["Money"],
      tests: [
        { append: `a = Money(150)\nb = a.plus(Money(75))\nprint(b.cents, b.dollars)\ntry:\n    a.cents = 0\nexcept Exception as e:\n    print(type(e).__name__)`, expect: "225 2.25\nFrozenInstanceError" },
      ],
    },
  ],
},

/* ========================================================== 36 */
{
  id: "virtualenv",
  section: "Environments",
  title: "virtualenv",
  summary: "Why every project needs its own isolated Python: the built-in venv, the older virtualenv, and how activation works.",
  lead: "Installing packages globally guarantees a mess: project A needs Django 3, project B needs Django 5, and now both are broken. A virtual environment is a private box of packages per project.",
  spiral: ["pip & PyPI (L28)", "modules & sys.path (L19)", "the shell PATH concept", "string / path handling (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · What a virtual environment <em>is</em></h2>
      <p>A folder (usually <code>.venv/</code>) containing a copy/link of the Python interpreter, its
      own <code>site-packages/</code>, and scripts. "Activating" it just puts that folder's
      <code>bin/</code> (or <code>Scripts/</code> on Windows) at the front of your <code>PATH</code>,
      so <code>python</code> and <code>pip</code> resolve to the ones inside the box.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="global vs per-project packages">
        <rect x="20" y="20" width="160" height="120" rx="8" fill="var(--bad-bg)" stroke="var(--bad)"/>
        <text x="100" y="40" text-anchor="middle" font-size="12" fill="var(--bad)">system Python</text>
        <text x="100" y="62" text-anchor="middle" font-size="10" font-family="monospace" fill="var(--ink-soft)">django 5</text>
        <text x="100" y="78" text-anchor="middle" font-size="10" font-family="monospace" fill="var(--ink-soft)">numpy 2</text>
        <text x="100" y="94" text-anchor="middle" font-size="10" font-family="monospace" fill="var(--ink-soft)">... clash!</text>
        <rect x="240" y="20" width="150" height="120" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="315" y="40" text-anchor="middle" font-size="12" fill="var(--good)">projA/.venv</text>
        <text x="315" y="62" text-anchor="middle" font-size="10" font-family="monospace" fill="var(--ink-soft)">django 3.2</text>
        <rect x="410" y="20" width="150" height="120" rx="8" fill="var(--good-bg)" stroke="var(--good)"/>
        <text x="485" y="40" text-anchor="middle" font-size="12" fill="var(--good)">projB/.venv</text>
        <text x="485" y="62" text-anchor="middle" font-size="10" font-family="monospace" fill="var(--ink-soft)">django 5.0</text>
      </svg>`, `One box per project. Delete the box, the project's packages are gone — nothing else touched.`)}
    ` },
    { type: "code", title: "The commands", code: `# create (built-in, Python 3.3+):
#   python -m venv .venv
#
# activate:
#   source .venv/bin/activate       # macOS / Linux
#   .venv\\Scripts\\activate          # Windows
#
# now: python, pip point INSIDE .venv
#   pip install django
#   pip freeze > requirements.txt
#
# leave:
#   deactivate
#
# throw away & rebuild:
#   rm -rf .venv && python -m venv .venv && pip install -r requirements.txt
print("venv: built in. virtualenv: the older 3rd-party tool it was based on (faster, more features).")` },
    { type: "html", html: whatif([
      "you <code>pip install</code> something <em>without</em> activating a venv — where does it go, and who else is affected?",
      "you commit <code>.venv/</code> to git — why is that a mistake? what should you commit instead?",
      "two projects both list <code>requests==2.31.0</code> — do their venvs share one copy or have two?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>A virtual environment = a per-project folder with its own interpreter + <code>site-packages</code>.</li>
        <li><code>python -m venv .venv</code> creates it; activating prepends its <code>bin/</code> to <code>PATH</code>.</li>
        <li>Commit <code>requirements.txt</code> / <code>pyproject.toml</code>, <strong>never</strong> <code>.venv/</code> (add it to <code>.gitignore</code>).</li>
        <li><code>virtualenv</code> is the older 3rd-party ancestor of the built-in <code>venv</code>; <code>uv</code> creates them fastest.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — venv", url: "https://docs.python.org/3/library/venv.html" },
    { label: "Python Packaging — Install packages in a virtual environment", url: "https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/" },
    { label: "virtualenv documentation", url: "https://virtualenv.pypa.io/en/latest/" },
  ],
  exercises: [
    {
      title: "Which command?",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>venv_cmd(action)</code>: <code>"create"</code> &rarr;
        <code>"python -m venv .venv"</code>, <code>"activate-unix"</code> &rarr;
        <code>"source .venv/bin/activate"</code>, <code>"leave"</code> &rarr; <code>"deactivate"</code>.
        Unknown &rarr; <code>""</code>.</p>`,
      solution: `def venv_cmd(action):\n    m = {"create": "python -m venv .venv", "activate-unix": "source .venv/bin/activate", "leave": "deactivate"}\n    return m.get(action, "")`,
      success: "Memorise these three; you'll type them daily.",
      mustDefine: ["venv_cmd"],
      tests: [
        { append: `print(venv_cmd("create"))\nprint(venv_cmd("leave"))\nprint(venv_cmd("???"))`, expect: "python -m venv .venv\ndeactivate\n" },
      ],
    },
    {
      title: "Belongs in .gitignore?",
      tier: "warm", uses: ["set membership (L7)", "bool"],
      prompt: `<p>Define <code>gitignore(path)</code> returning <code>True</code> for build/env artefacts
        that should NOT be committed: anything that <em>is</em> or <em>starts with</em>
        <code>.venv</code>, <code>venv/</code>, <code>__pycache__</code>, <code>.pytest_cache</code>,
        <code>dist/</code>, <code>build/</code>, or ends with <code>.pyc</code>.</p>`,
      solution: `def gitignore(path):\n    prefixes = (".venv", "venv/", "__pycache__", ".pytest_cache", "dist/", "build/")\n    if path.endswith(".pyc"):\n        return True\n    for p in prefixes:\n        if path == p or path.startswith(p):\n            return True\n    return False`,
      success: "Generated files are recreated from source — committing them just causes churn.",
      mustDefine: ["gitignore"],
      tests: [
        { append: `print(gitignore(".venv/bin/python"), gitignore("src/app.py"), gitignore("mod.pyc"), gitignore("__pycache__/x"))`, expect: "True False True True" },
      ],
    },
    {
      title: "Diff two environments",
      tier: "core", uses: ["parse pip freeze (L28)", "sets (L7)", "sorted"],
      prompt: `<p>Given two <code>pip freeze</code> outputs as strings, define
        <code>only_in_first(a, b)</code> returning a sorted list of package <em>names</em> (the part
        before <code>==</code>) present in <code>a</code> but not in <code>b</code>.</p>`,
      solution: `def only_in_first(a, b):\n    def names(text):\n        out = set()\n        for line in text.splitlines():\n            line = line.strip()\n            if line and "==" in line:\n                out.add(line.split("==")[0])\n        return out\n    return sorted(names(a) - names(b))`,
      success: "Set difference is the whole job once you've parsed the names.",
      mustDefine: ["only_in_first"],
      tests: [
        { append: `a = "django==5.0\\nrequests==2.31.0\\nrich==13.7\\n"\nb = "django==5.0\\nrequests==2.31.0\\n"\nprint(only_in_first(a, b))`, expect: "['rich']" },
        { append: `print(only_in_first("x==1\\n", "x==2\\n"))`, expect: "[]" },
      ],
    },
    {
      title: "Reproducible-install script",
      tier: "challenge", uses: ["f-strings / join (L4)", "list of steps", "functions (L10)"],
      prompt: `<p>Define <code>setup_script(reqs_file)</code> returning the three shell commands (joined by
        <code>"\\n"</code>) to recreate an environment from scratch: remove the old venv, create a new
        one, install from <code>reqs_file</code>.</p>
        <pre>rm -rf .venv\npython -m venv .venv\n.venv/bin/pip install -r requirements.txt</pre>`,
      solution: `def setup_script(reqs_file):\n    lines = [\n        "rm -rf .venv",\n        "python -m venv .venv",\n        f".venv/bin/pip install -r {reqs_file}",\n    ]\n    return "\\n".join(lines)`,
      success: "This is what CI does on every run — a clean box, then the lockfile.",
      mustDefine: ["setup_script"],
      tests: [
        { append: `print(setup_script("requirements.txt"))`, expect: "rm -rf .venv\npython -m venv .venv\n.venv/bin/pip install -r requirements.txt" },
      ],
    },
  ],
},

/* ========================================================== 37 */
{
  id: "pipenv",
  section: "Environments",
  title: "Pipenv",
  summary: "One tool tying a virtualenv to a Pipfile + Pipfile.lock, with a split between default and dev dependencies.",
  lead: "Pipenv was the first popular 'do it all' tool: it makes the venv, resolves dependencies, and writes a deterministic lockfile — from a friendlier Pipfile instead of raw requirements.txt.",
  spiral: ["pip & requirements (L28)", "virtualenv (L36)", "lockfiles & determinism (L28)", "TOML-ish config parsing (L30)", "dicts (L8)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Pipfile vs requirements.txt</h2>
      <p>A <code>Pipfile</code> (TOML) separates <strong>[packages]</strong> (runtime) from
      <strong>[dev-packages]</strong> (linters, test runners) and records the Python version. Running
      Pipenv produces <code>Pipfile.lock</code> — every package pinned with a hash.</p>` },
    { type: "code", title: "A Pipfile", code: `sample = '''
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
flask = ">=2.0"
requests = "*"

[dev-packages]
pytest = "*"
ruff = "*"

[requires]
python_version = "3.12"
'''
print(sample.strip().splitlines()[0])` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Command</th><th>Does</th></tr>
        <tr><td><code>pipenv install flask</code></td><td>add to <code>[packages]</code>, install, update the lock</td></tr>
        <tr><td><code>pipenv install --dev pytest</code></td><td>add to <code>[dev-packages]</code></td></tr>
        <tr><td><code>pipenv install</code></td><td>create the venv &amp; install everything from the lock</td></tr>
        <tr><td><code>pipenv install --deploy</code></td><td>CI mode: fail if the lock is stale</td></tr>
        <tr><td><code>pipenv shell</code> / <code>pipenv run pytest</code></td><td>enter the venv / run one command in it</td></tr>
        <tr><td><code>pipenv --rm</code></td><td>delete the venv</td></tr>
      </table>
      <div class="note"><b>Where it sits today</b> Pipenv is stable and widely used, but momentum has
      moved to <code>uv</code> and <code>Poetry</code> for new projects. The concepts — a manifest, a
      lock, a dev/runtime split — carry across all of them.</div>` },
    { type: "html", html: whatif([
      "you edit <code>Pipfile</code> by hand and run <code>pipenv install</code> — does <code>Pipfile.lock</code> update?",
      "CI runs <code>pipenv install --deploy</code> and the lock doesn't match the Pipfile — should it pass or fail?",
      "<code>[dev-packages]</code> has <code>pytest</code> — is it installed on the production server with <code>pipenv install --deploy</code>? (no, unless <code>--dev</code>)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Pipenv = virtualenv + dependency resolution + <code>Pipfile</code> (manifest) + <code>Pipfile.lock</code> (pinned + hashed).</li>
        <li><code>[packages]</code> = runtime, <code>[dev-packages]</code> = tooling — installed only with <code>--dev</code>.</li>
        <li>Commit both <code>Pipfile</code> and <code>Pipfile.lock</code>; the lock is what makes installs reproducible.</li>
        <li>The manifest / lock / dev-split pattern is universal — you'll see it again in Poetry, pdm, uv.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Pipenv documentation", url: "https://pipenv.pypa.io/en/latest/" },
    { label: "Pipenv — Pipfile spec", url: "https://pipenv.pypa.io/en/latest/pipfile.html" },
    { label: "Python Packaging — Managing dependencies", url: "https://packaging.python.org/en/latest/tutorials/managing-dependencies/" },
  ],
  exercises: [
    {
      title: "runtime vs dev",
      tier: "warm", uses: ["set membership (L7)", "classify"],
      prompt: `<p>Define <code>section_for(pkg)</code>: known dev tools
        (<code>pytest</code>, <code>ruff</code>, <code>black</code>, <code>mypy</code>, <code>tox</code>)
        &rarr; <code>"dev-packages"</code>; anything else &rarr; <code>"packages"</code>.</p>`,
      solution: `def section_for(pkg):\n    dev = {"pytest", "ruff", "black", "mypy", "tox"}\n    return "dev-packages" if pkg in dev else "packages"`,
      success: "Test/lint tools ship in [dev-packages] — they're not needed at runtime.",
      mustDefine: ["section_for"],
      tests: [
        { append: `print(section_for("flask"), section_for("pytest"), section_for("requests"))`, expect: "packages dev-packages packages" },
      ],
    },
    {
      title: "Parse a Pipfile",
      tier: "core", uses: ["tomllib (L30)", "nested dict access (L8)"],
      prompt: `<p>Define <code>runtime_deps(pipfile_text)</code> returning a sorted list of the package
        names under <code>[packages]</code> (just the keys). Missing section &rarr; <code>[]</code>.</p>`,
      solution: `import tomllib\n\ndef runtime_deps(pipfile_text):\n    d = tomllib.loads(pipfile_text)\n    return sorted(d.get("packages", {}))`,
      success: "A Pipfile is TOML — tomllib reads it fine.",
      mustDefine: ["runtime_deps"],
      tests: [
        { append: `t = '[packages]\\nflask = ">=2.0"\\nrequests = "*"\\n[dev-packages]\\npytest = "*"\\n'\nprint(runtime_deps(t))`, expect: "['flask', 'requests']" },
        { append: `print(runtime_deps('[requires]\\npython_version = "3.12"\\n'))`, expect: "[]" },
      ],
    },
    {
      title: "Required Python version",
      tier: "core", uses: ["tomllib", ".get chain with default", "None handling (L11)"],
      prompt: `<p>Define <code>python_version(pipfile_text)</code> returning
        <code>[requires] python_version</code> as a string, or <code>"any"</code> if unset.</p>`,
      solution: `import tomllib\n\ndef python_version(pipfile_text):\n    d = tomllib.loads(pipfile_text)\n    return d.get("requires", {}).get("python_version", "any")`,
      success: "Chain .get so a missing [requires] doesn't blow up.",
      mustDefine: ["python_version"],
      tests: [
        { append: `print(python_version('[requires]\\npython_version = "3.12"\\n'))`, expect: "3.12" },
        { append: `print(python_version('[packages]\\nflask = "*"\\n'))`, expect: "any" },
      ],
    },
    {
      title: "Lock freshness",
      tier: "challenge", uses: ["compare two dicts / sets (L7, L8)", "tomllib", "bool"],
      prompt: `<p>Define <code>lock_is_stale(pipfile_text, locked_names)</code>: parse the Pipfile,
        collect all package names from <code>[packages]</code> and <code>[dev-packages]</code>, and
        return <code>True</code> if that set differs from the given <code>locked_names</code> set —
        i.e. the lock needs regenerating.</p>`,
      solution: `import tomllib\n\ndef lock_is_stale(pipfile_text, locked_names):\n    d = tomllib.loads(pipfile_text)\n    declared = set(d.get("packages", {})) | set(d.get("dev-packages", {}))\n    return declared != set(locked_names)`,
      success: "This is the check `pipenv install --deploy` runs in CI.",
      mustDefine: ["lock_is_stale"],
      tests: [
        { append: `t = '[packages]\\nflask = "*"\\n[dev-packages]\\npytest = "*"\\n'\nprint(lock_is_stale(t, {"flask", "pytest"}))`, expect: "False" },
        { append: `t = '[packages]\\nflask = "*"\\nrich = "*"\\n'\nprint(lock_is_stale(t, {"flask"}))`, expect: "True" },
      ],
    },
  ],
},

/* ========================================================== 38 */
{
  id: "pyenv",
  section: "Environments",
  title: "pyenv",
  summary: "Install and switch between multiple Python *interpreter* versions per machine, per project, or per shell.",
  lead: "venv/Pipenv isolate packages. pyenv isolates the Python itself — so this project runs on 3.9 and that one on 3.13, without touching your system Python.",
  spiral: ["virtualenv (packages) vs pyenv (interpreters)", "the shell PATH & shims idea", "reading a config file (L4)", "version comparison (L28)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Two different problems</h2>
      <table class="tbl">
        <tr><th></th><th>isolates</th><th>tool</th></tr>
        <tr><td>Which packages?</td><td><code>site-packages</code></td><td>venv, Pipenv, Poetry, uv</td></tr>
        <tr><td>Which Python?</td><td>the interpreter binary</td><td><b>pyenv</b> (and <code>uv python</code>)</td></tr>
      </table>
      <p>pyenv downloads and builds Python versions into <code>~/.pyenv/versions/</code>, then uses
      <strong>shims</strong> — tiny fake <code>python</code> scripts on your <code>PATH</code> — to
      dispatch to whichever version is "selected" for the current directory.</p>` },
    { type: "code", title: "The commands", code: `# list what's installable / installed:
#   pyenv install --list
#   pyenv versions
#
# install a version:
#   pyenv install 3.12.4
#
# choose which is active:
#   pyenv global 3.12.4          # machine default
#   pyenv local 3.11.9           # this dir + subdirs -> writes .python-version
#   pyenv shell 3.10.14          # just this terminal session
#
# check:
#   python --version
#   pyenv which python
print("Selection precedence:  shell  >  local (.python-version)  >  global")` },
    { type: "html", html: whatif([
      "there's a <code>.python-version</code> file in a folder — which Python runs when you <code>cd</code> in?",
      "you set <code>pyenv shell 3.10</code> then open a <em>new</em> terminal — is 3.10 still active there?",
      "pyenv picks the interpreter; a project still needs a venv — why aren't they the same thing?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>pyenv manages <strong>interpreter versions</strong>; venv/Pipenv manage <strong>packages</strong> — you usually use both.</li>
        <li><code>pyenv install X</code>, then <code>pyenv global / local / shell X</code> to select it.</li>
        <li><code>pyenv local</code> writes a <code>.python-version</code> file — commit it so the team's Python matches.</li>
        <li>Precedence: <code>shell</code> &gt; <code>local</code> &gt; <code>global</code>. Shims on <code>PATH</code> do the dispatch.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "pyenv — GitHub README", url: "https://github.com/pyenv/pyenv" },
    { label: "pyenv — command reference", url: "https://github.com/pyenv/pyenv/blob/master/COMMANDS.md" },
    { label: "Real Python — Managing Multiple Python Versions With pyenv", url: "https://realpython.com/intro-to-pyenv/" },
  ],
  exercises: [
    {
      title: "Packages or interpreter?",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>tool_for(need)</code>: <code>"switch-python-version"</code> &rarr;
        <code>"pyenv"</code>, <code>"isolate-packages"</code> &rarr; <code>"venv"</code>,
        <code>"lockfile"</code> &rarr; <code>"pipenv"</code>. Unknown &rarr; <code>"?"</code>.</p>`,
      solution: `def tool_for(need):\n    m = {"switch-python-version": "pyenv", "isolate-packages": "venv", "lockfile": "pipenv"}\n    return m.get(need, "?")`,
      success: "pyenv = which Python; venv = which packages.",
      mustDefine: ["tool_for"],
      tests: [
        { append: `print(tool_for("switch-python-version"), tool_for("isolate-packages"), tool_for("x"))`, expect: "pyenv venv ?" },
      ],
    },
    {
      title: "Read .python-version",
      tier: "core", uses: ["strip / splitlines (L4)", "first non-empty line"],
      prompt: `<p>Define <code>selected_version(file_text)</code> returning the first non-blank, trimmed
        line of a <code>.python-version</code> file, or <code>""</code> if the file is empty.</p>`,
      solution: `def selected_version(file_text):\n    for line in file_text.splitlines():\n        line = line.strip()\n        if line:\n            return line\n    return ""`,
      success: "It's a one-line file — just the version string.",
      mustDefine: ["selected_version"],
      tests: [
        { append: `print(selected_version("\\n  3.12.4  \\n"))`, expect: "3.12.4" },
        { append: `print(selected_version("   \\n"))`, expect: "" },
      ],
    },
    {
      title: "Selection precedence",
      tier: "core", uses: ["if/elif fallthrough (L5)", "None (L11)"],
      prompt: `<p>Define <code>active_version(shell, local, glob)</code> — each is a version string or
        <code>None</code>. Return the first that is set, in order <code>shell</code>, then
        <code>local</code>, then <code>glob</code>; if all are <code>None</code>, return
        <code>"system"</code>.</p>`,
      solution: `def active_version(shell, local, glob):\n    if shell is not None:\n        return shell\n    if local is not None:\n        return local\n    if glob is not None:\n        return glob\n    return "system"`,
      success: "shell > local > global > system.",
      mustDefine: ["active_version"],
      tests: [
        { append: `print(active_version(None, "3.11.9", "3.12.4"))`, expect: "3.11.9" },
        { append: `print(active_version("3.10.14", "3.11.9", "3.12.4"))`, expect: "3.10.14" },
        { append: `print(active_version(None, None, None))`, expect: "system" },
      ],
    },
    {
      title: "Newest matching version",
      tier: "challenge", uses: ["parse versions to tuples (L28)", "filter by prefix", "max (L10)"],
      prompt: `<p>Given <code>installed</code> (a list of <code>"X.Y.Z"</code> strings) and a
        <code>series</code> like <code>"3.11"</code>, define <code>latest_in(installed, series)</code>
        returning the highest installed version in that <code>X.Y</code> series, or <code>""</code> if
        none match. Compare numerically.</p>`,
      solution: `def latest_in(installed, series):\n    want = tuple(int(x) for x in series.split("."))\n    best = None\n    best_v = ""\n    for v in installed:\n        parts = tuple(int(x) for x in v.split("."))\n        if parts[:len(want)] == want:\n            if best is None or parts > best:\n                best = parts\n                best_v = v\n    return best_v`,
      success: "Match the series on the numeric tuple prefix; keep the biggest.",
      mustDefine: ["latest_in"],
      tests: [
        { append: `print(latest_in(["3.11.2", "3.11.10", "3.12.1", "3.9.18"], "3.11"))`, expect: "3.11.10" },
        { append: `print(latest_in(["3.12.1"], "3.10"))`, expect: "" },
      ],
    },
  ],
},

/* ========================================================== 39 */
{
  id: "file-handling",
  section: "File Handling",
  title: "File Handling (incl. glob)",
  summary: "open() with with, read/write/append modes, iterating lines, pathlib, and finding files with glob.",
  lead: "Reading and writing files is how programs talk to the outside world between runs. The with statement (Lesson 27) makes it safe; a few modes and patterns cover most of it.",
  spiral: ["with / context managers (L27)", "strings: split, strip, join (L4)", "loops over lines (L6)", "lists (L7)", "modules: os / glob / pathlib (L19)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · <code>open</code>, modes, and <code>with</code></h2>
      <table class="tbl">
        <tr><th>Mode</th><th>Meaning</th></tr>
        <tr><td><code>"r"</code></td><td>read (default); error if the file is missing</td></tr>
        <tr><td><code>"w"</code></td><td>write; <strong>truncates</strong> (wipes) an existing file</td></tr>
        <tr><td><code>"a"</code></td><td>append; writes go to the end</td></tr>
        <tr><td><code>"x"</code></td><td>create; error if it already exists</td></tr>
        <tr><td><code>"rb"</code> / <code>"wb"</code></td><td>binary (bytes, not text)</td></tr>
      </table>
      <p>Always pair with <code>with</code> so the file is flushed and closed no matter what.</p>` },
    { type: "code", title: "write, append, read", code: `with open("log.txt", "w") as f:
    f.write("line 1\\n")
    f.write("line 2\\n")

with open("log.txt", "a") as f:
    f.write("line 3\\n")

with open("log.txt") as f:
    whole = f.read()
print(whole)

with open("log.txt") as f:
    for i, line in enumerate(f, 1):        # iterate lines lazily
        print(i, line.rstrip())` },
    { type: "html", html: whatif([
      "you open an existing 100-line file with <code>\"w\"</code> and write nothing — what's in it afterwards?",
      "you <code>for line in f:</code> — does each <code>line</code> include the trailing <code>\\n</code>?",
      "the file is 5 GB — is <code>f.read()</code> or the <code>for line in f</code> loop the safe choice?",
    ]) },

    { type: "html", html: `
      <h2>2 · pathlib — paths as objects</h2>` },
    { type: "code", title: "Path operations", code: `from pathlib import Path

p = Path("data") / "reports" / "q3.txt"     # / joins path parts
print(p.name, p.suffix, p.stem, p.parent)

Path("out").mkdir(exist_ok=True)
Path("out/note.txt").write_text("hello")     # open+write+close in one call
print(Path("out/note.txt").read_text())
print(Path("out/note.txt").exists())` },

    { type: "html", html: `
      <h2>3 · Finding files with <code>glob</code></h2>
      <p><code>*</code> = any run of chars (not <code>/</code>), <code>?</code> = one char,
      <code>**</code> = any number of directories (recursive).</p>` },
    { type: "code", title: "glob patterns", code: `import glob
from pathlib import Path

for name in ["a.py", "b.py", "c.txt"]:
    Path(name).write_text("")

print(sorted(glob.glob("*.py")))            # ['a.py', 'b.py']
print(sorted(Path(".").glob("*.txt")))      # pathlib's own glob -> Path objects
# recursive:  glob.glob("src/**/*.py", recursive=True)` },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>with open(path, mode) as f:</code> — modes <code>r/w/a/x</code> (+<code>b</code> for bytes). <code>"w"</code> wipes.</li>
        <li>Read: <code>f.read()</code> (all), <code>f.readlines()</code> (list), <code>for line in f</code> (lazy, keeps <code>\\n</code>).</li>
        <li><code>pathlib.Path</code>: <code>/</code> to join, <code>.name/.suffix/.stem/.parent</code>, <code>.read_text()/.write_text()</code>, <code>.exists()</code>, <code>.mkdir()</code>.</li>
        <li><code>glob.glob("*.py")</code> / <code>Path().glob(...)</code> to find files; <code>**</code> + <code>recursive=True</code> for subdirs.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Tutorial — Reading and Writing Files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" },
    { label: "Python docs — pathlib", url: "https://docs.python.org/3/library/pathlib.html" },
    { label: "Python docs — glob", url: "https://docs.python.org/3/library/glob.html" },
  ],
  exercises: [
    {
      title: "Write and read back",
      tier: "warm", uses: ["with open (L27)", "w then r modes"],
      prompt: `<p>Write <code>"alpha\\nbeta\\ngamma"</code> to <code>words.txt</code>, then read the whole
        file and print it.</p><pre>alpha\nbeta\ngamma</pre>`,
      solution: `with open("words.txt", "w") as f:\n    f.write("alpha\\nbeta\\ngamma")\nwith open("words.txt") as f:\n    print(f.read())`,
      success: "Two with blocks: one to write, one to read.",
      tests: [{ expect: "alpha\nbeta\ngamma" }],
    },
    {
      title: "Count the lines",
      tier: "warm", uses: ["iterate lines (L6)", "accumulator (L6)"],
      prompt: `<p>Define <code>line_count(path)</code> returning how many lines a file has, by iterating
        it (don't <code>read()</code> the whole thing).</p>`,
      solution: `def line_count(path):\n    n = 0\n    with open(path) as f:\n        for _ in f:\n            n += 1\n    return n`,
      success: "for line in f is lazy — fine for huge files.",
      mustDefine: ["line_count"],
      tests: [
        { append: `open("t.txt", "w").write("a\\nb\\nc\\n")\nprint(line_count("t.txt"))`, expect: "3" },
        { append: `open("e.txt", "w").write("")\nprint(line_count("e.txt"))`, expect: "0" },
      ],
    },
    {
      title: "Append a log entry",
      tier: "core", uses: ["\"a\" mode", "read back", "strip (L4)"],
      prompt: `<p>Define <code>append_line(path, text)</code> that appends <code>text + "\\n"</code> to the
        file (creating it if needed), then returns the file's full contents.</p>`,
      solution: `def append_line(path, text):\n    with open(path, "a") as f:\n        f.write(text + "\\n")\n    with open(path) as f:\n        return f.read()`,
      success: "\"a\" never truncates — every call adds to the end.",
      mustDefine: ["append_line"],
      tests: [
        { append: `open("log.txt", "w").write("start\\n")\nappend_line("log.txt", "one")\nprint(append_line("log.txt", "two"))`, expect: "start\none\ntwo\n" },
      ],
    },
    {
      title: "pathlib parts",
      tier: "core", uses: ["pathlib.Path", ".stem / .suffix / .parent"],
      prompt: `<p>Define <code>describe(path_str)</code> returning the tuple
        <code>(stem, suffix, parent_as_str)</code> for a path like
        <code>"data/reports/q3.txt"</code> &rarr; <code>("q3", ".txt", "data/reports")</code>.</p>`,
      solution: `from pathlib import Path\n\ndef describe(path_str):\n    p = Path(path_str)\n    return (p.stem, p.suffix, str(p.parent))`,
      success: "Path pulls a name apart without string slicing.",
      mustDefine: ["describe"],
      tests: [
        { append: `print(describe("data/reports/q3.txt"))`, expect: "('q3', '.txt', 'data/reports')" },
        { append: `print(describe("readme.md"))`, expect: "('readme', '.md', '.')" },
      ],
    },
    {
      title: "Find and total",
      tier: "challenge", uses: ["glob (this lesson)", "read_text", "int() (L9)", "accumulator (L6)"],
      prompt: `<p>Define <code>total_txt(folder)</code> that globs <code>folder + "/*.txt"</code>, reads
        each file, and returns the sum of the numbers inside them (each file holds one integer).</p>`,
      solution: `import glob\nfrom pathlib import Path\n\ndef total_txt(folder):\n    total = 0\n    for name in glob.glob(folder + "/*.txt"):\n        total += int(Path(name).read_text())\n    return total`,
      success: "glob finds the matching files; you do the rest.",
      mustDefine: ["total_txt"],
      tests: [
        { append: `from pathlib import Path\nPath("ex_ft").mkdir(exist_ok=True)\nfor n, v in [("n1.txt","10"),("n2.txt","20"),("n3.txt","30"),("skip.md","999")]:\n    Path("ex_ft/" + n).write_text(v)\nprint(total_txt("ex_ft"))`, expect: "60" },
      ],
    },
    {
      title: "Merge sorted files",
      tier: "boss", uses: ["glob + sorted", "read lines", "collect + sort + write", "with (L27)"],
      prompt: `<p>Define <code>merge(pattern, out_path)</code>: glob for files matching <code>pattern</code>,
        read every line from all of them, sort the combined lines (stripped, blanks dropped), write
        them one per line to <code>out_path</code>, and return the number of lines written.</p>`,
      solution: `import glob\n\ndef merge(pattern, out_path):\n    lines = []\n    for name in glob.glob(pattern):\n        with open(name) as f:\n            for line in f:\n                line = line.strip()\n                if line:\n                    lines.append(line)\n    lines.sort()\n    with open(out_path, "w") as f:\n        for line in lines:\n            f.write(line + "\\n")\n    return len(lines)`,
      success: "Glob → gather → sort → write. A tiny ETL job.",
      mustDefine: ["merge"],
      tests: [
        { append: `from pathlib import Path\nPath("ex_mg").mkdir(exist_ok=True)\nPath("ex_mg/p1.log").write_text("banana\\napple\\n")\nPath("ex_mg/p2.log").write_text("cherry\\n\\napple\\n")\nprint(merge("ex_mg/*.log", "ex_mg/all.txt"))\nprint(Path("ex_mg/all.txt").read_text())`, expect: "4\napple\napple\nbanana\ncherry\n" },
      ],
    },
  ],
},

/* ========================================================== 40 */
{
  id: "gil",
  section: "Concurrency",
  title: "The GIL",
  summary: "Why CPython runs only one thread of Python bytecode at a time — and what that does (and doesn't) mean for your code.",
  lead: "Before threads or async make sense, you need this: CPython has a Global Interpreter Lock. It shapes every concurrency choice you'll make.",
  spiral: ["threads vs processes (this section)", "CPU-bound vs I/O-bound work", "functions & timing (L10, L27)", "why shared state is dangerous (L24)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · One lock, one running thread</h2>
      <p>The <strong>GIL</strong> is a mutex inside CPython. To execute Python bytecode, a thread must
      hold it — so <strong>only one thread runs Python at a time</strong>, even on a 16-core machine.
      Threads take turns (every few milliseconds, or when one blocks).</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="threads taking turns under the GIL">
        <text x="20" y="30" font-size="12" fill="var(--ink-soft)">4 threads, 1 core actually running Python:</text>
        <g font-family="monospace" font-size="11">
          <rect x="20" y="45" width="80" height="22" fill="var(--accent)" stroke="var(--box-line)"/><text x="60" y="60" text-anchor="middle" fill="#fff">T1</text>
          <rect x="100" y="45" width="80" height="22" fill="var(--panel-2)" stroke="var(--line)"/><text x="140" y="60" text-anchor="middle" fill="var(--ink-soft)">T2</text>
          <rect x="180" y="45" width="80" height="22" fill="var(--accent)" stroke="var(--box-line)"/><text x="220" y="60" text-anchor="middle" fill="#fff">T2</text>
          <rect x="260" y="45" width="80" height="22" fill="var(--panel-2)" stroke="var(--line)"/><text x="300" y="60" text-anchor="middle" fill="var(--ink-soft)">T3</text>
          <rect x="340" y="45" width="80" height="22" fill="var(--accent)" stroke="var(--box-line)"/><text x="380" y="60" text-anchor="middle" fill="#fff">T1</text>
          <rect x="420" y="45" width="80" height="22" fill="var(--panel-2)" stroke="var(--line)"/><text x="460" y="60" text-anchor="middle" fill="var(--ink-soft)">T4</text>
        </g>
        <text x="20" y="100" font-size="11" fill="var(--ink-soft)">Only the highlighted slice holds the GIL and runs. The rest wait.</text>
      </svg>`, `Concurrency (progress on many tasks) — yes. Parallelism (many CPU cores at once) — not for pure Python threads.`)}
    ` },
    { type: "html", html: `
      <h2>2 · What it means for you</h2>
      <table class="tbl">
        <tr><th>Workload</th><th>Do threads help?</th><th>Because</th></tr>
        <tr><td><b>I/O-bound</b> (network, disk, DB, <code>sleep</code>)</td><td><b>Yes</b></td><td>a thread <em>releases</em> the GIL while it waits — others run</td></tr>
        <tr><td><b>CPU-bound</b> (crunching numbers in pure Python)</td><td><b>No</b></td><td>every thread wants the GIL to compute — they just take turns</td></tr>
      </table>
      <ul>
        <li><b>CPU-bound &amp; want real cores?</b> Use <code>multiprocessing</code> (separate processes, each with its own GIL) or a C-extension (NumPy) that releases the GIL.</li>
        <li><b>Lots of waiting?</b> Threads or <code>asyncio</code> both work; async scales to thousands of tasks more cheaply.</li>
        <li>The GIL also means <code>+=</code> on a shared variable across threads is still a <em>race</em> — it's several bytecodes, and a switch can land mid-way. Use a <code>Lock</code>.</li>
      </ul>
      <div class="note"><b>Changing landscape</b> Python 3.13+ has an experimental free-threaded build
      (<code>--disable-gil</code>). It's opt-in and not yet the default — assume the GIL unless you
      know otherwise.</div>` },
    { type: "html", html: whatif([
      "you run 8 threads that each do <code>sum(range(10_000_000))</code> — faster than doing them one after another?",
      "you run 8 threads that each download a URL — faster than sequential?",
      "two threads both do <code>counter += 1</code> a million times with no lock — is the final count reliably 2,000,000?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>The GIL = only one thread executes Python bytecode at a time in CPython.</li>
        <li>I/O-bound work: threads/async help (the GIL is released during the wait).</li>
        <li>CPU-bound work: use <code>multiprocessing</code> (real cores) or release the GIL via C code.</li>
        <li>Shared mutable state across threads still needs a <code>Lock</code> — the GIL doesn't make <code>+=</code> atomic.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python Wiki — Global Interpreter Lock", url: "https://wiki.python.org/moin/GlobalInterpreterLock" },
    { label: "Real Python — What Is the Python GIL?", url: "https://realpython.com/python-gil/" },
    { label: "PEP 703 — Making the GIL optional", url: "https://peps.python.org/pep-0703/" },
  ],
  exercises: [
    {
      title: "Threads or processes?",
      tier: "warm", uses: ["dict / if (L5, L8)"],
      prompt: `<p>Define <code>recommend(kind)</code>: <code>"io"</code> &rarr; <code>"threads"</code>,
        <code>"cpu"</code> &rarr; <code>"processes"</code>, <code>"many-io"</code> &rarr;
        <code>"asyncio"</code>. Unknown &rarr; <code>"profile-first"</code>.</p>`,
      solution: `def recommend(kind):\n    m = {"io": "threads", "cpu": "processes", "many-io": "asyncio"}\n    return m.get(kind, "profile-first")`,
      success: "CPU-bound → processes (dodge the GIL). I/O-bound → threads or async.",
      mustDefine: ["recommend"],
      tests: [
        { append: `print(recommend("io"), recommend("cpu"), recommend("many-io"), recommend("?"))`, expect: "threads processes asyncio profile-first" },
      ],
    },
    {
      title: "Would threading speed this up?",
      tier: "core", uses: ["classify a workload", "bool"],
      prompt: `<p>Define <code>threads_help(description)</code> returning <code>True</code> if the text
        mentions any of <code>"download"</code>, <code>"request"</code>, <code>"read file"</code>,
        <code>"query"</code>, <code>"sleep"</code> (I/O-bound), else <code>False</code>.</p>`,
      solution: `def threads_help(description):\n    io_words = ["download", "request", "read file", "query", "sleep"]\n    for w in io_words:\n        if w in description:\n            return True\n    return False`,
      success: "I/O-bound (waiting) → threads help; pure computation → they don't.",
      mustDefine: ["threads_help"],
      tests: [
        { append: `print(threads_help("download 100 images"), threads_help("multiply two big matrices"), threads_help("query the database"))`, expect: "True False True" },
      ],
    },
    {
      title: "Safe shared counter",
      tier: "core", uses: ["threading.Lock as a context manager (L27)", "class (L32)"],
      prompt: `<p>Define <code>SafeCounter</code>: <code>__init__</code> sets <code>self.value = 0</code>
        and <code>self.lock = threading.Lock()</code>; <code>increment(self)</code> does
        <code>with self.lock: self.value += 1</code>. (We test the logic directly — the Lock is the
        habit that makes it correct <em>under threads</em>.)</p>`,
      solution: `import threading\n\nclass SafeCounter:\n    def __init__(self):\n        self.value = 0\n        self.lock = threading.Lock()\n    def increment(self):\n        with self.lock:\n            self.value += 1`,
      success: "The `with self.lock:` block is the critical section — one thread in it at a time.",
      mustDefine: ["SafeCounter"],
      require: [{ pattern: "with\\s+self\\.lock", hard: true, message: "Guard the += with `with self.lock:`." }],
      tests: [
        { append: `c = SafeCounter()\nfor _ in range(1000):\n    c.increment()\nprint(c.value)`, expect: "1000" },
      ],
    },
    {
      title: "Estimate speedup",
      tier: "challenge", uses: ["Amdahl-style reasoning", "arithmetic (L3)", "round"],
      prompt: `<p>Define <code>speedup(io_fraction, workers)</code>: a rough model where the
        <code>io_fraction</code> of the work overlaps perfectly across <code>workers</code> and the
        rest is serial. Return <code>round(1 / ((1 - io_fraction) + io_fraction / workers), 2)</code>.</p>`,
      solution: `def speedup(io_fraction, workers):\n    return round(1 / ((1 - io_fraction) + io_fraction / workers), 2)`,
      success: "If nothing overlaps (io_fraction 0), speedup is 1 no matter how many workers.",
      mustDefine: ["speedup"],
      tests: [
        { append: `print(speedup(0.0, 8))`, expect: "1.0" },
        { append: `print(speedup(0.9, 4))`, expect: "3.08" },
        { append: `print(speedup(1.0, 4))`, expect: "4.0" },
      ],
    },
  ],
},

/* ========================================================== 41 */
{
  id: "threading",
  section: "Concurrency",
  title: "Threading",
  summary: "Run I/O-bound work concurrently with threading.Thread; coordinate shared state with Lock, Queue and Event.",
  lead: "Threads share memory and are cheap to start — ideal for 'do a hundred slow network calls at once'. The cost: you must protect anything they touch together.",
  spiral: ["the GIL: threads help I/O, not CPU (L40)", "Lock as a context manager (L27)", "functions passed as target (L10, L20)", "Queue (stacks & queues, L15)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Start, join</h2>
      <p><code>Thread(target=fn, args=(...))</code> then <code>.start()</code> runs <code>fn</code>
      concurrently; <code>.join()</code> waits for it to finish.</p>` },
    { type: "code", title: "The shape (conceptual)", code: `import threading

results = {}

def fetch(name, delay):
    # imagine a network call taking 'delay' seconds
    results[name] = f"data for {name}"

threads = []
for name in ["a", "b", "c"]:
    t = threading.Thread(target=fetch, args=(name, 1))
    t.start()
    threads.append(t)

for t in threads:
    t.join()          # wait for all

print(sorted(results.items()))` },
    { type: "html", html: `
      <h2>2 · Coordination primitives</h2>
      <table class="tbl">
        <tr><th>Tool</th><th>For</th></tr>
        <tr><td><code>Lock</code></td><td>one thread at a time in a critical section — <code>with lock:</code></td></tr>
        <tr><td><code>RLock</code></td><td>a lock the same thread can acquire again (re-entrant)</td></tr>
        <tr><td><code>Event</code></td><td>a flag threads can <code>wait()</code> on and one can <code>set()</code></td></tr>
        <tr><td><code>queue.Queue</code></td><td>thread-safe hand-off between producers and consumers — no manual locking</td></tr>
        <tr><td><code>ThreadPoolExecutor</code></td><td>a managed pool; <code>executor.map(fn, items)</code> and you're done</td></tr>
      </table>
      <div class="note"><b>Prefer the high level.</b>
      <code>concurrent.futures.ThreadPoolExecutor</code> or a <code>Queue</code> removes most
      hand-rolled lock bugs. Reach for raw <code>Lock</code> only for a small guarded counter or cache.</div>` },
    { type: "html", html: whatif([
      "two threads run <code>total += x</code> with no lock — name the failure mode (it has a name).",
      "you <code>.start()</code> a thread but never <code>.join()</code> it — what might happen at program exit?",
      "the shared thing is a <code>queue.Queue</code> — do you still need a <code>Lock</code> around <code>.put</code>/<code>.get</code>? (no)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>Thread(target=fn, args=...)</code>, <code>.start()</code>, <code>.join()</code>. Threads share memory.</li>
        <li>Guard shared mutable state with <code>with lock:</code>; race conditions are the classic bug.</li>
        <li><code>queue.Queue</code> is thread-safe by itself — the clean way to pass work between threads.</li>
        <li>Best default: <code>ThreadPoolExecutor(max_workers=N).map(fn, items)</code>. Threads = I/O concurrency, not CPU parallelism (Lesson 40).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — threading", url: "https://docs.python.org/3/library/threading.html" },
    { label: "Python docs — concurrent.futures", url: "https://docs.python.org/3/library/concurrent.futures.html" },
    { label: "Real Python — An Intro to Threading in Python", url: "https://realpython.com/intro-to-python-threading/" },
  ],
  exercises: [
    {
      title: "Race condition, spotted",
      tier: "warm", uses: ["reasoning about shared state (L24, L40)"],
      prompt: `<p>Define <code>is_racy(code)</code> returning <code>True</code> if a snippet mutates a
        name shared across threads without a lock: it contains <code>+=</code> or <code>-=</code> or
        <code>.append(</code> AND does <strong>not</strong> contain <code>with</code> and
        <code>lock</code>.</p>`,
      solution: `def is_racy(code):\n    mutates = ("+=" in code) or ("-=" in code) or (".append(" in code)\n    guarded = ("with" in code) and ("lock" in code)\n    return mutates and not guarded`,
      success: "Unguarded read-modify-write on shared state = data race.",
      mustDefine: ["is_racy"],
      tests: [
        { append: `print(is_racy("total += x"))`, expect: "True" },
        { append: `print(is_racy("with lock:\\n    total += x"))`, expect: "False" },
        { append: `print(is_racy("return x * 2"))`, expect: "False" },
      ],
    },
    {
      title: "Lock-guarded section",
      tier: "core", uses: ["threading.Lock", "with (L27)", "class (L32)"],
      prompt: `<p>Define <code>Ledger</code>: <code>__init__</code> sets <code>self.total = 0</code> and a
        <code>threading.Lock</code>. <code>add(self, n)</code> adds <code>n</code> to
        <code>self.total</code> inside <code>with self.lock:</code>.</p>`,
      solution: `import threading\n\nclass Ledger:\n    def __init__(self):\n        self.total = 0\n        self.lock = threading.Lock()\n    def add(self, n):\n        with self.lock:\n            self.total += n`,
      success: "Only one thread executes the guarded block at a time.",
      mustDefine: ["Ledger"],
      require: [{ pattern: "with\\s+self\\.lock", hard: true, message: "Wrap the update in `with self.lock:`." }],
      tests: [
        { append: `L = Ledger()\nfor n in [10, 20, 30, 40]:\n    L.add(n)\nprint(L.total)`, expect: "100" },
      ],
    },
    {
      title: "Producer/consumer with a Queue",
      tier: "core", uses: ["queue.Queue", "put / get", "loop (L6)"],
      prompt: `<p>Define <code>drain(items)</code>: put every item into a <code>queue.Queue</code>, then
        <code>get()</code> them all back into a list and return it (FIFO order preserved).</p>`,
      solution: `import queue\n\ndef drain(items):\n    q = queue.Queue()\n    for x in items:\n        q.put(x)\n    out = []\n    while not q.empty():\n        out.append(q.get())\n    return out`,
      success: "Queue is the thread-safe hand-off — no Lock needed around put/get.",
      mustDefine: ["drain"],
      tests: [
        { append: `print(drain([1, 2, 3, 4]))`, expect: "[1, 2, 3, 4]" },
        { append: `print(drain([]))`, expect: "[]" },
      ],
    },
    {
      title: "Pick the pool size",
      tier: "challenge", uses: ["arithmetic (L3)", "min/max (L10)", "reasoning about I/O vs CPU (L40)"],
      prompt: `<p>Define <code>workers_for(tasks, kind, cores)</code>: for <code>"cpu"</code> work, return
        <code>min(tasks, cores)</code>; for <code>"io"</code> work, return
        <code>min(tasks, cores * 5)</code> but never more than <code>32</code>.</p>`,
      solution: `def workers_for(tasks, kind, cores):\n    if kind == "cpu":\n        return min(tasks, cores)\n    return min(tasks, cores * 5, 32)`,
      success: "CPU: ~one worker per core. I/O: oversubscribe, since workers mostly wait.",
      mustDefine: ["workers_for"],
      tests: [
        { append: `print(workers_for(100, "cpu", 8))`, expect: "8" },
        { append: `print(workers_for(100, "io", 8))`, expect: "32" },
        { append: `print(workers_for(3, "io", 8))`, expect: "3" },
      ],
    },
  ],
},

/* ========================================================== 42 */
{
  id: "multiprocessing",
  section: "Concurrency",
  title: "Multiprocessing",
  summary: "Sidestep the GIL with separate processes: real parallelism for CPU-bound work, at the cost of no shared memory.",
  lead: "One process per CPU core, each with its own Python and its own GIL. They can't share variables — they pass copies — but they genuinely run at the same time.",
  spiral: ["the GIL blocks thread parallelism (L40)", "threading's API mirrors this (L41)", "pickling / serialising data (json, L19)", "functions as targets (L10)", "pure functions (L31)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Processes, not threads</h2>
      <table class="tbl">
        <tr><th></th><th>Threads</th><th>Processes</th></tr>
        <tr><td>Memory</td><td>shared (and dangerous)</td><td>separate (must copy data across)</td></tr>
        <tr><td>Start-up cost</td><td>cheap</td><td>heavier (a new interpreter)</td></tr>
        <tr><td>CPU parallelism</td><td>no (GIL)</td><td><b>yes</b> — one GIL each</td></tr>
        <tr><td>Crash blast radius</td><td>takes down the process</td><td>isolated</td></tr>
      </table>` },
    { type: "code", title: "The shape (conceptual — needs a real OS)", code: `# from multiprocessing import Pool
#
# def heavy(n):
#     return sum(i * i for i in range(n))
#
# if __name__ == "__main__":          # REQUIRED on Windows/macOS spawn
#     with Pool(4) as pool:
#         results = pool.map(heavy, [10**6, 10**6, 10**6, 10**6])
#     print(results)
print("Pool(4).map(fn, items) -> fn runs on 4 cores at once, results gathered in order.")` },
    { type: "html", html: `
      <div class="warn"><b>Two rules you'll hit immediately</b>
      <ul style="margin:6px 0 0">
        <li>Guard the entry point with <code>if __name__ == "__main__":</code> — child processes
        re-import your file, and without the guard they'd re-spawn forever.</li>
        <li>Everything sent to a worker must be <strong>picklable</strong> (serialisable): plain data,
        module-level functions — <em>not</em> lambdas or open files or DB connections.</li>
      </ul></div>` },
    { type: "html", html: `
      <h2>2 · Sharing results back</h2>
      <ul>
        <li><code>Pool.map</code> / <code>concurrent.futures.ProcessPoolExecutor</code> — return values come back automatically (pickled).</li>
        <li><code>multiprocessing.Queue</code> / <code>Pipe</code> — stream messages between processes.</li>
        <li><code>Value</code> / <code>Array</code> / shared-memory blocks — genuine shared memory when you must.</li>
      </ul>` },
    { type: "html", html: whatif([
      "you pass a <code>lambda</code> to <code>Pool.map</code> — what error, and why?",
      "your task is <code>time.sleep(2)</code> ten times — is <code>multiprocessing</code> or <code>threading</code> the better fit?",
      "you forget <code>if __name__ == \"__main__\":</code> on Windows — what does the program do?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Separate processes = separate memory + separate GILs = <strong>true CPU parallelism</strong>.</li>
        <li><code>Pool(N).map(fn, items)</code> or <code>ProcessPoolExecutor</code> — the easy path.</li>
        <li>Data crosses process boundaries by <strong>pickling</strong>; workers must be top-level functions with picklable args.</li>
        <li>Always guard with <code>if __name__ == "__main__":</code>. Use it for CPU-bound work; threads/async for I/O.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — multiprocessing", url: "https://docs.python.org/3/library/multiprocessing.html" },
    { label: "Python docs — ProcessPoolExecutor", url: "https://docs.python.org/3/library/concurrent.futures.html#processpoolexecutor" },
    { label: "Real Python — Speed Up Your Python With Concurrency", url: "https://realpython.com/python-concurrency/" },
  ],
  exercises: [
    {
      title: "Picklable target?",
      tier: "warm", uses: ["string checks (L4)", "bool"],
      prompt: `<p>Define <code>can_send(target_src)</code> returning <code>False</code> if the target's
        source contains <code>lambda</code> or <code>open(</code>, else <code>True</code> — a rough
        "is this safe to hand a worker process?" check.</p>`,
      solution: `def can_send(target_src):\n    return "lambda" not in target_src and "open(" not in target_src`,
      success: "Workers get pickled copies — lambdas and file handles don't pickle.",
      mustDefine: ["can_send"],
      tests: [
        { append: `print(can_send("def heavy(n):\\n    return n * n"))`, expect: "True" },
        { append: `print(can_send("f = lambda n: n * n"))`, expect: "False" },
      ],
    },
    {
      title: "The heavy function",
      tier: "warm", uses: ["a pure CPU-bound function (L10, L31)", "genexpr (L26)"],
      prompt: `<p>Define <code>heavy(n)</code> returning <code>sum(i * i for i in range(n))</code> — the
        kind of pure, top-level function you'd hand to <code>Pool.map</code>.</p>`,
      solution: `def heavy(n):\n    return sum(i * i for i in range(n))`,
      success: "Top-level, pure, picklable args — the recipe for a worker task.",
      mustDefine: ["heavy"],
      tests: [
        { append: `print(heavy(5), heavy(0))`, expect: "30 0" },
      ],
    },
    {
      title: "Simulate a pool map",
      tier: "core", uses: ["map / build a list (L20, L25)", "order preserved"],
      prompt: `<p>Define <code>pool_map(fn, items)</code> that returns <code>[fn(x) for x in items]</code>
        — same contract as <code>Pool.map</code> (results in input order), just without the real
        processes.</p>`,
      solution: `def pool_map(fn, items):\n    out = []\n    for x in items:\n        out.append(fn(x))\n    return out`,
      success: "Pool.map's guarantee: same order out as in, regardless of which worker finished first.",
      mustDefine: ["pool_map"],
      tests: [
        { append: `print(pool_map(lambda n: n * n, [1, 2, 3, 4]))`, expect: "[1, 4, 9, 16]" },
        { append: `print(pool_map(str, []))`, expect: "[]" },
      ],
    },
    {
      title: "Chunk the work",
      tier: "challenge", uses: ["// and % (L3)", "slicing (L4)", "build a list of lists"],
      prompt: `<p>Define <code>chunk(items, n)</code> splitting <code>items</code> into <code>n</code>
        near-equal contiguous lists (earlier chunks get the remainder). Used to divide a big job
        among <code>n</code> workers. <code>chunk([1,2,3,4,5], 2)</code> &rarr;
        <code>[[1, 2, 3], [4, 5]]</code>.</p>`,
      solution: `def chunk(items, n):\n    out = []\n    total = len(items)\n    base = total // n\n    extra = total % n\n    start = 0\n    for i in range(n):\n        size = base + (1 if i < extra else 0)\n        out.append(items[start:start + size])\n        start += size\n    return out`,
      success: "Spread the remainder over the first `extra` chunks so sizes differ by at most 1.",
      mustDefine: ["chunk"],
      tests: [
        { append: `print(chunk([1, 2, 3, 4, 5], 2))`, expect: "[[1, 2, 3], [4, 5]]" },
        { append: `print(chunk([1, 2, 3, 4], 4))`, expect: "[[1], [2], [3], [4]]" },
        { append: `print(chunk([1, 2], 4))`, expect: "[[1], [2], [], []]" },
      ],
    },
  ],
},

/* ========================================================== 43 */
{
  id: "asyncio",
  section: "Concurrency",
  title: "Asynchrony",
  summary: "async / await and an event loop: thousands of I/O-bound tasks cooperating on one thread, no locks.",
  lead: "One thread, one loop. A coroutine runs until it hits await on something slow, hands control back, and the loop runs another coroutine meanwhile. No GIL fight, no data races.",
  spiral: ["the GIL & I/O concurrency (L40, L41)", "generators pause & resume (L26)", "functions & return (L10)", "iterables / for (L22)", "exceptions (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · coroutines, <code>await</code>, the loop</h2>
      <p><code>async def</code> makes a <strong>coroutine function</strong>; calling it returns a
      coroutine that does nothing until awaited or scheduled. <code>await x</code> means "pause me,
      run others, wake me when <code>x</code> is done". <code>asyncio.run(main())</code> starts the
      event loop.</p>` },
    { type: "code", title: "Sequential await", code: `import asyncio

async def work(name, seconds):
    await asyncio.sleep(seconds)         # yields control while "waiting"
    return f"{name} done"

async def main():
    a = await work("a", 0.01)            # these run one after another
    b = await work("b", 0.01)
    return [a, b]

print(asyncio.run(main()))` },
    { type: "html", html: `
      <h2>2 · Actually concurrent: <code>gather</code></h2>
      <p><code>await asyncio.gather(c1, c2, ...)</code> schedules them all and waits for every one —
      total time is the <em>slowest</em>, not the <em>sum</em>. Results come back in argument order.</p>` },
    { type: "code", title: "gather", code: `import asyncio

async def work(name, seconds):
    await asyncio.sleep(seconds)
    return name.upper()

async def main():
    return await asyncio.gather(
        work("a", 0.03),
        work("b", 0.01),
        work("c", 0.02),
    )

print(asyncio.run(main()))     # ['A', 'B', 'C'] — in order, ~0.03s total not 0.06s` },
    { type: "html", html: whatif([
      "you write <code>await work(...)</code> three times in a row vs <code>asyncio.gather(...)</code> — same result, different total time. Why?",
      "a coroutine does a big pure-Python <code>for</code> loop with no <code>await</code> — do other tasks get a turn? (no — cooperative)",
      "you call <code>work(\"a\", 1)</code> and never <code>await</code> it — does the sleep happen? (no — 'coroutine was never awaited')",
    ]) },
    { type: "html", html: `
      <div class="warn"><b>Async is cooperative.</b>
      A task only yields at an <code>await</code>. Blocking calls (a sync DB driver, <code>time.sleep</code>,
      heavy CPU) freeze the <em>whole</em> loop. Use async-native libraries, or push blocking work to
      <code>asyncio.to_thread(...)</code> / a process pool.</div>
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>async def</code> → coroutine; <code>await</code> → pause here, let the loop run others.</li>
        <li><code>asyncio.run(main())</code> starts the loop; <code>asyncio.gather(*coros)</code> runs many concurrently, results in order.</li>
        <li>One thread → no locks, no races. But one blocking call stalls everything — stay non-blocking.</li>
        <li>Best for <strong>lots of</strong> I/O-bound tasks (web servers, scrapers, API clients).</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — asyncio", url: "https://docs.python.org/3/library/asyncio.html" },
    { label: "Python docs — Coroutines and Tasks", url: "https://docs.python.org/3/library/asyncio-task.html" },
    { label: "Real Python — Async IO in Python", url: "https://realpython.com/async-io-python/" },
  ],
  exercises: [
    {
      title: "First coroutine",
      tier: "warm", uses: ["async def / await", "asyncio.run"],
      prompt: `<p>Define <code>async def greet(name)</code> that <code>await asyncio.sleep(0)</code> then
        returns <code>"hi NAME"</code>. The test runs <code>asyncio.run(greet("ada"))</code>.</p>`,
      solution: `import asyncio\n\nasync def greet(name):\n    await asyncio.sleep(0)\n    return f"hi {name}"`,
      success: "async def + at least one await = a coroutine.",
      mustDefine: ["greet"],
      require: [{ pattern: "async\\s+def\\s+greet", hard: true, message: "greet must be `async def`." }],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(greet("ada")))`, expect: "hi ada" },
      ],
    },
    {
      title: "Await in sequence",
      tier: "core", uses: ["multiple awaits", "build a list", "async main"],
      prompt: `<p>Define <code>async def double(n)</code> (await sleep 0, return <code>n * 2</code>) and
        <code>async def run_all(nums)</code> that awaits <code>double</code> for each number
        <strong>one at a time</strong> and returns the list of results.</p>`,
      solution: `import asyncio\n\nasync def double(n):\n    await asyncio.sleep(0)\n    return n * 2\n\nasync def run_all(nums):\n    out = []\n    for n in nums:\n        out.append(await double(n))\n    return out`,
      success: "await inside a loop = sequential.",
      mustDefine: ["double", "run_all"],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(run_all([1, 2, 3, 4])))`, expect: "[2, 4, 6, 8]" },
      ],
    },
    {
      title: "gather for concurrency",
      tier: "core", uses: ["asyncio.gather", "results in order"],
      prompt: `<p>Define <code>async def square(n)</code> (await sleep 0, return <code>n * n</code>) and
        <code>async def all_squares(nums)</code> that runs them all <strong>concurrently</strong> with
        <code>asyncio.gather</code> and returns the list.</p>`,
      solution: `import asyncio\n\nasync def square(n):\n    await asyncio.sleep(0)\n    return n * n\n\nasync def all_squares(nums):\n    return list(await asyncio.gather(*(square(n) for n in nums)))`,
      success: "gather(*coros) schedules them together; order of results = order of args.",
      mustDefine: ["square", "all_squares"],
      require: [{ pattern: "asyncio\\.gather", hard: true, message: "Use asyncio.gather." }],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(all_squares([1, 2, 3, 4, 5])))`, expect: "[1, 4, 9, 16, 25]" },
        { append: `import asyncio\nprint(asyncio.run(all_squares([])))`, expect: "[]" },
      ],
    },
    {
      title: "Async retry",
      tier: "challenge", uses: ["try/except in async (L11)", "loop (L6)", "await", "raise (L11)"],
      prompt: `<p>Define <code>async def with_retry(coro_fn, attempts)</code>: call and
        <code>await coro_fn()</code>; if it raises, try again, up to <code>attempts</code> times; if
        the last attempt still raises, let the exception propagate. Return the successful result.</p>`,
      solution: `async def with_retry(coro_fn, attempts):\n    for i in range(attempts):\n        try:\n            return await coro_fn()\n        except Exception:\n            if i == attempts - 1:\n                raise`,
      success: "await the call inside try; re-raise only after the final attempt.",
      mustDefine: ["with_retry"],
      tests: [
        { append: `import asyncio\nstate = {"n": 0}\nasync def flaky():\n    state["n"] += 1\n    if state["n"] < 3:\n        raise ValueError("nope")\n    return "ok"\nprint(asyncio.run(with_retry(flaky, 5)), state["n"])`, expect: "ok 3" },
        { append: `import asyncio\nasync def always_bad():\n    raise RuntimeError("boom")\ntry:\n    asyncio.run(with_retry(always_bad, 2))\nexcept RuntimeError as e:\n    print("gave up:", e)`, expect: "gave up: boom" },
      ],
    },
    {
      title: "Bounded concurrency",
      tier: "boss", uses: ["asyncio.Semaphore", "gather", "async with (L27)", "closures (L24)"],
      prompt: `<p>Define <code>async def run_limited(fns, limit)</code>: run every zero-arg coroutine
        function in <code>fns</code> concurrently, but no more than <code>limit</code> at once (use an
        <code>asyncio.Semaphore</code>). Return the list of results in order.</p>`,
      solution: `import asyncio\n\nasync def run_limited(fns, limit):\n    sem = asyncio.Semaphore(limit)\n    async def guarded(fn):\n        async with sem:\n            return await fn()\n    return list(await asyncio.gather(*(guarded(fn) for fn in fns)))`,
      success: "A Semaphore(limit) as `async with` caps how many coroutines are past that line at once.",
      mustDefine: ["run_limited"],
      tests: [
        { append: `import asyncio\ndef make(i):\n    async def f():\n        await asyncio.sleep(0)\n        return i * 10\n    return f\nfns = [make(i) for i in range(5)]\nprint(asyncio.run(run_limited(fns, 2)))`, expect: "[0, 10, 20, 30, 40]" },
      ],
    },
  ],
},

/* ========================================================== 44 */
{
  id: "typing",
  section: "Static Typing",
  title: "typing",
  summary: "The vocabulary for type hints: Optional, Union / |, generics like list[int], Callable, TypedDict, Protocol.",
  lead: "Lesson 12 covered x: int and -> str. This is the rest of the grammar — enough to annotate real code that a checker can verify.",
  spiral: ["basic annotations (L12)", "list / dict / tuple (L7)", "None & Optional (L11, L12)", "functions as values (L20)", "dataclasses (L35)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The core shapes</h2>
      <table class="tbl">
        <tr><th>Hint</th><th>Means</th></tr>
        <tr><td><code>list[int]</code>, <code>dict[str, float]</code>, <code>tuple[int, str]</code></td><td>a container of specific element types</td></tr>
        <tr><td><code>tuple[int, ...]</code></td><td>a tuple of any length, all ints</td></tr>
        <tr><td><code>str | None</code> &nbsp;(older: <code>Optional[str]</code>)</td><td>a str or None</td></tr>
        <tr><td><code>int | str</code> &nbsp;(older: <code>Union[int, str]</code>)</td><td>either type</td></tr>
        <tr><td><code>Any</code></td><td>opt out of checking for this value</td></tr>
        <tr><td><code>Callable[[int, int], int]</code></td><td>a function taking two ints, returning int</td></tr>
        <tr><td><code>Iterable[str]</code>, <code>Sequence[int]</code>, <code>Mapping[str, int]</code></td><td>"anything loopable / indexable / dict-like" — accept these over concrete types</td></tr>
      </table>` },
    { type: "code", title: "Reading hints back", code: `from typing import Callable

def apply(fn: Callable[[int], int], values: list[int]) -> list[int]:
    return [fn(v) for v in values]

print(apply(lambda x: x * 2, [1, 2, 3]))
print(apply.__annotations__)          # hints are stored here at runtime` },

    { type: "html", html: `
      <h2>2 · <code>TypedDict</code> and <code>Protocol</code></h2>
      <p><code>TypedDict</code> types a dict with known string keys. <code>Protocol</code> is
      structural typing — "anything with these methods", no inheritance needed.</p>` },
    { type: "code", title: "Structural typing", code: `from typing import TypedDict, Protocol

class User(TypedDict):
    name: str
    age: int

def describe(u: User) -> str:
    return f"{u['name']} ({u['age']})"

print(describe({"name": "Ada", "age": 36}))

class HasArea(Protocol):
    def area(self) -> float: ...

def total(shapes: list[HasArea]) -> float:
    return sum(s.area() for s in shapes)

class Sq:
    def __init__(self, s): self.s = s
    def area(self) -> float: return self.s * self.s

print(total([Sq(2), Sq(3)]))          # Sq never mentions HasArea — it just fits` },
    { type: "html", html: whatif([
      "your function is annotated <code>-> int</code> but you <code>return \"oops\"</code> — does it error when you run it? (no — hints aren't enforced)",
      "you accept <code>Sequence[int]</code> instead of <code>list[int]</code> — what else can callers now pass?",
      "a class satisfies a <code>Protocol</code>'s methods by accident — is it still accepted? (yes — that's structural typing)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Generics: <code>list[int]</code>, <code>dict[str, T]</code>. Unions: <code>A | B</code>, nullable: <code>T | None</code>.</li>
        <li><code>Callable[[args], ret]</code> types functions; abstract types (<code>Iterable</code>, <code>Sequence</code>, <code>Mapping</code>) make APIs flexible.</li>
        <li><code>TypedDict</code> = a dict with a known key schema; <code>Protocol</code> = "has these methods" without inheritance.</li>
        <li>Hints are runtime-inert (stored in <code>__annotations__</code>); a checker (next lessons) verifies them.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — typing", url: "https://docs.python.org/3/library/typing.html" },
    { label: "Python docs — typing spec / type system", url: "https://typing.python.org/en/latest/spec/" },
    { label: "PEP 544 — Protocols (structural subtyping)", url: "https://peps.python.org/pep-0544/" },
  ],
  exercises: [
    {
      title: "Annotate a filter",
      tier: "warm", uses: ["list[int] hint", "-> list[int]", "comprehension (L25)"],
      prompt: `<p>Define <code>positives(nums: list[int]) -&gt; list[int]</code> returning just the
        positive numbers, keeping the exact annotations in the signature.</p>`,
      solution: `def positives(nums: list[int]) -> list[int]:\n    return [n for n in nums if n > 0]`,
      success: "list[int] in and out.",
      mustDefine: ["positives"],
      require: [
        { pattern: "nums\\s*:\\s*list\\[int\\]", hard: true, message: "Annotate nums as list[int]." },
        { pattern: "->\\s*list\\[int\\]", hard: true, message: "Annotate the return as -> list[int]." },
      ],
      tests: [
        { append: `print(positives([-2, 3, 0, 5, -1]))`, expect: "[3, 5]" },
      ],
    },
    {
      title: "Optional return",
      tier: "core", uses: ["str | None", "if / return None (L11)"],
      prompt: `<p>Define <code>find(names: list[str], letter: str) -&gt; str | None</code> returning the
        first name starting with <code>letter</code>, or <code>None</code>.</p>`,
      solution: `def find(names: list[str], letter: str) -> str | None:\n    for n in names:\n        if n.startswith(letter):\n            return n\n    return None`,
      success: "str | None documents 'maybe a string'.",
      mustDefine: ["find"],
      require: [{ pattern: "->\\s*str\\s*\\|\\s*None", hard: true, message: "Annotate the return as -> str | None." }],
      tests: [
        { append: `print(find(["Ada", "Bo", "Amy"], "A"))`, expect: "Ada" },
        { append: `print(find(["Bo"], "Z"))`, expect: "None" },
      ],
    },
    {
      title: "Callable parameter",
      tier: "core", uses: ["Callable[[...], ...]", "higher-order function (L20)"],
      prompt: `<p>Define <code>reduce2(fn: Callable[[int, int], int], nums: list[int], start: int) -&gt; int</code>
        that folds <code>fn</code> across <code>nums</code> from <code>start</code>.</p>`,
      solution: `from typing import Callable\n\ndef reduce2(fn: Callable[[int, int], int], nums: list[int], start: int) -> int:\n    acc = start\n    for n in nums:\n        acc = fn(acc, n)\n    return acc`,
      success: "Callable[[int, int], int] = 'two ints in, one int out'.",
      mustDefine: ["reduce2"],
      require: [{ pattern: "Callable\\[\\[int,\\s*int\\],\\s*int\\]", hard: true, message: "Annotate fn as Callable[[int, int], int]." }],
      tests: [
        { append: `print(reduce2(lambda a, b: a + b, [1, 2, 3, 4], 0))`, expect: "10" },
        { append: `print(reduce2(lambda a, b: a * b, [1, 2, 3, 4], 1))`, expect: "24" },
      ],
    },
    {
      title: "TypedDict schema",
      tier: "challenge", uses: ["TypedDict", "dict access (L8)", "f-strings (L4)"],
      prompt: `<p>Define a <code>TypedDict</code> called <code>Point</code> with <code>x: int</code>,
        <code>y: int</code>, and a function <code>manhattan(p: Point, q: Point) -&gt; int</code>
        returning <code>abs(dx) + abs(dy)</code>.</p>`,
      solution: `from typing import TypedDict\n\nclass Point(TypedDict):\n    x: int\n    y: int\n\ndef manhattan(p: Point, q: Point) -> int:\n    return abs(p["x"] - q["x"]) + abs(p["y"] - q["y"])`,
      success: "TypedDict gives a plain dict a checkable key schema.",
      mustDefine: ["Point", "manhattan"],
      require: [{ pattern: "TypedDict", hard: true, message: "Use TypedDict for Point." }],
      tests: [
        { append: `print(manhattan({"x": 0, "y": 0}, {"x": 3, "y": 4}))`, expect: "7" },
      ],
    },
    {
      title: "Protocol duck-typing",
      tier: "boss", uses: ["Protocol", "structural typing", "genexpr (L26)", "classes (L32)"],
      prompt: `<p>Define a <code>Protocol</code> <code>Sized</code> requiring a method
        <code>size(self) -&gt; int</code>. Define <code>biggest(items: list[Sized]) -&gt; Sized</code>
        returning the item with the largest <code>size()</code> (assume non-empty). It must accept
        <em>any</em> class with a matching <code>size</code> method — no inheritance.</p>`,
      solution: `from typing import Protocol\n\nclass Sized(Protocol):\n    def size(self) -> int: ...\n\ndef biggest(items: list[Sized]) -> Sized:\n    best = items[0]\n    for it in items[1:]:\n        if it.size() > best.size():\n            best = it\n    return best`,
      success: "Protocol says 'anything shaped like this' — the killer feature for flexible APIs.",
      mustDefine: ["Sized", "biggest"],
      require: [{ pattern: "Protocol", hard: true, message: "Sized must subclass Protocol." }],
      tests: [
        { append: `class Bag:\n    def __init__(self, n): self.n = n\n    def size(self): return self.n\nb = biggest([Bag(3), Bag(9), Bag(1)])\nprint(b.size())`, expect: "9" },
      ],
    },
  ],
},

/* ========================================================== 45 */
{
  id: "mypy",
  section: "Static Typing",
  title: "mypy",
  summary: "The original static type checker: runs over your annotated code and reports type errors before you ship.",
  lead: "Hints do nothing at runtime. mypy is the program that reads them and tells you 'you're passing a str where an int is expected' — at your desk, not in production.",
  spiral: ["typing vocabulary (L44)", "annotations (L12)", "Optional / None handling (L11)", "config in pyproject.toml (L30)", "exit codes / CI mindset"],
  blocks: [
    { type: "html", html: `
      <h2>1 · How you use it</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>pip install mypy
mypy src/                 # check a package
mypy --strict src/        # turn on every optional check</code></pre>
      <p>It prints one line per problem with file:line, and exits non-zero if it found any — so CI can
      gate on it. It runs <em>without executing your code</em>.</p>` },
    { type: "code", title: "What mypy would flag", code: `def area(w: int, h: int) -> int:
    return w * h

x = area(3, "4")        # mypy: Argument 2 to "area" has incompatible type "str"; expected "int"
y: int = area(3, 4)     # fine
z: str = area(3, 4)     # mypy: Incompatible types in assignment (expression has type "int", variable has type "str")

def first(xs: list[int]) -> int:
    return xs[0]         # mypy (strict): fine, but flags if xs could be empty? no — that's not a type error

print("mypy sees all this at check time; Python happily runs the buggy line at runtime")` },
    { type: "html", html: `
      <h2>2 · Config &amp; gradual typing</h2>
      <p>Settings live in <code>[tool.mypy]</code> in <code>pyproject.toml</code>. You don't have to
      annotate everything on day one — mypy checks what's annotated and you tighten over time.</p>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>[tool.mypy]
python_version = "3.12"
strict = true
warn_unused_ignores = true
# per-module escape hatch:
[[tool.mypy.overrides]]
module = "legacy.*"
ignore_errors = true</code></pre>
      <ul>
        <li><code># type: ignore[code]</code> on a line silences one specific error (keep the code — it documents which).</li>
        <li><code>reveal_type(x)</code> makes mypy print what type it inferred for <code>x</code> — great for debugging.</li>
        <li>Third-party packages ship type info (or a <code>types-<em>foo</em></code> stub package on PyPI).</li>
      </ul>` },
    { type: "html", html: whatif([
      "you add a wrong annotation but never run mypy — does the program misbehave?",
      "mypy is green but the code still crashes at runtime — is that possible? (yes — types ≠ all bugs)",
      "you slap <code># type: ignore</code> on every red line — did you fix anything?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>mypy src/</code> reads annotations, reports type mismatches, exits non-zero on errors — perfect for CI.</li>
        <li>It never runs your code; it catches a <em>class</em> of bugs, not all bugs.</li>
        <li>Configure in <code>[tool.mypy]</code>; adopt gradually; <code>--strict</code> when ready.</li>
        <li><code># type: ignore[code]</code> for a deliberate exception; <code>reveal_type(x)</code> to see inferred types.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "mypy documentation", url: "https://mypy.readthedocs.io/en/stable/" },
    { label: "mypy — Configuration file", url: "https://mypy.readthedocs.io/en/stable/config_file.html" },
    { label: "mypy — Cheat sheet", url: "https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html" },
  ],
  exercises: [
    {
      title: "Would mypy complain?",
      tier: "warm", uses: ["reasoning about types (L44)", "bool"],
      prompt: `<p>Define <code>type_ok(expected, actual)</code> — a toy check — returning <code>True</code>
        if <code>expected == actual</code> or <code>expected == "Any"</code> or
        (<code>expected == "float"</code> and <code>actual == "int"</code>) [int is accepted where
        float is expected]. Else <code>False</code>.</p>`,
      solution: `def type_ok(expected, actual):\n    if expected == actual or expected == "Any":\n        return True\n    if expected == "float" and actual == "int":\n        return True\n    return False`,
      success: "int-where-float-expected is the one implicit widening the type system allows.",
      mustDefine: ["type_ok"],
      tests: [
        { append: `print(type_ok("int", "int"), type_ok("int", "str"), type_ok("float", "int"), type_ok("Any", "list"))`, expect: "True False True True" },
      ],
    },
    {
      title: "Annotate so mypy is happy",
      tier: "core", uses: ["correct annotations (L12, L44)", "int arithmetic (L3)"],
      prompt: `<p>Define <code>average(nums: list[float]) -&gt; float</code> returning the mean (assume
        non-empty). Annotations must be exactly right — a checker would verify them.</p>`,
      solution: `def average(nums: list[float]) -> float:\n    return sum(nums) / len(nums)`,
      success: "sum(list[float]) / int -> float. The annotation matches.",
      mustDefine: ["average"],
      require: [
        { pattern: "nums\\s*:\\s*list\\[float\\]", hard: true, message: "Annotate nums: list[float]." },
        { pattern: "->\\s*float", hard: true, message: "Annotate -> float." },
      ],
      tests: [
        { append: `print(average([2.0, 4.0, 6.0]))`, expect: "4.0" },
      ],
    },
    {
      title: "Narrow the Optional",
      tier: "core", uses: ["str | None input (L44)", "if x is None guard (L11)", "-> int"],
      prompt: `<p>Define <code>length_or_zero(s: str | None) -&gt; int</code>: return <code>len(s)</code>,
        but <code>0</code> if <code>s is None</code>. (A checker requires the <code>None</code> check
        before <code>len(s)</code>.)</p>`,
      solution: `def length_or_zero(s: str | None) -> int:\n    if s is None:\n        return 0\n    return len(s)`,
      success: "After `if s is None: return`, the checker knows s is a str below.",
      mustDefine: ["length_or_zero"],
      require: [{ pattern: "s\\s+is\\s+None", hard: true, message: "Guard with `if s is None:` before using s." }],
      tests: [
        { append: `print(length_or_zero("hello"), length_or_zero(None))`, expect: "5 0" },
      ],
    },
    {
      title: "Read [tool.mypy]",
      tier: "challenge", uses: ["tomllib (L30)", "bool defaults", "dict.get chain"],
      prompt: `<p>Define <code>strict_mode(pyproject_text)</code> returning the boolean
        <code>[tool.mypy] strict</code>, defaulting to <code>False</code> if absent.</p>`,
      solution: `import tomllib\n\ndef strict_mode(pyproject_text):\n    d = tomllib.loads(pyproject_text)\n    return d.get("tool", {}).get("mypy", {}).get("strict", False)`,
      success: "Same .get chain as any tool's config.",
      mustDefine: ["strict_mode"],
      tests: [
        { append: `print(strict_mode('[tool.mypy]\\nstrict = true\\n'))`, expect: "True" },
        { append: `print(strict_mode('[project]\\nname = "x"\\n'))`, expect: "False" },
      ],
    },
  ],
},

/* ========================================================== 46 */
{
  id: "pyright",
  section: "Static Typing",
  title: "pyright",
  summary: "A fast type checker (and the engine behind VS Code's Pylance): great inference, watch mode, per-file strictness.",
  lead: "Same job as mypy — verify annotations without running the code — but written in TypeScript, very fast, and with strong type inference so you annotate less.",
  spiral: ["typing (L44)", "mypy: same goal, different tool (L45)", "config in JSON / pyproject (L30)", "editor integration"],
  blocks: [
    { type: "html", html: `
      <h2>1 · pyright vs mypy</h2>
      <table class="tbl">
        <tr><th></th><th>mypy</th><th>pyright</th></tr>
        <tr><td>Written in</td><td>Python</td><td>TypeScript (Node)</td></tr>
        <tr><td>Speed</td><td>fine</td><td>very fast; has a <code>--watch</code> mode</td></tr>
        <tr><td>Inference</td><td>good</td><td>often stronger — fewer annotations needed</td></tr>
        <tr><td>Editor</td><td>via plugin</td><td><b>is</b> Pylance in VS Code — instant squiggles</td></tr>
        <tr><td>Config</td><td><code>[tool.mypy]</code></td><td><code>pyrightconfig.json</code> or <code>[tool.pyright]</code></td></tr>
        <tr><td>Strictness</td><td>global-ish</td><td><code>basic</code> / <code>standard</code> / <code>strict</code>, even per file via a comment</td></tr>
      </table>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>npm install -g pyright   # or: pip install pyright (bundles node)
pyright src/
pyright --watch src/</code></pre>
      <p>Many teams run <strong>both</strong>: pyright in the editor for instant feedback, mypy in CI
      as the gate. They agree on most things; where they differ it's usually strictness knobs.</p>` },
    { type: "code", title: "A per-file strictness pragma", code: `# pyright: strict
def scale(v: float, factor: float) -> float:
    return v * factor

# pyright would flag a missing return annotation ONLY in this file, because of the comment above
print(scale(2.0, 1.5))` },
    { type: "html", html: whatif([
      "pyright in your editor says green but CI's mypy fails — what usually explains it?",
      "you have zero annotations — does pyright still find bugs? (yes, via inference, up to a point)",
      "a file has <code># pyright: basic</code> — does that relax checking for the whole project or just that file?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>pyright = fast, inference-heavy type checker; also the VS Code experience (Pylance).</li>
        <li>Config: <code>pyrightconfig.json</code> or <code>[tool.pyright]</code>; strictness is <code>basic</code>/<code>standard</code>/<code>strict</code>, tunable per file.</li>
        <li><code>pyright --watch</code> for a tight loop; pair with mypy in CI if your team wants both.</li>
        <li>Comment pragmas: <code># pyright: strict</code>, <code># pyright: ignore[rule]</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "pyright documentation", url: "https://microsoft.github.io/pyright/" },
    { label: "pyright — Configuration", url: "https://microsoft.github.io/pyright/#/configuration" },
    { label: "Pylance (VS Code) — release notes", url: "https://github.com/microsoft/pylance-release" },
  ],
  exercises: [
    {
      title: "Which tool for which need?",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>pick(need)</code>: <code>"editor-squiggles"</code> &rarr;
        <code>"pyright"</code>, <code>"ci-gate"</code> &rarr; <code>"mypy"</code>,
        <code>"watch-mode"</code> &rarr; <code>"pyright"</code>. Unknown &rarr; <code>"either"</code>.</p>`,
      solution: `def pick(need):\n    m = {"editor-squiggles": "pyright", "ci-gate": "mypy", "watch-mode": "pyright"}\n    return m.get(need, "either")`,
      success: "They do the same job; the difference is speed and integration.",
      mustDefine: ["pick"],
      tests: [
        { append: `print(pick("editor-squiggles"), pick("ci-gate"), pick("mystery"))`, expect: "pyright mypy either" },
      ],
    },
    {
      title: "Detect the strict pragma",
      tier: "core", uses: ["splitlines / strip (L4)", "startswith", "bool"],
      prompt: `<p>Define <code>is_strict_file(src)</code>: <code>True</code> if any line, once stripped,
        equals <code>"# pyright: strict"</code>.</p>`,
      solution: `def is_strict_file(src):\n    for line in src.splitlines():\n        if line.strip() == "# pyright: strict":\n            return True\n    return False`,
      success: "A single comment line raises strictness for just that file.",
      mustDefine: ["is_strict_file"],
      tests: [
        { append: `print(is_strict_file("x = 1\\n# pyright: strict\\ndef f(): ..."))`, expect: "True" },
        { append: `print(is_strict_file("# pyright: basic\\n"))`, expect: "False" },
      ],
    },
    {
      title: "Read [tool.pyright]",
      tier: "core", uses: ["tomllib (L30)", "default value", "dict.get chain"],
      prompt: `<p>Define <code>type_check_mode(pyproject_text)</code> returning
        <code>[tool.pyright] typeCheckingMode</code> (a string) or <code>"standard"</code> if unset.</p>`,
      solution: `import tomllib\n\ndef type_check_mode(pyproject_text):\n    d = tomllib.loads(pyproject_text)\n    return d.get("tool", {}).get("pyright", {}).get("typeCheckingMode", "standard")`,
      success: "standard is the default; basic/strict adjust up and down.",
      mustDefine: ["type_check_mode"],
      tests: [
        { append: `print(type_check_mode('[tool.pyright]\\ntypeCheckingMode = "strict"\\n'))`, expect: "strict" },
        { append: `print(type_check_mode('[project]\\nname = "x"\\n'))`, expect: "standard" },
      ],
    },
    {
      title: "Agreement report",
      tier: "challenge", uses: ["set operations (L7)", "sorted", "dict (L8)"],
      prompt: `<p>Given two lists of <code>"file:line"</code> strings — errors from <code>mypy</code> and
        from <code>pyright</code> — define <code>compare(mypy_errs, pyright_errs)</code> returning a
        dict <code>{"both": [...], "mypy_only": [...], "pyright_only": [...]}</code>, each list sorted.</p>`,
      solution: `def compare(mypy_errs, pyright_errs):\n    m = set(mypy_errs)\n    p = set(pyright_errs)\n    return {\n        "both": sorted(m & p),\n        "mypy_only": sorted(m - p),\n        "pyright_only": sorted(p - m),\n    }`,
      success: "Set intersection and difference answer 'do the checkers agree?'.",
      mustDefine: ["compare"],
      tests: [
        { append: `print(compare(["a.py:1", "b.py:9"], ["a.py:1", "c.py:3"]))`, expect: "{'both': ['a.py:1'], 'mypy_only': ['b.py:9'], 'pyright_only': ['c.py:3']}" },
      ],
    },
  ],
},

/* ========================================================== 47 */
{
  id: "pyre",
  section: "Static Typing",
  title: "pyre",
  summary: "Meta's type checker: fast (OCaml), incremental, and paired with Pysa for security-focused taint analysis.",
  lead: "A third checker, built for very large codebases. Same core idea; its stand-out is Pysa — following untrusted data through your code to find security bugs.",
  spiral: ["typing (L44)", "mypy / pyright as siblings (L45, L46)", "the idea of data flow / taint", "config files (L30)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Where pyre fits</h2>
      <table class="tbl">
        <tr><th></th><th>Note</th></tr>
        <tr><td>Origin</td><td>Meta (Facebook), open source</td></tr>
        <tr><td>Written in</td><td>OCaml — fast, and <b>incremental</b> (re-checks only what changed)</td></tr>
        <tr><td>Scale</td><td>designed for millions of lines / a persistent server watching the repo</td></tr>
        <tr><td>Setup</td><td><code>pip install pyre-check</code>, then <code>pyre init</code> writes <code>.pyre_configuration</code></td></tr>
        <tr><td>Standout</td><td><b>Pysa</b>: static <em>taint</em> analysis for security</td></tr>
      </table>
      <p>For everyday type checking most projects pick mypy or pyright. Pyre shows up where the
      codebase is huge, or where the security analysis is the point.</p>` },

    { type: "html", html: `
      <h2>2 · Taint analysis (Pysa), in one idea</h2>
      <p>Mark some inputs as <strong>sources</strong> of untrusted data (a request body, a form
      field). Mark dangerous functions as <strong>sinks</strong> (running SQL, shelling out, writing a
      file path). Pysa follows the data: if tainted data reaches a sink without passing through a
      <strong>sanitiser</strong>, that's a reported vulnerability — <em>without running the code</em>.</p>
      ${fig(`
      <svg class="ill" viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="taint flows from source to sink">
        <rect x="20" y="40" width="120" height="34" rx="8" fill="var(--bad-bg)" stroke="var(--bad)"/><text x="80" y="62" text-anchor="middle" font-size="11" fill="var(--bad)">source: request.args</text>
        <line x1="140" y1="57" x2="230" y2="57" stroke="var(--ink-soft)"/>
        <rect x="230" y="40" width="110" height="34" rx="8" fill="var(--warn-bg)" stroke="var(--warn)"/><text x="285" y="62" text-anchor="middle" font-size="11" fill="var(--warn)">(no sanitiser)</text>
        <line x1="340" y1="57" x2="430" y2="57" stroke="var(--ink-soft)"/>
        <rect x="430" y="40" width="150" height="34" rx="8" fill="var(--bad-bg)" stroke="var(--bad)"/><text x="505" y="62" text-anchor="middle" font-size="11" fill="var(--bad)">sink: cursor.execute()</text>
      </svg>`, `Tainted value reaches a SQL sink unsanitised → SQL-injection finding.`)}
    ` },
    { type: "html", html: whatif([
      "tainted input passes through <code>int(...)</code> before the sink — is it still dangerous? (usually not — casting sanitises)",
      "how is taint analysis different from a type check? (it follows <em>where a value goes</em>, not just its type)",
      "why can a static tool find an injection bug your unit tests missed?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Pyre: fast, incremental type checker from Meta — for very large codebases / a watching server.</li>
        <li>Config: <code>.pyre_configuration</code> (JSON) via <code>pyre init</code>.</li>
        <li><b>Pysa</b> adds <strong>taint analysis</strong>: source → (sanitiser?) → sink, to catch injection/traversal bugs statically.</li>
        <li>For plain type checking, mypy/pyright are the common picks; reach for pyre at scale or for the security tooling.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Pyre — documentation", url: "https://pyre-check.org/docs/getting-started/" },
    { label: "Pysa — taint analysis", url: "https://pyre-check.org/docs/pysa-basics/" },
    { label: "Pyre — GitHub", url: "https://github.com/facebook/pyre-check" },
  ],
  exercises: [
    {
      title: "Source, sink, or sanitiser?",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>classify(name)</code>: <code>"request.form"</code> &rarr;
        <code>"source"</code>, <code>"cursor.execute"</code> &rarr; <code>"sink"</code>,
        <code>"int"</code> &rarr; <code>"sanitiser"</code>, <code>"os.system"</code> &rarr;
        <code>"sink"</code>. Unknown &rarr; <code>"neutral"</code>.</p>`,
      solution: `def classify(name):\n    m = {"request.form": "source", "cursor.execute": "sink", "int": "sanitiser", "os.system": "sink"}\n    return m.get(name, "neutral")`,
      success: "Sources bring untrusted data in; sinks act on it; sanitisers neutralise it.",
      mustDefine: ["classify"],
      tests: [
        { append: `print(classify("request.form"), classify("os.system"), classify("int"), classify("len"))`, expect: "source sink sanitiser neutral" },
      ],
    },
    {
      title: "Vulnerable flow?",
      tier: "core", uses: ["list scanning (L6)", "state flag (L24)", "bool"],
      prompt: `<p>Given <code>flow</code> — a list of step names in order — define
        <code>is_vulnerable(flow)</code>: <code>True</code> if a <code>"source"</code> step is
        followed (later in the list) by a <code>"sink"</code> step with <strong>no</strong>
        <code>"sanitiser"</code> step in between.</p>`,
      solution: `def is_vulnerable(flow):\n    tainted = False\n    for step in flow:\n        if step == "source":\n            tainted = True\n        elif step == "sanitiser":\n            tainted = False\n        elif step == "sink" and tainted:\n            return True\n    return False`,
      success: "Carry a 'tainted' flag; a sanitiser clears it; a sink while tainted is a finding.",
      mustDefine: ["is_vulnerable"],
      tests: [
        { append: `print(is_vulnerable(["source", "sink"]))`, expect: "True" },
        { append: `print(is_vulnerable(["source", "sanitiser", "sink"]))`, expect: "False" },
        { append: `print(is_vulnerable(["sink", "source"]))`, expect: "False" },
      ],
    },
    {
      title: "Report all sink hits",
      tier: "challenge", uses: ["loop with index (L6)", "build a list of ints", "taint flag"],
      prompt: `<p>Define <code>findings(flow)</code> returning a list of the <em>indices</em> of every
        <code>"sink"</code> step that is reached while data is tainted (same source/sanitiser rules as
        before).</p>`,
      solution: `def findings(flow):\n    tainted = False\n    hits = []\n    for i, step in enumerate(flow):\n        if step == "source":\n            tainted = True\n        elif step == "sanitiser":\n            tainted = False\n        elif step == "sink" and tainted:\n            hits.append(i)\n    return hits`,
      success: "Same scan, but collect every hit instead of returning at the first.",
      mustDefine: ["findings"],
      tests: [
        { append: `print(findings(["source", "sink", "sanitiser", "sink", "source", "sink"]))`, expect: "[1, 5]" },
        { append: `print(findings(["source", "sanitiser", "sink"]))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 48 */
{
  id: "pydantic",
  section: "Static Typing",
  title: "Pydantic",
  summary: "Runtime data validation from type hints: define a model, and incoming data is parsed, coerced, and checked — or rejected with clear errors.",
  lead: "typing/mypy check your code at your desk. Pydantic checks your DATA at runtime — the request body, the config file, the API response — using the same annotation syntax.",
  spiral: ["annotations & typing (L12, L44)", "dataclasses (L35)", "exceptions (L11)", "dict ↔ object (L8, L32)", "classmethods / validators (L33)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · A model is annotations + guarantees</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>from pydantic import BaseModel, Field, field_validator

class User(BaseModel):
    name: str
    age: int = Field(ge=0, le=150)
    email: str

    @field_validator("email")
    @classmethod
    def must_have_at(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("not an email")
        return v

u = User(name="Ada", age="36", email="ada@x.com")   # "36" -&gt; 36 (coerced)
print(u.age, type(u.age))                            # 36 &lt;class 'int'&gt;
User(name="Bo", age=-1, email="bo@x.com")            # raises ValidationError</code></pre>
      <ul>
        <li>Constructing the model <strong>validates and coerces</strong>: <code>"36"</code>→<code>36</code>, missing/extra/wrong fields → a <code>ValidationError</code> listing every problem.</li>
        <li><code>Field(...)</code> adds constraints (<code>ge</code>, <code>le</code>, <code>min_length</code>, <code>pattern</code>, defaults).</li>
        <li><code>model.model_dump()</code> → dict, <code>model_dump_json()</code> → JSON; <code>User.model_validate(some_dict)</code> to parse.</li>
        <li>Powers FastAPI request/response bodies, settings management (<code>BaseSettings</code>), and any "trust but verify" boundary.</li>
      </ul>
      <div class="note"><b>Not installed here.</b> Pydantic is a third-party package. The exercises
      below build the <em>idea</em> — validate a dict against a schema — in plain Python, so you
      understand what Pydantic automates.</div>` },
    { type: "html", html: whatif([
      "you pass <code>age=\"thirty\"</code> — coerced, or error? what about <code>age=\"30\"</code>?",
      "an incoming dict has an extra key the model doesn't declare — allowed, ignored, or rejected? (configurable; default: ignored in v2? actually forbidden-optional)",
      "why validate at the boundary (on the way in) rather than sprinkling <code>if</code> checks through the code?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>A Pydantic <code>BaseModel</code> turns type hints into <strong>runtime</strong> parsing + validation + coercion.</li>
        <li>Bad data → one <code>ValidationError</code> enumerating every field problem, not a random <code>KeyError</code> deep in your code.</li>
        <li><code>Field(...)</code> constraints, <code>@field_validator</code> custom rules, <code>model_dump()</code> / <code>model_validate()</code> to convert.</li>
        <li>Validate once at the edge (request, config, external API); trust the typed object everywhere after.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Pydantic — documentation", url: "https://docs.pydantic.dev/latest/" },
    { label: "Pydantic — Models", url: "https://docs.pydantic.dev/latest/concepts/models/" },
    { label: "FastAPI — using Pydantic models", url: "https://fastapi.tiangolo.com/tutorial/body/" },
  ],
  exercises: [
    {
      title: "Coerce an int",
      tier: "warm", uses: ["int() with try/except (L9, L11)", "return None"],
      prompt: `<p>Define <code>as_int(v)</code>: return <code>v</code> unchanged if it's already an
        <code>int</code>; if it's a string of digits, return <code>int(v)</code>; otherwise return
        <code>None</code>. (Pydantic does this kind of coercion for you.)</p>`,
      solution: `def as_int(v):\n    if type(v) is int:\n        return v\n    if type(v) is str:\n        try:\n            return int(v)\n        except ValueError:\n            return None\n    return None`,
      success: '"36" becomes 36; "abc" and 3.5 become None.',
      mustDefine: ["as_int"],
      tests: [
        { append: `print(as_int(36), as_int("36"), as_int("abc"), as_int(3.5))`, expect: "36 36 None None" },
      ],
    },
    {
      title: "Range field",
      tier: "core", uses: ["Field(ge=, le=) idea", "raise ValueError (L11)"],
      prompt: `<p>Define <code>check_age(v)</code>: coerce with <code>int(v)</code>; if the result isn't
        <code>0 &le; age &le; 150</code>, <code>raise ValueError("age out of range")</code>; else
        return it.</p>`,
      solution: `def check_age(v):\n    age = int(v)\n    if not (0 <= age <= 150):\n        raise ValueError("age out of range")\n    return age`,
      success: "Field(ge=0, le=150) automates exactly this.",
      mustDefine: ["check_age"],
      tests: [
        { append: `print(check_age("36"))`, expect: "36" },
        { append: `try:\n    check_age(200)\nexcept ValueError as e:\n    print(e)`, expect: "age out of range" },
      ],
    },
    {
      title: "Validate a record",
      tier: "challenge", uses: ["schema as a dict (L8)", "loop + error list (L6, L7)", "type(x) (L2)"],
      prompt: `<p>Define <code>validate(data, schema)</code> where <code>schema</code> maps
        <code>field -&gt; type</code> (e.g. <code>{"name": str, "age": int}</code>). Return a sorted
        list of problems: <code>"missing: name"</code> for absent keys, <code>"wrong type: age"</code>
        when <code>type(data[field])</code> isn't the schema type. Empty list = valid.</p>`,
      solution: `def validate(data, schema):\n    problems = []\n    for field, typ in schema.items():\n        if field not in data:\n            problems.append("missing: " + field)\n        elif type(data[field]) is not typ:\n            problems.append("wrong type: " + field)\n    return sorted(problems)`,
      success: "This is a hand-rolled BaseModel: declared shape, checked at the boundary.",
      mustDefine: ["validate"],
      tests: [
        { append: `print(validate({"name": "Ada", "age": 36}, {"name": str, "age": int}))`, expect: "[]" },
        { append: `print(validate({"age": "36"}, {"name": str, "age": int}))`, expect: "['missing: name', 'wrong type: age']" },
      ],
    },
    {
      title: "Mini BaseModel",
      tier: "boss", uses: ["class + __init__ (L32)", "coercion", "raise on bad data (L11)", "model_dump idea"],
      prompt: `<p>Define a class <code>Model</code>: <code>__init__(self, **data)</code> validates against a
        class attribute <code>fields</code> = <code>{name: type}</code>. For each field: if missing,
        <code>raise ValueError("missing " + name)</code>; if the value isn't that type, try
        <code>type(value)</code> to coerce, and if that fails <code>raise ValueError("bad " + name)</code>.
        Store each on <code>self</code>. Add <code>dump(self)</code> returning a dict of the fields.</p>`,
      solution: `class Model:\n    fields = {}\n    def __init__(self, **data):\n        for name, typ in self.fields.items():\n            if name not in data:\n                raise ValueError("missing " + name)\n            value = data[name]\n            if type(value) is not typ:\n                try:\n                    value = typ(value)\n                except (ValueError, TypeError):\n                    raise ValueError("bad " + name)\n            setattr(self, name, value)\n    def dump(self):\n        return {name: getattr(self, name) for name in self.fields}`,
      success: "You just built the heart of Pydantic in ~15 lines.",
      mustDefine: ["Model"],
      tests: [
        { append: `class User(Model):\n    fields = {"name": str, "age": int}\nu = User(name="Ada", age="36")\nprint(u.age, u.dump())`, expect: "36 {'name': 'Ada', 'age': 36}" },
        { append: `class User(Model):\n    fields = {"name": str, "age": int}\ntry:\n    User(name="Bo")\nexcept ValueError as e:\n    print(e)`, expect: "missing age" },
        { append: `class User(Model):\n    fields = {"name": str, "age": int}\ntry:\n    User(name="Bo", age="old")\nexcept ValueError as e:\n    print(e)`, expect: "bad age" },
      ],
    },
  ],
},

/* ========================================================== 49 */
{
  id: "black",
  section: "Code Formatting",
  title: "black",
  summary: "The uncompromising formatter: one canonical style, essentially no options, so nobody argues about formatting again.",
  lead: "black reads your code and rewrites its layout to a fixed style. You stop making — and reviewing — whitespace decisions. It's the most widely adopted Python formatter.",
  spiral: ["PEP 8 style (L12)", "string quotes (L1, L4)", "config in pyproject.toml (L30)", "CI gating (L45)", "string transformation (L4, L23)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · What it does</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>pip install black
black .              # reformat every .py file in place
black --check .      # exit non-zero if anything WOULD change (CI)
black --diff file.py # show what it would do</code></pre>
      <p>black's opinions, roughly: <strong>double quotes</strong>, <strong>88-char</strong> lines,
      one statement per line, a trailing comma in multi-line collections/calls, consistent blank lines
      (2 around top-level defs, 1 inside), spaces around operators. The <em>only</em> knobs are
      <code>line-length</code> and target Python version.</p>` },
    { type: "code", title: "before → after (conceptually)", code: `before = "x = {  'a':1,'b':2 }"
after  = 'x = {"a": 1, "b": 2}'
print("black normalises quotes, spacing, and trailing commas — deterministically")

# multi-line call gets a 'magic trailing comma' so it stays expanded:
# foo(
#     a,
#     b,
# )` },
    { type: "html", html: `
      <div class="tip"><b>Why 'uncompromising' is the point</b>
      Every configurable formatter spawns a config bikeshed. black removes the argument: the style is
      the style. Diffs get smaller, reviews focus on logic, and any black-formatted file looks like
      any other.</div>` },
    { type: "html", html: whatif([
      "two teammates run black with defaults on the same file — can the outputs differ?",
      "you disagree with black putting a space after <code>{</code>... wait, it doesn't. Which one thing <em>can</em> you configure?",
      "you add a trailing comma by hand to a multi-line call — does black keep the call expanded even if it'd fit on one line? (yes — the 'magic trailing comma')",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>black .</code> reformats in place; <code>black --check .</code> for CI.</li>
        <li>Canonical style: double quotes, 88 cols, trailing commas in multi-line, standard blank-line rules.</li>
        <li>Nearly zero config (<code>[tool.black] line-length</code> is about it) — that's a feature.</li>
        <li>Formatters change layout, not behaviour; pair with a <em>linter</em> (ruff/flake8) for bug-smells.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "black — documentation", url: "https://black.readthedocs.io/en/stable/" },
    { label: "black — The Black code style", url: "https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html" },
    { label: "PEP 8 — Style Guide for Python Code", url: "https://peps.python.org/pep-0008/" },
  ],
  exercises: [
    {
      title: "Prefer double quotes",
      tier: "warm", uses: ["str.replace (L4)"],
      prompt: `<p>Define <code>normalise_quotes(code)</code>: replace every single-quote <code>'</code> with
        a double-quote <code>"</code> (a crude version of what black does when there's no conflicting
        <code>"</code> inside).</p>`,
      solution: `def normalise_quotes(code):\n    return code.replace("'", '"')`,
      success: "black's quote preference: double, unless that would need more escaping.",
      mustDefine: ["normalise_quotes"],
      tests: [
        { append: `print(normalise_quotes("x = 'hi'"))`, expect: 'x = "hi"' },
        { append: `print(normalise_quotes("['a', 'b']"))`, expect: '["a", "b"]' },
      ],
    },
    {
      title: "Space after commas",
      tier: "core", uses: ["regex (L23) or scanning", "string building"],
      prompt: `<p>Define <code>space_commas(s)</code>: ensure exactly one space after every comma and
        none before it. <code>"[1,2 ,3,  4]"</code> &rarr; <code>"[1, 2, 3, 4]"</code>.</p>`,
      solution: `import re\n\ndef space_commas(s):\n    return re.sub(r"\\s*,\\s*", ", ", s)`,
      success: "One regex sub collapses all the comma spacing variants.",
      mustDefine: ["space_commas"],
      tests: [
        { append: `print(space_commas("[1,2 ,3,  4]"))`, expect: "[1, 2, 3, 4]" },
        { append: `print(space_commas("f(a ,b)"))`, expect: "f(a, b)" },
      ],
    },
    {
      title: "Would --check pass?",
      tier: "core", uses: ["compare formatted vs original", "bool"],
      prompt: `<p>Given a <code>formatter</code> function and a <code>code</code> string, define
        <code>check_passes(formatter, code)</code> returning <code>True</code> if
        <code>formatter(code) == code</code> — i.e. the code is already formatted.</p>`,
      solution: `def check_passes(formatter, code):\n    return formatter(code) == code`,
      success: "`black --check` is exactly this: 'does formatting change anything?'.",
      mustDefine: ["check_passes"],
      tests: [
        { append: `f = lambda s: s.replace("'", '"')\nprint(check_passes(f, 'x = "ok"'), check_passes(f, "x = 'no'"))`, expect: "True False" },
      ],
    },
    {
      title: "Magic trailing comma",
      tier: "challenge", uses: ["string inspection (L4)", "bool", "rules as code"],
      prompt: `<p>Define <code>should_explode(call_src)</code>: return <code>True</code> if a
        single-line call's argument list ends with a trailing comma before the <code>)</code>
        (meaning black would keep it expanded). E.g. <code>"foo(a, b,)"</code> &rarr; <code>True</code>,
        <code>"foo(a, b)"</code> &rarr; <code>False</code>.</p>`,
      solution: `def should_explode(call_src):\n    stripped = call_src.rstrip()\n    if not stripped.endswith(")"):\n        return False\n    inner = stripped[:-1].rstrip()\n    return inner.endswith(",")`,
      success: "A hand-placed trailing comma is black's signal 'keep this multi-line'.",
      mustDefine: ["should_explode"],
      tests: [
        { append: `print(should_explode("foo(a, b,)"), should_explode("foo(a, b)"), should_explode("foo()"))`, expect: "True False False" },
      ],
    },
  ],
},

/* ========================================================== 50 */
{
  id: "yapf",
  section: "Code Formatting",
  title: "yapf",
  summary: "Google's configurable formatter: reformats to whatever style you specify, with knobs for everything.",
  lead: "Where black gives you one style, yapf gives you a style *system*. Useful when a house style differs from black's, or you're matching an existing large codebase.",
  spiral: ["black: the zero-config alternative (L49)", "PEP 8 (L12)", "config files (L30)", "style as data / dict (L8)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Configurable by design</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>pip install yapf
yapf -i file.py            # in place
yapf --diff -r src/       # recursive, show diff
yapf --style=pep8 ...      # a preset

# config: .style.yapf, setup.cfg [yapf], or pyproject [tool.yapf]
# base on a preset, then override:
#   [style]
#   based_on_style = pep8
#   column_limit = 100
#   split_before_logical_operator = true</code></pre>
      <p>yapf reformats the <em>whole file</em> from scratch to satisfy your settings — it doesn't just
      tidy the lines you touched. Presets: <code>pep8</code>, <code>google</code>,
      <code>chromium</code>, <code>facebook</code>.</p>` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th></th><th>black</th><th>yapf</th></tr>
        <tr><td>Philosophy</td><td>one style, no debate</td><td>your style, your call</td></tr>
        <tr><td>Config surface</td><td>tiny</td><td>large (dozens of knobs)</td></tr>
        <tr><td>Good when</td><td>starting fresh / want to stop arguing</td><td>matching an existing non-black codebase or house style</td></tr>
      </table>
      <div class="note"><b>Momentum note</b> black (and ruff's formatter) have most of the mindshare
      now. yapf is still maintained and is the pragmatic pick when you genuinely need a different
      style than black enforces.</div>` },
    { type: "html", html: whatif([
      "two repos both use yapf but with different <code>.style.yapf</code> files — do they format the same?",
      "you only changed 3 lines but yapf rewrites 40 — why, and how is that different from a 'diff-minimal' tool?",
      "a team can't agree on <code>column_limit</code> — has yapf solved the bikeshed or moved it?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>yapf: reformats an entire file to a <strong>configurable</strong> style (presets + overrides).</li>
        <li>Config in <code>.style.yapf</code> / <code>[tool.yapf]</code>; <code>based_on_style</code> + specific knobs.</li>
        <li>Pick it over black when you must match an existing/house style that isn't black's.</li>
        <li>Still: a formatter, not a linter — layout only.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "yapf — GitHub / documentation", url: "https://github.com/google/yapf" },
    { label: "yapf — knobs (style options)", url: "https://github.com/google/yapf#knobs" },
    { label: "PEP 8", url: "https://peps.python.org/pep-0008/" },
  ],
  exercises: [
    {
      title: "black or yapf?",
      tier: "warm", uses: ["dict lookup (L8)"],
      prompt: `<p>Define <code>recommend(situation)</code>: <code>"greenfield"</code> &rarr;
        <code>"black"</code>, <code>"match-house-style"</code> &rarr; <code>"yapf"</code>,
        <code>"stop-the-arguing"</code> &rarr; <code>"black"</code>,
        <code>"custom-column-limit"</code> &rarr; <code>"yapf"</code>. Unknown &rarr; <code>"black"</code>.</p>`,
      solution: `def recommend(situation):\n    m = {"greenfield": "black", "match-house-style": "yapf", "stop-the-arguing": "black", "custom-column-limit": "yapf"}\n    return m.get(situation, "black")`,
      success: "Default to black; choose yapf when you truly need a different style.",
      mustDefine: ["recommend"],
      tests: [
        { append: `print(recommend("greenfield"), recommend("match-house-style"), recommend("???"))`, expect: "black yapf black" },
      ],
    },
    {
      title: "Merge style config",
      tier: "core", uses: ["dict merge (L8)", "based_on_style + overrides"],
      prompt: `<p>Define <code>resolve_style(preset, overrides)</code>: <code>preset</code> is a dict of
        defaults, <code>overrides</code> a dict that wins on any shared key. Return the merged dict
        (don't mutate the inputs).</p>`,
      solution: `def resolve_style(preset, overrides):\n    merged = dict(preset)\n    merged.update(overrides)\n    return merged`,
      success: "based_on_style then your keys — a two-layer merge.",
      mustDefine: ["resolve_style"],
      tests: [
        { append: `p = {"column_limit": 79, "indent_width": 4}\no = {"column_limit": 100}\nprint(resolve_style(p, o))`, expect: "{'column_limit': 100, 'indent_width': 4}" },
      ],
    },
    {
      title: "Line-length report",
      tier: "core", uses: ["splitlines (L4)", "len + comparison (L4, L3)", "build a list of ints"],
      prompt: `<p>Define <code>long_lines(code, limit)</code> returning a list of the <strong>1-based</strong>
        line numbers whose length exceeds <code>limit</code>.</p>`,
      solution: `def long_lines(code, limit):\n    out = []\n    for i, line in enumerate(code.splitlines(), 1):\n        if len(line) > limit:\n            out.append(i)\n    return out`,
      success: "The one check every formatter and linter shares: column_limit.",
      mustDefine: ["long_lines"],
      tests: [
        { append: `code = "short\\n" + "x" * 90 + "\\nok\\n" + "y" * 100\nprint(long_lines(code, 88))`, expect: "[2, 4]" },
      ],
    },
    {
      title: "Reformat-changed-everything?",
      tier: "challenge", uses: ["compare line-by-line (L6)", "count differences", "ratio (L3)"],
      prompt: `<p>Define <code>churn(before, after)</code> returning the fraction (rounded to 2dp) of
        lines that differ between the two versions: <code>changed_lines / max(len_before, len_after)</code>.
        If both are empty, return <code>0.0</code>.</p>`,
      solution: `def churn(before, after):\n    a = before.splitlines()\n    b = after.splitlines()\n    n = max(len(a), len(b))\n    if n == 0:\n        return 0.0\n    changed = 0\n    for i in range(n):\n        la = a[i] if i < len(a) else None\n        lb = b[i] if i < len(b) else None\n        if la != lb:\n            changed += 1\n    return round(changed / n, 2)`,
      success: "High churn from a formatter = it rewrote code you didn't touch (a yapf/black trade-off point).",
      mustDefine: ["churn"],
      tests: [
        { append: `print(churn("a\\nb\\nc", "a\\nB\\nc"))`, expect: "0.33" },
        { append: `print(churn("x", "x"), churn("", ""))`, expect: "0.0 0.0" },
      ],
    },
  ],
},

/* ========================================================== 51 */
{
  id: "ruff",
  section: "Code Formatting",
  title: "ruff",
  summary: "An extremely fast Rust-based linter AND formatter that replaces flake8 + isort + pyupgrade + black, in one tool.",
  lead: "ruff does in milliseconds what a stack of Python tools did in seconds: lint hundreds of rules, sort imports, auto-fix, and format. It's rapidly becoming the default.",
  spiral: ["black-style formatting (L49)", "PEP 8 & lint rules (L12)", "config in pyproject.toml (L30)", "import organisation (L19)", "rule codes as data"],
  blocks: [
    { type: "html", html: `
      <h2>1 · One tool, two jobs</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>pip install ruff
ruff check .            # lint (like flake8 + isort + pyupgrade + ...)
ruff check --fix .      # auto-fix what it safely can
ruff format .           # format (black-compatible)
ruff check --watch .</code></pre>
      <p>Rules are grouped by <strong>code prefix</strong> — you enable/disable whole families:</p>
      <table class="tbl">
        <tr><th>Prefix</th><th>Family</th></tr>
        <tr><td><code>E</code>, <code>W</code></td><td>pycodestyle (PEP 8 errors / warnings)</td></tr>
        <tr><td><code>F</code></td><td>pyflakes (undefined names, unused imports/vars)</td></tr>
        <tr><td><code>I</code></td><td>isort (import ordering)</td></tr>
        <tr><td><code>UP</code></td><td>pyupgrade (modernise old syntax)</td></tr>
        <tr><td><code>B</code></td><td>flake8-bugbear (likely bugs)</td></tr>
        <tr><td><code>SIM</code></td><td>flake8-simplify</td></tr>
      </table>` },
    { type: "code", title: "config in pyproject.toml", code: `sample = '''
[tool.ruff]
line-length = 100
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B"]
ignore = ["E501"]           # let the formatter own line length

[tool.ruff.lint.per-file-ignores]
"tests/*" = ["S101"]        # asserts are fine in tests
'''
print(sample.strip().splitlines()[1])` },
    { type: "html", html: whatif([
      "you run <code>ruff check --fix</code> and it removes an 'unused' import that was actually imported for a side effect — how do you protect it? (<code># noqa: F401</code>)",
      "<code>ruff format</code> vs <code>black</code> on the same file — should the output match? (yes — ruff's formatter is black-compatible by design)",
      "why is 'lint + import-sort + format in one pass' meaningfully better than three separate tools in CI?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>ruff check</code> = linter (100s of rules, many auto-fixable); <code>ruff format</code> = black-compatible formatter.</li>
        <li>Replaces flake8 + isort + pyupgrade + pydocstyle + more — one very fast binary.</li>
        <li>Config in <code>[tool.ruff.lint] select/ignore</code>, by <strong>rule-code prefix</strong> (<code>E</code>, <code>F</code>, <code>I</code>, <code>UP</code>, <code>B</code>…).</li>
        <li><code># noqa: CODE</code> to suppress one line; <code>per-file-ignores</code> for whole paths.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Ruff — documentation", url: "https://docs.astral.sh/ruff/" },
    { label: "Ruff — Rules", url: "https://docs.astral.sh/ruff/rules/" },
    { label: "Ruff — Configuration", url: "https://docs.astral.sh/ruff/configuration/" },
  ],
  exercises: [
    {
      title: "Rule family for a code",
      tier: "warm", uses: ["string prefix (L4)", "dict lookup (L8)"],
      prompt: `<p>Define <code>family(code)</code>: map a rule code to its family by its letter prefix —
        <code>"E"/"W"</code>&rarr;<code>"pycodestyle"</code>, <code>"F"</code>&rarr;<code>"pyflakes"</code>,
        <code>"I"</code>&rarr;<code>"isort"</code>, <code>"UP"</code>&rarr;<code>"pyupgrade"</code>,
        <code>"B"</code>&rarr;<code>"bugbear"</code>. Take the leading letters (until the first digit).
        Unknown &rarr; <code>"other"</code>.</p>`,
      solution: `def family(code):\n    letters = ""\n    for ch in code:\n        if ch.isdigit():\n            break\n        letters += ch\n    m = {"E": "pycodestyle", "W": "pycodestyle", "F": "pyflakes", "I": "isort", "UP": "pyupgrade", "B": "bugbear"}\n    return m.get(letters, "other")`,
      success: "Split the prefix off the number; look it up.",
      mustDefine: ["family"],
      tests: [
        { append: `print(family("E501"), family("F401"), family("UP007"), family("B008"), family("Z999"))`, expect: "pycodestyle pyflakes pyupgrade bugbear other" },
      ],
    },
    {
      title: "Is this line suppressed?",
      tier: "core", uses: ["str.contains / split (L4)", "bool"],
      prompt: `<p>Define <code>suppressed(line, code)</code>: <code>True</code> if <code>line</code> has a
        <code># noqa</code> comment that either has no codes (bare <code># noqa</code>) or lists
        <code>code</code> after <code># noqa:</code> (comma-separated).</p>`,
      solution: `def suppressed(line, code):\n    if "# noqa" not in line:\n        return False\n    after = line.split("# noqa", 1)[1].strip()\n    if not after.startswith(":"):\n        return True\n    codes = [c.strip() for c in after[1:].split(",")]\n    return code in codes`,
      success: "Bare noqa silences everything; noqa: X,Y silences only those.",
      mustDefine: ["suppressed"],
      tests: [
        { append: `print(suppressed("x = 1  # noqa", "F401"))`, expect: "True" },
        { append: `print(suppressed("import os  # noqa: F401", "F401"))`, expect: "True" },
        { append: `print(suppressed("import os  # noqa: E501", "F401"))`, expect: "False" },
        { append: `print(suppressed("import os", "F401"))`, expect: "False" },
      ],
    },
    {
      title: "Find unused imports (F401-lite)",
      tier: "challenge", uses: ["parse import lines (L4)", "membership in the rest of the code", "build a list"],
      prompt: `<p>Define <code>unused_imports(code)</code>: for each line <code>import NAME</code> (simple
        form only), if <code>NAME</code> never appears anywhere else in <code>code</code>, report it.
        Return the sorted list of unused names.</p>`,
      solution: `def unused_imports(code):\n    lines = code.splitlines()\n    unused = []\n    for line in lines:\n        s = line.strip()\n        if s.startswith("import ") and " as " not in s and "," not in s:\n            name = s[len("import "):].strip()\n            rest = "\\n".join(l for l in lines if l is not line)\n            others = code.replace(line, "", 1)\n            if name not in others:\n                unused.append(name)\n    return sorted(unused)`,
      success: "A real linter parses the AST — but 'is the name used elsewhere?' is the core idea.",
      mustDefine: ["unused_imports"],
      tests: [
        { append: `code = "import os\\nimport sys\\nprint(sys.argv)\\n"\nprint(unused_imports(code))`, expect: "['os']" },
        { append: `print(unused_imports("import json\\nprint(json.dumps({}))\\n"))`, expect: "[]" },
      ],
    },
    {
      title: "Effective rule set",
      tier: "challenge", uses: ["tomllib (L30)", "set operations (L7)", "sorted"],
      prompt: `<p>Define <code>active_rules(pyproject_text)</code>: parse <code>[tool.ruff.lint]</code>,
        take <code>select</code> minus <code>ignore</code> (both lists of codes, default empty), and
        return the result sorted.</p>`,
      solution: `import tomllib\n\ndef active_rules(pyproject_text):\n    d = tomllib.loads(pyproject_text)\n    lint = d.get("tool", {}).get("ruff", {}).get("lint", {})\n    select = set(lint.get("select", []))\n    ignore = set(lint.get("ignore", []))\n    return sorted(select - ignore)`,
      success: "select then ignore — a set difference.",
      mustDefine: ["active_rules"],
      tests: [
        { append: `t = '[tool.ruff.lint]\\nselect = ["E", "F", "I", "B"]\\nignore = ["E501"]\\n'\nprint(active_rules(t))`, expect: "['B', 'E', 'F', 'I']" },
        { append: `print(active_rules('[project]\\nname = "x"\\n'))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 52 */
{
  id: "sphinx",
  section: "Documentation",
  title: "Sphinx",
  summary: "Turn reStructuredText / Markdown + your docstrings into a searchable HTML (or PDF) documentation site.",
  lead: "Sphinx is the tool behind the official Python docs and most major libraries. Write prose in .rst files, pull API reference straight from your docstrings with autodoc.",
  spiral: ["docstrings & __doc__ (L12)", "modules & packages (L19)", "config as a Python file", "type hints in signatures (L44)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The pieces</h2>
      <table class="tbl">
        <tr><th>Thing</th><th>Role</th></tr>
        <tr><td><code>docs/conf.py</code></td><td>config (a Python file): project name, extensions, theme</td></tr>
        <tr><td><code>docs/index.rst</code></td><td>the landing page + a <code>toctree</code> listing other pages</td></tr>
        <tr><td><code>sphinx-quickstart</code></td><td>scaffolds the above</td></tr>
        <tr><td><code>sphinx-build -b html docs/ docs/_build</code></td><td>render to HTML (or <code>make html</code>)</td></tr>
        <tr><td><code>autodoc</code> extension</td><td><code>.. automodule:: mypkg.core</code> pulls docstrings into the page</td></tr>
        <tr><td><code>napoleon</code> extension</td><td>lets autodoc understand Google- / NumPy-style docstrings</td></tr>
        <tr><td>Read the Docs</td><td>free hosting that rebuilds your Sphinx docs on every push</td></tr>
      </table>` },
    { type: "code", title: "Docstring styles autodoc can render", code: `def transfer(src, dst, amount):
    """Move money between accounts.

    Args:
        src (Account): the account to debit.
        dst (Account): the account to credit.
        amount (int): cents to move; must be > 0.

    Returns:
        int: the new balance of src.

    Raises:
        ValueError: if amount is not positive.
    """
print(transfer.__doc__.splitlines()[0])   # first line = the summary` },
    { type: "html", html: whatif([
      "you change a function's docstring but don't rebuild the docs — does the site update?",
      "a docstring's first line should be a one-sentence summary — why does that convention matter for tools?",
      "Sphinx builds fine but a <code>toctree</code> doesn't list your new page — is it reachable from the site?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Sphinx renders <code>.rst</code>/Markdown + docstrings → HTML/PDF; <code>conf.py</code> configures it.</li>
        <li><code>autodoc</code> pulls API docs from your docstrings; <code>napoleon</code> understands Google/NumPy styles.</li>
        <li>Pages are linked via <code>toctree</code>; <code>sphinx-build</code> (or <code>make html</code>) builds; Read the Docs hosts.</li>
        <li>Good docstrings (summary line, Args/Returns/Raises) pay off directly here.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Sphinx — documentation", url: "https://www.sphinx-doc.org/en/master/" },
    { label: "Sphinx — autodoc", url: "https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html" },
    { label: "PEP 257 — Docstring Conventions", url: "https://peps.python.org/pep-0257/" },
  ],
  exercises: [
    {
      title: "Summary line",
      tier: "warm", uses: ["__doc__ (L12)", "splitlines / strip (L4)"],
      prompt: `<p>Define <code>summary(fn)</code> returning the first non-blank line of
        <code>fn.__doc__</code>, stripped, or <code>""</code> if there's no docstring.</p>`,
      solution: `def summary(fn):\n    doc = fn.__doc__\n    if not doc:\n        return ""\n    for line in doc.splitlines():\n        line = line.strip()\n        if line:\n            return line\n    return ""`,
      success: "Tools show the first line as the one-liner — keep it a real sentence.",
      mustDefine: ["summary"],
      tests: [
        { append: `def f():\n    """Add two numbers.\\n\\n    More detail here.\\n    """\nprint(summary(f))`, expect: "Add two numbers." },
        { append: `def g(): pass\nprint(repr(summary(g)))`, expect: "''" },
      ],
    },
    {
      title: "Has an Args section?",
      tier: "core", uses: ["docstring parsing (L4)", "strip / startswith", "bool"],
      prompt: `<p>Define <code>documents_args(fn)</code>: <code>True</code> if the docstring contains a
        line that, stripped, equals <code>"Args:"</code> (Google style).</p>`,
      solution: `def documents_args(fn):\n    doc = fn.__doc__ or ""\n    for line in doc.splitlines():\n        if line.strip() == "Args:":\n            return True\n    return False`,
      success: "napoleon looks for exactly these section headers.",
      mustDefine: ["documents_args"],
      tests: [
        { append: `def f(x):\n    """Do it.\\n\\n    Args:\\n        x: the thing.\\n    """\nprint(documents_args(f))`, expect: "True" },
        { append: `def g(x):\n    """Do it."""\nprint(documents_args(g))`, expect: "False" },
      ],
    },
    {
      title: "toctree reachability",
      tier: "core", uses: ["parse a config-ish block (L4)", "set (L7)", "sorted"],
      prompt: `<p>Given <code>toctree</code> text (indented page names, one per line, possibly blank
        lines) and a list of all <code>pages</code>, define <code>orphans(toctree, pages)</code>
        returning the sorted pages NOT listed in the toctree.</p>`,
      solution: `def orphans(toctree, pages):\n    listed = set()\n    for line in toctree.splitlines():\n        line = line.strip()\n        if line:\n            listed.add(line)\n    return sorted(set(pages) - listed)`,
      success: "A page not in any toctree is an 'orphan' — Sphinx even warns about it.",
      mustDefine: ["orphans"],
      tests: [
        { append: `tt = "\\n   intro\\n   usage\\n\\n   api\\n"\nprint(orphans(tt, ["intro", "usage", "api", "changelog"]))`, expect: "['changelog']" },
      ],
    },
    {
      title: "Docstring coverage",
      tier: "challenge", uses: ["loop over a list of functions", "__doc__ check", "ratio (L3)", "round"],
      prompt: `<p>Define <code>coverage(funcs)</code> returning the fraction (2dp) of functions in the
        list that have a non-empty docstring. Empty list &rarr; <code>1.0</code>.</p>`,
      solution: `def coverage(funcs):\n    if not funcs:\n        return 1.0\n    documented = 0\n    for fn in funcs:\n        if fn.__doc__ and fn.__doc__.strip():\n            documented += 1\n    return round(documented / len(funcs), 2)`,
      success: "interrogate / pydocstyle report exactly this number for a codebase.",
      mustDefine: ["coverage"],
      tests: [
        { append: `def a():\n    """doc"""\ndef b(): pass\ndef c():\n    """doc"""\nprint(coverage([a, b, c]))`, expect: "0.67" },
        { append: `print(coverage([]))`, expect: "1.0" },
      ],
    },
  ],
},

/* ========================================================== 53 */
{
  id: "unittest",
  section: "Testing",
  title: "unittest / PyUnit",
  summary: "The standard-library test framework: TestCase classes, assert* methods, setUp/tearDown, and a runner.",
  lead: "Tests are code that checks your code. unittest ships with Python — no install — and its xUnit shape (test classes, assertions, fixtures) is the same in every language.",
  spiral: ["classes & methods (L32, L33)", "exceptions & assert (L11)", "importing a module (L19)", "setUp = __init__-ish fixtures", "context managers for assertRaises (L27)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · A test case</h2>
      <p>Subclass <code>unittest.TestCase</code>. Every method named <code>test_*</code> is a test.
      Inside, call <code>self.assertEqual</code>, <code>self.assertTrue</code>,
      <code>self.assertRaises</code>, etc. A test <em>passes</em> if no assertion fails and nothing
      raises.</p>` },
    { type: "code", title: "Write & run tests", code: `import unittest, io

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_positives(self):
        self.assertEqual(add(2, 3), 5)

    def test_negatives(self):
        self.assertEqual(add(-1, -1), -2)

    def test_type_error(self):
        with self.assertRaises(TypeError):
            add(1, "x")

# run programmatically (normally: 'python -m unittest')
# stream=io.StringIO() swallows the runner's own report so we can print our own
result = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(
    unittest.TestLoader().loadTestsFromTestCase(TestAdd)
)
print("ran", result.testsRun, "ok" if result.wasSuccessful() else "FAILED")` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Assertion</th><th>Passes when</th></tr>
        <tr><td><code>assertEqual(a, b)</code></td><td><code>a == b</code></td></tr>
        <tr><td><code>assertTrue(x)</code> / <code>assertFalse(x)</code></td><td><code>x</code> is truthy / falsy</td></tr>
        <tr><td><code>assertIn(x, coll)</code></td><td><code>x in coll</code></td></tr>
        <tr><td><code>assertIsNone(x)</code></td><td><code>x is None</code></td></tr>
        <tr><td><code>assertRaises(Err)</code> (context manager)</td><td>the block raises <code>Err</code></td></tr>
        <tr><td><code>assertAlmostEqual(a, b)</code></td><td><code>a ≈ b</code> (for floats)</td></tr>
      </table>` },
    { type: "html", html: `
      <h2>2 · Fixtures: <code>setUp</code> / <code>tearDown</code></h2>
      <p><code>setUp</code> runs before <em>every</em> <code>test_*</code> method (fresh state each
      time); <code>tearDown</code> after. <code>setUpClass</code> / <code>tearDownClass</code> run
      once for the whole class.</p>` },
    { type: "code", title: "Per-test fresh state", code: `import unittest, io

class TestList(unittest.TestCase):
    def setUp(self):
        self.data = [1, 2, 3]        # rebuilt before each test

    def test_append(self):
        self.data.append(4)
        self.assertEqual(self.data, [1, 2, 3, 4])

    def test_untouched(self):
        self.assertEqual(len(self.data), 3)   # not affected by test_append

r = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(
    unittest.TestLoader().loadTestsFromTestCase(TestList))
print(r.wasSuccessful())` },
    { type: "html", html: whatif([
      "<code>test_append</code> mutates <code>self.data</code> — why doesn't <code>test_untouched</code> see the change?",
      "a test method is named <code>check_thing</code> instead of <code>test_thing</code> — does it run?",
      "an assertion fails halfway through a test — do the later lines of that test run?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>class T(unittest.TestCase)</code>; methods <code>test_*</code>; <code>self.assert*</code> checks.</li>
        <li><code>setUp</code>/<code>tearDown</code> give each test fresh fixtures; <code>*Class</code> variants run once.</li>
        <li>Run with <code>python -m unittest</code> (auto-discovers <code>test_*.py</code>) or a <code>TextTestRunner</code>.</li>
        <li><code>with self.assertRaises(E):</code> to assert an error path.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — unittest", url: "https://docs.python.org/3/library/unittest.html" },
    { label: "Python docs — unittest.TestCase.assert* methods", url: "https://docs.python.org/3/library/unittest.html#assert-methods" },
    { label: "Real Python — Getting Started With Testing in Python", url: "https://realpython.com/python-testing/" },
  ],
  exercises: [
    {
      title: "Write a passing test",
      tier: "warm", uses: ["TestCase", "assertEqual", "run a loader"],
      prompt: `<p>Define <code>double(n)</code> returning <code>n * 2</code>, and a
        <code>unittest.TestCase</code> subclass <code>TestDouble</code> with a <code>test_basic</code>
        method asserting <code>double(4) == 8</code>. The test harness runs your class and prints
        <code>True</code> if it passed.</p>`,
      solution: `import unittest\n\ndef double(n):\n    return n * 2\n\nclass TestDouble(unittest.TestCase):\n    def test_basic(self):\n        self.assertEqual(double(4), 8)`,
      success: "One TestCase, one test_ method, one assertion.",
      mustDefine: ["TestDouble"],
      tests: [
        { append: `import unittest, io\nr = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(unittest.TestLoader().loadTestsFromTestCase(TestDouble))\nprint(r.wasSuccessful())`, expect: "True" },
      ],
    },
    {
      title: "Assert it raises",
      tier: "core", uses: ["assertRaises context manager (L27)", "raise (L11)"],
      prompt: `<p>Define <code>parse_pos(s)</code>: return <code>int(s)</code> but
        <code>raise ValueError</code> if the result is negative. Then define <code>TestParse</code>
        with <code>test_negative</code> asserting <code>parse_pos("-5")</code> raises
        <code>ValueError</code>, and <code>test_ok</code> asserting <code>parse_pos("7") == 7</code>.</p>`,
      solution: `import unittest\n\ndef parse_pos(s):\n    n = int(s)\n    if n < 0:\n        raise ValueError("negative")\n    return n\n\nclass TestParse(unittest.TestCase):\n    def test_negative(self):\n        with self.assertRaises(ValueError):\n            parse_pos("-5")\n    def test_ok(self):\n        self.assertEqual(parse_pos("7"), 7)`,
      success: "with self.assertRaises(E): — the block MUST raise E or the test fails.",
      mustDefine: ["TestParse"],
      tests: [
        { append: `import unittest, io\nr = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(unittest.TestLoader().loadTestsFromTestCase(TestParse))\nprint(r.testsRun, r.wasSuccessful())`, expect: "2 True" },
      ],
    },
    {
      title: "setUp isolation",
      tier: "core", uses: ["setUp", "per-test fresh state", "assertEqual"],
      prompt: `<p>Define <code>TestCart</code> whose <code>setUp</code> sets <code>self.cart = []</code>.
        <code>test_add</code> appends <code>"apple"</code> and asserts length 1;
        <code>test_starts_empty</code> asserts length 0. Both must pass — proving <code>setUp</code>
        re-runs.</p>`,
      solution: `import unittest\n\nclass TestCart(unittest.TestCase):\n    def setUp(self):\n        self.cart = []\n    def test_add(self):\n        self.cart.append("apple")\n        self.assertEqual(len(self.cart), 1)\n    def test_starts_empty(self):\n        self.assertEqual(len(self.cart), 0)`,
      success: "setUp gives each test a clean self.cart.",
      mustDefine: ["TestCart"],
      require: [{ pattern: "def setUp\\(self\\)", hard: true, message: "Add a setUp(self) method." }],
      tests: [
        { append: `import unittest, io\nr = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(unittest.TestLoader().loadTestsFromTestCase(TestCart))\nprint(r.wasSuccessful())`, expect: "True" },
      ],
    },
    {
      title: "Count the failures",
      tier: "challenge", uses: ["result object attributes", "a deliberately failing test", "arithmetic (L3)"],
      prompt: `<p>Define <code>run_case(case_cls)</code> that loads and runs a <code>TestCase</code> class
        and returns a tuple <code>(ran, failures, errors)</code> from the result object
        (<code>result.testsRun</code>, <code>len(result.failures)</code>,
        <code>len(result.errors)</code>). Run it <em>quietly</em> — pass
        <code>stream=io.StringIO()</code> to the runner so its report doesn't print.</p>`,
      solution: `import unittest, io\n\ndef run_case(case_cls):\n    result = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(\n        unittest.TestLoader().loadTestsFromTestCase(case_cls))\n    return (result.testsRun, len(result.failures), len(result.errors))`,
      success: "failures = assertions that failed; errors = tests that raised unexpectedly. The runner writes its report to a stream — hand it a throwaway one.",
      mustDefine: ["run_case"],
      tests: [
        { append: `import unittest\nclass Mix(unittest.TestCase):\n    def test_a(self): self.assertTrue(True)\n    def test_b(self): self.assertEqual(1, 2)\n    def test_c(self): int("boom")\nprint(run_case(Mix))`, expect: "(3, 1, 1)" },
      ],
    },
  ],
},

/* ========================================================== 54 */
{
  id: "doctest",
  section: "Testing",
  title: "doctest",
  summary: "Tests that live in docstrings: write an interactive example, doctest runs it and checks the output.",
  lead: "The simplest testing tool in Python. Put a >>> example in a docstring; doctest executes it and compares the result to what you wrote. Documentation and tests, one thing.",
  spiral: ["docstrings (L12)", "the REPL / >>> prompt", "importing a module (L19)", "unittest as the bigger sibling (L53)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Example in, check the output</h2>
      <p>A line starting with <code>&gt;&gt;&gt;</code> is run; the line(s) after it (up to a blank
      line or the next <code>&gt;&gt;&gt;</code>) are the <strong>expected output</strong>, matched
      exactly (after stripping trailing spaces).</p>` },
    { type: "code", title: "A doctested function", code: `def factorial(n):
    """Return n! for n >= 0.

    >>> factorial(0)
    1
    >>> factorial(5)
    120
    >>> [factorial(i) for i in range(4)]
    [1, 1, 2, 6]
    """
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

import doctest
res = doctest.testmod(verbose=False)     # normally: 'python -m doctest file.py'
print("attempted", res.attempted, "failed", res.failed)` },
    { type: "html", html: `
      <div class="note"><b>Matching gotchas</b>
      <ul style="margin:6px 0 0">
        <li>Output must match <em>character for character</em> — a dict's key order, <code>1.0</code> vs <code>1</code>, all matter.</li>
        <li>A blank line in expected output is written as <code>&lt;BLANKLINE&gt;</code>.</li>
        <li>Directives like <code># doctest: +SKIP</code> or <code>+ELLIPSIS</code> (then <code>...</code> matches anything) relax it.</li>
        <li>An exception is shown as its <code>Traceback (most recent call last):</code> … final line.</li>
        <li>Driving <code>DocTestRunner</code> yourself? <code>runner.run(test, out=lambda s: None)</code> mutes the per-failure report; read <code>runner.tries</code> / <code>runner.failures</code> for the totals (<code>summarize()</code> prints when something failed).</li>
      </ul></div>` },
    { type: "html", html: whatif([
      "the function's real output is <code>{'b': 2, 'a': 1}</code> but the docstring says <code>{'a': 1, 'b': 2}</code> — pass or fail?",
      "you fix a bug and the output changes — what happens to the doctest, and is that good?",
      "when is doctest the wrong tool? (complex setup, many cases, non-deterministic output — use unittest/pytest)",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>&gt;&gt;&gt; expr</code> then the expected output on the following line(s), inside a docstring.</li>
        <li>Run with <code>python -m doctest file.py</code> or <code>doctest.testmod()</code>; also wireable into unittest.</li>
        <li>Output is matched exactly — great for simple, deterministic, illustrative examples.</li>
        <li>Doubles as documentation that's guaranteed to be correct.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — doctest", url: "https://docs.python.org/3/library/doctest.html" },
    { label: "Python docs — doctest directives", url: "https://docs.python.org/3/library/doctest.html#directives" },
    { label: "Real Python — Python's doctest", url: "https://realpython.com/python-doctest/" },
  ],
  exercises: [
    {
      title: "Add a passing doctest",
      tier: "warm", uses: ["docstring with >>> (L12)", "doctest.testmod"],
      prompt: `<p>Define <code>square(n)</code> returning <code>n * n</code>, with a docstring containing
        two working examples: <code>square(3)</code> &rarr; <code>9</code> and
        <code>square(-4)</code> &rarr; <code>16</code>. The harness runs <code>doctest</code> and
        prints attempted/failed.</p>`,
      solution: `def square(n):\n    """Return n squared.\n\n    >>> square(3)\n    9\n    >>> square(-4)\n    16\n    """\n    return n * n`,
      success: "Two >>> lines, two expected results.",
      mustDefine: ["square"],
      require: [{ pattern: ">>>\\s*square", hard: true, message: "Put >>> square(...) examples in the docstring." }],
      tests: [
        { append: `import doctest\nfinder = doctest.DocTestFinder()\nrunner = doctest.DocTestRunner(verbose=False)\nfor t in finder.find(square, "square", globs={"square": square}):\n    runner.run(t, out=lambda s: None)\nprint(runner.summarize(verbose=False))`, expect: "TestResults(failed=0, attempted=2)" },
      ],
    },
    {
      title: "Exact-match failure",
      tier: "core", uses: ["output formatting matters", "doctest runner"],
      prompt: `<p>Define <code>tags()</code> returning the dict <code>{"a": 1, "b": 2}</code>, with a
        docstring example <code>&gt;&gt;&gt; tags()</code> whose expected output is
        <strong>exactly</strong> <code>{'a': 1, 'b': 2}</code> (single quotes, that order). The harness
        checks it passes.</p>`,
      solution: `def tags():\n    """Return the tag map.\n\n    >>> tags()\n    {'a': 1, 'b': 2}\n    """\n    return {"a": 1, "b": 2}`,
      success: "doctest compares the repr exactly — dict insertion order included.",
      mustDefine: ["tags"],
      tests: [
        { append: `import doctest\nfinder = doctest.DocTestFinder()\nrunner = doctest.DocTestRunner(verbose=False)\nfor t in finder.find(tags, "tags", globs={"tags": tags}):\n    runner.run(t, out=lambda s: None)\nres = runner.summarize(verbose=False)\nprint(res.failed, res.attempted)`, expect: "0 1" },
      ],
    },
    {
      title: "Run doctests on a module dict",
      tier: "core", uses: ["DocTestFinder / DocTestRunner", "loop (L6)", "tuple return (L7)"],
      prompt: `<p>Define <code>check(fn)</code> that runs the doctests in <code>fn</code>'s docstring and
        returns <code>(attempted, failed)</code>. Read the counts off the runner
        (<code>runner.tries</code>, <code>runner.failures</code>) and pass
        <code>out=lambda s: None</code> to <code>runner.run</code> so nothing prints.</p>`,
      solution: `import doctest\n\ndef check(fn):\n    finder = doctest.DocTestFinder()\n    runner = doctest.DocTestRunner(verbose=False)\n    for t in finder.find(fn, fn.__name__, globs={fn.__name__: fn}):\n        runner.run(t, out=lambda s: None)\n    return (runner.tries, runner.failures)`,
      success: "Finder pulls examples out; runner executes and compares. runner.tries / runner.failures give the totals without summarize() printing anything.",
      mustDefine: ["check"],
      tests: [
        { append: `def good(x):\n    """\n    >>> good(2)\n    4\n    """\n    return x * 2\nprint(check(good))`, expect: "(1, 0)" },
        { append: `def bad(x):\n    """\n    >>> bad(2)\n    99\n    """\n    return x * 2\nprint(check(bad))`, expect: "(1, 1)" },
      ],
    },
    {
      title: "Doctest coverage gate",
      tier: "challenge", uses: ["loop over functions", "check each", "aggregate", "bool"],
      prompt: `<p>Define <code>all_pass(funcs)</code> returning <code>True</code> only if every function's
        doctests pass AND at least one example ran across the whole list (empty list &rarr;
        <code>False</code>). Reuse the <code>check</code> pattern.</p>`,
      solution: `import doctest\n\ndef _run(fn):\n    finder = doctest.DocTestFinder()\n    runner = doctest.DocTestRunner(verbose=False)\n    for t in finder.find(fn, fn.__name__, globs={fn.__name__: fn}):\n        runner.run(t, out=lambda s: None)\n    return (runner.tries, runner.failures)\n\ndef all_pass(funcs):\n    total_attempted = 0\n    total_failed = 0\n    for fn in funcs:\n        a, f = _run(fn)\n        total_attempted += a\n        total_failed += f\n    return total_attempted > 0 and total_failed == 0`,
      success: "A CI gate: no failures, and the docs actually have examples.",
      mustDefine: ["all_pass"],
      tests: [
        { append: `def a(x):\n    """\n    >>> a(1)\n    2\n    """\n    return x + 1\ndef b(x):\n    """\n    >>> b(2)\n    4\n    """\n    return x * 2\nprint(all_pass([a, b]))`, expect: "True" },
        { append: `def c(x):\n    """no examples"""\n    return x\nprint(all_pass([c]))`, expect: "False" },
      ],
    },
  ],
},

/* ========================================================== 55 */
{
  id: "pytest",
  section: "Testing",
  title: "pytest",
  summary: "The de-facto test framework: plain assert, fixtures via arguments, parametrize, rich failure output, huge plugin ecosystem.",
  lead: "pytest replaces unittest's ceremony with plain functions and plain assert. It's third-party but nearly universal in modern Python projects.",
  spiral: ["assert & exceptions (L11)", "functions & decorators (L10, L21)", "unittest concepts to contrast (L53)", "fixtures = setUp, but composable"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Just functions and <code>assert</code></h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code># test_math.py
from mymath import add

def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

import pytest
def test_add_type_error():
    with pytest.raises(TypeError):
        add(1, "x")</code></pre>
      <p>Run <code>pytest</code> in the project. It discovers <code>test_*.py</code> files and
      <code>test_*</code> functions, runs them, and on a failed <code>assert</code> shows the
      <em>values</em> involved (assertion rewriting) — no <code>assertEqual</code> needed.</p>` },
    { type: "html", html: `
      <h2>2 · Fixtures &amp; parametrize</h2>
      <ul>
        <li><b>Fixture</b>: a function decorated <code>@pytest.fixture</code>; a test that names it as a
        parameter receives its return value. Composable, and can <code>yield</code> for teardown.</li>
        <li><b>Parametrize</b>: <code>@pytest.mark.parametrize("a,b,exp", [(2,3,5),(0,0,0)])</code> runs
        the test once per row.</li>
      </ul>` },
    { type: "code", title: "shape (conceptual)", code: `# import pytest
#
# @pytest.fixture
# def sample():
#     data = {"x": 1}
#     yield data            # test runs here
#     data.clear()          # teardown
#
# @pytest.mark.parametrize("n,expected", [(0, 1), (5, 120)])
# def test_factorial(n, expected):
#     assert factorial(n) == expected
#
# def test_uses_fixture(sample):
#     assert sample["x"] == 1
print("plain assert + fixtures-as-arguments + parametrize = most of pytest")` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Flag</th><th>Does</th></tr>
        <tr><td><code>-v</code></td><td>verbose: one line per test</td></tr>
        <tr><td><code>-k "expr"</code></td><td>run tests whose name matches</td></tr>
        <tr><td><code>-x</code></td><td>stop at the first failure</td></tr>
        <tr><td><code>--lf</code></td><td>re-run only last-failed</td></tr>
        <tr><td><code>-q</code></td><td>quiet</td></tr>
      </table>
      <p>Config in <code>[tool.pytest.ini_options]</code> (pyproject) or <code>pytest.ini</code>.
      Plugins: <code>pytest-cov</code> (coverage), <code>pytest-xdist</code> (parallel),
      <code>pytest-mock</code>, <code>pytest-asyncio</code>.</p>` },
    { type: "html", html: whatif([
      "a test does <code>assert result == 5</code> and fails — what does pytest show that a bare <code>assert</code> in a script wouldn't?",
      "two tests both need a database connection — is a fixture or copy-pasted setup better, and why?",
      "<code>parametrize</code> with 20 rows vs a <code>for</code> loop inside one test — which tells you exactly which input failed?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Tests are plain <code>test_*</code> functions using plain <code>assert</code>; run with <code>pytest</code>.</li>
        <li><code>@pytest.fixture</code> + naming it as an argument = dependency-injected setup (<code>yield</code> for teardown).</li>
        <li><code>@pytest.mark.parametrize</code> runs one test over many inputs, each reported separately.</li>
        <li>Rich failure diffs, <code>-k</code>/<code>-x</code>/<code>--lf</code>, and a plugin for everything.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "pytest — documentation", url: "https://docs.pytest.org/en/stable/" },
    { label: "pytest — fixtures", url: "https://docs.pytest.org/en/stable/how-to/fixtures.html" },
    { label: "pytest — parametrize", url: "https://docs.pytest.org/en/stable/how-to/parametrize.html" },
  ],
  exercises: [
    {
      title: "assert-style test",
      tier: "warm", uses: ["assert (L11)", "functions (L10)"],
      prompt: `<p>Define <code>add(a, b)</code> and a test function <code>test_add()</code> that uses a
        bare <code>assert</code> to check <code>add(2, 3) == 5</code> and <code>add(0, 0) == 0</code>.
        The harness just calls <code>test_add()</code> — no output means it passed.</p>`,
      solution: `def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(0, 0) == 0`,
      success: "No assertEqual — pytest rewrites plain assert to show the values.",
      mustDefine: ["add", "test_add"],
      tests: [
        { append: `test_add()\nprint("passed")`, expect: "passed" },
      ],
    },
    {
      title: "pytest.raises equivalent",
      tier: "core", uses: ["context manager for expected error (L27)", "raise (L11)"],
      prompt: `<p>Define a context manager <code>raises(exc_type)</code> (class-based) that acts like
        <code>pytest.raises</code>: the <code>with</code> block <em>must</em> raise
        <code>exc_type</code>; if it does, swallow it; if it doesn't, <code>raise AssertionError</code>.</p>`,
      solution: `class raises:\n    def __init__(self, exc_type):\n        self.exc_type = exc_type\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is None:\n            raise AssertionError("did not raise " + self.exc_type.__name__)\n        return issubclass(exc_type, self.exc_type)`,
      success: "Swallow the expected error; complain if nothing was raised.",
      mustDefine: ["raises"],
      tests: [
        { append: `with raises(ValueError):\n    int("nope")\nprint("ok")`, expect: "ok" },
        { append: `try:\n    with raises(ValueError):\n        pass\nexcept AssertionError as e:\n    print(e)`, expect: "did not raise ValueError" },
      ],
    },
    {
      title: "Mini test collector",
      tier: "challenge", uses: ["dict of names (L8)", "callable check", "AssertionError handling (L11)"],
      prompt: `<p>Define <code>run_tests(namespace)</code>: given a dict of <code>name -&gt; object</code>
        (like <code>globals()</code>), call every value whose name starts with <code>test_</code> and
        is callable. Return <code>(passed, failed)</code> — a test "fails" if it raises anything.</p>`,
      solution: `def run_tests(namespace):\n    passed = 0\n    failed = 0\n    for name in sorted(namespace):\n        obj = namespace[name]\n        if name.startswith("test_") and callable(obj):\n            try:\n                obj()\n                passed += 1\n            except Exception:\n                failed += 1\n    return (passed, failed)`,
      success: "This is pytest's collection in miniature: find test_*, call, tally.",
      mustDefine: ["run_tests"],
      tests: [
        { append: `def test_a(): assert 1 == 1\ndef test_b(): assert 1 == 2\ndef test_c(): pass\ndef helper(): raise RuntimeError()\nprint(run_tests(dict(globals())))`, expect: "(2, 1)" },
      ],
    },
    {
      title: "Parametrized runner",
      tier: "boss", uses: ["decorator storing data (L21)", "loop over rows (L6)", "collect results"],
      prompt: `<p>Define <code>parametrize(rows)</code> — a decorator that attaches <code>rows</code> (a list
        of arg-tuples) to a test function as <code>fn.rows</code>. Then define
        <code>run_param(fn)</code> that calls <code>fn(*row)</code> for each row and returns a list of
        <code>"ok"</code>/<code>"fail"</code> strings (fail = it raised).</p>`,
      solution: `def parametrize(rows):\n    def deco(fn):\n        fn.rows = rows\n        return fn\n    return deco\n\ndef run_param(fn):\n    out = []\n    for row in fn.rows:\n        try:\n            fn(*row)\n            out.append("ok")\n        except Exception:\n            out.append("fail")\n    return out`,
      success: "@parametrize stashes the cases; the runner replays them one by one.",
      mustDefine: ["parametrize", "run_param"],
      tests: [
        { append: `@parametrize([(2, 3, 5), (0, 0, 0), (1, 1, 3)])\ndef test_add(a, b, expected):\n    assert a + b == expected\nprint(run_param(test_add))`, expect: "['ok', 'ok', 'fail']" },
      ],
    },
  ],
},

/* ========================================================== 56 */
{
  id: "tox",
  section: "Testing",
  title: "tox",
  summary: "Automate 'test my package in a clean env across several Python versions' — the local mini-CI.",
  lead: "tox reads a config, builds a fresh virtualenv per target (py39, py312, lint, docs...), installs your package + deps into each, and runs the commands. One `tox` = the whole matrix.",
  spiral: ["virtualenvs (L36)", "pyproject / ini config (L30)", "running test suites (L53, L55)", "the CI mindset (L45)", "parsing config text (L4)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · The config</h2>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code># tox.ini  (or [tool.tox] in pyproject.toml)
[tox]
envlist = py39, py310, py311, py312, lint

[testenv]
deps = pytest
commands = pytest {posargs}

[testenv:lint]
deps = ruff
commands = ruff check .
skip_install = true</code></pre>
      <p>Run <code>tox</code> to do every env; <code>tox -e py312</code> for one;
      <code>tox -e py311,lint</code> for a subset. <code>tox -p</code> runs envs in parallel.</p>` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th>Key</th><th>Meaning</th></tr>
        <tr><td><code>envlist</code></td><td>the default set of environments to create &amp; run</td></tr>
        <tr><td><code>[testenv]</code></td><td>the template every <code>pyNN</code> env inherits</td></tr>
        <tr><td><code>[testenv:NAME]</code></td><td>a specific env (e.g. <code>lint</code>, <code>docs</code>) — overrides the template</td></tr>
        <tr><td><code>deps</code></td><td>extra packages to install into that env</td></tr>
        <tr><td><code>commands</code></td><td>what to run (each line a separate command; non-zero exit = fail)</td></tr>
        <tr><td><code>{posargs}</code></td><td>placeholder for args you pass after <code>--</code></td></tr>
      </table>
      <div class="note"><b>tox vs CI</b> CI (GitHub Actions etc.) runs on their machines on push. tox
      runs the same matrix on <em>yours</em>, before you push — and CI often just calls <code>tox</code>.
      <code>nox</code> is a similar tool configured in Python instead of ini.</div>` },
    { type: "html", html: whatif([
      "a test passes with <code>python -m pytest</code> in your shell but fails under <code>tox</code> — what did tox control that your shell didn't?",
      "<code>envlist = py39, py312</code> — how many virtualenvs does a plain <code>tox</code> build?",
      "the <code>lint</code> env has <code>skip_install = true</code> — why would you skip installing the package there?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>tox = a fresh virtualenv per target + install + run commands, driven by <code>tox.ini</code> / <code>[tool.tox]</code>.</li>
        <li><code>envlist</code> is the matrix; <code>[testenv]</code> is the shared template; <code>[testenv:name]</code> specialises.</li>
        <li><code>tox -e NAME</code> for one env, <code>tox -p</code> for parallel; CI usually just runs <code>tox</code>.</li>
        <li>Catches "works on my machine / my Python version" before review.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "tox — documentation", url: "https://tox.wiki/en/stable/" },
    { label: "tox — configuration", url: "https://tox.wiki/en/stable/config.html" },
    { label: "nox — the Python-configured alternative", url: "https://nox.thea.codes/en/stable/" },
  ],
  exercises: [
    {
      title: "Parse envlist",
      tier: "warm", uses: ["split on comma (L4)", "strip each", "build a list"],
      prompt: `<p>Define <code>envs(envlist)</code>: given a string like
        <code>"py39, py310 , py312,lint"</code>, return the cleaned list
        <code>['py39', 'py310', 'py312', 'lint']</code>.</p>`,
      solution: `def envs(envlist):\n    out = []\n    for part in envlist.split(","):\n        part = part.strip()\n        if part:\n            out.append(part)\n    return out`,
      success: "Comma-split then strip — the same pattern as requirements parsing.",
      mustDefine: ["envs"],
      tests: [
        { append: `print(envs("py39, py310 , py312,lint"))`, expect: "['py39', 'py310', 'py312', 'lint']" },
        { append: `print(envs("py312"))`, expect: "['py312']" },
      ],
    },
    {
      title: "Count the virtualenvs",
      tier: "warm", uses: ["len of parsed list", "reuse envs()"],
      prompt: `<p>Define <code>num_envs(envlist)</code> returning how many environments a plain
        <code>tox</code> run would create for that <code>envlist</code> string.</p>`,
      solution: `def num_envs(envlist):\n    count = 0\n    for part in envlist.split(","):\n        if part.strip():\n            count += 1\n    return count`,
      success: "One virtualenv per name in envlist.",
      mustDefine: ["num_envs"],
      tests: [
        { append: `print(num_envs("py39, py310, py311, py312, lint"))`, expect: "5" },
        { append: `print(num_envs(""))`, expect: "0" },
      ],
    },
    {
      title: "Resolve a testenv",
      tier: "core", uses: ["dict merge (L8)", "[testenv] template + override"],
      prompt: `<p>Define <code>resolve_env(base, override)</code>: <code>base</code> is the
        <code>[testenv]</code> settings dict, <code>override</code> is <code>[testenv:NAME]</code>.
        Return the effective config — override keys win, others come from base. Don't mutate inputs.</p>`,
      solution: `def resolve_env(base, override):\n    cfg = dict(base)\n    cfg.update(override)\n    return cfg`,
      success: "Each named env inherits the template, then patches it.",
      mustDefine: ["resolve_env"],
      tests: [
        { append: `base = {"deps": "pytest", "commands": "pytest"}\nlint = {"deps": "ruff", "commands": "ruff check ."}\nprint(resolve_env(base, lint))`, expect: "{'deps': 'ruff', 'commands': 'ruff check .'}" },
        { append: `base = {"deps": "pytest", "commands": "pytest", "passenv": "CI"}\nprint(resolve_env(base, {"commands": "pytest -x"}))`, expect: "{'deps': 'pytest', 'commands': 'pytest -x', 'passenv': 'CI'}" },
      ],
    },
    {
      title: "Select envs to run",
      tier: "challenge", uses: ["-e filtering (L4)", "set intersection (L7)", "sorted", "keep declared order"],
      prompt: `<p>Define <code>selected(envlist, dash_e)</code>: <code>envlist</code> is the full comma
        string; <code>dash_e</code> is the value of <code>tox -e</code> (also comma-separated), or
        <code>""</code> for "all". Return the list of envs to run, <strong>in the order they appear in
        envlist</strong>, keeping only those also named in <code>dash_e</code> (unless it's empty).</p>`,
      solution: `def selected(envlist, dash_e):\n    all_envs = [p.strip() for p in envlist.split(",") if p.strip()]\n    if not dash_e.strip():\n        return all_envs\n    wanted = {p.strip() for p in dash_e.split(",") if p.strip()}\n    return [e for e in all_envs if e in wanted]`,
      success: "Filter by -e but preserve envlist's order.",
      mustDefine: ["selected"],
      tests: [
        { append: `print(selected("py39, py310, py312, lint", ""))`, expect: "['py39', 'py310', 'py312', 'lint']" },
        { append: `print(selected("py39, py310, py312, lint", "lint, py39"))`, expect: "['py39', 'lint']" },
        { append: `print(selected("py39, py312", "py311"))`, expect: "[]" },
      ],
    },
  ],
},

/* ========================================================== 57 */
{
  id: "sync-frameworks",
  section: "Learn a Framework",
  title: "Synchronous frameworks — Pyramid, Plotly Dash",
  summary: "The WSGI request→response model: one thread handles one request start to finish. Routing tables, view callables, the environ dict.",
  lead: "A web framework is mostly a router (URL → function) plus glue for parsing the request and building the response. Sync frameworks run on WSGI: a plain function that takes the request and returns bytes.",
  spiral: ["functions & return (L10)", "dicts as lookup tables (L8)", "string split / slicing (L4)", "decorators register things (L21)", "exceptions → error responses (L11)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · WSGI: the whole contract</h2>
      <p>A WSGI app is a callable <code>app(environ, start_response)</code>. <code>environ</code> is a
      dict describing the request (<code>PATH_INFO</code>, <code>REQUEST_METHOD</code>,
      <code>QUERY_STRING</code>, …). It returns an iterable of <code>bytes</code> — the body. That's
      it; Flask, Pyramid, Bottle, Django (classic) all sit on top of this.</p>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>def app(environ, start_response):
    path = environ["PATH_INFO"]
    if path == "/":
        start_response("200 OK", [("Content-Type", "text/plain")])
        return [b"home"]
    start_response("404 Not Found", [])
    return [b"nope"]</code></pre>` },
    { type: "html", html: `
      <h2>2 · Routing = a dict (or a list of rules)</h2>
      <p>Pyramid: <code>config.add_route("home", "/")</code> then a <em>view callable</em>
      <code>def home(request): return Response("hi")</code>. Under the hood it's a mapping from a
      route name / path pattern to a function. Dynamic segments like <code>/user/{id}</code> get
      parsed out and handed to the view.</p>
      <table class="tbl">
        <tr><th>Framework</th><th>Shape</th></tr>
        <tr><td><b>Pyramid</b></td><td>explicit config, <code>add_route</code> + <code>add_view</code>; scales from micro to large</td></tr>
        <tr><td><b>Flask</b></td><td><code>@app.route("/")</code> decorator (covered again in L59)</td></tr>
        <tr><td><b>Plotly Dash</b></td><td>not request/response — a <em>reactive</em> layer: <code>@app.callback(Output(...), Input(...))</code> recomputes UI when inputs change</td></tr>
      </table>` },
    { type: "code", title: "A mini router (plain Python)", code: `def home(req):
    return (200, "home page")

def about(req):
    return (200, "about us")

ROUTES = {"/": home, "/about": about}

def handle(path):
    view = ROUTES.get(path)
    if view is None:
        return (404, "not found")
    return view({"path": path})

print(handle("/"))
print(handle("/about"))
print(handle("/missing"))` },
    { type: "html", html: `
      <h2>3 · Dash's model, briefly</h2>
      <p>Dash flips it: you declare a <code>layout</code> of components and register
      <b>callbacks</b> — "when <code>Input('slider','value')</code> changes, run this function and put
      its return into <code>Output('graph','figure')</code>." The framework wires the graph of
      dependencies; you never write a route. Good for dashboards, not general web apps.</p>` },
    { type: "html", html: whatif([
      "two requests arrive at once and each view does a slow DB call — with one sync worker thread, what happens to the second?",
      "a route is <code>/user/{id}</code> and the URL is <code>/user/42</code> — what does the view receive, and as what type?",
      "your view raises an uncaught exception — what status code should the framework send, and should the traceback go to the user?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Sync frameworks run on <b>WSGI</b>: <code>app(environ, start_response) → [bytes]</code>.</li>
        <li>Routing is a mapping from path/pattern to a <b>view callable</b> that returns a response.</li>
        <li>One worker handles one request at a time; concurrency comes from running many workers/threads.</li>
        <li>Pyramid = explicit, scalable config; Dash = reactive callbacks for dashboards, not routes.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "PEP 3333 — Python Web Server Gateway Interface (WSGI)", url: "https://peps.python.org/pep-3333/" },
    { label: "Pyramid — documentation", url: "https://docs.pylonsproject.org/projects/pyramid/en/latest/" },
    { label: "Plotly Dash — documentation", url: "https://dash.plotly.com/" },
  ],
  exercises: [
    {
      title: "Dispatch by path",
      tier: "warm", uses: ["dict.get with default (L8)", "call the looked-up function (L10)", "tuple return (L7)"],
      prompt: `<p>Given <code>routes</code> (a dict <code>path -&gt; function</code>), define
        <code>dispatch(routes, path)</code>: call the matching function with no args and return its
        value; if there's no match return <code>(404, "not found")</code>.</p>`,
      starter: `def dispatch(routes, path):\n    ...`,
      solution: `def dispatch(routes, path):\n    view = routes.get(path)\n    if view is None:\n        return (404, "not found")\n    return view()`,
      success: "A router is just a dict lookup + a call.",
      mustDefine: ["dispatch"],
      tests: [
        { append: `r = {"/": lambda: (200, "home"), "/help": lambda: (200, "help")}\nprint(dispatch(r, "/"))\nprint(dispatch(r, "/help"))\nprint(dispatch(r, "/x"))`, expect: "(200, 'home')\n(200, 'help')\n(404, 'not found')" },
      ],
    },
    {
      title: "Parse the query string",
      tier: "core", uses: ["str.split (L4)", "loop (L6)", "build a dict (L8)"],
      prompt: `<p>Define <code>parse_qs(q)</code>: turn <code>"a=1&b=two&c="</code> into
        <code>{"a": "1", "b": "two", "c": ""}</code>. Empty input &rarr; <code>{}</code>. Ignore a
        fragment with no <code>=</code>.</p>`,
      solution: `def parse_qs(q):\n    out = {}\n    if not q:\n        return out\n    for pair in q.split("&"):\n        if "=" not in pair:\n            continue\n        key, value = pair.split("=", 1)\n        out[key] = value\n    return out`,
      success: "This is what environ['QUERY_STRING'] handling does (real code also URL-decodes).",
      mustDefine: ["parse_qs"],
      tests: [
        { append: `print(parse_qs("a=1&b=two&c="))`, expect: "{'a': '1', 'b': 'two', 'c': ''}" },
        { append: `print(parse_qs(""))`, expect: "{}" },
        { append: `print(parse_qs("x=9&broken&y=2"))`, expect: "{'x': '9', 'y': '2'}" },
      ],
    },
    {
      title: "Match a dynamic segment",
      tier: "core", uses: ["split & compare lengths (L4)", "zip-style loop (L6)", "return params dict"],
      prompt: `<p>Define <code>match(pattern, path)</code>. <code>pattern</code> looks like
        <code>"/user/{id}/posts"</code>; a segment in <code>{}</code> is a wildcard. Return a dict of
        the captured names &rarr; values if every fixed segment matches and the lengths line up,
        else <code>None</code>.</p>`,
      solution: `def match(pattern, path):\n    pp = pattern.strip("/").split("/")\n    sp = path.strip("/").split("/")\n    if len(pp) != len(sp):\n        return None\n    params = {}\n    for pat, seg in zip(pp, sp):\n        if pat.startswith("{") and pat.endswith("}"):\n            params[pat[1:-1]] = seg\n        elif pat != seg:\n            return None\n    return params`,
      success: "Frameworks compile the pattern to a regex; this is the same idea by hand.",
      mustDefine: ["match"],
      tests: [
        { append: `print(match("/user/{id}/posts", "/user/42/posts"))`, expect: "{'id': '42'}" },
        { append: `print(match("/user/{id}", "/user/42/posts"))`, expect: "None" },
        { append: `print(match("/a/{x}/{y}", "/a/1/2"))`, expect: "{'x': '1', 'y': '2'}" },
        { append: `print(match("/home", "/home"))`, expect: "{}" },
      ],
    },
    {
      title: "Dash-style callback graph",
      tier: "challenge", uses: ["register in a dict (L8)", "look up dependents", "recompute", "recall: match()/dispatch pattern"],
      prompt: `<p>Build a tiny reactive layer. <code>register(cbs, output, inputs, fn)</code> stores a
        callback keyed by <code>output</code> with its <code>inputs</code> (list of state keys) and
        <code>fn</code>. <code>recompute(cbs, state, changed)</code> returns a dict of
        <code>output -&gt; fn(*[state[i] for i in inputs])</code> for every callback whose
        <code>inputs</code> contains <code>changed</code>.</p>`,
      solution: `def register(cbs, output, inputs, fn):\n    cbs[output] = {"inputs": inputs, "fn": fn}\n\ndef recompute(cbs, state, changed):\n    out = {}\n    for output, cb in cbs.items():\n        if changed in cb["inputs"]:\n            args = [state[i] for i in cb["inputs"]]\n            out[output] = cb["fn"](*args)\n    return out`,
      success: "Dash figures out which outputs depend on the changed input and reruns only those.",
      mustDefine: ["register", "recompute"],
      tests: [
        { append: `cbs = {}\nregister(cbs, "total", ["a", "b"], lambda a, b: a + b)\nregister(cbs, "label", ["c"], lambda c: c.upper())\nstate = {"a": 2, "b": 3, "c": "hi"}\nprint(recompute(cbs, state, "a"))\nprint(recompute(cbs, state, "c"))\nprint(recompute(cbs, state, "z"))`, expect: "{'total': 5}\n{'label': 'HI'}\n{}" },
      ],
    },
  ],
},

/* ========================================================== 58 */
{
  id: "async-frameworks",
  section: "Learn a Framework",
  title: "Asynchronous frameworks — gevent, Tornado, Sanic, aiohttp",
  summary: "The ASGI / event-loop model: one thread juggles thousands of requests by switching whenever one waits on I/O.",
  lead: "When a request spends most of its time waiting (a DB, another API), a sync worker sits idle. Async frameworks use one loop that parks a waiting coroutine and runs another — huge concurrency on one thread.",
  spiral: ["async / await & asyncio (L37)", "the GIL & I/O-bound vs CPU-bound (L38)", "functions returning values (L10)", "dict responses (L8)", "the sync router from L57"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Handlers are coroutines</h2>
      <p>A view becomes <code>async def</code>; anything that waits is <code>await</code>ed. While one
      handler awaits a slow database, the loop runs other handlers. No threads, no locks for this
      kind of concurrency.</p>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code>async def handler(request):
    row = await db.fetch(request.match_info["id"])   # loop runs others meanwhile
    return {"name": row["name"]}</code></pre>` },
    { type: "html", html: `
      <h2>2 · ASGI, and the four names</h2>
      <p><b>ASGI</b> is WSGI's async successor: <code>async def app(scope, receive, send)</code>.
      <code>scope</code> describes the connection; <code>receive</code>/<code>send</code> are async
      channels for request/response events.</p>
      <table class="tbl">
        <tr><th>Tool</th><th>Approach</th></tr>
        <tr><td><b>gevent</b></td><td><em>Implicit</em>: monkeypatches the stdlib so ordinary blocking code yields at I/O via greenlets. You write sync-looking code.</td></tr>
        <tr><td><b>Tornado</b></td><td>One of the originals; its own IOLoop, now <code>asyncio</code>-compatible. <code>RequestHandler</code> with <code>async def get()</code>.</td></tr>
        <tr><td><b>Sanic</b></td><td>Flask-like API, async-first, built for speed. <code>@app.get("/")</code> + <code>async def</code>.</td></tr>
        <tr><td><b>aiohttp</b></td><td>Both an async <em>client</em> and <em>server</em>; explicit <code>asyncio</code>, low-level-ish.</td></tr>
      </table>` },
    { type: "code", title: "Await many handlers concurrently", code: `import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)       # stand-in for real I/O
    return name.upper()

async def main():
    results = await asyncio.gather(
        fetch("a", 0.03),
        fetch("b", 0.01),
        fetch("c", 0.02),
    )
    return results

print(asyncio.run(main()))          # ['A', 'B', 'C'] — total ≈ 0.03s, not 0.06s` },
    { type: "html", html: `
      <div class="note"><b>The catch</b> Async only helps <em>I/O-bound</em> work. A handler that
      does heavy computation still blocks the whole loop — every other request stalls. For CPU work
      you need processes (L36), or run it in a thread/executor. This is the GIL story (L38) from the
      web side.</div>` },
    { type: "html", html: whatif([
      "a handler does <code>time.sleep(5)</code> (blocking) instead of <code>await asyncio.sleep(5)</code> — what happens to every other in-flight request?",
      "you <code>await</code> three API calls one after another vs <code>asyncio.gather</code> them — how does total latency differ?",
      "gevent lets you write blocking-looking code that's actually cooperative — what's the risk of a library that gevent <em>can't</em> monkeypatch?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Handlers are <code>async def</code>; <code>await</code> at every I/O point lets the loop serve others.</li>
        <li><b>ASGI</b>: <code>async def app(scope, receive, send)</code> — the async server contract.</li>
        <li><code>asyncio.gather</code> runs awaitables concurrently; total time ≈ the slowest, not the sum.</li>
        <li>Wins for I/O-bound load only; CPU-bound work still blocks the loop — offload it.</li>
        <li>gevent = implicit (monkeypatch); Tornado/Sanic/aiohttp = explicit <code>async/await</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "ASGI specification", url: "https://asgi.readthedocs.io/en/latest/" },
    { label: "aiohttp — server documentation", url: "https://docs.aiohttp.org/en/stable/web.html" },
    { label: "Sanic — documentation", url: "https://sanic.dev/en/" },
    { label: "Tornado — documentation", url: "https://www.tornadoweb.org/en/stable/" },
  ],
  exercises: [
    {
      title: "An async handler",
      tier: "warm", uses: ["async def / await (L37)", "asyncio.run", "dict response (L8)"],
      prompt: `<p>Define <code>async def greet(name)</code> that <code>await asyncio.sleep(0)</code> (a
        yield point) and returns <code>{"status": 200, "body": "hi " + name}</code>. The harness runs
        it with <code>asyncio.run</code>.</p>`,
      solution: `import asyncio\n\nasync def greet(name):\n    await asyncio.sleep(0)\n    return {"status": 200, "body": "hi " + name}`,
      success: "A handler is just a coroutine that returns a response value.",
      mustDefine: ["greet"],
      require: [{ pattern: "async def greet", hard: true, message: "greet must be 'async def'." }],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(greet("ada")))`, expect: "{'status': 200, 'body': 'hi ada'}" },
      ],
    },
    {
      title: "Concurrent vs sequential",
      tier: "core", uses: ["asyncio.gather (L37)", "list of awaitables", "loop timing intuition"],
      prompt: `<p>Define <code>async def run_all(jobs)</code> where <code>jobs</code> is a list of
        <code>(name, delay)</code>. Start them <strong>all at once</strong> with
        <code>asyncio.gather</code>; each job <code>await asyncio.sleep(delay)</code> then yields
        <code>name.upper()</code>. Return the list of results in order.</p>`,
      solution: `import asyncio\n\nasync def _job(name, delay):\n    await asyncio.sleep(delay)\n    return name.upper()\n\nasync def run_all(jobs):\n    return await asyncio.gather(*(_job(n, d) for n, d in jobs))`,
      success: "gather keeps result order even though the tasks finish out of order.",
      mustDefine: ["run_all"],
      require: [{ pattern: "gather", hard: true, message: "Use asyncio.gather to run them concurrently." }],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(run_all([("a", 0.02), ("b", 0.01), ("c", 0.0)])))`, expect: "['A', 'B', 'C']" },
      ],
    },
    {
      title: "Async middleware chain",
      tier: "challenge", uses: ["closures / wrapping (L21)", "await the inner handler", "compose a list"],
      prompt: `<p>Define <code>apply(middlewares, handler)</code>: each middleware is
        <code>async def mw(request, nxt)</code> and must <code>await nxt(request)</code>. Fold the list
        so <code>middlewares[0]</code> is outermost. Return a single
        <code>async def final(request)</code>.</p>`,
      solution: `def apply(middlewares, handler):\n    wrapped = handler\n    for mw in reversed(middlewares):\n        def make(mw, nxt):\n            async def call(request):\n                return await mw(request, nxt)\n            return call\n        wrapped = make(mw, wrapped)\n    return wrapped`,
      success: "Same onion model as sync middleware — just with await at each layer.",
      mustDefine: ["apply"],
      tests: [
        { append: `import asyncio\nasync def base(req):\n    return req + "!"\nasync def tag(req, nxt):\n    return "[" + await nxt(req) + "]"\nasync def up(req, nxt):\n    return (await nxt(req.upper()))\nfinal = apply([tag, up], base)\nprint(asyncio.run(final("hi")))`, expect: "[HI!]" },
      ],
    },
    {
      title: "Route I/O-bound, offload CPU-bound",
      tier: "boss", uses: ["classify work", "async for I/O, thread for CPU (L38)", "dict dispatch (L57)", "run_in_executor"],
      prompt: `<p>Define <code>async def serve(kind)</code>: for <code>"io"</code> do
        <code>await asyncio.sleep(0)</code> and return <code>"io done"</code>; for <code>"cpu"</code>
        run <code>sum(range(1000))</code> via
        <code>await asyncio.get_event_loop().run_in_executor(None, work)</code> and return
        <code>f"cpu {result}"</code>; anything else &rarr; return <code>"unknown"</code>.</p>`,
      solution: `import asyncio\n\ndef _work():\n    return sum(range(1000))\n\nasync def serve(kind):\n    if kind == "io":\n        await asyncio.sleep(0)\n        return "io done"\n    if kind == "cpu":\n        loop = asyncio.get_event_loop()\n        result = await loop.run_in_executor(None, _work)\n        return f"cpu {result}"\n    return "unknown"`,
      success: "CPU work goes to a thread pool so the loop stays free for I/O handlers.",
      mustDefine: ["serve"],
      require: [{ pattern: "run_in_executor", hard: true, message: "Offload the CPU branch with run_in_executor." }],
      tests: [
        { append: `import asyncio\nprint(asyncio.run(serve("io")))\nprint(asyncio.run(serve("cpu")))\nprint(asyncio.run(serve("other")))`, expect: "io done\ncpu 499500\nunknown" },
      ],
    },
  ],
},

/* ========================================================== 59 */
{
  id: "fullstack-frameworks",
  section: "Learn a Framework",
  title: "Sync + Async frameworks — FastAPI, Django, Flask",
  summary: "The frameworks most jobs use: decorator routing, request parsing, typed validation, dependency injection, and (now) both sync and async views.",
  lead: "Flask (micro, WSGI), Django (batteries-included, ORM + admin), FastAPI (ASGI, type-hint-driven validation and docs). All three now let a view be sync or async.",
  spiral: ["decorators that register (L21)", "type annotations (L12)", "type casting int()/float() (L9)", "dicts & .get (L8)", "the router idea (L57)", "async views (L58)", "Pydantic-style validation (L44)"],
  blocks: [
    { type: "html", html: `
      <h2>1 · Decorator routing</h2>
      <p>All three attach a URL to a function with a decorator:</p>
      <pre style="background:var(--code-bg);color:var(--code-ink);padding:12px;border-radius:8px;overflow:auto"><code># Flask                         # FastAPI
@app.route("/items/<int:id>")   @app.get("/items/{id}")
def get_item(id):               def get_item(id: int):
    return {"id": id}               return {"id": id}</code></pre>
      <p>The decorator just records <code>(method, path_pattern) → function</code> in a table the
      framework walks on each request.</p>` },
    { type: "html", html: `
      <table class="tbl">
        <tr><th></th><th>Flask</th><th>Django</th><th>FastAPI</th></tr>
        <tr><td>Base</td><td>WSGI (+ASGI)</td><td>WSGI +ASGI</td><td>ASGI</td></tr>
        <tr><td>Routing</td><td><code>@app.route</code></td><td><code>urls.py</code> patterns</td><td><code>@app.get/post</code></td></tr>
        <tr><td>Data layer</td><td>you pick (SQLAlchemy…)</td><td>built-in ORM + migrations + admin</td><td>you pick</td></tr>
        <tr><td>Validation</td><td>manual / extension</td><td>Forms / DRF serializers</td><td><b>type hints → Pydantic</b></td></tr>
        <tr><td>Best when</td><td>small services, full control</td><td>content-heavy apps, teams, deadlines</td><td>APIs, typed, auto OpenAPI docs</td></tr>
      </table>` },
    { type: "html", html: `
      <h2>2 · FastAPI's two big ideas</h2>
      <ul>
        <li><b>Types are the schema.</b> <code>def create(item: Item)</code> where <code>Item</code> is
        a Pydantic model → request JSON is parsed, validated, and coerced; a bad body gets an
        automatic 422 with details. The OpenAPI docs page is generated from the same hints.</li>
        <li><b>Dependency injection.</b> <code>def handler(user = Depends(get_user))</code>: FastAPI
        calls <code>get_user</code>, passes the result in. Dependencies can have dependencies. Great
        for auth, DB sessions, pagination params.</li>
      </ul>` },
    { type: "code", title: "A route table + typed path params (plain Python)", code: `def route_table():
    table = {}
    def get(path):
        def deco(fn):
            table[("GET", path)] = fn
            return fn
        return deco
    return table, get

TABLE, get = route_table()

@get("/items/{id}")
def show(id: int):
    return {"id": id, "kind": type(id).__name__}

print(TABLE[("GET", "/items/{id}")](7))` },
    { type: "html", html: whatif([
      "a FastAPI path is <code>/items/{id}</code> with <code>id: int</code> and someone requests <code>/items/abc</code> — what status comes back, before your function runs?",
      "two endpoints both need <code>get_db()</code> — with <code>Depends</code>, how many times is it written vs called?",
      "Django gives you an ORM and admin for free; when is that weight a cost rather than a saving?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li>Routing decorators fill a <code>(method, path) → view</code> table.</li>
        <li>FastAPI: <b>type hints drive validation</b> (Pydantic) and auto-generate OpenAPI docs.</li>
        <li><code>Depends(...)</code> = dependency injection: declare what you need, the framework supplies it.</li>
        <li>Flask = minimal & explicit; Django = batteries-included; FastAPI = typed async APIs. All support sync <em>and</em> async views now.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "FastAPI — documentation", url: "https://fastapi.tiangolo.com/" },
    { label: "Flask — documentation", url: "https://flask.palletsprojects.com/" },
    { label: "Django — documentation", url: "https://docs.djangoproject.com/en/stable/" },
  ],
  exercises: [
    {
      title: "A route decorator",
      tier: "warm", uses: ["decorator with args (L21)", "mutate an enclosing dict (L8)", "return fn unchanged"],
      prompt: `<p>Define <code>make_router()</code> returning <code>(routes, route)</code>.
        <code>route(method, path)</code> is a decorator that stores the function under
        <code>(method, path)</code> in <code>routes</code> and returns it untouched.</p>`,
      solution: `def make_router():\n    routes = {}\n    def route(method, path):\n        def deco(fn):\n            routes[(method, path)] = fn\n            return fn\n        return deco\n    return routes, route`,
      success: "@app.route is exactly this: a decorator that registers, then hands the function back.",
      mustDefine: ["make_router"],
      tests: [
        { append: `routes, route = make_router()\n@route("GET", "/")\ndef home():\n    return "home"\n@route("POST", "/submit")\ndef submit():\n    return "ok"\nprint(sorted(routes))\nprint(routes[("GET", "/")]())`, expect: "[('GET', '/'), ('POST', '/submit')]\nhome" },
      ],
    },
    {
      title: "Coerce path params by annotation",
      tier: "core", uses: ["function __annotations__ (L12)", "type casting (L9)", "call with converted args"],
      prompt: `<p>Define <code>call_view(fn, raw)</code> where <code>raw</code> is a dict of
        <code>name -&gt; string</code>. For each parameter, if <code>fn.__annotations__</code> gives
        <code>int</code> or <code>float</code>, convert; otherwise pass the string. Call <code>fn</code>
        with the converted kwargs and return the result.</p>`,
      solution: `def call_view(fn, raw):\n    ann = fn.__annotations__\n    kwargs = {}\n    for name, value in raw.items():\n        t = ann.get(name)\n        if t is int:\n            kwargs[name] = int(value)\n        elif t is float:\n            kwargs[name] = float(value)\n        else:\n            kwargs[name] = value\n    return fn(**kwargs)`,
      success: "FastAPI does this from the hints — the string from the URL becomes a real int.",
      mustDefine: ["call_view"],
      tests: [
        { append: `def show(id: int, tag: str):\n    return f"{tag}:{id}:{type(id).__name__}"\nprint(call_view(show, {"id": "7", "tag": "x"}))`, expect: "x:7:int" },
        { append: `def price(amount: float):\n    return amount * 2\nprint(call_view(price, {"amount": "1.5"}))`, expect: "3.0" },
      ],
    },
    {
      title: "Validate a request body",
      tier: "core", uses: ["schema as a dict (L8)", "isinstance checks (L2)", "collect errors (L6)"],
      prompt: `<p>Define <code>validate(schema, body)</code>. <code>schema</code> maps
        <code>field -&gt; type</code>. Return <code>(True, [])</code> if every field is present and an
        instance of its type; otherwise <code>(False, errors)</code> where each error is
        <code>"missing: X"</code> or <code>"wrong type: X"</code>, in <code>schema</code> order.</p>`,
      solution: `def validate(schema, body):\n    errors = []\n    for field, typ in schema.items():\n        if field not in body:\n            errors.append("missing: " + field)\n        elif not isinstance(body[field], typ):\n            errors.append("wrong type: " + field)\n    return (len(errors) == 0, errors)`,
      success: "A Pydantic model in miniature — this is the check behind FastAPI's automatic 422.",
      mustDefine: ["validate"],
      tests: [
        { append: `s = {"name": str, "age": int}\nprint(validate(s, {"name": "Ada", "age": 36}))`, expect: "(True, [])" },
        { append: `s = {"name": str, "age": int}\nprint(validate(s, {"name": "Ada"}))`, expect: "(False, ['missing: age'])" },
        { append: `s = {"name": str, "age": int}\nprint(validate(s, {"name": 5, "age": "x"}))`, expect: "(False, ['wrong type: name', 'wrong type: age'])" },
      ],
    },
    {
      title: "Dependency injection with Depends",
      tier: "boss", uses: ["callables as values (L10)", "resolve recursively (L17)", "inspect a marker object", "kwargs (L10)"],
      prompt: `<p>Model <code>Depends</code>. <code>Depends(fn)</code> wraps a provider. Define
        <code>solve(handler, deps)</code> where <code>deps</code> maps a param name to a
        <code>Depends(...)</code>. For each, call its provider — and if that provider <em>itself</em>
        has entries in <code>deps</code> keyed by <code>provider.__name__ + "." + param</code>,
        resolve those first. Call <code>handler</code> with the resolved kwargs; return its result.</p>
        <p>Keep it shallow: providers here take either no args, or args that are themselves in
        <code>deps</code> under the dotted key.</p>`,
      solution: `class Depends:\n    def __init__(self, provider):\n        self.provider = provider\n\ndef _resolve(dep, deps, prefix):\n    provider = dep.provider\n    kwargs = {}\n    for key, sub in deps.items():\n        if key.startswith(prefix + "."):\n            param = key[len(prefix) + 1:]\n            kwargs[param] = _resolve(sub, deps, sub.provider.__name__)\n    return provider(**kwargs)\n\ndef solve(handler, deps):\n    kwargs = {}\n    for name, dep in deps.items():\n        if "." in name:\n            continue\n        kwargs[name] = _resolve(dep, deps, dep.provider.__name__)\n    return handler(**kwargs)`,
      success: "Declare what you need; the framework walks the dependency tree and supplies it.",
      mustDefine: ["Depends", "solve"],
      tests: [
        { append: `def get_settings():\n    return {"env": "prod"}\ndef get_db(settings):\n    return "db@" + settings["env"]\ndef handler(db):\n    return "using " + db\ndeps = {\n    "db": Depends(get_db),\n    "get_db.settings": Depends(get_settings),\n}\nprint(solve(handler, deps))`, expect: "using db@prod" },
        { append: `def get_user():\n    return "ada"\ndef view(user):\n    return user.upper()\nprint(solve(view, {"user": Depends(get_user)}))`, expect: "ADA" },
      ],
    },
  ],
},

];

/* ============================================================
   ENHANCEMENTS (kept in one place so the big array above is
   never edited in fragile spots):
     1. progressive syntax cheat-sheet cards  -> l.card
     2. "Try this for real" panels            -> l.realworld
     3. two extra lessons  (match, stdlib)    -> pushed
     4. five checkpoint projects              -> spliced in
   ============================================================ */

/* ---- 1. reference-card snippets (shown once the lesson is unlocked) ---- */
const CARDS = {
  syntax: `print("Hello, world!")     show a value
# a comment — Python ignores it
"a\\nb"  -> two lines     "a\\tb" -> tab
'She said "hi"'           other quote inside`,
  variables: `x = 5            int        3.14   float
name = "Ada"     str        True   bool
value = None     "nothing yet"
type(x)   ->   <class 'int'>`,
  operators: `+  -  *  /        /  always gives a float
//  floor-divide    %  remainder    **  power
==  !=  <  >  <=  >=        0 < x < 10
and   or   not              x += 1     x *= 2`,
  strings: `s[0] first   s[-1] last   s[1:4] slice   s[::-1]
.upper() .lower() .strip() .title()
.split(",")   "-".join(parts)   .replace(a, b)
.startswith(x)  x in s  len(s)
f"{name} is {age}"   f"{price:.2f}"`,
  conditionals: `if x > 0:
    ...
elif x == 0:
    ...
else:
    ...
falsy: 0  0.0  ""  []  {}  None  False
result = a if cond else b`,
  loops: `for i in range(5):        0 1 2 3 4
for ch in "abc": ...
for i, v in enumerate(xs): ...
for a, b in zip(xs, ys): ...
while cond: ...
break = stop    continue = skip to next
total = 0 ; total += v      (accumulator)`,
  collections: `[1, 2, 3]   list    ordered, mutable
(1, 2, 3)   tuple   ordered, fixed
{1, 2, 3}   set     unique, unordered
xs.append(x)  xs.pop()  xs.sort()  x in xs
xs[1:3]   sorted(xs)   len(xs)   xs + ys`,
  dicts: `d = {"a": 1, "b": 2}
d["a"]              d.get("z", 0)   safe default
d["c"] = 3          add / overwrite
for k, v in d.items(): ...
"a" in d    d.keys()    d.values()    len(d)`,
  casting: `int("42")   float("3.5")   str(42)   bool(x)
int("3.5")   -> ValueError
round(3.7)   -> 4
n = int(input("How many? "))`,
  functions: `def add(a, b=0):
    return a + b
add(2)    add(2, 3)    add(b=3, a=1)
len sum max min sorted reversed abs round
any(xs)   all(xs)   *args   **kwargs`,
  exceptions: `try:
    risky()
except ValueError as e:
    ...
except (KeyError, IndexError):
    ...
else:       # no exception happened
finally:    # always runs
raise ValueError("message")`,
  "comments-annotations": `def f(x: int, s: str = "") -> bool:
    """One-line summary, imperative mood."""
    ...
name: str = "Ada"
count: int
-> str | None      may return None
# comments say WHY, not what`,
  "arrays-linked-lists": `# array  = contiguous, index in O(1)
# linked = nodes {"val", "next"}, prepend O(1)
node = {"val": 1, "next": None}
while node:            # traverse
    print(node["val"]); node = node["next"]
# two pointers: slow/fast to find the middle`,
  hashmaps: `# key -> hash -> bucket index; collisions chain
buckets = [[] for _ in range(n)]
i = hash(key) % n
# dict is the built-in hashmap:
seen = {}; seen[key] = value; key in seen  # O(1)`,
  "stacks-queues-heaps": `stack: xs.append(x) / xs.pop()          LIFO
queue: collections.deque; .append / .popleft  FIFO
heap:  import heapq
heapq.heappush(h, x)   heapq.heappop(h)   # smallest first
heapq.heapify(list)`,
  "binary-search-tree": `node = {"val": v, "left": None, "right": None}
# left subtree < node < right subtree
# search: go left if target < val, else right
# in-order traversal -> sorted order`,
  recursion: `def f(n):
    if n <= 1:        # base case — must shrink toward it
        return 1
    return n * f(n - 1)   # recursive case
# tree/list recursion: combine results of sub-calls
# memoise with a dict to kill repeated work`,
  "sorting-algorithms": `# O(n^2): bubble, selection, insertion
# O(n log n): merge sort (stable), quicksort
sorted(xs)                      # Timsort, use this
sorted(xs, key=len, reverse=True)
# merge: walk two sorted lists, take the smaller head`,
  modules: `import math                math.sqrt(9)
from random import choice
import numpy as np
if __name__ == "__main__":     # script vs import
    main()
# your own file.py IS a module`,
  lambdas: `f = lambda x: x * 2          f(5) -> 10
sorted(words, key=lambda w: len(w))
max(items, key=lambda p: p[1])
# no statements inside — one expression only`,
  decorators: `from functools import wraps
def deco(fn):
    @wraps(fn)
    def inner(*a, **kw):
        return fn(*a, **kw)
    return inner

@deco
def greet(): ...`,
  iterators: `it = iter([1, 2, 3])
next(it)   next(it)   ...   raises StopIteration
class Count:
    def __iter__(self): return self
    def __next__(self): ...`,
  regex: `import re
re.search(r"\\d+", s)      first match or None
re.findall(r"\\w+", s)     list of matches
re.sub(r"\\s+", " ", s)    replace
m.group(1)                capture group
r"..."  raw string — use it for patterns`,
  "variable-scope": `# LEGB: Local -> Enclosing -> Global -> Built-in
x = 1
def outer():
    y = 2
    def inner():
        nonlocal y      # rebind enclosing
        global x         # rebind module-level
    return inner`,
  "list-comprehensions": `[x * 2 for x in xs]
[x for x in xs if x > 0]
[f(x) for row in grid for x in row]     nested
{k: v for k, v in pairs}                dict comp
{x % 3 for x in xs}                     set comp`,
  "generator-expressions": `gen = (x * x for x in xs)      lazy, one at a time
sum(x * x for x in xs)         no temp list
def count_up():
    n = 0
    while True:
        yield n; n += 1`,
  "context-managers": `with open("f.txt") as fh:
    data = fh.read()
# __enter__ / __exit__ run around the block
from contextlib import contextmanager
@contextmanager
def ctx():
    setup(); yield resource; teardown()`,
  classes: `class Dog:
    def __init__(self, name):
        self.name = name
    def __repr__(self):
        return f"Dog({self.name!r})"
d = Dog("Rex");  d.name`,
  methods: `class C:
    def move(self): ...            instance method
    @classmethod
    def make(cls): ...             alt constructor
    @staticmethod
    def helper(): ...              plain function
    @property
    def size(self): return self._n`,
  inheritance: `class Animal:
    def speak(self): ...
class Cat(Animal):
    def speak(self):
        return "meow"
super().__init__(...)     call the parent
# prefer composition when "has-a", not "is-a"`,
  encapsulation: `self._internal   = "hint: don't touch"
self.__mangled   = "name-mangled to _Cls__mangled"
@property / @x.setter  -> validate on assignment
from dataclasses import dataclass
@dataclass
class Point: x: int; y: int`,
};

/* ---- 2. "Try this for real" — commands to run outside the browser sandbox ---- */
const REALWORLD = {
  "package-managers": {
    blurb: "On your own machine, with Python installed:",
    cmds: ["python -m venv .venv",
           "source .venv/bin/activate      # Windows: .venv\\Scripts\\activate",
           "pip install requests",
           "pip freeze > requirements.txt"],
    note: "uv and Poetry do the same job with a lockfile: `uv add requests`, `poetry add requests`.",
  },
  "common-packages": {
    blurb: "Install a couple and poke at them:",
    cmds: ["pip install requests rich",
           "python -c \"import requests; print(requests.get('https://httpbin.org/get').status_code)\""],
    note: "Every big package has its own docs — read requests / rich / numpy / pandas guides directly.",
  },
  "pyproject-toml": {
    blurb: "Build a real distributable package:",
    cmds: ["mkdir mypkg && cd mypkg",
           "pip install build",
           "# author pyproject.toml with [project] name/version/dependencies, then:",
           "python -m build",
           "pip install -e .              # editable install while you work"],
    note: "[project] is standard (PEP 621); tool tables like [tool.ruff] live in the same file.",
  },
  virtualenv: {
    blurb: "The stdlib way — nothing to install:",
    cmds: ["python -m venv .venv",
           "source .venv/bin/activate",
           "python -m pip list            # almost empty = a clean room",
           "deactivate"],
    note: ".venv/ belongs in .gitignore — you recreate it from requirements, you never commit it.",
  },
  pipenv: {
    blurb: "",
    cmds: ["pip install --user pipenv",
           "pipenv install requests",
           "pipenv shell",
           "pipenv lock                   # writes Pipfile.lock"],
    note: "`pipenv sync` reproduces the locked set exactly on another machine.",
  },
  pyenv: {
    blurb: "Install and switch Python *versions* (Unix; pyenv-win on Windows):",
    cmds: ["pyenv install 3.12.4",
           "pyenv local 3.12.4            # writes .python-version",
           "python --version"],
    note: "pyenv manages versions; venv / Pipenv manage packages within one version. Different jobs.",
  },
  multiprocessing: {
    blurb: "This needs real OS processes — run it as a script, not in the browser:",
    cmds: ["# save the example as demo.py, then:",
           "python demo.py"],
    note: "On Windows/macOS, guard the entry point with `if __name__ == '__main__':` or children re-run your module.",
  },
  mypy: {
    blurb: "",
    cmds: ["pip install mypy",
           "mypy your_file.py",
           "mypy --strict src/"],
    note: "Set options once in `[tool.mypy]` in pyproject.toml so the whole team checks the same way.",
  },
  pyright: {
    blurb: "",
    cmds: ["pip install pyright           # or just use Pylance in VS Code",
           "pyright",
           "pyright --outputjson"],
    note: "Config in pyrightconfig.json or [tool.pyright]; `# pyright: strict` at the top of a file.",
  },
  pyre: {
    blurb: "",
    cmds: ["pip install pyre-check",
           "pyre init",
           "pyre check"],
    note: "Meta's incremental checker for big codebases; Pysa (bundled) does taint / security analysis.",
  },
  black: {
    blurb: "",
    cmds: ["pip install black",
           "black .",
           "black --check --diff .        # CI: fail if anything is unformatted"],
    note: "Nothing to configure but line length (`--line-length 100`). That's the point.",
  },
  yapf: {
    blurb: "",
    cmds: ["pip install yapf",
           "yapf -i your_file.py",
           "yapf --style='{based_on_style: pep8, column_limit: 100}' -ir ."],
    note: "Choose yapf over black only when you genuinely need the knobs.",
  },
  ruff: {
    blurb: "",
    cmds: ["pip install ruff",
           "ruff check --fix .",
           "ruff format ."],
    note: "One fast tool for flake8 + isort + pyupgrade + more. Pick rules in [tool.ruff.lint].",
  },
  sphinx: {
    blurb: "",
    cmds: ["pip install sphinx",
           "sphinx-quickstart docs",
           "sphinx-build -b html docs docs/_build",
           "# open docs/_build/index.html"],
    note: "Turn on sphinx.ext.autodoc + napoleon in conf.py to pull your docstrings into the site.",
  },
  pytest: {
    blurb: "",
    cmds: ["pip install pytest",
           "pytest",
           "pytest -q -k name -x",
           "pytest --cov=src              # needs pytest-cov"],
    note: "Tests go in tests/, named test_*.py. Config in [tool.pytest.ini_options].",
  },
  tox: {
    blurb: "",
    cmds: ["pip install tox",
           "tox",
           "tox -e py312",
           "tox -p                        # envs in parallel"],
    note: "One tox.ini runs your suite in a fresh venv per Python version — your local CI.",
  },
  "sync-frameworks": {
    blurb: "Pyramid, minimal:",
    cmds: ["pip install pyramid waitress",
           "# app.py: a view callable + config.add_route(...) + make_server",
           "python app.py                 # serves on :6543"],
    note: "Plotly Dash: `pip install dash`, then `python app.py` opens a dashboard on :8050.",
  },
  "async-frameworks": {
    blurb: "",
    cmds: ["pip install aiohttp",
           "# server.py: async def handler(request); web.Application(); web.run_app(app)",
           "python server.py"],
    note: "Sanic / Tornado are similar. gevent needs `from gevent import monkey; monkey.patch_all()` as the FIRST import.",
  },
  "fullstack-frameworks": {
    blurb: "",
    cmds: ["pip install fastapi uvicorn",
           "# main.py: app = FastAPI(); @app.get('/items/{id}') def read(id: int): ...",
           "uvicorn main:app --reload     # http://127.0.0.1:8000/docs"],
    note: "Flask: `pip install flask`, `flask --app main run`. Django: `django-admin startproject site`.",
  },
};

CURRICULUM.forEach((l) => {
  if (CARDS[l.id]) l.card = CARDS[l.id];
  if (REALWORLD[l.id]) l.realworld = REALWORLD[l.id];
});

/* ---- known-wrong solutions the grader MUST reject (dev self-test, see app.js selfTest) ---- */
const ANTISOLUTIONS = {
  "match-statement": {
    0: [{ code: `def action(colour):\n    match colour:\n        case "red":\n            return "stop"\n        case "green":\n            return "go"\n        case "amber":\n            return "slow"\n        case _:\n            return "???"`,
          why: "handles 'amber' but not the 'yellow' spelling" }],
    1: [{ code: `def where(pt):\n    match pt:\n        case (_, 0):\n            return "x-axis"\n        case (0, _):\n            return "y-axis"\n        case _:\n            return "elsewhere"`,
          why: "partial patterns come before (0, 0), so the origin is mislabelled" }],
  },
  "stdlib-tour": {
    0: [{ code: `import json\n\ndef to_json(d):\n    return json.dumps(d)`,
          why: "no sort_keys — output order is not deterministic" }],
    2: [{ code: `from collections import Counter\n\ndef top_words(text, n):\n    return Counter(text.split())`,
          why: "returns the Counter itself, not a ranked list of tuples" }],
  },
  "cp-text-adventure": {
    1: [{ code: `def describe(world, name):\n    room = world[name]\n    dirs = list(room["exits"])\n    line2 = "Exits: " + (", ".join(dirs) if dirs else "none")\n    return room["desc"] + "\\n" + line2`,
          why: "exit directions are not sorted" }],
  },
  "cp-data-toolkit": {
    2: [{ code: `def merge_sorted(a, b):\n    return sorted(a + b)`,
          why: "sorts the concatenation instead of merging with two pointers" }],
  },
  "cp-inventory": {
    0: [{ code: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty`,
          why: "plain attribute — no guard against a negative quantity" }],
  },
  "cp-micro-framework": {
    2: [{ code: `def validate(schema, body):\n    return (True, [])`,
          why: "claims everything is valid without checking" }],
  },
};
/* applied at the very end — after the pushes / splices below add these lessons */

/* ---- 3. two extra lessons ------------------------------------------------ */

CURRICULUM.push({
  id: "match-statement",
  section: "More Python",
  title: "Structural pattern matching (match / case)",
  summary: "match / case: branch on the shape of data — literals, sequences, mappings, or-patterns, capture, and guards.",
  lead: "Python 3.10 added match. It's not a switch — it destructures. You match a value against patterns that can pull pieces out of lists and dicts in one step.",
  spiral: ["tuples & lists (L7)", "dicts (L8)", "if / elif chains (L5)", "unpacking a, *rest = xs (L7)", "comparison in guards (L3)"],
  card: `match value:
    case 0:            literal
    case 1 | 2 | 3:    or-pattern
    case [a, b, *rest] sequence + capture
    case {"key": v}:   mapping (subset)
    case n if n < 0:   guard
    case _:            wildcard (default)`,
  blocks: [
    { type: "html", html: `
      <h2>1 · Literal &amp; wildcard</h2>
      <p><code>match</code> tries each <code>case</code> top to bottom; the first that fits runs, then
      the whole block ends (no fall-through). <code>case _</code> is the catch-all — like
      <code>else</code>.</p>` },
    { type: "code", title: "The shape of it", code: `def describe(n):
    match n:
        case 0:
            return "zero"
        case 1:
            return "one"
        case _:
            return "many"

print(describe(0), describe(1), describe(7))` },
    { type: "html", html: `
      <h2>2 · Or-patterns and capture</h2>
      <p><code>case 200 | 201 | 204:</code> matches any of them. A bare name in a pattern
      <em>captures</em> — <code>case [x, y]:</code> binds <code>x</code> and <code>y</code> from a
      2-element sequence.</p>` },
    { type: "code", title: "Destructure a sequence", code: `def head_tail(seq):
    match seq:
        case []:
            return (None, [])
        case [first, *rest]:
            return (first, rest)

print(head_tail([1, 2, 3]))
print(head_tail([]))` },
    { type: "html", html: `
      <h2>3 · Mapping patterns &amp; guards</h2>
      <p><code>case {"type": "move", "dx": dx}:</code> matches any dict that <em>has at least</em>
      those keys, binding <code>dx</code>. Add <code>if</code> after a pattern for a
      <strong>guard</strong> — an extra condition that must also be true.</p>` },
    { type: "code", title: "Command parser", code: `def run(cmd):
    match cmd:
        case {"action": "wait"}:
            return "waiting"
        case {"action": "move", "steps": n} if n > 0:
            return f"move {n}"
        case {"action": "move"}:
            return "move (no steps?)"
        case _:
            return "unknown"

print(run({"action": "wait"}))
print(run({"action": "move", "steps": 3}))
print(run({"action": "move", "steps": 0}))` },
    { type: "html", html: whatif([
      "you put <code>case _:</code> <em>first</em> — do the later cases ever run?",
      "a mapping pattern lists two keys but the dict has three — does it still match?",
      "<code>case [a, b]:</code> against a list of three items — match or skip?",
      "a guard <code>case n if n > 0:</code> fails — does Python try the next case, or fall out?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>match subject:</code> then <code>case pattern:</code> — first match wins, no fall-through.</li>
        <li>Patterns: literals, <code>|</code> or-patterns, <code>[a, *rest]</code> sequences, <code>{"k": v}</code> mappings (subset match), <code>_</code> wildcard.</li>
        <li>A bare name <b>captures</b>; add <code>if cond</code> for a guard.</li>
        <li>Great for parsing structured data (ASTs, commands, JSON shapes); overkill for a simple <code>if</code>.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — match statement", url: "https://docs.python.org/3/reference/compound_stmts.html#the-match-statement" },
    { label: "PEP 636 — Structural Pattern Matching: Tutorial", url: "https://peps.python.org/pep-0636/" },
  ],
  exercises: [
    {
      title: "Traffic light",
      tier: "warm", uses: ["literal cases", "wildcard _", "return (L10)"],
      prompt: `<p>Define <code>action(colour)</code> with a <code>match</code>: <code>"red"</code> &rarr;
        <code>"stop"</code>, <code>"green"</code> &rarr; <code>"go"</code>, <code>"amber"</code> or
        <code>"yellow"</code> &rarr; <code>"slow"</code>, anything else &rarr; <code>"???"</code>.
        Use an or-pattern for the two amber names.</p>`,
      solution: `def action(colour):\n    match colour:\n        case "red":\n            return "stop"\n        case "green":\n            return "go"\n        case "amber" | "yellow":\n            return "slow"\n        case _:\n            return "???"`,
      success: "One or-pattern (`|`) covers both amber spellings.",
      mustDefine: ["action"],
      require: [{ pattern: "match\\s+colour", hard: true, message: "Use a match statement on colour." }],
      tests: [
        { append: `print(action("red"), action("green"), action("amber"), action("yellow"), action("blue"))`, expect: "stop go slow slow ???" },
      ],
    },
    {
      title: "Point on an axis",
      tier: "core", uses: ["sequence patterns", "capture names", "guards (L3)"],
      prompt: `<p>Define <code>where(pt)</code> where <code>pt</code> is a 2-tuple <code>(x, y)</code>.
        Match: <code>(0, 0)</code> &rarr; <code>"origin"</code>; <code>(x, 0)</code> &rarr;
        <code>"x-axis"</code>; <code>(0, y)</code> &rarr; <code>"y-axis"</code>; otherwise
        <code>"elsewhere"</code>.</p>`,
      solution: `def where(pt):\n    match pt:\n        case (0, 0):\n            return "origin"\n        case (_, 0):\n            return "x-axis"\n        case (0, _):\n            return "y-axis"\n        case _:\n            return "elsewhere"`,
      success: "Order matters — (0, 0) must come before the partial patterns.",
      mustDefine: ["where"],
      tests: [
        { append: `print(where((0,0)), where((5,0)), where((0,-2)), where((3,4)))`, expect: "origin x-axis y-axis elsewhere" },
      ],
    },
    {
      title: "Mini command parser",
      tier: "challenge", uses: ["mapping patterns", "guards", "sequence capture with *rest", "f-strings (L4)"],
      prompt: `<p>Define <code>parse(cmd)</code> where <code>cmd</code> is a list:
        <code>["go", "north"]</code> &rarr; <code>"go north"</code>;
        <code>["take", *items]</code> with at least one item &rarr;
        <code>"take: " + ", ".join(items)</code>; <code>["look"]</code> &rarr;
        <code>"looking around"</code>; anything else &rarr; <code>"?"</code>.</p>`,
      solution: `def parse(cmd):\n    match cmd:\n        case ["go", direction]:\n            return f"go {direction}"\n        case ["take", *items] if items:\n            return "take: " + ", ".join(items)\n        case ["look"]:\n            return "looking around"\n        case _:\n            return "?"`,
      success: "`*items` captures the rest; the guard `if items` rejects a bare ['take'].",
      mustDefine: ["parse"],
      tests: [
        { append: `print(parse(["go", "north"]))\nprint(parse(["take", "key", "map"]))\nprint(parse(["take"]))\nprint(parse(["look"]))\nprint(parse(["dance"]))`, expect: "go north\ntake: key, map\n?\nlooking around\n?" },
      ],
    },
    {
      title: "Shape area by dict",
      tier: "boss", uses: ["mapping patterns with capture", "guards", "math (L3)", "recall: dispatch on data"],
      prompt: `<p>Define <code>area(shape)</code>. <code>shape</code> is a dict:
        <code>{"kind": "circle", "r": R}</code> &rarr; <code>3 * R * R</code> (use 3 for pi);
        <code>{"kind": "rect", "w": W, "h": H}</code> &rarr; <code>W * H</code>;
        <code>{"kind": "square", "s": S}</code> &rarr; <code>S * S</code>;
        a negative dimension anywhere &rarr; raise <code>ValueError</code>;
        unknown kind &rarr; return <code>0</code>.</p>`,
      solution: `def area(shape):\n    match shape:\n        case {"kind": "circle", "r": r} if r < 0:\n            raise ValueError("negative")\n        case {"kind": "circle", "r": r}:\n            return 3 * r * r\n        case {"kind": "rect", "w": w, "h": h} if w < 0 or h < 0:\n            raise ValueError("negative")\n        case {"kind": "rect", "w": w, "h": h}:\n            return w * h\n        case {"kind": "square", "s": s} if s < 0:\n            raise ValueError("negative")\n        case {"kind": "square", "s": s}:\n            return s * s\n        case _:\n            return 0`,
      success: "Guards catch the bad-input cases before the normal ones.",
      mustDefine: ["area"],
      tests: [
        { append: `print(area({"kind":"circle","r":2}))\nprint(area({"kind":"rect","w":3,"h":4}))\nprint(area({"kind":"square","s":5}))\nprint(area({"kind":"blob"}))`, expect: "12\n12\n25\n0" },
        { append: `try:\n    area({"kind":"rect","w":-1,"h":4})\nexcept ValueError as e:\n    print("caught", e)`, expect: "caught negative" },
      ],
    },
  ],
});

CURRICULUM.push({
  id: "stdlib-tour",
  section: "More Python",
  title: "Standard library tour",
  summary: "Batteries included: datetime, json, csv, and collections — the modules you reach for almost every day.",
  lead: "Before adding a dependency, check the standard library. Dates, JSON, CSV, and specialised containers all ship with Python and run anywhere.",
  spiral: ["import (L19)", "dicts & lists (L7, L8)", "f-strings (L4)", "iterating (L6)", "tuples for records (L7)"],
  card: `import json, csv, io
from datetime import date, timedelta
from collections import Counter, defaultdict, deque

json.dumps(obj, sort_keys=True)   json.loads(s)
date.fromisoformat("2026-01-31")  d + timedelta(days=7)
Counter(words).most_common(3)
defaultdict(list)                 dd[k].append(v)
deque(maxlen=5)                   .append / .popleft`,
  blocks: [
    { type: "html", html: `
      <h2>1 · <code>datetime</code> — dates that do arithmetic</h2>
      <p><code>date</code> for calendar days, <code>timedelta</code> for spans. Subtract two dates and
      you get a <code>timedelta</code>; add a <code>timedelta</code> to a date and you get a date.</p>` },
    { type: "code", title: "Date math", code: `from datetime import date, timedelta

start = date.fromisoformat("2026-01-31")
later = start + timedelta(days=30)
print(later.isoformat())
print((later - start).days)
print(start.strftime("%A %d %B %Y"))` },
    { type: "html", html: `
      <h2>2 · <code>json</code> — text to objects and back</h2>
      <p><code>json.dumps(obj)</code> serialises a dict/list/str/number/bool/None to a string;
      <code>json.loads(s)</code> parses it back. <code>sort_keys=True</code> makes the output
      deterministic.</p>` },
    { type: "code", title: "Round-trip", code: `import json

data = {"name": "Ada", "langs": ["Python", "Ada"], "active": True}
text = json.dumps(data, sort_keys=True)
print(text)
back = json.loads(text)
print(back["langs"][0])` },
    { type: "html", html: `
      <h2>3 · <code>csv</code> — rows without regex pain</h2>
      <p><code>csv.DictReader</code> turns each row into a dict keyed by the header. Feed it any
      line-iterable — here an <code>io.StringIO</code> standing in for a file.</p>` },
    { type: "code", title: "Parse CSV text", code: `import csv, io

text = "name,score\\nAda,90\\nGrace,85\\nLinus,95"
rows = list(csv.DictReader(io.StringIO(text)))
print(rows[0])
print(sum(int(r["score"]) for r in rows))` },
    { type: "html", html: `
      <h2>4 · <code>collections</code> — better containers</h2>
      <table class="tbl">
        <tr><th>Type</th><th>For</th></tr>
        <tr><td><code>Counter(iterable)</code></td><td>tallying; <code>.most_common(n)</code></td></tr>
        <tr><td><code>defaultdict(list)</code></td><td>grouping — missing key auto-creates <code>[]</code></td></tr>
        <tr><td><code>deque(maxlen=n)</code></td><td>fast <code>append</code>/<code>popleft</code>; a sliding window</td></tr>
        <tr><td><code>namedtuple</code></td><td>a tiny record type with named fields</td></tr>
      </table>` },
    { type: "code", title: "Tally and group", code: `from collections import Counter, defaultdict

words = "red blue red green blue red".split()
print(Counter(words).most_common(2))

by_first = defaultdict(list)
for name in ["Ada", "Alan", "Bob", "Brenda"]:
    by_first[name[0]].append(name)
print(dict(by_first))` },
    { type: "html", html: whatif([
      "you <code>json.dumps</code> a dict whose value is a <code>set</code> — what happens?",
      "you read a <code>defaultdict(list)</code> key that was never written — does it raise <code>KeyError</code>?",
      "a <code>deque(maxlen=3)</code> already holds 3 items and you <code>append</code> a 4th — what falls off?",
    ]) },
    { type: "html", html: `
      <div class="tip"><b>Recap</b>
      <ul style="margin:6px 0 0">
        <li><code>datetime</code>: <code>date.fromisoformat</code> / <code>.isoformat()</code>, add/subtract <code>timedelta</code>.</li>
        <li><code>json.dumps</code> / <code>loads</code> — use <code>sort_keys=True</code> for stable output.</li>
        <li><code>csv.DictReader</code> over any line source; rows are dicts keyed by the header.</li>
        <li><code>Counter</code> to tally, <code>defaultdict</code> to group, <code>deque</code> for queues/windows.</li>
      </ul></div>` },
  ],
  refs: [
    { label: "Python docs — datetime", url: "https://docs.python.org/3/library/datetime.html" },
    { label: "Python docs — json", url: "https://docs.python.org/3/library/json.html" },
    { label: "Python docs — csv", url: "https://docs.python.org/3/library/csv.html" },
    { label: "Python docs — collections", url: "https://docs.python.org/3/library/collections.html" },
  ],
  exercises: [
    {
      title: "Stable JSON",
      tier: "warm", uses: ["json.dumps (L19 import)", "keyword args (L10)"],
      prompt: `<p>Define <code>to_json(d)</code> returning <code>json.dumps</code> of <code>d</code> with
        keys sorted, so the string is deterministic.</p>`,
      solution: `import json\n\ndef to_json(d):\n    return json.dumps(d, sort_keys=True)`,
      success: "sort_keys=True → the same dict always serialises identically.",
      mustDefine: ["to_json"],
      tests: [
        { append: `print(to_json({"b": 2, "a": 1}))`, expect: '{"a": 1, "b": 2}' },
      ],
    },
    {
      title: "Add days to a date",
      tier: "core", uses: ["date.fromisoformat", "timedelta", "isoformat"],
      prompt: `<p>Define <code>add_days(iso, n)</code>: parse the <code>"YYYY-MM-DD"</code> string, add
        <code>n</code> days, return the result as a <code>"YYYY-MM-DD"</code> string.</p>`,
      solution: `from datetime import date, timedelta\n\ndef add_days(iso, n):\n    return (date.fromisoformat(iso) + timedelta(days=n)).isoformat()`,
      success: "date + timedelta = date; .isoformat() prints it back.",
      mustDefine: ["add_days"],
      tests: [
        { append: `print(add_days("2026-01-31", 1))`, expect: "2026-02-01" },
        { append: `print(add_days("2026-03-01", -1))`, expect: "2026-02-28" },
      ],
    },
    {
      title: "Tally with Counter",
      tier: "core", uses: ["collections.Counter", "most_common", "list of tuples (L7)"],
      prompt: `<p>Define <code>top_words(text, n)</code>: split <code>text</code> on whitespace and return
        the <code>n</code> most common words as a list of <code>(word, count)</code> tuples, most
        frequent first.</p>`,
      solution: `from collections import Counter\n\ndef top_words(text, n):\n    return Counter(text.split()).most_common(n)`,
      success: "Counter(...).most_common(n) is the whole job.",
      mustDefine: ["top_words"],
      tests: [
        { append: `print(top_words("a b a c a b", 2))`, expect: "[('a', 3), ('b', 2)]" },
      ],
    },
    {
      title: "Sum a CSV column",
      tier: "challenge", uses: ["csv.DictReader", "io.StringIO", "generator expression (L26)", "int() (L9)"],
      prompt: `<p>Define <code>column_total(text, field)</code>: <code>text</code> is CSV with a header
        row; return the integer sum of the <code>field</code> column across all data rows.</p>`,
      solution: `import csv, io\n\ndef column_total(text, field):\n    rows = csv.DictReader(io.StringIO(text))\n    return sum(int(r[field]) for r in rows)`,
      success: "DictReader keys each row by the header; wrap the string in io.StringIO.",
      mustDefine: ["column_total"],
      tests: [
        { append: `t = "name,qty\\napple,3\\npear,5\\nplum,2"\nprint(column_total(t, "qty"))`, expect: "10" },
      ],
    },
    {
      title: "Group by key",
      tier: "boss", uses: ["collections.defaultdict", "loop (L6)", "sorting the output (L18)", "recall: dict grouping"],
      prompt: `<p>Define <code>group_by(pairs, keyfn)</code>: <code>pairs</code> is a list of values,
        <code>keyfn</code> maps a value to its group key. Return a plain <code>dict</code> of
        <code>key -&gt; list of values</code>, each list in original order, and the dict's keys
        inserted in <strong>sorted</strong> order.</p>`,
      solution: `from collections import defaultdict\n\ndef group_by(pairs, keyfn):\n    buckets = defaultdict(list)\n    for v in pairs:\n        buckets[keyfn(v)].append(v)\n    return {k: buckets[k] for k in sorted(buckets)}`,
      success: "defaultdict(list) removes the 'if key not in d' dance; rebuild sorted for stable key order.",
      mustDefine: ["group_by"],
      tests: [
        { append: `print(group_by(["ant","bee","ape","bat"], lambda s: s[0]))`, expect: "{'a': ['ant', 'ape'], 'b': ['bee', 'bat']}" },
        { append: `print(group_by([1,2,3,4,5,6], lambda n: n % 3))`, expect: "{0: [3, 6], 1: [1, 4], 2: [2, 5]}" },
      ],
    },
  ],
});

/* ---- 4. checkpoint projects (spliced in after a section) --------------- */

function insertCheckpointAfter(id, obj) {
  const i = CURRICULUM.findIndex((l) => l.id === id);
  obj.kind = "checkpoint";
  if (i >= 0) CURRICULUM.splice(i + 1, 0, obj);
  else CURRICULUM.push(obj);
}

insertCheckpointAfter("comments-annotations", {
  id: "cp-text-adventure",
  section: "Learn the basics",
  title: "Checkpoint — Text Adventure Engine",
  summary: "Put the fundamentals together: build the core of a room-to-room text adventure with dicts, functions, loops and error handling.",
  lead: "No new syntax — just everything from lessons 1–12 working together. You'll build four functions that together make a tiny explorable world.",
  brief: "A world is a dict of rooms. Each room is a dict: {\"desc\": str, \"exits\": {direction: room_name}}. The player starts in one room and walks around by naming a direction. Build it in four pieces; each exercise checks one piece against the next.",
  spiral: ["dicts of dicts (L8)", "functions & return (L10)", "for-loops over a list (L6)", "sorted() and join (L4, L7)", "raise / KeyError (L11)"],
  blocks: [
    { type: "html", html: `
      <div class="checkpoint-brief"><b>The project</b>
      You're building the engine for a text adventure. A <b>world</b> maps room names to rooms;
      a <b>room</b> is <code>{"desc": "...", "exits": {"north": "Hall", ...}}</code>. Four functions:
      <code>make_room</code>, <code>describe</code>, <code>move</code>, <code>play</code>.</div>
      <p>Everything you need you already learned. Take it one exercise at a time — later ones use the
      earlier ones' shape.</p>` },
  ],
  exercises: [
    {
      title: "Part 1 — build a room",
      tier: "project", uses: ["dict literal (L8)", "function params (L10)"],
      prompt: `<p>Define <code>make_room(desc, exits)</code> returning
        <code>{"desc": desc, "exits": exits}</code> — where <code>exits</code> is a dict mapping a
        direction string to a room-name string.</p>`,
      solution: `def make_room(desc, exits):\n    return {"desc": desc, "exits": exits}`,
      success: "A room is just a labelled dict.",
      mustDefine: ["make_room"],
      tests: [
        { append: `r = make_room("A cold hall.", {"north": "Library"})\nprint(r["desc"])\nprint(r["exits"]["north"])`, expect: "A cold hall.\nLibrary" },
      ],
    },
    {
      title: "Part 2 — describe a room",
      tier: "project", uses: ["f-strings (L4)", "sorted() (L7)", "str.join (L4)", "dict access (L8)"],
      prompt: `<p>Define <code>describe(world, name)</code> returning a two-line string:</p>
        <pre>&lt;the room's desc&gt;
Exits: north, south</pre>
        <p>The exits line lists the room's exit directions <strong>sorted alphabetically</strong>,
        comma-and-space separated. If there are no exits, the second line is <code>Exits: none</code>.</p>`,
      solution: `def describe(world, name):\n    room = world[name]\n    dirs = sorted(room["exits"])\n    line2 = "Exits: " + (", ".join(dirs) if dirs else "none")\n    return room["desc"] + "\\n" + line2`,
      success: "sorted() on a dict gives its keys in order; join glues them.",
      mustDefine: ["describe"],
      tests: [
        { append: `w = {"Hall": {"desc": "A hall.", "exits": {"south": "Yard", "north": "Attic"}}}\nprint(describe(w, "Hall"))`, expect: "A hall.\nExits: north, south" },
        { append: `w = {"Box": {"desc": "A sealed box.", "exits": {}}}\nprint(describe(w, "Box"))`, expect: "A sealed box.\nExits: none" },
      ],
    },
    {
      title: "Part 3 — move between rooms",
      tier: "project", uses: ["dict.get / in (L8)", "conditionals (L5)", "return values (L10)"],
      prompt: `<p>Define <code>move(world, current, direction)</code>: if <code>current</code>'s room has
        that <code>direction</code> in its exits, return the destination room name; otherwise return
        <code>current</code> unchanged (you can't walk through a wall).</p>`,
      solution: `def move(world, current, direction):\n    exits = world[current]["exits"]\n    if direction in exits:\n        return exits[direction]\n    return current`,
      success: "Guard the lookup — an unknown direction just leaves you put.",
      mustDefine: ["move"],
      tests: [
        { append: `w = {"A": {"desc": "", "exits": {"east": "B"}}, "B": {"desc": "", "exits": {"west": "A"}}}\nprint(move(w, "A", "east"))\nprint(move(w, "A", "north"))\nprint(move(w, "B", "west"))`, expect: "B\nA\nA" },
      ],
    },
    {
      title: "Part 4 — play a sequence",
      tier: "project", uses: ["for-loop over a list (L6)", "reuse move() (L10)", "accumulate state (L6)"],
      prompt: `<p>Define <code>play(world, start, directions)</code>: begin at <code>start</code>, apply
        each direction in the <code>directions</code> list in turn (using the same rule as
        <code>move</code>), and return the room name you end up in.</p>`,
      solution: `def move(world, current, direction):\n    exits = world[current]["exits"]\n    if direction in exits:\n        return exits[direction]\n    return current\n\ndef play(world, start, directions):\n    here = start\n    for d in directions:\n        here = move(world, here, d)\n    return here`,
      success: "A walk is just move() folded over a list of steps.",
      mustDefine: ["play"],
      tests: [
        { append: `w = {\n  "Hall": {"desc": "", "exits": {"north": "Attic", "east": "Kitchen"}},\n  "Attic": {"desc": "", "exits": {"south": "Hall"}},\n  "Kitchen": {"desc": "", "exits": {"west": "Hall"}},\n}\nprint(play(w, "Hall", ["north", "south", "east"]))\nprint(play(w, "Hall", ["north", "north"]))`, expect: "Kitchen\nAttic" },
      ],
    },
  ],
});

insertCheckpointAfter("sorting-algorithms", {
  id: "cp-data-toolkit",
  section: "Data Structures & Algorithms",
  title: "Checkpoint — Data Toolkit",
  summary: "Consolidate the DSA section: convert between Python lists and linked lists, merge sorted runs, and rank items by frequency.",
  lead: "Three self-contained utilities that lean on linked-list nodes, the merge step from merge sort, and dict counting.",
  brief: "Linked-list nodes are dicts {\"val\", \"next\"}, exactly as in the Arrays & Linked Lists lesson. Build three tools: list<->linked conversion, a sorted merge, and a frequency ranker.",
  spiral: ["linked-list dict nodes (L13)", "the merge step (L18)", "dict counting (L8, L14)", "sorted(key=...) (L18)", "tuples (L7)"],
  blocks: [
    { type: "html", html: `
      <div class="checkpoint-brief"><b>The project</b>
      A little toolkit. (1) <code>from_list</code> / <code>to_list</code> move between a Python list and
      a chain of <code>{"val", "next"}</code> nodes. (2) <code>merge_sorted</code> is the merge from
      merge sort. (3) <code>rank</code> counts and orders items by frequency.</div>` },
  ],
  exercises: [
    {
      title: "Part 1 — list → linked list",
      tier: "project", uses: ["dict nodes (L13)", "build from the end / iterate (L6)"],
      prompt: `<p>Define <code>from_list(xs)</code> building a linked list of
        <code>{"val": ..., "next": ...}</code> nodes from Python list <code>xs</code>, preserving
        order. Empty list &rarr; <code>None</code>.</p>`,
      solution: `def from_list(xs):\n    head = None\n    for v in reversed(xs):\n        head = {"val": v, "next": head}\n    return head`,
      success: "Build back-to-front so each new node points at the previous head.",
      mustDefine: ["from_list"],
      tests: [
        { append: `ll = from_list([1, 2, 3])\nprint(ll["val"], ll["next"]["val"], ll["next"]["next"]["val"], ll["next"]["next"]["next"])`, expect: "1 2 3 None" },
        { append: `print(from_list([]))`, expect: "None" },
      ],
    },
    {
      title: "Part 2 — linked list → list",
      tier: "project", uses: ["while-loop traversal (L13)", "list.append (L7)"],
      prompt: `<p>Define <code>to_list(node)</code> walking the chain from <code>node</code> and returning
        a Python list of the values. <code>None</code> &rarr; <code>[]</code>.</p>`,
      solution: `def to_list(node):\n    out = []\n    while node is not None:\n        out.append(node["val"])\n        node = node["next"]\n    return out`,
      success: "Standard traversal: read val, step to next, stop at None.",
      mustDefine: ["to_list"],
      tests: [
        { append: `n = {"val": 5, "next": {"val": 6, "next": {"val": 7, "next": None}}}\nprint(to_list(n))\nprint(to_list(None))`, expect: "[5, 6, 7]\n[]" },
      ],
    },
    {
      title: "Part 3 — merge two sorted lists",
      tier: "project", uses: ["two pointers (L13)", "the merge step (L18)", "while-loop (L6)"],
      prompt: `<p>Define <code>merge_sorted(a, b)</code>: given two already-sorted Python lists, return one
        sorted list containing all their items. Don't call <code>sorted()</code> on the combined
        list — walk both with indices.</p>`,
      solution: `def merge_sorted(a, b):\n    out = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    out.extend(a[i:])\n    out.extend(b[j:])\n    return out`,
      success: "Take the smaller head each step, then tack on whatever's left.",
      mustDefine: ["merge_sorted"],
      forbid: [{ pattern: "(?<![\\w])sorted\\s*\\(", hard: true, message: "Merge with two pointers — don't sort the combined list." }],
      tests: [
        { append: `print(merge_sorted([1, 4, 7], [2, 3, 8, 9]))`, expect: "[1, 2, 3, 4, 7, 8, 9]" },
        { append: `print(merge_sorted([], [1, 2]))\nprint(merge_sorted([5], []))`, expect: "[1, 2]\n[5]" },
      ],
    },
    {
      title: "Part 4 — rank by frequency",
      tier: "project", uses: ["dict counting (L8, L14)", "sorted with a key (L18)", "tie-breaking"],
      prompt: `<p>Define <code>rank(items)</code>: count occurrences, then return a list of
        <code>(item, count)</code> tuples ordered by <strong>count descending</strong>, and for equal
        counts by <strong>item ascending</strong>.</p>`,
      solution: `def rank(items):\n    counts = {}\n    for it in items:\n        counts[it] = counts.get(it, 0) + 1\n    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))`,
      success: "Sort key `(-count, item)` gives 'most first, ties alphabetical' in one pass.",
      mustDefine: ["rank"],
      tests: [
        { append: `print(rank(["b", "a", "b", "c", "a", "b"]))`, expect: "[('b', 3), ('a', 2), ('c', 1)]" },
        { append: `print(rank(["x", "y", "z"]))`, expect: "[('x', 1), ('y', 1), ('z', 1)]" },
      ],
    },
  ],
});

insertCheckpointAfter("encapsulation", {
  id: "cp-inventory",
  section: "Object-Oriented Programming",
  title: "Checkpoint — Inventory System",
  summary: "Bring the OOP section together: a validated Item class, a subclass, and an Inventory that manages them with proper errors.",
  lead: "Classes, a property with validation, a subclass with super(), and exceptions for the things that can go wrong.",
  brief: "An Item has a name and a quantity that can never go negative (enforced by a property). An Inventory holds items by name and supports add / remove / total, raising the right errors. A PerishableItem is an Item that also tracks days_left.",
  spiral: ["class & __init__ (L32)", "@property / setter (L33)", "inheritance & super() (L34)", "__private and validation (L35)", "raise ValueError / KeyError (L11)"],
  blocks: [
    { type: "html", html: `
      <div class="checkpoint-brief"><b>The project</b>
      Three classes. <code>Item</code> (name + guarded <code>qty</code>), <code>PerishableItem(Item)</code>
      (adds <code>days_left</code>), and <code>Inventory</code> (a name&rarr;Item store with
      <code>add</code> / <code>remove</code> / <code>total</code>).</div>` },
  ],
  exercises: [
    {
      title: "Part 1 — Item with a guarded quantity",
      tier: "project", uses: ["__init__ (L32)", "@property + @qty.setter (L33)", "raise ValueError (L11)"],
      prompt: `<p>Define <code>Item</code>: <code>__init__(self, name, qty=0)</code>. Expose <code>qty</code>
        as a <strong>property</strong> whose setter raises <code>ValueError("negative quantity")</code>
        if given a value below 0. Store the real value in <code>self._qty</code>.</p>`,
      solution: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty\n    @property\n    def qty(self):\n        return self._qty\n    @qty.setter\n    def qty(self, value):\n        if value < 0:\n            raise ValueError("negative quantity")\n        self._qty = value`,
      success: "Assigning in __init__ goes through the setter, so the guard also covers construction.",
      mustDefine: ["Item"],
      tests: [
        { append: `a = Item("bolt", 10)\nprint(a.name, a.qty)\na.qty = 4\nprint(a.qty)\ntry:\n    a.qty = -1\nexcept ValueError as e:\n    print("caught", e)`, expect: "bolt 10\n4\ncaught negative quantity" },
        { append: `try:\n    Item("bad", -5)\nexcept ValueError as e:\n    print(e)`, expect: "negative quantity" },
      ],
    },
    {
      title: "Part 2 — PerishableItem subclass",
      tier: "project", uses: ["subclassing (L34)", "super().__init__ (L34)", "extra attribute"],
      prompt: `<p><code>Item</code> (from Part 1) is already in the editor — build on it. Define
        <code>PerishableItem(Item)</code>: <code>__init__(self, name, qty=0, days_left=1)</code> that
        calls <code>super().__init__</code> for name/qty and stores <code>self.days_left</code>. Add
        <code>is_expired(self)</code> returning <code>True</code> when <code>days_left &lt;= 0</code>.</p>`,
      starter: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty\n    @property\n    def qty(self):\n        return self._qty\n    @qty.setter\n    def qty(self, value):\n        if value < 0:\n            raise ValueError("negative quantity")\n        self._qty = value\n\n\n# --- add PerishableItem below ---\n`,
      solution: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty\n    @property\n    def qty(self):\n        return self._qty\n    @qty.setter\n    def qty(self, value):\n        if value < 0:\n            raise ValueError("negative quantity")\n        self._qty = value\n\n\nclass PerishableItem(Item):\n    def __init__(self, name, qty=0, days_left=1):\n        super().__init__(name, qty)\n        self.days_left = days_left\n    def is_expired(self):\n        return self.days_left <= 0`,
      success: "super() reuses Item's setup — including the qty guard — then you add the new field.",
      mustDefine: ["PerishableItem"],
      tests: [
        { append: `m = PerishableItem("milk", 2, days_left=0)\nprint(m.name, m.qty, m.is_expired())\nfresh = PerishableItem("egg", 6, days_left=5)\nprint(fresh.is_expired())\ntry:\n    PerishableItem("x", -1)\nexcept ValueError as e:\n    print(e)`, expect: "milk 2 True\nFalse\nnegative quantity" },
      ],
    },
    {
      title: "Part 3 — the Inventory",
      tier: "project", uses: ["a dict of objects (L8, L32)", "raise KeyError / ValueError (L11)", "sum over values (L10)"],
      prompt: `<p><code>Item</code> is already in the editor. Define <code>Inventory</code> with an internal
        <code>dict</code> name&rarr;<code>Item</code>.
        <br><code>add(self, item)</code> — store it under <code>item.name</code> (overwrite is fine).
        <br><code>take(self, name, n)</code> — raise <code>KeyError</code> if <code>name</code> isn't
        stocked; raise <code>ValueError</code> if <code>n</code> exceeds that item's
        <code>qty</code>; otherwise decrease its <code>qty</code> by <code>n</code>.
        <br><code>total(self)</code> — sum of every item's <code>qty</code>.</p>`,
      starter: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty\n    @property\n    def qty(self):\n        return self._qty\n    @qty.setter\n    def qty(self, value):\n        if value < 0:\n            raise ValueError("negative quantity")\n        self._qty = value\n\n\n# --- add Inventory below ---\n`,
      solution: `class Item:\n    def __init__(self, name, qty=0):\n        self.name = name\n        self.qty = qty\n    @property\n    def qty(self):\n        return self._qty\n    @qty.setter\n    def qty(self, value):\n        if value < 0:\n            raise ValueError("negative quantity")\n        self._qty = value\n\n\nclass Inventory:\n    def __init__(self):\n        self._items = {}\n    def add(self, item):\n        self._items[item.name] = item\n    def take(self, name, n):\n        if name not in self._items:\n            raise KeyError(name)\n        item = self._items[name]\n        if n > item.qty:\n            raise ValueError("not enough " + name)\n        item.qty = item.qty - n\n    def total(self):\n        return sum(it.qty for it in self._items.values())`,
      success: "Let the Item's own setter keep quantities sane; the Inventory just orchestrates.",
      mustDefine: ["Inventory"],
      tests: [
        { append: `inv = Inventory()\ninv.add(Item("pen", 5))\ninv.add(Item("pad", 3))\ninv.take("pen", 2)\nprint(inv.total())\ntry:\n    inv.take("mug", 1)\nexcept KeyError as e:\n    print("no", e)\ntry:\n    inv.take("pad", 9)\nexcept ValueError as e:\n    print(e)`, expect: "6\nno 'mug'\nnot enough pad" },
      ],
    },
  ],
});

insertCheckpointAfter("tox", {
  id: "cp-tested-lib",
  section: "Testing",
  title: "Checkpoint — A Tested Mini-Library",
  summary: "Ship a small module the professional way: a documented function with working doctests, a unittest TestCase, and a quiet test runner.",
  lead: "You write the code, its docstring examples, and its unit tests — then run both kinds of test from Python.",
  brief: "Build stats(nums): a function returning {\"mean\", \"min\", \"max\"} with doctests in its docstring. Then a unittest TestCase for it. Then a runner that executes a TestCase and reports (ran, ok).",
  spiral: ["docstrings & doctest (L12, L54)", "unittest TestCase / assert* (L53)", "silencing the runner with io.StringIO (L53)", "dicts (L8)", "sum/len/min/max (L10)"],
  blocks: [
    { type: "html", html: `
      <div class="checkpoint-brief"><b>The project</b>
      <code>stats(nums)</code> &rarr; <code>{"mean": float, "min": n, "max": n}</code>, carrying its own
      <code>&gt;&gt;&gt;</code> examples. A <code>TestStats</code> case. A <code>run_suite</code> helper
      that runs a case quietly and returns <code>(tests_run, passed_bool)</code>.</div>` },
  ],
  exercises: [
    {
      title: "Part 1 — stats() with doctests",
      tier: "project", uses: ["docstring >>> examples (L54)", "mean via sum/len (L10)", "dict result (L8)"],
      prompt: `<p>Define <code>stats(nums)</code> returning
        <code>{"mean": sum/len as float, "min": min(nums), "max": max(nums)}</code>. Put <strong>two</strong>
        working examples in the docstring: <code>stats([1, 2, 3])</code> &rarr;
        <code>{'mean': 2.0, 'min': 1, 'max': 3}</code> and <code>stats([10])</code> &rarr;
        <code>{'mean': 10.0, 'min': 10, 'max': 10}</code>. The harness runs your doctests and expects
        0 failures.</p>`,
      solution: `def stats(nums):\n    """Summary stats for a non-empty list of numbers.\n\n    >>> stats([1, 2, 3])\n    {'mean': 2.0, 'min': 1, 'max': 3}\n    >>> stats([10])\n    {'mean': 10.0, 'min': 10, 'max': 10}\n    """\n    return {"mean": sum(nums) / len(nums), "min": min(nums), "max": max(nums)}`,
      success: "The docstring examples ARE tests — doctest re-runs them.",
      mustDefine: ["stats"],
      require: [{ pattern: ">>>\\s*stats", hard: true, message: "Add >>> stats(...) examples to the docstring." }],
      tests: [
        { append: `import doctest\nf = doctest.DocTestFinder()\nr = doctest.DocTestRunner(verbose=False)\nfor t in f.find(stats, "stats", globs={"stats": stats}):\n    r.run(t, out=lambda s: None)\nprint(r.tries, r.failures)`, expect: "2 0" },
      ],
    },
    {
      title: "Part 2 — TestStats",
      tier: "project", uses: ["unittest.TestCase (L53)", "assertEqual / assertAlmostEqual", "test_ methods"],
      prompt: `<p>A plain <code>stats</code> is already in the editor. Define
        <code>TestStats(unittest.TestCase)</code> with two tests: <code>test_basic</code> asserts
        <code>stats([2, 4, 6])["mean"] == 4.0</code>, and <code>test_bounds</code> asserts
        <code>min</code> is 2 and <code>max</code> is 6 for the same input.</p>`,
      starter: `import unittest\n\ndef stats(nums):\n    return {"mean": sum(nums) / len(nums), "min": min(nums), "max": max(nums)}\n\n\n# --- add TestStats below ---\n`,
      solution: `import unittest\n\ndef stats(nums):\n    return {"mean": sum(nums) / len(nums), "min": min(nums), "max": max(nums)}\n\nclass TestStats(unittest.TestCase):\n    def test_basic(self):\n        self.assertEqual(stats([2, 4, 6])["mean"], 4.0)\n    def test_bounds(self):\n        s = stats([2, 4, 6])\n        self.assertEqual(s["min"], 2)\n        self.assertEqual(s["max"], 6)`,
      success: "Two focused test_ methods, each checking one property.",
      mustDefine: ["TestStats"],
      tests: [
        { append: `import unittest, io\nr = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(\n    unittest.TestLoader().loadTestsFromTestCase(TestStats))\nprint(r.testsRun, r.wasSuccessful())`, expect: "2 True" },
      ],
    },
    {
      title: "Part 3 — a quiet runner",
      tier: "project", uses: ["TextTestRunner(stream=...) (L53)", "result object attributes", "tuple return (L7)"],
      prompt: `<p>Define <code>run_suite(case_cls)</code>: run every test in <code>case_cls</code> without
        printing the runner's report, and return <code>(tests_run, passed)</code> where
        <code>passed</code> is a bool.</p>`,
      solution: `import unittest, io\n\ndef run_suite(case_cls):\n    result = unittest.TextTestRunner(stream=io.StringIO(), verbosity=0).run(\n        unittest.TestLoader().loadTestsFromTestCase(case_cls))\n    return (result.testsRun, result.wasSuccessful())`,
      success: "stream=io.StringIO() swallows the report; the result object still has the numbers.",
      mustDefine: ["run_suite"],
      tests: [
        { append: `import unittest\nclass Demo(unittest.TestCase):\n    def test_a(self): self.assertTrue(True)\n    def test_b(self): self.assertEqual(1 + 1, 2)\nprint(run_suite(Demo))`, expect: "(2, True)" },
        { append: `import unittest\nclass Bad(unittest.TestCase):\n    def test_x(self): self.assertEqual(1, 2)\nprint(run_suite(Bad))`, expect: "(1, False)" },
      ],
    },
  ],
});

insertCheckpointAfter("fullstack-frameworks", {
  id: "cp-micro-framework",
  section: "Learn a Framework",
  title: "Checkpoint — Micro Web Framework",
  summary: "Assemble the framework ideas: a decorator router, a JSON response helper, request-body validation, and a middleware wrapper.",
  lead: "The pieces every web framework shares, in plain Python — no server, no dependencies.",
  brief: "An App registers (method, path) -> handler with a decorator and dispatches to them. json_response builds a response tuple. validate checks a body against a schema. with_prefix wraps a handler to tag its body.",
  spiral: ["decorators that register (L21, L59)", "dict routing table (L57)", "json.dumps (L-stdlib)", "isinstance validation (L59)", "closures / wrapping (L21, L58)"],
  blocks: [
    { type: "html", html: `
      <div class="checkpoint-brief"><b>The project</b>
      Four parts. <code>App</code> — <code>@app.route(method, path)</code> + <code>app.dispatch(...)</code>.
      <code>json_response(data, status=200)</code> — a <code>(status, body, headers)</code> tuple.
      <code>validate(schema, body)</code> — required keys + types. <code>with_prefix(tag, handler)</code>
      — a middleware that prepends <code>tag + ": "</code> to the handler's string body.</div>` },
  ],
  exercises: [
    {
      title: "Part 1 — the App router",
      tier: "project", uses: ["decorator with args (L21)", "store in self dict (L8)", "dispatch (L57)"],
      prompt: `<p>Define <code>App</code>. <code>__init__</code> sets <code>self.routes = {}</code>.
        <code>route(self, method, path)</code> is a decorator that registers the function under the
        key <code>(method, path)</code> and returns it unchanged. <code>dispatch(self, method, path)</code>
        calls the matching handler with no args and returns its result, or returns
        <code>(404, "not found")</code> if there's no route.</p>`,
      solution: `class App:\n    def __init__(self):\n        self.routes = {}\n    def route(self, method, path):\n        def deco(fn):\n            self.routes[(method, path)] = fn\n            return fn\n        return deco\n    def dispatch(self, method, path):\n        handler = self.routes.get((method, path))\n        if handler is None:\n            return (404, "not found")\n        return handler()`,
      success: "The decorator records; dispatch looks up and calls. That's a router.",
      mustDefine: ["App"],
      tests: [
        { append: `app = App()\n@app.route("GET", "/")\ndef home():\n    return (200, "home")\n@app.route("POST", "/save")\ndef save():\n    return (201, "saved")\nprint(app.dispatch("GET", "/"))\nprint(app.dispatch("POST", "/save"))\nprint(app.dispatch("GET", "/missing"))`, expect: "(200, 'home')\n(201, 'saved')\n(404, 'not found')" },
      ],
    },
    {
      title: "Part 2 — json_response",
      tier: "project", uses: ["json.dumps sort_keys (L-stdlib)", "default args (L10)", "tuple (L7)"],
      prompt: `<p>Define <code>json_response(data, status=200)</code> returning the 3-tuple
        <code>(status, json.dumps(data, sort_keys=True), {"Content-Type": "application/json"})</code>.</p>`,
      solution: `import json\n\ndef json_response(data, status=200):\n    return (status, json.dumps(data, sort_keys=True), {"Content-Type": "application/json"})`,
      success: "sort_keys=True keeps the body byte-stable — easier to test and cache.",
      mustDefine: ["json_response"],
      tests: [
        { append: `print(json_response({"b": 2, "a": 1}))`, expect: "(200, '{\"a\": 1, \"b\": 2}', {'Content-Type': 'application/json'})" },
        { append: `s, b, h = json_response({"ok": True}, status=201)\nprint(s, b)`, expect: "201 {\"ok\": true}" },
      ],
    },
    {
      title: "Part 3 — validate a body",
      tier: "project", uses: ["schema dict (L8)", "isinstance (L2)", "collect errors in order (L6)", "recall: L59"],
      prompt: `<p>Define <code>validate(schema, body)</code>. <code>schema</code> maps
        <code>field -&gt; type</code>. Return <code>(True, [])</code> if every field is present and of
        the right type; else <code>(False, errors)</code> with <code>"missing: X"</code> or
        <code>"bad type: X"</code> messages, in <code>schema</code> order.</p>`,
      solution: `def validate(schema, body):\n    errors = []\n    for field, typ in schema.items():\n        if field not in body:\n            errors.append("missing: " + field)\n        elif not isinstance(body[field], typ):\n            errors.append("bad type: " + field)\n    return (len(errors) == 0, errors)`,
      success: "This is the check behind an automatic 422 response.",
      mustDefine: ["validate"],
      tests: [
        { append: `s = {"name": str, "age": int}\nprint(validate(s, {"name": "Ada", "age": 36}))\nprint(validate(s, {"age": "x"}))`, expect: "(True, [])\n(False, ['missing: name', 'bad type: age'])" },
      ],
    },
    {
      title: "Part 4 — a middleware wrapper",
      tier: "project", uses: ["closures (L21)", "call the inner handler (L58)", "tuple unpack (L7)"],
      prompt: `<p>Define <code>with_prefix(tag, handler)</code>: return a new zero-arg function that calls
        <code>handler()</code> (which returns <code>(status, body)</code> with a string body) and
        returns <code>(status, tag + ": " + body)</code>.</p>`,
      solution: `def with_prefix(tag, handler):\n    def wrapped():\n        status, body = handler()\n        return (status, tag + ": " + body)\n    return wrapped`,
      success: "Middleware = a function that wraps a handler and adjusts what goes in or comes out.",
      mustDefine: ["with_prefix"],
      tests: [
        { append: `def h():\n    return (200, "pong")\nwrapped = with_prefix("v1", h)\nprint(wrapped())`, expect: "(200, 'v1: pong')" },
      ],
    },
  ],
});

/* attach cheat-cards / real-world panels / antisolutions to lessons added above */
CURRICULUM.forEach((l) => {
  if (CARDS[l.id] && !l.card) l.card = CARDS[l.id];
  if (REALWORLD[l.id] && !l.realworld) l.realworld = REALWORLD[l.id];
  const m = ANTISOLUTIONS[l.id];
  if (m) Object.keys(m).forEach((k) => { if (l.exercises[k]) l.exercises[k].antisolutions = m[k]; });
});

/* expose for app.js */
window.CURRICULUM = CURRICULUM;
