"use client";

import { TodoSave } from "@/components/SaveTodo";
import { IProject } from "@/elements/Project";
import { ITodo, TodoTask } from "@/elements/Todo";
import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, saveConfig } from "@/utils/electron";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Todo() {
    const open = useBoolean();
    const [items, setItems] = useState<ITodo[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState<ITodo | null>(null);

    function handleDelete(id: number) {
        saveConfig("todo", items.filter(x => x.id !== id));
        load()
    }

    function handleEdit(item: ITodo) {
        setEdit(item);
        open.onTrue();
    }

    const load = async () => {
        const temp = await getConfig("todo", [])
        setItems(temp)

        const proj = await getConfig("projects-contracts", []);
        setProjects(proj)
    }

    useEffect(() => {
        load()
    }, [open.value])
    return <Container sx={{ my: 12, py: 4 }} maxWidth="md">

        <Stack direction="row" alignItems="center" gap={2}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>

            <Stack>
                <Typography variant="h4">
                    Todo
                </Typography>
                <Typography variant="subtitle2">
                    The Jobs you must get done!
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
                New Todo
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
                        <TodoTask {...item} key={item.title + i} onDelete={() => handleDelete(item.id)} onEdit={() => handleEdit(item)} />
                    </Grid>
                    )
            }
        </Grid>


        <TodoSave
            projects={projects}
            todos={items}
            open={open.value}
            todo={edit}
            onClose={() => {
                open.onFalse()
                setEdit(null);
            }}
        />
    </Container>
}