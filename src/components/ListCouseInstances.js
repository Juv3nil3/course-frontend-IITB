import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation (if needed)
import CourseInstanceService from '../services/CourseInstanceService'; // Import your CourseInstanceService

const ListCourseInstances = () => {
  // Define state variables for year, semester, and courseInstances
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseInstances, setCourseInstances] = useState([]);

    useEffect(() => {
      // Fetch and display instances when the component mounts (initial load)
      getAllInstances();
    }, []);

    // Function to fetch all instances
    const getAllInstances = () => {
        CourseInstanceService.getAllInstances(year, semester)
        .then((response) => {
            setCourseInstances(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Function to delete a course instance
    const deleteInstance = (year, semester, courseId) => {
        CourseInstanceService.deleteInstance(year, semester, courseId).then((response) => {
          getAllInstances();
        }).catch(error => {
          console.log(error);
        })
    }



  return (
    <div className="container mt-4 col-md-8">
      <div className="row ms-4">
        <div className="col-md-6 ">
          <form className="d-flex">
              <div className="form-group mt-2 col-md-3 me-4">
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  autoComplete="off"
                  className="form-control form-control-sm"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="form-group mt-2 col-md-4 me-4">
                <select
                  name="semester"
                  className="form-select form-select-sm border-0"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="col-md-4 mt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => getAllInstances()}
                >
                  List Instances
                </button>
              </div>  
          </form>
        </div>
      </div>
      <div className="container mt-4">
        <table className="table table-bordered table-hover table-sm">
          <thead className="custom-table-header">
            <tr>
              <th>Course Title</th>
              <th>Year-Sem</th>
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseInstances.map((courseInstance) => (
              <tr key={courseInstance.id}>
                <td>{courseInstance.title}</td>
                <td>{`${courseInstance.year}-${courseInstance.semester}`}</td>
                <td>{courseInstance.courseCode}</td>
                <td className="p-0">
                  <Link
                    to={`/instance-details/${courseInstance.year}/${courseInstance.semester}/${courseInstance.courseId}`}
                    className="btn px-1 py-0"
                  >
                    <i className="fa fa-search "></i>
                  </Link>
                  <button
                    className="btn ms-3 px-1 py-0"
                    onClick={() => deleteInstance(courseInstance.year, courseInstance.semester, courseInstance.courseId)} // Define your deleteCourse function
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default ListCourseInstances;
