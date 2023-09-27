import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseInstanceService from '../services/CourseInstanceService';

const InstanceDetail = () => {

    const{year, semester, courseId} = useParams();
    const navigate = useNavigate();
    const[instance, setInstance] = useState([]);

    useEffect(() => {
        CourseInstanceService.getInstanceById(year, semester, courseId).then((response) => {
          setInstance(response.data)
        }).catch(error =>{
          console.log(error);
        })
      },[])
  
      const handleBack = () => {
          navigate('/list-instances');
      }

  return (
    <div>
        <div className="container text-center">
            <h2>Instance Details</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Instance Title: {instance.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Course Code: {instance.courseCode}</h6>
                        <p className="card-text">Year: {instance.year}</p>
                        <p className="card-text">Semester: {instance.semester}</p>
                        <p className="card-text">Description: {instance.description}</p>
                        <button className="btn btn-primary" onClick={handleBack}>Back</button>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default InstanceDetail