import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <main className="flex-1 ">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout 