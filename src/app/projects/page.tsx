"use client";

import { ProjectSave } from "@/components/ProjectSave";
import { ICategory } from "@/elements/Category";
import { IProject, Project } from "@/elements/Project";
import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, saveConfig } from "@/utils/electron";
import { Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Projects() {
    const searchParams = useSearchParams(); // Used to read query params
    const filter = searchParams?.get('category') || 'all';
    const open = useBoolean();
    const [items, setItems] = useState<IProject[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [edit, setEdit] = useState<IProject | null>(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>(filter)

    function handleDelete(id: number) {
        saveConfig("projects-contracts", items.filter(x => x.id !== id));
        load()
    }

    function handleEdit(project: IProject) {
        setEdit(project);
        open.onTrue();
    }

    const load = async () => {
        const temp = await getConfig("projects-contracts", [])
        const cats = await getConfig("projects", []);

        setCategories(cats)
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [open.value])
    return <Container sx={{ my: 12, py: 4 }} maxWidth="lg">

        <Stack direction="row" alignItems="center" gap={2}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>

            <Stack>
                <Typography variant="h4">
                    Projects
                </Typography>
                <Typography variant="subtitle2">
                    Welcome Back! Happy Coding.
                </Typography>
            </Stack>

            <Box sx={{ flex: '1 1 auto' }} />

            <Button
                endIcon={<svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m8.499 5.5l-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm6 0l-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm-6 6l-2 .003a1 1 0 0 0-1 1V14.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1v-1.996a1 1 0 0 0-.884-.994zm5.001 0v4m2-2h-4" strokeWidth={1}></path></svg>}
                variant="contained"
                color="primary"
                size="large"
                onClick={open.onTrue}
            >
                New Project
            </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1, p: 1 }}>
            <TextField
                value={search}
                onChange={e => setSearch(e.target.value)}
                label="Search"
                placeholder="Search for project..."
                variant="standard"
            />

            <Select label="Category" value={category} onChange={e => setCategory(e.target.value)} variant="standard" sx={{ minWidth: 150 }}>
                <MenuItem value="all">All</MenuItem>
                {
                    categories.map(cat => <MenuItem key={cat.title} value={cat.title}>{cat.title}</MenuItem>)
                }
            </Select>
        </Stack>

        <Grid container spacing={1} sx={{ my: 4 }} component="div" className="bring-wrapper">
            {
                items
                    .filter(x => {
                        const reg = new RegExp(search, 'i');
                        const sameCat = category === 'all' || category === x.category;
                        return (reg.test(x.title) || reg.test(x.desc)) && sameCat
                    })
                    .map(item => <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                            md: 3
                        }}
                        key={item.id + item.title}
                        sx={{ transformStyle: 'preserve-3d', perspective: 300 }}
                    >
                        <Project
                            {...item}
                            key={item.id}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => handleEdit(item)}
                            link={`/projects/${item.id}`}
                            sx={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </Grid>
                    )
            }
        </Grid>


        <ProjectSave
            categories={categories}
            projects={items}
            open={open.value}
            project={edit}
            onClose={() => {
                open.onFalse()
                setEdit(null);
            }}
        />
    </Container>
}