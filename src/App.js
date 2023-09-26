import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import ListCourses from './components/ListCourses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <div>
      <Router>
        
          <div className="container">
            <Routes>
              <Route exact path="/" element={<CreateCourse />} />
              <Route exact path="/list-courses" element={<ListCourses />} />
              <Route exact path="/course-details/:id" element={<CourseDetail />} />
            </Routes>
          </div>
          
      </Router>
      
    </div>
  );
}

export default App;
