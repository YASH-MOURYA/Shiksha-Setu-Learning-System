import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout';
import { useAuthStore } from './store/authStore';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { MentorRegister } from './pages/auth/MentorRegister';
import { Courses } from './pages/courses/Courses';
import { CourseDetail } from './pages/courses/CourseDetail';
import CourseManagement from './pages/courses/CourseManagement';
import { Categories } from './pages/Categories';
import { TestPage } from './pages/TestPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import WorkingMentorDashboard from './pages/dashboard/WorkingMentorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Role-based Dashboard Route Component
const DashboardRoute = () => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const userRole = user.role?.toLowerCase();
  
  if (user.role === 'Admin' || userRole === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (user.role === 'Mentor' || userRole === 'mentor') {
    return <Navigate to="/dashboard/mentor" replace />;
  } else {
    return <Navigate to="/dashboard/student" replace />;
  }
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mentor-register" element={<MentorRegister />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/test" element={<TestPage />} />

          {/* Protected Routes */}
          <Route
            path="/course-management"
            element={
              <ProtectedRoute>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/mentor"
            element={
              <ProtectedRoute>
                <WorkingMentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRoute />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
