# Razorpay Integration Complete Guide

## 🎯 What is Razorpay?

Razorpay is **India's safest payment gateway** that handles:

- Credit/Debit cards
- UPI (Google Pay, PhonePe, etc.)
- Net Banking
- Wallets
- EMI options

All payments are encrypted and PCI-DSS compliant (industry standard).

---

## 📋 Step-by-Step Setup

### 1. Create Razorpay Account

**Go to:** https://razorpay.com/

1. Click **"Sign Up"**
2. Enter email and create password
3. Verify your email (check inbox)
4. Complete onboarding form with:
   - Business name: "MOMENTRY"
   - Business type: "Travel Agency"
   - Phone number
   - Agree to terms

### 2. Complete KYC (Know Your Customer)

⚠️ **Required for live payments**

1. **Login** to Razorpay Dashboard
2. Go to **Account Settings** → **Profile**
3. Upload documents:
   - PAN Card (front & back)
   - Aadhar Card (front & back)
   - Bank Account Details
   - Address proof
4. Submit and wait for approval (24-48 hours)

### 3. Get Your API Keys

**After KYC approval:**

1. In Dashboard, click **Settings** ⚙️
2. Select **API Keys**
3. You'll see two tabs:
   - **Test Keys** (for development/testing)
   - **Live Keys** (for real payments)

### Using Test Keys (Recommended First)

1. Click on **Test Tab**
2. You'll see:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
   - **Key Secret**: `xxxxxxxxxxxxxxxxxxxx`
3. Copy both

---

## 🔧 Integration in Your Website

### Backend Integration

**File:** `/backend/.env`

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-secret-key-here
```

**How it works:**

- When user initiates payment, backend creates an order with Razorpay
- Razorpay returns an order ID and amount
- Frontend passes this to Razorpay checkout

### Frontend Integration

**File:** `/frontend/.env`

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**How it works:**

- User clicks "Book Now" → goes to payment page
- Page loads Razorpay's secure form
- User enters payment details (card, UPI, etc.)
- Razorpay encrypts and processes securely
- Payment confirmation sent to backend
- Backend verifies signature (extra security layer)
- Booking confirmed

---

## 💳 Test Payments

### Test Card Details

**Use these ONLY in Test Mode:**

#### Test Card 1: Success

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
OTP: 123456
```

#### Test Card 2: Decline

```
Card Number: 4000 0000 0000 0002
This card will fail (for testing error handling)
```

#### Test UPI

```
UPI ID: success@razorpay (to simulate success)
UPI ID: failure@razorpay (to simulate failure)
```

### How to Test Payment

1. **Start backend and frontend** (as in Setup Guide)
2. **Go to website**: http://localhost:3000
3. **Sign up** with test email
4. **Book a package**
5. **Go to payment page**
6. **Fill test card details** above
7. **Submit payment**
8. **See success message** ✅

---

## 🔐 Payment Security

### How Payments Are Secured:

1. **Encryption**: All data encrypted with SSL/TLS
2. **Tokenization**: Card details never touch your server
3. **Signature Verification**: Backend verifies payment was genuine
4. **PCI-DSS Compliance**: Industry standard security

### Backend Verification Process

```javascript
// File: /backend/controllers/paymentController.js

// Create signature
const body = orderId + "|" + paymentId;
const expectedSignature = crypto
  .createHmac("sha256", RAZORPAY_SECRET)
  .update(body.toString())
  .digest("hex");

// Check if signature matches (proof payment is real)
if (expectedSignature === signature) {
  // Payment is genuine, confirm booking
} else {
  // Payment tampered, reject
}
```

---

## 📊 Razorpay Dashboard Features

### Payments Tab

- See all transactions
- Filter by status (success, failed, refunded)
- Download receipts
- Search by payment ID

### Settlements

- Track when money arrives in your bank
- Usually within 2-3 business days
- Automatic settlement (no manual approval)

### Refunds

- Issue refunds from dashboard
- User's money returned automatically
- Takes 5-10 business days

### Analytics

