// import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";
// import { useEffect, useState } from "react";

// function MenuLinks() {
//   // const {
//   //   data: quizzes,
//   //   isPending,
//   //   error,
//   // } = useFetch(
//   //   "http://127.0.0.1:8000/api/quizzes/"
    
//   //   // "http://localhost:8888/quizzes"
//   //   // "http://127.0.0.1:8000/api/backend_data/quizzes"
//   //   // "http://127.0.0.1:8000/api/quiz/quizzes/"
//   //   // "https://online-json-server-api.up.railway.app/project/66589e8316aab5687eae3b28/quizzes"
//   // );

//   // console.log(isPending, error);
//   // console.log('data:', quizzes);


//   const [url, setUrl] = useState(null);
//   const { data: quizzes, isPending, error } = useFetch(url);

//   useEffect(() => {
//     // Set a timeout to update the URL after 1 second
//     const timer = setTimeout(() => {
//       setUrl("http://127.0.0.1:8000/api/quizzes/");
//     }, 500); // 1000 milliseconds = 1 second

//     // Cleanup timeout if the component unmounts or URL changes
//     return () => clearTimeout(timer);
//   }, []); 

//   console.log(isPending, error);
//   console.log('data:', quizzes);
//   return (
//     <div>
//       {isPending && <p>Loading...</p>}
      
//       {error && <p>Error: {error.message}</p>}
//       <div className="menu-list">
        
        
//         {quizzes &&

        
//           quizzes.map((item) => {
//             return (
//               <Link
//                 // key={item.title}
//                 key={item.slug} // Use a unique key, like slug or id
//                 // to={`/quiz/${item.title}`}
//                 to={`/quiz/${item.slug}`} // Linking to the quiz slug
//                 className="menu-item header-logo"
//               >
//                 <figure style={{ backgroundColor: item.color }}>
//                   <img src={item.icon} alt={item.title} />
//                 </figure>
//                 <span>{item.title}</span>
                
//               </Link>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// export default MenuLinks;



// import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";
// import { useEffect, useState } from "react";

// function MenuLinks() {
//   const [url, setUrl] = useState(null);
//   const [difficulty, setDifficulty] = useState(''); // State for difficulty level
//   const { data: quizzes, isPending, error } = useFetch(url);

//   useEffect(() => {
//     // Construct URL based on selected difficulty level
//     const baseUrl = "http://127.0.0.1:8000/api/quizzes/";
//     const urlWithDifficulty = difficulty ? `${baseUrl}?difficulty=${difficulty}` : baseUrl;

//     // Set a timeout to update the URL after 500ms
//     const timer = setTimeout(() => {
//       setUrl(urlWithDifficulty);
//     }, 500);

//     // Cleanup timeout if the component unmounts or URL changes
//     return () => clearTimeout(timer);
//   }, [difficulty]); // Depend on difficulty to fetch quizzes based on it

//   const handleDifficultyChange = (event) => {
//     setDifficulty(event.target.value);
//   };

//   return (
//     <section className="home-container container">
//       <div className="home-content">
//         <h1 className="home-title">
//           <span>Welcome to the</span>
//           <span>Quiz!</span>
//         </h1>
        
//         {/* Difficulty filter card below the heading */}
//         <div className="difficulty-card">
//           <div className="difficulty-filter">
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="easy"
//                 checked={difficulty === 'easy'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Easy</span>
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="medium"
//                 checked={difficulty === 'medium'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Medium</span>
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="hard"
//                 checked={difficulty === 'hard'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Hard</span>
//             </label>
//           </div>
//         </div>
//       </div>
      
//       <div className="home-nav-list">
//         {isPending && <p>Loading...</p>}
        
//         {error && <p>Error: {error.message}</p>}

//         <div className="menu-list">
//           <p><i>Pick a subject to get started.</i></p>
//           {quizzes &&
//             quizzes.map((item) => (
//               <Link
//                 key={item.slug} // Use a unique key, like slug or id
//                 to={`/quiz/${item.slug}`} // Linking to the quiz slug
//                 className="menu-item header-logo"
//               >
//                 <figure style={{ backgroundColor: item.color }}>
//                   <img src={item.icon} alt={item.title} />
//                 </figure>
//                 <span>{item.title}</span>
//               </Link>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MenuLinks;






// import { Link } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";
// import { useEffect, useState } from "react";

// function MenuLinks() {
//   const [url, setUrl] = useState(null);
//   const [difficulty, setDifficulty] = useState(''); // State for difficulty level
//   const { data: quizzes, isPending, error } = useFetch(url);

