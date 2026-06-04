# QA Testing & Quality Assurance Checklist

## 🎯 Testing Overview

This document guides you through **comprehensive testing** of your MOMENTRY website to ensure everything works perfectly before launch.

---

## ✅ Phase 1: Basic Functionality Testing

### User Registration & Login

- [ ] **Signup works**
  - Go to http://localhost:3000/signup
  - Fill in: Name, Email, Password, Confirm Password
  - Click Sign Up
  - Redirects to home page
  - Can see username in header

- [ ] **Email validation**
  - Try signup with invalid email (e.g., "test")
  - Should show error: "Invalid email"
  - Try with existing email
  - Should show error: "Email already registered"

- [ ] **Password validation**
  - Passwords must match
  - Try mismatched passwords
  - Should show error: "Passwords do not match"

- [ ] **Login works**
  - Go to http://localhost:3000/login
  - Enter correct email/password from signup
  - Click Login
  - Should see home page with username

- [ ] **Wrong password fails**
  - Enter correct email, wrong password
  - Should show error: "Invalid credentials"

- [ ] **Logout works**
  - Click Logout button in header
  - Should redirect to home
  - Cannot access /bookings without logging in

### Google OAuth Login

- [ ] **Google login button appears**
  - Go to login page
  - Google login button visible
  - (Note: Works only if Google Client ID is set)

- [ ] **Signup with Google works** (optional if credentials ready)
  - Click Google Sign Up
  - Choose Google account
  - Should create user and login

---

## ✅ Phase 2: Package Browsing

### Home Page

- [ ] **Home page loads**
  - http://localhost:3000 loads
  - Shows hero section with title
  - Shows featured packages (at least 6)

- [ ] **Stats section displays**
  - Shows 50+ Destinations
  - Shows 5000+ Travelers
  - Shows 4.8/5 Rating
  - Shows 100% Safe

- [ ] **Featured packages show**
  - At least 6 packages visible
  - Each shows price, destination, duration
  - "View Details" button works

- [ ] **"View All Packages" works**
  - Click button
  - Goes to /packages page

### Packages Page

- [ ] **All packages load**
  - See all 6+ packages
  - Can scroll through them
  - Package cards look good

- [ ] **Search works**
  - Type "Goa" in search
  - Shows only Goa packages
  - Clear search
  - Shows all again

- [ ] **Filters work**
  - Click "Filters" button
  - Set min price: 5000
  - Set max price: 10000
  - Should show only packages in range

- [ ] **Destination filter works**
  - Select "Kerala" from dropdown
  - Shows only Kerala packages

- [ ] **Duration filter works**
  - Select "5 days" from dropdown
  - Shows only 5-day packages

- [ ] **Reset filters works**
  - Set multiple filters
  - Click "Reset"
  - All filters cleared
  - Shows all packages again

### Package Detail Page

- [ ] **Package detail page loads**
  - Click on any package
  - Goes to /packages/{id} page
  - Shows full image
  - Shows all details

- [ ] **All information displays**
  - Shows title
  - Shows destination
  - Shows duration
  - Shows max participants
  - Shows price
  - Shows description
  - Shows highlights list
  - Shows itinerary (if available)

- [ ] **Quantity selector works**
  - Click "+" to increase
  - Click "-" to decrease
  - Total price updates
  - Can't go above max participants
  - Can't go below 1

---

## ✅ Phase 3: Booking & Payment

### Creating Booking

- [ ] **Must be logged in to book**
  - Logout
  - Try to click "Book Now"
  - Should redirect to login

- [ ] **Book package as logged-in user**
  - Login
  - Go to package detail
  - Select quantity
  - Click "Book Now"
  - Should redirect to payment page

- [ ] **Booking details show correctly**
  - Payment page shows package name
  - Shows total price
  - Shows number of travelers
  - Shows destination

### Razorpay Payment

- [ ] **Payment form loads**
  - Razorpay payment button visible
  - Shows "Pay ₹XXX with Razorpay"

- [ ] **Test payment (using test card)**
  - Click payment button
  - Razorpay checkout opens
  - Use test card: 4111 1111 1111 1111
  - Expiry: 12/25
  - CVV: 123
  - OTP: 123456
  - Click Pay
  - Should show success message