- Revenue tracking
- Conversion rates
- Payment method breakdown

---

## 🚀 Switching to Live Keys

### When You're Ready for Real Payments:

1. **Complete KYC** (upload documents, wait for approval)
2. **In Razorpay Dashboard**:
   - Go to **API Keys**
   - Switch to **Live Tab**
   - Copy Live Key ID and Secret

3. **Update Backend (.env)**:

   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your-live-secret
   ```

4. **Update Frontend (.env)**:

   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   ```

5. **Important**: Remove test keys from production!

### Test Payment in Live Mode

Before going fully live, test with:

- Real card details (use your own card)
- Real UPI
- Small amount (₹1)

---

## 💰 Fees & Pricing

### Razorpay Fees:

**Standard Pricing:**

- Credit Card: 2% + ₹0 (online payments)
- Debit Card: 0.90% + ₹0
- UPI: 0% (free for you!) ✨
- Net Banking: 0% (free for you!) ✨
- Wallet: 2%

**Example:**

- If customer pays ₹1,000 via credit card
- You receive: ₹980 (Razorpay takes ₹20)
- You set package price, customer pays that, Razorpay takes fee

---

## 📧 Notifications & Emails

### Your Customers Receive:

1. **Payment Confirmation Email**
   - Order details
   - Payment reference
   - Link to download invoice

2. **Booking Confirmation Email**
   - Package details
   - Trip date
   - Contact information

### You Receive:

1. **Order Created** - when user initiates payment
2. **Payment Successful** - when payment confirmed
3. **Daily Settlement Report** - amount transferred to bank

---

## 🐛 Troubleshooting

### Payment Button Doesn't Appear

- Check `VITE_RAZORPAY_KEY_ID` in `.env`
- Check frontend console (F12 → Console)
- Restart frontend: `npm run dev`

### "Invalid Key ID" Error

- Verify key copied correctly (no extra spaces)
- Check you're using Test Keys if in test mode
- Check you're using Live Keys if in live mode

### Payment Fails but Money Deducted

- Check Razorpay Dashboard → Refunds
- Issue refund if needed
- Customer gets money back in 5-10 days

### "Signature Mismatch" Error

- Check backend `.env` has correct Secret Key
- Verify payment wasn't tampered
- Check backend console for errors

---

## 📲 Mobile Payments

### Your Website Supports:

1. **UPI** (Google Pay, PhonePe, WhatsApp Pay)
   - Automatic through Razorpay
   - Works on mobile automatically

2. **Mobile Wallets**
   - Airtel Money
   - Amazon Pay
   - Mobikwik

3. **EMI** (Installment Plans)
   - Customer can pay in 3/6/12 months
   - Razorpay handles interest

---

## 📞 Getting Help

### Razorpay Support:

- **Chat**: Click support icon in Razorpay Dashboard
- **Email**: support@razorpay.com
- **Phone**: 1800-103-0002 (toll-free)
- **Community**: https://community.razorpay.com/

### Common Questions:

**Q: Is Razorpay safe?**
A: Yes! It's trusted by 40,000+ Indian businesses and is PCI-DSS certified.

**Q: How long to get money?**
A: 1-2 business days after payment. Saturdays/Sundays it's 2-3 days.

**Q: Can I see transaction details?**
A: Yes, everything in Razorpay Dashboard (real-time).

**Q: What if customer disputes payment?**
A: Razorpay helps handle disputes. You can provide proof in dashboard.

---

## ✅ Checklist Before Going Live

- [ ] KYC completed and approved
- [ ] Live keys obtained
- [ ] Updated backend .env with live keys
- [ ] Updated frontend .env with live key ID
- [ ] Tested payment with small amount (₹1-10)
- [ ] Money received in bank account
- [ ] Verified email setup working
- [ ] Tested refund process
- [ ] Set up settlement schedule

---

## 🎉 You're Ready!

Your payment system is now ready to accept real payments from customers!

**Next:** Set up [Google OAuth](./SETUP_GUIDE.md#-google-oauth-setup) for easier customer login.
