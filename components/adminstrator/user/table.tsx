'use client';
import IconEdit from '@/components/icon/icon-edit';
import IconEye from '@/components/icon/icon-eye';
import IconPlus from '@/components/icon/icon-plus';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { sortBy } from 'lodash';
import { DataTableSortStatus, DataTable } from 'mantine-datatable';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";
import Loading from '@/components/layouts/loading';

interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface UsersResponse {
    data: User[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
  }

const ComponentsUserTable = () => {

    const { data: session } = useSession();
    const [users, setUsers] =  useState<UsersResponse | null>(null);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<User[]>([]);
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });
    useEffect(() => {
        if (!session) return;
    
        const fetchUser = async () => {
            setLoading(true);
            const response = await fetch(`${Backend_URL}/user?page=${page}&size=${pageSize}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${session.backendTokens.accessToken}`,
                    "Content-Type": "application/json",
                },
            });
    
            const usersList = await response.json();
            setUsers(usersList);
            setLoading(false);
        };
    
        fetchUser();
    }, [session, page, pageSize]); // Add dependencies if needed
    


    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        if (initialRecords.length === 0) return; // Prevent empty updates
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!users?.data) return; // Prevent unnecessary updates
        setInitialRecords(() => {
            if (!users?.data) return [];
            return users.data.filter((user) => {
                return (
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, users]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);


    const deleteRow = (id: any = null) => {
        if (!users?.data) return [];
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(users.data.filter((user) => user.id !== id));
                setInitialRecords(users.data.filter((user) => user.id !== id));
                setUsers((prev) => prev ? { ...prev, data: users.data.filter((user) => user.id !== id) } : null);
                setSelectedRecords([]);
                setSearch('');
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = users.data.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setUsers((prev) => prev ? { ...prev, data: result } : null);
                setSelectedRecords([]);
                setSearch('');
                setPage(1);
            }
        }
    };

    if (loading) return <Loading/>;

    return (
        
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="user-table">
                <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/adminstrator/user/create" className="btn btn-primary gap-2">
                            <IconPlus />
                            New
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={records}
                        columns={[
                            {
                                accessor: 'user',
                                sortable: true,
                                render: ({ id }) => (
                                    <Link href="/adminstrator/user/view">
                                        <div className="font-semibold text-primary underline hover:no-underline">{`#${id}`}</div>
                                    </Link>
                                ),
                            },
                            // {
                            //     accessor: 'name',
                            //     sortable: true,
                            //     render: ({ name, id }) => (
                            //         <div className="flex items-center font-semibold">
                            //             <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                            //                 <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                            //             </div>
                            //             <div>{name}</div>
                            //         </div>
                            //     ),
                            // },
                            {
                                accessor: 'name',
                                sortable: true,
                            },
                            {
                                accessor: 'email',
                                sortable: true,
                            },
                            // {
                            //     accessor: 'date',
                            //     sortable: true,
                            // },
                            // {
                            //     accessor: 'amount',
                            //     sortable: true,
                            //     titleClassName: 'text-right',
                                // render: ({ amount, id }) => <div className="text-right font-semibold">{`$${amount}`}</div>,
                            // },
                            // {
                            //     accessor: 'status',
                            //     sortable: true,
                            //     render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            // },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <Link href={`/adminstrator/user/update/${id}`} className="flex hover:text-info">
                                            <IconEdit className="h-4.5 w-4.5" />
                                        </Link>
                                        <Link href="/adminstrator/user/view" className="flex hover:text-primary">
                                            <IconEye />
                                        </Link>
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ComponentsUserTable;
