import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Link from "next/link";

const ResponsiveSubCategory = ({ category }) => {
  //fetch the category,sub Category

  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange2 = (panel2) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel2 : false);
  };

  if (category.loading) return <p>loading</p>;

  return (
    <>
      <Box
        sx={{
          display: { md: "none", sm: "block" },
          backgroundColor: "gray",
          border: "1px solid green",
          padding: "15px",
        }}
      >
        {category?.data?.categories?.edges?.map((maincategory) => (
          <Accordion
            expanded={expanded === `${maincategory?.node?.id}`}
            onChange={handleChange(maincategory?.node?.id)}
            key={maincategory?.node?.id}
          >
            <Link href={`category/${maincategory?.node?.name}`} > 
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
               
                <Typography
                  sx={{
                    width: "50%",
                    flexShrink: 0,
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                > 
                
                  {maincategory?.node?.name}
            
                </Typography>
              </AccordionSummary>
            </Link>
            <AccordionDetails>
              {/* see the another accordian from sub category  */}
              {maincategory?.node?.subcategories?.edges?.map((subcat) => (
                <Accordion
                  expanded={expanded2 === `${subcat?.node?.id}`}
                  onChange={handleChange2(subcat?.node?.id)}
                  key={subcat?.node?.id}
                >
                  {/* subcategory Link  */}
                  <Link href={`subCategory/${subcat?.node?.name}`}> 
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {subcat?.node?.name}
                    </Typography>
                  </AccordionSummary>
                 </Link>

                  {/* subsubcategory Link  */}

                  <AccordionDetails>
                    {subcat?.node?.subsubcategories?.edges.map((subsubcat) => (<Box key={subsubcat?.node?.id}> 
                       <Link href={`/subSubCategory/${subsubcat?.node?.name}`} passHref> 
                      <Typography variant="body2" style={{ color: "gray" }}
                      
                      >
                        {subsubcat?.node?.name}
                      </Typography>
                      </Link>
                      </Box>
                    ))}
                  </AccordionDetails>

                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default ResponsiveSubCategory;
