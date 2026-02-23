# Complete User Journey & Feature Overview

## 🎓 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Shiksha Setu Platform                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Admin     │  │    Mentor    │  │    Student   │    │
│  │   (Create)   │  │  (Teach)     │  │  (Learn)     │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                 │                 │              │
│         ▼                 ▼                 ▼              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │          Course Management System                   │  │
│  │ ┌──────────────────────────────────────────────┐   │  │
│  │ │ Courses (with Mentor Assignment Required)    │   │  │
│  │ │ ├─ Name, Description                         │   │  │
│  │ │ ├─ Mentor (REQUIRED)                         │   │  │
│  │ │ ├─ Category                                  │   │  │
│  │ │ ├─ Type (Free/Paid)                          │   │  │
│  │ │ ├─ Fee & Discount                            │   │  │
│  │ │ └─ Prerequisites & Notes                      │   │  │
│  │ └──────────────────────────────────────────────┘   │  │
│  │ ┌──────────────────────────────────────────────┐   │  │
│  │ │ Student Enrollments & Progress               │   │  │
│  │ │ ├─ Course Enrollment                         │   │  │
│  │ │ ├─ Progress Tracking (%)                     │   │  │
│  │ │ ├─ Learning Hours                            │   │  │
│  │ │ └─ Certificates                              │   │  │
│  │ └──────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────┘  │
│         │                 │                 │              │
└─────────┼─────────────────┼─────────────────┼──────────────┘
          │                 │                 │
         ▼                 ▼                 ▼
   Admin Panel        Mentor Panel      Student Dashboard
```

## 👨‍💼 ADMIN WORKFLOW

### 1. Admin Login
```
Admin Email: admin@shiksha.com
Password: Admin@123
Role: Admin
Result: Redirect to /dashboard/admin
```

### 2. Admin Dashboard Features
```
┌────────────────────────────────────┐
│       Admin Dashboard              │
├────────────────────────────────────┤
│ Tabs:                              │
│ ├─ Courses (Active)                │
│ ├─ Categories                      │
│ └─ Overview                        │
├────────────────────────────────────┤
│ Course Management:                 │
│ ├─ View All Courses               │
│ ├─ Search/Filter Courses          │
│ ├─ Add New Course                 │
│ │   └─ Requires: Mentor Selection │
│ ├─ Edit Course Details            │
│ └─ Delete Course                  │
└────────────────────────────────────┘
```

### 3. Create Course (Admin)
```
Admin clicks "Add New Course" → Form appears

Required Fields:
✓ Mentor Name (Dropdown) - MUST SELECT A MENTOR
✓ Category (Dropdown)
✓ Course Name
✓ Description
✓ Course Type (Free/Paid)
✓ Fee (if Paid)
  Optional Fields:
  - Discount (%)
  - Prerequisites
  - Author's Note
  - Special Note

After submission → Course appears in:
  • Admin Course List
  • Student Dashboard (if mentor assigned)
  • Mentor Dashboard (for that mentor)
```

---

## 🎓 MENTOR WORKFLOW

### 1. Mentor Registration
```
Register at /register

Fill in:
- First Name
- Last Name
- Email
- Password
- Role: SELECT "Mentor" ⭐
- Phone Number
- Address Details
```

### 2. Mentor Login
```
Login with registered credentials
Role: Mentor
Result: Redirect to /dashboard/mentor
```

### 3. Mentor Dashboard
```
┌────────────────────────────────────┐
│      Mentor Dashboard              │
├────────────────────────────────────┤
│ Statistics:                        │
│ ├─ Total Courses Teaching         │
│ ├─ Total Students Enrolled        │
│ ├─ Average Rating                 │
│ ├─ Total Revenue                  │
│ ├─ Total Views                    │
│ └─ Student Questions              │
├────────────────────────────────────┤
│ My Teaching Courses:               │
│ ├─ List of courses assigned       │
│ ├─ Student count per course       │
│ ├─ Course performance metrics     │
│ └─ Manage course content          │
└────────────────────────────────────┘
```

### 4. Mentor Responsibilities
```
✓ Can view courses assigned to them
✓ Can see student enrollments
✓ Can track course progress
✓ Can monitor course ratings
✗ Cannot modify course details (Admin only)
✗ Cannot create new courses (Admin only)
✗ Cannot assign other mentors to courses
```

---

## 👨‍🎓 STUDENT WORKFLOW

### 1. Student Registration
```
Register at /register

Fill in:
- First Name
- Last Name
- Email
- Password
- Role: SELECT "Student" ⭐
- Phone Number
- Address Details
```

### 2. Student Login
```
Login with registered credentials
Role: Student
Result: Redirect to /dashboard/student
```

### 3. Student Dashboard - Available Courses Tab
```
┌────────────────────────────────────┐
│  Available Courses (Browse & Learn) │
├────────────────────────────────────┤
│ Shows:                             │
│ ├─ Course Name                    │
│ ├─ Description                    │
│ ├─ Mentor Information             │
│ ├─ Course Type (Free/Paid)        │
│ ├─ Price (if paid)                │
│ ├─ Prerequisites (if any)         │
│ ├─ Discount Info (if available)   │
│ └─ "Enroll Now" Button            │
│                                   │
│ Features:                         │
│ ├─ Search Courses                │
│ ├─ Filter by Type               │
│ └─ Sort by Price/Rating         │
└────────────────────────────────────┘
```

### 4. Enroll in Course
```
Student Actions:
1. Browse Available Courses
2. Click "Enroll Now" on any course
3. System adds course to student's enrollment
4. Notification: "Successfully enrolled!"

