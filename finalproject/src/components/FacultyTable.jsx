// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, TextField
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
 
// const FacultyTable = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuizSlug, setEditingQuizSlug] = useState(null);
//   const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
//   const [editedValue, setEditedValue] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/quizzes/');
//       setQuizzes(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//       setError('Failed to fetch quizzes. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const handleDeleteQuestion = async (quizSlug, questionIndex) => {
//     try {
//       const quiz = quizzes.find(quiz => quiz.slug === quizSlug);
//       quiz.questions.splice(questionIndex, 1); // Remove the question from the array

//       await axios.put(`http://localhost:8000/api/quizzes/${quizSlug}/`, quiz);
//       fetchQuizzes(); // Refresh data after deletion
//     } catch (error) {
//       console.error('Error deleting question:', error);
//       setError('Failed to delete the question. Please try again.');
//     }
//   };

//   const handleEdit = (quizSlug, questionIndex, currentQuestion) => {
//     setEditingQuizSlug(quizSlug);
//     setEditingQuestionIndex(questionIndex);
//     setEditedValue(currentQuestion);
//   };

//   const handleSaveEdit = async (quizSlug, questionIndex) => {
//     try {
//       const quiz = quizzes.find(quiz => quiz.slug === quizSlug);
//       quiz.questions[questionIndex].question = editedValue; // Update the specific question

//       await axios.put(`http://localhost:8000/api/quizzes/${quizSlug}/`, quiz);
//       fetchQuizzes(); // Refresh data after edit
//       setEditingQuizSlug(null);
//       setEditingQuestionIndex(null);
//     } catch (error) {
//       console.error('Error updating question:', error);
//       setError('Failed to update the question. Please try again.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="quiz-question-table-container" style={{
//       fontFamily: 'Rubik, Arial, Helvetica, sans-serif',
//       padding: '20px',
//       backgroundColor: 'var(--prue-white-color)',
//       color: 'var(--dark-navy-color)',
//       borderRadius: '24px', // Add border-radius to the whole form
//       overflow: 'hidden' // Ensures content respects the border-radius
//     }}>
//         <br/>
//       <h2 style={{ fontSize: '36px', fontWeight: 500 }}>&nbsp;&nbsp;Manage Faculty</h2><br/><br/>
//       {error && <p style={{ color: 'var(--red-color)', fontSize: '14px' }}>{error}</p>}
//       <TableContainer component={Paper} style={{
//         backgroundColor: 'var(--prue-white-color)',
//         borderRadius: '24px',
//         boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)',
//       }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Quiz Title</TableCell>
//               <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Question</TableCell>
//               <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Options</TableCell>
//               <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Answer</TableCell>
//               <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {quizzes.length > 0 ? (
//               quizzes.map((quiz) => (
//                 quiz.questions.map((question, index) => (
//                   <TableRow key={`${quiz.slug}-${index}`}>
//                     <TableCell>{quiz.title}</TableCell>
//                     <TableCell>
//                       {editingQuizSlug === quiz.slug && editingQuestionIndex === index ? (
//                         <TextField
//                           value={editedValue}
//                           onChange={(e) => setEditedValue(e.target.value)}
//                           sx={{
//                             '& .MuiInputBase-input': {
//                               color: 'var(--dark-navy-color)',
//                               backgroundColor: 'var(--prue-white-color)',
//                             },
//                             '& .MuiInputBase-root': {
//                               border: '1px solid var(--gray-navy-color)',
//                               borderRadius: '8px',
//                             },
//                             '& .MuiInputBase-input:focus': {
//                               borderColor: 'var(--purple-color)',
//                               boxShadow: '0 0 0 2px rgba(167, 41, 245, 0.5)',
//                             }
//                           }}
//                         />
//                       ) : (
//                         question.question
//                       )}
//                     </TableCell>
//                     <TableCell>{question.options.join(', ')}</TableCell>
//                     <TableCell>{question.answer}</TableCell>
//                     <TableCell>
//                       {editingQuizSlug === quiz.slug && editingQuestionIndex === index ? (
//                         <Button
//                           onClick={() => handleSaveEdit(quiz.slug, index)}
//                           style={{
//                             backgroundColor: 'var(--purple-color)',
//                             color: 'var(--prue-white-color)',
//                             borderRadius: '24px',
//                             padding: '12px 20px',
//                             fontSize: '18px',
//                             fontWeight: 500,
//                             textTransform: 'capitalize',
//                             marginRight: '8px', // Add margin-right to separate Save button from Delete button
//                           }}
//                           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(167, 41, 245, 0.5)'}
//                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--purple-color)'}
//                         >
//                           Save
//                         </Button>
//                       ) : (
//                         <>
//                           <IconButton
//                             onClick={() => handleEdit(quiz.slug, index, question.question)}
//                             aria-label="edit"
//                             sx={{
//                               color: 'var(--purple-color)',
//                               marginRight: '5px', // Add margin-right to separate Edit button from Delete button
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleDeleteQuestion(quiz.slug, index)}
//                             aria-label="delete"
//                             sx={{
//                               color: 'var(--red-color)',
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} style={{ textAlign: 'center' }}>No quizzes available</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default FacultyTable;



