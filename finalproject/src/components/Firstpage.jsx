import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../firstpage.css'; 
import logoImage from '..//Images/logoimage.png';

const FirstPage = () => {

  const navigate = useNavigate();

  const handleTakeQuizClick = () => {
    navigate('/studentlogin');
  };
  const handleStudentClick = () => {
    navigate('/studentlogin');
  };
  const handleFacultyClick = () => {
    navigate('/facultylogin');
  };
  const handleAdminClick = () => {
    navigate('/adminlogin');
  };

  return (
    <main>
      <section className="home-container container">
        <div className="home-content">
          <div className="left-side">
            <div className="big-text">Quiz Time</div>
            <p className="small-text">"to learn you have to listen, to improve you have to try"</p>
            <button className="take-quiz-btn" onClick={handleTakeQuizClick} type='button'>Take Quiz</button>
          </div>
          <div className="right-side">
            <div> 
            <img  src={logoImage} alt="firstlogoimage" />


            </div>
            <div className="login-as">
                <p>Login as:</p>
                <div className="login-buttons">
                  <button className="login-btn-student" onClick={handleStudentClick} type='button'>Student</button>
                  <button className="login-btn-faculty" onClick={handleFacultyClick} type='button'>Faculty</button>
                  <button className="login-btn-admin" onClick={handleAdminClick} type='button'>Admin</button>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FirstPage;
