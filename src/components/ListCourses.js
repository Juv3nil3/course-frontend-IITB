import React, { useEffect, useState } from 'react'
import CourseService from '../services/CourseService'
import { Link } from 'react-router-dom'


const ListCourses = () => {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    getAllCourses();
  }, [])

  const getAllCourses = () => {
    CourseService.getAllCourses().then((response) => {
      setCourses(response.data)
    }).catch(error => {
      console.log(error);
    })
  }
    
  const deleteCourse = (courseId) => {
    CourseService.deleteCourse(courseId).then((response) => {
      getAllCourses();
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="container">
        <h2 className="text-center">List Courses</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <th>Course Title</th>
                <th>Course Code</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
                    courses.map(
                        course =>
                        <tr key = {course.id}>
                            <td>{course.title}</td>
                            <td>{course.courseCode}</td>
                            <td>
                              <Link className="btn btn-info" to={`/course-details/${course.id}`}>Details</Link>
                              <button className="btn btn-danger ms-2" onClick={() => deleteCourse(course.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListCourses