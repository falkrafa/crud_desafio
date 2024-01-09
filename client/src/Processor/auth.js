import { setLoggedIn, setUser } from '../reducers/authReducer.js';
import axios from 'axios';
export const auth = async(values, dispatch, navigate) => {

  await axios.post('http://localhost:8080/users/login', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response)=>{
    console.log('Login successful');
    dispatch(setLoggedIn(true));
    dispatch(setUser(response.data.user));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
    navigate('/');
  })
}