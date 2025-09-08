@echo on
REM Debug build script — captures env + verbose em++ output to build.log

REM Ensure emsdk env for this session (optional if you did permanent activate)
call C:\emsdk\emsdk_env.bat

cd /d %~dp0

REM Dump PATH and a few env var checks to env_debug.txt
echo ==== ENV START ==== > env_debug.txt
echo PATH=%PATH% >> env_debug.txt
where em++ >> env_debug.txt 2>&1
em++ --version >> env_debug.txt 2>&1
echo ==== ENV END ==== >> env_debug.txt

echo.
echo Running em++ (verbose). Output will go to build.log
echo.

REM Run em++ with verbose output and capture stdout+stderr
em++ -v -O3 --closure 1 -lembind -o immolate.js include/immolate.cpp -s EXPORT_NAME=Immolate > build.log 2>&1
set rc=%ERRORLEVEL%

echo.
echo ==== build.log (first 200 lines) ====
more +0 build.log | findstr /N /R "^" | more
echo.
echo ==== env_debug.txt ====
type env_debug.txt
echo.
echo ERRORLEVEL=%rc%

REM Search for generated files (current dir and subdirs)
echo.
echo Searching for immolate.* files on disk from current dir...
dir /s /b immolate.* 2>nul || echo "no immolate.* files found in this tree"

IF %rc% NEQ 0 (
    echo.
    echo ❌ Build failed (ERRORLEVEL %rc%). See build.log above for details.
    pause
    exit /b %rc%
)

echo.
echo ✅ Build returned ERRORLEVEL 0. Check immolate.js / immolate.wasm presence above.
pause
