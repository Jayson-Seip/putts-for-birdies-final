
import React from 'react';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CarouselImg from './components/Carousel';
import AboutUs from './components/AboutUs';
import Lesson from './components/Lessons';
import Tournaments from './components/Tournaments';
import LessonPage from './pages/Lessons';
import Facilities from './components/Facilities';
import TournamentPage from './pages/Tournaments';
import SummerCamp from './components/SummerCamp';
import SummerCampPage from './pages/SummerCamp';
import { Container } from 'react-bootstrap';
import Scroll from './components/Scroll';
import TournamentSearch from "./pages/TournamentSearch";
import GolfCoursePage from './pages/GolfCourse';
import DrivingRangePage from './pages/DrivingRange';
import PuttingGreenPage from './pages/PuttingGreen';
import SignInPage from './pages/SignIn';
import BookingLessonPage from './pages/BookLesson';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar handleSignInClick={handleOpenModal} />
        <Scroll />
        <Routes>
          <Route /*Landing Page */
            path="/"
            element={
              <>
                <CarouselImg />
                <AboutUs />
                <Facilities />

                <Container className="Service-Heading mt-4">
                  <h1>Services Offered</h1>
                </Container>
                <Tournaments />
                <Lesson />
                <SummerCamp />
              </>
            }
          />

          <Route path="/lessons" element={<LessonPage />} />
          <Route path="/Tournaments" element={<TournamentPage />} />
          <Route path="/SummerCamp" element={<SummerCampPage />} />
          <Route path="/Tournament-Search" element={<TournamentSearch />} />
          <Route path="/Golf-Courses" element={<GolfCoursePage />} />
          <Route path="/Driving-Range" element={<DrivingRangePage />} />
          <Route path="/Putting-Green" element={<PuttingGreenPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

        </Routes>
        <SignInPage show={showModal} handleClose={handleCloseModal} />
      </div>
    </BrowserRouter>



  );
}

export default App;
