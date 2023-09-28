import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from '../services/CourseService'

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    

    useEffect(() => {
      CourseService.getCourseById(id).then((response) => {
        console.log(response);
        setCourse(response.data)
      }).catch(error =>{
        console.log(error);
      })
    },[])

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