// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { CheckCircle, Cancel } from '@mui/icons-material';

// function ShowResults() {
//   const [searchParams] = useSearchParams();
//   const [quiz, setQuiz] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Load user results, answers, and quiz data from localStorage
//   const userResults = JSON.parse(localStorage.getItem('quizResults')) || {};
//   const userAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
//   const { score, correctAnswerCount, questionsLength, difficulty } = userResults;

//   const userId = localStorage.getItem('user_id');  // Fetch user ID from local storage
//   const name = localStorage.getItem('name');   // Fetch name from local storage
//   const selectedQuizId = localStorage.getItem('selectedQuizId'); // Fetch quiz ID
//   const slug = localStorage.getItem('slug');       // Fetch slug from local storage

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetch(`http://127.0.0.1:8000/api/quizzes/${slug}/`)
//         .then(response => response.json())
//         .then(data => {
//           setQuiz(data);
//           setIsPending(false);
//         })
//         .catch(err => {
//           setError(err);
//           setIsPending(false);
//         });
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [slug]);

//   // API call to store scorecard data
//   const saveScoreCard = () => {
//     const scoreCardData = {
//       user: userId,
//       quiz: selectedQuizId,
//       score: score,
//       name: name,     // Include name from localStorage
//       slug: slug,     // Include slug from localStorage
//       difficulty: difficulty,  // Include difficulty from quizResults
//     };

//     fetch('http://127.0.0.1:8000/api/user/scorecards/create/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send token for authentication
//       },
//       body: JSON.stringify(scoreCardData),  // Send name, slug, and difficulty along with other data
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('ScoreCard saved:', data);
//       })
//       .catch(error => {
//         console.error('Error saving scorecard:', error);
//       });
//   };

//   // Handle "End Quiz" button click
//   const handleEndQuiz = () => {
//     const confirmEnd = window.confirm("Are you sure you want to end the quiz? This will clear your answers and return to the homepage.");
//     if (confirmEnd) {
//       // Call the saveScoreCard function before clearing the data
//       saveScoreCard();
      
//       localStorage.removeItem('quizAnswers');
//       navigate('/home'); // Navigate to the home page
//     }
//   };

//   if (isPending) return <h3>Loading...</h3>;
//   if (error) return <h3>Error: {error.message}</h3>;
//   if (!quiz) return <h3>No quiz data available</h3>;

//   // Calculate the number of questions for each difficulty dynamically
//   const totalQuestions = quiz.questions.length;
//   const questionsPerDifficulty = Math.floor(totalQuestions / 3); // Split into 3 parts

//   // Filter questions based on the difficulty level dynamically
//   let filteredQuestions = [];
//   if (difficulty === 'easy') {
//     filteredQuestions = quiz.questions.slice(0, questionsPerDifficulty); // Easy questions
//   } else if (difficulty === 'medium') {
//     filteredQuestions = quiz.questions.slice(questionsPerDifficulty, questionsPerDifficulty * 2); // Medium questions
//   } else if (difficulty === 'hard') {
//     filteredQuestions = quiz.questions.slice(questionsPerDifficulty * 2, totalQuestions); // Hard questions
//   }

//   // Calculate incorrect answers
//   const incorrectAnswers = questionsLength - correctAnswerCount;

//   return (
//     <div className="show-results-container container">
//       <h1>{quiz.title} - Results</h1>
//       <div className="results-summary">
//         <h2>Score: {score}%</h2> {/* Display stored score */}
//         <p>Correct Answers: {correctAnswerCount}</p>
//         <p>Incorrect Answers: {incorrectAnswers}</p>
//       </div>
//       <div className="questions-list">
//         {filteredQuestions.map((question, index) => (
//           <div key={index} className="question-card">
//             <h2>
//               Question {index + 1}: {question.question}
//             </h2>
//             <ul className="options-list">
//               {question.options.map((option, i) => {
//                 const isCorrect = option === question.answer;
//                 const isSelected = userAnswers[question.question] === option;

//                 return (
//                   <li key={i} className={`option-item ${isSelected ? 'selected' : ''}`}>
//                     <span>{option}</span>
//                     {isCorrect ? (
//                       <CheckCircle className="correct-icon" style={{ color: 'green' }} />
//                     ) : isSelected ? (
//                       <Cancel className="incorrect-icon" style={{ color: 'red' }} />
//                     ) : null}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* End Quiz Button */}
//       <div className="end-quiz-button">
//         <button className="btn end-quiz-btn" onClick={handleEndQuiz}>
//           End Quiz
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ShowResults;






import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Cancel } from '@mui/icons-material';
// import './ShowResults.css'; // Import the CSS file for styling

function ShowResults() {
  const [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
  const navigate = useNavigate();

  // Load user results, answers, and quiz data from localStorage
  const userResults = JSON.parse(localStorage.getItem('quizResults')) || {};
  const userAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
  const { score, correctAnswerCount, questionsLength, difficulty } = userResults;

  const userId = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const selectedQuizId = localStorage.getItem('selectedQuizId');
  const slug = localStorage.getItem('slug');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://127.0.0.1:8000/api/quizzes/${slug}/`)
        .then(response => response.json())
        .then(data => {
          setQuiz(data);
          setIsPending(false);
        })
        .catch(err => {
          setError(err);
          setIsPending(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  // Function to save the score card
  const saveScoreCard = () => {
    const scoreCardData = {
      user: userId,
      quiz: selectedQuizId,
      score: score,
      name: name,
      slug: slug,
      difficulty: difficulty,
    };

    fetch('http://127.0.0.1:8000/api/user/scorecards/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(scoreCardData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('ScoreCard saved:', data);
      })
      .catch(error => {
        console.error('Error saving scorecard:', error);
      });
  };

  // Function to handle ending the quiz
  const handleEndQuiz = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the quiz? This will clear your answers and return to the homepage.");
    if (confirmEnd) {
      saveScoreCard();
      localStorage.removeItem('quizAnswers');
      navigate('/home');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  useEffect(() => {
    // Set the initial mode based on user preference or system setting
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    document.body.classList.toggle('dark-mode', prefersDarkMode);
  }, []);

  if (isPending) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;
  if (!quiz) return <h3>No quiz data available</h3>;

  const totalQuestions = quiz.questions.length;
  const questionsPerDifficulty = Math.floor(totalQuestions / 3);

  let filteredQuestions = [];
  if (difficulty === 'easy') {
    filteredQuestions = quiz.questions.slice(0, questionsPerDifficulty);
  } else if (difficulty === 'medium') {
    filteredQuestions = quiz.questions.slice(questionsPerDifficulty, questionsPerDifficulty * 2);
  } else if (difficulty === 'hard') {
    filteredQuestions = quiz.questions.slice(questionsPerDifficulty * 2, totalQuestions);
  }

  const incorrectAnswers = questionsLength - correctAnswerCount;

  return (
    <div className="card-container">
      <br/>
      <h2>{quiz.title} - Results</h2>
      <br/>
      <div className="results-summary">
        <h4>Score: {score}%</h4>
        <p>Correct Answers: {correctAnswerCount}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>
      <div className="questions-list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question-card">
            <h4>
              Question {index + 1}:&nbsp; {question.question}
            </h4><br/>
            <ul className="options-list">
              {question.options.map((option, i) => {
                const isCorrect = option === question.answer;
                const isSelected = userAnswers[question.question] === option;

                return (
                  <li key={i} className={`option-item ${isSelected ? 'selected' : ''}`}>
                    <span>{option}</span>
                    {isCorrect ? (
                      <CheckCircle className="correct-icon" />
                    ) : isSelected ? (
                      <Cancel className="incorrect-icon" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="end-quiz-button">
        <button className="btn" onClick={handleEndQuiz}>
          End Quiz
        </button>
      </div>

      {/* <div className="dark-mode-toggle">
        <button className="btn" onClick={toggleDarkMode}>
          Toggle Dark Mode
        </button>
      </div> */}
    </div>
  );
}

export default ShowResults;
