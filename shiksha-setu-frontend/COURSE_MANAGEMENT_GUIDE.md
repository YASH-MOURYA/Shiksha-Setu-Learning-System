# Complete Admin Panel & Course Management System - Setup Guide

## ✅ What's Been Implemented

### 1. **Admin Dashboard** (`/dashboard/admin`)
- Admin Panel with tabbed navigation (Courses, Categories, Overview)
- Admin can manage courses with full CRUD operations
- **Requirements for course creation:**
  - **Mentor Assignment** (REQUIRED) - Admin must assign a mentor to each course
  - **Category Selection** (REQUIRED) - Admin must select a category
  - **Course Name & Description** (REQUIRED)
  - **Course Type** - Free or Paid
  - **Fee** (Required if Paid) - Price in Rupees
  - **Discount** - Optional percentage discount
  - **Prerequisites** - Optional prerequisites
  - **Author's Note & Special Note** - Optional

### 2. **Course Management Flow**
- **Courses only appear when a mentor is assigned**
- Courses visible to: Students (browse/enroll), Mentors (view their own), Admin (manage all)
- Course data synced with backend requirements

### 3. **User Dashboards**

#### **Admin Dashboard** (`/dashboard/admin`)
- View all courses
- Add new courses (with mentor assignment)
- Edit course details
- Delete courses
- Search/filter courses

#### **Mentor Dashboard** (`/dashboard/mentor`)
- View only courses assigned to the mentor
- See student enrollments
- Track revenue and ratings
- Monitor student progress

#### **Student Dashboard** (`/dashboard/student`)
- Browse all available courses (with assigned mentors)
- View course details with mentor info
- Enroll in courses
- Track learning progress
- View enrolled courses with progress bars
- Access certificates

### 4. **Authentication & Authorization**
- Role-based login (Student, Mentor, Admin)
- JWT token authentication
- Automatic role-based redirection:
  - Admin → `/dashboard/admin`
  - Mentor → `/dashboard/mentor`
  - Student → `/dashboard/student`
- Admin link appears in navbar only for admin users

---

## ⚙️ Setup Instructions

### **Step 1: Create a Mentor Account**
1. Go to `/register`
2. Register with:
   - First Name: (e.g., "John")
   - Last Name: (e.g., "Doe")
   - Email: (e.g., "john@mentor.com")
   - Password: (secure password)
   - Role: **Select "Mentor"**
   - Phone: (10 digits)
   - Address details

### **Step 2: Admin Creates a Course**
1. Login as Admin (email: `admin@shiksha.com`, password: `Admin@123`)
2. Navigate to Admin Panel
3. Click "Add New Course"
4. Fill in required fields:
   - **Select Mentor** - Choose from the dropdown (your newly created mentor)
   - **Select Category** - Choose an available category
   - **Course Name** - (e.g., "Advanced Web Development")
   - **Description** - Course overview
   - **Type** - Choose "Paid" or "Free"
   - **Fee** - Price (if paid)
   - **Discount** - Optional (%)
   - **Prerequisites** - Optional
5. Click "Add Course"

### **Step 3: Student Enrolls in Course**
1. Logout and login as a Student
2. Student automatically redirected to Student Dashboard
3. View "Available Courses" tab
4. Click "Enroll Now" on any course
5. View enrolled course under "My Courses" tab with progress tracking

### **Step 4: Mentor Views Teaching Courses**
1. Logout and login as the Mentor
2. Mentor automatically redirected to Mentor Dashboard
3. View courses assigned to them
4. See student enrollments and course statistics

---

## 🔧 Backend API Endpoints Used

### **Course Management**
- `POST /api/course/add` - Create course (requires mentorId, categoryId, name, description, type, fee)
- `GET /api/course/all` - Get all courses
- `PUT /api/course/{id}` - Update course
- `DELETE /api/course/{id}` - Delete course

### **Categories**
- `GET /api/course/category/all` - Get all categories

### **Users by Role**
- `GET /api/user/role/Mentor` - Get all mentors
- `GET /api/user/role/Student` - Get all students

### **Course Enrollments**
- `POST /api/course/booking/add` - Enroll student in course
- `GET /api/course/booking/student/courses` - Get student's enrolled courses
- `GET /api/course/booking/course/{courseId}/progress` - Get course progress

---

## 🎯 Key Features Implemented

| Feature | Status | Details |
|---------|--------|---------|
| Admin Dashboard | ✅ Complete | Manage all courses |
| Mentor Assignment | ✅ Complete | Courses require mentor |
| Course CRUD | ✅ Complete | Create, Read, Update, Delete |
| Category Support | ✅ Complete | Assign category to courses |
| Student Enrollment | ✅ Complete | Students can enroll |
| Role-Based Dashboards | ✅ Complete | Different views per role |
| Course Visibility | ✅ Complete | Only shows assigned courses |
| Progress Tracking | ✅ Complete | Student progress tracking |
| Search/Filter | ✅ Complete | Find courses easily |

---

## 📱 Navigation Map

```
Public Routes:
├── / (Home)
├── /login
├── /register
├── /courses
└── /categories

Protected Routes (By Role):
├── /dashboard/admin (Admin only)
│   └── Courses Management
├── /dashboard/mentor (Mentor only)
│   └── Teaching Courses & Stats
└── /dashboard/student (Student only)
    └── Browse & Enroll Courses
```

---

## 🐛 Troubleshooting

### "No mentors available" Error
- **Solution**: Register a mentor account first before creating courses

### "No categories available" Error
- **Solution**: Ensure categories exist in the backend database

### Course not appearing after creation
- **Solution**: Verify mentor was assigned; courses only show with assigned mentors

### Login redirects to wrong dashboard
- **Solution**: Backend returns role as "Admin", "Mentor", or "Student" (not "ROLE_*" prefix)

---

## 📝 API Response Format

### Course Response (GET /api/course/all)
```json
{
  "responseMessage": "...",
  "success": true,
  "courses": [
    {
      "id": 1,
      "mentorId": 2,
      "categoryId": 3,
      "name": "Course Name",
      "description": "...",
      "type": "paid",
      "fee": 5000,
      "discountInPercent": 10,
      ...
    }
  ]
}
```

### User Response (GET /api/user/role/Mentor)
```json
{
  "users": [
    {
      "id": 2,
      "firstName": "John",
      "lastName": "Doe",
      "emailId": "john@mentor.com",
      "role": "Mentor",
      ...
    }
  ]
}
```

---

## 🚀 Next Steps (Optional Enhancements)

1. **Course Modules/Sections** - Add course structure with sections and topics
2. **Video Uploads** - Allow mentors to upload video content
3. **Student Progress** - Detailed tracking of video views and completions
4. **Ratings & Reviews** - Students rate courses and leave reviews
5. **Payment Integration** - Razorpay/Stripe for paid courses
6. **Certificates** - Auto-generate certificates on course completion
7. **Messaging** - Direct messaging between students and mentors
8. **Analytics Dashboard** - Detailed analytics for admins and mentors

---

## 📞 Support

For any issues:
1. Check browser console for error messages
2. Verify backend is running on `http://localhost:8080`
3. Check network tab for API response details
4. Ensure correct role is selected during login
