import React, { useEffect, useState } from 'react'
import CourseService from '../services/CourseService'

const ListCourses = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
      CourseService.getAllCourses().then((response) => {
        setCourses(response.data)
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
    }, [])
    


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
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListCourses