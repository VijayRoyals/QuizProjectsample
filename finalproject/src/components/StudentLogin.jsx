// import React, { useState } from 'react';
// // import './StudentLogin.css'; // Ensure this path is correct

// const StudentLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Add form submission logic here
//   };

//   return (
//     <div className="student-login-container">
//     <br/>
//       <h2 className="student-login-title">Student Login</h2>
//       <br/>
//       <form onSubmit={handleSubmit} className="student-login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <div className="form-footer">
//           <button type="submit" className="btn-student">
//             Login
//           </button>
//           <a href="#forgot-password" className="forgot-password">
//             Register user 
//           </a>
//         </div>
//       </form>
//       <br/>
//     </div>
//   );
// };

// export default StudentLogin;




// working fine


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation after login

// const StudentLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate(); // Initialize navigation

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post('http://localhost:8000/api/studentlogin/', formData);
      
//       const response = await axios.post('http://localhost:8000/api/token/', formData);
//       // const response = await axios.post('http://localhost:8000/login/student/', formData);
//       const { access, refresh } = response.data;

//       // Store tokens in localStorage or cookies
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);

//       setSuccess('Student Login successful!');
//       navigate('/'); // Redirect to profile after successful login
//       console.log('Login successful:', response.data);
//     } catch (error) {
//       setError('Invalid email or password.');
//       console.error('Error during login:', error.response.data);
//     }
//   };

//   return (
//     <div className="student-login-container">
//       <br/>
//       <h2 className="student-login-title">Student Login</h2>
//       <br/>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <form onSubmit={handleSubmit} className="student-login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <div className="form-footer">
//           <button type="submit" className="btn-student">
//             Login
//           </button>
//           <a href="/studentregister" className="forgot-password">
//             Register User
//           </a>
//         </div>
//       </form>
//       <br/>
//     </div>
//   );
// };

// export default StudentLogin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation after login

// const StudentLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate(); // Initialize navigation

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/token/', formData);

//       const { access, refresh } = response.data;

//       // Store tokens in localStorage or cookies
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);

//       setSuccess('Login successful!');
//       navigate('/'); // Redirect to profile after successful login
//       console.log('Login successful:', response.data);
//     } catch (error) {
//       setError('Invalid email or password.');
//       console.error('Error during login:', error.response.data);
//     }
//   };

//   return (
//     <div className="student-login-container">
//       <br />
//       <h2 className="student-login-title">Student Login</h2>
//       <br />
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <form onSubmit={handleSubmit} className="student-login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <div className="form-footer">
//           <button type="submit" className="btn-student">
//             Login
//           </button>
//           <a href="/studentregister" className="forgot-password">
//             Register User
//           </a>
//         </div>
//       </form>
//       <br />
//     </div>
//   );
// };

// export default StudentLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,15}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear individual error when user types
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    let errors = {
      email: '',
      password: '',
    };

    // Validate inputs
    if (!emailPattern.test(formData.email)) {
      errors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!passwordPattern.test(formData.password)) {
      errors.password = 'Password must be 3-15 characters long, with at least one uppercase letter, one number, and one special character.';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/token/', formData);
      const { access, refresh, user_type, name, user_id } = response.data;

      console.log('type:', user_type);
      console.log('access:', access);
      console.log('refresh:', refresh);
      console.log('name:', name);

      // Validate user type
      if (user_type !== 'student') {
        throw new Error('Invalid user type');
      }

      // Store tokens in localStorage or cookies
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('name', name);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user_type', user_type);

      setSuccess('Login successful!');
      navigate('/entervoucher'); // Redirect to profile after successful login
      console.log('Login successful:', response.data);
    } catch (error) {
      setError('Invalid email, password, or user type.');
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="student-login-container">
      <br />
      <h2 className="student-login-title">Student Login</h2>
      <br />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="student-login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
          {formErrors.password && <p className="error-message">{formErrors.password}</p>}
        </div>
        <div className="form-footer">
          <button type="submit" className="btn-student">
            Login
          </button>
          <a href="/studentregister" className="forgot-password">
            Register User
          </a>
        </div>
      </form>
      <br />
    </div>
  );
};

export default StudentLogin;
