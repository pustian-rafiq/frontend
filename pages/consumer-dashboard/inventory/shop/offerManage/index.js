import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import ClearIcon from "@mui/icons-material/Clear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import swal from "sweetalert";

import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_OFFERS } from "../../../../../apolloClient/queries/products/productOffers";
import useCreateUpdateOffer from "../../../../../apolloClient/mutation/product/productOffer/createUpdateProductOffer";
import useDeleteProductOffer from "../../../../../apolloClient/mutation/product/productOffer/deleteProductOffer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  marginTop: "10px",
  color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const modalStyle = {
  position: "absolute",
  top: { sm: "50%", xs: "30%" },
  left: { sm: "50%", xs: "30%" },
  transform: { sm: "translate(-50%, -50%)", xs: "translate(-30%, -30%)" },
  bgcolor: "background.paper",
  borderRadious: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

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
    disablePadding: false,
    label: "SL",
  },
  {
    id: "offerName",
    disablePadding: false,
    label: "Offer Name",
  },
  {
    id: "offerAmount",
    disablePadding: false,
    label: "Offer Amount",
  },
  {
    id: "miniBuyAmount",
    disablePadding: false,
    label: "Mini. Buy Amount",
  },
  {
    id: "action",
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              paddingLeft: "10px",
              background: "rgb(247, 247, 247)",
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
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const offerManage = ({ token }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offerName, setOfferName] = useState("");
  const [updateOfferName, setUpdateOfferName] = useState("");
  const [offerAmount, setOfferAmount] = useState(0);
  const [updateOfferAmount, setUpdateOfferAmount] = useState(0);
  const [minimumBuyAmount, setMinimumBuyAmount] = useState(0);
  const [updateMinimumBuyAmount, setUpdateMinimumBuyAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [selectedOffer, setSelectedOffer] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { data, loading, error } = useQuery(GET_PRODUCT_OFFERS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  console.log(data);

  const { productOfferCreateOrUpdate } = useCreateUpdateOffer();
  const { productOfferDelete } = useDeleteProductOffer();

  useEffect(() => {
    setUpdateOfferName(selectedOffer.name);
    setUpdateOfferAmount(selectedOffer.amount);
    setUpdateMinimumBuyAmount(selectedOffer.conditionAmount);
    setUpdateDescription(selectedOffer.description);
  }, [selectedOffer]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    setAlertMessage("");
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();
    productOfferCreateOrUpdate({
      variables: {
        name: offerName,
        amount: offerAmount,
        conditionAmount: minimumBuyAmount,
        description: description,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        setAlertMessage("Offer Added successfully!");
        setOpenAlert(true);
        setOfferName("");
        setOfferAmount(0);
        setMinimumBuyAmount(0);
        setDescription("");
      },
    });
  };
  const handleUpdateOffer = (e) => {
    e.preventDefault();
    productOfferCreateOrUpdate({
      variables: {
        id: selectedOffer.id,
        name: updateOfferName,
        amount: updateOfferAmount,
        conditionAmount: updateMinimumBuyAmount,
        description: updateDescription,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        setAlertMessage("Offer Updated successfully!");
        setModalOpen(false);
        setOpenAlert(true);
      },
    });
  };
  const handleDeleteOffer = (id) => {
    swal("Are you sure?", {
      buttons: {
        cancel: "Cancel",
        delete: true,
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          productOfferDelete({
            variables: {
              id,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            onCompleted: () => {
              swal("Offer Deleted!");
            },
            onError: (err) => {
              swal(err);
            },
          });
          break;
        case "cancel":
          break;

        default:
          break;
      }
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const searchTextHandler = () => {
    setSearchText("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Show bank data and searches real time
  const tableDatas = data?.me?.consumers?.productoffers?.edges?.filter(
    (search) => {
      return search?.node?.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      //   search.calories.toLowerCase().includes(searchText.toLowerCase()) ||
      //search.fat.toLowerCase().includes(searchText.toLowerCase())
    }
  );

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={index}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.amount}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.conditionAmount}
          </TableCell>
          {/* <TableCell className="tableBorder" align="left">
            {row?.node?.conditionAmount}
          </TableCell> */}
          <TableCell className="tableBorder " align="left">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                border: 0,
              }}
            >
              <Tooltip title="Update Offer">
                <IconButton
                  color="primary"
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedOffer(row.node);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Offer">
                <IconButton
                  color="error"
                  onClick={() => handleDeleteOffer(row.node.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Item component="form" onSubmit={handleCreateOffer}>
            <Typography>Create New Offer</Typography>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Offer Name"
              variant="outlined"
              value={offerName}
              onChange={(e) => setOfferName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Offer Amount"
              variant="outlined"
              type="number"
              inputProps={{
                maxLength: 13,
                step: ".1",
                min: 0,
              }}
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Minimum Buy Amount"
              variant="outlined"
              type="number"
              inputProps={{
                maxLength: 13,
                step: ".1",
                min: 0,
              }}
              value={minimumBuyAmount}
              onChange={(e) => setMinimumBuyAmount(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none", mt: 2 }}
            >
              Save
            </Button>
          </Item>
        </Grid>
        <Grid item md={8} xs={12}>
          <Item>
            <Typography>Product Offer List</Typography>
            <Box style={{ paddingRight: "5px" }}>
              <Box sx={{ my: 2 }} className="searchSection">
                <Box className="searchInput">
                  <input
                    type="text"
                    placeholder="Search for offer name..."
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                  />
                  <ClearIcon
                    className="clearIcon"
                    onClick={searchTextHandler}
                  />
                </Box>
              </Box>
              <TableContainer style={{ marginTop: "0px", background: "white" }}>
                <Table
                  // sx={{ maxHeight: 600 }}
                  size="small"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    // onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data?.me?.consumers?.productoffers?.edges?.length}
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
                count={data?.me?.consumers?.productoffers?.edges?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Item>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-offerAmount"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle} component="form" onSubmit={handleUpdateOffer}>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Offer Name"
              variant="outlined"
              value={updateOfferName}
              onChange={(e) => setUpdateOfferName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Offer Amount"
              variant="outlined"
              type="number"
              inputProps={{
                maxLength: 13,
                step: ".1",
                min: 0,
              }}
              value={updateOfferAmount}
              onChange={(e) => setUpdateOfferAmount(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Minimum Buy Amount"
              variant="outlined"
              type="number"
              inputProps={{
                maxLength: 13,
                step: ".1",
                min: 0,
              }}
              value={updateMinimumBuyAmount}
              onChange={(e) => setUpdateMinimumBuyAmount(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              label="Description"
              variant="outlined"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            />
            <Box
              sx={{
                display: { sm: "flex" },
                justifyContent: "space-around",
                px: { sm: 15 },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none", m: 2 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "none", m: 2 }}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default withConsumerAuth(offerManage);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
