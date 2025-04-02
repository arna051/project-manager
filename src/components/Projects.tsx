"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, Skeleton, TextField } from "@mui/material";
import { z } from "zod";
import { useEffect, useState } from "react";
import { getConfig } from "@/utils/electron";
import { Project } from "@/elements/Project";
import { useRouter } from "next/navigation";


export const schema = z.object({
    configs: z.array(z.object({
        id: z.number(),
        title: z.string(),
        image: z.string().optional(),
        desc: z.string().optional(),
        category: z.string(),
        servers: z.array(z.number()).optional()
    }))
});

export function Projects() {

    const router = useRouter()


    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState("")

    const load = async () => {
        const temp = await getConfig("projects-contracts", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Projects"
                subtitle="List Of All Your Working Projects."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>
                }
                onConfig={() => router.push("/projects")}
            />

            <Box className="section">
                <Swipe height={210}>
                    {
                        items.length === 0 ?
                            new Array(13).fill(13).map((_, i) => <Skeleton
                                variant="rounded"
                                width={200}
                                height={200}
                                key={i}
                                animation="wave"
                                sx={{ m: 1 }}
                            />)
                            :
                            items
                                .filter(x => new RegExp(search, 'i').test(x.title))
                                .map(item => <Project {...item} key={item.id} />)
                    }
                </Swipe>

                <Box sx={{ m: 2 }}>
                    <TextField
                        variant="standard"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        label="Search"
                        placeholder="Search in projects..."
                    />
                </Box>
            </Box>
        </Container >
    );
}
