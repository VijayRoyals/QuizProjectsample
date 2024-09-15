// import { useEffect, useState } from "react";

// export function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//   const controller = new AbortController(); // new code // Initialize AbortController
//   const signal = controller.signal; // new code

//   if (!url) return;
  
//     const fetchData = async () => {
//       setIsPending(true);
//       try {
//         // const req = await fetch(url);  //old code 
//         const req = await fetch(url, { signal }); // new code
//         console.log(req);
//         if (!req.ok) {
//           // throw new Error(req.statusText); // old code
//           throw new Error(req.statusText || "Unknown error occurred");
//         }
//         const data = await req.json();
//         setData(data);
//         setIsPending(false);

//       } catch (err) {
        
//         setError(err.message);
//         console.log(err.message);
//         setIsPending(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   return { data, isPending, error };

// }



import { useEffect, useState } from "react";
import axios from "axios";

// Function to refresh access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    return null;
  }
};

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Initialize AbortController
    const signal = controller.signal; // Reference signal for aborting fetch

    if (!url) return;

    const fetchData = async () => {
      setIsPending(true);
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          signal,
        });

        if (!response.ok) {
          if (response.status === 401 && refreshToken) {
            // Token might be expired; try to refresh it
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
              // Retry the request with the new token
              response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${newAccessToken}`,
                  'Content-Type': 'application/json',
                },
                signal,
              });
            } else {
              throw new Error('Unable to refresh access token.');
            }
          } else {
            throw new Error(response.statusText || "Unknown error occurred");
          }
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup on component unmount
    };
  }, [url]);

  return { data, isPending, error };
}




// // src/hooks/useFetch.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// // Function to refresh access token
// const refreshAccessToken = async (refreshToken) => {
//   try {
//     const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
//     const { access } = response.data;
//     localStorage.setItem('accessToken', access);
//     return access;
//   } catch (error) {
//     console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
//     return null;
//   }
// };

// export function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController(); // Initialize AbortController
//     const signal = controller.signal; // Reference signal for aborting fetch

//     if (!url) return;

//     const fetchData = async () => {
//       setIsPending(true);
//       const accessToken = localStorage.getItem('accessToken');
//       const refreshToken = localStorage.getItem('refreshToken');

//       try {
//         let response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//           signal,
//         });

//         if (!response.ok) {
//           if (response.status === 401 && refreshToken) {
//             // Token might be expired; try to refresh it
//             const newAccessToken = await refreshAccessToken(refreshToken);
//             if (newAccessToken) {
//               // Retry the request with the new token
//               response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                   'Authorization': `Bearer ${newAccessToken}`,
//                   'Content-Type': 'application/json',
//                 },
//                 signal,
//               });
//             } else {
//               throw new Error('Unable to refresh access token.');
//             }
//           } else {
//             throw new Error(response.statusText || "Unknown error occurred");
//           }
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch error:', err.message);
//       } finally {
//         setIsPending(false);
//       }
//     };

//     fetchData();

//     return () => {
//       controller.abort(); // Cleanup on component unmount
//     };
//   }, [url]);

//   return { data, isPending, error };
// }
