import React from 'react';

const Snowfall: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <style>{`
        .snowflake {
          position: absolute;
          top: -10%;
          color: white;
          font-size: 1.5em;
          opacity: 0.8;
          animation: fall linear infinite;
          user-select: none;
        }
        
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }
        
        .snowflake:nth-child(1) { left: 10%; animation-duration: 10s; animation-delay: 0s; }
        .snowflake:nth-child(2) { left: 20%; animation-duration: 12s; animation-delay: 2s; }
        .snowflake:nth-child(3) { left: 30%; animation-duration: 8s; animation-delay: 4s; }
        .snowflake:nth-child(4) { left: 40%; animation-duration: 14s; animation-delay: 1s; }
        .snowflake:nth-child(5) { left: 50%; animation-duration: 11s; animation-delay: 3s; }
        .snowflake:nth-child(6) { left: 60%; animation-duration: 9s; animation-delay: 5s; }
        .snowflake:nth-child(7) { left: 70%; animation-duration: 13s; animation-delay: 0.5s; }
        .snowflake:nth-child(8) { left: 80%; animation-duration: 10s; animation-delay: 2.5s; }
        .snowflake:nth-child(9) { left: 90%; animation-duration: 12s; animation-delay: 1.5s; }
        .snowflake:nth-child(10) { left: 15%; animation-duration: 11s; animation-delay: 4.5s; }
      `}</style>
    </div>
  );
};

export default Snowfall;
