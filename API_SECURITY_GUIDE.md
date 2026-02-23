# 🔐 API Security Guide - Shiksha Setu

## Table of Contents
1. [Overview](#overview)
2. [Authentication Flow](#authentication-flow)
3. [Authorization System](#authorization-system)
4. [JWT Token Explained](#jwt-token-explained)
5. [Security Architecture](#security-architecture)
6. [API Endpoints Security](#api-endpoints-security)
7. [How to Test Security](#how-to-test-security)

---

## Overview

Shiksha Setu uses **JWT (JSON Web Token)** based authentication and **Role-Based Access Control (RBAC)** for authorization. This means:

- ✅ **Authentication**: Verifying WHO you are (Login with email/password)
- ✅ **Authorization**: Verifying WHAT you can do (Based on your role: Admin, Mentor, or Student)
- ✅ **Token-Based**: No need to send password with every request
- ✅ **Stateless**: Server doesn't store session data

---

## Authentication Flow

### 🎯 Step-by-Step Login Process

```
┌─────────────┐                                    ┌─────────────┐
│   Browser   │                                    │   Backend   │
│  (Frontend) │                                    │   Server    │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  1. User enters email & password                │
       │     POST /api/user/login                        │
       │     { email, password }                         │
       ├────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │  2. Verify credentials
       │                                                  │     - Check email exists
       │                                                  │     - Verify password
       │                                                  │     - Check user status
       │                                                  │
       │  3. Return JWT Token + User Info                │
       │     { token: "eyJhbGc...", user: {...} }        │
       │<────────────────────────────────────────────────┤
       │                                                  │
       │  4. Store token in browser                      │
       │     (localStorage/zustand)                      │
       │                                                  │
       │  5. Send token with every request               │
       │     Authorization: Bearer eyJhbGc...            │
       ├────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │  6. Validate token
       │                                                  │     - Check signature
       │                                                  │     - Check expiration
       │                                                  │     - Extract user info
       │                                                  │
       │  7. Return protected data                       │
       │<────────────────────────────────────────────────┤
       │                                                  │
```

### 📝 Detailed Steps

#### Step 1: User Login Request
```javascript
// Frontend sends login request
POST http://localhost:8080/api/user/login
Content-Type: application/json

{
  "emailId": "admin@shiksha-setu.com",
  "password": "admin123"
}
```

#### Step 2: Backend Validates Credentials
```java
// SecurityConfig.java - Password verification
public boolean authenticate(String email, String password) {
    User user = userRepository.findByEmail(email);
    return passwordEncoder.matches(password, user.getPassword());
}
```

#### Step 3: Generate JWT Token
```java
// JwtUtils.java - Token generation
public String generateToken(String email, String role) {
    return Jwts.builder()
        .setSubject(email)
        .claim("role", role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 1800000)) // 30 minutes
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();
}
```

#### Step 4: Frontend Stores Token
```javascript
// authStore.js - Store token in Zustand
setUser: (user, token) => set({ 
  user, 
  token, 
  isAuthenticated: !!token 
})
```

#### Step 5: Send Token with Requests
```javascript
// client.js - Axios interceptor adds token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Authorization System

### 👥 User Roles

```
┌─────────────────────────────────────────────────────────┐
│                    USER ROLES                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐    │
│  │  ADMIN   │      │  MENTOR  │      │ STUDENT  │    │
│  └────┬─────┘      └────┬─────┘      └────┬─────┘    │
│       │                 │                  │           │
│       │                 │                  │           │
│  ┌────▼─────────────────▼──────────────────▼──────┐   │
│  │         PERMISSIONS & ACCESS LEVELS            │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🔑 Role Permissions

| Role | Can Do |
|------|--------|
| **Admin** | ✅ Manage all users<br>✅ Approve/reject courses<br>✅ View all bookings<br>✅ Access analytics<br>✅ Manage categories |
| **Mentor** | ✅ Create courses<br>✅ Manage own courses<br>✅ View own students<br>✅ Update course content<br>✅ View earnings |
| **Student** | ✅ Browse courses<br>✅ Enroll in courses<br>✅ View own bookings<br>✅ Access purchased content<br>✅ Submit reviews |

### 🛡️ How Authorization Works

```
┌─────────────────────────────────────────────────────────────┐
│              REQUEST AUTHORIZATION FLOW                     │
└─────────────────────────────────────────────────────────────┘

1. Request arrives with JWT token
   ↓
2. JwtAuthFilter extracts token from header
   ↓
3. Validate token signature & expiration
   ↓
4. Extract user email & role from token
   ↓
5. Load user details from database
   ↓
6. Check if user has required role/permission
   ↓
7. ✅ Allow access OR ❌ Deny access (403 Forbidden)
```

---

## JWT Token Explained

### 🎫 What is a JWT Token?

A JWT token is like a **digital passport** that proves your identity without sending your password every time.

### 📦 Token Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBzaGlrc2hhLXNldHUuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA2NTQwMDAwLCJleHAiOjE3MDY1NDE4MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

├─────────────────────┬──────────────────────────────────────────────────────────────────────┬────────────────────────┐
│      HEADER         │                    PAYLOAD                                           │      SIGNATURE         │
├─────────────────────┼──────────────────────────────────────────────────────────────────────┼────────────────────────┤
│ Algorithm & Type    │ User Data (email, role, expiration)                                  │ Verification Code      │
│ {                   │ {                                                                    │ (Prevents tampering)   │
│   "alg": "HS256",   │   "sub": "admin@shiksha-setu.com",                                  │                        │
│   "typ": "JWT"      │   "role": "Admin",                                                   │                        │
│ }                   │   "iat": 1706540000,                                                 │                        │
│                     │   "exp": 1706541800                                                  │                        │
│                     │ }                                                                    │                        │
└─────────────────────┴──────────────────────────────────────────────────────────────────────┴────────────────────────┘
```

### 🔍 Token Components

1. **Header**: Tells what algorithm is used (HS256)
2. **Payload**: Contains user information (email, role, expiration)
3. **Signature**: Ensures token hasn't been tampered with

### ⏰ Token Expiration

```
Token Created: 8:00 PM
Token Expires: 8:30 PM (30 minutes later)

Timeline:
├─────────────────────────────────────────────────────────┤
8:00 PM                                              8:30 PM
  ↑                                                      ↑
  Token Valid                                    Token Expired
  ✅ Can access APIs                             ❌ Must login again
```

---

## Security Architecture

### 🏗️ Complete Security Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                             │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. Login Request
       ↓
┌──────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVER                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Step 1: CORS Filter                                   │    │
│  │  - Check if request is from allowed origin             │    │
│  │  - Allow: http://localhost:5173                        │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       ↓                                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Step 2: JWT Authentication Filter                     │    │
│  │  - Extract token from Authorization header             │    │
│  │  - Validate token signature                            │    │
│  │  - Check token expiration                              │    │
│  │  - Load user details                                   │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       ↓                                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Step 3: Security Context                              │    │
│  │  - Store authenticated user in context                 │    │
│  │  - Available for all subsequent filters                │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       ↓                                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Step 4: Authorization Filter                          │    │
│  │  - Check user role                                     │    │
│  │  - Verify endpoint permissions                         │    │
│  │  - Allow or deny access                                │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       ↓                                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Step 5: Controller                                    │    │
│  │  - Process business logic                              │    │
│  │  - Access database                                     │    │
│  │  - Return response                                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 🔒 Security Components

#### 1. SecurityConfig.java
```java
// Defines which endpoints are public and which need authentication
@Configuration
public class SecurityConfig {
    
    // Public endpoints (no authentication needed)
    - /api/user/login
    - /api/user/register
    - /api/course/all
    - /api/course/category/fetch/all
    
    // Protected endpoints (authentication required)
    - /api/course/booking/**
    - /api/user/profile
    - /api/course/add (Mentor only)
    - /api/user/fetch/** (Admin only)
}
```

#### 2. JwtAuthFilter.java
```java
// Intercepts every request and validates JWT token
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) {
        // 1. Extract token from header
        String token = extractToken(request);
        
        // 2. Validate token
        if (token != null && jwtUtils.validateToken(token)) {
            // 3. Get user details
            String email = jwtUtils.extractEmail(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            // 4. Set authentication in context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        // 5. Continue to next filter
        filterChain.doFilter(request, response);
    }
}
```

#### 3. JwtUtils.java
```java
// Handles JWT token creation and validation
@Component
public class JwtUtils {
    
    // Generate token
    public String generateToken(String email, String role) {
        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1800000))
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    // Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

---

## API Endpoints Security

### 🌐 Endpoint Access Matrix

| Endpoint | Public | Student | Mentor | Admin |
|----------|--------|---------|--------|-------|
| `POST /api/user/login` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/user/register` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/course/all` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/course/category/fetch/all` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/course/add` | ❌ | ❌ | ✅ | ✅ |
| `POST /api/course/booking/add` | ❌ | ✅ | ❌ | ✅ |
| `GET /api/course/booking/fetch/customer-wise` | ❌ | ✅ | ❌ | ✅ |
| `GET /api/course/booking/fetch/mentor-wise` | ❌ | ❌ | ✅ | ✅ |
| `GET /api/user/fetch/role-wise` | ❌ | ❌ | ❌ | ✅ |
| `DELETE /api/user/mentor/delete` | ❌ | ❌ | ❌ | ✅ |

### 🔐 Security Levels

```
┌─────────────────────────────────────────────────────────┐
│              SECURITY LEVELS                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Level 1: PUBLIC                                        │
│  ├─ No authentication required                         │
│  ├─ Anyone can access                                  │
│  └─ Examples: Login, Register, Browse courses          │
│                                                         │
│  Level 2: AUTHENTICATED                                 │
│  ├─ Must be logged in                                  │
│  ├─ Valid JWT token required                           │
│  └─ Examples: View profile, Update settings            │
│                                                         │
│  Level 3: ROLE-BASED                                    │
│  ├─ Must be logged in                                  │
│  ├─ Must have specific role                            │
│  └─ Examples: Create course (Mentor), Manage users     │
│                                                         │
│  Level 4: ADMIN ONLY                                    │
│  ├─ Must be logged in as Admin                         │
│  ├─ Highest level of access                            │
│  └─ Examples: Delete users, View all data              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## How to Test Security

### 🧪 Test Scenarios

#### Test 1: Access Public Endpoint (No Token)
```bash
# Should work without authentication
curl -X GET http://localhost:8080/api/course/all

# Expected: 200 OK with course list
```

#### Test 2: Access Protected Endpoint (No Token)
```bash
# Should fail without authentication
curl -X GET http://localhost:8080/api/course/booking/fetch/customer-wise

# Expected: 401 Unauthorized
```

#### Test 3: Login and Get Token
```bash
# Login to get token
curl -X POST http://localhost:8080/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "admin@shiksha-setu.com",
    "password": "admin123"
  }'

# Expected: 200 OK with token
# Response: { "jwtToken": "eyJhbGc...", "user": {...} }
```

#### Test 4: Access Protected Endpoint (With Token)
```bash
# Use token from previous step
curl -X GET http://localhost:8080/api/course/booking/fetch/customer-wise \
  -H "Authorization: Bearer eyJhbGc..."

# Expected: 200 OK with booking data
```

#### Test 5: Access Admin Endpoint (Student Token)
```bash
# Login as student
curl -X POST http://localhost:8080/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "student@shiksha-setu.com",
    "password": "student123"
  }'

# Try to access admin endpoint
curl -X GET http://localhost:8080/api/user/fetch/role-wise?role=Student \
  -H "Authorization: Bearer <student_token>"

# Expected: 403 Forbidden (insufficient permissions)
```

#### Test 6: Expired Token
```bash
# Wait 30 minutes after login, then try to access
curl -X GET http://localhost:8080/api/course/booking/fetch/customer-wise \
  -H "Authorization: Bearer <expired_token>"

# Expected: 401 Unauthorized (token expired)
```

### 🎯 Testing with Frontend

1. **Open Test Page**: Navigate to `http://localhost:5173/test`
2. **View Test Results**: See which APIs are working
3. **Check Authentication**: See your current login status
4. **Test Different Roles**: Login as Admin, Mentor, or Student

### 📊 Security Checklist

- ✅ Passwords are encrypted (BCrypt)
- ✅ JWT tokens expire after 30 minutes
- ✅ Tokens are validated on every request
- ✅ Role-based access control is enforced
- ✅ CORS is configured for frontend origin
- ✅ Sensitive endpoints require authentication
- ✅ Admin endpoints require admin role
- ✅ SQL injection prevention (JPA/Hibernate)
- ✅ XSS prevention (React escapes by default)

---

## 🔑 Test Credentials

Use these credentials to test different roles:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@shiksha-setu.com | admin123 |
| **Mentor** | mentor@shiksha-setu.com | mentor123 |
| **Student** | student@shiksha-setu.com | student123 |

---

## 🛠️ Configuration Files

### Backend Configuration
- **SecurityConfig.java**: Defines security rules
- **JwtAuthFilter.java**: Validates JWT tokens
- **JwtUtils.java**: Creates and validates tokens
- **application.properties**: JWT secret and expiration

### Frontend Configuration
- **authStore.js**: Stores user and token
- **client.js**: Adds token to requests
- **services.js**: API endpoint definitions

---

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - Decode and verify JWT tokens
- [Spring Security Docs](https://spring.io/projects/spring-security)
- [OWASP Security Guide](https://owasp.org/)

---

## 🤝 Support

If you have questions about security:
1. Check this guide first
2. Visit the test page at `/test`
3. Check browser console for errors
4. Check backend logs for authentication issues

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Project**: Shiksha Setu Learning Management System
