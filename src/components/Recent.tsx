"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Chip, Container, Skeleton, Stack, Typography } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { useEffect, useState } from "react";
import { run } from "@/utils/electron";
import { Recent } from "@/utils/recent";


export function RecentRepos() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        setItems(Recent.get())
        const interval = setInterval(() => {
            setItems(Recent.get())
        }, 1e3 * 3);

        return () => clearInterval(interval)
    }, [])

    function renderItem(item: any) {
        return <Chip
            variant="filled"
            label={
                <Stack direction="row" alignItems="center" gap={1}>
                    <Box className="blob" />
                    <Typography>
                        {item.title}
                    </Typography>
                </Stack>
            }
            key={item.title}
            size="medium"
            sx={{ minWidth: 100, mx: 1 }}
            onClick={() => {
                run(`code (${item.path})`);
                Recent.set({ ...item })
            }}
        />
    }

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Hot Repos"
                subtitle="Recently Repositories You Were Working On!"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M11.5 4.565h-2a6 6 0 0 0-6 6V12.5a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-1.935a6 6 0 0 0-6-6m3.032-1.068c.884-.639 2.089-.71 2.968.003c.906.734 1.258 1.96.822 2.969M6.532 3.544C5.642 2.862 4.4 2.77 3.5 3.5c-.906.734-1.258 1.96-.822 2.97"></path><path d="M10.5 7.5v4H14M5 17l-2 2m13-2l2 2"></path></g></svg>
                }
                onConfig={open.onTrue}
            />

            <Box className="section">

                <Swipe>
                    {
                        items.length === 0 ?
                            new Array(13).fill(13).map((_, i) => <Skeleton
                                variant="rounded"
                                width={100}
                                height={32}
                                key={i}
                                animation="wave"
                                sx={{ m: 1 }}
                            />)
                            :
                            items.map(renderItem)
                    }
                </Swipe>
            </Box>
        </Container >
    );
}
