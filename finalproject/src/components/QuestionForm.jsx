// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddQuestions = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     question: '',
//     options: ['', '', '', ''],
//     answer: '',
//   });

//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuestionId, setEditingQuestionId] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/quizzes/');
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//       setError('Failed to fetch quizzes. Please try again later.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('option')) {
//       const index = parseInt(name.split('-')[1], 10);
//       const newOptions = [...formData.options];
//       newOptions[index] = value;
//       setFormData((prevState) => ({
//         ...prevState,
//         options: newOptions,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');  // Reset error state before submission

//     const requestData = {
//       question: formData.question,
//       options: formData.options,
//       answer: formData.answer,
//     };

//     try {
//       const selectedQuizSlug = formData.title;
//       if (editingQuestionId) {
//         // Since updating by ID is not supported, consider adjusting this logic.
//         console.error('Updating questions by ID is not supported by your API structure.');
//         setError('Updating questions is not supported.');
//       } else {
//         await axios.post(`http://127.0.0.1:8000/api/quizzes/${selectedQuizSlug}/`, requestData);
//       }
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('Failed to submit the question. Please try again.');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       question: '',
//       options: ['', '', '', ''],
//       answer: '',
//     });
//     setEditingQuestionId(null);
//   };

//   const handleEdit = (question) => {
//     setFormData({
//       title: question.quiz.slug,
//       question: question.question,
//       options: question.options,
//       answer: question.answer,
//     });
//     setEditingQuestionId(question.id);
//   };

//   return (
//     <div className="add-questions-container">
//       <h2 className="add-questions-title">{editingQuestionId ? 'Edit Question' : 'Add New Question'}</h2>
//       <form onSubmit={handleSubmit} className="add-questions-form">
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label htmlFor="title">Quiz Title</label>
//           <select
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-control"
//           >
//             <option value="">Select a quiz</option>
//             {quizzes.map((quiz) => (
//               <option key={quiz.slug} value={quiz.slug}>
//                 {quiz.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="question">Question</label>
//           <textarea
//             id="question"
//             name="question"
//             value={formData.question}
//             onChange={handleChange}
//             className="form-control"
//             rows="4"
//             placeholder="Enter your question here..."
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Options</label>
//           {formData.options.map((option, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`option-${index}`}
//               value={option}
//               onChange={handleChange}
//               className="form-control"
//               placeholder={`Option ${index + 1}`}
//             />
//           ))}
//         </div>
//         <div className="form-group">
//           <label htmlFor="answer">Correct Answer</label>
//           <input
//             id="answer"
//             name="answer"
//             type="text"
//             value={formData.answer}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter the correct answer here..."
//           />
//         </div>
//         <button type="submit" className="btn">
//           {editingQuestionId ? 'Update Question' : 'Submit Question'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestions;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddQuestions = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     question: '',
//     options: ['', '', '', ''],
//     answer: '',
//   });

//   const [quizzes, setQuizzes] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/quizzes/');
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//       setError('Failed to fetch quizzes. Please try again later.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('option')) {
//       const index = parseInt(name.split('-')[1], 10);
//       const newOptions = [...formData.options];
//       newOptions[index] = value;
//       setFormData((prevState) => ({
//         ...prevState,
//         options: newOptions,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');  // Reset error state before submission

//     const requestData = {
//       question: formData.question,
//       options: formData.options,
//       answer: formData.answer,
//     };

//     try {
//       const selectedQuizSlug = formData.title;
//       await axios.post(`http://127.0.0.1:8000/api/quizzes/${selectedQuizSlug}/add-question/`, requestData);
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('Failed to submit the question. Please try again.');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       question: '',
//       options: ['', '', '', ''],
//       answer: '',
//     });
//   };

//   return (
//     <div className="add-questions-container">
//       <h2 className="add-questions-title">Add New Question</h2>
//       <form onSubmit={handleSubmit} className="add-questions-form">
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label htmlFor="title">Quiz Title</label>
//           <select
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-control"
//           >
//             <option value="">Select a quiz</option>
//             {quizzes.map((quiz) => (
//               <option key={quiz.slug} value={quiz.slug}>
//                 {quiz.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="question">Question</label>
//           <textarea
//             id="question"
//             name="question"
//             value={formData.question}
//             onChange={handleChange}
//             className="form-control"
//             rows="4"
//             placeholder="Enter your question here..."
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Options</label>
//           {formData.options.map((option, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`option-${index}`}
//               value={option}
//               onChange={handleChange}
//               className="form-control"
//               placeholder={`Option ${index + 1}`}
//             />
//           ))}
//         </div>
//         <div className="form-group">
//           <label htmlFor="answer">Correct Answer</label>
//           <input
//             id="answer"
//             name="answer"
//             type="text"
//             value={formData.answer}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter the correct answer here..."
//           />
//         </div>
//         <button type="submit" className="btn">
//           Submit Question
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestions;






// import React, { useState, useEffect } from 'react'; // Import useEffect
// import axios from 'axios'; // Import axios for making HTTP requests
// import { useFetch } from '../hooks/useFetch'; // Import the useFetch hook

