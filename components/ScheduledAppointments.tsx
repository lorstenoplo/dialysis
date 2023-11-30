import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import getAppointments from '@/utils/queries/appointments';
import { Typography } from '@mui/joy';
import { IconButton } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

interface Column {
    id: 'name' | 'age' | 'center' | 'problem' | 'doctor';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'problem', label: 'Problem' },
    { id: 'center', label: 'Center' },
    { id: 'doctor', label: 'Doctor' },
];

interface Data {
    id: string;
    name: string;
    problem: string;
    center: string;
    age: number
    doctor: string
}

export default function ScheduledAppointments() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [appointments, setAppointments] = React.useState<Data[] | undefined>();
    const center = localStorage.getItem('center');
    const { isLoading, isError, data, error, refetch } = useQuery(['appointments', center], () => getAppointments(center));

    function get_random(list: string[]) {
        return list[Math.floor((Math.random() * list.length))];
    }

    const docList = ['Dr. Michael Rodriguez', 'Dr. Sarah Patel', 'Dr. Emily Turner', 'Dr. Jonathan Barnes']

    React.useEffect(() => {
        setAppointments(data?.appointments);
        console.log(appointments)
    }, [center, isLoading, data])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) {
        return (
            <>
                <Typography level='h4'>
                    Loading....
                </Typography>
            </>
        )
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <IconButton className='mt-2' onClick={() => refetch()}>
                                <SyncIcon />
                            </IconButton>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments && appointments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            const doc = get_random(docList);
                                            if (column.id === 'doctor') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {doc}
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                appointments && <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={appointments!.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }

        </Paper>
    );
}
