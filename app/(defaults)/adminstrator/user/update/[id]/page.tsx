import React from 'react'
import { Metadata } from 'next';
import ComponentsUpdateUserForm from '@/components/adminstrator/user/update'

export const metadata: Metadata = {
  title: 'Update User',
};
type Props = {
    params: {
      id: number;
    };
  };
function updateUserForm(props:Props) {
  return (
    <ComponentsUpdateUserForm userId={props.params.id}/>
  )
}

export default updateUserForm

