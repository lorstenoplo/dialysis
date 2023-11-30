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
import getTreatments from '@/utils/queries/treatments';
import { Typography } from '@mui/joy';
import SyncIcon from '@mui/icons-material/Sync'; 
import { IconButton } from '@mui/material';

interface Column {
    id: 'name' | 'urgency' | 'center';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'urgency', label: 'Urgency', minWidth: 170 },
    { id: 'center', label: 'Center', minWidth: 170 },
];

interface Data {
    id: string;
    name: string;
    urgency: string;
    center: string;
}

export default function ScheduledTreatMents() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [treatments, setTreatments] = React.useState<Data[] | undefined>();
    const center = localStorage.getItem('center');
    const { isLoading, isError, data, error, refetch } = useQuery(['treatments', center], () => getTreatments(center));

    React.useEffect(() => {
        setTreatments(data?.treatments);
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
                        {treatments && treatments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                treatments && <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={treatments!.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }

        </Paper>
    );
}
