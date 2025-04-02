"use client";

import { SSHSave } from "@/components/SaveSSH";
import { ISSH, SSH } from "@/elements/SSH";
import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, saveConfig } from "@/utils/electron";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function SSHPage() {
    const open = useBoolean();
    const [items, setItems] = useState<ISSH[]>([]);
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState<ISSH | null>(null);

    function handleDelete(id: number) {
        saveConfig("ssh", items.filter(x => x.id !== id));
        load()
    }

    function handleEdit(item: ISSH) {
        setEdit(item);
        open.onTrue();
    }

    const load = async () => {
        const temp = await getConfig("ssh", [])
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [open.value])
    return <Container sx={{ my: 12, py: 4 }} maxWidth="lg">

        <Stack direction="row" alignItems="center" gap={2}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M2.5 14.5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2" strokeWidth={1}></path><path fill="currentColor" d="M6.5 13.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 8.494l.01-2a2 2 0 0 1 2-1.994H16.5a2 2 0 0 1 1.994 1.85l.006.156l-.01 2a2 2 0 0 1-2 1.994H4.5a2 2 0 0 1-1.995-1.85z" strokeWidth={1}></path><path fill="currentColor" d="M6.5 7.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path></g></svg>

            <Stack>
                <Typography variant="h4">
                    Servers
                </Typography>
                <Typography variant="subtitle2">
                    All the ssh connections you have!
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
                New Server
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

        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2} sx={{ my: 4 }}>
            {
                items
                    .filter(x => {
                        const reg = new RegExp(search, 'i');
                        return (reg.test(x.title) || reg.test(x.server))
                    })
                    .map((item, i) => <SSH
                        {...item}
                        key={item.title + i}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => handleEdit(item)}
                    />
                    )
            }
        </Stack>


        <SSHSave
            sshs={items}
            open={open.value}
            ssh={edit}
            onClose={() => {
                open.onFalse()
                setEdit(null);
            }}
        />
    </Container>
}