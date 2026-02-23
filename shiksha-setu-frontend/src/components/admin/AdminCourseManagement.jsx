import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Eye, X } from 'lucide-react';
import { courseAPI, userAPI } from '../../api/services';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

export default function AdminCourseManagement() {
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses and mentors on component mount
  useEffect(() => {
    fetchCoursesAndMentors();
  }, []);

  const fetchCoursesAndMentors = async () => {
    try {
      setIsLoading(true);
      
      // Fetch courses
      const coursesResponse = await courseAPI.getAllCourses();
      const coursesData = coursesResponse.data?.courses || coursesResponse.data?.data || [];
      const courseArray = Array.isArray(coursesData) ? coursesData : [];
      setCourses(courseArray);

      // Fetch mentors using the new userAPI
      try {
        const mentorsResponse = await userAPI.getMentors();
        console.log('Mentors API Response:', mentorsResponse.data);
        
        // Handle multiple possible response formats
        const mentorList = mentorsResponse.data?.users 
          || mentorsResponse.data?.data 
          || (Array.isArray(mentorsResponse.data) ? mentorsResponse.data : []);
        
        const mentorsArray = Array.isArray(mentorList) ? mentorList : [];
        console.log('Parsed Mentors:', mentorsArray);
        setMentors(mentorsArray);
      } catch (mentorError) {
        console.error('Error fetching mentors:', mentorError);
        setMentors([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
      toast.error('Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(courseId);
        setCourses(courses.filter(c => c.id !== courseId && c._id !== courseId));
        toast.success('Course deleted successfully');
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      console.log('Creating course with data:', courseData);
      const response = await courseAPI.createCourse(courseData);
      console.log('Course created:', response.data);
      toast.success('Course added successfully');
      fetchCoursesAndMentors(); // Refresh to get latest data
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding course:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.responseMessage || error.response?.data?.message || 'Failed to add course');
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      await courseAPI.updateCourse(selectedCourse.id || selectedCourse._id, courseData);
      fetchCoursesAndMentors();
      setShowEditModal(false);
      setSelectedCourse(null);
      toast.success('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(error.response?.data?.message || 'Failed to update course');
    }
  };

  const filteredCourses = Array.isArray(courses) 
    ? courses.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Courses Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add New Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">No courses found. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mentor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fee</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => {
                  const mentor = mentors.find(m => m.id === course.mentorId);
                  return (
                    <tr key={course.id || course._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-1">{course.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {mentor ? `${mentor.firstName} ${mentor.lastName}` : 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {course.type === 'paid' ? `₹${course.fee}` : 'Free'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                          {course.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.discountInPercent}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id || course._id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <AddCourseModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCourse}
          mentors={mentors}
        />
      )}

      {/* Edit Course Modal */}
      {showEditModal && selectedCourse && (
        <EditCourseModal
          course={selectedCourse}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCourse(null);
          }}
          onSubmit={handleUpdateCourse}
        />
      )}
    </div>
  );
}
