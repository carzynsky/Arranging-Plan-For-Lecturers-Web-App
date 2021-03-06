import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  dialogOpen: false,
  status: 'idle',
  courses: [],
  day: '',
  hour: '',
  currentCourses:[],
  coursesChanged: 0,
  lecturerDialogOpen: {
    open: false,
    course: {}
  }
};

export const requestAllCourses = createAsyncThunk(
  'calendar/requestAll',
  async (data) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/courses/',
        {
          headers:{
            'Authorization': 'Bearer ' + data
          }
        }
      ) 
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const teachCourse = createAsyncThunk(
  'calendar/teachOne',
  async (data) => {
    try {
      const response = await axios.patch(
        'http://localhost:5000/api/courses/'+data.course._id,
        data.course,
        {
          headers:{
            'Authorization': 'Bearer ' + data.token
          }
        }
      )   
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const dontTeachCourse = createAsyncThunk(
  'calendar/dontTeachOne',
  async (data) => {
    try {

      const response = await axios.patch(
        'http://localhost:5000/api/courses/'+data.course._id,
        data.course,
        {
          headers:{
            'Authorization': 'Bearer ' + data.token
          }
        }
      )  
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const removeCourse = createAsyncThunk(
  'adminPanel/removeCourse',
  async (data) => {
      try {
          const response = await axios.delete(
              'http://localhost:5000/api/courses/'+data._id,
              {
                  headers: {
                      'Authorization': 'Bearer ' + data.token
                  }
              }
          )
          return response.data;
      } catch (error) {
          console.log(error.response.data)
          return (error.response.data)
      }
  }
)


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    },
    setHour: (state, action) => {
      state.hour = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    setLecturerDialogOpen: (state, action) => {
      state.lecturerDialogOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload.data.doc
        state.status = 'idle';
      })
      .addCase(teachCourse.fulfilled, (state)=>{
        let box = state.coursesChanged
        box = box+1
        state.coursesChanged = box;
      })
      .addCase(dontTeachCourse.fulfilled, (state)=>{
        let box = state.coursesChanged
        box = box+1
        state.coursesChanged = box;
      })
      .addCase(removeCourse.fulfilled, (state)=>{
        let box = state.coursesChanged
        box = box+1
        state.coursesChanged = box;
      });
  },
});

export const { setDialogOpen, setDay, setHour, setLecturerDialogOpen } = calendarSlice.actions;

export const getDialogOpen = (state) => state.calendar.dialogOpen

export const getLecturerDialogOpen = (state) => state.calendar.lecturerDialogOpen

export const getDay = (state) => state.calendar.day

export const getCoursesChanged = (state) => state.calendar.coursesChanged

export const getHour = (state) => state.calendar.hour

export const getCourses = (state) => state.calendar.courses

export default calendarSlice.reducer;
