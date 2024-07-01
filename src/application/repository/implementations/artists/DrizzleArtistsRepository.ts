import { drizzleClient } from 'src/db/drizzle'
import { Artists } from 'src/db/schema'
import { IArtists } from 'src/application/entities/IArtists'
import { CreateParams, CreateResponse, ArtistsRepository, FindManyParams, FindManyResponse, FindUniqueParams, FindUniqueResponse, UpdateParams, UpdateResponse, DeleteParams, FindByEmailParams, FindByEmailResponse } from "../../artists/ArtistsRepository";
import { eq } from 'drizzle-orm'

class DrizzleArtistsRepository implements ArtistsRepository {

    async create({ data }: CreateParams): Promise<CreateResponse> {

        const { name, email, password } = data

        return await drizzleClient
            .insert(Artists)
            .values({

                name,
                email,
                password

            })
            .returning()
            .then(([artists]) => artists)
    }

    async findMany({ }: FindManyParams): Promise<FindManyResponse> {

        return await drizzleClient
            .select()
            .from(Artists)


    }

    async findUnique({ id }: FindUniqueParams): Promise<FindUniqueResponse> {
        return await drizzleClient
            .select()
            .from(Artists)
            .where(eq(Artists.id, id))
            .then(([artists]) => artists)
    }

    async update({ id, data }: UpdateParams): Promise<UpdateResponse> {
        return await drizzleClient
            .update(Artists)
            .set({
                ...data
            })
            .where(eq(Artists.id, id))
            .returning()
            .then(([artists]) => artists)
    }

    async delete({ id }: DeleteParams): Promise<IArtists> {

        return await drizzleClient
            .delete(Artists)
            .where(eq(Artists.id, id))
            .returning()
            .then(([artists]) => artists)

    }

    async findByEmail({ email }: FindByEmailParams): Promise<FindByEmailResponse> {

        return await drizzleClient
            .select()
            .from(Artists)
            .where(eq(Artists.email, email))
            .then(([artists]) => artists)
    }


}

export {
    DrizzleArtistsRepository
}