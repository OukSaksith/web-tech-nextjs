'use client';
import { useSession } from 'next-auth/react';
import { deleteUser, useFetchUsers } from '@/components/hooks/useFetchUsers';
import Link from 'next/link';
import IconEdit from '@/components/icon/icon-edit';
import IconPlus from '@/components/icon/icon-plus';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import ReusableTable from '@/components/Forms/ReusableTable';

const ComponentsUserTable = () => {
    const { data: session } = useSession();
    const { users, loading, error } = useFetchUsers(session?.backendTokens.accessToken || '', 1, 10);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id, session?.backendTokens.accessToken || '');
            location.reload();
        }
    };

    const columns = [
        { accessor: 'name', title: 'Name', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        {
            accessor: 'actions',
            title: 'Actions',
            render: ({ id }: { id: number }) => (
                <div className="flex gap-3">
                    <Link href={`/adminstrator/user/update/${id}`} className="text-blue-500">
                        <IconEdit />
                    </Link>
                    <button onClick={() => handleDelete(id)} className="text-red-500">
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="panel mt-6">
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center">
                    <Link href="/adminstrator/user/create" className="btn btn-primary gap-2">
                        <IconPlus /> New
                    </Link>
                </div>

                {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
            </div>

            <ReusableTable data={users?.data || []} loading={loading} error={error} columns={columns} totalRecords={users?.total || 0} />
        </div>
    );
};

export default ComponentsUserTable;
