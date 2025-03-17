import React from 'react'
import { Metadata } from 'next';
import ComponentsCreateUserForm from '@/components/adminstrator/user/create'

export const metadata: Metadata = {
  title: 'Create User',
};
function CreateUserForm() {
  return (
    <ComponentsCreateUserForm/>
  )
}

export default CreateUserForm

