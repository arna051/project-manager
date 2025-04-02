import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { INote } from "@/elements/Note"
import { IProject } from "@/elements/Project"
import { saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    note?: INote | null
    projects: IProject[]
    notes: INote[]
    defaultProject?: number
}

const initial = {
    title: "",
    priority: "",
    desc: "",
    image: ""
}

export const schema = z.object({
    title: z.string(),
    desc: z.string(),
    image: z.string().optional(),
    projectId: z.number().optional(),
    id: z.number(),
})
export function NoteSave({ note, projects, notes, defaultProject, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(data => {
        const temp = [...notes];
        if (note?.id) {
            const index = temp.findIndex(x => x.id === note.id);
            if (index < 0) return toast.error("Could not find the Note!")
            temp[index] = data;
        } else {
            if (notes.find(x => x.id === data.id)) {
                data.id = notes.reduce((t, c) => t + c.id, 1)
            }
            temp.push(data)
        }
        saveConfig("notes", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const load = () => {
        const object: Record<string, any> = note || { ...initial, id: notes.reduce((t, c) => t + c.id, 1), projectId: defaultProject };

        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, note?.id])
    return <ConfigDialog onSubmit={onSubmit} {...props} title="Save Note">
        <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap={2}>
                <Field.Text
                    name="title"
                    fullWidth
                    label="Title"
                />
                <Field.Text
                    name="image"
                    fullWidth
                    label="Image"
                />
                <Field.Text
                    name="desc"
                    fullWidth
                    label="Description"
                    multiline
                    rows={5}
                />
                {!defaultProject && <Field.Select
                    name="projectId"
                    fullWidth
                    label="Project"
                    children={
                        projects.map(cat => <MenuItem key={cat.title} value={cat.id}>{cat.title}</MenuItem>)
                    }
                />}
            </Stack>
        </Form>
    </ConfigDialog>
}