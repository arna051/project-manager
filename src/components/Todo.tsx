"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getConfig } from "@/utils/electron";
import { TodoTask } from "@/elements/Todo";
import { useRouter } from "next/navigation";


export function Todo() {

    const router = useRouter()

    const [items, setItems] = useState<any[]>([])

    const [search, setSearch] = useState("")

    const load = async () => {
        const temp = await getConfig("todo", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <Container maxWidth="lg" className="wrapper">
            <Title
                title="Todo"
                subtitle="The Jobs You Must Get Done!"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.5 2.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2m-2 4h16" strokeWidth={1}></path><g fill="currentColor" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={12.5} r={1}></circle></g></g></svg>
                }
                onConfig={() => router.push("/todo")}
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
                            items.reverse()
                                .filter(x => new RegExp(search, 'i').test(x.title))
                                .map(item => <TodoTask {...item} key={item.title} />)
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
