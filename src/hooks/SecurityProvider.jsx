import { createContext, useContext, useEffect, useReducer } from 'react';
import myApiB from '../myAPIB';

let firstState = {
  player: null, // Renamed from user to player
  hasAccess: false, // Renamed from isAuthenticated to hasAccess
};

const SecurityContext = createContext(); // Renamed from AuthContext to SecurityContext

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        player: action.payload || null, // Renamed user to player
        hasAccess: true, // Renamed isAuthenticated to hasAccess
      };
    case 'logout':
      return {
        ...state,
        player: null, // Renamed user to player
        hasAccess: false, // Renamed isAuthenticated to hasAccess
      };
    default:
      throw new Error('Unknown action type');
  }
}

export default function SecurityProvider({ children }) {
  // Renamed from AuthProvider to SecurityProvider
  const [state, dispatch] = useReducer(reducer, firstState);

  useEffect(() => {
    const storedPlayer = localStorage.getItem('player');
    if (storedPlayer) {
      const parsedPlayer = JSON.parse(storedPlayer);
      dispatch({ type: 'login', payload: parsedPlayer });
    }
  }, []);

  // const login = async (email, password, navigate) => {
  //   async function getData() {
  //     try {
  //       const response = await myApiB.post(
  //         '/player/log-in',
          
  //             {
  //         email: email,
  //         password: password,
  //       });
  //       const response1 = await fetch('http://localhost:3000/banana/player/log-in', {
  //         method: 'POST', // Specify the request method
  //         headers: {
  //           'Content-Type': 'application/json', // Set the content type to JSON
  //         },
  //         body: JSON.stringify({
  //           mail: email,       // Replace `email` with the actual email variable
  //           password: password, // Replace `password` with the actual password variable
  //         }),
  //       });
  //       console.log("Login in tried");
  //       console.log(response, "DADAD")
  //       // localStorage.setItem('token', JSON.stringify(response.data.token));
  //       // localStorage.setItem(
  //       //   'player',
  //       //   JSON.stringify(response.data.data.player),
  //       // ); 
  //       // dispatch({ type: 'login', payload: response.data.data.player });
  //       // navigate('/console');
  //       // return true;
  //     } catch (error) {
  //       console.log("Login in failed");
  //       if (error.response) {
  //         console.error('Error Response:', error.response.data);
  //       } else if (error.request) {
  //         console.error('No Response Received:', error.request);
  //       } else {
  //         console.error('Error Setting Up Request:', error.message);
  //       }
  //       return false;
  //     }
  //   }
  //   getData();
  // };


  const login = async (email, password, navigate) => {
    async function getData() {
      try {
        // Make the request using myApiB (which is now configured with the baseURL)
        const response = await myApiB.post('/player/log-in', { // Make sure the endpoint is correct
          mail: email,
          password: password,
        });
  
        
        console.log(response.data.data.user)
        // Save the token and player data in localStorage if needed
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('player', JSON.stringify(response.data.data.user));
  
        // Update state with the player data 
        dispatch({ type: 'login', payload: response.data.data.user });
  
        // Navigate to the next page
        navigate('/console');
      } catch (error) {
        console.log("Login failed");
        if (error.response) {
          console.error('Error Response:', error.response.data);
        } else if (error.request) {
          console.error('No Response Received:', error.request);
        } else {
          console.error('Error Setting Up Request:', error.message);
        }
        return false;
      }
    }
    getData();
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player'); // Renamed from user to player
    dispatch({ type: 'logout' });
  };

  const register = async (fullName, email, password, navigate) => {
    
    try {
      const response = await myApiB.post('/player/register', {
        name: fullName,
        mail: email,
        password: password,
      });

      console.log(response.data.data.user, 'THIS IS TOKEN BABY'); // Renamed user to player

      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert('Error Response:', error.response.data);
      } else if (error.request) {
        alert('No Response Received:', error.request);
      } else {
        alert('Error Setting Up Request:', error.message);
      }
    }
  };

  return (
    <SecurityContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  // Renamed useAuth to useSecurity
  const context = useContext(SecurityContext); // Renamed from AuthContext to SecurityContext
  if (!context)
    throw new Error('useSecurity must be used within a SecurityProvider.');
  return context;
}
