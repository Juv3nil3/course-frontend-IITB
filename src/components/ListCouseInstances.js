import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation (if needed)
import CourseInstanceService from '../services/CourseInstanceService'; // Import your CourseInstanceService

const ListCourseInstances = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseInstances, setCourseInstances] = useState([]);

  useEffect(() => {
    // Fetch and display instances when the component mounts (initial load)
    getAllInstances();
  }, []);

    const getAllInstances = () => {
        CourseInstanceService.getAllInstances(year, semester)
        .then((response) => {
            setCourseInstances(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const deleteInstance = (year, semester, courseId) => {
        CourseInstanceService.deleteInstance(year, semester, courseId).then((response) => {
          getAllInstances();
        }).catch(error => {
          console.log(error);
        })
    }



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 offset-md-2 text-center">
          <form>
            <div className="row mb-2">
              <div className="col-md-5">
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <select
                  name="semester"
                  className="form-select mt-2"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Semester</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>

            </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => getAllInstances()}
                >
                  List Instances
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <table className="table table-bordered table-striped mt-4">
        <thead>
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
              <td>
                <Link
                  to={`/instance-details/${courseInstance.year}/${courseInstance.semester}/${courseInstance.courseId}`}
                  className="btn btn-info"
                >
                  Details
                </Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteInstance(courseInstance.year, courseInstance.semester, courseInstance.courseId)} // Define your deleteCourse function
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCourseInstances;
