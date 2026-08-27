# PyStart — an interactive Python course

A self-contained web app that teaches Python from `print("hello")` all the way to
writing a FastAPI dependency injector — **61 lessons in 14 sections**, plus **5 checkpoint
projects** that make you combine what you've learned. Every lesson has diagrams, editable
examples you can run, "what if?" experiments, and auto-graded exercises on a difficulty
ramp (**406 exercises total**). Python executes **in your browser** (Pyodide / WebAssembly)
— no setup, no accounts, and after the first load, **no internet needed** (Pyodide is
bundled).

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

## What it covers

The sidebar unlocks each lesson only when the previous one's exercises are all passed,
so you are never shown an exercise about something you haven't learned yet. Exercises
are **cumulative** — a badge lists which earlier lessons each one leans on, and a "keep
these fresh" box at the top of every exercise set names the prior ideas you'll reuse.

### Learn the basics (1–12)

1. **Basic syntax** — statements, `print()`, strings, escapes, the `#` comment
2. **Variables & data types** — `=`, `int` / `float` / `str` / `bool`, `type()`
3. **Operators** — arithmetic, `//` `%` `**`, comparisons, `and` / `or` / `not`, `+=`
4. **Working with strings** — indexing, slicing, methods, `f"..."`
5. **Conditionals** — `if` / `elif` / `else`, indentation, truthiness
6. **Loops** — `for`, `range()`, `while`, `break` / `continue`, accumulators, nested loops
7. **Lists, tuples, sets** — mutable vs immutable vs unique
8. **Dictionaries** — key → value, `.get()`, `.items()`, counting
9. **Type casting** — `int()` / `float()` / `str()` / `bool()`, reading `input()`
10. **Functions & built-in functions** — `def`, `return`, params/defaults, `len/sum/max/...`
11. **Exceptions** — `try` / `except` / `else` / `finally`, `raise`
12. **Comments & type annotations** — docstrings, `# why not what`, `x: int`, `-> str | None`

### Data Structures & Algorithms (13–18)

13. **Arrays and Linked Lists** — contiguous vs pointer-chained; traversal, prepend, reverse, two-pointer middle
14. **HashMaps** — hashing a key to a bucket, collisions/chaining, a mini hashmap, two-sum, group anagrams
15. **Heaps, Stacks and Queues** — LIFO / FIFO / always-smallest; balanced brackets, RPN, a min-heap + heapsort from scratch
16. **Binary Search Tree** — the ordering rule; iterative search / insert / min / max, in-order with a stack, range-sum pruning
17. **Recursion** — base + recursive case, the call stack, list/tree recursion, memoised Fibonacci, flatten nested lists
18. **Sorting Algorithms** — bubble / selection / insertion (O(n²)), merge & quicksort (O(n log n)), Dutch-flag one-pass sort

The DSA lessons use plain `dict` nodes (`{"val", "next"}`, `{"val", "left", "right"}`)
to show structure without needing classes yet.

### Modules (19–24)

19. **Modules (Built-in & Custom)** — `import`, `from … import`, `__name__`, `sys.path`, packages
20. **Lambdas** — anonymous functions, `key=` for `sorted` / `min` / `max`, when *not* to use one
21. **Decorators** — functions wrapping functions, `@wraps`, decorators with arguments
22. **Iterators** — the iterator protocol, `__iter__` / `__next__`, `iter()` / `next()`, `StopIteration`
23. **Regular Expressions** — `re.match` / `search` / `findall` / `sub`, groups, character classes
24. **Variable Scope** — LEGB, `global` / `nonlocal`, closures, late binding

### Package Managers & Idioms (25–31)

25. **List Comprehensions** — `[f(x) for x in it if cond]`, nested, dict/set comprehensions
26. **Generator Expressions** — lazy `(…)`, `yield`, memory vs eagerness, infinite streams
27. **Context Manager** — `with`, `__enter__` / `__exit__`, `contextlib.contextmanager`
28. **Package Managers** — PyPI, pip, virtual environments, Conda, uv, Poetry, pdm; lockfiles
29. **Common Packages** — requests, numpy, pandas, pytest, rich, … and how to read their docs
30. **pyproject.toml / Configuration** — `[project]`, dependencies, entry points, tool tables
31. **Paradigms** — imperative / OO / functional in Python, pure functions, `map` / `filter` / `reduce`

### Object-Oriented Programming (32–35)

