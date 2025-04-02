"use client";

import { Field, Form } from "@/elements/hook-form";
import { useBoolean } from "@/hooks/useBoolean";
import { ISettings } from "@/type";
import { getConfig, saveConfig } from "@/utils/electron";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const schema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    background: z.string().optional(),
    welcome: z.string().optional()
})

export default function Settings() {
    const open = useBoolean();

    const router = useRouter();
    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            image: "",
            background: "",
            welcome: ""
        }
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(data => {
        saveConfig("settings", data);
        toast.success("ok! changes have been saved!");
        router.refresh()
    }) as any

    const load = async () => {
        const temp = await getConfig<ISettings>("settings", {})

        Object.keys(temp).forEach(key => {
            methods.setValue(key, (temp as any)[key])
        });
    }

    useEffect(() => {
        load()
    }, [open.value])
    return <Container sx={{ my: 12, py: 4 }} maxWidth="lg">

        <Stack direction="row" alignItems="center" gap={2}>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)" strokeWidth={1}><path strokeWidth={0.933} d="M7.5.5q.527 0 1.034.076l.508 1.539c.445.127.868.308 1.26.536l1.46-.704c.517.397.977.865 1.365 1.389l-.73 1.447q.333.596.514 1.27l1.53.533a7 7 0 0 1-.017 1.948l-1.539.508a5.6 5.6 0 0 1-.536 1.26l.704 1.46a7 7 0 0 1-1.389 1.365l-1.447-.73a5.5 5.5 0 0 1-1.27.514l-.533 1.53a7 7 0 0 1-1.948-.017l-.508-1.539a5.6 5.6 0 0 1-1.26-.536l-1.46.704a7 7 0 0 1-1.365-1.389l.73-1.447a5.6 5.6 0 0 1-.514-1.27l-1.53-.534a7 7 0 0 1 .017-1.947l1.539-.508c.127-.445.308-.868.536-1.26l-.704-1.46a7 7 0 0 1 1.389-1.365l1.447.73a5.5 5.5 0 0 1 1.27-.514l.534-1.53Q7.036.5 7.5.5"></path><circle cx={7.5} cy={7.5} r={3}></circle></g></svg>

            <Stack>
                <Typography variant="h4">
                    Settings
                </Typography>
                <Typography variant="subtitle2">
                    Customize The Application.
                </Typography>
            </Stack>
        </Stack>


        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={2} sx={{ my: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name="name" label="Name" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name="image" label="Avatar" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name="welcome" label="Welcome Text" fullWidth />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Field.Text name="background" label="Background Video" fullWidth />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        size="large"
                        variant="contained"
                        fullWidth
                        onClick={onSubmit}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Form>

    </Container>
}