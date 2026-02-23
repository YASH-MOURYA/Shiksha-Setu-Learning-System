# Admin Panel & Course Management Guide

## 🎯 Overview

Your Shiksha Setu application now includes a complete **Admin Dashboard** with full **CRUD operations** for courses. This guide walks you through everything.

---

## 📋 What's New?

### New Files Created:
1. **Admin Dashboard** (`/src/pages/dashboard/AdminDashboard.jsx`)
   - Main admin interface with tabs for Courses, Categories, and Overview
   
2. **Course Management** (`/src/components/admin/AdminCourseManagement.jsx`)
   - List all courses with search functionality
   - Delete courses with confirmation
   - Edit and add course modals

3. **Add Course Modal** (`/src/components/admin/AddCourseModal.jsx`)
   - Form to create new courses
   - Required fields: Title, Description, Price
   - Optional fields: Instructor, Category, Duration, Level, Status

4. **Edit Course Modal** (`/src/components/admin/EditCourseModal.jsx`)
   - Edit existing course details
   - Pre-populated form with current values

### Updated Files:
- **App.jsx** - Added admin route: `/dashboard/admin`
- **Navbar.jsx** - Added "Admin Panel" link (shows only for admin users)

---

## 🚀 How to Access Admin Panel

### For Development/Testing:

1. **Create an Admin User** (Backend):
   ```json
   {
     "email": "admin@example.com",
     "password": "password123",
     "userName": "Admin",
     "role": "admin"
   }
   ```

2. **Login** with admin credentials
3. **Navigate** to "Admin Panel" in navbar (appears only for admins)
4. Or directly visit: `http://localhost:5173/dashboard/admin`

---

## 📊 Admin Dashboard Features

### 1. **Courses Tab** (Default View)
   - **View All Courses**: See all created courses in a table
   - **Search**: Filter courses by title or description
   - **Add Course**: Click "Add New Course" button
   - **Edit Course**: Click pencil icon to edit
   - **Delete Course**: Click trash icon (requires confirmation)

### 2. **Categories Tab**
   - Placeholder for future category management
   - Coming soon...

### 3. **Overview Tab**
   - Dashboard statistics (Total Courses, Active Users, Revenue)
   - Quick metrics view

---

## 🔄 CRUD Operations Guide

### **CREATE - Add a New Course**

1. Click **"Add New Course"** button
2. Fill in the form:
   ```
   Title*              : Required - Course name
   Description*        : Required - Course overview
   Price*              : Required - Course cost in rupees
   Level               : Beginner/Intermediate/Advanced
   Instructor          : Name of course instructor
   Category            : Course category/subject
   Duration            : e.g., "4 weeks"
   Active Course       : Toggle to make course visible
   ```
3. Click **"Add Course"** button
4. Success toast notification will appear

### **READ - View Courses**

- Courses automatically load when you visit Admin Dashboard
- Table shows:
  - Course Title & Description
  - Instructor Name
  - Price (₹)
  - Level (Beginner/Intermediate/Advanced)
  - Status (Active/Inactive)
  - Action buttons

**Search Feature:**
- Type in the search box to filter by title or description
- Real-time filtering as you type

### **UPDATE - Edit a Course**

1. Find the course in the table
2. Click the **pencil icon** (Edit button)
3. Edit Course Modal opens with current values pre-filled
4. Modify the fields you want to change
5. Click **"Update Course"** button
6. Success toast notification will appear

### **DELETE - Remove a Course**

1. Find the course in the table
2. Click the **trash icon** (Delete button)
3. Confirmation dialog appears: "Are you sure you want to delete this course?"
4. Click **OK** to confirm or **Cancel** to abort
5. Course is deleted from system
6. Success toast notification will appear

---

## 🔌 API Integration

The app uses these API endpoints (verify with your backend):

```javascript
// GET - Fetch all courses
GET /api/course/all

// POST - Create new course
POST /api/course/add
Body: { title, description, price, level, instructor, ... }

// PUT - Update course
PUT /api/course/{courseId}
Body: { title, description, price, ... }

// DELETE - Delete course
DELETE /api/course/{courseId}
```

### Example Create Request:
```javascript
{
  "title": "React Mastery",
  "description": "Learn React from basics to advanced",
  "price": 2999,
  "level": "Intermediate",
  "instructor": "John Doe",
  "category": "Web Development",
  "duration": "6 weeks",
  "isActive": true
}
```

---

## 🛠️ Customization & Extension

### Add More Fields to Course:

1. **In AddCourseModal.jsx & EditCourseModal.jsx**, add new field:
   ```jsx
   <div>
     <label className="block text-sm font-medium text-gray-700 mb-1">
       New Field Name
     </label>
     <input
       type="text"
       name="newField"
       value={formData.newField}
       onChange={handleInputChange}
       placeholder="Enter value"
       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
     />
   </div>
   ```

2. **In AdminCourseManagement.jsx**, add table column:
   ```jsx
   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
     New Field
   </th>
   ```

3. **Update initial state:**
   ```jsx
   const [formData, setFormData] = useState({
     ...otherFields,
     newField: '',
   });
   ```

### Add Categories Management:

Replace the Categories tab placeholder with similar CRUD logic using:
```javascript
categoryAPI.getAllCategories()
categoryAPI.createCategory(data)
categoryAPI.updateCategory(id, data)
categoryAPI.deleteCategory(id)
```

---

## ✅ Checklist

- [x] Admin Dashboard created
- [x] Course CRUD operations implemented
- [x] Add course modal with form validation
- [x] Edit course functionality
- [x] Delete with confirmation
- [x] Search/filter courses
- [x] Admin routes added to App.jsx
- [x] Navbar link for admin panel
- [x] Role-based access control (admin-only)

### Next Steps:
- [ ] Add Category management
- [ ] Add user/student management
- [ ] Add booking/enrollment statistics
- [ ] Add payment/revenue tracking
- [ ] Add course sections & topics management
- [ ] Add admin analytics & reports

---

## 🐛 Troubleshooting

### Admin Panel not showing in navbar?
- Make sure user has `role: "admin"` in database
- Check browser console for errors
- Clear browser cache

### Can't add course - API error?
- Verify backend endpoints are running
- Check API response in network tab
- Ensure all required fields are filled
- Check backend error logs

### Form not submitting?
- Ensure browser console shows no errors
- Check all required fields (*) are filled
- Verify API client configuration

---

## 📞 Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Check Network tab for API errors
3. Verify backend is running and accessible
4. Check API response format matches expected structure

---

**Happy course management! 🎓**