// import React from 'react';
// import { useFetch } from '../hooks/useFetch';
// // import './FacultyTable.css'; // Ensure this file exists for styling

// const FacultyTable = () => {
//   const { data: faculties, isPending, error } = useFetch('http://localhost:8000/api/faculties/');

//   return (
//     <div className="faculty-table-container">
//       <h2>Faculty List</h2>
//       {isPending && <p>Loading...</p>}
//       {error && <p className="error">Error: {error}</p>}
//       {faculties && faculties.length === 0 && !isPending && !error && <p>No faculty members found.</p>}
//       {faculties && faculties.length > 0 && (
//         <table className="faculty-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Contact</th>
//             </tr>
//           </thead>
//           <tbody>
//             {faculties.map(faculty => (
//               <tr key={faculty.id}>
//                 <td>{faculty.id}</td>
//                 <td>{faculty.name}</td>
//                 <td>{faculty.email}</td>
//                 <td>{faculty.contact}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FacultyTable;



// import React, { useState } from 'react';
// import { useFetch } from '../hooks/useFetch';
// import axios from 'axios';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// const FacultyTable = () => {
//   const { data: faculties = [], isPending, error, refetch } = useFetch('http://localhost:8000/api/faculties/');
//   const [isEditing, setIsEditing] = useState(null);
//   const [updatedFaculty, setUpdatedFaculty] = useState({ name: '', email: '', contact: '' });

//   const handleEdit = (faculty) => {
//     setIsEditing(faculty.id);
//     setUpdatedFaculty({ name: faculty.name, email: faculty.email, contact: faculty.contact });
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm('Are you sure you want to delete this faculty?');
//     if (confirmed) {
//       try {
//         await axios.delete(`http://localhost:8000/api/api/faculties/${id}/`, {
//           headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
//         });
//         alert('Faculty deleted successfully!');
//         refetch(); // Refresh the list of faculties
//       } catch (error) {
//         console.error('Error deleting faculty:', error.response ? error.response.data : error.message);
//         alert('Failed to delete faculty.');
//       }
//     }
//   };

//   const handleUpdate = async (id) => {
//     const confirmed = window.confirm('Are you sure you want to update this faculty?');
//     if (confirmed) {
//       try {
//         await axios.put(`http://localhost:8000/api/api/faculties/${id}/`, updatedFaculty, {
//           headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
//         });
//         alert('Faculty updated successfully!');
//         setIsEditing(null);
//         refetch(); // Refresh the list of faculties
//       } 
//       catch (error) {
//         console.error('Error updating faculty:', error.response ? error.response.data : error.message);
//         // alert('Failed to update faculty.');
        
//       }
//     }
//   };

