

type Arg = {
    title: string
    path: string
    projectId: string
    deploy: string
}
function getRecent(): Arg[] {
    const store = localStorage.getItem("recent");

    if (store) {
        try {
            return JSON.parse(store)
        }
        catch { }
    }

    return []
}

function addRecent(...recent: Arg[]) {
    const store = getRecent().filter(x => !recent.some(y => y.path === x.path));
    store.unshift(...recent);
    localStorage.setItem("recent", JSON.stringify(store.slice(0, 7)))
}


export const Recent = {
    set: addRecent,
    get: getRecent
}