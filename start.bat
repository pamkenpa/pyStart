@echo off
REM ============================================================
REM  PyStart - launch the local learning app
REM  Serves this folder on http://localhost:8123 and opens it.
REM  (A server is required: the app uses a module Web Worker and
REM   loads local files, which browsers block from file:// URLs.)
REM ============================================================
cd /d "%~dp0"

set PORT=8123
echo.
echo   PyStart is starting at  http://localhost:%PORT%
echo   Leave this window open while you learn. Close it to stop.
echo.

start "" "http://localhost:%PORT%/"

python -m http.server %PORT%
if errorlevel 1 (
  echo.
  echo   Could not start with "python". Trying "py" ...
  py -m http.server %PORT%
)

pause
