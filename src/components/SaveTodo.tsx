import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { IProject } from "@/elements/Project"
import { ITodo } from "@/elements/Todo"
import { saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    todo?: ITodo | null
    projects: IProject[]
    todos: ITodo[]
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
    priority: z.number(),
    desc: z.string(),
    image: z.string().optional(),
    projectId: z.number().optional(),
    id: z.number(),
})
export function TodoSave({ todo, projects, todos, defaultProject, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(data => {
        const temp = [...todos];
        if (todo?.id) {
            const index = temp.findIndex(x => x.id === todo.id);
            if (index < 0) return toast.error("Could not find the todo!")
            temp[index] = data;
        } else {
            if (todos.find(x => x.id === data.id)) {
                data.id = todos.reduce((t, c) => t + c.id, 1)
            }
            temp.push(data)
        }
        saveConfig("todo", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const load = () => {
        const object: Record<string, any> = todo || { ...initial, id: todos.length + 10, projectId: defaultProject };

        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, todo?.id])
    return <ConfigDialog onSubmit={onSubmit} {...props} title="Save Todo">
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
                <Field.Slider
                    name="priority"
                    min={1}
                    max={5}
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