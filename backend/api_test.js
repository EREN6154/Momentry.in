import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "http://localhost:5000/api";
const adminEmail = process.env.ADMIN_EMAIL || "admin@momentry.in";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

// Color helper
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

let userToken = "";
let adminToken = "";
let testPackageId = "";
let testBookingId = "";
let testPaymentId = "";
let testOrderId = "";
const testUserEmail = `qa_test_${Date.now()}@example.com`;
const testUserPassword = "Password123!";

async function runTests() {
  console.log(`${colors.cyan}${colors.bold}=== STARTING BACKEND INTEGRATION TESTS ===${colors.reset}\n`);
  
  let passedCount = 0;
  let failedCount = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passedCount++;
    } catch (error) {
      console.log(`❌ [FAIL] ${name}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Message: ${JSON.stringify(error.response.data)}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
      failedCount++;
    }
  }

  // 1. Health check
  await assertTest("GET /api/health returns status 200", async () => {
    const res = await axios.get(`${API_URL}/health`);
    if (res.status !== 200 || res.data.message !== "Server is running") {
      throw new Error(`Unexpected response: ${JSON.stringify(res.data)}`);
    }
  });

  // 2. User Sign Up
  await assertTest("POST /api/auth/signup registers a new user", async () => {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      name: "QA Tester",
      email: testUserEmail,
      password: testUserPassword,
    });
    if (res.status !== 201 || !res.data.token) {
      throw new Error("Signup failed or did not return a token");
    }
  });

  // 3. User Sign Up - Duplicate Email Validation
  await assertTest("POST /api/auth/signup fails with duplicate email", async () => {
    try {
      await axios.post(`${API_URL}/auth/signup`, {
        name: "Duplicate QA Tester",
        email: testUserEmail,
        password: testUserPassword,
      });
      throw new Error("Signup should have failed but succeeded");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Expected
        return;
      }
      throw err;
    }
  });

  // 4. User Login
  await assertTest("POST /api/auth/login logs in user and returns token", async () => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: testUserEmail,
      password: testUserPassword,
    });
    if (res.status !== 200 || !res.data.token) {
      throw new Error("Login failed or did not return token");
    }
    userToken = res.data.token;
  });

  // 5. User Login - Invalid Credentials
  await assertTest("POST /api/auth/login fails with wrong password", async () => {
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: testUserEmail,
        password: "WrongPassword",
      });
      throw new Error("Login should have failed but succeeded");
    } catch (err) {
      if (err.response && (err.response.status === 400 || err.response.status === 401)) {
        // Expected
        return;
      }
      throw err;
    }
  });



  // 6. Get All Packages
  await assertTest("GET /api/packages retrieves list of packages", async () => {
    const res = await axios.get(`${API_URL}/packages`);
    if (res.status !== 200 || !Array.isArray(res.data)) {
      throw new Error("Failed to retrieve packages list");
    }
    if (res.data.length === 0) {
      throw new Error("No packages exist in database");
    }
  });

  // 7. Regular User cannot create a package
  await assertTest("POST /api/packages fails for regular user (403)", async () => {
    try {
      await axios.post(
        `${API_URL}/packages`,
        {
          title: "Illegal Trek",
          destination: "Secret Location",
          price: 5000,
          duration: 3,
          maxParticipants: 10,
          description: "This should fail",
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      throw new Error("Creating package should have been unauthorized but succeeded");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Expected Forbidden
        return;
      }
      throw err;
    }
  });

  // 8. Admin Login
  await assertTest("POST /api/auth/login logs in admin and returns token", async () => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: adminEmail,
      password: adminPassword,
    });
    if (res.status !== 200 || !res.data.token || !res.data.user.isAdmin) {
      throw new Error("Admin login failed or user is not admin");
    }
    adminToken = res.data.token;
  });

  // 9. Admin Create Package
  await assertTest("POST /api/packages creates a new package as admin", async () => {
    const res = await axios.post(
      `${API_URL}/packages`,
      {
        title: "QA Integration Snow Trek",
        destination: "Sikkim Peaks",
        price: 12500,
        duration: 5,
        maxParticipants: 12,
        description: "Special testing package created by integration test.",
        highlights: ["High Altitude", "Snow camping", "Experienced Guides"],
        isActive: true,
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    if (res.status !== 201 || !res.data._id) {
      throw new Error("Failed to create package");
    }
    testPackageId = res.data._id;
  });

  // 10. Get Package by ID
  await assertTest("GET /api/packages/:id retrieves detail of created package", async () => {
    const res = await axios.get(`${API_URL}/packages/${testPackageId}`);
    if (res.status !== 200 || res.data.title !== "QA Integration Snow Trek") {
      throw new Error("Package detail mismatch or not found");
    }
  });

  // 11. Admin Update Package
  await assertTest("PUT /api/packages/:id updates the package details", async () => {
    const res = await axios.put(
      `${API_URL}/packages/${testPackageId}`,
      {
        title: "QA Integration Snow Trek - Updated",
        price: 13500,
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    if (res.status !== 200 || res.data.title !== "QA Integration Snow Trek - Updated" || res.data.price !== 13500) {
      throw new Error("Failed to update package details correctly");
    }
  });

  // 12. Create Booking
  await assertTest("POST /api/bookings creates booking for user", async () => {
    const res = await axios.post(
      `${API_URL}/bookings`,
      {
        packageId: testPackageId,
        quantity: 3,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    if (res.status !== 201 || !res.data._id) {
      throw new Error("Failed to create booking");
    }
    testBookingId = res.data._id;
    if (res.data.totalPrice !== 40500) { // 3 travelers * 13500
      throw new Error(`Total price expected 40500, got ${res.data.totalPrice}`);
    }
  });

  // 13. Get User Bookings
  await assertTest("GET /api/bookings retrieves user bookings list", async () => {
    const res = await axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (res.status !== 200 || !Array.isArray(res.data)) {
      throw new Error("Failed to retrieve booking list");
    }
    const myBooking = res.data.find(b => b._id === testBookingId);
    if (!myBooking || myBooking.status !== "pending") {
      throw new Error("Booking not found in user list or status is not pending");
    }
  });

  // 14. Create Razorpay Payment Order
  await assertTest("POST /api/payments/create-order generates payment order", async () => {
    const res = await axios.post(
      `${API_URL}/payments/create-order`,
      {
        bookingId: testBookingId,
        amount: 40500,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    if (res.status !== 200 || !res.data.orderId || !res.data.paymentId) {
      throw new Error("Payment order creation failed");
    }
    testOrderId = res.data.orderId;
    testPaymentId = res.data.paymentId;
  });

  // 15. Verify Payment Status
  await assertTest("POST /api/payments/verify verifies payment and updates booking", async () => {
    // Generate valid signature using key_secret
    const secret = process.env.RAZORPAY_KEY_SECRET || "W2TuvQyFO4t0gJ0ocuvH78qn";
    
    // According to controller: body = orderId + "|" + paymentId (paymentId here is razorpay_payment_id)
    const razorpayPaymentId = "pay_test_payment_id_123";
    const body = testOrderId + "|" + razorpayPaymentId;
    const signature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const res = await axios.post(
      `${API_URL}/payments/verify`,
      {
        bookingId: testBookingId,
        paymentId: razorpayPaymentId,
        orderId: testOrderId,
        signature: signature,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    if (res.status !== 200 || !res.data.success) {
      throw new Error("Payment verification failed");
    }
  });

  // 16. Verify Booking Status updated to Confirmed
  await assertTest("GET /api/bookings checks status is now confirmed", async () => {
    const res = await axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const myBooking = res.data.find(b => b._id === testBookingId);
    if (!myBooking || myBooking.status !== "confirmed") {
      throw new Error("Booking status not updated to confirmed");
    }
  });

  // 17. Admin Dashboard Stats
  await assertTest("GET /api/bookings/admin/dashboard returns admin stats", async () => {
    const res = await axios.get(`${API_URL}/bookings/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (res.status !== 200 || typeof res.data.totalBookings !== "number") {
      throw new Error("Dashboard stats call failed");
    }
  });

  // 18. Cleanup: Delete Test Package as Admin
  await assertTest("DELETE /api/packages/:id deletes test package", async () => {
    const res = await axios.delete(`${API_URL}/packages/${testPackageId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (res.status !== 200) {
      throw new Error("Deactivating or deleting package failed");
    }
  });

  // Final summary
  console.log(`\n${colors.cyan}${colors.bold}=== TESTS COMPLETED ===${colors.reset}`);
  console.log(`Passed: ${colors.green}${passedCount}${colors.reset}`);
  console.log(`Failed: ${colors.red}${failedCount}${colors.reset}\n`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error("Fatal error running tests:", err);
  process.exit(1);
});