//   useEffect(() => {
//     // Construct URL based on selected difficulty level
//     const baseUrl = "http://127.0.0.1:8000/api/quizzes/";
//     const urlWithDifficulty = difficulty ? `${baseUrl}?difficulty=${difficulty}` : baseUrl;

//     // Set a timeout to update the URL after 500ms
//     const timer = setTimeout(() => {
//       setUrl(urlWithDifficulty);
//     }, 500);

//     // Cleanup timeout if the component unmounts or URL changes
//     return () => clearTimeout(timer);
//   }, [difficulty]); // Depend on difficulty to fetch quizzes based on it

//   const handleDifficultyChange = (event) => {
//     setDifficulty(event.target.value);
//   };

//   return (
//     <section className="home-container container">
//       <div className="home-content">
//         <h1 className="home-title">
//           <span>Welcome to the</span>
//           <span>Quiz!</span>
//         </h1>
        
//         {/* Difficulty filter card below the heading */}
//         <div className="difficulty-card">
//           <div className="difficulty-filter">
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="easy"
//                 checked={difficulty === 'easy'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Easy</span>
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="medium"
//                 checked={difficulty === 'medium'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Medium</span>
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="difficulty"
//                 value="hard"
//                 checked={difficulty === 'hard'}
//                 onChange={handleDifficultyChange}
//               />
//               <span>Hard</span>
//             </label>
//           </div>
//         </div>
//       </div>
      
//       <div className="home-nav-list">
//         {isPending && <p>Loading...</p>}
        
//         {error && <p>Error: {error.message}</p>}

//         <div className="menu-list">
//           <p><i>Pick a subject to get started.</i></p>
//           {quizzes &&
//             quizzes.map((item) => (
//               <Link
//                 key={item.slug} // Use a unique key, like slug or id
//                 to={`/quiz/${item.slug}?difficulty=${difficulty}`} // Pass difficulty as a query parameter
//                 className="menu-item header-logo"
//               >
//                 <figure style={{ backgroundColor: item.color }}>
//                   <img src={item.icon} alt={item.title} />
//                 </figure>
//                 <span>{item.title}</span>
//               </Link>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MenuLinks;

import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

function MenuLinks() {
  const [url, setUrl] = useState(null);
  const [difficulty, setDifficulty] = useState(''); // State for difficulty level
  const { data: quizzes, isPending, error } = useFetch(url);
  const navigate = useNavigate();  // Used for navigation after logout

  useEffect(() => {
    // Construct URL based on selected difficulty level
    const baseUrl = "http://127.0.0.1:8000/api/quizzes/";
    const urlWithDifficulty = difficulty ? `${baseUrl}?difficulty=${difficulty}` : baseUrl;

    // Set a timeout to update the URL after 500ms
    const timer = setTimeout(() => {
      setUrl(urlWithDifficulty);
    }, 500);

    // Cleanup timeout if the component unmounts or URL changes
    return () => clearTimeout(timer);
  }, [difficulty]); // Depend on difficulty to fetch quizzes based on it

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuizClick = (quizId) => {
    // Store quiz ID in sessionStorage (or use localStorage if you prefer)
    localStorage.setItem('selectedQuizId', quizId);
  };

  // Retrieve user name from localStorage
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);
  
  // Function to handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear(); // Clear all local storage items
      navigate('/'); // Navigate to the home page
    }
  };

  return (
    <section className="home-container container">
      <div className="home-content">
        <h1 className="home-title">
          <span> Hi {userName},  <br/>Welcome to the</span>
          <span>Quiz! </span>
          <div>
            {/* Logout Button */}
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </h1>

        {/* Difficulty filter card below the heading */}
        <div className="difficulty-card">
          <div className="difficulty-filter">
            <label>
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={handleDifficultyChange}
              />
              <span>Easy</span>
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={handleDifficultyChange}
              />
              <span>Medium</span>
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={handleDifficultyChange}
              />
              <span>Hard</span>
            </label>
          </div>
        </div>
      </div>

      <div className="home-nav-list">
        {isPending && <p>Loading...</p>}
        
        {error && <p>Error: {error.message}</p>}

        <div className="menu-list">
          <p><i>Pick a subject to get started.</i></p>
          {quizzes &&
            quizzes.map((item) => (
              <Link
                key={item.slug} // Use a unique key, like slug or id
                to={`/quiz/${item.slug}?difficulty=${difficulty}`} // Pass difficulty as a query parameter
                className="menu-item header-logo"
                onClick={() => handleQuizClick(item.id)} // Store quiz ID on click
              >
                <figure style={{ backgroundColor: item.color }}>
                  <img src={item.icon} alt={item.title} />
                </figure>
                <span>{item.title}</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MenuLinks;
