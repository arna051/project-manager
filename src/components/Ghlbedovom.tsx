"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { run } from "@/utils/electron";
import { fCurrency } from "@/utils/number";


export function GhalbedovomNews() {


    const [items, setItems] = useState<any[]>([])


    function load() {
        axios.get("/ghalbedovom")
            .then(res => {
                setItems(res.data.response.data)
            })
            .catch(() => {
                toast.warning("Cannot get Updates from ghalbedovom Project at The Moment.")
            })
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="ghlbedovom.com Updated"
                subtitle="The ghlbedovom Project Latest Products."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2m-2 0a8 8 0 0 0-8-8m5 8a5 5 0 0 0-5-5m2 5a2 2 0 0 0-2-2" strokeWidth={1}></path></svg>
                }
            />

            < Box className="section" >
                <Swipe height={400}>
                    {
                        items.length === 0 ?
                            new Array(13).fill(13).map((_, i) => <Skeleton
                                variant="rounded"
                                width={200}
                                height={370}
                                key={i}
                                animation="wave"
                                sx={{ m: 1 }}
                            />)
                            :
                            items.map(item => <Card
                                key={item._id}
                                sx={{
                                    m: 1,
                                    width: 200,
                                    height: 370,
                                    position: 'relative',
                                    bgcolor: 'common.white',
                                    color: 'common.black'
                                }}>
                                {
                                    item.image ? <CardMedia
                                        component="img"
                                        alt={item.title}
                                        image={`/ghalbedovom/image/${item.image}`}
                                        sx={{
                                            width: '100%',
                                            aspectRatio: '1/1',
                                        }}
                                    /> :
                                        <Skeleton
                                            width="100%"
                                            height={100}
                                            variant="rounded"
                                        />
                                }
                                <CardContent sx={{ direction: 'rtl', height: 50 }}>
                                    <Typography variant="subtitle2">{item.title}</Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body1" fontWeight="bold" color="warning.dark">{fCurrency(item.buyPrice)} Toman</Typography>
                                    <Typography variant="body1" fontWeight="bold" color="success.dark">{fCurrency(item.price)} Toman</Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        position: 'absolute',
                                        bgcolor: 'common.white',
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                >
                                    <Button size="small" sx={{ color: 'info.dark' }} onClick={() => run(`google-chrome (https://ghlbedovom.com/store/${item.id})`)}>
                                        Checkout
                                    </Button>
                                </CardActions>
                            </Card>)
                    }
                </Swipe>
            </Box >
        </Container >
    );
}
