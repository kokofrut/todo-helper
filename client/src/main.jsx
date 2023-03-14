import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './components/Auth'
import App from './App'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
    // fallback: smth
  },
  {
    path: 'auth',
    element: <Auth/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>)