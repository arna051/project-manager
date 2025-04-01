"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Container, MenuItem, Skeleton, Stack, TextField } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { ConfigDialog } from "@/elements/ConfigDialog";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getConfig, run, saveConfig } from "@/utils/electron";
import { Field, Form } from "@/elements/hook-form";
import { Project } from "@/elements/Project";
import { RHFServers } from "@/elements/Servers";


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

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState("")

    const [categories, setCategories] = useState<any[]>([])


    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: {
            configs: []
        }
    });

    const { handleSubmit, control } = methods;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "configs",
    });

    const onSubmit = handleSubmit(data => {
        saveConfig("projects-contracts", data.configs.map((x: any) => {
            if (!x.servers) x.servers = [];
            return x;
        }))
    })

    const load = async () => {
        const temp = await getConfig("projects-contracts", [])
        const cats = await getConfig("projects", []);

        setCategories(cats)

        const object: Record<string, any> = {
            configs: temp
        }
        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
        setItems(temp)
    }

    useEffect(() => {
        load()
    }, [open.value])

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Projects"
                subtitle="List Of All Your Working Projects."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>
                }
                onConfig={open.onTrue}
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

            <ConfigDialog open={open.value} onClose={open.onFalse} onSubmit={onSubmit} maxWidth="md">
                <Form methods={methods} onSubmit={onSubmit}>
                    {fields.map((keyword, index) => (
                        <Stack key={keyword.id} alignItems="center" gap={1} sx={{ py: 2 }}>
                            <Field.Text
                                name={`configs.${index}.title`}
                                fullWidth
                                label="Title"
                            />
                            <Field.Text
                                name={`configs.${index}.image`}
                                fullWidth
                                label="Image"
                            />
                            <Field.Text
                                name={`configs.${index}.desc`}
                                fullWidth
                                label="Description"
                            />
                            <Field.Select
                                name={`configs.${index}.category`}
                                fullWidth
                                label="Category"
                                children={
                                    categories.map(cat => <MenuItem key={cat.title} value={cat.title}>{cat.title}</MenuItem>)
                                }
                            />
                            <RHFServers name={`configs.${index}.servers`} parentId={index} />
                            <Button fullWidth variant="outlined" color="error" onClick={() => remove(index)}>Delete</Button>
                        </Stack>
                    ))}
                    <Button variant="contained" onClick={() => append({
                        title: "",
                        image: "",
                        desc: "",
                        id: fields.length + 10,
                        category: ""
                    })} size="large" fullWidth sx={{ my: 4 }}>Add New Project</Button>
                </Form>
            </ConfigDialog>
        </Container >
    );
}
