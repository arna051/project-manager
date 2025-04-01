"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Chip, Container, MenuItem, Skeleton, Stack } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { ConfigDialog } from "@/elements/ConfigDialog";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getConfig, run, saveConfig } from "@/utils/electron";
import { Field, Form } from "@/elements/hook-form";
import { Recent } from "@/utils/recent";
import { Repo } from "@/elements/Repo";


export const schema = z.object({
    configs: z.array(z.object({
        title: z.string(),
        path: z.string(),
        projectId: z.number(),
        deploy: z.string().min(0).optional()
    }))
});

export function Repos() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])

    const [projects, setCategories] = useState<any[]>([])


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
        saveConfig("repos", data.configs)
    })

    const load = async () => {
        const temp = await getConfig("repos", [])
        const cats = await getConfig("projects-contracts", []);

        setCategories(cats)

        const object: Record<string, any> = {
            configs: temp
        }
        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
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
    }, [open.value])

    return (
        <Container maxWidth="md" className="wrapper">
            <Title
                title="Repos"
                subtitle="All Repositories You're Working On, Are Being Listed Here."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12.5 3.5l-4 14m-2-5l-4-4l4-4m8 12l4-4l-4-4" strokeWidth={1}></path></svg>
                }
                onConfig={open.onTrue}
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
                                name={`configs.${index}.path`}
                                fullWidth
                                label="Path"
                            />
                            <Field.Select
                                name={`configs.${index}.projectId`}
                                fullWidth
                                label="Project"
                                children={
                                    projects.map(cat => <MenuItem key={cat.title} value={cat.id}>{cat.title}</MenuItem>)
                                }
                            />
                            <Field.Text
                                name={`configs.${index}.deploy`}
                                fullWidth
                                label="Deploy Script"
                                multiline
                                rows={5}
                            />
                            <Button fullWidth variant="outlined" color="error" onClick={() => remove(index)}>Delete</Button>
                        </Stack>
                    ))}
                    <Button variant="contained" onClick={() => append({
                        title: "",
                        path: "",
                        projectId: 0
                    })} size="large" fullWidth sx={{ my: 4 }}>Add New Repo</Button>
                </Form>
            </ConfigDialog>
        </Container >
    );
}
