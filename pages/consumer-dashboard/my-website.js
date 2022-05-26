import React from 'react'
import withConsumerAuth from '../../components/Dashboard/PrivateRoute/withConsumerAuth'
import getCookie from '../../utils/getCookie'
import getCurrentUser from '../../utils/getCurrentUser'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';
import { GET_SHOP_LIST } from '../../apolloClient/queries/ConsumerDashboard/shop/ShopQuery';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Skeleton } from '@mui/material';


const MyWebsite = ({ token }) => {

    const { data, error, loading } = useQuery(GET_SHOP_LIST, {
        context: {
            headers: {
                Authorization: `JWT ${token}`,
            },
        },
    });

    //Loading animation
    if (loading) {
        return <div>
            <Grid container spacing={1}>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width={280} height={200} />
                </Grid>
            </Grid>
        </div>
    }

    const shopList = data?.me?.consumers?.shops?.edges.map((row, index) => {
        return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 280, mt: 0 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={row.node.logo ? row.node.logo : "/images/wearhouse.jpeg"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '16px' }}>
                            {row.node.name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography> */}
                    </CardContent>
                    <CardActions>
                        <Typography sx={{
                            padding: '5px', textTransform: 'capitalize', background: '#45B9E0', color: '#fff',
                            ":hover": {
                                background: '#8EA4EF'
                            }
                        }}>
                            <Link href={{
                                pathname: `/shop/${row.node.slug}`,
                                query: {
                                    id: `${row.node.id}`
                                }

                            }}
                                as={`/shop/${row.node.slug}`}
                            >View Website
                            </Link>
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container spacing={2}>
                    {shopList}
                </Grid>
            </Box>
        </>
    )
}

export default withConsumerAuth(MyWebsite)

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