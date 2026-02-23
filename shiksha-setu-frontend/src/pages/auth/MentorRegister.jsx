import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, BookOpen, Award, Briefcase } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { authAPI } from '@api/services';
import { useAuthStore } from '@store/authStore';
import toast from 'react-hot-toast';

export const MentorRegister = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNo: '',
    password: '',
    role: 'ROLE_MENTOR',
    street: '',
    city: '',
    pincode: '',
    // Mentor-specific fields
    expertise: '',
    experience: '',
    bio: '',
    qualification: ''
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
      console.log('Sending mentor registration data:', JSON.stringify(formData, null, 2));
      const response = await authAPI.register(formData);
      console.log('Registration response:', response.data);
      if (response.data.success) {
        setUser(response.data.user, response.data.jwtToken);
        toast.success('Mentor registration successful! Welcome to Shiksha Setu!');
        navigate('/dashboard/mentor');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <motion.div
          variants={itemVariants}
          className="glass rounded-3xl p-8 backdrop-blur-xl border border-white border-opacity-30 shadow-2xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-4xl text-white">👨‍🏫</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Become a Mentor</h1>
            <p className="text-gray-600">Share your knowledge and inspire learners</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>
            </motion.div>

            {/* Security */}
            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                required
              />
            </motion.div>

            {/* Professional Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Area of Expertise"
                  type="text"
                  name="expertise"
                  placeholder="e.g., Web Development, Data Science, UI/UX Design"
                  value={formData.expertise}
                  onChange={handleChange}
                  icon={BookOpen}
                  required
                />
                <Input
                  label="Years of Experience"
                  type="text"
                  name="experience"
                  placeholder="e.g., 5+ years in software development"
                  value={formData.experience}
                  onChange={handleChange}
                  icon={Award}
                  required
                />
                <Input
                  label="Highest Qualification"
                  type="text"
                  name="qualification"
                  placeholder="e.g., Master's in Computer Science"
                  value={formData.qualification}
                  onChange={handleChange}
                  icon={Award}
                  required
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your professional journey, achievements, and what you're passionate about teaching..."
                    rows={4}
                    className="input-base resize-none"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Address Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="Street"
                  type="text"
                  name="street"
                  placeholder="Street address"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="City"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Pincode"
                  type="number"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                loading={loading}
              >
                Join as Mentor
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Want to join as a student?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Student Registration
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