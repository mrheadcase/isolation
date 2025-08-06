import { createSlice } from '@reduxjs/toolkit'
import type { ThemeState } from '../types'

const initialState: ThemeState = {
  isDarkMode: true,
  primaryColor: '#4CAF50',  // Green
  secondaryColor: '#388E3C', // Darker green
  backgroundColor: '#1E1E1E', // Dark background
  textColor: '#FFFFFF'      // White text
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
      if (state.isDarkMode) {
        state.backgroundColor = '#1E1E1E'
        state.textColor = '#FFFFFF'
      } else {
        state.backgroundColor = '#FFFFFF'
        state.textColor = '#000000'
      }
    }
  }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
