interface IPlaylists {
    id: string
    title: string
    description: string
    artistId: string
    musicIds: string[]
    createdAt?: Date
    updatedAt?: Date
}

export {
    IPlaylists
}