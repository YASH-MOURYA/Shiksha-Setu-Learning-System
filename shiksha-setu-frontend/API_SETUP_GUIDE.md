# API Setup & Integration Guide

## 📋 Backend Requirements

Make sure your backend API has these endpoints implemented:

---

## 🔐 Authentication

### Check if user is Admin
```javascript
// User object should have:
{
  "_id": "user_id",
  "userName": "admin_name",
  "email": "admin@example.com",
  "role": "admin",  // ← REQUIRED for admin access
  "token": "jwt_token"
}
```

---

## 📚 Course API Endpoints

### 1. **Get All Courses**
```
GET /api/course/all

Response:
{
  "success": true,
  "data": [
    {
      "_id": "course_id_1",
      "title": "React Basics",
      "description": "Learn React",
      "price": 1999,
      "level": "Beginner",
      "instructor": "John Doe",
      "category": "Web Dev",
      "duration": "4 weeks",
      "isActive": true,
      "thumbnail": "image_url",
      ...
    },
    ...
  ]
}
```

### 2. **Create Course**
```
POST /api/course/add

Request Body:
{
  "title": "Node.js Mastery",
  "description": "Learn backend with Node.js",
  "price": 2999,
  "level": "Intermediate",
  "instructor": "Jane Smith",
  "category": "Backend",
  "duration": "6 weeks",
  "isActive": true,
  "thumbnail": "image_url" (optional)
}

Response:
{
  "success": true,
  "data": {
    "_id": "new_course_id",
    "title": "Node.js Mastery",
    ...
  }
}
```

### 3. **Update Course**
```
PUT /api/course/{courseId}

Request Body:
{
  "title": "Node.js Advanced",
  "description": "Advanced Node.js patterns",
  "price": 3999,
  "level": "Advanced",
  "instructor": "Jane Smith",
  "category": "Backend",
  "duration": "8 weeks",
  "isActive": true
}

Response:
{
  "success": true,
  "data": {
    "_id": "course_id",
    "title": "Node.js Advanced",
    ...
  }
}
```

### 4. **Delete Course**
```
DELETE /api/course/{courseId}

Response:
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

## 🔄 Course Fields Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | String | ✅ Yes | Course name |
| description | String | ✅ Yes | Course overview |
| price | Number | ✅ Yes | In rupees (₹) |
| level | String | ❌ No | "Beginner", "Intermediate", "Advanced" |
| instructor | String | ❌ No | Instructor name |
| category | String | ❌ No | Subject/category |
| duration | String | ❌ No | e.g., "4 weeks" |
| isActive | Boolean | ❌ No | Publish status (default: true) |
| thumbnail | String | ❌ No | Image URL |
| _id | String | Auto | MongoDB ID |
| createdAt | Date | Auto | Creation timestamp |
| updatedAt | Date | Auto | Last update timestamp |

---

## 🔌 Backend Implementation Checklist

### Course Schema Example (MongoDB)
```javascript
const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  instructor: String,
  category: String,
  duration: String,
  thumbnail: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

### Express Routes Example
```javascript
// routes/courseRoutes.js

router.get('/all', getAllCourses);
router.post('/add', authenticateAdmin, createCourse);
router.put('/:id', authenticateAdmin, updateCourse);
router.delete('/:id', authenticateAdmin, deleteCourse);

// Middleware: authenticateAdmin
const authenticateAdmin = (req, res, next) => {
  // Check if user is authenticated and has role: "admin"
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Admin access required" });
  }
};
```

---

## 🧪 Testing the API

### Using curl:
```bash
# Get all courses
curl -X GET http://localhost:5000/api/course/all

# Create course (requires auth token)
curl -X POST http://localhost:5000/api/course/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Course",
    "description": "Test description",
    "price": 1999,
    "level": "Beginner",
    "instructor": "Test Instructor"
  }'

# Update course
curl -X PUT http://localhost:5000/api/course/COURSE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title": "Updated Title", "price": 2999}'

# Delete course
curl -X DELETE http://localhost:5000/api/course/COURSE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman:
1. Create a new collection "Shiksha Setu"
2. Add these requests:
   - GET `/api/course/all`
   - POST `/api/course/add`
   - PUT `/api/course/{courseId}`
   - DELETE `/api/course/{courseId}`
3. Set Authorization header with Bearer token
4. Test each endpoint

---

## 🔐 Security Considerations

### 1. Authentication
- All write operations (POST, PUT, DELETE) should require auth token
- Token should be sent in Authorization header: `Bearer {token}`

### 2. Authorization
- Only admins (role: "admin") can create, update, delete courses
- Students can only view (GET) courses

### 3. Validation
- Validate all required fields on backend
- Validate data types and formats
- Validate price is positive number

### 4. Error Handling
```javascript
// Backend should return clear errors
{
  "success": false,
  "error": "Course title is required",
  "statusCode": 400
}
```

---

## 📱 Frontend Integration Status

✅ **Already Integrated:**
- ✅ API client setup (`src/api/client.js`)
- ✅ Course services (`src/api/services.js`)
- ✅ Auth store for token management
- ✅ Toast notifications for feedback

**Frontend Functions Used:**
```javascript
courseAPI.getAllCourses()      // GET /api/course/all
courseAPI.createCourse(data)   // POST /api/course/add
courseAPI.updateCourse(id, data) // PUT /api/course/{id}
courseAPI.deleteCourse(id)     // DELETE /api/course/{id}
```

---

## 🚨 Common Issues & Solutions

### Issue: 401 Unauthorized Error
**Cause:** Token not sent or expired
**Solution:** 
- Ensure user is logged in
- Check token in localStorage
- Refresh token if expired

### Issue: 403 Forbidden Error
**Cause:** User is not admin
**Solution:**
- Check user role in database
- Verify role is set to "admin"

### Issue: 404 Not Found
**Cause:** Endpoint doesn't exist
**Solution:**
- Check API URL spelling
- Verify backend route exists
- Check server is running

### Issue: 500 Server Error
**Cause:** Backend error
**Solution:**
- Check backend logs
- Verify database connection
- Test endpoint with curl/Postman

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Backend API endpoints are implemented
- [ ] Authentication middleware is in place
- [ ] Admin role check is working
- [ ] All required fields are validated
- [ ] Error responses are properly formatted
- [ ] CORS is configured correctly
- [ ] Database indexes are set
- [ ] Tests pass for all endpoints
- [ ] Rate limiting is implemented (optional)
- [ ] Logging is in place

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 🔗 Related Documentation

- See `ADMIN_GUIDE.md` for user guide
- See `QUICK_REFERENCE.md` for quick commands
- See `FILE_STRUCTURE.md` for code structure

---

**Status:** Ready for Backend Integration  
**Last Updated:** 2026-01-22
