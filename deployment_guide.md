# How to Deploy Your 3D Portfolio to Netlify

Since your project is built with Vite, React, and Tailwind, **Netlify** is a perfect hosting choice. Here are the two easiest ways to deploy.

## Option 1: Drag & Drop (Easiest)
**Best for**: Quick testing without connecting a GitHub account.

1.  **Locate the Build Folder**: 
    - Go to your project folder: `c:\Users\amanbatra\r3f-vite-starter`
    - You should see a folder named `dist`. (I just created this by running the build command for you!).

2.  **Upload to Netlify**:
    - Go to [Netlify Drop](https://app.netlify.com/drop).
    - Drag and drop the `dist` folder onto the page area that says "Drag and drop your site output folder here".
    - Netlify will instantly generate a live link for you!

---

## Option 2: Deploy via GitHub (Recommended)
**Best for**: Automatic updates whenever you push code changes.

1.  **Push your code to GitHub** (if you haven't already).
2.  **Log in to Netlify**: Go to [netlify.com](https://www.netlify.com/) and log in.
3.  **Add New Site**:
    - Click **"Add new site"** > **"Import from existing project"**.
    - Select **GitHub**.
    - authorize Netlify to access your repositories.
    - Select your repository (`r3f-vite-starter`).
4.  **Configure Build Settings**:
    Netlify usually detects these automatically for Vite, but verify them:
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
5.  **Click "Deploy Site"**.

## ✅ Pre-Deployment Checklist (Completed)
I have already performed the following checks for you:
- [x] **Responsiveness**: Verified mobile layouts for Rocket, Projects, and Interface.
- [x] **Build Check**: Ran `npm run build` successfully. The `dist` folder is ready.
- [x] **Asset Handling**: Verified assets are loading correctly in code.

## 🚀 Live Site
Once deployed, Netlify will give you a URL like `random-name-12345.netlify.app`. You can change this in **Site Settings > Change site name**.
