import { ConfigDialog } from "@/elements/ConfigDialog"
import { Field, Form } from "@/elements/hook-form"
import { IProject } from "@/elements/Project"
import { IRepo } from "@/elements/Repo"
import { saveConfig } from "@/utils/electron"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogProps, MenuItem, Stack } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type Props = {
    repo?: IRepo | null
    projects: IProject[]
    repos: IRepo[]
    defaultProject?: number
}

const initial = {
    id: 1,
    title: "",
    path: "",
    deploy: "",
    projectId: 0
}

export const schema = z.object({
    id: z.number(),
    title: z.string(),
    path: z.string(),
    projectId: z.number(),
    deploy: z.string().min(0).optional()
})
export function RepoSave({ repo, projects, repos, defaultProject, ...props }: Props & DialogProps) {

    const methods = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: initial
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(data => {
        const temp = [...repos];
        if (repo?.id) {
            const index = temp.findIndex(x => x.id === repo.id);
            if (index < 0) return toast.error("Could not find the Note!")
            temp[index] = data;
        } else {
            if (repos.find(x => x.id === data.id)) {
                data.id = repos.reduce((t, c) => t + c.id, 1)
            }
            temp.push(data)
        }
        saveConfig("repos", temp);
        props.onClose?.({}, "escapeKeyDown")
    }) as any

    const load = () => {
        const object: Record<string, any> = repo || { ...initial, id: repos.length + 10, projectId: defaultProject };

        Object.keys(object).forEach(key => {
            methods.setValue(key, object[key])
        });
    }

    useEffect(load, [props.open, repo?.id])
    return <ConfigDialog onSubmit={onSubmit} {...props} title="Save Note">
        <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap={2}>
                <Field.Text
                    name="title"
                    fullWidth
                    label="Title"
                />
                <Field.Text
                    name="path"
                    fullWidth
                    label="Path"
                />
                <Field.Text
                    name="deploy"
                    fullWidth
                    label="Deploy Script"
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