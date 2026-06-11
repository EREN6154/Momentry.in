# ✅ PRE-DEPLOYMENT VERIFICATION CHECKLIST

## 🔍 Code Quality & Security Issues to Check

### Frontend Validation

- ✅ **HTML/Form Validation**
  - Email fields have `type="email"`
  - Password fields have `type="password"`
  - Required fields marked with `required`
  - Form validation working

- ✅ **XSS Prevention**
  - No `dangerouslySetInnerHTML` usage
  - All user inputs sanitized
  - No `eval()` or `innerHTML` manipulation

- ✅ **CORS Settings**
  - Backend allows localhost:3000 during dev
  - Will need production URLs on deployment

- ✅ **API Endpoint Security**
  - All protected routes require JWT token
  - Admin routes require `isAdmin: true`
  - Booking routes require user authentication

### Backend Configuration

- ⚠️ **Environment Variables (.env)**
  - [ ] Create `.env` file in `/backend` folder
  - [ ] Add all required variables (see below)

- ⚠️ **Database Security**
  - [ ] MongoDB connection string set
  - [ ] Strong JWT_SECRET created
  - [ ] Database access controlled

- ⚠️ **API Rate Limiting**
  - Consider adding rate limiting before production
  - Especially for login/forgot-password endpoints

### Frontend .env.local

```
VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000/api
```

### Backend .env (CREATE THIS!)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/momentry
JWT_SECRET=your_very_secure_random_secret_key_here_min_32_chars
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 Functional Testing Checklist

### Authentication Flow

- [ ] **Sign Up**
  - Create new account with email/password
  - Email validation works
  - Password strength check (optional)
  - Account created in database

- [ ] **Login**
  - Login with correct credentials works
  - Login with wrong credentials fails
  - Error messages are user-friendly

- [ ] **Forgot Password**
  - Forgot password form accessible
  - Email validation works
  - Reset link generation works
  - Reset link is valid for 1 hour

- [ ] **Reset Password**
  - Reset link from email works
  - Can set new password
  - Old password no longer works
  - User redirected to login after reset

- [ ] **Google OAuth**
  - Google sign-up button appears
  - Google sign-in works locally
  - User created in database on first login
  - JWT token generated correctly

- [ ] **Admin Login**
  - Admin user can login
  - Admin dashboard accessible
  - Regular users cannot access `/admin`
  - Admin routes protected

### User Experience

- [ ] **Navigation**
  - All links work
  - No broken links
  - Back buttons work

- [ ] **Forms**
  - All forms validate input
  - Error messages clear
  - Success messages shown
  - Loading states visible

- [ ] **Design**
  - All colors are Brass (#C2A36B)
  - Typography consistent
  - Responsive on mobile
  - No CSS errors in console

- [ ] **API Communication**
  - All API calls successful
  - Error handling works
  - Loading indicators show
  - Timeouts handled gracefully

### Payment Flow (Razorpay)

- [ ] **Booking Creation**
  - Can select package
  - Booking summary shows correct info
  - All prices calculated correctly

- [ ] **Payment Page**
  - Payment page loads
  - Razorpay modal opens
  - Test payment succeeds
  - Booking confirmation shows after payment

- [ ] **Booking Confirmation**
  - Celebration page displays
  - Countdown timer works
  - Can navigate to Travel Hub

### Travel Hub & Bookings

- [ ] **My Bookings Page**
  - Shows all user's bookings
  - Status badges correct
  - Timeline displays properly
  - Quick links work

- [ ] **Booking Details**
  - Correct package info shown
  - Dates and times correct
  - Traveler count shown
  - Amount charged correct

### Admin Panel

- [ ] **Admin Dashboard**
  - Loads without errors
  - Statistics display
  - Charts render (if any)

- [ ] **Manage Trips**
  - Can view all trips
  - Add new trip works
  - Edit trip works
  - Delete trip works

- [ ] **User Management**
  - Can view all users
  - Can set admin flag
  - Can view user bookings

- [ ] **Bookings Management**
  - Can view all bookings
  - Can filter by status
  - Can approve/reject if needed

---

## 🔐 Security Checklist

- [ ] **No Sensitive Data in Frontend**
  - No passwords in localStorage
  - No credit card data stored
  - Only JWT token and user info stored

- [ ] **Password Security**
  - Passwords hashed with bcrypt
  - Minimum password requirements enforced
  - No passwords in logs

- [ ] **API Security**
  - JWT tokens required for protected routes
  - Token expiration set (30 days)
  - CORS properly configured
  - Rate limiting considered

- [ ] **Database**
  - MongoDB Atlas with firewall
  - Strong password for database
  - Regular backups enabled
  - Connection strings not in git

- [ ] **Environment Variables**
  - No secrets in code
  - .env files not committed to git
  - Different secrets for dev/prod

---

## 🚀 Deployment Readiness

### Code Quality

- [ ] No `console.log()` statements left (use proper logging)
- [ ] No commented code blocks
- [ ] No unused imports or variables
- [ ] Proper error handling everywhere
- [ ] No hardcoded URLs (use environment variables)

### Performance

- [ ] API responses reasonable speed
- [ ] No N+1 database queries
- [ ] Images optimized
- [ ] CSS/JS minified (Vite does this)
- [ ] No memory leaks

### Browser Compatibility

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Mobile responsive
- [ ] Touch interactions work

---

## 📋 Final Checks Before Deployment

### Git & Version Control

- [ ] All code committed
- [ ] `.env` files NOT committed (use .gitignore)
- [ ] node_modules NOT committed
- [ ] Meaningful commit messages

### Documentation

- [ ] README.md updated
- [ ] Admin setup documented
- [ ] API endpoints documented
- [ ] Deployment guide created

### Monitoring & Logging

- [ ] Error logging configured
- [ ] User analytics working (optional)
- [ ] Monitor script added for production
- [ ] Alert system for errors

---

## 🔗 Production Deployment URLs

```
Frontend: https://momentry.vercel.app
Backend: https://momentry-backend.onrender.com
Database: MongoDB Atlas
Domain: momentry.in (after setup)
```

---

## ⚠️ Common Issues & Fixes

### "CORS Error" on Login

- Backend CORS not configured for frontend URL
- Fix: Update backend CORS settings

### "MongoDB Connection Failed"

- Connection string invalid
- Database doesn't exist
- Firewall blocking connection
- Fix: Verify MongoDB URI in .env

### "Google Auth Not Working"

- Redirect URIs not added to Google Cloud
- Client ID incorrect
- Fix: [GOOGLE_AUTH_FIX.md](GOOGLE_AUTH_FIX.md)

### "Forgot Password Not Sending Email"

- Email service not configured
- SMTP credentials missing
- Fix: Configure nodemailer in backend

---

## ✅ Sign-Off Checklist

Before deploying:

- [ ] Admin user created and verified
- [ ] All functional tests pass
- [ ] All security checks passed
- [ ] Code quality verified
- [ ] Environment variables configured
- [ ] No sensitive data in code
- [ ] Documentation complete
- [ ] Ready for production!

---

**Last Updated:** 2026-06-06
**Deployment Status:** Ready for Vercel & Render
