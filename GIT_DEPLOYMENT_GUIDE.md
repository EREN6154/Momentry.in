# 🚀 GIT & DEPLOYMENT QUICK GUIDE

## Step 1: Create GitHub Repositories

### Frontend Repository

```bash
# Navigate to frontend folder
cd "C:\Users\hp\OneDrive\Desktop\ayush travel site\frontend"

# Initialize git
git init
git add .
git commit -m "Initial commit: MOMENTRY frontend redesign with PPT colors"
git branch -M main

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/momentry-frontend.git
git push -u origin main
```

### Backend Repository

```bash
# Navigate to backend folder
cd "C:\Users\hp\OneDrive\Desktop\ayush travel site\backend"

# Initialize git
git init
git add .
git commit -m "Initial commit: MOMENTRY backend with Razorpay & MongoDB"
git branch -M main

# Add remote
git remote add origin https://github.com/USERNAME/momentry-backend.git
git push -u origin main
```

---

## Step 2: Deploy Frontend on Vercel

### Option A: Automatic (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select GitHub repository: `momentry-frontend`
4. Framework: **Vite** (auto-detected)
5. Set Environment Variables:
   ```
   VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
   VITE_API_URL=https://momentry-backend.onrender.com/api
   ```
6. Click **Deploy**
7. Your site is live at: `https://momentry.vercel.app`

### Option B: Manual CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend folder
cd frontend
vercel
# Follow prompts and it will deploy!
```

---

## Step 3: Deploy Backend on Render

### Step-by-Step

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub Account
4. Select `momentry-backend` repository

**Configuration:**

```
Name: momentry-backend
Environment: Node
Build Command: npm install
Start Command: npm start
Region: Choose closest to you
```

**Environment Variables (Add these):**

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_random_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
NODE_ENV=production
```

5. Click **"Create Web Service"**
6. Backend is live at: `https://momentry-backend.onrender.com`

---

## Step 4: Update Vercel with Backend URL

Once Render URL is ready:

1. Go to Vercel Dashboard
2. Select `momentry-frontend`
3. Settings → Environment Variables
4. Update `VITE_API_URL`:
   ```
   https://momentry-backend.onrender.com/api
   ```
5. Redeploy (Vercel auto-redeploys on env var change)

---

## Step 5: Connect Domain (momentry.in)

### Using Vercel Domain

1. In Vercel project → Settings → Domains
2. Add `momentry.in`
3. Copy DNS records
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Update nameservers to Vercel's
6. Done! Site is now at: `https://momentry.in`

### Update Backend with Domain

1. Add `api.momentry.in` as custom domain on Render
2. Update Vercel env: `VITE_API_URL=https://api.momentry.in`

---

## Continuous Deployment (Auto-Deploy)

Both Vercel and Render support auto-deployment:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Automatically deploys to Vercel & Render!
```

---

## Troubleshooting Deployments

### Frontend Not Loading

- Check Vercel build logs (Deployments tab)
- Verify environment variables are set
- Make sure API URL is correct

### Backend Connection Error

- Verify Render backend is running (check logs)
- Check MongoDB Atlas connection string
- Verify CORS is enabled in backend

### Domain Not Working

- Wait 24-48 hours for DNS propagation
- Check DNS records in domain registrar
- Verify SSL certificate is issued (Vercel/Render handle this)

---

## Make Future Changes

**After deployment, to make changes:**

```bash
# Make changes to code
git add .
git commit -m "Description of changes"
git push origin main

# Vercel & Render automatically redeploy!
```

---

## Rollback to Previous Version

```bash
# If something breaks, rollback on Vercel/Render dashboard:
1. Go to Deployments tab
2. Find the working deployment
3. Click the 3-dots menu
4. Click "Redeploy"
```

---

## Production URLs

- **Frontend:** https://momentry.in
- **Frontend Alt:** https://momentry.vercel.app
- **Backend API:** https://api.momentry.in (or momentry-backend.onrender.com)
- **Admin Panel:** https://momentry.in/admin

---

## Environment Variables Summary

**Frontend (.env.local):**

```
VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
VITE_API_URL=https://momentry-backend.onrender.com/api
```

**Backend (.env):**

```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/momentry
JWT_SECRET=your_random_secret_key_12345
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
NODE_ENV=production
```
