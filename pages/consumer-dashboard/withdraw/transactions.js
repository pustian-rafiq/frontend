import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TransactionForm from "../../../components/Dashboard/Withdraw/TransactionForm";
import withConsumerAuth from "../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";

const Transactions = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <div>
        <Box
          sx={{ width: "100%" }}
          style={open ? { display: "block" } : { display: "none" }}
        >
          <Alert
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon
                  fontSize="inherit"
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </IconButton>
            }
            sx={{ mb: 2 }}
            variant="filled"
            severity="warning"
          >
            You have required 10% purchase commission to withdraw money.
          </Alert>
        </Box>
        <TransactionForm />
      </div>
    </>
  );
};

export default withConsumerAuth(Transactions);

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
