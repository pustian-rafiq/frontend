import { Typography, Box, Container } from "@mui/material";
import useMaeketingPolics from "../../apolloClient/queries/marketingPolicy/marketing_policys";
import Title from "../../components/Header/Title";

const MarketingPolicy = ({ marketing_policies }) => {
  return (
    <Container maxWidth="lg">
      <Title>Our Marketing Policy</Title>
      <Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: "center",
            color: "#45b9e0",
            my:'20px'
          }}
        >
          Our Marketing Policy
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{ lineHeight: "25px", m: "15px 0px 40px 0px" }}
        >
          We know that you care how information about you is used and shared,
          and we appreciate your trust that we will do so carefully and
          sensibly. This Privacy Notice describes how ehsanmarketing.com collect
          and process your personal information through Ehsan Marketing
          websites, devices, products, services, online and physical stores, and
          applications that reference this Privacy Notice. By using Ehsan
          Marketing Services, you are consenting to the practices described in
          this Privacy Notice.
        </Typography>
      </Box>

      {marketing_policies?.data?.marketingPolicies?.edges?.map((policy) => (
        <Box key={policy?.node?.id}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{
              color: "#45b9e0",
            }}
          >
            {policy?.node?.title}
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component="div"
            sx={{ 
            lineHeight: "25px", 
            m: "15px 0px 40px 0px",
            fontSize:{md:'13px',lg:'14px',sm:'12px',xs:'12px'},
            textAlign:{xs:'justify'}

           }}
          >

            {policy?.node?.description}
          </Typography>
        </Box>
      ))}

     
    </Container>
  );
};

export const getStaticProps = async () => {
  const marketing_policies = await useMaeketingPolics();

  return {
    props: {
      marketing_policies,
    },
  };
};

export default MarketingPolicy;
