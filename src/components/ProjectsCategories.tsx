"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Container, Skeleton, Stack, TextField } from "@mui/material";
import { useBoolean } from "@/hooks/useBoolean";
import { ConfigDialog } from "@/elements/ConfigDialog";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "@/utils/electron";
import { Field, Form } from "@/elements/hook-form";
import { toast } from "sonner";
import { Category } from "@/elements/Category";


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

    const [search, setSearch] = useState("")


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
        const titles: string[] = data.configs.map((x: any) => x.title)
        if (titles.some((x, i) => titles.filter((_, o) => i !== o).includes(x))) return toast.error("cannot create duplicated category")
        saveConfig("projects", data.configs)
    })

    const load = async () => {
        const temp = await getConfig("projects", [])

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
                title="Work Category"
                subtitle="Projects By Category Prepared For You!"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5h2l2.5-6l2 12l3-9l2.095 6l1.405-3h2" strokeWidth={1}></path></svg>
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
                                .map(item => <Category {...item} key={item.title} />)
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
                            <Button fullWidth variant="outlined" color="error" onClick={() => remove(index)}>Delete</Button>
                        </Stack>
                    ))}
                    <Button variant="contained" onClick={() => append({
                        title: "",
                        image: "",
                        desc: ""
                    })} size="large" fullWidth sx={{ my: 4 }}>Add New Category</Button>
                </Form>
            </ConfigDialog>
        </Container >
    );
}
