"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getConfig } from "@/utils/electron";
import { useRouter } from "next/navigation";
import { Note } from "@/elements/Note";


export function Notes() {

    const router = useRouter()

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState("")

    const load = async () => {
        const temp = await getConfig("notes", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Notes"
                subtitle="The things you wanted to be remember in the future."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M6.5 4.5h7l3 3v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2"></path><path d="M8.5 12.5h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1m-1-5h2v2h-2z"></path></g></svg>
                }
                onConfig={() => router.push("/notes")}
            />

            <Box className="section">
                <Swipe height={230}>
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
                            items.reverse()
                                .filter(x => new RegExp(search, 'i').test(x.title) || new RegExp(search, 'i').test(x.desc))
                                .map(item => <Note {...item} key={item.title} />)
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
