import { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import Login from '../components/Login'
import Signup from '../components/Signup'

// Add your protected component imports here
const Home = () => <div>Protected Home Page</div>

export const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/',
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    // Add more routes here
] 