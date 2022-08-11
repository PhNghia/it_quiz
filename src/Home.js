import React from 'react'
import { Outlet } from 'react-router-dom'
import Quizes from './Quizes'

export default function Home() {
  return (
    <main className="main-container">
        <div className="container-quizes bg-light">
            <Quizes />
            <Outlet />
        </div>
    </main>
  )
}
