'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setCurrentUser(null)
        setUserDataObj(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try{
                // Set user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('User not found')
                    return
                }

                // if user exists, get user data from firestore
                console.log('Getting user data from firestore')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('User data found')
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserDataObj(firebaseData)
            }catch(e){
                console.log(e.message)
            }finally{
                setLoading(false)
            }
        })
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        login,
        logout,
        loading,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}