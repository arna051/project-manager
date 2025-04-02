"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, TextField } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { useEffect, useState } from "react";
import { getConfig } from "@/utils/electron";
import { SSH } from "@/elements/SSH";




export function SSHTunnels() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState("")




    const load = async () => {
        const temp = await getConfig("ssh", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [open.value])

    return (
        <Container maxWidth="lg" className="wrapper">
            <Title
                title="SSH Tunnels"
                subtitle="Your Servers SSH Connections are Bing Listed Here."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M2.5 14.5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2" strokeWidth={1}></path><path fill="currentColor" d="M6.5 13.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 8.494l.01-2a2 2 0 0 1 2-1.994H16.5a2 2 0 0 1 1.994 1.85l.006.156l-.01 2a2 2 0 0 1-2 1.994H4.5a2 2 0 0 1-1.995-1.85z" strokeWidth={1}></path><path fill="currentColor" d="M6.5 7.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path></g></svg>
                }
                onConfig={open.onTrue}
            />
            <Box className="section">
                <Swipe height={60}>
                    {
                        items
                            .filter(x => new RegExp(search, 'i').test(x.title))
                            .map((item: any) => <SSH
                                key={item.command + item.title}
                                {...item}
                            />)
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
