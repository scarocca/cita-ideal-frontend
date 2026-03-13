import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatValentin = ({ onClose }) => {
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const scrollRef = useRef(null);

  const API_URL = "https://cita-ideal-backend.onrender.com/api/chat/preguntar";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historial, cargando]);

  // FUNCIÓN ACTUALIZADA: Detecta enlaces y aplica estilo de WhatsApp si corresponde
  const renderizarTextoConEnlaces = (texto) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return texto.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        const esWhatsApp = part.includes("wa.me") || part.includes("whatsapp.com");
        
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`block mt-3 border text-center py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              esWhatsApp 
              ? "bg-[#25D366] border-[#128C7E] text-white hover:bg-[#128C7E] hover:scale-[1.02]" 
              : "bg-white/20 border-white/40 text-rose-900 hover:bg-white/30"
            }`}
          >
            {esWhatsApp && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.97c0 2.112.551 4.175 1.595 5.978L0 24l6.193-1.625c1.734.945 3.694 1.443 5.688 1.443h.005c6.605 0 11.967-5.363 11.97-11.97a11.85 11.85 0 00-3.451-8.471" />
              </svg>
            )}
            {esWhatsApp ? "Contactar por WhatsApp" : "Ver enlace"}
          </a>
        );
      }
      return part;
    });
  };

  const enviarDuda = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || cargando) return;

    const textoUsuario = mensaje;
    setHistorial(h => [...h, { rol: "user", texto: textoUsuario }]);
    setMensaje("");
    setCargando(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: textoUsuario
      });

      if (!response.ok) throw new Error("Servicio no disponible");

      const data = await response.text();
      setHistorial(h => [...h, { rol: "valentin", texto: data }]);
      
    } catch (error) {
      console.error("Valentín Error:", error);
      // Link de WhatsApp con el número real para el caso de error
      setHistorial(h => [...h, { 
        rol: "valentin", 
        texto: "¡Hola! En este momento no puedo procesar tu solicitud. Por favor, contáctanos directamente por WhatsApp para ayudarte: https://wa.me/56912345678" 
      }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0, scale: 0.9, transformOrigin: 'bottom right' }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.9 }}
      className="w-[350px] h-[500px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-rose-100"
    >
      {/* CABECERA */}
      <div className="p-5 bg-rose-600 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          <div>
            <span className="font-bold text-[11px] tracking-[0.2em] uppercase block leading-none">Valentín IA</span>
            <span className="text-[9px] opacity-70 uppercase tracking-tighter">Asistente Romántico</span>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* CUERPO - CHAT */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-rose-50/50 to-white"
      >
        <div className="bg-white border border-rose-100 p-3 rounded-2xl rounded-tl-none text-[12px] text-rose-900 shadow-sm leading-relaxed font-medium">
          ¡Hola soy Valentín. Estoy aquí para ayudarte a crear la cita perfecta. ¿Tienes alguna duda? 💖
        </div>

        {historial.map((h, i) => (
          <div key={i} className={`flex ${h.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 max-w-[85%] text-[12px] shadow-sm leading-relaxed ${
              h.rol === 'user' 
              ? 'bg-rose-600 text-white rounded-2xl rounded-tr-none shadow-rose-200' 
              : 'bg-white text-gray-800 border border-rose-100 rounded-2xl rounded-tl-none shadow-rose-50'
            }`}>
              {renderizarTextoConEnlaces(h.texto)}
            </div>
          </div>
        ))}
        
        {cargando && (
          <div className="flex gap-1 items-center p-2">
            <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      {/* PIE - INPUT */}
      <form onSubmit={enviarDuda} className="p-4 bg-white border-t border-rose-50 flex gap-2 items-center">
        <input 
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-grow bg-gray-50 border border-rose-100 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-200 text-rose-900 placeholder:text-rose-300 transition-all shadow-inner"
        />
        <button 
          type="submit"
          disabled={!mensaje.trim() || cargando}
          className="bg-rose-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-700 disabled:bg-rose-200 transition-all shadow-lg active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </motion.div>
  );
};

export default ChatValentin;