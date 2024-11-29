import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { routes } from './routes'

const AppRoutes: React.FC = () => {
    console.log('Current routes:', routes)
    const element = useRoutes(routes)
    console.log('Rendered element:', element)
    return element
}

const App: React.FC = () => {
    console.log('App component rendering')
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App