//   return (
//     <div className="faculty-table-container">
//       <h2>Faculty List</h2>
//       {isPending && <p>Loading...</p>}
//       {/* {error && <p className="error">Error: {error}</p>} */}
//       {Array.isArray(faculties) && faculties.length > 0 ? (
//         <table className="faculty-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Contact</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {faculties.map(faculty => (
//               <tr key={faculty.id}>
//                 <td>{faculty.id}</td>
//                 <td>
//                   {isEditing === faculty.id ? (
//                     <input
//                       type="text"
//                       value={updatedFaculty.name}
//                       onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, name: e.target.value })}
//                     />
//                   ) : (
//                     faculty.name
//                   )}
//                 </td>
//                 <td>
//                   {isEditing === faculty.id ? (
//                     <input
//                       type="text"
//                       value={updatedFaculty.email}
//                       onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, email: e.target.value })}
//                     />
//                   ) : (
//                     faculty.email
//                   )}
//                 </td>
//                 <td>
//                   {isEditing === faculty.id ? (
//                     <input
//                       type="text"
//                       value={updatedFaculty.contact}
//                       onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, contact: e.target.value })}
//                     />
//                   ) : (
//                     faculty.contact
//                   )}
//                 </td>
//                 <td>
//                   {isEditing === faculty.id ? (
//                     <>
//                       <button onClick={() => handleUpdate(faculty.id)}>Save</button>
//                       <button onClick={() => setIsEditing(null)}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => handleEdit(faculty)}>Edit</button>
//                       <button onClick={() => handleDelete(faculty.id)}>Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No faculties found.</p>
//       )}
//     </div>
//   );
// };

// export default FacultyTable;






import React, { useState ,useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const FacultyTable = () => {
  const [url, setUrl] = useState('http://localhost:8000/api/faculties/');
  const { data: faculties = [], isPending, error, refetch } = useFetch(url);;
  const [isEditing, setIsEditing] = useState(null);
  const [updatedFaculty, setUpdatedFaculty] = useState({ name: '', email: '', contact: '' });


  useEffect(() => {
    // Set a timeout to update the URL after 500ms
    const timer = setTimeout(() => {
      setUrl('http://localhost:8000/api/faculties/');
    }, 500);

    // Clear timeout if the component unmounts or URL changes
    return () => clearTimeout(timer);
  }, []);
    

  const handleEdit = (faculty) => {
    setIsEditing(faculty.id);
    setUpdatedFaculty({ name: faculty.name, email: faculty.email, contact: faculty.contact });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this faculty?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/api/faculties/${id}/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        alert('Faculty deleted successfully!');
        refetch(); // Refresh the list of faculties
      } catch (error) {
        console.error('Error deleting faculty:', error.response ? error.response.data : error.message);
        alert('Failed to delete faculty.');
      }
    }
  };

  const handleUpdate = async (id) => {
    const confirmed = window.confirm('Are you sure you want to update this faculty?');
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8000/api/api/faculties/${id}/`, updatedFaculty, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        alert('Faculty updated successfully!');
        setIsEditing(null);
        refetch(); // Refresh the list of faculties
      } catch (error) {
        console.error('Error updating faculty:', error.response ? error.response.data : error.message);
        alert('Failed to update faculty.');
      }
    }
  };

  return (
    <div className="faculty-table-container">
      <br/>
      <h2>Faculty List</h2>
      <br/>
      {isPending && <p>Loading...</p>}
      {/* {error && <p className="error">Error: {error}</p>} */}
      {Array.isArray(faculties) && faculties.length > 0 ? (
        <table className="faculty-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(faculty => (
              <tr key={faculty.id}>
                <td>{faculty.id}</td>
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.name}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, name: e.target.value })}
                    />
                  ) : (
                    faculty.name
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.email}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, email: e.target.value })}
                    />
                  ) : (
                    faculty.email
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.contact}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, contact: e.target.value })}
                    />
                  ) : (
                    faculty.contact
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <>
                      <IconButton onClick={() => handleUpdate(faculty.id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setIsEditing(null)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(faculty)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(faculty.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </>
                  )}
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No faculties found.</p>
      )}
      <br/>
    </div>

  );
};

export default FacultyTable;
