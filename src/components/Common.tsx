"use client";

import { Swipe } from "@/elements/Swipe";
import { Title } from "@/elements/Title";
import { Box, Button, Container, Stack } from "@mui/material";
import { GridItem } from "./GridItem";
import { useBoolean } from "@/hooks/useBoolean";
import { ConfigDialog } from "@/elements/ConfigDialog";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "@/utils/electron";
import { Field, Form } from "@/elements/hook-form";


export const schema = z.object({
    configs: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        command: z.string(),
    }))
});

export function CommonApps() {

    const open = useBoolean();

    const [items, setItems] = useState<any[]>([])

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
        saveConfig("common", data.configs)
    })

    const load = async () => {
        const temp = await getConfig("common", [])
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
                title="Common Apps"
                subtitle="Most used app suggested by you"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 21 21">
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M10 9h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1m0-4h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m4 4h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1m0-4h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m0 8h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1m-4 0h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1M6 9h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1m0-4h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m0 8h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1"
                        />
                    </svg>
                }
                onConfig={open.onTrue}
            />

            <Box className="section">
                <Swipe>
                    <GridItem
                        icon="/icons/chrome.png"
                        title="Chrome"
                        command="google-chrome"
                    />
                    <GridItem
                        icon="/icons/vscode.png"
                        title="Vscode"
                        command="code"
                    />
                    {
                        items.map((item: any) => <GridItem
                            icon={`/file${item.icon}`}
                            title={item.title}
                            command={item.command}
                            key={item.command + item.title}
                        />)
                    }
                </Swipe>
            </Box>
            <ConfigDialog open={open.value} onClose={open.onFalse} onSubmit={onSubmit}>
                <Form methods={methods} onSubmit={onSubmit}>
                    {fields.map((keyword, index) => (
                        <Stack key={keyword.id} alignItems="center" gap={1} sx={{ py: 2 }}>
                            <Stack direction="row" gap={1} sx={{ width: '100%' }}>
                                <Field.Text
                                    name={`configs.${index}.icon`}
                                    fullWidth
                                    label="Icon"
                                />
                                <Field.Text
                                    name={`configs.${index}.title`}
                                    fullWidth
                                    label="Title"
                                />
                            </Stack>
                            <Stack direction="row" gap={1} sx={{ width: '100%' }}>
                                <Field.Text
                                    name={`configs.${index}.command`}
                                    fullWidth
                                    label="Command"
                                />
                                <Button variant="outlined" color="error" onClick={() => remove(index)}>Delete</Button>
                            </Stack>
                        </Stack>
                    ))}
                    <Button variant="contained" onClick={() => append({
                        icon: "",
                        title: "",
                        command: ""
                    })} size="large" fullWidth sx={{ my: 4 }}>Add New App</Button>
                </Form>
            </ConfigDialog>
        </Container >
    );
}
