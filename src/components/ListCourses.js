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
    <div>
        <div className="container col-md-8 mt-5">
          <table className="table table-bordered table-sm table-hover">
            <thead className="custom-table-header">
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
                        <td className="p-0">
                          <Link className="btn px-1 py-0" to={`/course-details/${course.id}`}>
                            <i className="fa fa-search"></i>
                          </Link>
                          <button className="btn ms-3 px-1 py-0" onClick={() => deleteCourse(course.id)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                  )
                }
            </tbody>
        </table>
        </div>
    </div>
    
  )
}

export default ListCourses