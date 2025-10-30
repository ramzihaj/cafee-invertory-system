import { useState, useEffect, useRef } from 'react';

/**
 * Coffee3D Component - Modèle 3D de tasse de café animée
 * 
 * @param {number} size - Taille du composant en pixels (default: 200)
 * @param {boolean} animate - Active/désactive l'animation de rotation (default: true)
 * @param {string} steamEffect - Type d'effet de vapeur: 'continuous', 'pulse', 'none' (default: 'continuous')
 */
const Coffee3D = ({ 
  size = 200, 
  animate = true,
  steamEffect = 'continuous'
}) => {
  const [rotation, setRotation] = useState({ x: -10, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: isHovered ? -5 : -10,
        y: (prev.y + (isHovered ? 2 : 1)) % 360
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [animate, isHovered]);

  // Styles calculés pour une meilleure organisation
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    perspective: '1200px',
    perspectiveOrigin: '50% 50%'
  };

  const sceneStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.1 : 1})`,
    transition: isHovered ? 'transform 0.3s ease-out' : 'transform 0.05s linear',
    filter: isHovered ? 'drop-shadow(0 20px 40px rgba(139, 69, 19, 0.4))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
  };

  // Configuration de la tasse
  const cupConfig = {
    bodyWidth: '65%',
    bodyHeight: '75%',
    bodyLeft: '17.5%',
    bodyTop: '12%',
    borderRadius: '8% 8% 25% 25%',
    gradient: 'linear-gradient(145deg, #654321 0%, #8B4513 25%, #A0522D 50%, #8B4513 75%, #654321 100%)',
    shadow: 'inset -8px -8px 15px rgba(0,0,0,0.4), inset 8px 8px 15px rgba(255,255,255,0.1), 0 15px 30px rgba(0,0,0,0.4)'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        ref={containerRef}
        className="coffee-3d-container"
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="coffee-scene" style={sceneStyle}>
          
          {/* Soucoupe - Base */}
          <div
            className="saucer"
            style={{
              position: 'absolute',
              width: '90%',
              height: '12%',
              left: '5%',
              bottom: '8%',
              background: 'radial-gradient(ellipse at center, #D2691E 0%, #B8860B 40%, #8B7355 100%)',
              borderRadius: '50%',
              transform: 'translateZ(-40px) rotateX(80deg)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 -3px 8px rgba(0,0,0,0.3)',
              border: '3px solid #8B7355'
            }}
          >
            {/* Détail soucoupe */}
            <div style={{
              position: 'absolute',
              width: '85%',
              height: '85%',
              left: '7.5%',
              top: '7.5%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)',
            }} />
          </div>

          {/* Corps de la tasse */}
          <div
            className="cup-body"
            style={{
              position: 'absolute',
              width: cupConfig.bodyWidth,
              height: cupConfig.bodyHeight,
              left: cupConfig.bodyLeft,
              top: cupConfig.bodyTop,
              background: cupConfig.gradient,
              borderRadius: cupConfig.borderRadius,
              transform: 'translateZ(0)',
              boxShadow: cupConfig.shadow,
              border: '2px solid rgba(101, 67, 33, 0.5)'
            }}
          >
            {/* Reflet sur la tasse */}
            <div style={{
              position: 'absolute',
              width: '30%',
              height: '60%',
              left: '10%',
              top: '15%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              borderRadius: '50% 20% 20% 50%',
              filter: 'blur(1px)'
            }} />

            {/* Bord de la tasse */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '8%',
              top: '0',
              background: 'linear-gradient(to bottom, #A0522D, #8B4513)',
              borderRadius: '50% 50% 0 0',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
            }} />

            {/* Café à l'intérieur */}
            <div
              className="coffee-liquid"
              style={{
                position: 'absolute',
                width: '92%',
                height: '35%',
                left: '4%',
                top: '6%',
                background: 'radial-gradient(ellipse at center, #4A2511 0%, #2F1810 50%, #1a0f0a 100%)',
                borderRadius: '50%',
                boxShadow: '0 3px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Reflet sur le café */}
              <div style={{
                position: 'absolute',
                width: '40%',
                height: '40%',
                left: '30%',
                top: '20%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)',
                borderRadius: '50%'
              }} />

              {/* Vapeur */}
              {steamEffect !== 'none' && (
                <div className="steam-container" style={{ 
                  position: 'absolute', 
                  width: '100%', 
                  top: '-50px',
                  left: '0'
                }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`steam steam-${steamEffect}`}
                      style={{
                        position: 'absolute',
                        left: `${25 + i * 12}%`,
                        width: i % 2 === 0 ? '4px' : '3px',
                        height: '40px',
                        background: `linear-gradient(to top, 
                          rgba(255,255,255,${0.7 - i * 0.1}), 
                          rgba(255,255,255,${0.4 - i * 0.1}) 50%,
                          transparent)`,
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                        animation: steamEffect === 'continuous' 
                          ? `steam ${2.5 + i * 0.4}s ease-in-out infinite`
                          : `steamPulse ${3 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Anse de la tasse */}
          <div
            className="cup-handle"
            style={{
              position: 'absolute',
              width: '35%',
              height: '45%',
              right: '8%',
              top: '28%',
              border: '10px solid transparent',
              borderImage: 'linear-gradient(135deg, #8B4513, #A0522D, #8B4513) 1',
              borderLeft: 'none',
              borderRadius: '0 60% 60% 0',
              transform: 'translateZ(-25px) rotateY(-35deg)',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.4)',
              background: 'linear-gradient(90deg, transparent 0%, rgba(139, 69, 19, 0.1) 100%)'
            }}
          >
            {/* Intérieur de l'anse */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '3px solid rgba(160, 82, 45, 0.5)',
              borderLeft: 'none',
              borderRadius: '0 50% 50% 0',
              left: '8px'
            }} />
          </div>

          {/* Cuillère (optionnelle) */}
          {isHovered && (
            <div
              className="spoon"
              style={{
                position: 'absolute',
                width: '8px',
                height: '80px',
                right: '30%',
                top: '15%',
                background: 'linear-gradient(to bottom, #C0C0C0, #A8A8A8, #C0C0C0)',
                borderRadius: '20px',
                transform: 'translateZ(10px) rotateZ(-20deg)',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                animation: 'spoonAppear 0.3s ease-out'
              }}
            >
              {/* Bout de la cuillère */}
              <div style={{
                position: 'absolute',
                width: '18px',
                height: '25px',
                bottom: '-10px',
                left: '-5px',
                background: 'radial-gradient(ellipse at center, #D3D3D3, #A8A8A8)',
                borderRadius: '50%',
                boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes steam {
          0% {
            opacity: 0.9;
            transform: translateY(0) translateX(0) scaleX(1);
          }
          25% {
            opacity: 0.7;
            transform: translateY(-12px) translateX(3px) scaleX(1.2);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-25px) translateX(-3px) scaleX(1.4);
          }
          75% {
            opacity: 0.3;
            transform: translateY(-35px) translateX(4px) scaleX(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-45px) translateX(0) scaleX(0.8);
          }
        }

        @keyframes steamPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1.3);
          }
        }

        @keyframes spoonAppear {
          0% {
            opacity: 0;
            transform: translateZ(10px) rotateZ(-20deg) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateZ(10px) rotateZ(-20deg) translateY(0);
          }
        }

        .coffee-3d-container {
          cursor: pointer;
          user-select: none;
        }

        .coffee-scene:hover .cup-body {
          animation: cupGlow 2s ease-in-out infinite;
        }

        @keyframes cupGlow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Coffee3D;
