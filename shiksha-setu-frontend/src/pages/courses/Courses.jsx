import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, Play } from 'lucide-react';
import { Card, Button, Badge, Input } from '@components/ui';
import { courseAPI, categoryAPI } from '@api/services';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch courses and categories
      try {
        const [coursesResponse, categoriesResponse] = await Promise.allSettled([
          courseAPI.getAllCourses(),
          categoryAPI.getAllCategories()
        ]);

        if (coursesResponse.status === 'fulfilled' && coursesResponse.value.data?.success) {
          setCourses(coursesResponse.value.data.courses || []);
        }

        if (categoriesResponse.status === 'fulfilled' && categoriesResponse.value.data?.success) {
          setCategories(categoriesResponse.value.data.categories || []);
        }

      } catch (error) {
        console.log('API not available, using mock data');
      }

    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
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
      courseDescription: 'Learn React from basics to advanced concepts with hands-on projects',
      coursePrice: 299,
      mentor: 'John Doe',
      rating: 4.8,
      students: 1250,
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Web Development',
      thumbnail: '⚛️'
    },
    {
      id: 2,
      courseName: 'JavaScript Fundamentals',
      courseDescription: 'Master JavaScript programming with practical examples and projects',
      coursePrice: 199,
      mentor: 'Jane Smith',
      rating: 4.6,
      students: 890,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Programming',
      thumbnail: '📜'
    },
    {
      id: 3,
      courseName: 'UI/UX Design Principles',
      courseDescription: 'Create beautiful and user-friendly interfaces with modern design principles',
      coursePrice: 249,
      mentor: 'Mike Johnson',
      rating: 4.7,
      students: 567,
      duration: '10 weeks',
      level: 'Beginner',
      category: 'Design',
      thumbnail: '🎨'
    },
    {
      id: 4,
      courseName: 'Python for Data Science',
      courseDescription: 'Learn Python programming for data analysis and machine learning',
      coursePrice: 349,
      mentor: 'Sarah Wilson',
      rating: 4.9,
      students: 2100,
      duration: '16 weeks',
      level: 'Advanced',
      category: 'Data Science',
      thumbnail: '🐍'
    },
    {
      id: 5,
      courseName: 'Node.js Backend Development',
      courseDescription: 'Build scalable backend applications with Node.js and Express',
      coursePrice: 279,
      mentor: 'Alex Brown',
      rating: 4.5,
      students: 743,
      duration: '14 weeks',
      level: 'Intermediate',
      category: 'Backend',
      thumbnail: '🟢'
    },
    {
      id: 6,
      courseName: 'Mobile App Development with Flutter',
      courseDescription: 'Create cross-platform mobile apps with Flutter and Dart',
      coursePrice: 329,
      mentor: 'Emily Davis',
      rating: 4.6,
      students: 456,
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Mobile Development',
      thumbnail: '📱'
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Programming' },
    { id: 3, name: 'Design' },
    { id: 4, name: 'Data Science' },
    { id: 5, name: 'Backend' },
    { id: 6, name: 'Mobile Development' }
  ];

  const displayCourses = courses.length > 0 ? courses : mockCourses;
  const displayCategories = categories.length > 0 ? categories : mockCategories;

  // Filter and sort courses
  const filteredCourses = displayCourses.filter(course => {
    const matchesSearch = (course.name || course.courseName)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.description || course.courseDescription)?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           course.category?.name === selectedCategory || 
                           course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.students || 0) - (a.students || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price-low':
        return (a.fee || a.coursePrice || 0) - (b.fee || b.coursePrice || 0);
      case 'price-high':
        return (b.fee || b.coursePrice || 0) - (a.fee || a.coursePrice || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
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
          <h1 className="text-responsive-lg font-bold gradient-text mb-4">
            Explore Our Courses 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of courses taught by expert instructors. 
            Learn new skills, advance your career, and achieve your goals.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="all">All Categories</option>
                  {displayCategories.map(category => (
                    <option key={category.id} value={category.name || category.categoryName}>
                      {category.name || category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">
                Showing {sortedCourses.length} courses
              </span>
              {selectedCategory !== 'all' && (
                <Badge variant="primary" size="sm">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course, i) => (
              <motion.div
                key={course.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/course/${course.id}`}>
                  <Card variant="elevated" className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500">
                    {/* Course Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 flex items-center justify-center text-6xl relative overflow-hidden">
                      {course.thumbnail || '📚'}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Play className="text-white w-12 h-12 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Course Header */}
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" size="sm">
                          {course.category?.name || course.category || 'General'}
                        </Badge>
                        <Badge variant="success" size="sm">
                          ${course.fee || course.coursePrice || 0}
                        </Badge>
                      </div>

                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.name || course.courseName || course.title}
                      </h3>

                      {/* Course Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description || course.courseDescription || 'Learn new skills with this comprehensive course.'}
                      </p>

                      {/* Instructor */}
                      <p className="text-sm text-gray-500 mb-4">
                        By {course.mentor?.firstName ? `${course.mentor.firstName} ${course.mentor.lastName}` : course.mentor || 'Expert Instructor'}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating || 4.5}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{(course.students || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration || '8 weeks'}</span>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={
                            course.level === 'Beginner' ? 'success' :
                            course.level === 'Intermediate' ? 'warning' : 'danger'
                          }
                          size="sm"
                        >
                          {course.level || 'All Levels'}
                        </Badge>
                        <Button variant="primary" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Load More */}
        {sortedCourses.length > 0 && (
          <motion.div variants={itemVariants} className="text-center">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};