- [ ] **Payment confirmation shows**
  - Redirected to /bookings
  - Booking appears in list
  - Status shows "confirmed"
  - Amount shows correctly

### My Bookings Page

- [ ] **Bookings page loads**
  - http://localhost:3000/bookings
  - Shows all user's bookings
  - Shows booking details

- [ ] **Booking info is correct**
  - Package name correct
  - Destination correct
  - Number of travelers correct
  - Amount correct
  - Status shows "confirmed"

---

## ✅ Phase 4: Admin Panel

### Admin Login

- [ ] **Admin login works**
  - Go to http://localhost:3000/login
  - Email: admin@momentry.in
  - Password: admin123
  - Click Login
  - Logged in successfully

- [ ] **Admin can access admin panel**
  - Click "Admin Panel" in header
  - Goes to http://localhost:3000/admin
  - Shows table of packages

### Add Package

- [ ] **Add package form opens**
  - Click "Add Package" button
  - Modal dialog opens
  - All fields visible

- [ ] **Create new package**
  - Fill in all required fields:
    - Title: "Sikkim Snow Trek"
    - Destination: "Sikkim"
    - Price: 13500
    - Duration: 6
    - Max Participants: 12
    - Description: "Trek through snow-covered mountains"
    - Highlights: Add 3-4
    - Active: Checked
  - Click "Save Package"
  - Should close modal
  - New package appears in table

- [ ] **Validation works**
  - Try to save without title
  - Should show error
  - Try invalid price (negative)
  - Should show error

### Edit Package

- [ ] **Edit existing package**
  - Click edit icon on any package
  - Form opens with current data
  - All fields pre-filled correctly

- [ ] **Update package**
  - Change price from 5999 to 6999
  - Change description
  - Click "Save Package"
  - Table updates
  - New price shows in package card

- [ ] **Can't reduce price below cost**
  - Try to set price to 1000 (unrealistic)
  - System should allow (no validation for this)
  - Manually verify it makes sense

### Deactivate/Activate Package

- [ ] **Deactivate package**
  - Find active package in admin
  - Click "Deactivate"
  - Status changes to "Inactive"
  - Package disappears from /packages page
  - Can't book deactivated package

- [ ] **Activate package back**
  - Click "Activate"
  - Status changes to "Active"
  - Package reappears on /packages
  - Can book again

### Delete Package

- [ ] **Delete package**
  - Click delete icon (trash)
  - Confirm deletion
  - Package removed from table
  - Package removed from database

---

## ✅ Phase 5: UI/UX Testing

### Responsive Design

- [ ] **Mobile view (320px width)**
  - Press F12 in browser
  - Set device to "iPhone SE"
  - Website should resize
  - No horizontal scrolling
  - All buttons clickable

- [ ] **Tablet view (768px width)**
  - Set device to "iPad"
  - Layout adapts
  - 2-column grid for packages
  - Navigation works

- [ ] **Desktop view (1920px width)**
  - Should show 3-column grid
  - All content visible
  - Navigation clear

### Colors & Branding

