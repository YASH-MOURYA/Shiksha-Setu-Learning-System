import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, Clock, Users, BookOpen, Play, Download, 
  Award, CheckCircle, ArrowLeft, Heart, Share2 
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@components/ui';
import { courseAPI, bookingAPI } from '@api/services';
import { useAuthStore } from '@store/authStore';
import PaymentModal from '@components/payment/PaymentModal';
import toast from 'react-hot-toast';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      
      // Try to fetch course details from API
      try {
        const response = await courseAPI.getCourseById(courseId);
        if (response.data && response.data.success) {
          setCourse(response.data.course);
          return;
        }
      } catch (error) {
        console.log('Course API not available, using mock data');
      }

      // Fallback to mock data
      setCourse(getMockCourse(courseId));

    } catch (error) {
      console.error('Error fetching course details:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const getMockCourse = (id) => {
    const mockCourses = {
      1: {
        id: 1,
        courseName: 'React Development Masterclass',
        courseDescription: 'Master React development from basics to advanced concepts. Build real-world projects and learn industry best practices.',
        coursePrice: 299,
        mentor: 'John Doe',
        mentorBio: 'Senior React Developer with 8+ years of experience at top tech companies.',
        rating: 4.8,
        students: 1250,
        duration: '12 weeks',
        level: 'Intermediate',
        category: 'Web Development',
        thumbnail: '⚛️',
        whatYouWillLearn: [
          'Master React fundamentals and advanced concepts',
          'Build responsive and interactive user interfaces',
          'State management with Redux and Context API',
          'Testing React applications with Jest and React Testing Library',
          'Deploy React applications to production'
        ],
        curriculum: [
          {
            title: 'Introduction to React',
            lessons: 5,
            duration: '2 hours'
          },
          {
            title: 'Components and JSX',
            lessons: 8,
            duration: '3 hours'
          },
          {
            title: 'State and Props',
            lessons: 6,
            duration: '2.5 hours'
          },
          {
            title: 'Hooks and Context',
            lessons: 10,
            duration: '4 hours'
          },
          {
            title: 'Advanced Patterns',
            lessons: 7,
            duration: '3 hours'
          }
        ],
        requirements: [
          'Basic knowledge of HTML, CSS, and JavaScript',
          'Familiarity with ES6+ features',
          'A computer with internet connection'
        ],
        features: [
          '36 hours of video content',
          'Downloadable resources',
          'Certificate of completion',
          'Lifetime access',
          '30-day money-back guarantee'
        ]
      }
    };
    return mockCourses[id] || mockCourses[1];
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    // Show payment modal for paid courses
    if (course.coursePrice > 0) {
      setShowPaymentModal(true);
    } else {
      // Free course - direct enrollment
      await processEnrollment();
    }
  };

  const processEnrollment = async () => {
    try {
      setEnrolling(true);
      
      const enrollmentData = {
        courseId: course.id,
        studentId: user.id,
        bookingAmount: course.coursePrice || 0,
        bookingStatus: 'Confirmed'
      };

      const response = await bookingAPI.createBooking(enrollmentData);
      if (response.data && response.data.success) {
        setIsEnrolled(true);
        toast.success('Successfully enrolled in course!');
      } else {
        throw new Error('Enrollment failed');
      }

    } catch (error) {
      console.error('Enrollment error:', error);
      // For demo purposes, simulate successful enrollment
      setIsEnrolled(true);
      toast.success('Successfully enrolled in course! (Demo mode)');
    } finally {
      setEnrolling(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsEnrolled(true);
    setShowPaymentModal(false);
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
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
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
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            icon={ArrowLeft}
            onClick={() => navigate('/courses')}
          >
            Back to Courses
          </Button>
        </motion.div>

        {/* Course Header */}
        <motion.div variants={itemVariants}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'danger'}>
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">
                {course.courseName}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {course.courseDescription}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-600">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span>{course.students.toLocaleString()} enrolled</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {course.mentor.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Instructor: {course.mentor}</h3>
                  <p className="text-gray-600">{course.mentorBio}</p>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-8">
                {/* Course Preview */}
                <div className="aspect-video bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 flex items-center justify-center text-6xl relative overflow-hidden rounded-t-2xl">
                  {course.thumbnail}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Button variant="ghost" size="lg" icon={Play} className="text-white border-white hover:bg-white hover:text-gray-900">
                      Preview Course
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold gradient-text mb-2">
                      ${course.coursePrice}
                    </div>
                    <p className="text-gray-600">One-time payment</p>
                  </div>

                  {/* Enroll Button */}
                  <div className="space-y-3 mb-6">
                    {isEnrolled ? (
                      <Button variant="success" size="lg" className="w-full" icon={CheckCircle}>
                        Enrolled - Start Learning
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        onClick={handleEnroll}
                        loading={enrolling}
                      >
                        {course.coursePrice > 0 ? `Enroll Now - $${course.coursePrice}` : 'Enroll Free'}
                      </Button>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" icon={Heart} className="flex-1">
                        Wishlist
                      </Button>
                      <Button variant="outline" size="sm" icon={Share2} className="flex-1">
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">This course includes:</h4>
                    {course.features?.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Course Content */}
        <motion.div variants={itemVariants}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn?.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Course Curriculum */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum?.map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">
                            {section.lessons} lessons • {section.duration}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" icon={Play}>
                          Preview
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Requirements */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements?.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <RelatedCourses currentCourse={course} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={course}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

// Related Courses Component
const RelatedCourses = ({ currentCourse }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRelatedCourses();
  }, [currentCourse]);

  const fetchRelatedCourses = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const response = await courseAPI.getAllCourses();
        if (response.data && response.data.success) {
          const allCourses = response.data.courses || [];
          // Filter out current course and get courses from same category
          const filtered = allCourses
            .filter(course => 
              course.id !== currentCourse.id && 
              course.category?.name === currentCourse.category
            )
            .slice(0, 3);
          
          setRelatedCourses(filtered);
          return;
        }
      } catch (error) {
        console.log('API not available, using mock data');
      }

      // Fallback to mock data
      const mockRelatedCourses = [
        {
          id: 2,
          courseName: 'Advanced React Patterns',
          coursePrice: 199,
          rating: 4.7,
          category: { name: currentCourse.category },
          thumbnail: '⚛️'
        },
        {
          id: 3,
          courseName: 'React Native Development',
          coursePrice: 249,
          rating: 4.6,
          category: { name: currentCourse.category },
          thumbnail: '📱'
        },
        {
          id: 4,
          courseName: 'Next.js Full Stack',
          coursePrice: 299,
          rating: 4.8,
          category: { name: currentCourse.category },
          thumbnail: '🚀'
        }
      ].filter(course => course.id !== currentCourse.id);

      setRelatedCourses(mockRelatedCourses);

    } catch (error) {
      console.error('Error fetching related courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <Card variant="elevated" className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Courses</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 p-3 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Related Courses</h3>
      {relatedCourses.length > 0 ? (
        <div className="space-y-4">
          {relatedCourses.map((relatedCourse) => (
            <motion.div
              key={relatedCourse.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCourseClick(relatedCourse.id)}
              className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white text-xl">
                {relatedCourse.thumbnail || '📚'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {relatedCourse.courseName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {relatedCourse.rating || '4.5'}
                  </span>
                </div>
                <p className="text-sm font-bold text-primary-600">
                  ${relatedCourse.coursePrice}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-gray-600 text-sm">No related courses found</p>
        </div>
      )}
    </Card>
  );
};