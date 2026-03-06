const API_URL = "https://tucitaideal-api.onrender.com/api/planes";

export const getPlanesActivos = async () => {
  try {
    const response = await fetch(`${API_URL}/activos`); // Ajusta la ruta a tu GetMapping
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    return await response.json();
  } catch (error) {
    console.error("Error al buscar planes:", error);
    return [];
  }
};