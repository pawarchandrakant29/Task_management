// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, role, ...rest }) => {
//   const userRole = localStorage.getItem('role'); // Get role from localStorage
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // If no token, redirect to login
//     return <Navigate to="/login" />;
//   }

//   if (userRole !== role) {
//     // If the user role doesn't match the required role, redirect accordingly
//     return <Navigate to="/" />;
//   }

//   // If everything is fine, render the component
//   return <Element {...rest} />;
// };

// export default PrivateRoute;