- [ ] **Vibrant colors used**
  - Primary red (#FF6B6B) on buttons
  - Teal (#4ECDC4) on secondary buttons
  - Yellow (#FFE66D) for highlights
  - Dark gray (#2D3436) for text

- [ ] **Consistent styling**
  - All buttons same style
  - All cards same style
  - Fonts consistent
  - Spacing consistent

### Navigation

- [ ] **Header navigation works**
  - Click "Home" → goes to /
  - Click "Packages" → goes to /packages
  - Click "My Bookings" → goes to /bookings (if logged in)
  - Click "Admin Panel" → goes to /admin (if admin)

- [ ] **Mobile menu works**
  - Resize to mobile
  - Click hamburger menu
  - Menu opens
  - Can navigate
  - Menu closes when clicking a link

### Footer

- [ ] **Footer displays**
  - Scroll to bottom
  - Footer visible

- [ ] **Footer contact info shows**
  - Phone number visible
  - Email visible
  - Address visible
  - Social media icons visible

- [ ] **Footer links work**
  - Click "Home" → goes to /
  - Click "Packages" → goes to /packages
  - All links functional

---

## ✅ Phase 6: Error Handling

### Network Errors

- [ ] **Stop backend server**
  - Close backend terminal
  - Try to load /packages
  - Shows appropriate error or still works (cached data)
  - Should handle gracefully

### Validation Errors

- [ ] **Empty form submission**
  - Try to submit empty forms
  - Should show validation errors
  - Don't allow invalid data

### Payment Errors

- [ ] **Failed payment handling**
  - Use test card: 4000 0000 0000 0002 (decline card)
  - Try to pay
  - Should show error message
  - Booking stays in pending
  - Can retry

---

## ✅ Phase 7: Performance Testing

### Page Load Speed

- [ ] **Home page loads < 3 seconds**
  - Open DevTools (F12)
  - Go to Performance tab
  - Reload page
  - Check load time

- [ ] **Packages page loads < 3 seconds**
  - Go to /packages
  - Check load time
  - Search doesn't lag
  - Filters respond immediately

- [ ] **Images load properly**
  - All package images load
  - No broken image icons
  - Images are optimized (not huge files)

### Smooth Interactions

- [ ] **No jank/stuttering**
  - Scroll through packages
  - Should be smooth
  - Filters apply instantly
  - Buttons respond immediately

---

## ✅ Phase 8: Security Testing

### Authentication

- [ ] **Can't access admin without login**
  - Go to http://localhost:3000/admin
  - Should redirect to /
  - Can't see admin panel

- [ ] **Can't access bookings without login**
  - Go to http://localhost:3000/bookings
  - Should redirect to /login

- [ ] **Token expires properly**
  - Login
  - Wait 30 days (or manually test)
  - Should auto-logout
  - Can login again

### Data Privacy

- [ ] **Passwords never shown**
  - Password field is masked
  - Shows as dots/asterisks
  - Not visible in network requests

- [ ] **Sensitive data encrypted**
  - Payment info goes through Razorpay
  - Your backend never sees card details

---

## ✅ Phase 9: Database Testing

### Data Persistence

- [ ] **Bookings persist**
  - Create booking
  - Close browser
  - Open again
  - Booking still there
  - Data in MongoDB

- [ ] **Packages persist**
  - Add package in admin
  - Refresh page
  - Package still there
  - Can edit it

- [ ] **Users persist**
  - Create user
  - Logout
  - Login with same credentials
  - Works

---

## ✅ Phase 10: Cross-Browser Testing

### Google Chrome

- [ ] All features work
- [ ] No console errors (F12 → Console)
- [ ] Responsive design works

### Firefox

- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Safari (Mac/iOS)

- [ ] All features work
- [ ] Payment works
- [ ] No styling issues

### Edge

- [ ] All features work
- [ ] Google OAuth works
- [ ] Payment works

---

## 🐛 Bug Tracking

### When You Find a Bug

Create a table to track:

| Bug # | Description                   | Severity | Fixed | Date       |
| ----- | ----------------------------- | -------- | ----- | ---------- |
| 1     | Search doesn't work on mobile | Medium   | Yes   | 2024-01-15 |
| 2     | Footer text wraps on tablet   | Low      | No    | -          |
| 3     | Payment button doesn't appear | High     | Yes   | 2024-01-15 |

---

## 📊 Final QA Checklist

Before going live, check:

- [ ] All 81 tests above passed
- [ ] No critical bugs remaining
- [ ] Payment tested with real amount (₹1-10)
- [ ] Admin panel fully functional
- [ ] 3+ people tested independently
- [ ] No broken images
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Security measures in place

---

## 🎉 Ready for Launch!

When all tests pass, you're ready to:

1. Deploy to production
2. Enable Google OAuth with live credentials
3. Switch to Razorpay live keys
4. Buy domain and go live
5. Start marketing!

---

## 📞 Need Help?

If a test fails:

1. Note the exact steps to reproduce
2. Check browser console (F12)
3. Check server terminal for errors
4. Try restarting frontend/backend
5. Check the SETUP_GUIDE.md for troubleshooting

Great job testing! 🚀
