import Dashboard from '@/components/Dashboard'
import Loading from '@/components/Loading'
import Login from '@/components/Login'
import Main from '@/components/Main'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

export default function DashboardPage() {
    // const {currentUser, loading} = useAuth()

    // let children = (
    //     <Login/>
    // )

    // if (loading){
    //     children = (
    //         <Loading />
    //     )
    // }

    // if (!isAuthenticated) {
    //     children = (
    //         <Dashboard/>
    //     )
    // }

    return (
        <Main>
            <Dashboard />
        </Main>
    )
}
