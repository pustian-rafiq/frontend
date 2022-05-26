import React, { useState } from "react";

// mui components
import { minHeight, styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

// mui icons
import EmailIcon from "@mui/icons-material/Email";
import ListIcon from "@mui/icons-material/List";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// css
import styles from "../../styles/Products/Products.module.css";
import { Divider } from "@mui/material";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const rows = [
  { id: "1", name: "Gender", value: "10" },
  { id: "2", name: "Gender", value: "100" },
  { id: "3", name: "Gender", value: "2" },
  { id: "4", name: "Gender", value: "1" },
  { id: "5", name: "Gender", value: "80" },
];

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  background-color: lavenderblush;
  // width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    color:#000;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[400]};
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  // min-width: 320px;
  background-color: transparent;
  color: black;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

const shopQA = [
  {
    id: 1,
    question: "what is your name ?",
    time: "5 months ago",
    isAnswered: true,
    answer: "My Name is Md. Halim",
    isAdmin: false,
  },
  {
    id: 2,
    question: "How Old are you ?",
    time: "1 months ago",
    isAnswered: true,
    answer: "10 years",
    isAdmin: false,
  },

  {
    id: 3,
    question: "what is country name ?",
    time: "3 months ago",
    isAnswered: false,
    answer: null,
    isAdmin: true,
  },
];

const Shop = ({singleProduct}) => {
  const [userRating, setUserRating] = useState(2.5);


  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab
          sx={{
            padding: { xs: "1px 3px !important", sm: "1px!important" },
            minHeight: {
              xs: "32px!important",
              sm: "32px!important",
              md: "15px!important",
            }
          }}


        >
          <MenuItem
            sx={{
              padding: "5px",
              marginTop: { xs: "0px", sm: "0px", md: "3px" },
              fontSize: "10px",
              minHeight: { xs: "30px!important", sm: "33px",md:'30px' },
              width:'100px'
            }}
          >
            <ListItemIcon sx={{ minWidth: "25px !important",ml:'15px' }} >
              <VisibilityIcon fontSize="small"  />
            </ListItemIcon>
            Overview
          </MenuItem>
        </Tab>

        <Tab
          sx={{
            padding: { xs: "1px 3px !important", sm: "3px!important" },
            minHeight: {
              xs: "32px!important",
              sm: "32px!important",
              md: "40px!important",
            },
          }}
        >
          <MenuItem
            sx={{
              padding: "5px",
              marginTop: { xs: "0px", sm: "0px", md: "3px" },
              fontSize: "10px",
              minHeight: { xs: "30px!important", sm: "33px" },
            }}
          >
            <ListItemIcon sx={{ minWidth: "25px !important" ,ml:'15px'}}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Customer Review (1)
          </MenuItem>
        </Tab>

        <Tab
          sx={{
            padding: { xs: "1px 3px !important", sm: "3px!important" },
            minHeight: {
              xs: "32px!important",
              sm: "32px!important",
              md: "40px!important",
            },
          }}
        >
          <MenuItem
            sx={{
              padding: "5px",
              marginTop: { xs: "0px", sm: "0px", md: "3px" },
              fontSize: "10px",
              minHeight: { xs: "30px!important", sm: "33px" },
            }}
          >
            <ListItemIcon sx={{ minWidth: "25px !important",ml:'5px' }}>
              <QuestionMarkIcon fontSize="small" />
            </ListItemIcon>
            QA Section (0)
          </MenuItem>
        </Tab>

        <Tab
          sx={{
            padding: { xs: "1px 3px !important", sm: "3px!important" },
            minHeight: {
              xs: "32px!important",
              sm: "32px!important",
              md: "40px!important",
            },
          }}
        >
          <MenuItem
            sx={{
              padding: "5px",
              marginTop: { xs: "0px", sm: "0px", md: "3px" },
              fontSize: "10px",
              minHeight: { xs: "30px!important", sm: "33px" },
            }}
          >
            <ListItemIcon sx={{ minWidth: "25px !important",ml:'5px' }}>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            Specifications
          </MenuItem>
        </Tab>

        <Tab
          sx={{
            padding: { xs: "1px 3px !important", sm: "3px!important" },
            minHeight: {
              xs: "32px!important",
              sm: "32px!important",
              md: "40px!important",
            },
          }}
        >
          <MenuItem
            sx={{
              padding: "5px",
              marginTop: { xs: "0px", sm: "0px", md: "3px" },
              fontSize: "10px",
              minHeight: { xs: "30px!important", sm: "25px" },
            }}
          >
            <ListItemIcon sx={{ minWidth: "25px !important",ml:'10px' }}>
              <EmailIcon fontSize="small" />
            </ListItemIcon>
            Contact Seller
          </MenuItem>
        </Tab>
      </TabsList>

      <TabPanel value={0}>
        <Box sx={{ width: "90%", marginTop: "10px" }}>
          <Typography variant="h6" sx={{py:'7px'}}>Product details of {singleProduct?.product?.name}</Typography>
          <Divider />
          
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
            Product Type:  &nbsp;{singleProduct?.product?.category?.name}
          </Typography> 
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
             Brand Name:  &nbsp;{singleProduct?.product?.brandName}</Typography>
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
             New Feature:  &nbsp;{singleProduct?.product?.newFeature}</Typography> 
          
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
            Color: &nbsp;{singleProduct?.product?.color?.name}</Typography>
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
            Matrial: &nbsp;{singleProduct?.product?.material}</Typography>
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
            Gender:&nbsp; {singleProduct?.product?.forGender ? singleProduct?.product?.forGender : "All"}</Typography>
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
            price: &nbsp;{singleProduct?.product?.sellPrice}</Typography> 
          <Typography variant="body2" sx={{py:'3px',fontWeight:'300',display:'flex',alignItems:'center'}}>
            <ArrowRightIcon />
          Size: &nbsp;{singleProduct?.product?.size}</Typography>
          

        </Box>
      </TabPanel>

      <TabPanel value={1}>
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <Typography>Give Rating</Typography>
          <Rating
            name="product-feedback"
            value={userRating}
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            onChange={(e) => {
              setUserRating(parseFloat(e.target.value));
            }}
          />
          <Box>
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: " var(--primary)",
                fontSize: "12px",
                color: "white",
                marginTop: "10px",
                padding: "2px 5px",
                "&:hover": {
                  backgroundColor: "#868e96",
                },
              }}
              onClick={(e) => {
                console.log("user rating ::: ", userRating);
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <Typography>Review Status (1) | (Avg {singleProduct?.product?.avarageRating}/5)</Typography>
        </Box>

        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography>5 Stars 0%</Typography>
          <LinearProgress
            variant="determinate"
            value={singleProduct?.product?.fiveStar}
            sx={{
              height: "12px",
              borderRadius: "20px",
              backgroundColor: "#e9ecef",
            }}
          />
        </Box>

        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography>4 Stars 80%</Typography>
          <LinearProgress
            variant="determinate"
            value={singleProduct?.product?.fourStar}
            sx={{
              height: "12px",
              borderRadius: "20px",
              backgroundColor: "#e9ecef",
            }}
          />
        </Box>

        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography>3 Stars 60%</Typography>
          <LinearProgress
            variant="determinate"
            value={singleProduct?.product?.threeStar}
            sx={{
              height: "12px",
              borderRadius: "20px",
              backgroundColor: "#e9ecef",
            }}
          />
        </Box>

        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography>2 Stars 40%</Typography>
          <LinearProgress
            variant="determinate"
            value={singleProduct?.product?.twoStar}
            sx={{
              height: "12px",
              borderRadius: "20px",
              backgroundColor: "#e9ecef",
            }}
          />
        </Box>

           {/* percent calculation is testing from front end using one  */}

        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography>1 Stars {singleProduct?.product?.oneStar *100 /singleProduct?.product?.totalRating }%</Typography>
          <LinearProgress
            variant="determinate"
            value={singleProduct?.product?.oneStar}
            sx={{
              height: "12px",
              borderRadius: "20px",
              backgroundColor: "#e9ecef",
            }}
          />
        </Box>
      </TabPanel>

      <TabPanel value={2}>
        <Box sx={{ width: "90%", margin: "auto", marginTop: "10px" }}>
          <Typography variant="subtitle1">Previous Question Answers</Typography>
        </Box>

        {shopQA.map((item) => (
          <Box
            key={item.id}
            sx={{ width: "90%", margin: "auto", marginTop: "1px" }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                component="span"
                sx={{ padding: "0px", margin: "0px" }}
              >
                <MenuItem sx={{ padding: "0px", margin: "0px" }}>
                  <ListItemIcon
                    className="pera"
                    sx={{
                      padding: "0px",
                      minWidth: "17px !important",
                      marginRight: "5px",
                    }}
                  >
                    <ContactSupportIcon
                      sx={{
                        padding: "0px",
                        fontSize: "15px",
                      }}
                    />
                  </ListItemIcon>
                  {item.question}
                </MenuItem>
              </Typography>

              <Typography
                variant="caption"
                component="span"
                sx={{
                  backgroundColor: "#868e96",
                  color: "var(--white)",
                  padding: "0px 3px",
                  marginLeft: "5px",
                  marginTop: "6px",
                  height: "18px",
                  borderRadius: "10px",
                }}
              >
                {item.time}
              </Typography>
            </Box>

            <Box sx={{ padding: "5px 20px" }}>
              {item.isAnswered ? (
                item.isAdmin ? (
                  <Box>
                    <Typography variant="caption" sx={{ margin: "10px 0px" }}>
                      {item.answer}{" "}
                    </Typography>
                    <Typography component="div">
                      <Button
                        size="small"
                        sx={{
                          marginRight: "5px",
                          padding: "0px",
                          minWidth: "0px",
                          "&:hover": {
                            backgroundColor: "transparent",
                            padding: "0px",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          marginLeft: "5px",
                          padding: "0px",
                          minWidth: "0px",
                          "&:hover": {
                            backgroundColor: "transparent",
                            padding: "0px",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="caption" sx={{ margin: "10px 0px" }}>
                    {item.answer}
                  </Typography>
                )
              ) : item.isAdmin ? (
                <Box>
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      padding: "10px 0px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<KeyboardArrowDownIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={styles.expandedd_accordion_title}
                      sx={{
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "start",
                        padding: "0px",
                        minHeight: "0px !important",
                        "& > .MuiAccordionSummary-content": {
                          margin: "0px",
                        },
                      }}
                    >
                      <Typography
                        className="name-munna2"
                        sx={{
                          color: "var(--primary)",
                          margin: "0px",
                          minHeight: "0px",
                        }}
                      >
                        reply
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        padding: "0px",
                        marginTop: "20px",
                      }}
                    >
                      <InputLabel shrink htmlFor="last_name">
                        <Typography sx={{ marginLeft: "5px" }} component="div">
                          Answer
                        </Typography>
                      </InputLabel>

                      <OutlinedInput
                        sx={{ backgroundColor: "white" }}
                        fullWidth
                        size="small"
                        placeholder="Answer"
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          fontSize: "12px",
                          backgroundColor: "var(--primary)",
                          color: "white",
                          marginTop: "10px",
                        }}
                      >
                        Submit
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ) : (
                <Box>
                  <Typography>Ans :: </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}

        <Box sx={{ width: "90%", margin: "10px auto 20px" }}>
          <fieldset style={{ padding: "20px", border: "1px solid #ddd" }}>
            <legend>
              {" "}
              <Typography
                sx={{ marginLeft: "5px" }}
                variant="caption"
                component="div"
              >
                Ask Question
              </Typography>
            </legend>

            <OutlinedInput
              sx={{ backgroundColor: "white", fontSize: "12px" }}
              fullWidth
              size="small"
              placeholder="Ask Your Question"
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={
                <SendIcon
                  sx={{
                    transform: "rotate(-45deg)",
                    marginRight: "-5px !important",
                    marginTop: "-5px !important",
                  }}
                />
              }
              sx={{
                backgroundColor: "#868e96",
                fontSize: "12px",
                color: "white",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "var(--primary)",
                },
              }}
            >
              Submit
            </Button>
          </fieldset>
        </Box>
      </TabPanel>

      <TabPanel value={3}>
        <Box sx={{ width: "90%", margin: "10px auto" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%", border: "1px solid #e9ecef" }}>
                    Brand Name
                  </TableCell>
                  <TableCell sx={{ width: "70%", border: "1px solid #e9ecef" }}>
                    {singleProduct?.product?.brandName}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                  <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      Gender
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.forGender ? singleProduct?.product?.forGender : 'All'}
                    </TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      Age Range
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.ageRange}
                    </TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    newFeature
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.newFeature}
                    </TableCell>
                  </TableRow>

                   <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Extra_Feature
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.extraFeature?.body}  {singleProduct?.product?.extraFeature?.color}   {singleProduct?.product?.extraFeature?.screen}
                    </TableCell>
                  </TableRow>

                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Material
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.material}  
                    </TableCell>
                  </TableRow>                 
                  
                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Color
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.color?.name}  
                    </TableCell>
                 </TableRow>

                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Weight
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.weight}  
                    </TableCell>
                 </TableRow>

                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Style
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.slug}  
                    </TableCell>
                 </TableRow>

                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Package
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.packageSize}  
                    </TableCell>
                 </TableRow>

                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Product Type
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.subcategory?.name}  
                    </TableCell>
                 </TableRow>


                 <TableRow >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                    Release Date
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "30%", border: "1px solid #e9ecef" }}
                    >
                      {singleProduct?.product?.publishedDate}  
                    </TableCell>
                 </TableRow>
     
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      <TabPanel value={4}>
        <Box sx={{ width: "90%", margin: "10px auto" }}>
          <Typography>Contact With This Product Seller</Typography>
          <Grid container>
            <Grid item xs={12} mt={2}>
              <OutlinedInput
                type="text"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
                fullWidth
                size="small"
                placeholder="Name"
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <OutlinedInput
                type="email"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
                fullWidth
                size="small"
                placeholder="Contact Email"
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <OutlinedInput
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
                fullWidth
                size="small"
                placeholder="Write Details Here"
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <OutlinedInput
                type="file"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
                fullWidth
                size="small"
                placeholder="Choose File"
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  <SendIcon
                    sx={{
                      transform: "rotate(-45deg)",
                      marginRight: "-5px !important",
                      marginTop: "-5px !important",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#868e96",
                  fontSize: "12px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </TabsUnstyled>
  );
};

export default Shop;
