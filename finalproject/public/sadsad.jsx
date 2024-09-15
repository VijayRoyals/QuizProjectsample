

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Result from "../components/Result";

function Test({ questions, title, color, icon, slug, difficulty }) {
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Timer settings
  const QUESTION_TIME_LIMIT = 15; // 15 seconds for each question

  // Initialize state
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [timer, setTimer] = useState(QUESTION_TIME_LIMIT); // Timer for each question

  // Effect to handle the timer
  useEffect(() => {
    if (questions.length === 0) return; // Ensure questions are loaded

    let interval;
    if (questionIndex < questions.length && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleNextQuestion(); // Auto-submit if time runs out
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    // Clear interval on cleanup
    return () => clearInterval(interval);
  }, [timer, questionIndex, questions.length]);

  // Effect to reset the timer for each question
  useEffect(() => {
    setTimer(QUESTION_TIME_LIMIT); // Reset timer on question change
  }, [questionIndex]);

  // Effect to show congratulations toast
  useEffect(() => {
    if (questionIndex === questions.length) {
      toast.success("Congratulations", {
        icon: "🎉",
      });
    }
  }, [questionIndex, questions.length]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer === null) {
      return toast.error("Please select an answer");
    } else {
      if (selectedAnswer === correctAnswer) {
        setAnswerStatus("correct");
        setCorrectAnswerCount(correctAnswerCount + 1);
      } else {
        setAnswerStatus("incorrect");
      }

      setShowNextButton(true);
      setStatusDisabled(true);

      // Save the answer to localStorage
      const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
      quizAnswers[questions[questionIndex].question] = selectedAnswer;
      localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    }
  };

  // Handle moving to the next question or finish the quiz
  const handleNextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setAnsweredQuestions(answeredQuestions + 1);
      setSelectedAnswer(null);
      setShowNextButton(false);
      setAnswerStatus(null);
      setStatusDisabled(false);
    } else {
      handleFinish(); // Finish the quiz
    }
  };

  // Handle finishing the quiz and navigate to Result
  const handleFinish = () => {
    const quizResults = {
      title,
      color,
      icon,
      correctAnswerCount,
      questionsLength: questions.length,
      slug,
      difficulty, // Save difficulty
    };
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    navigate(`/showresult/${slug}?difficulty=${difficulty}`); // Ensure correct navigation
  };

  // Calculate the width and color of the progress bar
  const getProgressBarStyle = () => {
    const progressWidth = (timer / QUESTION_TIME_LIMIT) * 100; // Width based on time left
    let progressColor = 'green';

    if (timer <= 5) {
      progressColor = 'red';
    } else if (timer <= 10) {
      progressColor = 'yellow';
    }

    return {
      width: `${progressWidth}%`,
      backgroundColor: progressColor,
      height: '5px',
      transition: 'width 1s linear', // Smooth transition for width
    };
  };

  // Return early if no questions are available
  if (!questions || questions.length === 0) {
    return (
      <h3>
        Please select difficulty mode
        <Link to="/home" className="gotoquizbutton">
          Go To quiz start page
        </Link>
      </h3>
    );
  }

  // Return the result when all questions are answered
  if (questionIndex === questions.length) {
    return (
      <Result
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={correctAnswerCount}
        questionsLength={questions.length}
        slug={slug} // Ensure this is passed
        difficulty={difficulty} // Ensure difficulty is passed
      />
    );
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <p className="test-description">
          Question {answeredQuestions} of {questions.length}
          <div className="test-proccess-container">
            <div
              className="test-proccess"
              style={{
                width: (answeredQuestions / questions.length) * 100 + "%",
              }}
            ></div>
          </div>
        </p>
        <h2 className="test-title">{questions[questionIndex].question}</h2>

        {/* Timer display */}
        <div className="test-timer">
          <p>Time Remaining: {timer}s</p>

          {/* Progress bar */}
          <div className="test-timer-container">
            <div className="test-timer-bar" style={getProgressBarStyle()}></div>
          </div>
        </div>
      </div>
      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {questions[questionIndex].options.map((option, index) => {
              const alphabet = String.fromCharCode(index + 65);
              let className = "";
              if (answerStatus === "correct" && option === selectedAnswer) {
                className = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  className = "incorrect";
                }
                if (option === questions[questionIndex].answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>
                    <input
                      onChange={() => setSelectedAnswer(option)}
                      type="radio"
                      name="option"
                      disabled={statusDisabled}
                      checked={selectedAnswer === option} // Ensure the selected option is checked
                    />
                    <span className="test-text">{option}</span>

                    {/* icon */}
                    <img
                      className="test-icon-correct"
                      src={`../assets/icon-correct.svg`} // Use slug for the icon
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <img
                      className="test-icon-incorrect"
                      src={`../assets/icon-incorrect.svg`} // Use slug for the icon
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
          {!showNextButton && (
            <button className="btn test-btn">Submit Question</button>
          )}
          {showNextButton && (
            <button onClick={handleNextQuestion} className="btn test-btn">
              {questions.length === questionIndex + 1
                ? "Finish"
                : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;
