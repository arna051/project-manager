"use client";

import { NoteSave } from "@/components/SaveNote";
import { INote, Note } from "@/elements/Note";
import { IProject } from "@/elements/Project";
import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, saveConfig } from "@/utils/electron";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Notes() {
    const open = useBoolean();
    const [items, setItems] = useState<INote[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState<INote | null>(null);

    function handleDelete(id: number) {
        saveConfig("notes", items.filter(x => x.id !== id));
        load()
    }

    function handleEdit(item: INote) {
        setEdit(item);
        open.onTrue();
    }

    const load = async () => {
        const temp = await getConfig("notes", [])
        setItems(temp)

        const proj = await getConfig("projects-contracts", []);
        setProjects(proj)
    }

    useEffect(() => {
        load()
    }, [open.value])
    return <Container sx={{ my: 12, py: 4 }} maxWidth="md">

        <Stack direction="row" alignItems="center" gap={2}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M6.5 4.5h7l3 3v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2"></path><path d="M8.5 12.5h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1m-1-5h2v2h-2z"></path></g></svg>

            <Stack>
                <Typography variant="h4">
                    Notes
                </Typography>
                <Typography variant="subtitle2">
                    The thing you need to remember!
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
                New Note
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
        </Stack>

        <Grid container spacing={1} sx={{ my: 4 }}>
            {
                items
                    .filter(x => {
                        const reg = new RegExp(search, 'i');
                        return (reg.test(x.title) || reg.test(x.desc))
                    })
                    .map((item, i) => <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                            md: 3
                        }}
                        key={item.id + item.title}
                    >
                        <Note {...item} key={item.title + i} onDelete={() => handleDelete(item.id)} onEdit={() => handleEdit(item)} />
                    </Grid>
                    )
            }
        </Grid>


        <NoteSave
            projects={projects}
            notes={items}
            open={open.value}
            note={edit}
            onClose={() => {
                open.onFalse()
                setEdit(null);
            }}
        />
    </Container>
}