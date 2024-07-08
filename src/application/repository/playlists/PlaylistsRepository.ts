import { IPlaylists } from "src/application/entities/IPlaylists"
import { IPlaylistMusics } from "src/application/entities/IPlaylistMusics"

// Create
type CreateParams = {
    data: Omit<IPlaylists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type CreateResponse = IPlaylists

// Find many
type FindManyParams = {}

type FindManyResponse = IPlaylists[]

// Find unique
type FindUniqueParams = {
    id: string,
}

type FindUniqueResponse = IPlaylists | null

// Update
type UpdateParams = {
    id: string
    data: Omit<IPlaylists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type UpdateResponse = IPlaylists

// Delete
type DeleteParams = {
    id: string
}

// Find by ArtistId
type FindByArtistIdParams = {
    artistId: string
}

type FindByArtistIdResponse = IPlaylists | null

// Add PlaylistMusics References
type AddPlaylistMusicsParams = {
    playlistId: string
    musicId: string
}

type AddPlaylistMusicsResponse = IPlaylistMusics | null

interface PlaylistsRepository {
    create(params: CreateParams): Promise<CreateResponse>
    findMany(params: FindManyParams): Promise<FindManyResponse>
    findUnique(params: FindUniqueParams): Promise<FindUniqueResponse>
    update(params: UpdateParams): Promise<UpdateResponse>
    delete(params: DeleteParams): Promise<IPlaylists>
    findByArtistId(params: FindByArtistIdParams): Promise<FindByArtistIdResponse>
    addPlaylistMusics(params: AddPlaylistMusicsParams): Promise<AddPlaylistMusicsResponse>
}

export {
    PlaylistsRepository,
    CreateParams,
    CreateResponse,
    FindManyParams,
    FindManyResponse,
    FindUniqueParams,
    FindUniqueResponse,
    UpdateParams,
    UpdateResponse,
    DeleteParams,
    FindByArtistIdParams,
    FindByArtistIdResponse,
    AddPlaylistMusicsParams,
    AddPlaylistMusicsResponse
}