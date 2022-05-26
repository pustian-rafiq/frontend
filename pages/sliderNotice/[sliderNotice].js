import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';



import { useQuery } from '@apollo/client';
import { GET_SLIDER_NOTICE } from '../../apolloClient/queries/sliderNotice/sliderNotice';

import Link from 'next/link';
import Title from '../../components/Header/Title';



const  sliderNotice= () => {
    const router = useRouter()
    const sliderNoticeId = router.query.sliderNotice;
   
      const {data,loading,error}=useQuery(GET_SLIDER_NOTICE);
      if(loading) return <p>Notice Data is Loading ...</p>
  
    
    return (
        
<> 
<Title>Slider Notice</Title>



    <Box
        sx={{
          backgroundImage: "url('/images/svg/notification-containerbg.svg')",
          height: "80vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment:'fixed',

          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
       
      <Box sx={{
          height:'170px',
          backgroundColor:'#fff',
          width:'460px',
          border:'1px solid blue',

      }}>

          <Box sx={{position:'relative',p:'10px',height:'160px'}} id="noticeSlider">
              <img 
                    src="/images/svg/megaphone.svg" 
                    alt="megaphone"  
                    width="80" style={{    
                    top: '-38px',
                    position: 'absolute',
                    left: '39%',
                    
                    }}
                />

                {
                    data?.sliderNotifications?.edges?.map(notice=>notice?.node?.id === sliderNoticeId &&  <Box  sx={{textAlign:'center'}} key={notice?.node?.id}>
                        <Typography variant='body1' component="div" sx={{
                            pt:'45px',
                            fontWeight:'500',
                       
                        }}>
                            {notice?.node?.title}
                        </Typography>
                                         
                          <Link href={notice?.node?.link} passHref>
                            <Box style={{
                                marginTop:'10px',
                                fontSize:'13px',
                                cursor:'pointer'
                            }}> {notice?.node?.link} </Box> 
                          </Link>                       
                    </Box>                       
                   )
                }
          </Box>        
      </Box>

    </Box>
</>
    );
};



export default sliderNotice;



              