# 📋 MOMENTRY - QUICK REFERENCE GUIDE

## 🎯 Essential Links & URLs

| What            | Local                       | Production                |
| --------------- | --------------------------- | ------------------------- |
| **Frontend**    | http://localhost:3000       | https://momentry.in       |
| **Backend API** | http://localhost:5000/api   | https://api.momentry.in   |
| **Admin Panel** | http://localhost:3000/admin | https://momentry.in/admin |
| **MongoDB**     | Local or Atlas              | MongoDB Atlas             |
| **Git Repos**   | N/A                         | github.com/YOUR_USERNAME  |

---

## 🚀 Quick Start (Local Development)

### Terminal 1 - Frontend

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Terminal 2 - Backend

```bash
cd backend
npm install
npm run dev
# Opens at http://localhost:5000
```

### Test Everything Works

- Homepage loads ✅
- Can sign up/login ✅
- Google Auth works ✅
- Can book packages ✅
- Admin panel accessible ✅

---

## 🔑 Key Credentials

### Google OAuth

- **Client ID:** `662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com`
- **Setup:** Already configured in `.env.local`

### Create Admin User

```javascript
// MongoDB command
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } });
```

### Razorpay

- Get keys from [dashboard.razorpay.com](https://dashboard.razorpay.com)
- Add to backend `.env`

---

## 🎨 Design System (From PPT)

### Color Palette

```
Brass (Primary):    #C2A36B   ← Main accent color
Ivory (Background): #F7F3EC   ← Light backgrounds
Ink (Headings):     #241C15   ← Dark text
Charcoal (Dark):    #4A4036   ← Medium dark
White:              #FFFFFF   ← Pure white
```

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Size:** 16px base, scale up for headings

### Components Updated

- ✅ Hero section - Brass button
- ✅ Package cards - Brass accents
- ✅ Payment page - Brass theme
- ✅ Booking confirmation - Brass accents
- ✅ Travel Hub - Brass highlights

---

## 📝 File Structure

```
ayush travel site/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           ← Hero + Handpicked
│   │   │   ├── Payment.jsx        ← Razorpay checkout
│   │   │   ├── BookingConfirmation.jsx  ← Celebration
│   │   │   ├── MyBookings.jsx     ← Travel Hub
│   │   │   ├── Admin.jsx          ← Admin panel
│   │   │   └── [others].jsx
│   │   ├── components/
│   │   │   ├── PackageCard.jsx    ← Updated design
│   │   │   ├── Header.jsx
│   │   │   └── [others].jsx
│   │   └── styles/
│   │       └── global.css         ← Fonts
│   ├── tailwind.config.js         ← Brass colors
│   ├── .env.local                 ← Google Client ID
│   └── package.json
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── .env                       ← Keys & secrets
│   └── package.json
├── DEPLOYMENT_GUIDE.md            ← Deploy to Vercel/Render
├── ADMIN_SETUP_GUIDE.md          ← Admin panel setup
├── GIT_DEPLOYMENT_GUIDE.md       ← Git & GitHub setup
└── README.md
```

---

## 🔄 Development Workflow

### Making Changes

```bash
# 1. Make code changes
# 2. Test locally
npm run dev

# 3. Push to GitHub
git add .
git commit -m "Description"
git push origin main

# 4. Auto-deploy
# Vercel & Render auto-deploy on push!
```

### Git Commands Cheat Sheet

```bash
# First time setup
git init
git add .
git commit -m "message"
git remote add origin https://github.com/user/repo.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "message"
git push
```

---

## 🧪 Testing Checklist

### Frontend Features

- [ ] Homepage loads with new design
- [ ] Navigation works
- [ ] Sign up/Login works
- [ ] Google OAuth works
- [ ] Packages display correctly
- [ ] Package cards show brass accents
- [ ] Booking flow works
- [ ] Payment page displays correctly
- [ ] Booking confirmation shows celebration
- [ ] Travel Hub dashboard works
- [ ] Admin panel accessible

### Backend Features

- [ ] MongoDB connected
- [ ] Razorpay integration works
- [ ] JWT authentication works
- [ ] API endpoints respond correctly
- [ ] Bookings save to database
- [ ] Payments process correctly

---

## 🆘 Common Issues & Fixes

### "Google Auth Not Working"

**Fix:** Update `.env.local` with correct Client ID and verify redirect URIs in Google Cloud Console

### "API Connection Error"

**Fix:** Make sure backend is running on :5000 and `VITE_API_URL` is correct in `.env.local`

### "Admin Panel 403 Forbidden"

**Fix:** Update user in MongoDB with `isAdmin: true`

### "Colors Not Updating"

**Fix:**

1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server (Ctrl+C, npm run dev)
3. Check tailwind.config.js has correct colors

### "Deploy Failed"

**Fix:** Check build logs on Vercel/Render dashboard and verify all env vars are set

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com

---

## ✅ Deployment Checklist

- [ ] `.env.local` configured with Google Client ID
- [ ] `.env` configured in backend
- [ ] All colors changed to Brass palette
- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend starts without errors: `npm start`
- [ ] GitHub repos created
- [ ] Vercel project created
- [ ] Render service created
- [ ] Environment variables set on Vercel
- [ ] Environment variables set on Render
- [ ] Domain connected to Vercel
- [ ] DNS propagated (24-48 hrs)
- [ ] Admin panel accessible
- [ ] Google Auth working in production
- [ ] Razorpay integration tested
- [ ] Full booking flow tested

---

## 🎉 Next Steps

1. ✅ Review this guide
2. ✅ Test all features locally
3. ✅ Create GitHub accounts
4. ✅ Set up Vercel & Render
5. ✅ Deploy to production
6. ✅ Connect domain
7. ✅ Configure DNS
8. ✅ Test in production
9. ✅ Set up monitoring
10. ✅ Launch! 🚀
