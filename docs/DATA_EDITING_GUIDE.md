# How to Edit Travel Packages and Data

## 📌 Quick Overview

There are **2 ways** to manage travel packages:

1. **Easy Way**: Admin Panel (Recommended for non-developers)
2. **Advanced Way**: Edit MongoDB directly

---

## ✅ Way 1: Admin Panel (Easiest)

### Step 1: Login as Admin

1. Go to http://localhost:3000/login
2. Email: `admin@momentry.in`
3. Password: `admin123`
4. Click Login

### Step 2: Access Admin Panel

- Once logged in, you'll see "Admin Panel" in the top navigation
- Click it

### Step 3: Add New Package

1. Click **"Add Package"** button (red button, top right)
2. A form opens with these fields:

#### Fields to Fill:

| Field                | Example                           | Notes                                       |
| -------------------- | --------------------------------- | ------------------------------------------- |
| **Package Title**    | "Goa Beach Holiday"               | What you call the trip                      |
| **Destination**      | "Goa"                             | City/region in India                        |
| **Price (₹)**        | 8999                              | Price per person in rupees                  |
| **Duration (days)**  | 5                                 | How many days the trip is                   |
| **Max Participants** | 20                                | Maximum people per batch                    |
| **Description**      | "Experience beautiful beaches..." | Full description (2-3 lines)                |
| **Image URL**        | `https://example.com/image.jpg`   | Link to package photo (optional)            |
| **Highlights**       | "Free WiFi", "Meals Included"     | Click "Add" button to add features          |
| **Active**           | ✅ (checked)                      | If unchecked, package won't show on website |

#### Example: Adding Highlights

```
1. Type in the text box: "Beachfront Resort"
2. Click "Add" button
3. It appears as a tag below
4. Repeat for: "Water Sports", "Local Food", "Photography Tours"
5. To remove, click the X on the tag
```

### Step 4: Edit Existing Package

1. Scroll down to see all packages in a table
2. Find the package you want to edit
3. Click the **edit icon** (pencil ✏️)
4. Form opens with current data
5. Change what you need
6. Click **"Save Package"**

### Step 5: Deactivate Package

1. In the packages table
2. Find the package
3. Click **"Deactivate"** button
4. Package won't show to users (but won't be deleted)

### Step 6: Delete Package

1. In the packages table
2. Find the package
3. Click **delete icon** (trash 🗑️)
4. Confirm deletion
5. ⚠️ Package is permanently removed

---

## 🔧 Way 2: Direct Database Edit (Advanced)

### When to Use This:

- Bulk updating packages
- Complex editing
- When Admin Panel is not working

### How to Access:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Login** with your account
3. **Find Your Cluster** and click it
4. **Click "Browse Collections"**
5. **Select "momentry"** database (or your DB name)
6. **Select "packages"** collection

### What You See:

```json
{
  "_id": "..." // Auto-generated ID
  "title": "Goa Beach Holiday",
  "destination": "Goa",
  "price": 8999,
  "duration": 5,
  "maxParticipants": 20,
  "description": "Experience beautiful beaches...",
  "image": "https://...",
  "highlights": ["Free WiFi", "Meals"],
  "isActive": true
}
```

### Editing Steps:

1. **Click the package** you want to edit
2. **Click "Edit"** button
3. **Find the field** you want to change
4. **Update the value**:
   - **Change title**: `"Goa Beach Holiday"` → `"Goa Weekend Getaway"`
   - **Change price**: `8999` → `9999`
   - **Enable/disable**: `"isActive": true` → `"isActive": false`
   - **Update highlights**:
     ```json
     "highlights": ["Free WiFi", "Meals", "Airport Pickup"]
     ```

5. **Click "Update"**

---

## 📝 Sample Package Data

### Example 1: Budget Package

