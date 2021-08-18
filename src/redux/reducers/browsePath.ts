import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = { value: window.location.hash.replace('#', '') }
const browsePathSlice = createSlice({
  name: 'browsePath',
  initialState,
  reducers: {
    setBrowsePath: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setBrowsePath } = browsePathSlice.actions
export const selectBrowsePath = (state: RootState) => state.browsePath.value
export default browsePathSlice.reducer
