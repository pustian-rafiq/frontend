//This adminListItems is used in admin dashboard only...
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import TvTwoToneIcon from "@mui/icons-material/TvTwoTone";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import DockTwoToneIcon from "@mui/icons-material/DockTwoTone";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AnchorIcon from "@mui/icons-material/Anchor";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

import Link from "next/link";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";

const listSubHeaderStyle = {
  backgroundColor: "#45b9e0",
  color: "#ffffff",
  paddingLeft: "20px",
  lineHeight: "30px",
  textTransform: "uppercase",
  fontSize: "10px",
  fontWeight: 600,
};
const listItemTextStyle = {
  "& .MuiListItemText-primary": {
    color: "#60686f",
    fontWeight: 600,
    fontSize: "14px",
  },
};
const accordionistItemTextStyle = {
  "& .MuiListItemText-primary": {
    color: "#60686f",
    fontWeight: 400,
    fontSize: "13px",
    "& .MuiDrawer-paper": {
      whiteSpace: "none",
    },
  },
};

const accordionDetails = {
  "&.MuiAccordionDetails-root": {
    p: 0,
  },
};

const accordionStyle = {
  "&.MuiAccordion-root": {
    "::before": {
      backgroundColor: "none",
      opacity: 0,
    },
    "&.MuiPaper-root": {
      boxShadow: "none",
    },
  },
};

