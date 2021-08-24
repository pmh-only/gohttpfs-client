import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = { value: window.sessionStorage.getItem('hostURL') || `${window.location.protocol}//${window.location.host}` }
const hostURLSlice = createSlice({
  name: 'hostURL',
  initialState,
  reducers: {
    setHostURL: (state, action: PayloadAction<string>) => {
      state.value = action.payload
      window.sessionStorage.setItem('hostURL', state.value)
    }
  }
})

export const { setHostURL } = hostURLSlice.actions
export const selectHostURL = (state: RootState) => state.hostURL.value
export default hostURLSlice.reducer
