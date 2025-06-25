// import React, { useEffect, useState } from 'react';

// function MaintenancePopup() {
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopup(true);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!showPopup) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: '20%',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       backgroundColor: '#fff',
//       color: '#333',
//       padding: '20px',
//       border: '2px solid #444',
//       borderRadius: '10px',
//       zIndex: 9999,
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
//       maxWidth: '400px',
//       textAlign: 'center'
//     }}>
//       <strong>This website is currently under construction due to migration of databases. <br/><br/>
        
//         <strong></strong><a
//   href="https://github.com/SamOBrienOlinger/spoodle-space-pp5/blob/main/README.md"
//   target="_blank"
//   rel="noopener noreferrer"
//   style={{ color: "purple", fontWeight: "bold", textDecoration: "underline" }}
// >
//   Click Here!
// </a> to find out about all of SpoodleSpace's functionalites and features </strong><br/><br/>
//  See again soon!<br /><br />
//       <button onClick={() => setShowPopup(false)} style={{
//         padding: '8px 12px',
//         backgroundColor: '#444',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer'
//       }}>
//         Close
//       </button>
//     </div>
//   );
// }

// export default MaintenancePopup;
