import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, Button, Badge } from '@components/ui';
import { categoryAPI, courseAPI } from '@api/services';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      // Try to fetch categories
      try {
        const response = await categoryAPI.getAllCategories();
        if (response.data && response.data.success) {
          setCategories(response.data.categories || []);
        }
      } catch (error) {
        console.log('Categories API not available, using mock data');
        // Set mock categories
        setCategories(getMockCategories());
      }

    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const getMockCategories = () => [
    {
      id: 1,
      name: 'Web Development',
      description: 'Learn to build modern websites and web applications',
      courseCount: 45,
      studentCount: 12500,
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Master data analysis, machine learning, and AI',
      courseCount: 32,
      studentCount: 8900,
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 3,
      name: 'Mobile Development',
      description: 'Create mobile apps for iOS and Android',
      courseCount: 28,
      studentCount: 6700,
      icon: '📱',
      color: 'from-green-500 to-emerald-500',
      popular: false
    },
    {
      id: 4,
      name: 'UI/UX Design',
      description: 'Design beautiful and user-friendly interfaces',
      courseCount: 24,
      studentCount: 5400,
      icon: '🎨',
      color: 'from-orange-500 to-red-500',
      popular: true
    },
    {
      id: 5,
      name: 'DevOps & Cloud',
      description: 'Learn cloud computing and deployment strategies',
      courseCount: 19,
      studentCount: 4200,
      icon: '☁️',
      color: 'from-indigo-500 to-purple-500',
      popular: false
    },
    {
      id: 6,
      name: 'Cybersecurity',
      description: 'Protect systems and data from digital threats',
      courseCount: 16,
      studentCount: 3800,
      icon: '🔒',
      color: 'from-red-500 to-pink-500',
      popular: false
    },
    {
      id: 7,
      name: 'Artificial Intelligence',
      description: 'Explore AI, machine learning, and neural networks',
      courseCount: 22,
      studentCount: 7100,
      icon: '🤖',
      color: 'from-cyan-500 to-blue-500',
      popular: true
    },
    {
      id: 8,
      name: 'Digital Marketing',
      description: 'Master online marketing and social media strategies',
      courseCount: 18,
      studentCount: 4900,
      icon: '📈',
      color: 'from-yellow-500 to-orange-500',
      popular: false
    },
    {
      id: 9,
      name: 'Game Development',
      description: 'Create engaging games for various platforms',
      courseCount: 14,
      studentCount: 3200,
      icon: '🎮',
      color: 'from-purple-500 to-indigo-500',
      popular: false
    }
  ];

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

  const displayCategories = categories.length > 0 ? categories : getMockCategories();
  const popularCategories = displayCategories.filter(cat => cat.popular);
  const otherCategories = displayCategories.filter(cat => !cat.popular);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
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
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-responsive-lg font-bold gradient-text mb-4">
            Explore Course Categories 🎯
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your passion and advance your career with our comprehensive
            course categories. From technology to creative arts, we have something for everyone.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                label: 'Total Categories',
                value: displayCategories.length,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Users,
                label: 'Active Courses',
                value: displayCategories.reduce((sum, cat) => sum + (cat.courseCount || 0), 0),
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: TrendingUp,
                label: 'Total Students',
                value: `${Math.round(displayCategories.reduce((sum, cat) => sum + (cat.studentCount || 0), 0) / 1000)}K+`,
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: TrendingUp,
                label: 'Popular Categories',
                value: popularCategories.length,
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

        {/* Popular Categories */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <Badge variant="primary" size="lg">
              🔥 Trending
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCategories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/courses?category=${encodeURIComponent(category.name || category.categoryName)}`}>
                  <Card variant="elevated" className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 group">
                    {/* Category Header */}
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-6xl relative overflow-hidden`}>
                      {category.icon}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>

                    <div className="p-6">
                      {/* Category Title */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {category.name || category.categoryName}
                        </h3>
                        <Badge variant="success" size="sm">
                          Popular
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {category.description || category.categoryDescription}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{category.courseCount} courses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{(category.studentCount / 1000).toFixed(1)}K students</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button variant="primary" size="sm" icon={ArrowRight} className="w-full group-hover:scale-105 transition-transform duration-300">
                        Explore Courses
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Categories</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCategories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/courses?category=${encodeURIComponent(category.name || category.categoryName)}`}>
                  <Card variant="elevated" className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                    {/* Category Header */}
                    <div className={`h-24 bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl relative overflow-hidden`}>
                      {category.icon}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>

                    <div className="p-6">
                      {/* Category Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {category.name || category.categoryName}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {category.description || category.categoryDescription}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{category.courseCount} courses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{(category.studentCount / 1000).toFixed(1)}K students</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" className="text-center p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-5" />
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-10 animate-float" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full opacity-10 animate-float float-delayed" />

            <div className="relative z-10">
              <h2 className="text-responsive-lg font-bold gradient-text mb-6">
                Can't Find What You're Looking For?
              </h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We're constantly adding new categories and courses.
                Let us know what you'd like to learn and we'll make it happen!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Request New Category
                </Button>
                <Button variant="outline" size="lg">
                  Browse All Courses
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};