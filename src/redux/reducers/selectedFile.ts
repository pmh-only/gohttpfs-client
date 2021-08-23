import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = { value: '/readme.md' }
const selectedFileSlice = createSlice({
  name: 'selectedFile',
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setSelectedFile } = selectedFileSlice.actions
export const selectSelectedFile = (state: RootState) => state.selectedFile.value
export default selectedFileSlice.reducer
