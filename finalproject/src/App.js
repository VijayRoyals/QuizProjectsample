// import logo from './logo.svg';
// import './App.css';

// import StudentProfile from './components/StudentProfile';
// import QuestionForm from './components/QuestionForm';

// // react router dom imports
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // pages
// import Quiz from "./pages/Quiz";
// import Home from "./pages/Home";
// import ErrorPage from "./pages/ErrorPage";

// // layouts
// import MainLayout from "./layout/MainLayout";
// import AddQuestions from "./components/QuestionForm";
// import StudentLogin from "./components/StudentLogin";
// import FacultyLogin from "./components/FacultyLogin";
// import AdminLogin from "./components/AdminLogin";
// import StudentRegister from "./components/StudentRegister";
// import FacultyRegister from './components/FacultyRegister';
// import AddVoucher from "./components/AddVoucher";
// import QuizQuestionTable from "./components/QuizQuestionTable";
// import FirstPage from './components/Firstpage';
// import AdminPanel from './components/AdminPanel';
// import FacultyPanel from './components/FacultyPanel';
// import MenuLinks from './components/MenuLinks';
// import EnterVoucher from './components/EnterVoucher';
// import FacultyTable from './components/FacultyTable';
// import VoucherList from './components/VoucherList';
// import QuestionTable from './components/QuestionTable';


// function App() {
//   const router = createBrowserRouter([
//     {path: "/",element: <MainLayout />,errorElement: <ErrorPage />,
//       children: [
//         {index: true,element: <FirstPage/>,},
//         // {path: "/home",element: <Home/>,},
//         {path: "/home",element: <MenuLinks/>,},
//         {path: "/quiz/:slug",element: <Quiz />,},
//         {path: "/addquestions",element: <AddQuestions />,},
//         {path: "/adminlogin",element: <AdminLogin />,},
//         {path: "/facultylogin",element: <FacultyLogin />,},
//         {path: "/studentlogin",element: <StudentLogin />,},
//         {path: "/studentregister",element: <StudentRegister/>,},
//         {path: "/facultyregister",element: <FacultyRegister/>,}, 
//         {path: "/entervoucher",element: <EnterVoucher/>,},
//         {path: "/facultypanel",element: <FacultyPanel/>,},
//         {path: "/adminpanel",element: <AdminPanel/>,},
//         {path: "/addvoucher",element: <AddVoucher/>,},
//         {path: "/quizquestiontable",element: <QuizQuestionTable/>,},
//         {path: "/facultytable",element: <FacultyTable/>,},
//         {path: "/voucherlist",element: <VoucherList/>,},
//         // {path: "/questiontable",element: <QuestionTable quizSlug={someValidQuizSlug} />,},
//         {path: "/questiontable",element: <QuestionTable />,},
//       ],
//     },
//   ]);

//   return < RouterProvider router={router} />;
// }
// export default App;







// import React, { useState, useEffect } from 'react';
// // import './logo.svg';
// import './App.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import axios from 'axios';

// // Import pages and components
// import MainLayout from './layout/MainLayout';
// import ErrorPage from './pages/ErrorPage';
// import FirstPage from './components/Firstpage';
// import MenuLinks from './components/MenuLinks';
// import Quiz from './pages/Quiz';
// import AddQuestions from './components/QuestionForm';
// import AdminLogin from './components/AdminLogin';
// import FacultyLogin from './components/FacultyLogin';
// import StudentLogin from './components/StudentLogin';
// import StudentRegister from './components/StudentRegister';
// import FacultyRegister from './components/FacultyRegister';
// import EnterVoucher from './components/EnterVoucher';
// import FacultyPanel from './components/FacultyPanel';
// import AdminPanel from './components/AdminPanel';
// import AddVoucher from './components/AddVoucher';
// import FacultyTable from './components/FacultyTable';
// import VoucherList from './components/VoucherList';
// import QuestionTable from './components/QuestionTable';
// import ShowResult from './components/ShowResult';
// import ScoreCardTable from './components/ScoreCardTable';
// import ScoreCardList from './components/ScoreCardList';

// const App = () => {


