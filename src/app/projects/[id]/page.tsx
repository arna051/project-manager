"use client";

import { NoteSave } from "@/components/SaveNote";
import { RepoSave } from "@/components/SaveRepo";
import { SSHSave } from "@/components/SaveSSH";
import { TodoSave } from "@/components/SaveTodo";
import { INote, Note } from "@/elements/Note";
import { IProject } from "@/elements/Project";
import { IRepo, Repo } from "@/elements/Repo";
import { ISSH, SSH } from "@/elements/SSH";
import { Swipe } from "@/elements/Swipe";
import { ITodo, TodoTask } from "@/elements/Todo";
import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, run, saveConfig } from "@/utils/electron";
import { Recent } from "@/utils/recent";
import { Box, Button, Container, Divider, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";

export default function Projects({ params }: any) {
    const { id } = use<{ id: string }>(params)
    const [project, setProject] = useState<IProject>({} as any);
    const [repos, setRepos] = useState<IRepo[]>([]);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [notes, setNotes] = useState<INote[]>([]);
    const [sshs, setSshs] = useState<ISSH[]>([])
    const [search, setSearch] = useState('');

    const [noteOpen, todoOpen, repoOpen, sshOpen] = [useBoolean(), useBoolean(), useBoolean(), useBoolean()]
    const [editTodo, setEditTodo] = useState<ITodo | null>(null);
    const [editNote, setEditNote] = useState<INote | null>(null);
    const [editRepo, setEditRepo] = useState<IRepo | null>(null);
    const [editSSH, setEditSSH] = useState<ISSH | null>(null);


    const load = async () => {
        const temp = await getConfig<IProject[]>("projects-contracts", [])
        setProject((temp.find(x => x.id === Number(id)) || {}) as IProject);
        const repos = await getConfig("repos", []);
        setRepos(repos)
        const todo = await getConfig("todo", []);
        setTodos(todo)
        const notes = await getConfig("notes", []);
        setNotes(notes)
        const ssh = await getConfig("ssh", []);
        setSshs(ssh)
    }


    const projectRepos = repos.filter(x => x.projectId === Number(id))
    const projectNotes = notes.filter(x => x.projectId === Number(id))
    const projectTodos = todos.filter(x => x.projectId === Number(id))

    function handleDeleteRepo(id: number) {
        saveConfig("repos", repos.filter(x => x.id !== id));
        load()
    }

    function handleDeleteNote(id: number) {
        saveConfig("todo", notes.filter(x => x.id !== id));
        load()
    }

    function handleDeleteTodo(id: number) {
        saveConfig("todo", todos.filter(x => x.id !== id));
        load()
    }

    function handleDeleteServer(id: number) {
        saveConfig("ssh", sshs.filter(x => x.id !== id));
        load()
    }

    const allTodos = projectTodos
        .sort((a, b) => b.priority - a.priority)
        .reduce((t, c) => t + c.desc + "\n", "")
        .split("\n")
        .filter(line => {
            if (line.trim().length < 1) return false;
            const done = line.startsWith("+");
            const title = line.startsWith("##");
            const text = line.startsWith("#");

            const pending = !done && !title && !text;
            return pending;
        })



    function renderItem(item: any) {
        return <Repo
            {...item}
            key={item.path}
            onDelete={() => handleDeleteRepo(item.id)}
            onEdit={() => setEditRepo(item)}
        />
    }
    useEffect(() => {
        load()
    }, [id, noteOpen.value, todoOpen.value, repoOpen.value, sshOpen.value]);

    useEffect(() => {
        if (editNote) return noteOpen.onTrue();
        if (editTodo) return todoOpen.onTrue();
        if (editRepo) return repoOpen.onTrue();
        if (editSSH) return sshOpen.onTrue();
    }, [editNote, editTodo, editRepo, editSSH]);
    return <Container
        sx={{
            my: 12,
            py: 4,
        }}
        maxWidth="lg"
    >
        <Box
            sx={{
                position: 'relative',
                height: { xs: 200, sm: 350, md: 400, lg: 500 },
                p: 4
            }}
        >
            <Box
                component="img"
                src={project.image ? `/file/${project.image}` : '/project.jpg'}
                alt="image"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1
                }}
            />
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    bgcolor: 'background.default',
                    opacity: .7
                }}
            />

            <Stack direction="row" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>

                <Stack>
                    <Typography variant="h4">
                        {project.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {project.category}
                    </Typography>
                </Stack>

                <Box sx={{ flex: '1 1 auto' }} />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        projectRepos.forEach(repo => {
                            run(`code (${repo.path})`)
                            Recent.set(repo)
                        })
                    }}
                >
                    Open All
                </Button>
            </Stack>
            {!!allTodos.length && <Stack gap={.5} sx={{ my: 4 }}>
                <Typography variant="caption" fontWeight="bold">Jobs to do:</Typography>
                {
                    allTodos
                        .slice(0, 7)
                        .map(job => <Stack direction="row" alignItems="center" key={job} gap={2}>
                            <Box
                                sx={{
                                    color: 'warning.main',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"></path><rect width={2} height={7} x={11} y={6} fill="currentColor" rx={1}><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></rect><rect width={2} height={9} x={11} y={11} fill="currentColor" rx={1}><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></rect></svg>
                            </Box>
                            <Typography variant="caption">
                                {job}
                            </Typography>
                        </Stack>)
                }
            </Stack>}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    p: 4,
                    bottom: 0
                }}>
                <TextField
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    label="Search"
                    placeholder="Search for Repository..."
                    variant="standard"
                />
            </Stack>
        </Box>

        <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12.5 3.5l-4 14m-2-5l-4-4l4-4m8 12l4-4l-4-4" strokeWidth={1}></path></svg>

                <Typography variant="h6">Repositories</Typography>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button size="small" onClick={repoOpen.onTrue}>
                    New Repo
                </Button>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" sx={{ my: 2 }}>
                {
                    projectRepos
                        .filter(x => new RegExp(search, 'i').test(x.title))
                        .map(renderItem)
                }
            </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M2.5 14.5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2" strokeWidth={1}></path><path fill="currentColor" d="M6.5 13.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 8.494l.01-2a2 2 0 0 1 2-1.994H16.5a2 2 0 0 1 1.994 1.85l.006.156l-.01 2a2 2 0 0 1-2 1.994H4.5a2 2 0 0 1-1.995-1.85z" strokeWidth={1}></path><path fill="currentColor" d="M6.5 7.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path></g></svg>

                <Typography variant="h6">Servers</Typography>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button size="small" onClick={sshOpen.onTrue}>
                    New Server
                </Button>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" sx={{ my: 2 }}>
                {
                    project
                        .servers
                        ?.map(ssh => {
                            const server = sshs.find(x => x.id === ssh);
                            if (!server) return null;
                            return <SSH
                                key={ssh}
                                {...server}
                                onDelete={() => handleDeleteServer(ssh)}
                                onEdit={() => setEditSSH(server)}
                            />
                        })
                }
                {
                    project.servers?.length === 0 && <Typography variant="caption" color="text.secondary">Looks like a serverless Project!</Typography>
                }
            </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.5 2.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2m-2 4h16" strokeWidth={1}></path><g fill="currentColor" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={12.5} r={1}></circle></g></g></svg>

                <Typography variant="h6">Todo</Typography>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button size="small" onClick={todoOpen.onTrue}>
                    New Todo
                </Button>
            </Stack>
            <Swipe height={230}>
                {
                    projectTodos.length === 0 ?
                        new Array(13).fill(13).map((_, i) => <Skeleton
                            variant="rounded"
                            width={200}
                            height={200}
                            key={i}
                            animation="wave"
                            sx={{ m: 1 }}
                        />)
                        :
                        projectTodos
                            .reverse()
                            .filter(x => new RegExp(search, 'i').test(x.title))
                            .map(item => <TodoTask {...item} key={item.title} onEdit={() => setEditTodo(item)} onDelete={() => handleDeleteTodo(item.id)} />)
                }
            </Swipe>
        </Box>
        <Divider sx={{ my: 4 }} />

        <Box sx={{ my: 4 }}>
            <Stack direction="row" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M6.5 4.5h7l3 3v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2"></path><path d="M8.5 12.5h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1m-1-5h2v2h-2z"></path></g></svg>

                <Typography variant="h6">Notes</Typography>

                <Box sx={{ flex: '1 1 auto' }} />

                <Button size="small" onClick={noteOpen.onTrue}>
                    New Note
                </Button>
            </Stack>
            <Swipe height={230}>
                {
                    projectNotes.length === 0 ?
                        new Array(13).fill(13).map((_, i) => <Skeleton
                            variant="rounded"
                            width={200}
                            height={200}
                            key={i}
                            animation="wave"
                            sx={{ m: 1 }}
                        />)
                        :
                        projectNotes
                            .reverse()
                            .filter(x => new RegExp(search, 'i').test(x.title))
                            .map(item => <Note {...item} key={item.title} onEdit={() => setEditNote(item)} onDelete={() => handleDeleteNote(item.id)} />)
                }
            </Swipe>
        </Box>
        <TodoSave
            open={todoOpen.value}
            projects={[project]}
            todos={todos}
            todo={editTodo}
            onClose={() => {
                setEditTodo(null);
                todoOpen.onFalse()
            }}
            defaultProject={project.id}
        />
        <NoteSave
            open={noteOpen.value}
            projects={[project]}
            notes={notes}
            note={editNote}
            onClose={() => {
                setEditNote(null)
                noteOpen.onFalse()
            }}
            defaultProject={project.id}
        />
        <RepoSave
            open={repoOpen.value}
            projects={[project]}
            repos={repos}
            repo={editRepo}
            onClose={() => {
                setEditRepo(null);
                repoOpen.onFalse()
            }}
            defaultProject={project.id}
        />

        <SSHSave
            sshs={sshs}
            open={sshOpen.value}
            ssh={editSSH}
            onClose={() => {
                sshOpen.onFalse()
                setEditSSH(null);
            }}
            onSaved={async newSsh => {
                const projects = await getConfig<IProject[]>("projects-contracts", [])
                const index = projects.findIndex(x => x.id === project.id);
                if (index < 0) return;
                projects[index].servers.push(newSsh.id)
                saveConfig("projects-contracts", projects);
                load()
            }}
        />

    </Container>
}