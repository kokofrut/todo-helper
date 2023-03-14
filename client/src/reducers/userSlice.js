import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 0,
    isAuthenticated: false,
    username: 'John',
    password: 'hash'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        change: (state, action) => {
            return state = { ...state, ...action.payload };
        }
    }
})

// Action creators are generated for each case reducer function
export const { change } = userSlice.actions

export default userSlice.reducer