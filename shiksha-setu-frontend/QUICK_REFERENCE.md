# Admin Panel - Quick Reference

## 🔗 Navigation

| Page | URL | Access |
|------|-----|--------|
| Admin Dashboard | `/dashboard/admin` | Admin users only |
| Courses Management | `/dashboard/admin` (Courses tab) | Admin users |
| Student Dashboard | `/dashboard/student` | Logged-in students |
| Mentor Dashboard | `/dashboard/mentor` | Logged-in mentors |

---

## 📝 Course Fields

| Field | Type | Required | Example |
|-------|------|----------|---------|
| Title | Text | ✅ | "Web Development 101" |
| Description | Text | ✅ | "Learn web development from scratch" |
| Price | Number | ✅ | 2999 |
| Level | Select | ❌ | Beginner/Intermediate/Advanced |
| Instructor | Text | ❌ | "John Doe" |
| Category | Text | ❌ | "Web Development" |
| Duration | Text | ❌ | "6 weeks" |
| Active | Checkbox | ❌ | true/false |

---

## ⚡ Quick Actions

### Add Course
```
Button: "Add New Course" (top right of Courses tab)
↓
Fill all required fields (Title*, Description*, Price*)
↓
Click "Add Course"
↓
Success! New course appears in table
```

### Edit Course
```
Table: Find course row
↓
Click Pencil Icon (Edit)
↓
Edit Course Modal opens
↓
Modify fields
↓
Click "Update Course"
↓
Success! Changes saved
```

### Delete Course
```
Table: Find course row
↓
Click Trash Icon (Delete)
↓
Confirm dialog: "Are you sure?"
↓
Click OK
↓
Success! Course removed
```

### Search Courses
```
Search Box: Type course title or description
↓
Results filter in real-time
↓
Clear box to see all courses
```

---

## 🎯 Common Tasks

### Task: Add a new programming course
1. Navigate to `/dashboard/admin`
2. Click "Add New Course"
3. Fill form:
   - Title: "Python Basics"
   - Description: "Learn Python programming fundamentals"
   - Price: 1999
   - Level: "Beginner"
   - Instructor: "Your Name"
   - Category: "Programming"
   - Duration: "4 weeks"
4. Check "Active Course"
5. Click "Add Course"

### Task: Update course price
1. Find course in table
2. Click Pencil icon
3. Change price in "Price (₹)" field
4. Click "Update Course"

### Task: Deactivate a course
1. Find course in table
2. Click Pencil icon
3. Uncheck "Active Course"
4. Click "Update Course"

---

## 🔐 Permissions

Only users with `role: "admin"` can:
- Access `/dashboard/admin`
- See "Admin Panel" in navbar
- Add courses
- Edit courses
- Delete courses

---

## ⚠️ Important Notes

1. **All required fields must be filled** to add/edit a course
2. **Deletion is permanent** - confirm before deleting
3. **Search is case-insensitive** - try different keywords
4. **Price must be a number** - no text allowed
5. **Active courses** show in student course list
6. **Inactive courses** are hidden from students (good for drafts)

---

## 🔄 Data Flow

```
User Login (with admin role)
    ↓
Navbar shows "Admin Panel"
    ↓
Click Admin Panel → /dashboard/admin
    ↓
AdminDashboard loads
    ↓
AdminCourseManagement fetches courses from API
    ↓
Courses displayed in table
    ↓
User performs CRUD operation:
  - CREATE: Add new course
  - READ: View all courses
  - UPDATE: Edit existing course
  - DELETE: Remove course
    ↓
API request sent to backend
    ↓
Toast notification shows result (success/error)
    ↓
Table updates automatically
```

---

## 🚀 Getting Started (for new admin)

1. **Ensure your user account has `role: "admin"`**
2. **Login with admin credentials**
3. **Look for "Admin Panel" in navbar**
4. **Click it → Admin Dashboard opens**
5. **Start with "Add New Course" button**

---

**Version:** 1.0  
**Last Updated:** 2026-01-22  
**Status:** ✅ Production Ready
