import { IArtists } from "../../entities/IArtists"

// Create
type CreateParams = {
    data: Omit<IArtists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type CreateResponse = IArtists

// Find many
type FindManyParams = {}

type FindManyResponse = IArtists[]


// Find unique
type FindUniqueParams = {
    id: string,
}

type FindUniqueResponse = IArtists | null

// // Update
type UpdateParams = {
    id: string
    data: Omit<IArtists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}

type UpdateResponse = IArtists



// Delete
type DeleteParams = {
    id: string
}

// Find by email
type FindByEmailParams = {
    email: string
}

type FindByEmailResponse = IArtists | null



interface ArtistsRepository {
    create(params: CreateParams): Promise<CreateResponse>
    findMany(params: FindManyParams): Promise<FindManyResponse>
    findUnique(params: FindUniqueParams): Promise<FindUniqueResponse>
    update(params: UpdateParams): Promise<UpdateResponse>
    delete(params: DeleteParams): Promise<IArtists>
    findByEmail(params: FindByEmailParams): Promise<FindByEmailResponse>


}

export {
    ArtistsRepository,
    CreateParams,
    CreateResponse,
    FindManyParams,
    FindManyResponse,
    FindUniqueParams,
    FindUniqueResponse,
    UpdateParams,
    UpdateResponse,
    DeleteParams,
    FindByEmailParams,
    FindByEmailResponse
}

