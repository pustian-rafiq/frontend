import { Divider, Typography } from "@mui/material";
import Title from "../../components/Header/Title";

const Commision = () => {
  return (
    <div>
      <Title>Commision</Title>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{
          color: "#45b9e0",
          textAlign: {xs:'left',sm:'center'},
          mt:'50px',
          ml:{xs:'40px',sm:'0px'}
        }}
      >
        Our Commission
      </Typography>

      {/* some basic style using for commision  */}

      <style jsx>
        {`
          li {
            padding: 12px 10px;
            border: 1px solid #f3f3f3;
            margin-left:'15px'
          }

          li:hover {
            color: #45b9e0;
            transition: 0.5s;
          }

          @media only screen and (max-width: 600px) {
            li{
              font-size:14px!important;
               margin-left:0px
            }
          }
        `}
      </style>

      <ul style={{ listStyle: "none" }}>
        <li>Purchase Commission</li>
        <li>Reference Commission</li>
        <li>Allocation for marginal consumers</li>
        <li>Allocated for mid-level consumers</li>
        <li>Allocated for area-based maximum purchase holders per day</li>
        <li>Gifts from area best sellers</li>
        <li>11 categories of incentives</li>
        <li>Travel for incentive holders</li>
        <Divider sx={{ m: "20px" }} />
      </ul>

      <nav aria-label="secondary mailbox folders"></nav>
    </div>
  );
};

export default Commision;