//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <MainLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         { index: true, element: <FirstPage /> },
//         { path: "/home", element: <MenuLinks /> },
//         { path: "/quiz/:slug", element: <Quiz /> },
//         { path: "/addquestions", element: <AddQuestions /> },
//         { path: "/adminlogin", element: <AdminLogin /> },
//         { path: "/facultylogin", element: <FacultyLogin /> },
//         { path: "/studentlogin", element: <StudentLogin /> },
//         { path: "/studentregister", element: <StudentRegister /> },
//         { path: "/facultyregister", element: <FacultyRegister /> },
//         { path: "/entervoucher", element: <EnterVoucher /> },
//         { path: "/facultypanel", element: <FacultyPanel /> },
//         { path: "/adminpanel", element: <AdminPanel /> },
//         { path: "/addvoucher", element: <AddVoucher /> },
//         { path: "/facultytable", element: <FacultyTable /> },
//         { path: "/voucherlist", element: <VoucherList /> },
//         { path: "/questiontable/:slug", element: <QuestionTable /> },
//         { path: "/showresult/:slug", element: <ShowResult /> },
//         { path: "/scorecardtable", element: <ScoreCardTable /> },
//         { path: "/scorecardlist", element: <ScoreCardList /> },

//       ],
//     },
//   ]);
//   return < RouterProvider router={router} />;

// };

// export default App;






// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import pages and components

import MainLayout from './layout/MainLayout';
import ErrorPage from './pages/ErrorPage';
import FirstPage from './components/Firstpage';
import MenuLinks from './components/MenuLinks';
import Quiz from './pages/Quiz';
import AddQuestions from './components/QuestionForm';
import AdminLogin from './components/AdminLogin';
import FacultyLogin from './components/FacultyLogin';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import FacultyRegister from './components/FacultyRegister';
import EnterVoucher from './components/EnterVoucher';
import FacultyPanel from './components/FacultyPanel';
import AdminPanel from './components/AdminPanel';
import AddVoucher from './components/AddVoucher';
import FacultyTable from './components/FacultyTable';
import VoucherList from './components/VoucherList';
import QuestionTable from './components/QuestionTable';
import ShowResult from './components/ShowResult';
import ScoreCardTable from './components/ScoreCardTable';
import ScoreCardList from './components/ScoreCardList';
import ProtectedRoute from './router/ProtectedRoute'; // Import the protected route component


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <FirstPage /> },

        // Public routes
        { path: "/studentlogin", element: <StudentLogin /> },
        { path: "/adminlogin", element: <AdminLogin /> },
        { path: "/facultylogin", element: <FacultyLogin /> },
        { path: "/studentregister", element: <StudentRegister /> },


        // Protected routes
        {
          element: <ProtectedRoute />, // Wrap protected routes with ProtectedRoute
          children: [

            // student protected routes

            { path: "/entervoucher", element: <EnterVoucher /> },
            { path: "/home", element: <MenuLinks /> },
            { path: "/quiz/:slug", element: <Quiz /> },
            { path: "/showresult/:slug", element: <ShowResult /> },

            // faculty protected route

            { path: "/facultypanel", element: <FacultyPanel /> },


            // admin protected routes 

            { path: "/adminpanel", element: <AdminPanel /> },
            { path: "/facultyregister", element: <FacultyRegister /> },
            { path: "/scorecardtable", element: <ScoreCardTable /> },
            { path: "/scorecardlist", element: <ScoreCardList /> },
            { path: "/addvoucher", element: <AddVoucher /> },
            { path: "/facultytable", element: <FacultyTable /> },
            { path: "/voucherlist", element: <VoucherList /> },
            { path: "/addquestions", element: <AddQuestions /> },
            { path: "/questiontable/:slug", element: <QuestionTable /> },
            { path: "/showresult/:slug", element: <ShowResult /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;



//         { path: "/addquestions", element: <AddQuestions /> },
//         { path: "/facultyregister", element: <FacultyRegister /> },
//         { path: "/entervoucher", element: <EnterVoucher /> },
//         { path: "/facultypanel", element: <FacultyPanel /> },
//         { path: "/adminpanel", element: <AdminPanel /> },
//         { path: "/addvoucher", element: <AddVoucher /> },
//         { path: "/facultytable", element: <FacultyTable /> },
//         { path: "/voucherlist", element: <VoucherList /> },
//         { path: "/questiontable/:slug", element: <QuestionTable /> },
//         { path: "/showresult/:slug", element: <ShowResult /> },
//         { path: "/scorecardtable", element: <ScoreCardTable /> },
//         { path: "/scorecardlist", element: <ScoreCardList /> },