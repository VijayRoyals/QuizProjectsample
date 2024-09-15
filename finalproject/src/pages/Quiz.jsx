// // react router dom import
// import { useParams } from "react-router-dom";

// // components
// import Test from "../components/Test";

// // hooks
// import { useFetch } from "../hooks/useFetch";
// import { useEffect, useState } from "react";

// function Quiz() {
//   const { slug } = useParams();
//   // const { title} = useParams();
//   // const { title } = useParams();
//   // const {
//   //   data: quizzes,
//   //   isPending,
//   //   error
//   // } = useFetch(
//   //   // `http://127.0.0.1:8000/api/quizzes?slug=${slug || ''}`
//   //   `http://127.0.0.1:8000/api/quizzes/${slug}/`
//   //   // `http://127.0.0.1:8000/api/quizzes?title=${title}`
//   //   // `http://localhost:8888/quizzes?title=${title}`
//   //   // `http://127.0.0.1:8000/api/quiz/quizzes?title=${title}`
//   //   // `http://127.0.0.1:8000/api/backend_data/quizzes?title=${title}`
//   //   // `https://online-json-server-api.up.railway.app/project/66589e8316aab5687eae3b28/quizzes?title=${title}`
//   // );


//   const [url, setUrl] = useState(null);
//   const { data: quizzes, isPending, error } = useFetch(url);

//   useEffect(() => {
//     // Set a timeout to update the URL after 1 second
//     const timer = setTimeout(() => {
//       setUrl(`http://127.0.0.1:8000/api/quizzes/${slug}/`);
//     }, 500); // 1000 milliseconds = 1 second

//     // Cleanup timeout if the component unmounts or URL changes
//     return () => clearTimeout(timer);
//   }, []); 


//    // new code

//  useEffect(() => {
//     if (slug) {
//       document.title = "Quiz - " + slug;
//     }
//   }, [slug]);

//   if (!slug) {
//     return <h3>Quiz slug is missing.</h3>;
//   }


//   console.log('Quizzes Data:', quizzes); // To see the entire API response
//   // if (quizzes) {
//   //   console.log('Ttile:', quizzes.title); // To check if questions exist

//   //   console.log('Questions:', quizzes.questions);
//   // }

//   // old code 
//   // useEffect(() => {              
//   //   document.title = "Quiz" + " " + title;
//   // }, [title]);


//   // Add this console log to check what data is returned
//   // console.log(quizzes);

//   return (
//     <div className="quiz-container container">
//       {isPending && <h3>Loading...</h3>}
//       {error && <h3>Something went wrong</h3>}
//       {/* {console.log(title.charAt(0),'hh')} */}
      
//       {/* {quizzes && <Test questions={quizzes[0]} />} */}

    
//       {/* {quizzes && quizzes.title && (
//         <Test questions={quizzes.title} />
//       )}

//        */}
//       {/* {quizzes && (
//         <Test 
//         questions={quizzes.questions}
//         title={quizzes.title}
//         color={quizzes.color}
//         icon={quizzes.icon}
//           />
//         ) } */}

// {quizzes && (
//   <Test
//   questions={quizzes.questions}
//   title={quizzes.title}
//   color={quizzes.color}
//   icon={quizzes.icon}
//   slug={quizzes.slug} // Ensure this is passed correctly
// />
// )}





//         {/* {quizzes && quizzes.length > 0 ? (
//         <Test questions={quizzes.find(q => q.slug === slug)}
        
//         />
//       ) : (
//         <h3>No quizzes found for this slug.</h3>
//       )} */}


//     </div>
//   );
// }

// export default Quiz;






// import { useParams, useSearchParams } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";
// import { useEffect, useState } from "react";
// import Test from "../components/Test";

// function Quiz() {
//   const { slug } = useParams();
//   const [searchParams] = useSearchParams();
//   const difficulty = searchParams.get("difficulty");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [url, setUrl] = useState(null);
//   const { data: quiz, isPending, error } = useFetch(url);

//   useEffect(() => {
//     // Set a timeout to update the URL after 500ms
//     const timer = setTimeout(() => {
//       setUrl(`http://127.0.0.1:8000/api/quizzes/${slug}/`);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [slug]);

//   useEffect(() => {
//     if (quiz && quiz.questions) {
//       let filtered = [];

//       if (difficulty === "easy") {
//         filtered = quiz.questions.slice(0, 3); // Questions 1-3
//       } else if (difficulty === "medium") {
//         filtered = quiz.questions.slice(3, 6); // Questions 4-5
//       } else if (difficulty === "hard") {
//         filtered = quiz.questions.slice(6, 10); // Questions 6-10
//       }

//       setFilteredQuestions(filtered);
//     }
//   }, [quiz, difficulty]);

//   useEffect(() => {
//     if (slug) {
//       document.title = "Quiz - " + slug;
//       localStorage.setItem('slug', slug);
//     }
//   }, [slug]);

//   if (!slug) {
//     return <h3>Quiz slug is missing.</h3>;
//   }

//   return (
//     <div className="quiz-container container">
//       {isPending && <h3>Loading...</h3>}
//       {error && <h3>Something went wrong</h3>}
//       {quiz && (
//         <Test
//           questions={filteredQuestions} // Use filtered questions
//           title={quiz.title}
          
//           color={quiz.color}
//           icon={quiz.icon}
//           slug={quiz.slug} // Ensure this is passed correctly
//           difficulty={difficulty} 
//         />
//       )}
//     </div>
 
//   );

// }

// export default Quiz;




import { useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Test from "../components/Test";

function Quiz() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [url, setUrl] = useState(null);
  const { data: quiz, isPending, error } = useFetch(url);


  useEffect(() => {
    // Set a timeout to update the URL after 500ms
    const timer = setTimeout(() => {
      setUrl(`http://127.0.0.1:8000/api/quizzes/${slug}/`);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (quiz && quiz.questions) {
      const totalQuestions = quiz.questions.length;
      const questionsPerDifficulty = Math.floor(totalQuestions / 3); // Split questions equally

      let filtered = [];

      if (difficulty === "easy") {
        filtered = quiz.questions.slice(0, questionsPerDifficulty); // Easy questions
      } else if (difficulty === "medium") {
        filtered = quiz.questions.slice(questionsPerDifficulty, questionsPerDifficulty * 2); // Medium questions
      } else if (difficulty === "hard") {
        filtered = quiz.questions.slice(questionsPerDifficulty * 2, totalQuestions); // Hard questions
      }

      setFilteredQuestions(filtered);
    }
  }, [quiz, difficulty]);

  useEffect(() => {
    if (slug) {
      document.title = "Quiz - " + slug;
      localStorage.setItem('slug', slug);
    }
  }, [slug]);


  if (!slug) {
    return <h3>Quiz slug is missing.</h3>;
  }

  return (
    <div className="quiz-container container">
      {isPending && <h3>Loading...</h3>}
      {error && <h3>Something went wrong</h3>}
      {quiz && (
        <>
          <Test
            questions={filteredQuestions} // Use filtered questions
            title={quiz.title}
            color={quiz.color}
            icon={quiz.icon}
            slug={quiz.slug} // Ensure this is passed correctly
            difficulty={difficulty} 
          />

        </>
      )}
    </div>
  );
}

export default Quiz;
