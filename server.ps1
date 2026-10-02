$ErrorActionPreference = "Stop"
$nodePath = "C:\Program Files\nodejs\node.exe"

if (-not (Test-Path -LiteralPath $nodePath)) {
    throw "Node.js was not found at $nodePath."
}

& $nodePath (Join-Path $PSScriptRoot "server.js")