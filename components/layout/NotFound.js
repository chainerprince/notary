import React from 'react'
import Link from 'next/link'
const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h1>404 ! Page Not Found</h1>
            <Link href="/">Go to the homepage</Link>
        </div>
    )
}

export default NotFound
