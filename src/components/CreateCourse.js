import React, {useState} from 'react'
import CourseService from '../services/CourseService'
import { ToastContainer, toast } from 'react-toastify'


const CreateCourse = () => {
    const [title, setTitle] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [courseDescription, setCourseDescription] = useState('')

    const saveCourse = (e) => {
        e.preventDefault();

        const course = {title, courseCode, courseDescription}

        CourseService.createCourse(course).then((response) =>{
            //Showing success message
            toast.success('Course Saved Successfully', {
                position: toast.POSITION.TOP_RIGHT,
              });

            console.log(response.data)
        }).catch((error) => {
            if (error.response) {
              // Extract the error message from the response
              const errorMessage = error.response.data;
      
              // Show an error toast message with the extracted error message
              toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              // Handle other types of errors
              console.error(error);
            }
          })
    }


  return (
    <div>
        <ToastContainer />
        <div className="container mt-5 ">
            <div className="row justify-content-center">
                <div className="col-md-3 text-center">
                    <form className="custom-form">
                        <div className="form-group mb-2">
                            <input
                                type = "text"
                                placeholder="Course title"
                                name="title"
                                autoComplete="off"
                                className="form-control form-control-sm"
                                value = {title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type = "text"
                                placeholder="Course code"
                                name="couseCode"
                                autoComplete="off"
                                className="form-control form-control-sm"
                                value = {courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type = "textarea"
                                placeholder="Course description"
                                name="courseDescription"
                                autoComplete="off"
                                className="form-control form-control-sm"
                                value = {courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                            >
                            </input>
                        </div>

                        <button className="btn bg-primary btn-sm text-white" onClick = {(e) => saveCourse(e)}>Add Course</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateCourse