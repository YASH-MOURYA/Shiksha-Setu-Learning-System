# Shiksha Setu - Frontend

A modern, premium Learning Management System (LMS) frontend built with **React + Vite**, featuring smooth animations, responsive design, and seamless API integration.

## 🎨 Features

### UI/UX
- **Premium Glass Morphism Design** - Modern frosted glass effect UI
- **Smooth Animations** - Framer Motion animations throughout the app
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode Ready** - Easy to implement theme switching
- **Gradient Effects** - Beautiful gradient text and backgrounds

### Functionality
- 🔐 **Authentication** - Login/Register with JWT token management
- 📚 **Course Management** - Browse, search, and enroll in courses
- 👥 **User Profiles** - Student and Mentor dashboards
- 💳 **Booking System** - Enroll in courses with payment integration
- 📊 **Dashboard** - Track learning progress (coming soon)
- 🔔 **Notifications** - Real-time notifications with React Hot Toast

### Tech Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
shiksha-setu-frontend/
├── src/
│   ├── api/
│   │   ├── client.js          # Axios client with interceptors
│   │   └── services.js        # API endpoint functions
│   ├── components/
│   │   ├── ui/
│   │   │   └── index.jsx      # Reusable UI components
│   │   └── layout/
│   │       ├── Navbar.jsx     # Navigation bar
│   │       ├── Footer.jsx     # Footer
│   │       └── index.jsx      # Layout wrapper
│   ├── pages/
│   │   ├── Home.jsx           # Home page
│   │   ├── auth/
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   └── courses/
│   │       ├── Courses.jsx    # Courses listing
│   │       └── CourseDetail.jsx # Course details
│   ├── store/
│   │   └── authStore.js       # Zustand auth store
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── package.json               # Dependencies
└── index.html                 # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running at `http://localhost:8080`

### Installation

1. **Navigate to frontend directory:**
```bash
cd shiksha-setu-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
# .env
VITE_API_URL=http://localhost:8080
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

## 📚 API Integration

The frontend is fully integrated with the backend LMS API:

### Authentication
- `POST /user/register` - Register new user
- `POST /user/login` - Login user
- `GET /user/profile` - Get user profile

### Courses
- `GET /course/all` - Get all courses
- `GET /course/{id}` - Get course details
- `POST /course/add` - Create course (mentor)
- `PUT /course/{id}` - Update course (mentor)
- `DELETE /course/{id}` - Delete course (mentor)

### Bookings
- `GET /booking/all` - Get all bookings
- `GET /booking/my-bookings` - Get user bookings
- `POST /booking/add` - Enroll in course
- `PUT /booking/{id}/status` - Update booking status

### Categories
- `GET /category/all` - Get all categories
- `POST /category/add` - Create category

### Sections & Topics
- `GET /courseSection/course/{courseId}` - Get course sections
- `GET /courseSectionTopic/section/{sectionId}` - Get topic details

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize color scheme:
```javascript
colors: {
  primary: '#6366f1',      // Indigo
  secondary: '#8b5cf6',    // Purple
  accent: '#ec4899',       // Pink
}
```

### Animations
- Framer Motion animations are used throughout the app
- Tailwind animations for CSS-based effects
- Custom animations in `index.css`

### Components
Reusable UI components in `src/components/ui/index.jsx`:
- `Button` - With variants (primary, secondary, ghost, danger)
- `Input` - With icon support and error handling
- `Card` - Glass morphism effect
- `Badge` - With color variants
- `Modal` - Animated modal dialog
- `LoadingSpinner` - Animated loader

## 📱 Responsive Design

- **Mobile**: Full responsive design for phones (< 640px)
- **Tablet**: Optimized for tablets (640px - 1024px)
- **Desktop**: Full-featured desktop experience (> 1024px)

## 🔐 Security

- JWT token stored in Zustand store (can be moved to httpOnly cookies)
- Automatic token injection in API requests
- 401 response handling with automatic logout
- Protected routes with authentication check

## 🚀 Performance

- **Code Splitting**: Route-based code splitting with React Router
- **Lazy Loading**: Components can be lazy loaded as needed
- **Image Optimization**: Use of SVG icons and optimized imagery
- **CSS Optimization**: Tailwind purges unused CSS in production

## 📈 Future Enhancements

- [ ] Dashboard with progress tracking
- [ ] Real-time notifications with WebSocket
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Video player for course content
- [ ] Discussion forums
- [ ] Certificate generation
- [ ] Advanced search and filtering
- [ ] User ratings and reviews
- [ ] Mentor profile customization

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, ensure the backend is running and the API URL in `.env` is correct.

### API 401 Errors
- Check if token is valid
- Try logging out and logging back in
- Clear browser localStorage

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions, contact the development team or check the documentation.

---

**Built with ❤️ for better learning**
