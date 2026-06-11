# 🔧 ADMIN USER SETUP GUIDE

## Your Admin Credentials

```
Email: veny5739@gmail.com
Password: Ayush@6154
```

## Setup Options

### Option 1: Create Admin User via MongoDB Compass (Recommended)

1. Open **MongoDB Compass**
2. Connect to your MongoDB instance
3. Navigate to your database → `users` collection
4. Click **Insert Document**
5. Paste this JSON:

```json
{
  "name": "Admin",
  "email": "veny5739@gmail.com",
  "password": "$2a$10$YOUR_HASHED_PASSWORD_HERE",
  "isAdmin": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

### Option 2: First-Time Login Registration

1. Go to http://localhost:3000/signup
2. Sign up with:
   ```
   Name: Admin
   Email: veny5739@gmail.com
   Password: Ayush@6154
   ```
3. After signup, update the user in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "veny5739@gmail.com" },
     { $set: { isAdmin: true } },
   );
   ```

### Option 3: MongoDB Shell Command (Direct)

```javascript
// Open MongoDB shell and run:
use momentry  // or your database name

db.users.insertOne({
  name: "Admin",
  email: "veny5739@gmail.com",
  password: "hashedPassword", // bcrypt hash of: Ayush@6154
  isAdmin: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## ⚠️ Important: Password Hashing

**Your password needs to be bcrypted!**

### Generate Hashed Password

**Online (Quick):**

1. Go to https://bcrypt.online/
2. Enter password: `Ayush@6154`
3. Keep rounds as 10
4. Copy the hashed result
5. Replace in the insert command above

**Using Node.js:**

```bash
cd backend
node
```

Then in Node:

```javascript
const bcrypt = require("bcryptjs");
const password = "Ayush@6154";
bcrypt.hash(password, 10, (err, hash) => {
  console.log(hash);
});
```

---

## ✅ Verify Admin Setup

1. Go to http://localhost:3000/login
2. Enter:
   ```
   Email: veny5739@gmail.com
   Password: Ayush@6154
   ```
3. Should login successfully
4. Go to http://localhost:3000/admin
5. Should see admin dashboard

---

## Troubleshooting Admin Access

### "Invalid Credentials" Error

- Password might not be hashed correctly
- Email might not match exactly (check for spaces)
- User might not exist in database

### "Access Denied" on /admin

- User exists but `isAdmin: false` in database
- Fix: Update user in MongoDB with `isAdmin: true`

### "MongoDB Connection Error"

- MongoDB server is not running
- Connection string is incorrect
- Database doesn't exist

---

## 📝 Database Check

To verify your admin user was created:

```javascript
// MongoDB Shell
db.users.findOne({ email: "veny5739@gmail.com" });
```

Should return:

```json
{
  "_id": ObjectId("..."),
  "name": "Admin",
  "email": "veny5739@gmail.com",
  "password": "$2a$10$...",
  "isAdmin": true,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

## ✅ Pre-Deployment Checklist

- [ ] Admin user created in MongoDB
- [ ] Admin can login with email: `veny5739@gmail.com`
- [ ] Admin can login with password: `Ayush@6154`
- [ ] Admin can access `/admin` dashboard
- [ ] Admin dashboard loads without errors
- [ ] Forgot Password link works
- [ ] Reset Password works
- [ ] Regular users cannot access `/admin`
- [ ] Google Auth working
- [ ] All colors are Brass (#C2A36B)
- [ ] Forms validate correctly

---

## 🚀 Ready for Deployment!

Once admin user is set up and verified, you're ready to deploy to Vercel & Render.

See [GIT_DEPLOYMENT_GUIDE.md](GIT_DEPLOYMENT_GUIDE.md) for deployment steps.
