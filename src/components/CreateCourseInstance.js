import React, {useState, useEffect} from 'react'
import CourseService from '../services/CourseService';
import CourseInstanceService from '../services/CourseInstanceService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const CreateCourseInstance = () => {
    const [courseInfo, setCourseInfo] = useState({
        courseId:'',
        courseCode:'',
    })
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseCodes, setCourseCodes] = useState([]); // To store the fetched course codes
    const [refreshKey, setRefreshKey] = useState(0); // Key to force component 
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all courses from your API using CourseService.getAllCourses
        CourseService.getAllCourses()
          .then((response) => {
            // Extract course codes and course IDs from the response and store them in state
            const courses = response.data;
            const codes = courses.map((course) => course.courseCode);
            const courseInfoMapping = courses.reduce((acc, course) => {
              acc[course.courseCode] = course.id; // Assuming you have an 'id' property in your course data
              return acc;
            }, {});
            
            setCourseCodes(codes);
            setCourseInfo((prevCourseInfo) => ({
              ...prevCourseInfo,
              courseInfoMapping,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }, [refreshKey]);

    const saveCourseInstance = (e) => {
        e.preventDefault();
    
        const courseInstance = {
          courseId: courseInfo.courseId,
          year,
          semester,
        };
        

        CourseInstanceService.createCourseInstance(courseInstance)
            .then((response) => {
                //Showing success message
                toast.success('Instance Saved Successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                })
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

    const handleCourseCodeChange = (e) => {
        const selectedCourseCode = e.target.value;
        // Find the corresponding courseId based on the selected courseCode
        setCourseInfo((prevCourseInfo) => ({
            ...prevCourseInfo,
            courseCode: selectedCourseCode,
            courseId: prevCourseInfo.courseInfoMapping[selectedCourseCode],
        }));
    }


    const refreshComponent = () => {
        // Increment the key to force a component refresh
        setRefreshKey((prevKey) => prevKey + 1);
      };


  return (
    <div className="container mt-5">
        <ToastContainer />
        <div className="row justify-content-center">
            <div className="col-md-4 align-items-center">
                <form>
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <select
                                name="courseCode"
                                className="form-select form-select-sm border-0"
                                value={courseInfo.courseCode}
                                onChange={handleCourseCodeChange}
                            >
                            <option value="">Select course</option>
                                {courseCodes.map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={refreshComponent}
                            > 
                                Refresh
                            </button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <input
                                type="text"
                                placeholder="Semester"
                                name="semester"
                                autoComplete="off"
                                className="form-control form-control-sm"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 text-center">
                            <button
                                className="btn bg-primary btn-sm text-white"
                                onClick={(e) => saveCourseInstance(e)}
                            >
                                Add instance
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateCourseInstance