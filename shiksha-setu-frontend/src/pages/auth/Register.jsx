import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { authAPI } from '@api/services';
import { useAuthStore } from '@store/authStore';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNo: '',
    password: '',
    role: 'ROLE_STUDENT',
    street: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'number' ? (value ? parseInt(value) : '') : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Sending registration data:', JSON.stringify(formData, null, 2));
      const response = await authAPI.register(formData);
      console.log('Registration response:', response.data);
      if (response.data.success) {
        // Backend now returns user and jwtToken
        setUser(response.data.user, response.data.jwtToken);
        toast.success('Registration successful!');
        const userRole = response.data.user.role;
        navigate(userRole === 'ROLE_MENTOR' ? '/dashboard/mentor' : '/dashboard/student');
      }
    } catch (error) {
      console.error('Registration error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      const errorMsg = error.response?.data?.responseMessage || error.response?.data?.message || 'Registration failed';
      toast.error(errorMsg);
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
            <h1 className="text-3xl font-bold gradient-text mb-2">Join as Student</h1>
            <p className="text-gray-600">Start your learning journey today</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <Input
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                icon={User}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                icon={User}
                required
              />
            </motion.div>

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
                label="Phone Number"
                type="tel"
                name="phoneNo"
                placeholder="Enter your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                icon={Phone}
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

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-base"
                disabled
              >
                <option value="ROLE_STUDENT">Student</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Want to teach? <Link to="/mentor-register" className="text-primary font-semibold hover:underline">Register as Mentor</Link>
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Street"
                type="text"
                name="street"
                placeholder="Enter your street address"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="City"
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Pincode"
                type="number"
                name="pincode"
                placeholder="Enter your pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Want to teach instead?{' '}
              <Link to="/mentor-register" className="text-emerald-600 font-semibold hover:underline">
                Become a Mentor
              </Link>
            </p>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
