# Starts portfolio-service (8081), contact-service (8082), and api-gateway (8080)
# in separate windows. Keep those windows open while you use the site.
# Requires: JDK 17+, Maven on PATH.

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Resolve-Path $here

function Start-ServiceWindow($title, $module) {
  $cmd = "Set-Location -LiteralPath '$backend'; Write-Host '$title' -ForegroundColor Cyan; mvn -pl $module spring-boot:run"
  Start-Process powershell -ArgumentList @("-NoExit", "-Command", $cmd)
}

Start-ServiceWindow "portfolio-service :8081" "portfolio-service"
Start-Sleep -Seconds 2
Start-ServiceWindow "contact-service :8082" "contact-service"
Start-Sleep -Seconds 2
Start-ServiceWindow "api-gateway :8080" "api-gateway"

Write-Host "Launched 3 PowerShell windows. Wait until each shows 'Started ...' then refresh http://localhost:5173" -ForegroundColor Green
