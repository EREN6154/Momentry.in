# 🔧 GOOGLE AUTH FIX - "invalid_client" Error

## The Problem

```
Error: "Access blocked: Authorization Error"
Error 401: invalid_client
"no registered origin"
```

## The Solution: Add Redirect URI to Google Cloud Console

### Step 1: Go to Google Cloud Console

1. Open https://console.cloud.google.com/
2. Select project: **MOMENTRY** (or your project name)
3. Go to: **APIs & Services** → **Credentials**

### Step 2: Find Your OAuth 2.0 Credentials

- Click on your OAuth 2.0 Client ID (should show `Web application`)
- Client ID: `662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com`

### Step 3: Add Authorized JavaScript Origins & Redirect URIs

You must configure **both** Authorized JavaScript origins and Authorized redirect URIs in the Google Cloud Console for the client SDK to work.

#### 1. Authorized JavaScript origins

Under **Authorized JavaScript origins**, click **+ ADD URI** and add:

**For Local Development:**
```
http://localhost:3000
```

**For Production:**
```
https://momentry.in
```

*(Note: Do not include trailing slashes here.)*

#### 2. Authorized redirect URIs

Under **Authorized redirect URIs**, click **+ ADD URI** and add:

**For Local Development:**
```
http://localhost:3000
http://localhost:3000/login
http://localhost:3000/signup
```

**For Production:**
```
https://momentry.in
https://momentry.in/login
https://momentry.in/signup
```

### Step 4: Save and Test

1. Click **SAVE**
2. Wait 10 seconds
3. Refresh browser at http://localhost:3000/login
4. Click "Sign in with Google" - should work now! ✅

---

## If Still Not Working

### Clear Browser Cache

1. Press **F12** (Open DevTools)
2. Go to **Application** tab
3. Click **Clear storage**
4. Refresh page

### Check Your Client ID

Make sure `.env.local` has the EXACT Client ID:

```
VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
```

### Check Console Errors

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors
4. Take screenshot and share with developer

---

## Production Deployment Note

When you deploy to Vercel, also add to Google Cloud Console:

```
https://yourvercelapp.vercel.app
https://momentry.in (your domain)
```

Then update your Vercel environment variable:

```
VITE_GOOGLE_CLIENT_ID=662501599005-5p8q1itu30qjdvsjcg184amcfdvnf8gm.apps.googleusercontent.com
```
