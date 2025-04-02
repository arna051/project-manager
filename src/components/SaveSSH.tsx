import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { ISSH } from "@/elements/SSH"
import { saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    ssh?: ISSH | null
    sshs: ISSH[]
    onSaved?: (ssh: ISSH) => any
}

const initial = {
    title: "",
    server: "",
    proxy: false,
    id: 0
}

export const schema = z.object({
    title: z.string(),
    server: z.string(),
    proxy: z.boolean(),
    id: z.number().optional(),
})
export function SSHSave({ ssh, sshs, onSaved, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(data => {
        const temp = [...sshs];
        if (ssh?.id) {
            const index = temp.findIndex(x => x.id === ssh.id);
            if (index < 0) return toast.error("Could not find the SSH!")
            temp[index] = data;
        } else {
            if (sshs.find(x => x.id === data.id)) {
                data.id = sshs.reduce((t, c) => t + c.id, 1)
            }
            temp.push(data)
            onSaved?.(data)
        }
        saveConfig("ssh", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const load = () => {
        const object: Record<string, any> = ssh || { ...initial, id: sshs.reduce((t, c) => t + c.id, 1) };

        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, ssh?.id])
    return <ConfigDialog onSubmit={onSubmit} {...props} title="Save Note">
        <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap={2}>
                <Field.Text
                    name="title"
                    fullWidth
                    label="Title"
                />
                <Field.Text
                    name="server"
                    fullWidth
                    label="Server"
                />
                <Field.Switch
                    name="proxy"
                    label="Proxy"
                />
            </Stack>
        </Form>
    </ConfigDialog>
}