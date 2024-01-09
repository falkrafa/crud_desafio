import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Register } from '../../Processor/Register';

const RegisterContainer = () => {
    const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    profilePicture: Yup.mixed().required('Profile picture is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      profilePicture: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });

        const formDataWithFile = new FormData();
        formDataWithFile.append('name', values.name);
        formDataWithFile.append('email', values.email);
        formDataWithFile.append('password', values.password);
        formDataWithFile.append('profilePicture', values.profilePicture);

        console.log('Form data with file:', formDataWithFile);
        await Register(formDataWithFile, navigate);
      } catch (error) {
        console.error('Validation Error:', error.errors);
      }
    },
  });
  return { formik };
};

export default RegisterContainer;