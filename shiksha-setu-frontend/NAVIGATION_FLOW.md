# Navigation Flow & User Journey

## 🗺️ Complete Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOME PAGE (/)                           │
│                    ↓ User clicks "Login"                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      LOGIN PAGE (/login)                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Email:    admin@example.com                          │      │
│  │ Password: ••••••••••                                 │      │
│  │ [Login Button]                                       │      │
│  │                                                      │      │
│  │ ✅ Success → Token saved to authStore               │      │
│  │ ❌ Error → Try again                                │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        ┌──────────────────────────────────────────┐
        │   USER AUTHENTICATED                     │
        │   Navbar updates:                        │
        │   - Shows username                       │
        │   - Shows "Dashboard"                    │
        │   - Shows "Admin Panel" (if admin)       │
        │   - Shows "Logout"                       │
        └──────────────────────────────────────────┘
                              ↓
        ┌──────────────────────────────────────────────────────┐
        │   FOR ADMIN USERS:                                   │
        │   (role: "admin")                                    │
        └──────────────────────────────────────────────────────┘
                              ↓
       ┌─────────────────────────────────────┐
       │  Click "Admin Panel" in navbar       │
       │           ↓                          │
       │  /dashboard/admin                   │
       │  (AdminDashboard.jsx)               │
       └─────────────────────────────────────┘
                    ↓
    ┌────────────────────────────────────────┐
    │      ADMIN DASHBOARD                   │
    │  ┌─────────────────────────────────┐  │
    │  │ Tab: COURSES                    │  │
    │  │ ┌───────────────────────────┐  │  │
    │  │ │ [Add New Course] Button   │  │  │
    │  │ │ [Search bar]              │  │  │
    │  │ │ ┌─────────────────────┐   │  │  │
    │  │ │ │ Courses Table       │   │  │  │
    │  │ │ │ ┌─────────────────┐ │   │  │  │
    │  │ │ │ │ Course 1    ✎ ✕ │ │   │  │  │
    │  │ │ │ │ Course 2    ✎ ✕ │ │   │  │  │
    │  │ │ │ │ Course 3    ✎ ✕ │ │   │  │  │
    │  │ │ │ └─────────────────┘ │   │  │  │
    │  │ │ └─────────────────────┘   │  │  │
    │  │ └───────────────────────────┘  │  │
    │  │ Tab: CATEGORIES                │  │
    │  │ Tab: OVERVIEW                  │  │
    │  └─────────────────────────────────┘  │
    └────────────────────────────────────────┘
```

---

## 🔄 Course Management Flow

### 📝 ADD COURSE FLOW

```
Click [Add New Course]
        ↓
┌─────────────────────────────────────────┐
│     ADD COURSE MODAL                    │
│  ┌─────────────────────────────────┐   │
│  │ Title*        [____________]     │   │
│  │ Description*  [____________]     │   │
│  │ Price*        [____________]     │   │
│  │ Level         [Beginner ▼]      │   │
│  │ Instructor    [____________]     │   │
│  │ Category      [____________]     │   │
│  │ Duration      [____________]     │   │
│  │ ☑ Active Course                 │   │
│  │                                  │   │
│  │  [Cancel]      [Add Course]      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
        ↓
    Validation check
        ↓
    API POST /api/course/add
        ↓
    ┌─────────────────┐
    │ Loading...      │
    └─────────────────┘
        ↓
    ┌────────────────────────────┐
    │ ✅ Success toast           │
    │ Course added successfully  │
    └────────────────────────────┘
        ↓
    Modal closes
        ↓
    Table refreshes
        ↓
    New course appears in list
```

### ✏️ EDIT COURSE FLOW

```
Find course in table
        ↓
Click [✎ Edit Icon]
        ↓
┌──────────────────────────────────────┐
│  EDIT COURSE MODAL                   │
│  (Form pre-filled with current data) │
│  ┌────────────────────────────────┐  │
│  │ Title*        [React Basics]    │  │
│  │ Description*  [Learn React...] │  │
│  │ Price*        [1999]            │  │
│  │ Level         [Intermediate ▼]  │  │
│  │ ...                             │  │
│  │  [Cancel]    [Update Course]    │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
        ↓
    Make changes
        ↓
    Validation check
        ↓
    API PUT /api/course/{courseId}
        ↓
    ┌─────────────────────────────┐
    │ ✅ Success toast            │
    │ Course updated successfully │
    └─────────────────────────────┘
        ↓
    Modal closes
        ↓
    Table refreshes with updated data
```

### 🗑️ DELETE COURSE FLOW

```
Find course in table
        ↓
Click [✕ Delete Icon]
        ↓
┌────────────────────────────────────┐
│  Confirmation Dialog               │
│                                    │
│  Are you sure you want to delete   │
│  this course?                      │
│                                    │
│  [Cancel]         [OK - Delete]    │
└────────────────────────────────────┘
        ↓
    User clicks OK
        ↓
    API DELETE /api/course/{courseId}
        ↓
    ┌──────────────────────────────┐
    │ ✅ Success toast             │
    │ Course deleted successfully  │
    └──────────────────────────────┘
        ↓
    Course removed from table
        ↓
    Table refreshes
```

### 🔍 SEARCH FLOW

```
        ↓
