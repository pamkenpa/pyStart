<<<<<<< HEAD
# PyStart — an interactive Python basics course

A self-contained web app that teaches the fundamentals of Python. Every lesson has
diagrams, editable examples you can run, and auto-graded exercises. Python executes
**in your browser** (Pyodide / WebAssembly) — no Python-in-the-page setup, no accounts,
and after the first load, **no internet needed** (Pyodide is bundled locally).

## Run it

Double-click **`start.bat`** (Windows). It serves this folder on
`http://localhost:8123` and opens your browser.

Or from a terminal, in this folder:

```bash
python -m http.server 8123
```

then open <http://localhost:8123>.

> A local server is required. Opening `index.html` directly as a `file://` page
> will not work — browsers block module Web Workers and local file loads from `file://`.

## What it covers (in order)

The sidebar unlocks each lesson only when the previous one's exercises are all passed,
so you are never shown an exercise about something you haven't learned yet.

1. **Basic syntax** — statements, `print()`, strings, the `#` comment
2. **Variables & data types** — `=`, `int` / `float` / `str` / `bool`, `type()`
3. **Operators** — arithmetic, `//` `%` `**`, comparisons, `and` / `or` / `not`, `+=`
4. **Working with strings** — indexing, slicing, methods, `f"..."`
5. **Conditionals** — `if` / `elif` / `else`, indentation, truthiness
6. **Loops** — `for`, `range()`, `while`, `break` / `continue`, accumulators
7. **Lists, tuples, sets** — mutable vs immutable vs unique
8. **Dictionaries** — key → value, `.get()`, `.items()`, counting
9. **Type casting** — `int()` / `float()` / `str()` / `bool()`, reading `input()`
10. **Functions & built-in functions** — `def`, `return`, params/defaults, `len/sum/max/...`
11. **Exceptions** — `try` / `except` / `else` / `finally`, `raise`
12. **Comments & type annotations** — docstrings, `# why not what`, `x: int`, `-> str | None`

Each lesson now teaches in small numbered steps with "predict first" checks, and ends with
**8–11 exercises on a difficulty ramp**: `warm-up → practice → challenge → boss`
(122 exercises total). Most exercises are **cumulative** — a badge lists which earlier lessons
they recall (e.g. *recalls: split() (L4) · loop (L6) · % (L3)*), and a "keep these fresh" box at
the top of the exercise section names the prior ideas you'll lean on.

Exercises are deliberately **hands-off**: the editor starts **empty** and there are no hints.
"Check answer" only reports pass/fail. Write it yourself, run it, read the errors, experiment in
the **Playground IDE** (sidebar button). A collapsible **"Show a worked solution"** sits at the
bottom of each exercise for when you're truly stuck.

The editor has **VS Code-style autocomplete**: as you type an identifier it suggests Python
keywords, built-in functions, names already in your code, and (after a `.`) common methods.
Arrow keys to move, <kbd>Tab</kbd> or <kbd>Enter</kbd> to accept, <kbd>Esc</kbd> to dismiss.
It also **auto-closes** brackets and quotes.

**Grading is encouraging, not gatekeeping.** If your code produces the right result for the
task, it passes — full stop. Then, if it only happened to work for the sample values, skipped
the intended technique, or could be more idiomatic, a **"It works — now level it up ↗"** note
appears alongside the ✓ with specific guidance (many exercises quietly re-run your code with
different inputs to spot this). The only hard requirements are ones that *are* the task —
e.g. "add a docstring" in the annotations lesson.

## How it works

| File | Role |
| --- | --- |
| `index.html` | shell / layout |
| `assets/styles.css` | all styling (light + dark, follows your OS; toggle in the sidebar) |
| `assets/curriculum.js` | every lesson, illustration, and exercise + its automated tests |
| `assets/app.js` | UI, editor, router, progress tracking, exercise grading |
| `assets/py-worker.js` | runs Pyodide in a Web Worker (so an infinite loop can't freeze the tab) |
| `assets/pyodide/` | the bundled Python-on-WASM runtime (~13 MB) |

- **Progress** is saved in your browser's `localStorage`. "↺ Reset" in the sidebar clears it.
- **Runaway code**: a program that runs longer than ~10 seconds is stopped automatically.
- **`input()`**: when code you run calls `input()`, a box asks you to type the
  responses first, one per line.

## Sources

Lesson material is adapted from reputable, freely available references:

- Harvard **CS50's Introduction to Programming with Python** — <https://cs50.harvard.edu/python/>
  (lecture notes linked per-lesson)
- The **official Python Tutorial** — <https://docs.python.org/3/tutorial/>
- **Python Standard Library** docs (built-in functions, string methods, exceptions)
- **PEP 8** (style / comments) and **PEP 484** (type hints)
- **Real Python** deep-dive articles (linked per-lesson)

Each lesson ends with a "Go deeper" box linking the specific pages it draws on.

## Ideas you might add later

- A cumulative "checkpoint" project every few lessons (e.g. a tiny quiz game after loops).
- More lessons: modules & `import`, file reading, list/dict comprehensions, `class` basics.
- A "reference card" page summarising syntax learned so far.
- Export/import progress as a file.
=======
# pyStart
python learning app
>>>>>>> ad06d55abe9c8da63ee66a0601d71c830c85effb
