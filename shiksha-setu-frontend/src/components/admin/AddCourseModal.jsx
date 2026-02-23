import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { categoryAPI, userAPI } from '../../api/services';

export default function AddCourseModal({ onClose, onSubmit, mentors = [] }) {
  const [formData, setFormData] = useState({
    mentorId: '',
    categoryId: '',
    name: '',
    description: '',
    type: 'paid',
    fee: '',
    discountInPercent: 0,
    authorCourseNote: '',
    specialNote: '',
    prerequisite: '',
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localMentors, setLocalMentors] = useState(mentors || []);

  // Fetch categories and mentors on mount
  useEffect(() => {
    fetchCategoriesAndMentors();
  }, []);

  const fetchCategoriesAndMentors = async () => {
    setIsLoading(true);
    // Fetch categories
    try {
      const response = await categoryAPI.getAllCategories();
      console.log('Categories API Response:', response.data);
      console.log('Full response object:', response);
      
      // Handle multiple possible response formats
      let categoryList = [];
      if (response.data) {
        if (response.data.courses) categoryList = response.data.courses;
        else if (response.data.categories) categoryList = response.data.categories;
        else if (response.data.data) categoryList = response.data.data;
        else if (Array.isArray(response.data)) categoryList = response.data;
        else if (response.data.content) categoryList = response.data.content;
      }
      
      const categoryArray = Array.isArray(categoryList) ? categoryList : [];
      console.log('Parsed Categories:', categoryArray);
      setCategories(categoryArray);
      
      if (categoryArray.length === 0) {
        console.warn('No categories found - you may need to create some first');
      }
    } catch (error) {
      console.error('Error fetching categories:', error.response || error.message);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      toast.error('Failed to load categories');
      setCategories([]);
    }

    // Fetch mentors if not passed as props or if empty
    if (!mentors || mentors.length === 0) {
      try {
        const mentorsResponse = await userAPI.getMentors();
        console.log('Mentors API Response:', mentorsResponse.data);
        console.log('Full mentors response object:', mentorsResponse);
        
        let mentorsArray = [];
        if (mentorsResponse.data) {
          if (mentorsResponse.data.users) mentorsArray = mentorsResponse.data.users;
          else if (mentorsResponse.data.data) mentorsArray = mentorsResponse.data.data;
          else if (Array.isArray(mentorsResponse.data)) mentorsArray = mentorsResponse.data;
          else if (mentorsResponse.data.content) mentorsArray = mentorsResponse.data.content;
        }
        
        console.log('Parsed Mentors:', mentorsArray);
        const finalMentors = Array.isArray(mentorsArray) ? mentorsArray : [];
        setLocalMentors(finalMentors);
        
        if (finalMentors.length === 0) {
          console.warn('No mentors found - ensure mentors are registered');
        }
      } catch (error) {
        console.error('Error fetching mentors:', error.response || error.message);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        setLocalMentors([]);
      }
    } else {
      setLocalMentors(mentors);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : '') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation - only require name and description
    if (!formData.name || !formData.description) {
      toast.error('Course name and description are required');
      return;
    }

    if (formData.type === 'paid' && (formData.fee <= 0 || !formData.fee)) {
      toast.error('Price must be greater than 0 for paid courses');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        mentorId: '',
        categoryId: '',
        name: '',
        description: '',
        type: 'paid',
        fee: '',
        discountInPercent: 0,
        authorCourseNote: '',
        specialNote: '',
        prerequisite: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              Loading mentors and categories...
            </div>
          )}
          {!isLoading && localMentors.length === 0 && categories.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-semibold mb-2">ℹ️ Mentor & Category Loading Issue</p>
              <p className="mb-2">The dropdown lists couldn't load automatically. You can:</p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Create course now without mentor/category assignment</li>
                <li>Update the course later with a mentor ID</li>
                <li>Or manually enter the Mentor ID and Category ID below if you know them</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">Check browser console (F12) for backend API details.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mentor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Mentor
              </label>
              {localMentors.length > 0 ? (
                <select
                  name="mentorId"
                  value={formData.mentorId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a mentor</option>
                  {localMentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.firstName} {mentor.lastName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name="mentorId"
                  value={formData.mentorId}
                  onChange={handleInputChange}
                  placeholder="Enter Mentor ID (or leave blank)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {localMentors.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">Mentors not loading. You can manually enter Mentor ID here.</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              {categories.length > 0 ? (
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id || category._id} value={category.id || category._id}>
                      {category.categoryName || category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  placeholder="Enter Category ID (or leave blank)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {categories.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">Categories not loading. You can manually enter Category ID here.</p>
              )}
            </div>

            {/* Course Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Course Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) {formData.type === 'paid' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.type === 'paid'}
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discountInPercent"
                value={formData.discountInPercent}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Prerequisite */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prerequisites
              </label>
              <input
                type="text"
                name="prerequisite"
                value={formData.prerequisite}
                onChange={handleInputChange}
                placeholder="e.g., Basic Math, English"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Author Course Note */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author's Note
              </label>
              <textarea
                name="authorCourseNote"
                value={formData.authorCourseNote}
                onChange={handleInputChange}
                placeholder="Add any special notes for this course"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Special Note */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Note
              </label>
              <textarea
                name="specialNote"
                value={formData.specialNote}
                onChange={handleInputChange}
                placeholder="Any additional special notes"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.description}
              className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
