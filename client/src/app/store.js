import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice'

import thunk from 'redux-thunk';

const rootReducer = combineReducers({ 
    user: userReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

