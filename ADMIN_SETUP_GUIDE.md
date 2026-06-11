# 🔐 ADMIN PANEL ACCESS GUIDE

## Quick Start

### Access Admin Panel

- **Local:** `http://localhost:3000/admin`
- **Production:** `https://momentry.in/admin`

### Default Admin Access

1. **Create Admin User (First Time Setup)**

```javascript
// Using MongoDB Compass or shell
db.users.insertOne({
  name: "Admin",
  email: "admin@momentry.in",
  password: "hashed_password", // Use bcrypt to hash
  isAdmin: true,
  createdAt: new Date(),
});
```

2. **Login Credentials**

```
Email: admin@momentry.in
Password: Your password
```

3. **Make User Admin (Existing Users)**

```javascript
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } });
```

---

## Admin Panel Features

### 📊 Dashboard

- Revenue (MTD) - Total monthly revenue
- Bookings - Total confirmed bookings
- Active Trips - Currently running journeys
- Average Rating - Customer satisfaction score

### ✈️ Manage Trips

- Add new trip with wizard
- Edit existing trips
- Delete trips
- Upload trip images
- Set difficulty level, capacity, duration
- Manage pricing and discounts

### 👥 Users & Bookings

- View all users
- Track bookings by status
- Refund management
- User analytics

### 💰 Financials

- Razorpay transaction history
- Revenue breakdown
- Payment failures log
- Refund tracking

### 📝 Content Manager (CMS)

- Edit static pages
- Manage testimonials
- Update philosophy section
- Manage curator profiles

### ⭐ Review Moderation

- Approve/reject reviews
- Flag inappropriate content
- Feature best reviews

### ⚙️ Settings

- Update admin password
- Configure email templates
- Set platform fees
- Manage payment gateway

---

## Protected Routes

```javascript
// Only admin users can access:
/admin                    / /
  Dashboard /
  admin /
  trips / // Manage trips
  admin /
  users / // Users list
  admin /
  bookings / // Bookings
  admin /
  payments / // Financial data
  admin /
  reviews / // Review moderation
  admin /
  settings; // Settings
```

---

## Authentication

Admin access is protected by:

1. **JWT Token** - Must be logged in
2. **isAdmin Flag** - Must have admin role in database
3. **Session** - Token stored in localStorage

If you see **403 Forbidden**:

- Check if user has `isAdmin: true` in database
- Clear browser cache and re-login
- Verify JWT token is valid

---

## Troubleshooting Admin Panel

### Admin Panel Not Loading

1. Verify you're logged in (check Login page)
2. Make sure `isAdmin: true` in database
3. Check browser console for errors (F12)
4. Clear cookies: DevTools → Application → Clear storage

### "Access Denied" Error

- Update your user in MongoDB:

```javascript
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } });
```

### Can't Login

- Verify MongoDB is running
- Check backend is connected (`npm run dev` in backend folder)
- Verify email exists in database

---

## Support

For issues accessing admin panel:

1. Check browser console (F12 → Console tab)
2. Verify MongoDB connection
3. Ensure backend is running
4. Check user has isAdmin flag set
