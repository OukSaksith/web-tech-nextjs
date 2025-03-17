'use client';
import { Backend_URL } from '@/lib/Constants';
import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  

const ComponentsUpdateUserForm = ({ userId }: { userId: number }) => {
    const [user, setUser] =  useState<User | null>(null);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!session) return;

        const fethcForm = async () => {
            setLoading(true);
            const response = await fetch(Backend_URL + `/user/${userId}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session?.backendTokens.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const userResp = await response.json();
            setUser(userResp);
            console.log(userResp)
            setLoading(false);
        };

        fethcForm();
    }, [session]);

    const showAlert = async (text: string, type: number) => {
        if (type == 1) {
            Swal.fire({
                icon: 'error',
                text: text,
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        } else {
            Swal.fire({
                icon: 'success',
                text: text,
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        }
    };

    // const submitForm = async (values: { name: string; email: string; password: string; }) => {

    //         const res = await fetch(Backend_URL + "/auth/register", {
    //           method: "POST",
    //           body: JSON.stringify({
    //             name: values.name,
    //             email: values.email,
    //             password: values.password,
    //           }),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         });
    //         if (!res.ok) {
    //             showAlert(res.statusText, 1);
    //             return
    //         }
    //         const response = await res.json();
    //         showAlert(res.statusText, 0);
    //         console.log(response);

    // };

    const SubmittedForm = Yup.object().shape({
        name: Yup.string().required('Please fill the Name'),
        email: Yup.string().email('Invalid email').required('Please fill the Email'),
        password: Yup.string().required('Please fill the Name'),
    });

    return (
        <div className="panel">
            <div className="mb-5">
                <Formik
                    initialValues={{
                        name: user?.name,
                        email: user?.email,
                        password: '',
                    }}
                    validationSchema={SubmittedForm}
                    onSubmit={() => {}}
                    // onSubmit={(values) => {submitForm(values)}}
                >
                    {({ errors, submitCount, touched }) => (
                        <Form className="space-y-5">
                            <div className={submitCount ? (errors.name ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="name">Name </label>
                                <Field name="name" type="text" id="name" placeholder="Enter Name" className="form-input" />

                                {submitCount ? errors.name ? <div className="mt-1 text-danger">{errors.name}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>

                            <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="email">Email </label>
                                <Field name="email" type="text" id="email" placeholder="Enter Email" className="form-input" />

                                {submitCount ? errors.email ? <div className="mt-1 text-danger">{errors.email}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>

                            <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="password">Password </label>
                                <Field name="password" type="text" id="password" placeholder="Enter Password" className="form-input" />

                                {submitCount ? errors.password ? <div className="mt-1 text-danger">{errors.password}</div> : <div className="mt-1 text-success">Looks Good!</div> : ''}
                            </div>

                            <button type="submit" className="btn btn-primary !mt-6">
                                Submit Form
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ComponentsUpdateUserForm;
