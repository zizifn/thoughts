
#find nginx path
$nginxFolder = Get-Process -Name nginx | Select-Object -First 1 | Select-Object -Property Path | Split-Path
if (!$nginxFolder) {
    $nginxFolder = "C:\software\nginx-1.14.1";
}

# create SymbolicLink for local testing
if (!(Test-Path -path $nginxFolder\html\primers\callback.html -PathType Leaf)) {
    New-Item -Type SymbolicLink  -Path $nginxFolder\html\primers -Name callback.html -Value .\callback.html
}
# create SymbolicLink for local testing
if (!(Test-Path -path $nginxFolder\html\primers\callback2promise.html -PathType Leaf)) {
    New-Item -Type SymbolicLink  -Path $nginxFolder\html\primers -Name callback2promise.html -Value .\callback2promise.html
}

if (!(Test-Path -path $nginxFolder\html\primers\promise_sequencing.html -PathType Leaf)) {
    New-Item -Type SymbolicLink  -Path $nginxFolder\html\primers -Name promise_sequencing.html -Value .\promise_sequencing.html
}

if (!(Test-Path -path $nginxFolder\html\primers\promise_parallel.html -PathType Leaf)) {
    New-Item -Type SymbolicLink  -Path $nginxFolder\html\primers -Name promise_parallel.html -Value .\promise_parallel.html
}