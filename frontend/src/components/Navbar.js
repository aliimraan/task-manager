import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <div className="nav">
                <div className="nav-brand"><Link to="/" className="anchor">Task Manager</Link></div>
                <div className="nav-items">
                    <Link to="/alltasks" className="anchor">All Tasks</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
