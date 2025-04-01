import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please fill the Name'),
    email: Yup.string().email('Invalid email').required('Please fill the Email'),
    password: Yup.string().required('Please fill the Password'),
});
