import { ICategory } from "@/elements/Category"
import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { IProject } from "@/elements/Project"
import { RHFServers } from "@/elements/Servers"
import { saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    project?: IProject | null
    projects: IProject[]
    categories: ICategory[]
}

const initial = {
    title: "",
    image: "",
    desc: "",
    id: 0,
    category: ""
}
export const schema = z.object({
    id: z.number(),
    title: z.string(),
    image: z.string().optional(),
    desc: z.string().optional(),
    category: z.string(),
    servers: z.array(z.number()).optional()
});
export function ProjectSave({ project, projects, categories, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit, control } = methods;

    const onSubmit = handleSubmit(data => {
        const temp = [...projects];
        if (project?.id) {
            const index = temp.findIndex(x => x.id === project.id);
            if (index < 0) return toast.error("Could not find the project!")
            temp[index] = data;
        } else {
            if (projects.find(x => x.id === data.id)) {
                data.id = projects.reduce((t, c) => t + c.id, 1)
            }
            temp.push(data)
        }
        saveConfig("projects-contracts", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const { id } = methods.watch();

    const load = () => {
        const object: Record<string, any> = project || { ...initial, id: projects.length + 10 }
        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, project?.id])
    return <ConfigDialog onSubmit={onSubmit} {...props} title="Save Project">
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
                />
                <Field.Select
                    name="category"
                    fullWidth
                    label="Category"
                    children={
                        categories.map(cat => <MenuItem key={cat.title} value={cat.title}>{cat.title}</MenuItem>)
                    }
                />
                <RHFServers name="servers" parentId={id} />
            </Stack>
        </Form>
    </ConfigDialog>
}