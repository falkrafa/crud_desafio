import { setLoggedIn, setUser } from '../reducers/authReducer.js';

export const auth = async(values, dispatch, navigate) => {
    const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful');
          dispatch(setLoggedIn(true));
          dispatch(setUser(data.user));
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          console.error('Login failed', data.message);
        }
}