import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import ListCourses from './components/ListCourses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import CreateCourseInstance from './components/CreateCourseInstance';
import ListCourseInstances from './components/ListCouseInstances';
import Navbar from './components/Navbar';
import InstanceDetail from './components/InstanceDetail';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<CreateCourse />} />
              <Route exact path="/list-courses" element={<ListCourses />} />
              <Route exact path="/course-details/:id" element={<CourseDetail />} />
              <Route exact path="/create-instance" element={<CreateCourseInstance />} />
              <Route exact path="/list-instances" element={<ListCourseInstances />} />
              <Route path="/instance-details/:year/:semester/:courseId" element={<InstanceDetail />} />
            </Routes>
          </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
