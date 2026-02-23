import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { authAPI } from '@api/services';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare login data - only send emailId and password
      const loginData = {
        emailId: formData.emailId,
        password: formData.password
      };
      
      console.log('Sending login request with data:', loginData);
      const response = await authAPI.login(loginData);
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData, response.data.jwtToken);
        toast.success('Login successful!');
        
        console.log('User role from backend:', userData.role);
        
        // Route based on user role (backend returns 'Admin', 'Mentor', 'Student')
        const userRole = userData.role?.toLowerCase();
        
        if (userData.role === 'Admin' || userRole === 'admin') {
          console.log('Redirecting to admin dashboard');
          navigate('/dashboard/admin', { replace: true });
        } else if (userData.role === 'Mentor' || userRole === 'mentor') {
          console.log('Redirecting to mentor dashboard');
          navigate('/dashboard/mentor', { replace: true });
        } else {
          console.log('Redirecting to student dashboard');
          navigate('/dashboard/student', { replace: true });
        }
      } else {
        toast.error(response.data.responseMessage || 'Login failed');
      }
    } catch (error) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error(error.response?.data?.responseMessage || error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="glass rounded-3xl p-8 backdrop-blur-xl border border-white border-opacity-30 shadow-2xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
              <span className="text-3xl text-white">🎓</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <Input
                label="Email"
                type="email"
                name="emailId"
                placeholder="Enter your email"
                value={formData.emailId}
                onChange={handleChange}
                icon={Mail}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="text-right">
              <a href="#" className="text-primary hover:text-secondary text-sm font-semibold">
                Forgot password?
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Login
              </Button>
            </motion.div>

            {/* Quick Login Buttons for Testing */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3 text-center">Quick Login (Development)</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({ emailId: 'admin@shiksha-setu.com', password: 'admin123' });
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({ emailId: 'mentor@shiksha-setu.com', password: 'mentor123' });
                    }}
                  >
                    Mentor
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({ emailId: 'student@shiksha-setu.com', password: 'student123' });
                    }}
                  >
                    Student
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