// const AddQuestions = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     question: '',
//     options: ['', '', '', ''],
//     answer: '',
//   });

//   const [error, setError] = useState(''); // Initialize error state

//   const [url, setUrl] = useState(null);
//   const { data: quizzes, isPending, error: fetchError } = useFetch(url);

//   useEffect(() => {
//     // Set a timeout to update the URL after 500ms
//     const timer = setTimeout(() => {
//       setUrl('http://127.0.0.1:8000/api/quizzes/');
//     }, 500); // 500 milliseconds = 0.5 second

//     // Cleanup timeout if the component unmounts or URL changes
//     return () => clearTimeout(timer);
//   }, []); // Empty dependency array to run this effect only once

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('option')) {
//       const index = parseInt(name.split('-')[1], 10);
//       const newOptions = [...formData.options];
//       newOptions[index] = value;
//       setFormData((prevState) => ({
//         ...prevState,
//         options: newOptions,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state before submission

//     const requestData = {
//       question: formData.question,
//       options: formData.options,
//       answer: formData.answer,
//     };

//     try {
//       const selectedQuizSlug = formData.title;
//       console.log('Selected Quiz Slug:', selectedQuizSlug); // Print the slug in the console
//       await axios.post(`http://127.0.0.1:8000/api/quizzes/${selectedQuizSlug}/add-question/`, requestData);
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('Failed to submit the question. Please try again.');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       question: '',
//       options: ['', '', '', ''],
//       answer: '',
//     });
//   };

//   return (
//     <div className="add-questions-container">
//       <h2 className="add-questions-title">Add New Question</h2>
//       <form onSubmit={handleSubmit} className="add-questions-form">
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <label htmlFor="title">Quiz Title</label>
//           <select
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-control"
//           >
//             <option value="">Select a quiz</option>
//             {isPending && <option>Loading quizzes...</option>}
//             {fetchError && <option>Error loading quizzes</option>}
//             {quizzes && quizzes.map((quiz) => (
//               <option key={quiz.slug} value={quiz.slug}>
//                 {quiz.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="question">Question</label>
//           <textarea
//             id="question"
//             name="question"
//             value={formData.question}
//             onChange={handleChange}
//             className="form-control"
//             rows="4"
//             placeholder="Enter your question here..."
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Options</label>
//           {formData.options.map((option, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`option-${index}`}
//               value={option}
//               onChange={handleChange}
//               className="form-control"
//               placeholder={`Option ${index + 1}`}
//             />
//           ))}
//         </div>
//         <div className="form-group">
//           <label htmlFor="answer">Correct Answer</label>
//           <input
//             id="answer"
//             name="answer"
//             type="text"
//             value={formData.answer}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter the correct answer here..."
//           />
//         </div>
//         <button type="submit" className="btn">
//           Submit Question
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestions;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetch } from '../hooks/useFetch'; // Assuming you have this hook for fetching data

const AddQuestions = () => {
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

  const [error, setError] = useState(''); // Initialize error state
  const [url, setUrl] = useState(null);
  const { data: quizzes, isPending, error: fetchError } = useFetch(url); // Fetch quiz list

  // Effect to fetch quizzes data with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setUrl('http://127.0.0.1:8000/api/quizzes/');
    }, 500);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  // Handling input changes and logging the input values
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log('Field name:', name, 'Field value:', value); // Log field name and value

    if (name.startsWith('option')) {
      const index = parseInt(name.split('-')[1], 10);
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        options: newOptions,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handling form submission and logging form data and slug
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submission

    const requestData = {
      question: formData.question,
      options: formData.options,
      answer: formData.answer,
    };

    console.log('Form Data:', formData); // Log full form data

    const selectedQuizSlug = formData.title;
    console.log('Selected Quiz Slug:', selectedQuizSlug); // Log selected slug

    if (!selectedQuizSlug) {
      setError('Please select a quiz.');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/quizzes/${selectedQuizSlug}/add-question/`, requestData);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit the question. Please try again.');
    }
  };

  // Resetting the form after successful submission
  const resetForm = () => {
    setFormData({
      title: '',
      question: '',
      options: ['', '', '', ''],
      answer: '',
    });
  };

  return (
    <div className="add-questions-container">
      <h2 className="add-questions-title">Add New Question</h2>
      <form onSubmit={handleSubmit} className="add-questions-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Quiz Title</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a quiz</option>
            {isPending && <option>Loading quizzes...</option>}
            {fetchError && <option>Error loading quizzes</option>}
            {quizzes && quizzes.map((quiz) => (
              <option key={quiz.slug} value={quiz.slug}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Enter your question here..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Options</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name={`option-${index}`}
              value={option}
              onChange={handleChange}
              className="form-control"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="answer">Correct Answer</label>
          <input
            id="answer"
            name="answer"
            type="text"
            value={formData.answer}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter the correct answer here..."
          />
        </div>
        <button type="submit" className="btn">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
