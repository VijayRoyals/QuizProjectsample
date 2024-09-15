// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminLogin = () => {
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/admin/login/', formData);
//       console.log('Response:', response.data);
//       // Handle success
//     } catch (error) {
//       console.error('Error:', error.response.data);
//       // Handle error
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <h2 className="admin-login-title">Admin Login</h2>
//       <form onSubmit={handleSubmit} className="admin-login-form">
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
//           <button type="submit" className="btn">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminLogin = () => {
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
//     axios.post('http://localhost:8000/api/admin/login/', formData)
//       .then(response => {
//         console.log('Admin login successful:', response.data);
//         // Handle successful login
//       })
//       .catch(error => {
//         console.error('Error logging in:', error.response.data);
//         // Handle login error
//       });
//   };

//   return (
//     <div className="admin-login-container">
//         <br/>
//       <h2 className="admin-login-title">Admin Login</h2>
//       <br/>
//       <form onSubmit={handleSubmit} className="admin-login-form">
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
//           <button type="submit" className="btn">
//             Login
//           </button>
//         </div>
//       </form>
//       <br/>
//     </div>
//   );
// };

// export default AdminLogin;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation after login

// const AdminLogin = () => {
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
//       // const response = await axios.post('http://localhost:8000/api/adminlogin/', formData);
//       const response = await axios.post('http://localhost:8000/api/token/', formData);
//       const { access, refresh } = response.data;

//       // Store tokens in localStorage or cookies
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);

//       setSuccess('Admin Login successful!');
      
//       navigate('/facultyregister'); // Redirect to profile after successful login
//       console.log('Login successful:', response.data);
//     } catch (error) {
//       setError('Invalid email or password.');
//       console.error('Error during login:', error.response.data);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <br/>
//       <h2 className="admin-login-title">Admin Login</h2>
//       <br/>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <form onSubmit={handleSubmit} className="admin-login-form">
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
//           <a href="/facultyregister" className="forgot-password">
//             Register User
//           </a>
//         </div>
//       </form>
//       <br/>
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
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
  const navigate = useNavigate();

  // Validation patterns
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
      
      if (response && response.data) {
        const { access, refresh, user_type } = response.data;

        console.log('user_type:', user_type);
        console.log('access:', access);
        console.log('refresh:', refresh);

        // Validate user type
        if (user_type !== 'admin') {
          throw new Error('Invalid user type');
        }

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user_type', user_type);

        setSuccess('Login successful!');
        navigate('/adminpanel'); // Redirect to admin dashboard or profile
        console.log('Login successful:', response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="admin-login-container">
      <br />
      <h2 className="admin-login-title">Admin Login</h2>
      <br />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="admin-login-form">
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
          <button type="submit" className="btn-faculty">
            Login
          </button>
          {/* <a href="/adminregister" className="forgot-password">
            Register User
          </a> */}
        </div>
      </form>
      <br />
    </div>
  );
};

export default AdminLogin;
