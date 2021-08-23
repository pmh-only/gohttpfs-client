import path from 'path'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { File } from '../../interfaces/File'

const initialState = { value: window.location.hash.replace('#', '') }
const browsePathSlice = createSlice({
  name: 'browsePath',
  initialState,
  reducers: {
    setBrowsePath: (state, action: PayloadAction<string>) => {
      state.value = path.join(action.payload)
      window.location.hash = state.value
    },
    openDirectoryPath: (state, action: PayloadAction<File>) => {
      state.value = path.join(state.value, action.payload.fileName)
      window.location.hash = state.value
    },
    openParentPath: (state) => {
      state.value = state.value.split('/').slice(0, -1).join('/')
      window.location.hash = state.value
    }
  }
})

export const { setBrowsePath, openDirectoryPath, openParentPath } = browsePathSlice.actions
export const selectBrowsePath = (state: RootState) => state.browsePath.value
export default browsePathSlice.reducer
