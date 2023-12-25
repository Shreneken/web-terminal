type directory = {
    name: string,
    files: file[],
    children: directory[],
    parent: directory | null,
    modifiable: boolean,
    path: string,
}

type file = {
    name: string,
    content: string,
    parent: directory | null,
    modifiable: boolean,
    path: string,
}

export { directory, file };