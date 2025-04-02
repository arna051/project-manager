import { ICategory } from "@/elements/Category"
import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { IProject } from "@/elements/Project"
import { RHFServers } from "@/elements/Servers"
import { getConfig, saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    category?: ICategory | null
    categories: ICategory[]
}

const initial = {
    title: "",
    image: "",
    desc: ""
}
export const schema = z.object({
    title: z.string(),
    image: z.string().optional(),
    desc: z.string().optional()
});
export function CategorySave({ category, categories, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async data => {
        const temp = [...categories];
        if (category?.index) {
            const index = temp.findIndex((x, i) => i === category.index);
            if (index < 0) return toast.error("Could not find the Category!")
            temp[index] = data;
            const projects = await getConfig<IProject[]>("projects-contracts", []);
            for (let index = 0; index < projects.length; index++) {
                const element = projects[index];
                if (element.category === category.title) {
                    projects[index].category = data.title;
                }
            }
            saveConfig("projects-contracts", projects)
        } else {
            temp.push(data)
        }
        saveConfig("projects", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const load = () => {
        const object: Record<string, any> = category || { ...initial, id: categories.length + 10 }
        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, category?.index])
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
            </Stack>
        </Form>
    </ConfigDialog>
}