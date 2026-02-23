import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, UserCheck, UserX, Eye, Shield, Settings, BarChart3 } from 'lucide-react';
import { Card, Button, Badge } from '@components/ui';
import { useAuthStore } from '@store/authStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading for better UX
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
  const mockUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', emailId: 'john@example.com', role: 'Student', status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', emailId: 'jane@example.com', role: 'Mentor', status: 'Active' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', emailId: 'mike@example.com', role: 'Student', status: 'Active' },
    { id: 4, firstName: 'Sarah', lastName: 'Wilson', emailId: 'sarah@example.com', role: 'Mentor', status: 'Inactive' },
    { id: 5, firstName: 'Alex', lastName: 'Brown', emailId: 'alex@example.com', role: 'Student', status: 'Active' }
  ];

  const mockCourses = [
    { id: 1, name: 'React Development', mentor: 'Jane Smith', students: 156, status: 'Active', price: '$299' },
    { id: 2, name: 'JavaScript Fundamentals', mentor: 'Mike Johnson', students: 89, status: 'Active', price: '$199' },
    { id: 3, name: 'Python Basics', mentor: 'Sarah Wilson', students: 67, status: 'Pending', price: '$249' },
    { id: 4, name: 'Node.js Backend', mentor: 'John Doe', students: 45, status: 'Active', price: '$349' },
    { id: 5, name: 'Database Design', mentor: 'Alex Brown', students: 78, status: 'Active', price: '$279' }
  ];

  const mockStats = {
    totalUsers: mockUsers.length,
    totalCourses: mockCourses.length,
    totalRevenue: 45230,
    activeUsers: mockUsers.filter(u => u.status === 'Active').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Welcome back, {user?.firstName || 'Admin'}! Manage your platform and monitor activities.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="success" size="lg">
              <Shield className="w-4 h-4 mr-2" />
              Admin Access
            </Badge>
            <Button variant="outline" icon={Settings}>
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Users, 
                label: 'Total Users', 
                value: mockStats.totalUsers,
                color: 'from-blue-500 to-cyan-500',
                change: '+12%'
              },
              { 
                icon: BookOpen, 
                label: 'Total Courses', 
                value: mockStats.totalCourses,
                color: 'from-green-500 to-emerald-500',
                change: '+8%'
              },
              { 
                icon: DollarSign, 
                label: 'Total Revenue', 
                value: `$${mockStats.totalRevenue.toLocaleString()}`,
                color: 'from-purple-500 to-pink-500',
                change: '+23%'
              },
              { 
                icon: TrendingUp, 
                label: 'Active Users', 
                value: mockStats.activeUsers,
                color: 'from-orange-500 to-red-500',
                change: '+15%'
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card variant="elevated" className="text-center p-6 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                  <p className="text-green-500 text-sm font-semibold">{stat.change} from last month</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage users, roles, and permissions</p>
              <Button variant="primary" size="sm" className="w-full">
                Manage Users
              </Button>
            </Card>

            <Card variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Course Approval</h3>
              </div>
              <p className="text-gray-600 mb-4">Review and approve new courses</p>
              <Button variant="primary" size="sm" className="w-full">
                Review Courses
              </Button>
            </Card>

            <Card variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">View detailed platform analytics</p>
              <Button variant="primary" size="sm" className="w-full">
                View Analytics
              </Button>
            </Card>
          </div>
        </motion.div>

        {/* Users Management */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Users</h2>
            <Button variant="outline" size="sm">
              View All Users
            </Button>
          </div>

          <Card variant="elevated" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockUsers.slice(0, 5).map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {user.firstName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.emailId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={user.role === 'Mentor' ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={user.status === 'Active' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" icon={Eye}>
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={user.status === 'Active' ? UserX : UserCheck}
                          >
                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Courses Management */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Courses</h2>
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.slice(0, 6).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-400 rounded-t-2xl flex items-center justify-center text-4xl">
                    📚
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 line-clamp-2">
                        {course.name}
                      </h3>
                      <Badge 
                        variant={course.status === 'Active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {course.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      By {course.mentor}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-600">
                        {course.students} students
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {course.price}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" icon={Eye} className="flex-1">
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        {course.status === 'Pending' ? 'Approve' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Platform Activity</h2>
          
          <Card variant="elevated" className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New user registered', details: 'John Doe joined as Student', time: '2 hours ago', icon: '👤', color: 'bg-blue-100 text-blue-600' },
                { action: 'Course approved', details: 'React Development by Jane Smith', time: '4 hours ago', icon: '✅', color: 'bg-green-100 text-green-600' },
                { action: 'Payment processed', details: '$299 for JavaScript Course', time: '6 hours ago', icon: '💳', color: 'bg-purple-100 text-purple-600' },
                { action: 'New mentor application', details: 'Mike Johnson applied as Mentor', time: '1 day ago', icon: '📝', color: 'bg-orange-100 text-orange-600' },
                { action: 'Course completed', details: 'Python Basics completed by 15 students', time: '2 days ago', icon: '🎓', color: 'bg-indigo-100 text-indigo-600' }
              ].map((activity, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}>
                    <span className="text-xl">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;