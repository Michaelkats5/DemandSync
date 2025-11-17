# Setup GitHub Repository for DemandSync 3.0
# This script helps you create and connect to a GitHub repository

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup - DemandSync 3.0" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$repoName = "DemandSync-3-0"
$repoDescription = "Restaurant Inventory & Operations Management Platform - Version 3.0"

# Check if GitHub CLI is installed
Write-Host "[1/4] Checking for GitHub CLI..." -ForegroundColor Yellow
$ghInstalled = $false
try {
    $ghVersion = gh --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $ghInstalled = $true
        Write-Host "✓ GitHub CLI is installed" -ForegroundColor Green
    }
} catch {
    $ghInstalled = $false
}

if (-not $ghInstalled) {
    Write-Host "⚠ GitHub CLI not found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPTION 1: Create repository via GitHub CLI" -ForegroundColor Cyan
    Write-Host "1. Install GitHub CLI: https://cli.github.com/" -ForegroundColor White
    Write-Host "2. Run: gh auth login" -ForegroundColor White
    Write-Host "3. Run: gh repo create $repoName --public --description `"$repoDescription`"" -ForegroundColor White
    Write-Host ""
    Write-Host "OPTION 2: Create repository via Web Interface" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Repository name: $repoName" -ForegroundColor White
    Write-Host "3. Description: $repoDescription" -ForegroundColor White
    Write-Host "4. Choose Public or Private" -ForegroundColor White
    Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "6. Click 'Create repository'" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Have you created the repository? (Y/N)"
    if ($choice -ne "Y" -and $choice -ne "y") {
        Write-Host "Please create the repository first, then run this script again." -ForegroundColor Yellow
        exit
    }
} else {
    Write-Host ""
    Write-Host "[2/4] Creating repository with GitHub CLI..." -ForegroundColor Yellow
    
    # Check if already logged in
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠ Not logged in to GitHub CLI" -ForegroundColor Yellow
        Write-Host "Run: gh auth login" -ForegroundColor White
        exit
    }
    
    # Create repository
    Write-Host "Creating repository: $repoName..." -ForegroundColor Gray
    gh repo create $repoName --public --description $repoDescription --source=. --remote=origin --push 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Repository created and code pushed!" -ForegroundColor Green
        exit
    } else {
        Write-Host "⚠ Repository may already exist or error occurred" -ForegroundColor Yellow
    }
}

# Step 3: Check current git status
Write-Host ""
Write-Host "[3/4] Checking Git status..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Gray
    git init | Out-Null
    Write-Host "✓ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository exists" -ForegroundColor Green
}

# Check current remote
$currentRemote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Current remote: $currentRemote" -ForegroundColor Gray
} else {
    Write-Host "  No remote configured" -ForegroundColor Gray
}

# Step 4: Set up remote
Write-Host ""
Write-Host "[4/4] Configuring Git remote..." -ForegroundColor Yellow
$githubUsername = "Michaelkats5"
$remoteUrl = "https://github.com/$githubUsername/$repoName.git"

# Remove existing origin if it exists
git remote remove origin 2>&1 | Out-Null

# Add new remote
git remote add origin $remoteUrl
Write-Host "✓ Remote configured: $remoteUrl" -ForegroundColor Green

# Step 5: Stage and commit changes
Write-Host ""
Write-Host "[5/5] Preparing to push code..." -ForegroundColor Yellow
Write-Host "Staging all files..." -ForegroundColor Gray
git add . 2>&1 | Out-Null

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Gray
    git commit -m "Initial commit - DemandSync 3.0" 2>&1 | Out-Null
    Write-Host "✓ Changes committed" -ForegroundColor Green
} else {
    Write-Host "✓ No changes to commit" -ForegroundColor Green
}

# Step 6: Push to GitHub
Write-Host ""
Write-Host "Ready to push to GitHub!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run these commands to push your code:" -ForegroundColor White
Write-Host "  git branch -M main" -ForegroundColor Gray
Write-Host "  git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Or run this one-liner:" -ForegroundColor White
Write-Host "  git branch -M main; git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Repository URL: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
Write-Host ""

