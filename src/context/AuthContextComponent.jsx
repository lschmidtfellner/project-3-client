import React, { createContext, useEffect, useState } from 'react'
import { isTokenValid } from '../api/auth'

// Create a Context Provider called AuthProvider
export const AuthContext = createContext(null)

// Create our own Context component in which data about auth lives on its state
export default function AuthContextComponent({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    // No longer checking token validity on load
    // If you need to check token validity after a user logs in,
    // you should do it in your signin function or after the user is authenticated

    return (
        <AuthContext.Provider value={
            { isLoggedIn, setIsLoggedIn, user }
        }>
            {children}
        </AuthContext.Provider>
    )
}