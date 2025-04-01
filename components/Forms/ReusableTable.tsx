'use client';
import { useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import Loading from '@/components/layouts/loading';

interface ReusableTableProps {
    data: any[];
    columns: any[];
    loading: boolean;
    error?: string | null; // Allow null
    totalRecords: number;
    pageSizeOptions?: number[];
}

const ReusableTable = ({
    data,
    columns,
    loading,
    error,
    totalRecords,
    pageSizeOptions = [10, 20, 30, 50, 100],
}: ReusableTableProps) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const columnsFinal = [
        { accessor: 'id', title: 'ID', sortable: true,  render: (_: any, index: number) => (page - 1) * pageSize + index + 1, },
        ...columns
    ];

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: columnsFinal[0]?.accessor || 'id',
        direction: 'asc',
    });

    if (loading) return <Loading />;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="datatables">
            <DataTable
                className="table-hover whitespace-nowrap"
                records={data || []}
                columns={columnsFinal}
                withBorder={false}
                totalRecords={totalRecords}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={setPage}
                highlightOnHover
                onRecordsPerPageChange={setPageSize}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                recordsPerPageOptions={pageSizeOptions}
                paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
            />
        </div>
    );
};

export default ReusableTable;
