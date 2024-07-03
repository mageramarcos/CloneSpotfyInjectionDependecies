import { IMusics } from "src/application/entities/IMusics"

// Create
type CreateParams = {
    data: Omit<IMusics,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type CreateResponse = IMusics

// Find many
type FindManyParams = {}

type FindManyResponse = IMusics[]


// Find unique
type FindUniqueParams = {
    id: string,
}

type FindUniqueResponse = IMusics | null

// // Update
type UpdateParams = {
    id: string
    data: Omit<IMusics,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type UpdateResponse = IMusics



// Delete
type DeleteParams = {
    id: string
}

// Find by ArtistId
type FindByArtistIdParams = {
    artistId: string
}

type FindByArtistIdResponse = IMusics | null



interface MusicsRepository {
    create(params: CreateParams): Promise<CreateResponse>
    findMany(params: FindManyParams): Promise<FindManyResponse>
    findUnique(params: FindUniqueParams): Promise<FindUniqueResponse>
    update(params: UpdateParams): Promise<UpdateResponse>
    delete(params: DeleteParams): Promise<IMusics>
    findByArtistId(params: FindByArtistIdParams): Promise<FindByArtistIdResponse>


}

export {
    MusicsRepository,
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
    FindByArtistIdResponse
}