[Search Bar: "React"]
        ↓
    Real-time filtering
        ↓
Table shows matching courses:
┌─────────────────────────┐
│ React Basics       ✎ ✕ │
│ React Advanced     ✎ ✕ │
│ React Native       ✎ ✕ │
└─────────────────────────┘
        ↓
Clear search box
        ↓
Table shows all courses again
```

---

## 👥 User Role Navigation

### STUDENT USER
```
Login as Student
        ↓
Navbar shows:
- Home
- Courses
- Categories
- Dashboard (→ /dashboard/student)
- Logout
        ↓
Can view courses
Can enroll in courses
Can track progress
❌ Cannot access Admin Panel
```

### MENTOR USER
```
Login as Mentor
        ↓
Navbar shows:
- Home
- Courses
- Categories
- Dashboard (→ /dashboard/mentor)
- Logout
        ↓
Can create own courses
Can track students
❌ Cannot access Admin Panel
```

### ADMIN USER
```
Login as Admin (role: "admin")
        ↓
Navbar shows:
- Home
- Courses
- Categories
- Dashboard (→ /dashboard)
- ✨ Admin Panel (→ /dashboard/admin)
- Logout
        ↓
Can manage all courses
Can add/edit/delete courses
Can manage categories
Can view analytics
✅ Full system access
```

---

## 📊 Data Flow Diagram

```
┌──────────────────┐
│   Admin User     │
│   Logged in with │
│   role: admin    │
└────────┬─────────┘
         │
         ↓
┌──────────────────────────┐
│ AdminDashboard.jsx       │
│ (Routes & Tabs)          │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ AdminCourseManagement.jsx        │
│ - Fetches courses on mount       │
│ - Handles CRUD operations        │
│ - Shows table & modals           │
└────────┬─────────────────────────┘
         │
    ┌────┼────┐
    ↓    ↓    ↓
┌──────┐ ┌───────┐ ┌──────────┐
│ Add  │ │ Edit  │ │ Delete   │
│Modal │ │ Modal │ │ function │
└───┬──┘ └───┬───┘ └────┬─────┘
    │        │          │
    └────┬───┴──────┬───┘
         │          │
         ↓          ↓
    ┌─────────────────────────┐
    │  API Services           │
    │  courseAPI methods      │
    │  - create               │
    │  - update               │
    │  - delete               │
    │  - getAll               │
    └────────┬────────────────┘
             │
             ↓
    ┌─────────────────────────┐
    │  API Client             │
    │  (axios/fetch)          │
    │  + Auth token          │
    └────────┬────────────────┘
             │
             ↓
    ┌─────────────────────────┐
    │  Backend API Server     │
    │  /api/course/*          │
    │  + Authorization check  │
    └────────┬────────────────┘
             │
             ↓
    ┌─────────────────────────┐
    │  Database               │
    │  (Courses Collection)   │
    └─────────────────────────┘
             ↑
             │ Response
             ↓
    ┌─────────────────────────┐
    │  Toast Notification     │
    │  ✅ Success / ❌ Error  │
    └─────────────────────────┘
             │
             ↓
    ┌─────────────────────────┐
    │  Update UI              │
    │  - Refresh table        │
    │  - Close modal          │
    │  - Show new data        │
    └─────────────────────────┘
```

---

## 🎮 Interactive Guide

### Quick Actions Map

```
START HERE
    ↓
┌─────────────────────────────────────────────┐
│  Admin Panel (/dashboard/admin)             │
│  ┌───────────────────────────────────────┐  │
│  │  [Add New Course] ← CREATE             │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │ Search: ________                │  │  │
│  │  │ ┌───────────────────────────┐   │  │  │
│  │  │ │ Course Title    [✎] [✕]   │   │  │  │
│  │  │ │        ↑          ↑   ↑    │   │  │  │
│  │  │ │       READ       EDIT DELETE   │  │  │
│  │  │ │                              │   │  │  │
│  │  │ │ Course Title 2  [✎] [✕]   │   │  │  │
│  │  │ │ Course Title 3  [✎] [✕]   │   │  │  │
│  │  │ └───────────────────────────┘   │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Key Interactions

| Action | Icon | Key | Effect |
|--------|------|-----|--------|
| Add Course | ➕ | [Add New Course] Button | Opens Add Modal |
| Search | 🔍 | Search Box | Filters in real-time |
| Edit | ✎ | Pencil Icon | Opens Edit Modal |
| Delete | ✕ | Trash Icon | Shows confirmation |
| Refresh | ↻ | Auto on action | Reloads course list |

---

## ✅ Complete User Journey

```
New Admin User
        ↓
Register account with role: admin
        ↓
Login
        ↓
See "Admin Panel" in navbar
        ↓
Click "Admin Panel"
        ↓
See empty course list
        ↓
Click "Add New Course"
        ↓
Fill course form
        ↓
Click "Add Course"
        ↓
✅ Course appears in table
        ↓
Click edit button
        ↓
Modify details
        ↓
Click "Update Course"
        ↓
✅ Changes saved
        ↓
Search for course
        ↓
Click delete button
        ↓
Confirm deletion
        ↓
✅ Course removed

FULL CYCLE COMPLETE! 🎉
```

---

**Version:** 1.0  
**Created:** 2026-01-22  
**Status:** Ready to Use
