import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, Star } from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@components/ui';
import { useAuthStore } from '@store/authStore';
import { bookingAPI, courseAPI } from '@api/services';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificates: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch enrolled courses using the correct endpoint
      if (user?.id) {
        try {
          const response = await bookingAPI.getStudentCourses(user.id);
          if (response.data && response.data.success) {
            const enrolledCourses = response.data.bookings || [];
            setEnrolledCourses(enrolledCourses);
            setStats(prev => ({
              ...prev,
              totalCourses: enrolledCourses.length,
              completedCourses: enrolledCourses.filter(c => c.progress === 100).length
            }));
          }
        } catch (error) {
          console.log('No enrolled courses found or API not available:', error.message);
          // Use mock data for demonstration
          const mockEnrolledCourses = [
            {
              id: 1,
              course: {
                id: 1,
                name: 'React Development Masterclass',
                description: 'Master React from basics to advanced concepts',
                mentor: { firstName: 'John', lastName: 'Doe' }
              },
              progress: 75,
              bookingStatus: 'Confirmed'
            },
            {
              id: 2,
              course: {
                id: 2,
                name: 'JavaScript Fundamentals',
                description: 'Learn JavaScript programming fundamentals',
                mentor: { firstName: 'Jane', lastName: 'Smith' }
              },
              progress: 100,
              bookingStatus: 'Confirmed'
            }
          ];
          setEnrolledCourses(mockEnrolledCourses);
          setStats(prev => ({
            ...prev,
            totalCourses: mockEnrolledCourses.length,
            completedCourses: mockEnrolledCourses.filter(c => c.progress === 100).length
          }));
        }
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock data for demonstration
  const mockCourses = [
    {
      id: 1,
      courseName: 'React Development Masterclass',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      instructor: 'John Doe',
      thumbnail: '⚛️'
    },
    {
      id: 2,
      courseName: 'JavaScript Fundamentals',
      progress: 100,
      totalLessons: 16,
      completedLessons: 16,
      instructor: 'Jane Smith',
      thumbnail: '📜'
    },
    {
      id: 3,
      courseName: 'UI/UX Design Principles',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      instructor: 'Mike Johnson',
      thumbnail: '🎨'
    }
  ];

  // Process enrolled courses for display
  const displayCourses = enrolledCourses.map(booking => ({
    id: booking.course?.id || booking.id,
    courseName: booking.course?.name || booking.name || 'Course Name',
    progress: booking.progress || Math.floor(Math.random() * 100),
    totalLessons: 24,
    completedLessons: Math.floor((booking.progress || 50) / 100 * 24),
    instructor: booking.course?.mentor ? 
      `${booking.course.mentor.firstName} ${booking.course.mentor.lastName}` : 
      'Instructor',
    thumbnail: '📚'
  }));

  // If no real data, use mock data
  const coursesToShow = displayCourses.length > 0 ? displayCourses : mockCourses;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-responsive-lg font-bold gradient-text mb-2">
            Welcome back, {user?.firstName || 'Student'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Continue your learning journey and achieve your goals
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: BookOpen, 
                label: 'Enrolled Courses', 
                value: displayCourses.length,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Clock, 
                label: 'Learning Hours', 
                value: '24h',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: Award, 
                label: 'Certificates', 
                value: '2',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                icon: TrendingUp, 
                label: 'Progress', 
                value: '73%',
                color: 'from-orange-500 to-red-500'
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card variant="elevated" className="text-center p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Courses */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <Link to="/courses">
              <Button variant="outline" size="sm">
                Browse More
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesToShow.map((course, i) => (
              <motion.div
                key={course.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-6xl">
                    {course.thumbnail || '📚'}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 line-clamp-2">
                        {course.courseName || course.title}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {course.progress || 0}%
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      By {course.instructor || 'Instructor'}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{course.completedLessons || 0}/{course.totalLessons || 0} lessons</span>
                      </div>
                      <ProgressBar progress={course.progress || 0} showLabel={false} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/course/${course.id}`}>
                        <Button variant="primary" size="sm" icon={Play} className="flex-1">
                          Continue
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" icon={Star}>
                        Rate
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {coursesToShow.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
              <Link to="/courses">
                <Button variant="primary" size="lg">
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <Card variant="elevated" className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Completed lesson', course: 'React Development', time: '2 hours ago', icon: '✅' },
                { action: 'Started new course', course: 'UI/UX Design', time: '1 day ago', icon: '🚀' },
                { action: 'Earned certificate', course: 'JavaScript Fundamentals', time: '3 days ago', icon: '🏆' },
                { action: 'Joined discussion', course: 'React Development', time: '5 days ago', icon: '💬' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.course}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;