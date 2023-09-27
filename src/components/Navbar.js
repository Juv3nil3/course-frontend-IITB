import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Course Management</Link>
                <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">
                        Add Course
                    </Link>
                    <Link className="nav-link" to="/create-instance">
                        Add Instance
                    </Link>
                    <Link className="nav-link" to="/list-courses">
                        List Courses
                    </Link>    
                    <Link className="nav-link" to="/list-instances">
                        List Instances
                    </Link>
                </div>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar