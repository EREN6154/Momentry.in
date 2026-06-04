# MOMENTRY Travel Agency - Complete Setup Guide

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js (v16+) installed - [Download](https://nodejs.org/)
- MongoDB account - [Free tier](https://www.mongodb.com/cloud/atlas/register)
- Google OAuth credentials - [Setup guide below](#google-oauth-setup)
- Razorpay account - [Sign up](https://razorpay.com/) for free

---

## Step 1: MongoDB Setup

### Create MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/)
2. Create a free account or login
3. Create a **new cluster** (Free tier available)
4. Click "Connect" and select "Drivers"
5. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/momentry`)

### Replace in `.env`:

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/momentry
```

---

## Step 2: Backend Setup

### 1. Open Terminal and Navigate to Backend

```bash
cd "c:\Users\hp\OneDrive\Desktop\ayush travel site\backend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```bash
# Copy the example file
copy .env.example .env
```

### 4. Edit `.env` with Your Details

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/momentry
JWT_SECRET=your-super-secret-key-min-32-chars
GOOGLE_CLIENT_ID=your-google-client-id
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
PORT=5000
ADMIN_EMAIL=admin@momentry.in
ADMIN_PASSWORD=admin123
```

### 5. Start Backend Server

```bash
npm run dev
```

✅ You should see: `Server running on http://localhost:5000`

---

## Step 3: Frontend Setup

### 1. Open New Terminal and Navigate to Frontend

```bash
cd "c:\Users\hp\OneDrive\Desktop\ayush travel site\frontend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```bash
copy .env.example .env
```

### 4. Edit `.env`

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### 5. Start Frontend

```bash
npm run dev
```

✅ You should see: `Local: http://localhost:3000`

---

## Step 4: Test the Website

1. **Open in Browser**: http://localhost:3000
2. **Create User Account**:
   - Click "Sign Up"
   - Fill in details (name, email, password)
   - Click Sign Up

3. **Test Admin Panel**:
   - Go to Login: http://localhost:3000/login
   - Email: `admin@momentry.in`
   - Password: `admin123`
   - Click "Admin Panel" in header
   - You can now add/edit/delete packages

4. **View Packages**: Click on packages and book

---

## 🔐 Admin Password Change

### To Change Admin Password:

1. Go to MongoDB Atlas → Collections → Users
2. Find the user with `admin@momentry.in` email
3. You can update the password (it's hashed with bcrypt)

**OR** Change in code before deployment:

- Edit `/backend/.env`
- Update `ADMIN_PASSWORD=newpassword`
- Restart backend

---

## 🌐 Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (name: "MOMENTRY")
3. Go to "APIs & Services" → "OAuth consent screen"
4. Select **External** → Create
5. Fill in:
   - App name: MOMENTRY
   - User support email: contact@momentry.in
   - Developer contact: your-email@gmail.com

### 2. Create OAuth 2.0 Credentials

1. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
2. Select **Web application**
3. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://momentry.in
   ```
4. Add Authorized redirect URIs:
   ```
   http://localhost:3000
   http://localhost:3000/
   ```
5. Copy your **Client ID**

### 3. Add to `.env` Files

**Frontend (.env)**:

```
VITE_GOOGLE_CLIENT_ID=your-client-id
```

**Backend (.env)**:

```
GOOGLE_CLIENT_ID=your-client-id
```

---

## 💳 Razorpay Payment Setup

### 1. Create Razorpay Account

1. Go to [Razorpay](https://razorpay.com/)
2. Sign up with email/phone
3. Verify email
4. Complete KYC (Know Your Customer)

### 2. Get API Keys

1. Login to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate/Copy:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret** (keep it safe!)

### 3. Test Keys (Recommended First)

1. In Razorpay Dashboard: **Account Settings** → **Live Mode**
2. Toggle to **Test Mode**
3. Use Test Keys instead (easier for development)

### 4. Add to `.env`

**Backend (.env)**:

```
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-secret-key
```

**Frontend (.env)**:

```
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### 5. Test Payment

1. Create a user and book a package
2. Go to checkout
3. Use test card: `4111 1111 1111 1111`
4. OTP: `123456`
5. You'll see payment success message

---

## 📋 Data Management

### Adding Sample Travel Packages

The backend automatically adds 6 sample packages on first run:

- Goa Beach Paradise
- Himalayan Trek Adventure
- Jaipur City Tour
- Kerala Backwaters Cruise
- Agra Taj Mahal Tour
- Manali Adventure Package

### Edit Packages via Admin Panel

1. Login as admin: `admin@momentry.in` / `admin123`
2. Click "Admin Panel" in navigation
3. Click "Add Package" button
4. Fill in details:
   - **Title**: Package name
   - **Destination**: City/Region
   - **Price**: In ₹ (rupees)
   - **Duration**: Days
   - **Max Participants**: Number
   - **Description**: Full details
   - **Highlights**: Click "Add" to add features (e.g., "Free WiFi")
   - **Image URL**: Link to image (optional)
   - **Active**: Checkbox to enable/disable

### Edit in Database (Advanced)

If you need to edit directly in MongoDB:

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Find `packages` collection
4. Click on package → Edit
5. Make changes → Update

---

## 🚀 Deployment

### Deploy Backend to Heroku

1. [Create Heroku Account](https://www.heroku.com/)
2. Install Heroku CLI
3. Run:

```bash
heroku login
heroku create momentry-api
git push heroku main
```

4. Set environment variables:

```bash
heroku config:set MONGODB_URI=your-mongodb-url
heroku config:set JWT_SECRET=your-secret
heroku config:set RAZORPAY_KEY_ID=your-key
heroku config:set RAZORPAY_KEY_SECRET=your-secret
```

### Deploy Frontend to Vercel

1. [Connect GitHub to Vercel](https://vercel.com/)
2. Import repository
3. Set environment variables:
   - `VITE_API_URL=https://momentry-api.herokuapp.com/api`
   - `VITE_GOOGLE_CLIENT_ID=your-client-id`
   - `VITE_RAZORPAY_KEY_ID=your-key-id`
4. Deploy!

### Domain Setup

1. Buy domain from:
   - [GoDaddy](https://www.godaddy.com/)
   - [Namecheap](https://www.namecheap.com/)
   - [Domain.com](https://www.domain.com/)

2. Point DNS to Vercel (for frontend)
3. Create API subdomain (api.momentry.in) → Point to Heroku

---

## 🧪 Testing Checklist

- [ ] Signup works
- [ ] Login works
- [ ] Google OAuth works
- [ ] Can view packages
- [ ] Can search/filter packages
- [ ] Can book package
- [ ] Payment flow works (test mode)
- [ ] Admin can add packages
- [ ] Admin can edit packages
- [ ] Admin can deactivate packages
- [ ] Footer contact info displays

---

## 🐛 Troubleshooting

### "Cannot find module" error

```bash
# Delete node_modules and reinstall
rm -r node_modules
npm install
```

### MongoDB Connection Error

- Check connection string format
- Whitelist your IP in MongoDB Atlas
- Check credentials are correct

### Google OAuth Not Working

- Make sure Client ID is added to `.env`
- Check redirect URLs match in Google Cloud Console

### Razorpay Payment Fails

- Check you're using Test Keys in test mode
- Check Key ID and Secret are correct
- Verify CORS is enabled (backend has CORS middleware)

---

## 📞 Support

For issues:

1. Check browser console (F12 → Console tab)
2. Check terminal for error messages
3. Check `.env` files are created correctly
4. Restart both frontend and backend servers

---

## ✅ You're All Set!

Your MOMENTRY travel website is ready! 🎉

**Next Steps:**

1. Customize colors in `/frontend/tailwind.config.js`
2. Add your logo and branding
3. Collect influencer referrals
4. Deploy to production
