import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "../../../../pages/consumer-dashboard/commisions/directcommision/DirectCommision.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import swal from "sweetalert";

import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import useDirectCommisionGroups from "../../../../apolloClient/mutation/commisions/DirectCommisionGroup";
import { GET_DIRECT_COMMISION_GROUPS } from "../../../../apolloClient/queries/commision/dCGroups";
import { GET_DIRECT_COMMISION } from "../../../../apolloClient/queries/commision/GetDirectCommision";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "grey",
    },
  },
}))(TableRow);

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array = [], comparator) {
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
    id: "sl",
    numeric: true,
    disablePadding: true,
    label: "SL.",
  },
  {
    id: "cin",
    numeric: true,
    disablePadding: false,
    label: "Receiver's CIN",
  },
  {
    id: "salesprice",
    numeric: true,
    disablePadding: false,
    label: "Sales Price",
  },
  {
    id: "salespriceusd",
    numeric: true,
    disablePadding: false,
    label: "Sales Price in USD($)",
  },
  {
    id: "commision",
    numeric: true,
    disablePadding: false,
    label: "Commission",
  },
  {
    id: "commisionLocal",
    numeric: true,
    disablePadding: false,
    label: "Commission(Local)",
  },
  {
    id: "commisionusd",
    numeric: true,
    disablePadding: false,
    label: "Commission in USD($)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              paddingLeft: "10px",
              background: "rgb(235, 235, 235)",
            }}
            className="tableBorder"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          className="tableBorder"
          padding="checkbox"
          style={{
            paddingLeft: "10px",
            background: "rgb(235, 235, 235)",
          }}
        >
          Select
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            style={{ paddingLeft: "5px" }}
            inputProps={{
              "aria-label": "select all rows",
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const DueCommision = ({ dueCommision, token }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commision, setCommision] = useState(0);
  const [usdCommision, setUsdCommision] = useState(0);

  const { directCommissionGroupMutation, data, loading, error } =
    useDirectCommisionGroups();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const searchTextHandler = () => {
    setSearchText("");
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dueCommision?.directCommissions?.edges?.map(
        (n) => n.node.id
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setCommision(
      selected
        .map((id) =>
          dueCommision?.directCommissions?.edges?.find(
            (row) => row.node.id === id
          )
        )
        .map((commission) => commission.node.sendingAmt)
        .reduce(
          (previousValue, currentValue) =>
            parseFloat(previousValue) + parseFloat(currentValue),
          0
        )
        ?.toFixed(2)
    );
    setUsdCommision(
      selected
        .map((id) =>
          dueCommision?.directCommissions?.edges?.find(
            (row) => row.node.id === id
          )
        )
        .map((commission) => commission.node.amtUsd)
        .reduce(
          (previousValue, currentValue) =>
            parseFloat(previousValue) + parseFloat(currentValue),
          0
        )
        ?.toFixed(2)
    );
  }, [selected]);

  //Select commision
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (select) => selected.indexOf(select) !== -1;

  //Show bank data and searches real time
  const tableDatas = dueCommision?.directCommissions?.edges?.filter(
    (search) => {
      return search?.node?.consumerReceiver?.username
        .toLowerCase()
        .includes(searchText.toLowerCase());
      //   search.calories.toLowerCase().includes(searchText.toLowerCase()) ||
      //search.fat.toLowerCase().includes(searchText.toLowerCase())
    }
  );

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      const isItemSelected = isSelected(row.node.id);

      return (
        <TableRow
          onClick={(event) => handleClick(event, row.node.id)}
          role="checkbox"
          aria-checked={isItemSelected}
          selected={isItemSelected}
          className="rowHover"
          tabIndex={-1}
          key={row.node.id}
        >
          <TableCell className="tableBorder">
            {" "}
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.consumerReceiver?.username}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.totalSellAmt?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.totalSellAmtUsd?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.sendingAmt?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {`${
              row?.node?.consumerReceiver?.country?.currenciesSymbol !== "None"
                ? row?.node?.consumerReceiver?.country?.currenciesSymbol
                : ""
            }${row?.node?.receivingAmt?.toFixed(2)}`}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.amtUsd?.toFixed(2)}
          </TableCell>
          <TableCell padding="checkbox" className="tableBorder">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </TableCell>
        </TableRow>
      );
    });
  // Pay select handler
  const paySubmitHandler = () => {
    if (selected.length !== 0) {
      swal("Are you sure to pay this commision?").then((willDelete) => {
        if (willDelete) {
          directCommissionGroupMutation({
            variables: {
              payableAmountTk: commision,
              payableAmountUsd: usdCommision,
              directCommissions: selected,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            refetchQueries: [GET_DIRECT_COMMISION_GROUPS, GET_DIRECT_COMMISION],
            onCompleted: () => {
              setSelected([]);
              setCommision(0);
              setUsdCommision(0);
              // router.push("/admin-dashboard/inventory/category");
            },
          });
        }
      });
    } else {
      swal("Please Select Any Due Commission!");
    }
  };
  return (
    <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
      <Paper
        sx={{ width: "100%", mb: 2, pt: 2 }}
        style={{ paddingRight: "15px", paddingLeft: "15px" }}
      >
        <Box style={{ marginTop: "10px" }} className="searchSection">
          <Typography className="searchLabel">Search</Typography>
          <Typography className="searchInput">
            <input
              type="text"
              placeholder="Search for name, address and others.."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <ClearIcon className="clearIcon" onClick={searchTextHandler} />
          </Typography>
        </Box>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            sx={{
              minWidth: 750,
            }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dueCommision?.directCommissions?.edges?.length}
            />
            <TableBody>
              {/* Show tbale bodt data */}
              {tableData}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={dueCommision?.directCommissions?.edges?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className={styles.submitSection}>
        <h4>Total: {commision}</h4>
        <h4>Total in USD: {usdCommision}</h4>
        <Button className={styles.submitButton} onClick={paySubmitHandler}>
          Submit Selected for pay
        </Button>
      </div>
    </Box>
  );
};
export default DueCommision;
