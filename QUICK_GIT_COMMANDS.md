# ⚡ Quick Git Commands Reference

A quick reference guide for common Git commands used in the Shiksha Setu project.

---

## 🚀 Initial Setup (One Time Only)

```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/shiksha-setu.git
```

---

## 📤 Push to GitHub (First Time)

```bash
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: Complete LMS project"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 Daily Workflow

```bash
# 1. Check status
git status

# 2. Add changes
git add .                    # Add all files
git add filename.txt         # Add specific file
git add folder/              # Add specific folder

# 3. Commit changes
git commit -m "Your message here"

# 4. Push to GitHub
git push
```

---

## 📥 Get Latest Changes

```bash
# Pull latest changes from GitHub
git pull

# Pull from specific branch
git pull origin main
```

---

## 🌿 Working with Branches

```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch (shortcut)
git checkout -b feature-name

# List all branches
git branch -a

# Delete branch
git branch -d feature-name

# Push branch to GitHub
git push origin feature-name
```

---

## ↩️ Undo Changes

```bash
# Discard changes in file
git checkout -- filename

# Unstage file
git reset HEAD filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🔍 View Information

```bash
# See commit history
git log

# See commit history (compact)
git log --oneline

# See changes in files
git diff

# See remote repositories
git remote -v

# See current branch
git branch
```

---

## 🏷️ Working with Tags

```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tags to GitHub
git push --tags

# List all tags
git tag -l
```

---

## 🔧 Fix Common Issues

```bash
# Change remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/shiksha-setu.git

# Force push (use carefully!)
git push --force

# Pull with unrelated histories
git pull origin main --allow-unrelated-histories

# Clean untracked files
git clean -fd
```

---

## 📝 Commit Message Templates

```bash
# Feature
git commit -m "feat: Add user authentication"

# Bug fix
git commit -m "fix: Resolve login error"

# Documentation
git commit -m "docs: Update README"

# Style changes
git commit -m "style: Format code"

# Refactoring
git commit -m "refactor: Improve code structure"

# Tests
git commit -m "test: Add unit tests"

# Maintenance
git commit -m "chore: Update dependencies"
```

---

## 🎯 Project-Specific Commands

### Update Frontend
```bash
cd shiksha-setu-frontend
git add .
git commit -m "feat: Update frontend UI"
git push
```

### Update Backend
```bash
cd shiksha-setu-backend
git add .
git commit -m "feat: Add new API endpoint"
git push
```

### Update Documentation
```bash
git add README.md API_SECURITY_GUIDE.md
git commit -m "docs: Update documentation"
git push
```

---

## 🚨 Emergency Commands

```bash
# Abort merge
git merge --abort

# Abort rebase
git rebase --abort

# Stash changes (save for later)
git stash

# Apply stashed changes
git stash pop

# Discard all local changes
git reset --hard HEAD
```

---

## 📊 Useful Aliases (Optional)

Add these to your `.gitconfig` for shortcuts:

```bash
# Set up aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'

# Now you can use:
git st          # instead of git status
git co main     # instead of git checkout main
git br          # instead of git branch
git ci -m "msg" # instead of git commit -m "msg"
```

---

## 🔐 Security Checklist

Before pushing, always check:

```bash
# View what will be committed
git status

# View actual changes
git diff

# Make sure these are in .gitignore:
# - .env files
# - node_modules/
# - target/
# - Database passwords
# - API keys
```

---

## 📱 Quick Reference Card

```
┌─────────────────────────────────────────────────────┐
│           MOST USED GIT COMMANDS                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  git status          Check current status          │
│  git add .           Add all changes               │
│  git commit -m ""    Commit with message           │
│  git push            Push to GitHub                │
│  git pull            Get latest changes            │
│  git log             View commit history           │
│  git branch          List branches                 │
│  git checkout        Switch branches               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎓 Learning Resources

- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **Interactive Tutorial**: https://learngitbranching.js.org/
- **Git Documentation**: https://git-scm.com/doc

---

**Keep this file handy for quick reference! 📌**