```
Title: Jaipur City Tour
Destination: Rajasthan
Price: 5999
Duration: 3
Max Participants: 30
Description: Explore the pink city with its magnificent forts and palaces. Visit Hawa Mahal, City Palace, and local markets.
Highlights:
  - City Palace Visit
  - Hawa Mahal Tour
  - Local Market Exploration
  - Heritage Walking Tour
Image: https://images.unsplash.com/photo-1564507592333-c60657eea523
Active: Yes
```

### Example 2: Adventure Package

```
Title: Himalayan Trek Adventure
Destination: Himachal Pradesh
Price: 15999
Duration: 7
Max Participants: 15
Description: Trek through stunning Himalayan mountains with professional guides, camping in scenic locations, and photography opportunities.
Highlights:
  - Mountain Trekking
  - Camping in Nature
  - Professional Local Guides
  - Photography Spots
Image: https://images.unsplash.com/photo-1506905925346-21bda4d32df4
Active: Yes
```

---

## 🖼️ Where to Find Free Images

Use these sites for high-quality travel images:

1. **Unsplash** - https://unsplash.com/
   - Search: "Goa Beach", "Himalaya", "India"
   - Copy image URL
   - Paste in "Image URL" field

2. **Pexels** - https://www.pexels.com/

3. **Pixabay** - https://pixabay.com/

---

## 💰 Pricing Guide for India

### Budget Backpacker Trips (2-3 days):

- ₹2,000 - ₹5,000 per person

### Standard Trips (3-5 days):

- ₹6,000 - ₹12,000 per person

### Premium Trips (5-7 days):

- ₹13,000 - ₹25,000 per person

### Luxury Trips (7+ days):

- ₹25,000+ per person

---

## 🎯 Best Practices

### DO ✅

- Use clear, descriptive titles
- Include realistic pricing
- Add 4-5 highlights per package
- Keep descriptions 2-3 sentences
- Add package images
- Keep destinations within India
- Make active packages relevant

### DON'T ❌

- Don't use vague titles like "Package 1"
- Don't overprice (check competitors)
- Don't add too many packages at once
- Don't forget to set max participants
- Don't use broken image links
- Don't activate packages you're not ready to sell

---

## 📊 Managing Package Availability

### Scenario 1: Package Fully Booked

1. Go to Admin Panel
2. Find the package
3. Click "Deactivate"
4. It disappears from website
5. Users can't book it

### Scenario 2: Seasonal Packages

1. Create package with date range in description
2. Example: "Goa Monsoon Package - July to September"
3. Deactivate when season ends

### Scenario 3: Price Changes

1. Edit the package
2. Update price field
3. Save
4. New price shows immediately

---

## ❓ FAQ

**Q: Can I duplicate a package?**
A: No, but you can copy details manually. Open package, add new one with similar info.

**Q: Can I schedule packages to be active on specific dates?**
A: Not yet. For now, manually activate/deactivate.

**Q: What if I delete a package by mistake?**
A: You'll need to create it again. Backups are in MongoDB, but need to restore manually. Always test changes first.

**Q: Can users see inactive packages?**
A: No. Only active packages show on the website.

---

## 🔄 Workflow for Adding Seasons

### Month-by-Month Example:

**January - March (Winter/Spring)**

- Active: Himalayan Trek, Jaipur, Agra
- Inactive: Goa (too crowded)

**April - June (Summer)**

- Active: Manali, Hill Stations
- Inactive: Goa, South India

**July - September (Monsoon)**

- Active: Kerala, Coorg
- Inactive: Northern trips

**October - December (Autumn/Winter)**

- Active: All packages
- Peak season!

---

## ✨ Next Steps

1. **Add your first package** via Admin Panel
2. **Test booking it** as a user
3. **Customize pricing** based on your costs
4. **Add team members** (more admin accounts - feature coming soon)
5. **Track bookings** and adjust packages

---

## 📞 Need Help?

If you're stuck:

1. Check browser console for error (Press F12)
2. Make sure you're logged in as admin
3. Try refreshing the page
4. Restart backend server: Stop and run `npm run dev` again

Good luck! 🚀
