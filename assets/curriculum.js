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
      prompt: `<p>Print this line using <strong>four comma-separated values</strong> in one <code>print</code>
        (three words and the number):</p><pre>Level up 9000</pre>`,
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
      tier: "core", uses: ["strings (L1)", "\\n escape (L1)"],
      prompt: `<p>Given <code>label = "CPU temp"</code> and <code>celsius = 63</code>, print exactly
        (real newline between the lines):</p><pre>CPU temp\n63 C</pre>`,
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
      tier: "core", uses: ["% operator (this lesson)"],
      prompt: `<p>A pizza has <code>8</code> slices and <code>3</code> friends share equally.
        Print how many slices are <strong>left over</strong>.</p><pre>2</pre>`,
      solution: `print(8 % 3)`,
      success: "% is the remainder — the classic use of modulo.",
      tests: [{ expect: "2" }],
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
      prompt: `<p>Given <code>n = 47</code>, print a single <code>True</code>/<code>False</code>: is
        <code>n</code> between <code>1</code> and <code>100</code> inclusive? Use one chained comparison.</p><pre>True</pre>`,
      starter: `n = 47\n`,
      solution: `n = 47\nprint(1 <= n <= 100)`,
      success: "0 <= n <= 100 reads like maths and works like it.",
      review: [{ pattern: "and", tip: `<code>1 &lt;= n and n &lt;= 100</code> works, but Python lets you chain: <code>1 &lt;= n &lt;= 100</code>.` }],
      tests: [{ expect: "True" }],
    },
    {
      title: "Use +=",
      tier: "core", uses: ["variables & reassigning (L2)"],
      prompt: `<p>Start from <code>score = 8</code>. Using <code>+=</code>, add <code>4</code>, then
        <code>*=</code> by <code>2</code>, then print <code>score</code>.</p><pre>24</pre>`,
      starter: `score = 8\n`,
      solution: `score = 8\nscore += 4\nscore *= 2\nprint(score)`,
      success: "The augmented operators all follow the same shape.",
      require: [{ pattern: "\\+=", tip: `If you wrote it out longhand: correct. <code>score += 4</code> / <code>score *= 2</code> is the shorthand you'll see everywhere.` }],
      tests: [{ expect: "24" }],
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
        { advisory: true, rewrite: [["n\\s*=\\s*-?\\d+", "n = 7"]], expect: "False", why: `Should be <code>False</code> for an odd <code>n</code> like 7 — <code>n % 2 == 0</code> handles any number.` },
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
        { advisory: true, rewrite: [["seconds\\s*=\\s*\\d+", "seconds = 90"]], expect: "0 1 30", why: `Should also work for <code>seconds = 90</code> → <code>0 1 30</code>.` },
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
        { advisory: true, rewrite: [["accompanied\\s*=\\s*True", "accompanied = False"]], expect: "False",
          why: `A 15-year-old who is a member but not accompanied should get <code>False</code> — check your and/or grouping with parentheses.` },
        { advisory: true, rewrite: [["is_member\\s*=\\s*True", "is_member = False"]], expect: "False",
          why: `Not a member → <code>False</code> no matter what else is true.` },
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
        { advisory: true, rewrite: [["mark\\s*=\\s*-?\\d+", "mark = 49"]], expect: "fail", why: `49 should <code>fail</code>.` },
        { advisory: true, rewrite: [["mark\\s*=\\s*-?\\d+", "mark = 50"]], expect: "pass", why: `Exactly 50 passes — use <code>&gt;= 50</code>.` },
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
        { advisory: true, rewrite: [["n\\s*=\\s*-?\\d+", "n = 9"]], expect: "positive", why: `9 is positive.` },
        { advisory: true, rewrite: [["n\\s*=\\s*-?\\d+", "n = 0"]], expect: "zero", why: `0 is neither positive nor negative.` },
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
        { advisory: true, rewrite: [["age\\s*=\\s*-?\\d+", "age = 15"]], expect: "minor",
          why: `Works here — but with <code>age = 15</code> it should print <code>minor</code>. Make sure both branches are covered.` },
        { advisory: true, rewrite: [["age\\s*=\\s*-?\\d+", "age = 18"]], expect: "adult",
          why: `18 itself counts as an adult. The clean way to include the boundary is <code>age &gt;= 18</code>.` },
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
        { advisory: true, rewrite: [["b\\s*=\\s*\\d+", "b = 20"]], expect: "20", why: `Should print <code>b</code> when it's the larger.` },
      ],
      review: [{ pattern: "max\\(", tip: `You'll meet <code>max(a, b)</code> in Lesson 10 — for now the if/else is the point.` }],
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
        { advisory: true, rewrite: [["score\\s*=\\s*-?\\d+", "score = 95"]], expect: "A",
          why: `With <code>score = 95</code> this should print <code>A</code>.` },
        { advisory: true, rewrite: [["score\\s*=\\s*-?\\d+", "score = 80"]], expect: "B",
          why: `A score of exactly 80 is a <code>B</code>. Include the boundary with <code>score &gt;= 80</code> (not <code>&gt; 80</code>).` },
        { advisory: true, rewrite: [["score\\s*=\\s*-?\\d+", "score = 70"]], expect: "C",
          why: `70 is the bottom of the C band — use <code>&gt;= 70</code>.` },
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
        { advisory: true, rewrite: [["temp\\s*=\\s*-?\\d+", "temp = 8"]], expect: "above freezing",
          why: `At <code>temp = 8</code> it should say <code>above freezing</code>.` },
        { advisory: true, rewrite: [["temp\\s*=\\s*-?\\d+", "temp = 0"]], expect: "freezing",
          why: `Exactly 0 counts as freezing — <code>temp &lt;= 0</code> covers it.` },
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
        { advisory: true, rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 9"]], expect: "not afternoon",
          why: `9am isn't the afternoon.` },
        { advisory: true, rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 18"]], expect: "not afternoon",
          why: `"up to but not including 18" means 18:00 is NOT afternoon — <code>12 &lt;= hour &lt; 18</code> handles both edges at once.` },
        { advisory: true, rewrite: [["hour\\s*=\\s*-?\\d+", "hour = 12"]], expect: "afternoon",
          why: `12:00 counts — the range starts at 12.` },
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
        { advisory: true, rewrite: [["n\\s*=\\s*\\d+", "n = 9"]], expect: "Fizz", why: `9 → <code>Fizz</code>.` },
        { advisory: true, rewrite: [["n\\s*=\\s*\\d+", "n = 20"]], expect: "Buzz", why: `20 → <code>Buzz</code>.` },
        { advisory: true, rewrite: [["n\\s*=\\s*\\d+", "n = 7"]], expect: "7", why: `7 → the number itself.` },
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
        { advisory: true, rewrite: [["age\\s*=\\s*\\d+", "age = 10"]], expect: "5", why: `Under 13 → 5.` },
        { advisory: true, rewrite: [["age\\s*=\\s*\\d+", "age = 30"]], expect: "12", why: `In between → 12.` },
        { advisory: true, rewrite: [["age\\s*=\\s*\\d+", "age = 65"]], expect: "8", why: `Exactly 65 → 8 (use <code>&gt;= 65</code>).` },
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
        { advisory: true, rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = -5.0"]], expect: "ice", why: `Below 0 → ice.` },
        { advisory: true, rewrite: [["c\\s*=\\s*-?[\\d.]+", "c = 100.0"]], expect: "steam", why: `Exactly 100 → steam.` },
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
        { advisory: true, rewrite: [['p2\\s*=\\s*"scissors"', 'p2 = "paper"']], expect: "p2",
          why: `rock vs paper → player 2 wins → <code>p2</code>.` },
        { advisory: true, rewrite: [['p2\\s*=\\s*"scissors"', 'p2 = "rock"']], expect: "tie",
          why: `Same choice → <code>tie</code> (check that first).` },
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

];

/* expose for app.js */
window.CURRICULUM = CURRICULUM;
