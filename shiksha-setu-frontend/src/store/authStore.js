import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => set({ user, token, isAuthenticated: !!token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-store',
    }
  )
);

export const useCourseStore = create((set) => ({
  courses: [],
  selectedCourse: null,
  isLoading: false,

  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export const useBookingStore = create((set) => ({
  bookings: [],
  selectedBooking: null,

  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
}));
