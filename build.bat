@echo off
REM =====================================================
REM Build script for Immolate (C++ → WebAssembly + JS)
REM =====================================================

REM Load Emscripten environment
call C:\emsdk\emsdk_env.bat

REM Change to project root (location of this .bat)
cd /d %~dp0

echo.
echo Building Immolate...
echo.

REM Compile and log output
em++ -v include\immolate.cpp -o immolate.js -s EXPORT_NAME=Immolate --closure 1 -lembind -sASSERTIONS -sFORCE_FILESYSTEM=1 > build.log 2>&1

echo ERRORLEVEL is %ERRORLEVEL%

REM Show whether files exist
dir immolate.*

echo.
echo ==== Showing first 60 lines of build.log ====
for /f "tokens=1* delims=:" %%A in ('findstr /N /R "^" build.log') do (
    if %%A lss 61 echo %%A:%%B
)

echo.
echo Done.
pause
