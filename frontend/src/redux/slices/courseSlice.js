import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { MOCK_COURSES } from '../../api/mockData';

const initialState = {
  courses: MOCK_COURSES,
  filteredCourses: MOCK_COURSES,
  currentCourse: null,
  searchQuery: '',
  selectedCategory: 'all',
  selectedLevel: 'all',
  sortBy: 'popular', // 'popular' | 'rating' | 'price-asc' | 'price-desc'
  loading: false,
  error: null,
};

// Helper filter function
const applyFilters = (state) => {
  let list = [...state.courses];

  // Search query filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.instructor?.name?.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (state.selectedCategory !== 'all') {
    list = list.filter(
      (c) => c.category === state.selectedCategory || c.tags === state.selectedCategory
    );
  }

  // Level filter
  if (state.selectedLevel !== 'all') {
    list = list.filter((c) => c.level === state.selectedLevel);
  }

  // Sort
  if (state.sortBy === 'popular') {
    list.sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0));
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  } else if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  }

  state.filteredCourses = list;
};

// Async Thunk: Fetch All Courses (from /api/v1/course/get-courses)
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const data = await axiosClient.get('/course/get-courses');
      if (data && data.courses && data.courses.length > 0) {
        return data.courses;
      }
      return MOCK_COURSES;
    } catch (err) {
      console.warn('Backend fetch courses fallback to mock:', err.message);
      return MOCK_COURSES;
    }
  }
);

// Async Thunk: Fetch Single Course by ID
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/course/get-course/${courseId}`);
      if (res && res.course) return res.course;
    } catch (e) {
      // Fallback
    }

    const { courses } = getState().courses;
    const found = courses.find((c) => c._id === courseId || c.slug === courseId);
    if (!found) {
      return rejectWithValue('Course not found.');
    }
    return found;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
      applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedLevel = 'all';
      state.sortBy = 'popular';
      state.filteredCourses = state.courses;
    },
    // Instructor Create Course Action
    addCourse: (state, action) => {
      const payload = action.payload;
      // Asynchronously sync to backend
      axiosClient.post('/course/create-course', payload).catch(() => {});

      const newCourse = {
        _id: `course_${Date.now()}`,
        studentsEnrolled: 0,
        rating: 5.0,
        reviewsCount: 1,
        status: 'published',
        lastUpdated: 'Just now',
        curriculum: [],
        ...payload,
      };
      state.courses.unshift(newCourse);
      applyFilters(state);
    },
    // Instructor Update Course Action
    updateCourse: (state, action) => {
      const { id, updatedData } = action.payload;
      axiosClient.put(`/course/edit-course/${id}`, updatedData).catch(() => {});

      const index = state.courses.findIndex((c) => c._id === id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...updatedData };
        if (state.currentCourse?._id === id) {
          state.currentCourse = { ...state.currentCourse, ...updatedData };
        }
        applyFilters(state);
      }
    },
    // Instructor Delete Course Action
    deleteCourse: (state, action) => {
      const id = action.payload;
      axiosClient.delete(`/course/delete-course/${id}`).catch(() => {});

      state.courses = state.courses.filter((c) => c._id !== id);
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        applyFilters(state);
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedLevel,
  setSortBy,
  resetFilters,
  addCourse,
  updateCourse,
  deleteCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
