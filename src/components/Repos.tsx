"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getConfig } from "@/utils/electron";
import { Repo } from "@/elements/Repo";
import { useRouter } from "next/navigation";


export function Repos() {

    const router = useRouter();
    const [items, setItems] = useState<any[]>([])

    const [projects, setCategories] = useState<any[]>([])


    const load = async () => {
        const temp = await getConfig("repos", [])
        const cats = await getConfig("projects-contracts", []);
        setCategories(cats)
        setItems(temp)
    }

    function renderItem(item: any) {
        const project = projects.find(x => x.id === item.projectId);
        let label = item.title;
        if (project) label = `${project.title} ${label}`;
        return <Repo
            {...item}
            title={label}
            key={label}
        />
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <Container maxWidth="lg" className="wrapper">
            <Title
                title="Repos"
                subtitle="All Repositories You're Working On, Are Being Listed Here."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12.5 3.5l-4 14m-2-5l-4-4l4-4m8 12l4-4l-4-4" strokeWidth={1}></path></svg>
                }
                onConfig={() => router.push("/projects")}
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
