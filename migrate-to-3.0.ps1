# DemandSync 3.0 Migration Script
# Run this script from PowerShell to migrate your project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DemandSync 3.0 Migration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to Desktop
Write-Host "[1/8] Navigating to Desktop..." -ForegroundColor Yellow
$desktopPath = "C:\Users\MichaelKats\Desktop"
Set-Location $desktopPath
Write-Host "✓ Current directory: $(Get-Location)" -ForegroundColor Green

# Step 2: Create DemandSync-3-0 folder
Write-Host ""
Write-Host "[2/8] Creating DemandSync-3-0 folder..." -ForegroundColor Yellow
$newFolderPath = Join-Path $desktopPath "DemandSync-3-0"
if (Test-Path $newFolderPath) {
    Write-Host "⚠ Folder already exists. Contents will be overwritten." -ForegroundColor Yellow
    $response = Read-Host "Continue? (Y/N)"
    if ($response -ne "Y" -and $response -ne "y") {
        Write-Host "Migration cancelled." -ForegroundColor Red
        exit
    }
} else {
    New-Item -ItemType Directory -Path $newFolderPath -Force | Out-Null
    Write-Host "✓ Folder created: $newFolderPath" -ForegroundColor Green
}

# Step 3: Copy project files
Write-Host ""
Write-Host "[3/8] Copying project files..." -ForegroundColor Yellow
$sourcePath = Join-Path $desktopPath "src"
if (-not (Test-Path $sourcePath)) {
    Write-Host "✗ Source folder 'src' not found at: $sourcePath" -ForegroundColor Red
    exit
}

# Copy all files and folders
Copy-Item -Path "$sourcePath\*" -Destination $newFolderPath -Recurse -Force
Write-Host "✓ Files copied successfully" -ForegroundColor Green

# Step 4: Navigate to new folder
Write-Host ""
Write-Host "[4/8] Navigating to new project folder..." -ForegroundColor Yellow
Set-Location $newFolderPath
Write-Host "✓ Current directory: $(Get-Location)" -ForegroundColor Green

# Step 5: Check/Initialize Git
Write-Host ""
Write-Host "[5/8] Checking Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
    Write-Host "  Current remote:" -ForegroundColor Gray
    git remote -v | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
} else {
    Write-Host "⚠ No git repository found. Initializing..." -ForegroundColor Yellow
    git init | Out-Null
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Step 6: Verify package.json updates
Write-Host ""
Write-Host "[6/8] Verifying package.json updates..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    Write-Host "  Name: $($packageJson.name)" -ForegroundColor Gray
    Write-Host "  Version: $($packageJson.version)" -ForegroundColor Gray
    if ($packageJson.name -eq "demandsync-3-0" -and $packageJson.version -eq "3.0.0") {
        Write-Host "✓ package.json correctly updated" -ForegroundColor Green
    } else {
        Write-Host "⚠ package.json may need manual update" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ package.json not found" -ForegroundColor Yellow
}

# Step 7: Check for .env files
Write-Host ""
Write-Host "[7/8] Checking for environment files..." -ForegroundColor Yellow
$envFiles = Get-ChildItem -Path . -Filter ".env*" -File -ErrorAction SilentlyContinue
if ($envFiles) {
    Write-Host "  Found environment files:" -ForegroundColor Gray
    $envFiles | ForEach-Object { Write-Host "    $($_.Name)" -ForegroundColor Gray }
    Write-Host "⚠ Review .env files for any path updates needed" -ForegroundColor Yellow
} else {
    Write-Host "✓ No .env files found (none needed or using defaults)" -ForegroundColor Green
}

# Step 8: Summary
Write-Host ""
Write-Host "[8/8] Migration Summary" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Project Location: $newFolderPath" -ForegroundColor White
Write-Host "Git Status: $(if (Test-Path '.git') { 'Initialized' } else { 'Not initialized' })" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review and update git remote if needed:" -ForegroundColor White
Write-Host "   git remote set-url origin https://github.com/Michaelkats5/DemandSync-3-0.git" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Install dependencies:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Gray
Write-Host "   python -m pip install -r requirements.txt" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test the application:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Complete! ✓" -ForegroundColor Green
Write-Host ""

