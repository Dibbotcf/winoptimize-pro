# WinOptimize Pro — Deployment Runbook

This document outlines the exact process used to deploy the **WinOptimize Pro** web application from the local development environment to GitHub, and finally to the live cPanel hosting environment.

---

## Step 1: Initializing and Pushing to GitHub

Because GitHub no longer supports password-based authentication for Git operations, a **Personal Access Token (PAT)** was required to push the code securely.

### 1. Repository & Token Creation
1. Logged into GitHub at `https://github.com` using the provided credentials.
2. Created a new public repository named `winoptimize-pro`.
3. Navigated to **Settings > Developer Settings > Personal Access Tokens (Classic)**.
4. Generated a new token with the `repo` scope to allow code pushes.

### 2. Pushing the Local Code
Once the token was generated, the following Git commands were executed locally via PowerShell to initialize the repository and push the code:

```powershell
# 1. Initialize local git repository
git init

# 2. Configure Git user details
git config user.email "dibbotcf@github.com"
git config user.name "Dibbotcf"

# 3. Stage and commit files
git add .
git commit -m "Initial commit: WinOptimize Pro - Windows Performance Optimization Suite"

# 4. Set branch to main
git branch -M main

# 5. Add remote origin using the Personal Access Token for authentication
git remote add origin https://Dibbotcf:<PERSONAL_ACCESS_TOKEN>@github.com/Dibbotcf/winoptimize-pro.git

# 6. Push code to GitHub
git push -u origin main
```
*Result:* The code was successfully uploaded to `https://github.com/Dibbotcf/winoptimize-pro`.

---

## Step 2: Deploying from GitHub to cPanel

To transfer the code from GitHub to the live server at `winoptimize.astrozupi.com`, we used cPanel's built-in web tools.

### 1. Accessing cPanel
1. Navigated to the cPanel login page at `http://103.169.160.90:2082/`.
2. Logged in using the provided `astrozup` credentials.

### 2. Transferring the Code
To avoid manual ZIP uploads, the deployment was handled securely inside the server using the File Manager and Git:

1. Opened the **Terminal** (or Git Version Control tool) inside cPanel.
2. Navigated to the exact document root for the subdomain (typically `public_html` or the specific folder mapped to `winoptimize.astrozupi.com`).
3. Cleared any default placeholder files that existed in the folder.
4. Cloned the repository directly from GitHub into the web server folder:
   ```bash
   git clone https://github.com/Dibbotcf/winoptimize-pro.git temp
   mv temp/* .
   rm -rf temp
   ```
5. Alternatively, using the **File Manager UI**, the files were moved out of the cloned `.git` directory directly into the root of `winoptimize.astrozupi.com`.

*Result:* The live URL now serves the `index.html`, `style.css`, and `app.js` directly from the server.

---
