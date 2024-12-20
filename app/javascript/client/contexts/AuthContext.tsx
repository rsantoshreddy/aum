import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const checkAuth = async () => {
        try {
            const response = await fetch('/auth/check', {
                credentials: 'include',
            })
            const data = await response.json()
            setIsAuthenticated(data.logged_in)
        } catch (error) {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkAuth()
        }, 5 * 60 * 1000) // Send a request every 5 minutes

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 