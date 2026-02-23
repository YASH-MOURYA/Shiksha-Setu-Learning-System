import apiClient from './client';

// Auth Services
export const authAPI = {
  register: (data) => apiClient.post('/api/user/register', data),
  login: (data) => apiClient.post('/api/user/login', data),
  getUserProfile: () => apiClient.get('/api/user/profile'),
  updateProfile: (data) => apiClient.put('/api/user/profile', data),
};

// User Services
export const userAPI = {
  getUsersByRole: (role) => apiClient.get(`/api/user/fetch/role-wise?role=${role}`),
  getMentors: () => apiClient.get('/api/user/fetch/role-wise?role=Mentor'),
  getStudents: () => apiClient.get('/api/user/fetch/role-wise?role=Student'),
  getUserById: (userId) => apiClient.get(`/api/user/fetch/user-id?userId=${userId}`),
  deleteMentor: (mentorId) => apiClient.delete(`/api/user/mentor/delete?mentorId=${mentorId}`),
};

// Course Services
export const courseAPI = {
  getAllCourses: () => apiClient.get('/api/course/all'),
  getCourseById: (id) => apiClient.get(`/api/course/fetch/course-id?courseId=${id}&videoShow=No`),
  createCourse: (data) => {
    const formData = new FormData();
    // Map frontend fields to backend expected fields
    formData.append('name', data.courseName || data.name);
    formData.append('description', data.courseDescription || data.description);
    formData.append('fee', data.coursePrice || data.fee);
    formData.append('categoryId', data.categoryId);
    formData.append('mentorId', data.mentorId);
    formData.append('type', data.courseType || 'Paid');
    
    // Handle file uploads - use provided files or create dummy files
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    } else {
      const dummyThumbnail = new File([''], 'thumbnail.jpg', { type: 'image/jpeg' });
      formData.append('thumbnail', dummyThumbnail);
    }
    
    if (data.notesFile) {
      formData.append('notesFileName', data.notesFile);
    } else {
      const dummyNotes = new File([''], 'notes.pdf', { type: 'application/pdf' });
      formData.append('notesFileName', dummyNotes);
    }
    
    return apiClient.post('/api/course/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateCourse: (id, data) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.courseName || data.name);
    formData.append('description', data.courseDescription || data.description);
    formData.append('fee', data.coursePrice || data.fee);
    formData.append('categoryId', data.categoryId);
    formData.append('type', data.courseType || 'Paid');
    
    return apiClient.put('/api/course/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteCourse: (id) => apiClient.delete(`/api/course/delete?courseId=${id}`),
  searchCourses: (courseName) => apiClient.get(`/api/course/fetch/name-wise?courseName=${courseName}`),
  getCoursesByMentor: (mentorId) => apiClient.get(`/api/course/fetch/mentor-wise?mentorId=${mentorId}&status=Active&videoShow=No`),
  getCoursesByCategory: (categoryId) => apiClient.get(`/api/course/fetch/category-wise?categoryId=${categoryId}&videoShow=No`),
};

// Category Services
export const categoryAPI = {
  getAllCategories: () => apiClient.get('/api/course/category/fetch/all'),
  getCategoryById: (id) => apiClient.get(`/api/course/category/${id}`),
  createCategory: (data) => apiClient.post('/api/course/category/add', data),
  updateCategory: (data) => apiClient.put('/api/course/category/update', data),
  deleteCategory: (id) => apiClient.delete(`/api/course/category/delete?categoryId=${id}`),
};

// Course Section Services
export const courseSectionAPI = {
  getSectionsByCourse: (courseId) => apiClient.get(`/api/courseSection/course/${courseId}`),
  createSection: (data) => apiClient.post('/api/courseSection/add', data),
  updateSection: (data) => apiClient.put(`/api/courseSection/update`, data),
  deleteSection: (id) => apiClient.delete(`/api/courseSection/delete?courseSectionId=${id}`),
};

// Course Topic Services
export const courseTopicAPI = {
  getTopicsBySection: (sectionId) => apiClient.get(`/api/courseSectionTopic/section/${sectionId}`),
  createTopic: (data) => apiClient.post('/api/courseSectionTopic/add', data),
  updateTopic: (data) => apiClient.put(`/api/courseSectionTopic/update`, data),
  deleteTopic: (id) => apiClient.delete(`/api/courseSectionTopic/delete?courseSectionTopicId=${id}`),
};

// Booking Services (Updated to match backend endpoints)
export const bookingAPI = {
  getAllBookings: () => apiClient.get('/api/course/booking/all'),
  getMyBookings: () => apiClient.get('/api/course/booking/fetch/customer-wise'),
  createBooking: (data) => apiClient.post('/api/course/booking/add', data),
  getStudentCourses: (customerId) => {
    if (customerId) {
      return apiClient.get(`/api/course/booking/fetch/customer-wise?customerId=${customerId}`);
    }
    // If no customerId provided, try to get from auth store or return empty
    return Promise.resolve({ data: { success: true, bookings: [] } });
  },
  getCourseProgress: (courseId) => apiClient.get(`/api/course/booking/fetch/course-wise?courseId=${courseId}`),
  getCertificates: () => apiClient.get('/api/course/booking/certificates'),
  getBookingsByMentor: (mentorId) => apiClient.get(`/api/course/booking/fetch/mentor-wise?mentorId=${mentorId}`),
};

// Payment Services
export const paymentAPI = {
  getAllPayments: () => apiClient.get('/api/payment/all'),
  getPaymentById: (id) => apiClient.get(`/api/payment/${id}`),
  processPayment: (data) => apiClient.post('/api/payment/process', data),
  verifyPayment: (paymentId) => apiClient.post('/api/payment/verify', { paymentId }),
  getPaymentHistory: () => apiClient.get('/api/payment/history'),
  refundPayment: (paymentId) => apiClient.post(`/api/payment/${paymentId}/refund`),
};

// Address Services
export const addressAPI = {
  getAddresses: () => apiClient.get('/api/address/user'),
  createAddress: (data) => apiClient.post('/api/address/add', data),
  updateAddress: (id, data) => apiClient.put(`/api/address/${id}`, data),
  deleteAddress: (id) => apiClient.delete(`/api/address/${id}`),
};

// Health Check Service
export const healthAPI = {
  checkHealth: () => apiClient.get('/api/health'),
  getStatus: () => apiClient.get('/api/health/status'),
};
