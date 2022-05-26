import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Title from '../../../components/Header/Title';

const intensiveAcrichevs = () => {
    const router = useRouter();
    
    return (
        <> 
          <Title>Incentives</Title>
            <Box>
                This is intensives pages ,,,, name is not publichedd  index
            </Box>
        </>
    );
};

export default intensiveAcrichevs;