import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/HeroSection/megamenu.module.css'

const Megamenu = ({sidebar}) => {

return (
        
<Box style={{display:'flex'}} >  
  <Box className={styles.navbar}>
  
  <Box className={styles.dropdown} >


   
    <Typography 
    className={styles.dropbtn} 
    variant="body2"
    component="span" 
    > 
      {/* show the name of the category  */}
        {sidebar?.node?.name} 
    </Typography>


    {/* </Link> */}
    <Box className={styles.dropdown_content} >  
      <Box className={styles.row}>
  
        
          {
                sidebar?.node?.subcategories?.edges.map(subcat =>
                <Box key={subcat?.node?.id} >
                <Link href={`category/subCategory/${subcat?.node?.name}`}> 
                 <Typography variant='body2' 
                 sx={{
                   textAlign:'justify',
                   color:'#000',
                   fontWeight:'bold',
                    '&:hover': {
                            color: "var(--primary-deep)",
                            cursor:'pointer',
                            transition:'all 0.25s linear'
                          },
                  
                        
                 }}

                 component="div"
               
                 > 
                 
             
                    
                    {subcat?.node?.name}
                   
                </Typography>
               </Link>
                   


                 {
                   subcat?.node?.subsubcategories?.edges?.map(subsubcat=>  <li key={subsubcat?.node?.id} style={{listStyle:'none',padding:'1px 0px'}}>
                    <Link href={`category/subCategory/subSubCategory/${subsubcat?.node?.name}`}> 
                    <Typography 
                      
                      sx={{
                        color:'#000',
                        letterSpacing:'0.4px',
                        listStyle:'none',
                        fontSize:'13px',
                         '&:hover': {
                            color: "var(--primary)",
                            cursor:'pointer',
                            transition:'all 0.25s linear'
                          },
                            
                        }}
                        component="span"
                        >
                          
                             {subsubcat?.node?.name} 
                          
                    </Typography>
                    </Link>
                    </li>
                    )
                 }                
              
                </Box>             
        )

          }

      </Box>
    </Box>
  </Box> 


</Box>

</Box>
    );
};

export default Megamenu;