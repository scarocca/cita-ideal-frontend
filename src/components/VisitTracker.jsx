import { useEffect } from 'react';

const API_URL = "https://cita-ideal-backend.onrender.com";

const VisitTracker = () => {
  useEffect(() => {
    const recordVisit = async () => {
      // Usamos sessionStorage para que no cuente cada vez que el usuario navega entre páginas, 
      // sino solo una vez por sesión (cuando abre el sitio).
      const hasVisited = sessionStorage.getItem('visted_session');

      if (!hasVisited) {
        try {
          await fetch(`${API_URL}/api/visits/increment`, {
            method: 'POST',
          });
          sessionStorage.setItem('visted_session', 'true');
        } catch (error) {
          console.error("Silent tracker error");
        }
      }
    };

    recordVisit();
  }, []);

  return null; // No muestra nada, es 100% interno
};

export default VisitTracker;