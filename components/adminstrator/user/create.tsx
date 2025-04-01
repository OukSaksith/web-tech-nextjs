'use client';
import { Formik, Form } from 'formik';
import React from 'react';
import { userValidationSchema } from './validationSchemas';
import { submitForm } from '@/components/utils/api';
import FormField from '@/components/Forms/FormField';

const ComponentsCreateUserForm = () => {
    return (
        <div className="panel">
            <div className="mb-5">
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={userValidationSchema}
                    onSubmit={(values) => submitForm('/auth/register', values)}
                >
                    {({ errors, submitCount }) => (
                        <Form className="space-y-5">
                            <FormField label="Name" name="name" errors={errors} submitCount={submitCount} />
                            <FormField label="Email" name="email" errors={errors} submitCount={submitCount} type="email" />
                            <FormField label="Password" name="password" errors={errors} submitCount={submitCount} type="password" />

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

export default ComponentsCreateUserForm;
