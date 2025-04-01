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
import { TodoTask } from "@/elements/Todo";


export const schema = z.object({
    configs: z.array(z.object({
        title: z.string(),
        priority: z.number(),
        desc: z.string()
    }))
});

export function Todo() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])


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
        saveConfig("todo", data.configs)
    })

    const load = async () => {
        const temp = await getConfig("todo", [])

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
                title="Todo"
                subtitle="The Jobs You Must Get Done!"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.5 2.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2m-2 4h16" strokeWidth={1}></path><g fill="currentColor" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={12.5} r={1}></circle></g></g></svg>
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
                                .map(item => <TodoTask {...item} key={item.title} />)
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
                            <Field.Slider
                                name={`configs.${index}.priority`}
                                min={1}
                                max={5}

                            />
                            <Field.Text
                                name={`configs.${index}.desc`}
                                fullWidth
                                label="Description"
                                multiline
                                rows={5}
                            />
                            <Button fullWidth variant="outlined" color="error" onClick={() => remove(index)}>Delete</Button>
                        </Stack>
                    ))}
                    <Button variant="contained" onClick={() => append({
                        title: "",
                        priority: "",
                        desc: ""
                    })} size="large" fullWidth sx={{ my: 4 }}>Add Todo</Button>
                </Form>
            </ConfigDialog>
        </Container >
    );
}