32. **Classes** — `class`, `__init__`, instances, attributes, `__repr__`
33. **Methods** — instance / `@classmethod` / `@staticmethod`, `self`, `@property`
34. **Inheritance** — subclassing, `super()`, MRO, overriding, composition vs inheritance
35. **Encapsulation** — `_protected` / `__private` name-mangling, properties as guards, dataclasses

### Environments (36–38)

36. **virtualenv** — what an env really is, `python -m venv`, activate, `pip freeze`
37. **Pipenv** — `Pipfile` / `Pipfile.lock`, `pipenv install`, deterministic builds
38. **pyenv** — installing and switching between Python *versions*, `pyenv local`

### File Handling (39)

39. **File Handling (incl. glob)** — `open` modes, `with`, read/write/append, `pathlib`, `glob`

### Concurrency (40–43)

40. **The GIL** — why one interpreter lock, what it does and doesn't protect, CPU- vs I/O-bound
41. **Threading** — `threading.Thread`, locks, when threads help (I/O), `ThreadPoolExecutor`
42. **Multiprocessing** — real parallelism, `Process` / `Pool`, pickling, `ProcessPoolExecutor`
43. **Asynchrony** — `async` / `await`, the event loop, `asyncio.run` / `gather`, tasks

### Static Typing (44–48)

44. **typing** — `list[int]`, `Optional`, `Union` / `|`, `Callable`, `TypedDict`, generics, `Protocol`
45. **mypy** — running the checker, common errors, `# type: ignore`, strictness settings
46. **pyright** — the fast checker behind Pylance, basic vs strict, inline config
47. **pyre** — Meta's checker, `.pyre_configuration`, taint analysis (Pysa) in one breath
48. **Pydantic** — models that validate at runtime, coercion, `ValidationError`, settings

### Code Formatting (49–51)

49. **black** — the uncompromising formatter, why "no options" is a feature, diff-only checks
50. **yapf** — the configurable alternative, knobs and styles, when configurability helps
51. **ruff** — the fast linter + formatter, rule selection, autofix, replacing several tools

### Documentation (52)

52. **Sphinx** — reStructuredText, `conf.py`, `autodoc` + `napoleon`, `toctree`, Read the Docs

### Testing (53–56)

53. **unittest / PyUnit** — `TestCase`, `assert*` methods, `setUp` / `tearDown`, the runner
54. **doctest** — tests that live in docstrings, exact-match output, `DocTestRunner`
55. **pytest** — plain `assert`, fixtures as arguments, `parametrize`, a mini collector by hand
56. **tox** — a fresh env per target, `envlist` matrix, `[testenv]` templates, local mini-CI

### Learn a Framework (57–59)

57. **Synchronous frameworks — Pyramid, Plotly Dash** — WSGI, routing as a dict, view callables, Dash's reactive callbacks
58. **Asynchronous frameworks — gevent, Tornado, Sanic, aiohttp** — ASGI, `async` handlers, `gather`, middleware chains, offloading CPU work
59. **Sync + Async frameworks — FastAPI, Django, Flask** — decorator routing, annotation-driven coercion, request-body validation, `Depends` dependency injection

### More Python (60–61)

60. **Structural pattern matching (match / case)** — literal / sequence / mapping patterns, or-patterns, capture, guards
61. **Standard library tour** — `datetime`, `json`, `csv`, `collections` (`Counter` / `defaultdict` / `deque`)

### Checkpoint projects

Five bigger builds are spliced in after a section, combining everything up to that point.
They don't take a lesson number; the sidebar marks them with a ◆.

- **Text Adventure Engine** (after the basics) — rooms as dicts, `describe` / `move` / `play`
- **Data Toolkit** (after DS&A) — list ↔ linked-list, a sorted merge, a frequency ranker
- **Inventory System** (after OOP) — a validated `Item` property, a subclass, an `Inventory` with proper errors
- **A Tested Mini-Library** (after Testing) — a documented function with doctests, a `unittest` case, a quiet runner
- **Micro Web Framework** (after Frameworks) — a decorator router, a JSON response helper, body validation, a middleware wrapper

> **A note on the later sections.** Lessons about tools that need a shell, a network,
> or multiple OS processes (pip, mypy, black, tox, real servers, `multiprocessing`,
> gevent…) teach the concept in the browser and then drill the *underlying Python* —
> parsing a `pyproject.toml` with `tomllib`, hand-rolling a test collector, building a
> route table, resolving a dependency tree. `unittest`, `doctest`, `asyncio`, `re`,
> `pathlib`, `glob`, `datetime`, `json`, `csv`, `collections` and friends are in Pyodide
> and run for real. Those concept lessons carry a **"Try this for real"** panel with the
> exact shell commands to run the tool outside the sandbox.

