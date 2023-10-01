import axios from "axios";

//const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const COURSE_BASE_REST_API_URL = 'api/courses';

console.log("API URL:", process.env.REACT_APP_API_URL);

class CourseService {
    async getAllCourses() {    
        return await axios.get(`${COURSE_BASE_REST_API_URL}`);
    }

    async createCourse(course) {
        return await axios.post(`${COURSE_BASE_REST_API_URL}`, course);
    }

    async getCourseById(courseId) {
        return await axios.get(`${COURSE_BASE_REST_API_URL}/${courseId}`);
    }

    async deleteCourse(courseId) {
        return await axios.delete(`${COURSE_BASE_REST_API_URL}/${courseId}`);
    }
}

export default new CourseService();