Result:
- Course appears in "My Courses" tab
- Progress bar shows (0% initially)
- "Continue Learning" button appears
```

### 5. Student Dashboard - My Courses Tab
```
┌────────────────────────────────────┐
│    My Enrolled Courses             │
├────────────────────────────────────┤
│ For Each Course:                  │
│ ├─ Course Name                    │
│ ├─ Description                    │
│ ├─ Progress Bar (%)               │
│ │  └─ Shows learning completion   │
│ ├─ Learning Hours                 │
│ └─ "Continue Learning" Button     │
│                                   │
│ Statistics:                       │
│ ├─ Total Enrolled Courses         │
│ ├─ Completed Courses              │
│ ├─ In-Progress Courses            │
│ ├─ Certificates Earned            │
│ └─ Total Learning Hours           │
└────────────────────────────────────┘
```

### 6. Course Progress Tracking
```
Progress tracked by:
✓ Lessons completed
✓ Videos watched
✓ Assignments submitted
✓ Time spent on course
✓ Quiz scores

Milestones:
- 25% Progress: Quarter way through
- 50% Progress: Halfway through
- 75% Progress: Almost complete
- 100% Progress: Course completed → Certificate eligible
```

---

## 🔄 COMPLETE USER JOURNEY EXAMPLE

```
Timeline: Admin creates course → Mentor gets assigned → Student learns

T=0 Min: ADMIN SETUP
├─ Admin logs in
├─ Clicks "Add New Course"
├─ Selects Mentor: "John Doe"
├─ Selects Category: "Web Development"
├─ Enters: Course Name, Description
├─ Sets: Type="Paid", Fee=₹5000, Discount=10%
└─ Clicks "Add Course" ✓

T=5 Min: MENTOR NOTIFIED
├─ John Doe's Mentor Dashboard updates
├─ New course appears in "My Teaching Courses"
├─ Stats update: Total Courses = 1
└─ Ready to start teaching

T=10 Min: STUDENT DISCOVERS
├─ Sarah logs in as Student
├─ Goes to Student Dashboard
├─ Sees "Available Courses" tab
├─ Finds: "Web Development" course
├─ Sees: Mentor = "John Doe", Price = ₹4500 (₹5000 - 10%)
└─ Reads: Description & Prerequisites

T=15 Min: STUDENT ENROLLS
├─ Sarah clicks "Enroll Now"
├─ Confirmation: "Successfully enrolled!"
├─ Course appears in "My Courses" tab
└─ Progress Bar: 0%

T=20 Min: MENTOR SEES ENROLLMENT
├─ John's Dashboard updates
├─ "Total Students" increases to 1
├─ Sarah appears in course enrollment list
└─ Ready to help Sarah

T=1 Week: STUDENT LEARNING
├─ Sarah watches videos
├─ Completes assignments
├─ Progress increases to 50%
├─ Mentor sees engagement in analytics
└─ Platform tracks learning hours

T=2 Weeks: COMPLETION
├─ Sarah completes all course content
├─ Progress reaches 100%
├─ Sarah becomes eligible for certificate
├─ Mentor sees course completed in stats
├─ Admin sees engagement metrics
└─ Everyone benefits from the learning!
```

---

## 📊 Data Visibility Matrix

| Feature | Admin | Mentor | Student |
|---------|-------|--------|---------|
| See All Courses | ✅ | ❌ (Own only) | ✅ (Available only) |
| Create Courses | ✅ | ❌ | ❌ |
| Assign Mentors | ✅ | ❌ | ❌ |
| Delete Courses | ✅ | ❌ | ❌ |
| View Students | ✅ | ✅ (Own) | ❌ |
| Enroll Courses | ❌ | ❌ | ✅ |
| View Progress | ✅ | ✅ (Student) | ✅ (Own) |
| Edit Profile | ✅ | ✅ | ✅ |
| Access Dashboard | ✅ | ✅ | ✅ |

---

## 🎯 Key Business Rules Implemented

1. **Courses Require Mentor Assignment**
   - Every course MUST have a mentor
   - Courses only appear when mentor is assigned
   - No mentor = No course visible

2. **Role-Based Access**
   - Admin: Full control
   - Mentor: View own courses & students
   - Student: Browse & learn

3. **Course Visibility**
   - Admin: Sees all courses (including unassigned)
   - Mentor: Sees only assigned courses
   - Student: Sees only courses with mentors

4. **Enrollment Process**
   - Student enrolls → System records booking
   - Progress tracked from 0% to 100%
   - Completion → Certificate eligibility

5. **Data Integrity**
   - All courses linked to mentor
   - All enrollments linked to student
   - All progress tracked per student per course

---

## 🚀 Ready to Use!

Your complete course management system is now ready to:
✅ Create & manage courses
✅ Assign mentors to courses
✅ Allow students to enroll
✅ Track learning progress
✅ View comprehensive dashboards for all roles

**Start Now:**
1. Login as Admin
2. Create a course (don't forget to assign a mentor!)
3. Logout and login as Student
4. Enroll in the course
5. Watch progress tracking in action!
