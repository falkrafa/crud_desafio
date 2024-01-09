import axios from "axios";

export const Register = async (formDataWithFile, navigate) => {
    await axios.post('http://localhost:8080/users', formDataWithFile, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
        console.log('User created successfully');
        navigate('/login');
    }).catch((error) => {
        console.error('Error:', error);
    });
}   