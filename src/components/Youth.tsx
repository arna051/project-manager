"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { run } from "@/utils/electron";


export function YouthNews() {


    const [items, setItems] = useState<any[]>([])


    function load() {
        axios.get("/youth")
            .then(res => {
                setItems(res.data.response.data)
            })
            .catch(() => {
                toast.warning("Cannot get Updates from Youth Project at The Moment.")
            })
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Youth Updates"
                subtitle="The Ahmed Al-Hasan's Youth Latest Articles."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2m-2 0a8 8 0 0 0-8-8m5 8a5 5 0 0 0-5-5m2 5a2 2 0 0 0-2-2" strokeWidth={1}></path></svg>
                }
            />

            < Box className="section" >
                <Swipe height={350}>
                    {
                        items.length === 0 ?
                            new Array(13).fill(13).map((_, i) => <Skeleton
                                variant="rounded"
                                width={200}
                                height={300}
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
                                    height: 300,
                                    position: 'relative'
                                }}>
                                {
                                    item.image ? <CardMedia
                                        component="img"
                                        alt={item.title}
                                        image={`/youth/image/${item.image}`}
                                        sx={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            opacity: .4
                                        }}
                                    /> :
                                        <Skeleton
                                            width="100%"
                                            height={100}
                                            variant="rounded"
                                        />
                                }
                                <CardContent sx={{ direction: 'rtl' }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">{item.description}</Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        position: 'absolute',
                                        bgcolor: 'background.paper',
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                >
                                    <Button onClick={() => run(`google-chrome (https://ahmedalhasan.me/d/${item.type}/${item.latinTitle})`)}>
                                        Read More
                                    </Button>
                                </CardActions>
                            </Card>)
                    }
                </Swipe>
            </Box >
        </Container >
    );
}
