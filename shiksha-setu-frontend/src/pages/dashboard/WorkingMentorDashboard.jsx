import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, Button, Badge } from '@components/ui';
import { useAuthStore } from '@store/authStore';
import { courseAPI, bookingAPI } from '@api/services';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const WorkingMentorDashboard = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    avgRating: 4.5
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch mentor's courses
      try {
        const coursesResponse = await courseAPI.getCoursesByMentor(user.id);
        if (coursesResponse.data?.success) {
          const mentorCourses = coursesResponse.data.courses || [];
          setCourses(mentorCourses);
          
          // Calculate stats
          const totalRevenue = mentorCourses.reduce((sum, course) => 
            sum + (parseFloat(course.fee) || 0), 0
          );
          
          setStats(prev => ({
            ...prev,
            totalCourses: mentorCourses.length,
            totalRevenue: totalRevenue
          }));
        }
      } catch (error) {
        console.log('Using mock data for courses');
        // Use mock data
        const mockCourses = [
          {
            id: 1,
            name: 'React Development Masterclass',
            fee: 299,
            students: 156,
            status: 'Active'
          },
          {
            id: 2,
            name: 'JavaScript Fundamentals',
            fee: 199,
            students: 89,
            status: 'Active'
          }
        ];
        setCourses(mockCourses);
        setStats(prev => ({
          ...prev,
          totalCourses: mockCourses.length,
          totalRevenue: mockCourses.reduce((sum, c) => sum + c.fee, 0),
          totalStudents: mockCourses.reduce((sum, c) => sum + c.students, 0)
        }));
      }

      // Fetch bookings
      try {
        const bookingsResponse = await bookingAPI.getAllBookings();
        if (bookingsResponse.data?.success) {
          setBookings(bookingsResponse.data.bookings || []);
        }
      } catch (error) {
        console.log('Bookings not available');
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(courseId);
        toast.success('Course deleted successfully!');
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
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
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-responsive-lg font-bold gradient-text mb-2">
              Mentor Dashboard 👨‍🏫
            </h1>
            <p className="text-xl text-gray-600">
              Welcome back, {user?.firstName || 'Mentor'}! Manage your courses and track your impact.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/course-management">
              <Button variant="outline" size="lg" icon={BookOpen}>
                Manage Courses
              </Button>
            </Link>
            <Link to="/course-management">
              <Button variant="primary" size="lg" icon={Plus}>
                Create Course
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: BookOpen, 
                label: 'Total Courses', 
                value: stats.totalCourses,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Users, 
                label: 'Total Students', 
                value: stats.totalStudents,
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: DollarSign, 
                label: 'Total Revenue', 
                value: `$${stats.totalRevenue.toLocaleString()}`,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                icon: TrendingUp, 
                label: 'Avg Rating', 
                value: stats.avgRating.toFixed(1),
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

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/course-management">
                <Button variant="outline" className="w-full" icon={Plus}>
                  Create New Course
                </Button>
              </Link>
              <Link to="/course-management">
                <Button variant="outline" className="w-full" icon={BookOpen}>
                  Manage Courses
                </Button>
              </Link>
              <Button variant="outline" className="w-full" icon={TrendingUp}>
                View Analytics
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Courses Management */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <Link to="/course-management">
              <Button variant="primary" size="sm" icon={Plus}>
                Add Course
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="flex">
                    {/* Course Thumbnail */}
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-4xl flex-shrink-0">
                      📚
                    </div>
                    
                    {/* Course Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {course.name || course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.students || 0} students
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${course.fee || 0}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant={course.status === 'Active' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {course.status || 'Active'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="primary" size="sm" icon={Eye}>
                            View
                          </Button>
                        </Link>
                        <Link to="/course-management">
                          <Button variant="outline" size="sm" icon={Edit}>
                            Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Trash2}
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Create your first course and start teaching</p>
              <Link to="/course-management">
                <Button variant="primary" size="lg" icon={Plus}>
                  Create Your First Course
                </Button>
              </Link>
            </motion.div>
          )}

          {courses.length > 3 && (
            <div className="text-center mt-6">
              <Link to="/course-management">
                <Button variant="outline" size="lg">
                  View All Courses ({courses.length})
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <Card variant="elevated" className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New student enrolled', course: 'React Development', time: '2 hours ago', icon: '👨‍🎓' },
                { action: 'Course completed', course: 'JavaScript Fundamentals', time: '1 day ago', icon: '🎉' },
                { action: 'New review received', course: 'React Development', time: '2 days ago', icon: '⭐' },
                { action: 'Course updated', course: 'Node.js Backend', time: '3 days ago', icon: '📝' }
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

export default WorkingMentorDashboard;