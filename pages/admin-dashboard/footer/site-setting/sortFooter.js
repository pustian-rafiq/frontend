import React, { useRef, useEffect, useState } from 'react'
import withAdminAuth from '../../../../components/Dashboard/PrivateRoute/withAdminAuth';
import getCookie from '../../../../utils/getCookie';
import getCurrentUser from '../../../../utils/getCurrentUser';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Badge, Button, Card, CardActions, CardContent, Divider, FormControlLabel, Grid, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GET_SISTER_CONCERN } from '../../../../apolloClient/queries/adminDashboard/Footer/GetSisterConcern';
import { useQuery } from '@apollo/client';
import AddSisterConcern from '../../../../components/Dashboard/AdminDashboard/Footer/AddSisterConcern';
import Link from 'next/link';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from 'react-hook-form';
import Switch from '@mui/material/Switch';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("result", result)
  console.log("list", list)
  return result;
};

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#FDFEFE",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#E5E8E8" : "#E5E8E8",
  padding: grid,
});

// Sort Footer Component 
const SortFooter = ({ token }) => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [invisible, setInvisible] = useState(true);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, } = useForm()


  // Fetch alll sister concern
  const { data: sisterConcerData, error, loading } = useQuery(GET_SISTER_CONCERN, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  useEffect(() => {
    setItems(sisterConcerData?.footerTopSisterConcerns?.edges);
  }, [sisterConcerData]);


  if (loading) {
    return <div>Loading.....</div>
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items.length > 0 ? items : sisterConcerData?.footerTopSisterConcerns?.edges,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setItems(reorderedItems);
  };

  const openEditModal = () => {
    setOpen(true)
    //Fetch particular data here
  }
  // Edit sister concern submit handler
  const editSubmitHandler = (data) => {

  }

  return (
    <>
      <Grid container spacing={2}>
        {/* Add new Sister Concern */}
        <Grid item md={6}>
          <AddSisterConcern token={token} />
        </Grid>

        {/* Show Sister Concern */}
        <Grid item md={6} sx={{ mt: '35px' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <Grid container spacing={2}>
                    {items?.map((item, index) => (
                      <Grid key={item?.node?.id} item xs={12} md={12}>
                        <Draggable draggableId={item?.node?.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              // className="card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={getItemStyle(
                              //   snapshot.isDragging,
                              //   provided.draggableProps.style
                              // )}
                              sx={{ margin: '5px 15px' }}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography gutterBottom sx={{ fontSize: { lg: '18px', md: '16px', xs: '14px' } }}>
                                    Name:  {item?.node?.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                
                                    <Box>
                                      {/* <Badge color="secondary" variant="active" invisible={invisible}>
                                        {invisible ? "Active" : "Deactive"}
                                      </Badge> */}
                                      <FormControlLabel
                                        sx={{ color: 'text.primary' }}
                                        control={<Switch checked={invisible} onChange={handleBadgeVisibility} />}
                                      />
                                    </Box>
                                    <Tooltip title="Update Sister Concern">
                                      <IconButton color="warning" sx={{ fontSize: '25px' }} onClick={openEditModal}>
                                        <FontAwesomeIcon icon={faEdit} />
                                      </IconButton>
                                    </Tooltip>

                                  </Box>
                                </Box>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: { lg: '16px', md: '14px', xs: '12px' } }}>
                                  Link:  <Link href={item?.node?.link}  >
                                    <a target="_blank" style={{ color: '#3498DB', cursor: 'pointer', ":hover": { color: '#85C1E9' } }}>{item?.node?.link}</a>
                                  </Link >
                                </Typography>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      </Grid>
                    ))}

                  </Grid>
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>


      {/* Edit sister concern -- Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ border: "none" }}
      >
        <Box sx={{ ...style, minWidth: 300 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="parent-modal-title"
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                fontWeight: "bold",
              }}
            >
              Edit Sister Concern
            </Typography>
            <Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ cursor: "pointer", fontSize: { xs: "18px" } }}
              />
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <form onSubmit={handleSubmit(editSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Name"
                    name="name"
                    // value={dialogValue?.name}
                    {...register("name", {
                      required: true,
                    })}
                  // onChange={(e) =>
                  //   setDialogValue({ ...dialogValue, name: e.target.value })
                  // }
                  />
                </Grid>

                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Link"
                    name="link"
                    //value={dialogValue?.name}
                    {...register("link", {
                      required: true,
                    })}
                  // onChange={(e) =>
                  //   setDialogValue({ ...dialogValue, name: e.target.value })
                  // }
                  />

                </Grid>
                <Grid item md={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "15px",
                      width: "100%",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>

    </>
  );
};
export default withAdminAuth(SortFooter)

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
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
