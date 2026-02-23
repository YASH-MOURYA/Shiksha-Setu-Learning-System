import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Card, Button, Badge, Input, Modal } from '@components/ui';
import { courseAPI, categoryAPI } from '@api/services';
import { useAuthStore } from '@store/authStore';
import toast from 'react-hot-toast';

const CourseManagement = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [courseForm, setCourseForm] = useState({
    courseName: '',
    courseDescription: '',
    coursePrice: '',
    categoryId: '',
    courseDuration: '',
    courseType: 'Paid',
    thumbnail: null,
    notesFile: null
  });

  useEffect(() => {
    fetchData();
    // Test category API directly
    testCategoryAPI();
  }, []);

  const testCategoryAPI = async () => {
    try {
      console.log('Testing category API...');
      const response = await categoryAPI.getAllCategories();
      console.log('Category API test response:', response);
    } catch (error) {
      console.error('Category API test error:', error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories first
      try {
        const categoriesResponse = await categoryAPI.getAllCategories();
        console.log('Categories response:', categoriesResponse.data);
        if (categoriesResponse.data?.success) {
          setCategories(categoriesResponse.data.categories || []);
        } else {
          console.warn('Categories API returned unsuccessful response');
          // Fallback to mock categories
          setCategories([
            { id: 1, name: 'Web Development', description: 'Learn web development' },
            { id: 2, name: 'Data Science', description: 'Learn data science' },
            { id: 3, name: 'Mobile Development', description: 'Learn mobile development' },
            { id: 4, name: 'UI/UX Design', description: 'Learn design' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to mock categories
        setCategories([
          { id: 1, name: 'Web Development', description: 'Learn web development' },
          { id: 2, name: 'Data Science', description: 'Learn data science' },
          { id: 3, name: 'Mobile Development', description: 'Learn mobile development' },
          { id: 4, name: 'UI/UX Design', description: 'Learn design' }
        ]);
        toast.error('Failed to load categories, using defaults');
      }

      // Fetch courses
      try {
        const coursesResponse = await courseAPI.getAllCourses();
        console.log('Courses response:', coursesResponse.data);
        if (coursesResponse.data?.success) {
          setCourses(coursesResponse.data.courses || []);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting course form:', courseForm);
      
      const courseData = {
        courseName: courseForm.courseName,
        courseDescription: courseForm.courseDescription,
        coursePrice: parseFloat(courseForm.coursePrice) || 0,
        categoryId: parseInt(courseForm.categoryId),
        mentorId: user.id,
        courseType: courseForm.courseType,
        courseDuration: courseForm.courseDuration,
        status: 'Active',
        thumbnail: courseForm.thumbnail,
        notesFile: courseForm.notesFile
      };

      console.log('Course data to send:', courseData);

      if (editingCourse) {
        const response = await courseAPI.updateCourse(editingCourse.id, courseData);
        console.log('Update response:', response.data);
        if (response.data?.success) {
          toast.success('Course updated successfully!');
        } else {
          throw new Error(response.data?.responseMessage || 'Update failed');
        }
      } else {
        const response = await courseAPI.createCourse(courseData);
        console.log('Create response:', response.data);
        if (response.data?.success) {
          toast.success('Course created successfully!');
        } else {
          throw new Error(response.data?.responseMessage || 'Creation failed');
        }
      }

      setShowAddModal(false);
      setEditingCourse(null);
      setCourseForm({
        courseName: '',
        courseDescription: '',
        coursePrice: '',
        categoryId: '',
        courseDuration: '',
        courseType: 'Paid',
        thumbnail: null,
        notesFile: null
      });
      fetchData();
    } catch (error) {
      console.error('Error saving course:', error);
      const errorMessage = error.response?.data?.responseMessage || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save course';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setCourseForm({
      courseName: course.name || '',
      courseDescription: course.description || '',
      coursePrice: course.fee?.toString() || '',
      categoryId: course.category?.id?.toString() || '',
      courseDuration: '',
      courseType: course.type || 'Paid',
      thumbnail: null,
      notesFile: null
    });
    setShowAddModal(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(courseId);
        toast.success('Course deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           course.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-responsive-lg font-bold gradient-text mb-2">
              Course Management 📚
            </h1>
            <p className="text-xl text-gray-600">
              Create, edit, and manage your courses
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            icon={Plus}
            onClick={() => setShowAddModal(true)}
          >
            Add New Course
          </Button>
        </div>

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <Card variant="elevated" className="p-4 bg-yellow-50 border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
            <p className="text-sm text-yellow-700">Categories loaded: {categories.length}</p>
            <p className="text-sm text-yellow-700">Categories: {JSON.stringify(categories.map(c => ({id: c.id, name: c.name})), null, 2)}</p>
            <p className="text-sm text-yellow-700">Courses loaded: {courses.length}</p>
            <p className="text-sm text-yellow-700">Sample course: {courses.length > 0 ? JSON.stringify({
              id: courses[0].id,
              name: courses[0].name,
              description: courses[0].description,
              fee: courses[0].fee,
              category: courses[0].category
            }, null, 2) : 'No courses'}</p>
          </Card>
        )}

        {/* Filters */}
        <Card variant="elevated" className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-base w-full"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-4xl">
                  📚
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 line-clamp-2">
                      {course.name}
                    </h3>
                    <Badge variant="success" size="sm">
                      ${course.fee}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{course.category?.name}</span>
                    <span>{course.type}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      icon={Eye}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      icon={Edit}
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={Trash2}
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No courses message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first course to get started'
              }
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              icon={Plus}
              onClick={() => setShowAddModal(true)}
            >
              Create Course
            </Button>
          </div>
        )}

        {/* Add/Edit Course Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingCourse(null);
            setCourseForm({
              courseName: '',
              courseDescription: '',
              coursePrice: '',
              categoryId: '',
              courseDuration: '',
              courseType: 'Paid',
              thumbnail: null,
              notesFile: null
            });
          }}
          title={editingCourse ? 'Edit Course' : 'Add New Course'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Course Name"
              value={courseForm.courseName}
              onChange={(e) => setCourseForm({...courseForm, courseName: e.target.value})}
              required
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={courseForm.courseDescription}
                onChange={(e) => setCourseForm({...courseForm, courseDescription: e.target.value})}
                className="input-base min-h-[100px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price ($)"
                type="number"
                value={courseForm.coursePrice}
                onChange={(e) => setCourseForm({...courseForm, coursePrice: e.target.value})}
                required
              />
              
              <Input
                label="Duration (Optional)"
                value={courseForm.courseDuration}
                onChange={(e) => setCourseForm({...courseForm, courseDuration: e.target.value})}
                placeholder="e.g., 12 weeks"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={courseForm.categoryId}
                  onChange={(e) => setCourseForm({...courseForm, categoryId: e.target.value})}
                  className="input-base"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={courseForm.courseType}
                  onChange={(e) => setCourseForm({...courseForm, courseType: e.target.value})}
                  className="input-base"
                >
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
              </div>
            </div>
            
            {/* File Upload Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.files[0]})}
                  className="input-base"
                />
                <p className="text-xs text-gray-500 mt-1">Upload course thumbnail image</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Notes (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setCourseForm({...courseForm, notesFile: e.target.files[0]})}
                  className="input-base"
                />
                <p className="text-xs text-gray-500 mt-1">Upload course notes/materials</p>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </div>
  );
};

export default CourseManagement;