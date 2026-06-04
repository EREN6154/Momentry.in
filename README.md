# MOMENTRY - Complete Travel Website

## 📱 Project Overview

**MOMENTRY** is a full-stack travel agency platform for budget backpacker trips across India.

### Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Payments**: Razorpay
- **Authentication**: JWT + Google OAuth

---

## 🎯 Features

### User Features

✅ User registration & login (email & Google OAuth)
✅ Browse travel packages with search & filters
✅ View detailed package information
✅ Book packages with quantity selection
✅ Secure Razorpay payment processing
✅ View booking history

### Admin Features

✅ Create, edit, delete packages
✅ Activate/deactivate packages
✅ Manage package details (price, duration, highlights)
✅ View all bookings

---

## 📁 Project Structure

```
ayush travel site/
├── frontend/                 (React + Vite)
│   ├── src/
│   │   ├── components/       (Header, Footer, PackageCard)
│   │   ├── pages/            (Home, Packages, Admin, Payment, etc.)
│   │   ├── store/            (Zustand state management)
│   │   ├── utils/            (API calls, helpers)
│   │   ├── styles/           (Global CSS)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── index.html
│
├── backend/                  (Node.js + Express)
│   ├── models/               (User, Package, Booking, Payment)
│   ├── routes/               (Auth, Packages, Bookings, Payments)
│   ├── controllers/          (Business logic)
│   ├── middleware/           (Auth verification)
│   ├── config/               (Database connection)
│   ├── utils/                (Helpers, JWT, bcrypt)
│   ├── server.js             (Entry point)
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── docs/                     (Documentation)
    ├── SETUP_GUIDE.md        (Local development setup)
    ├── DATA_EDITING_GUIDE.md (How to manage packages)
    ├── RAZORPAY_GUIDE.md     (Payment integration)
    ├── QA_TESTING_GUIDE.md   (Testing checklist)
    └── MARKETING_GUIDE.md    (Marketing strategy)
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MongoDB account
- Google OAuth credentials
- Razorpay account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Visit: http://localhost:3000

---

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[DATA_EDITING_GUIDE.md](./DATA_EDITING_GUIDE.md)** - Managing travel packages
- **[RAZORPAY_GUIDE.md](./RAZORPAY_GUIDE.md)** - Payment integration
- **[QA_TESTING_GUIDE.md](./QA_TESTING_GUIDE.md)** - Testing checklist
- **[MARKETING_GUIDE.md](./MARKETING_GUIDE.md)** - Marketing strategy

---

## 🔐 Admin Credentials (Default)

**Email:** admin@momentry.in  
**Password:** admin123

⚠️ Change these before production!

---

## 💳 Sample Test Payment

**Card:** 4111 1111 1111 1111  
**Expiry:** Any future date  
**CVV:** Any 3 digits  
**OTP:** 123456

---

## 🌐 Deployment

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Heroku
- **Database**: MongoDB Atlas
- **Domain**: Point to Vercel, create API subdomain for Heroku

See SETUP_GUIDE.md for detailed deployment instructions.

---

## 🧪 Testing

Run the QA Testing Checklist in [QA_TESTING_GUIDE.md](./QA_TESTING_GUIDE.md)

---

## 📊 Key Components

### Database Models

- **User** - Authentication & profile
- **Package** - Travel packages
- **Booking** - User bookings
- **Payment** - Payment records

### API Endpoints

```
POST   /api/auth/signup           - User registration
POST   /api/auth/login            - User login
POST   /api/auth/google           - Google OAuth
GET    /api/packages              - Get all packages
GET    /api/packages/:id          - Get package details
POST   /api/packages              - Create package (admin)
PUT    /api/packages/:id          - Update package (admin)
DELETE /api/packages/:id          - Delete package (admin)
POST   /api/bookings              - Create booking
GET    /api/bookings              - Get user bookings
POST   /api/payments/create-order - Create payment order
POST   /api/payments/verify       - Verify payment
```

---

## 🎨 Branding Colors

- **Primary Red:** #FF6B6B
- **Secondary Teal:** #4ECDC4
- **Tertiary Yellow:** #FFE66D
- **Dark Gray:** #2D3436
- **Light Gray:** #F5F5F5

---

## 📱 Features by User Type

### Regular User

- [ ] Browse packages
- [ ] Search & filter
- [ ] Register/Login
- [ ] Book packages
- [ ] Pay with Razorpay
- [ ] View bookings
- [ ] Google OAuth login

### Admin User

- [ ] All user features +
- [ ] Access admin panel
- [ ] Add new packages
- [ ] Edit packages
- [ ] Delete packages
- [ ] Activate/deactivate packages
- [ ] Manage highlights & itinerary

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
PORT=5000
ADMIN_EMAIL=admin@momentry.in
ADMIN_PASSWORD=admin123
```

**Frontend (.env)**

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=...
VITE_RAZORPAY_KEY_ID=...
```

---

## 🛠️ Tech Stack Details

### Frontend Libraries

- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icons
- **Google OAuth** - Auth

### Backend Libraries

- **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT
- **Razorpay** - Payments
- **CORS** - Cross-origin

---

## 🚀 Next Steps

1. **Complete Setup** - Follow SETUP_GUIDE.md
2. **Add Sample Data** - Done automatically (6 packages)
3. **Test Admin Panel** - Login as admin
4. **Create Google Credentials** - See SETUP_GUIDE
5. **Setup Razorpay** - See RAZORPAY_GUIDE
6. **Run QA Tests** - Use QA_TESTING_GUIDE
7. **Deploy** - See SETUP_GUIDE deployment section
8. **Market** - Follow MARKETING_GUIDE

---

## 📞 Support

For issues, check:

1. Browser console (F12 → Console)
2. Server terminal for errors
3. .env file is properly configured
4. MongoDB connection is active
5. Both frontend and backend are running

---

## 📄 License

This project is for MOMENTRY Travel Agency.

---

## 🎉 You're Ready!

Start with the Setup Guide and get building! 🚀

**Happy coding & safe travels!** ✈️