export const adminListItems = (
  <>
    {/* First section starts here */}
    <ListSubheader inset sx={listSubHeaderStyle}>
      Main
    </ListSubheader>
    <Link href={"/admin-dashboard"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <TvTwoToneIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Dashboard" />
        </ListItemButton>
      </a>
    </Link>
    {/* Address section starts here */}
    {/* <ListSubheader inset sx={listSubHeaderStyle}>
      Address
    </ListSubheader>
    <Link href={"/admin-dashboard/address"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Address" />
        </ListItemButton>
      </a>
    </Link> */}

    {/* First section ends here */}
    {/* Second section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      Consumers Info
    </ListSubheader>
    <div>
      <Accordion sx={accordionStyle}>
        <ListItemButton sx={{ py: 0 }}>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                  boxShadow: "none",
                },
              }}
            >
              Master Users
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/consumer-info/register-master/"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Master Users"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/consumer-info/master-list/"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="All Master Users"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <AnchorIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Consumers
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/consumer-info/consumer-list"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="All Consumers"
                />
              </ListItemButton>
            </a>
          </Link>
          {/* <Link href={"/admin-dashboard/consumer-info/references/"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Consumers With References"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/consumer-info/find-reference/"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Find References"
                />
              </ListItemButton>
            </a>
          </Link> */}
        </AccordionDetails>
      </Accordion>

      {/* consumer tree  */}
      <Link href="/admin-dashboard/incentives-commission/all-incentives">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Consumer Tree" />
        </ListItemButton>
      </Link>
    </div>
    {/* Second section ends here */}
    {/* Third section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      INCENTIVES & COMMISSIONS
    </ListSubheader>
    <Link href={"/admin-dashboard/incentives-commission/all-incentives"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ContentCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="All Incentives" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/incentives-commission/reference-commission"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Daily Ref Commission" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/incentives-commission/commissions"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Commissions" />
        </ListItemButton>
      </a>
    </Link>

    {/* =============accordion end=========== */}
    {/* Third section ends here */}
    {/* Fourth section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      INVENTORY
    </ListSubheader>
    {/* =============accordion start=========== */}
    <Accordion sx={accordionStyle}>
      <ListItemButton
        sx={{
          py: 0,
        }}
      >
        <ListItemIcon sx={{ minWidth: "30px" }}>
          <MenuOutlinedIcon />
        </ListItemIcon>
        <ListItemText sx={listItemTextStyle}>
          <AccordionSummary
            expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.MuiAccordionSummary-root": {
                p: 0,
                border: "none",
              },
              "&.MuiButtonBase-root": {
                border: "none",
                py: 0,
              },
            }}
          >
            Category
          </AccordionSummary>
        </ListItemText>
      </ListItemButton>
      <AccordionDetails sx={accordionDetails}>
        <Link href={"/admin-dashboard/inventory/category"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText sx={accordionistItemTextStyle} primary="Category" />
            </ListItemButton>
          </a>
        </Link>

        <Link href={"/admin-dashboard/inventory/subCategory"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Sub Category"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/inventory/subSubCategory"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Sub Sub Category"
              />
            </ListItemButton>
          </a>
        </Link>
      </AccordionDetails>
    </Accordion>

    <Link href={"/admin-dashboard/inventory/inventory-doc"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <DockTwoToneIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Inventory Doc" />
        </ListItemButton>
      </a>
    </Link>
    {/* Fourth section ends here */}

    {/* Fifth section starts here */}
    <ListSubheader inset sx={listSubHeaderStyle}>
      Payment
    </ListSubheader>
    <Accordion sx={accordionStyle}>
      <ListItemButton
        sx={{
          py: 0,
        }}
      >
        <ListItemIcon sx={{ minWidth: "30px" }}>
          <AttachMoneyTwoToneIcon />
        </ListItemIcon>
        <ListItemText sx={listItemTextStyle}>
          <AccordionSummary
            expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.MuiAccordionSummary-root": {
                p: 0,
                border: "none",
              },
              "&.MuiButtonBase-root": {
                border: "none",
                py: 0,
              },
            }}
          >
            Payment
          </AccordionSummary>
        </ListItemText>
      </ListItemButton>
      <AccordionDetails sx={accordionDetails}>
        <Link href={"/admin-dashboard/payment/b2cPayment"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="B2C Payment"
              />
            </ListItemButton>
          </a>
        </Link>

        <Link href={"/admin-dashboard/payment/b2cPaidList"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="B2C Paidlist"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/payment/unpaidVendor"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Unpaid Vendor"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/payment/failedPayment"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Failed V. Payment"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/payment/paidVendor"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Paid Vendor"
              />
            </ListItemButton>
          </a>
        </Link>
      </AccordionDetails>
    </Accordion>
    {/* ================================================ */}
    <Accordion sx={accordionStyle}>
      <ListItemButton
        sx={{
          py: 0,
        }}
      >
        <ListItemIcon sx={{ minWidth: "30px" }}>
          <AttachMoneyTwoToneIcon />
        </ListItemIcon>
        <ListItemText sx={listItemTextStyle}>
          <AccordionSummary
            expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.MuiAccordionSummary-root": {
                p: 0,
                border: "none",
              },
              "&.MuiButtonBase-root": {
                border: "none",
                py: 0,
              },
            }}
          >
            Refund
          </AccordionSummary>
        </ListItemText>
      </ListItemButton>
      <AccordionDetails sx={accordionDetails}>
        <Link href={"/admin-dashboard/payment/refund"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText sx={accordionistItemTextStyle} primary="Refund" />
            </ListItemButton>
          </a>
        </Link>
      </AccordionDetails>
    </Accordion>
    {/* Fifth section ends here */}
    {/* Sixth section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      COMPANIES & EMPLOYEES
    </ListSubheader>
    <Link href={"/admin-dashboard/company-employee/companies"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ContentCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Companies" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/designations/"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ContentCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Designation" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/create-employee"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Add New Employee" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/employee-list"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Employee" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/salary-list/"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Emp. Salary" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/paid-salary/"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Paid Emp. Salary" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/idcard-generate"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="ID Card Generate" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/idcard-list"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="ID Card List" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/employee/group-list"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="ID Card Group" />
        </ListItemButton>
      </a>
    </Link>
    {/* Sixth section ends here */}

    {/* Seventh section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      Vat/Gst
    </ListSubheader>
    <Link href={"/admin-dashboard/vat-gst/vat-list"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="VAT/GST List" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/vat-gst/create-vat"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Add New Vat" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/vat-gst/select"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Select" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/vat-gst/unpaid"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Unpaid" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/vat-gst/paid"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Paid" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/vat-gst/countryPermissions"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Country Permissions" />
        </ListItemButton>
      </a>
    </Link>
    {/*Seventh section ends here */}
    {/*Eighth section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      Tax
    </ListSubheader>
    <Link href={"/admin-dashboard/tax/tax-list"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Add New Tax" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/tax/unpaidTax"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Unpaid Tax" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/tax/paidTax"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Paid Tax" />
        </ListItemButton>
      </a>
    </Link>
    <Link href={"/admin-dashboard/tax/selectTax"}>
      <a>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle} primary="Select Tax" />
        </ListItemButton>
      </a>
    </Link>
    {/*Eighth section ends here */}

    {/*Nineth section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      Media & info
    </ListSubheader>
    <div>
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Notifications
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/notifications"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Notification"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <WebOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Notice
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/notice/notices"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="All Notices Slider"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/notice/add-notice"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Notice Slider"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <PhotoOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Media
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/media/addHeadline"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Headline"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/media/allHeadline"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="All Headline"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/media/addLogo"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Logo"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Sliders
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/sliders/sliderList"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Slider List"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/sliders/addSlider"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Slider"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <SettingsOutlined />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Con. Slider Setting
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link
            href={"/admin-dashboard/media-info/consumer-setting/rootConsumer"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Root Consumer"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/media-info/consumer-setting/incentiveWise"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Incentive-wise"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/media-info/consumer-setting/countryWise"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Country-wise"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/media-info/consumer-setting/allConsumer"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="All Consumers"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/consumer-setting/reset"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Reset All"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <CommentOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Comments
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/comments/"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Comments"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============================ */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Messages
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/media-info/messages/messages"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Messages"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/media-info/messages/bulkMail"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Bulk Mail"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>



      {/* ============== End of marketing polilicies ============== */}
    </div>
    {/*Nineth section ends here */}
    {/*Tenth section starts here */}
    <ListSubheader component="div" inset sx={listSubHeaderStyle}>
      Footer
    </ListSubheader>
    {/* =============accordion start=========== */}
    <Accordion sx={accordionStyle}>
      <ListItemButton
        sx={{
          py: 0,
        }}
      >
        <ListItemIcon sx={{ minWidth: "30px" }}>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText sx={listItemTextStyle}>
          <AccordionSummary
            expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.MuiAccordionSummary-root": {
                p: 0,
                border: "none",
              },
              "&.MuiButtonBase-root": {
                border: "none",
                py: 0,
              },
            }}
          >
            Footer Contents
          </AccordionSummary>
        </ListItemText>
      </ListItemButton>
      <AccordionDetails sx={accordionDetails}>
        <Link href={"/admin-dashboard/footer/footerLinks"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Footer Links"
              />
            </ListItemButton>
          </a>
        </Link>

        <Link href={"/admin-dashboard/footer/addFooterLinks"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Add Footer Links"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/footerVideo"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Footer Video"
              />
            </ListItemButton>
          </a>
        </Link>
        {/* <Link href={"/admin-dashboard/footer/goalsManage"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Goals Manage"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/marketingPolicy"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Marketing Policy"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/commissionInfo"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Commission Info"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/incentiveInfo"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Incentive Info"
              />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/QA"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText sx={accordionistItemTextStyle} primary="Q & A" />
            </ListItemButton>
          </a>
        </Link>
        <Link href={"/admin-dashboard/footer/QAList"}>
          <a>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ChevronRightTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                sx={accordionistItemTextStyle}
                primary="Q & A List"
              />
            </ListItemButton>
          </a>
        </Link> */}
      </AccordionDetails>
    </Accordion>

     {/* ============Terms and Condition main ============ */}

      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Terms & Conditions
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/footer/terms"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Terms & Conditions all"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/footer/terms/addTerms"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Terms & Conditions"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>

    {/* ============== Terms and Condition public============== */}
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Terms & Conditions Public
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/others/termsCondition"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Public Terms & Conditions"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/footer/terms-public/addPublicterms"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Public Terms & Conditions"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* ============== Marketing policies ============== */}
       <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Marketing Policies
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/footer/Marketing_Policy"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Marketing polices lists"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/footer/Marketing_Policy/add"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Marketing policies Add"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>

      {/* =================== Commision Info ================= */ }
    
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Commision Info
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/footer/Commision"}>
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Commision lists"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link
            href={"/admin-dashboard/footer/Commision/add"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Commsion List"
                />
              </ListItemButton>
            </a>
          </Link>
        </AccordionDetails>
      </Accordion>
      {/* =================== Setting info ================= */ }
    
      <Accordion sx={accordionStyle}>
        <ListItemButton
          sx={{
            py: 0,
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <ChatBubbleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyle}>
            <AccordionSummary
              expandIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.MuiAccordionSummary-root": {
                  p: 0,
                  border: "none",
                },
                "&.MuiButtonBase-root": {
                  border: "none",
                  py: 0,
                },
              }}
            >
              Site Setting
            </AccordionSummary>
          </ListItemText>
        </ListItemButton>
        <AccordionDetails sx={accordionDetails}>
          <Link href={"/admin-dashboard/footer/site-setting/sortFooter"}>
       
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Sort Footer Design"
                />
              </ListItemButton>
            </a>
          </Link>
          <Link href={"/admin-dashboard/footer/site-setting/footerTopContent"}>
       
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Footer Top Content"
                />
              </ListItemButton>
            </a>
          </Link>
          {/* <Link
            href={"/admin-dashboard/footer/Commision/add"}
          >
            <a>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={accordionistItemTextStyle}
                  primary="Add Commsion List"
                />
              </ListItemButton>
            </a>
          </Link> */}
        </AccordionDetails>
      </Accordion>





    {/*Tenth section ends here */}
  </>
);
//This adminListItems is used in admin dashboard only...
