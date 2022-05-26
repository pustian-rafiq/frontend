import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from "next/link";
import { visuallyHidden } from '@mui/utils';
//import styles from '../styles/DataTable.module.css'

import ClearIcon from '@mui/icons-material/Clear';
 
function descendingComparator(a, b, orderBy) {

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Customer Name',
    },
    {
        id: 'ref1',
        numeric: true,
        disablePadding: false,
        label: "Reference-1",
    },
    {
        id: 'ref2',
        numeric: true,
        disablePadding: false,
        label: "Reference-2",
    },
     
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead  >
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        //align={headCell.numeric ? 'right' : 'left'}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
                        className="tableBorder"
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const FindReference = ({ showCommisionData }) => {
    const [searchText, setSearchText] = React.useState("");

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const searchTextHandler = () => {
        setSearchText("")
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    //Show bank data and searches real time
    const tableDatas = showCommisionData.filter((search) => {
        return (
            search.cin
                .toLowerCase()
                .includes(searchText.toLowerCase())
            //   search.calories.toLowerCase().includes(searchText.toLowerCase()) ||
            //search.fat.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    const tableData = stableSort(tableDatas, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            // const labelId = `enhanced-table-checkbox-${index}`;

            return (
                <TableRow
                    hover={true}
                    tabIndex={-1}
                    key={row.cin}
                    style={{ background: 'rgb(247, 247, 247)' }}
                >
                    <TableCell className="tableBorder" align="left">{row.name}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.ref1}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.ref2}</TableCell>
                </TableRow>
            );
        })


    return (
        <Box sx={{ width: '100%' }} style={{ paddingRight: '5px' }} >
            <Paper sx={{ width: '100%', mb: 2, mt: 3 }} style={{ paddingRight: '15px', paddingLeft: '15px' }} >
                <div style={{ marginTop: '10px' }} className="searchSection" >
                    <div className="searchLabel">
                        Search
                    </div>
                    <div className="searchInput">
                        <input type="text" placeholder='Search for name, address and others..'
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                        />
                        <ClearIcon className="clearIcon" onClick={searchTextHandler} />
                    </div>
                </div>
                <TableContainer style={{ marginTop: '0px', background: 'white' }} >
                    <Table
                        // sx={{ minWidth: 750 }}
                        sx={{
                            "& .MuiTableRow-root:hover": {
                                backgroundColor: "red"
                            },
                            minWidth: 750
                        }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableDatas.length}
                        />
                        <TableBody>
                            {/* Show tbale bodt data */}
                            {tableData}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 93 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={tableDatas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
                <span>Total:</span>
            </div>
        </Box>
    );
}
export default FindReference
