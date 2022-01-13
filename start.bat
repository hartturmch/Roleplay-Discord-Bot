@echo off
echo.

set NodePackagesPath=E:\Projects\OpenShift\Materials\Node.jsPackageManager // This is my path, you can edit them

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

echo O Bot foi carregado com sucesso!.
echo ..................................................................
echo ..................................................................
echo ..................................................................
echo ..................................................................
echo ..................................................................
echo .......................O Bot Ja vai iniciar.......................
echo ..................................................................
echo ..................................................................
echo.
echo.
echo.

node index.js
TIMEOUT 4
start.bat