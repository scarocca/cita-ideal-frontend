import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificamos si existe el usuario en el almacenamiento local
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Si no hay usuario, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, permitir ver el contenido (Dashboard)
  return children;
};

export default ProtectedRoute;