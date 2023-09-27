import axios from "axios";

const COURSE_INSTANCE_BASE_API_URL = 'http://localhost:8080/api/instances';

class CourseInstance {
    createCourseInstance(courseInstance){
        return axios.post(COURSE_INSTANCE_BASE_API_URL, courseInstance)
    }

    getAllInstances(year,semester){
        return axios.get(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}`)
    }

    getInstanceById(year,semester,courseId){
        return axios.get(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}/${courseId}`)
    }

    deleteInstance(year,semester,courseId){
        return axios.delete(`${COURSE_INSTANCE_BASE_API_URL}/${year}/${semester}/${courseId}`)
    }
}

export default new CourseInstance();