import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MagicPhotoCard = ({ children, glowColor = "251, 113, 133" }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // --- EFECTO 3D Y RESPLANDOR ---
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      el.style.setProperty('--x', `${(x / width) * 100}%`);
      el.style.setProperty('--y', `${(y / height) * 100}%`);
      el.style.setProperty('--opacity', '1');

      gsap.to(el, {
        rotateX: -(y - height / 2) / 15,
        rotateY: (x - width / 2) / 15,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const leave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5 });
      el.style.setProperty('--opacity', '0');
    };

    // --- EFECTO DE PARTÍCULAS AL CLIC ---
    const handleClick = (e) => {
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Crear 12 partículas por clic
      for (let i = 0; i < 12; i++) {
        createParticle(x, y);
      }
    };

    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = "absolute pointer-events-none z-50";
      
      // Estilo de la "estrellita"
      const size = Math.random() * 6 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(${glowColor}, ${Math.random() + 0.5})`;
      particle.style.borderRadius = "50%";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.boxShadow = `0 0 10px rgba(${glowColor}, 0.8)`;

      el.appendChild(particle);

      // Animación de explosión
      const destinationX = (Math.random() - 0.5) * 300;
      const destinationY = (Math.random() - 0.5) * 300;
      const rotation = Math.random() * 720;

      gsap.to(particle, {
        x: destinationX,
        y: destinationY,
        rotation: rotation,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random(),
        ease: "power4.out",
        onComplete: () => particle.remove()
      });
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('click', handleClick);
    };
  }, [glowColor]);

  return (
    <div 
      ref={cardRef} 
      className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-lg transition-shadow cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Capa de resplandor dinámico */}
      <div 
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(${glowColor}, 0.3) 0%, transparent 75%)`,
          opacity: 'var(--opacity, 0)',
          transition: 'opacity 0.3s'
        }}
      />
      {children}
    </div>
  );
};

export default MagicPhotoCard;