# 📤 GitHub Setup Guide - Push Your Project to GitHub

This guide will help you push your Shiksha Setu project to GitHub step by step.

---

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ Git installed on your computer
- ✅ A GitHub account (create one at https://github.com)
- ✅ Your project files ready

---

## 🚀 Step-by-Step Guide

### Step 1: Install Git (If Not Already Installed)

#### For Windows:
```bash
# Download Git from: https://git-scm.com/download/win
# Run the installer and follow the setup wizard
```

#### Verify Git Installation:
```bash
git --version
# Should show: git version 2.x.x
```

---

### Step 2: Configure Git (First Time Only)

```bash
# Set your name (will appear in commits)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

### Step 3: Create a New Repository on GitHub

1. **Go to GitHub**: https://github.com
2. **Click** the "+" icon in the top right corner
3. **Select** "New repository"
4. **Fill in the details**:
   - Repository name: `shiksha-setu`
   - Description: `A modern Learning Management System built with React and Spring Boot`
   - Visibility: Choose "Public" or "Private"
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click** "Create repository"

---

### Step 4: Initialize Git in Your Project

Open your terminal/command prompt in your project root directory:

```bash
# Navigate to your project directory
cd C:\Users\yash7\Downloads\New-S-S\shiksha-setu

# Initialize Git repository
git init

# This creates a hidden .git folder
```

---

### Step 5: Add Files to Git

```bash
# Check current status
git status

# Add all files to staging area
git add .

# Or add specific files/folders
git add README.md
git add API_SECURITY_GUIDE.md
git add shiksha-setu-frontend/
git add shiksha-setu-backend/

# Verify files are staged
git status
```

---

### Step 6: Create Your First Commit

```bash
# Commit with a descriptive message
git commit -m "Initial commit: Complete LMS with React frontend and Spring Boot backend"

# Verify commit was created
git log --oneline
```

---

### Step 7: Connect to GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/shiksha-setu.git

# Verify remote was added
git remote -v
```

---

### Step 8: Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin main

# If you get an error about 'master' branch, try:
git branch -M main
git push -u origin main
```

#### If You Get Authentication Error:

**Option 1: Use Personal Access Token (Recommended)**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Shiksha Setu Project"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use the token as your password

**Option 2: Use GitHub CLI**

```bash
# Install GitHub CLI
# Windows: Download from https://cli.github.com/

# Authenticate
gh auth login

# Follow the prompts to authenticate
```

---

### Step 9: Verify Upload

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/shiksha-setu`
2. You should see all your files uploaded
3. Check that README.md is displayed on the main page

---

## 🔄 Making Future Updates

After the initial push, use these commands to update your repository:

```bash
# 1. Check what files changed
git status

# 2. Add changed files
git add .

# 3. Commit with a message
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# That's it! Your changes are now on GitHub
```

---

## 📝 Common Git Commands

### Checking Status
```bash
# See what files have changed
git status

# See commit history
git log

# See commit history (one line per commit)
git log --oneline

# See changes in files
git diff
```

### Working with Branches
```bash
# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# List all branches
git branch -a

# Delete a branch
git branch -d feature-name
```

### Undoing Changes
```bash
# Discard changes in a file
git checkout -- filename

# Unstage a file
git reset HEAD filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Syncing with GitHub
```bash
# Get latest changes from GitHub
git pull

# Push your changes to GitHub
git push

# Force push (use carefully!)
git push --force
```

---

## 🔒 Protecting Sensitive Information

### Files Already Ignored (in .gitignore):

- ✅ `node_modules/` - Frontend dependencies
- ✅ `target/` - Backend build files
- ✅ `.env` - Environment variables
- ✅ `.idea/` - IDE settings
- ✅ `*.log` - Log files

### Before Pushing, Check:

```bash
# Make sure these are NOT in your repository:
# - Database passwords
# - API keys
# - JWT secrets
# - Payment gateway credentials

# View what will be committed
git status

# If you see sensitive files, add them to .gitignore
echo "sensitive-file.txt" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore"
```

---

## 🎯 Best Practices

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good commit messages:
git commit -m "feat: Add user authentication with JWT"
git commit -m "fix: Resolve course enrollment bug"
git commit -m "docs: Update API documentation"
git commit -m "style: Improve dashboard UI design"

# Bad commit messages:
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Commit Message Prefixes:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Branching Strategy

```bash
# Main branch (production-ready code)
main

# Development branch
git checkout -b develop

# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/payment-integration

# Bug fix branches
git checkout -b fix/login-error
git checkout -b fix/course-display-issue

# Merge back to main when ready
git checkout main
git merge feature/user-authentication
```

---

## 🐛 Troubleshooting

### Problem: "Permission denied (publickey)"

**Solution**: Set up SSH keys or use HTTPS with Personal Access Token

```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/shiksha-setu.git
```

### Problem: "Repository not found"

**Solution**: Check repository URL and your access

```bash
# Verify remote URL
git remote -v

# Update if incorrect
git remote set-url origin https://github.com/YOUR_USERNAME/shiksha-setu.git
```

### Problem: "Failed to push some refs"

**Solution**: Pull latest changes first

```bash
# Pull and merge
git pull origin main --allow-unrelated-histories

# Then push
git push origin main
```

### Problem: "Large files detected"

**Solution**: Remove large files or use Git LFS

```bash
# Find large files
find . -type f -size +50M

# Remove from Git history
git filter-branch --tree-filter 'rm -f path/to/large/file' HEAD

# Or use Git LFS for large files
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```

---

## 📚 Additional Resources

### Learning Git:
- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Interactive Git Tutorial**: https://learngitbranching.js.org/

### GitHub Features:
- **GitHub Actions**: Automate workflows
- **GitHub Pages**: Host your frontend
- **GitHub Issues**: Track bugs and features
- **GitHub Projects**: Manage your project

### Useful Tools:
- **GitHub Desktop**: GUI for Git (https://desktop.github.com/)
- **GitKraken**: Visual Git client (https://www.gitkraken.com/)
- **VS Code Git**: Built-in Git support in VS Code

---

## ✅ Checklist Before Pushing

- [ ] All sensitive information removed or in .gitignore
- [ ] README.md is complete and accurate
- [ ] API_SECURITY_GUIDE.md is included
- [ ] .gitignore file is properly configured
- [ ] All tests are passing
- [ ] Code is properly formatted
- [ ] Commit messages are clear and descriptive
- [ ] No large files (>50MB) in repository
- [ ] Database credentials are not hardcoded
- [ ] API keys are in environment variables

---

## 🎉 Success!

Once you've pushed your code to GitHub:

1. ✅ Your code is safely backed up
2. ✅ Others can view and contribute to your project
3. ✅ You can access your code from anywhere
4. ✅ You have version control and history
5. ✅ You can collaborate with team members

### Share Your Repository:

```
🔗 Repository URL: https://github.com/YOUR_USERNAME/shiksha-setu
📚 API Security Guide: https://github.com/YOUR_USERNAME/shiksha-setu/blob/main/API_SECURITY_GUIDE.md
📖 README: https://github.com/YOUR_USERNAME/shiksha-setu/blob/main/README.md
```

---

## 🤝 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Search for your error on Google or Stack Overflow
3. Ask on GitHub Discussions
4. Contact the project maintainers

---

**Happy Coding! 🚀**

Made with ❤️ for the Shiksha Setu project
