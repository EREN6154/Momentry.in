# MOMENTRY.IN - Complete Deployment & Admin Guide

## 🎯 Quick Navigation

- [Admin Panel Access](#admin-panel)
- [Google Auth Setup](#google-auth)
- [Deployment to Vercel & Render](#deployment)
- [Domain Connection](#domain-connection)
- [Color Palette Reference](#design-system)

---

## 🔐 Admin Panel

### Access Admin Panel

**URL:** `http://localhost:5000/admin` (local) or `https://momentry.in/admin` (production)

### Admin Features

- 📊 Dashboard Overview (Revenue, Bookings, Ratings)
- ✈️ Manage Trips (Add/Edit/Delete journeys)
- 👥 Users & Bookings (Track all bookings)
- 💰 Financials (Razorpay transactions)
- 📝 Content Manager (CMS)
- ⭐ Review Moderation
- ⚙️ Settings

### Admin Login

1. Go to `/admin`
2. Use any registered account with `isAdmin` flag set to `true` in MongoDB
3. Or create admin account:

```bash
# Update MongoDB User document
db.users.updateOne(
  { email: "admin@momentry.in" },
  { $set: { isAdmin: true } }
)
```

---

## 🔑 Google OAuth Setup

### Step 1: Configure Environment Variables

**Frontend (.env.local):**

```
VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000/api
```

**Backend (.env):**

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
```

### Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project: `momentry`
3. Go to **Credentials**
4. Select OAuth 2.0 Client ID
5. Update **Authorized redirect URIs**:
   ```
   http://localhost:3000
   http://localhost:5000
   https://momentry.in
   https://www.momentry.in
   https://momentry.vercel.app
   ```

### Step 3: Test Google Auth Locally

```bash
npm run dev  # Frontend on :3000
npm run dev  # Backend on :5000
```

Click "Sign up with Google" and it should work!

---

## 🚀 Deployment Guide

### Option 1: Deploy on Vercel (Frontend) + Render (Backend)

#### Frontend Deployment (Vercel)

**Step 1: Push to GitHub**

```bash
cd frontend
git init
git add .
git commit -m "Initial commit: MOMENTRY frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/momentry-frontend.git
git push -u origin main
```

**Step 2: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository `momentry-frontend`
4. Set Environment Variables:
   ```
   VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
   VITE_API_URL=https://momentry-backend.onrender.com/api
   ```
5. Click "Deploy"
6. Your frontend is live at: `https://momentry.vercel.app`

#### Backend Deployment (Render)

**Step 1: Push Backend to GitHub**

```bash
cd backend
git init
git add .
git commit -m "Initial commit: MOMENTRY backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/momentry-backend.git
git push -u origin main
```

**Step 2: Deploy on Render**

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository `momentry-backend`
4. Configuration:
   - **Name:** momentry-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Set Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=generate_random_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
   ```
6. Click "Create Web Service"
7. Your backend is live at: `https://momentry-backend.onrender.com`

---

## 🌍 Domain Connection (momentry.in)

### Option A: Using Vercel for Everything

**Step 1: Buy Domain**

- Get `momentry.in` from GoDaddy, Namecheap, or similar

**Step 2: Add Domain to Vercel**

1. In Vercel project settings → "Domains"
2. Add `momentry.in`
3. Follow DNS configuration instructions
4. Update your domain registrar nameservers to Vercel's

**Step 3: Update Environment Variables**

- Vercel: `VITE_API_URL=https://momentry.in/api`
- Render: Add `momentry.in` to allowed origins

### Option B: Existing Setup (Vercel + Render)

**Frontend (Vercel):**

```
Domain: momentry.in → Vercel
```

**Backend (Render):**

```
Add custom domain: api.momentry.in
```

---

## 🎨 Design System & Color Palette

### PPT Design Colors

```css
/* Palette */
--ivory: #f7f3ec; /* Light background */
--white: #ffffff; /* Pure white */
--brass: #c2a36b; /* Primary accent (replaces gold) */
--ink: #241c15; /* Dark text */
--charcoal: #4a4036; /* Medium dark */

/* Usage */
--primary: #c2a36b; /* Brass - buttons, accents */
--secondary: #241c15; /* Ink - headings */
--background: #f7f3ec; /* Ivory - page backgrounds */
```

### Update Tailwind Config

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      ivory: '#F7F3EC',
      brass: '#C2A36B',
      ink: '#241C15',
      charcoal: '#4A4036',
    },
  },
}
```

---

## 📋 Deployment Checklist

- [ ] Environment variables configured (.env.local, .env)
- [ ] Google Auth Client ID updated
- [ ] MongoDB Atlas cluster created
- [ ] Razorpay API keys obtained
- [ ] GitHub repositories created
- [ ] Frontend pushed to GitHub
- [ ] Backend pushed to GitHub
- [ ] Vercel project created & deployed
- [ ] Render service created & deployed
- [ ] Domain registered (momentry.in)
- [ ] DNS configured for domain
- [ ] SSL certificate enabled (automatic on Vercel/Render)
- [ ] Environment variables set on Vercel & Render
- [ ] Test full booking flow in production
- [ ] Admin panel accessible at `/admin`

---

## 🔗 Useful Links

- **Frontend:** https://momentry.vercel.app
- **Backend API:** https://momentry-backend.onrender.com/api
- **Admin Panel:** https://momentry.in/admin
- **Google Cloud Console:** https://console.cloud.google.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Razorpay Dashboard:** https://dashboard.razorpay.com

---

## 🐛 Troubleshooting

### Google Auth Not Working

- Check Client ID is correct
- Verify redirect URIs are added to Google Cloud Console
- Clear browser cookies & cache
- Check browser console for errors

### API Not Connecting

- Verify `VITE_API_URL` matches backend URL
- Check CORS is enabled in backend
- Verify backend is running/deployed

### Admin Panel 403 Error

- Make sure user has `isAdmin: true` in database
- Check JWT token is valid
- Verify authentication middleware

---

## 📞 Support

For issues, check:

1. Browser console (F12)
2. Backend logs (Render dashboard)
3. Network tab for API errors
4. MongoDB Atlas logs
