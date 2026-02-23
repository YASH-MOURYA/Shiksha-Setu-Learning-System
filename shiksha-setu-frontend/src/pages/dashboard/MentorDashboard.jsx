import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, DollarSign, BookOpen, Star, Eye, MessageSquare } from 'lucide-react';
import { Card, Button, Badge, LoadingSpinner } from '../../components/ui/index';
import { useAuthStore } from '../../store/authStore';
import { courseAPI } from '../../api/services';
import toast from 'react-hot-toast';

export default function MentorDashboard() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    avgRating: 0,
    totalViews: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchMentorDashboard();
  }, []);

  const fetchMentorDashboard = async () => {
    try {
      setLoading(true);
      // Fetch all courses
      const coursesResponse = await courseAPI.getAllCourses();
      const allCourses = coursesResponse?.data?.courses || coursesResponse?.data?.data || [];
      
      // Filter courses for current mentor (courses where mentorId matches user.id)
      const mentorCourses = Array.isArray(allCourses) 
        ? allCourses.filter(c => c.mentorId === user?.id)
        : [];
      
      setCourses(mentorCourses);

      // Calculate stats
      const totalStudents = mentorCourses.reduce((sum, c) => sum + (c.enrollments?.length || c.studentCount || 0), 0) || 0;
      const totalRevenue = mentorCourses.reduce((sum, c) => sum + (c.revenue || 0), 0) || 0;
      const avgRating = mentorCourses.length > 0
        ? (mentorCourses.reduce((sum, c) => sum + (c.rating || 4), 0) / mentorCourses.length).toFixed(1)
        : 0;
      const totalViews = mentorCourses.reduce((sum, c) => sum + (c.views || 0), 0) || 0;
      const totalQuestions = mentorCourses.reduce((sum, c) => sum + (c.questions?.length || 0), 0) || 0;

      setStats({
        totalCourses: mentorCourses.length || 0,
        totalStudents,
        totalRevenue,
        avgRating,
        totalViews,
        totalQuestions,
      });
    } catch (error) {
      console.error('Failed to fetch mentor dashboard:', error);
      toast.error('Failed to load mentor dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 pt-8 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-2">Mentor Dashboard</h1>
          <p className="text-gray-300">Manage your courses and track student progress</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Courses</p>
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
              <p className="text-xs text-blue-300 mt-1">Active courses</p>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Students</p>
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              <p className="text-xs text-green-300 mt-1">Total enrolled</p>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Revenue</p>
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-purple-300 mt-1">Total earnings</p>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Rating</p>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
              <p className="text-xs text-yellow-300 mt-1">Average rating</p>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Views</p>
                <Eye className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-white">{(stats.totalViews / 1000).toFixed(1)}k</p>
              <p className="text-xs text-pink-300 mt-1">Course views</p>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-xs">Questions</p>
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalQuestions}</p>
              <p className="text-xs text-cyan-300 mt-1">Unanswered</p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-semibold transition-all ${
              activeTab === 'overview'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 font-semibold transition-all ${
              activeTab === 'courses'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 font-semibold transition-all ${
              activeTab === 'students'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Students
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />
                  Revenue Trend
                </h3>
                <div className="space-y-3">
                  {[
                    { month: 'Jan', revenue: 5000, width: 40 },
                    { month: 'Feb', revenue: 8000, width: 64 },
                    { month: 'Mar', revenue: 12000, width: 96 },
                    { month: 'Apr', revenue: stats.totalRevenue, width: 100 },
                  ].map((item) => (
                    <div key={item.month}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.month}</span>
                        <span className="text-sm font-semibold text-indigo-400">₹{item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.width}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
                    <span className="text-gray-300">Enrollment Rate</span>
                    <span className="text-xl font-bold text-green-400">+35%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg border border-blue-500/20">
                    <span className="text-gray-300">Avg Rating</span>
                    <span className="text-xl font-bold text-blue-400">{stats.avgRating} ⭐</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/20">
                    <span className="text-gray-300">Completion Rate</span>
                    <span className="text-xl font-bold text-purple-400">78%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-orange-500/20">
                    <span className="text-gray-300">Response Rate</span>
                    <span className="text-xl font-bold text-orange-400">95%</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex justify-end mb-6">
              <Button variant="primary">+ Create New Course</Button>
            </div>

            {courses.length === 0 ? (
              <Card className="bg-white/5 border-white/10 p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-300 mb-4">No courses created yet</p>
                <Button variant="primary">Create Your First Course</Button>
              </Card>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {courses.map((course) => (
                  <motion.div key={course.id} variants={item}>
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/5 border-white/10">
                      <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
                        {course.image && (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs text-gray-300">
                            <span>{course.enrollments || 0} students enrolled</span>
                            <Badge variant="neutral">{course.rating || 0} ⭐</Badge>
                          </div>
                          <div className="flex justify-between text-xs text-gray-300">
                            <span>{course.views || 0} views</span>
                            <span>₹{course.price || 0}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm" className="flex-1">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-white">Student {i + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">Course Name</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(i + 1) * 20}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Badge variant={i % 2 === 0 ? 'success' : 'warning'}>
                            {i % 2 === 0 ? 'Active' : 'In Progress'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">2 days ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
