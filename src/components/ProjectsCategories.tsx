"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Container, Skeleton, TextField } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { z } from "zod";
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "@/utils/electron";
import { Category, ICategory } from "@/elements/Category";
import { CategorySave } from "./CategorySave";


export const schema = z.object({
    configs: z.array(z.object({
        title: z.string(),
        image: z.string().optional(),
        desc: z.string().optional()
    }))
});

export function ProjectsCategories() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([]);

    const [search, setSearch] = useState("");

    const [edit, setEdit] = useState<ICategory | null>(null)

    function handleDelete(index: number) {
        saveConfig("projects", items.filter((_, i) => i !== index));
        load()
    }

    function handleEdit(category: ICategory) {
        setEdit(category);
        open.onTrue();
    }

    const load = async () => {
        const temp = await getConfig("projects", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [open.value])

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Work Category"
                subtitle="Projects By Category Prepared For You!"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5h2l2.5-6l2 12l3-9l2.095 6l1.405-3h2" strokeWidth={1}></path></svg>
                }
                onConfig={open.onTrue}
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
                            items
                                .filter(x => new RegExp(search, 'i').test(x.title))
                                .map((item, i) => <Category
                                    {...item}
                                    key={item.title}
                                    onDelete={() => handleDelete(i)}
                                    onEdit={() => handleEdit({ ...item, index: i })}
                                    link={`/projects?category=${item.title}`}
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
            <CategorySave
                open={open.value}
                onClose={open.onFalse}
                categories={items}
                category={edit}
            />
        </Container >
    );
}
