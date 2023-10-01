import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import CourseService from '../services/CourseService'

const CourseDetail = () => {

    // Retrieve 'id' from the state using 'useLocation'
    const location = useLocation();
    const id = location.state.id;
    
    console.log("Course ID from params:", id);
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    

    useEffect(() => {
      CourseService.getCourseById(id).then((response) => {
        setCourse(response.data)  // Set the retrieved course data in the state
      }).catch(error =>{
        console.log(error);
      })
    },[id])

    // Function to handle the "Back" button click event
    const handleBack = () => {
        navigate('/list-courses');
    }
    
  return (
    <div>
        <div className="container text-center col-md-7 mt-2">
            <h2>Course Details</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{course.courseCode}</h6>
                        <p className="card-text">{course.courseDescription}</p>
                        <button className ="btn btn-primary" onClick={handleBack}>Back</button>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CourseDetail