import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
   
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '85ch',
            '&:focus': {
                width: '85ch',
            },
        },
    },
}));


const columns = [
    { id: 'sl1', label: 'SL No.', minWidth: 50 },
    {
        id: 'country__name2',
        label: 'Country',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'country__name__count3',
        label: 'Total Consumers',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },

];


const ShowConsumerByCountry = ({CountrywiseConsumer}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [searchText, setSearchText] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const searchTextHandler = (e) => {
        setSearchText(e.target.value)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Show bank data and searches real time
    const tableDatas = CountrywiseConsumer.filter((search) => {
        return (
            search.country__name.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    const tableData = tableDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row,index) => {
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                    {columns.map((column) => {
                        const value = row[column?.id];
                        return (
                            <TableCell key={column?.id} align={column.align}  size="small">
                                { value ? value : (page * rowsPerPage) + (++index)}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        })
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box style={{ marginTop: '2px' }} >
                <Box sx={{ width: '100%' }}>
                    {/* <input type="text" placeholder='Search for name, address and others..'
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        style={{ width:'100%',padding:'10px' }}
                    />  */}
                    <AppBar position="static" sx={{background:'#68d5f9'}}>
                        <Toolbar>
                            <Search sx={{background:'#EBEBEB',color:'#000'}}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search by country…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    //value={searchText}
                                    onChange={searchTextHandler}
                                />
                            </Search>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Box>
            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                               
                                <TableCell
                                    key={column?.id}
                                  
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{background:'#EBEBEB'}}
                                    size="small"
                                >
                                     
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[100, 200, 260]}
                component="div"
                count={CountrywiseConsumer.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default ShowConsumerByCountry
