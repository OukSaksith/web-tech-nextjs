import ComponentsUserTable from '@/components/adminstrator/user/table';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Users',
};

const UserTable = () => {
    return <ComponentsUserTable />;
};

export default UserTable;