Every lesson teaches in small numbered steps with **"predict first"** checks and
**"what if?"** experiments, and ends with **exercises on a difficulty ramp**:
`warm-up → practice → challenge → boss` (checkpoints use `Part 1 → Part 2 → …`).

## How exercises are graded

**Grading is encouraging, not gatekeeping.** If your code produces the right result for
the task, it passes — full stop. Then, if it only happened to work for the sample
values, skipped the intended technique, or could be more idiomatic, a
**"It works — now level it up ↗"** note appears alongside the ✓ with specific guidance
(many exercises quietly re-run your code with different inputs to catch this). The only
hard requirements are ones that *are* the task — e.g. "add a docstring" in the
annotations lesson, or "use `asyncio.gather`" in the async lesson.

Exercises are deliberately **hands-off**: the editor starts **empty** and there are no
hints. "Check answer" only reports pass/fail. Write it yourself, run it, read the
errors, experiment in the **Playground IDE** (sidebar button). A collapsible
**"Show a worked solution"** sits at the bottom of each exercise for when you're stuck.

The editor has **VS Code-style autocomplete**: as you type it suggests Python keywords,
built-in functions, names already in your code, and (after a `.`) common methods. Arrow
keys to move, <kbd>Tab</kbd> or <kbd>Enter</kbd> to accept, <kbd>Esc</kbd> to dismiss.
It also **auto-closes** brackets and quotes and dedents a full level on <kbd>Backspace</kbd>.
When a program raises a common error (`NameError`, `IndentationError`, `KeyError`,
`TypeError`…), a one-line **plain-language hint** appears under the traceback.

## Study tools (sidebar)

- **🔁 Review** — a reshuffled set of exercises you've already passed, drawn from anywhere
  in the course. Pick a size and (optionally) a section; hit *New set* for a fresh draw.
  Nothing here changes your progress — it's spaced practice to keep older skills sharp.
- **📇 Reference** — a syntax cheat-sheet that grows as you unlock lessons. Only shows
  what you've been taught.
- **⇩ Export / ⇧ Import** — save your progress to a `pystart-progress.json` file and load
  it back on another machine or browser.
- **◑ Theme** — light / dark (follows your OS by default).

### Maintainer note — grader self-test

`await window.__pystart.selfTest()` in the browser console re-grades every reference
solution (must pass) and every `antisolutions` entry in `curriculum.js` (must fail),
so the auto-grader can't silently rot as content changes. `selfTest({only: "lesson-id"})`
scopes it to one lesson.

## How it works

| File | Role |
| --- | --- |
| `index.html` | shell / layout |
| `assets/styles.css` | all styling (light + dark, follows your OS; toggle in the sidebar) |
| `assets/curriculum.js` | every lesson, illustration, and exercise + its automated tests |
| `assets/app.js` | UI, editor, router, progress tracking, exercise grading |
| `assets/py-worker.js` | runs Pyodide in a Web Worker (so an infinite loop can't freeze the tab) |
| `assets/pyodide/` | the bundled Python-on-WASM runtime (~13 MB) |

- **Progress** is saved in your browser's `localStorage` — "↺ Reset" clears it, and
  "⇩ Export" / "⇧ Import" move it between machines as a JSON file.
- **Runaway code**: a program that runs longer than ~10 seconds is stopped automatically.
- **`input()`**: when code you run calls `input()`, a box asks you to type the
  responses first, one per line.
- **Layout** is responsive (single-column under 860 px, tighter under 560 px) and honours
  `prefers-reduced-motion`.

## Sources

Lesson material is adapted from reputable, freely available references:

- Harvard **CS50's Introduction to Programming with Python** — <https://cs50.harvard.edu/python/>
- The **official Python Tutorial** and **Standard Library** docs — <https://docs.python.org/3/>
- **PEP 8**, **PEP 484**, **PEP 3333** (WSGI), **PEP 257** (docstrings), **PEP 621** (`pyproject`)
- Tool docs: **pytest**, **mypy**, **pyright**, **Pydantic**, **black**, **ruff**, **tox**,
  **Sphinx**, **FastAPI**, **Flask**, **Django**, **Pyramid**, **aiohttp**, **Sanic**, **Tornado**
- **Real Python** deep-dive articles (linked per-lesson)

Each lesson ends with a "Go deeper" box linking the specific pages it draws on.
