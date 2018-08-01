setlocal ENABLEDELAYEDEXPANSION
set rp=http://localhost
set str=%rp%%cd:~1,255%
set "value=%str:*\htdocs\=%"
echo %str:*\htdocs\=%
if "%value%"=="%str%" echo "\htdocs\" not found &goto :eof
for /f "tokens=1,2 delims=." %%a in ("%value: htdocs =.%") do "value=%%b"
start "" http://localhost\%value%
