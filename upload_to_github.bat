@echo off
echo ================================================
echo KyroBiz GitHub Upload Script
echo ================================================
echo.

echo Step 1: Removing large files from Git tracking...
git rm -r --cached nexgen_hub downloads
if %errorlevel% neq 0 (
    echo Warning: Could not remove some files. Continuing...
)

echo.
echo Step 2: Adding .gitignore...
git add .gitignore

echo.
echo Step 3: Committing changes...
git commit -m "Remove large executable files and add .gitignore"

echo.
echo Step 4: Pushing to GitHub...
git push -u origin main --force

echo.
echo ================================================
echo Upload Complete!
echo ================================================
echo.
echo Your KyroBiz website is now on GitHub at:
echo https://github.com/Yuvaraj-Ramasamy/KyroBiz
echo.
echo To enable GitHub Pages:
echo 1. Go to your repository on GitHub
echo 2. Click Settings
echo 3. Click Pages (left sidebar)
echo 4. Under Source, select 'main' branch
echo 5. Click Save
echo.
echo Your site will be live at:
echo https://yuvaraj-ramasamy.github.io/KyroBiz/
echo.
pause
