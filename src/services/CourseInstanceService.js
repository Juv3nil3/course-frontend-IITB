import axios from "axios";

//const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const COURSE_INSTANCE_BASE_API_URL = 'api/instances';

console.log("API URL:", process.env.REACT_APP_API_URL);

class CourseInstance {
    async createCourseInstance(courseInstance) {
        return await axios.post(`${COURSE_INSTANCE_BASE_API_URL}`, courseInstance);
    }

    async getAllInstances(year, semester) {
        return await axios.get(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}`);
    }

    async getInstanceById(year, semester, courseId) {
        return await axios.get(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}/${courseId}`);
    }

    async deleteInstance(year, semester, courseId) {
        return await axios.delete(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}/${courseId}`);
    }
}

export default new CourseInstance();

