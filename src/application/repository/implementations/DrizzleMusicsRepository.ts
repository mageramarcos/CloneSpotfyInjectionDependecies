import { drizzleClient } from 'src/db/drizzle'
import { Musics } from 'src/db/schema'
import { IMusics } from 'src/application/entities/IMusics';
import { CreateParams, CreateResponse, MusicsRepository, FindManyParams, FindManyResponse, FindUniqueParams, FindUniqueResponse, UpdateParams, UpdateResponse, DeleteParams, FindByArtistIdParams, FindByArtistIdResponse } from "../musics/MusicsRepository";
import { eq } from 'drizzle-orm'

class DrizzleMusicsRepository implements MusicsRepository {

    async create({ data }: CreateParams): Promise<CreateResponse> {

        const { title, description, artistId } = data

        return await drizzleClient
            .insert(Musics)
            .values({
                title,
                description,
                artistId
            })
            .returning()
            .then(([musics]) => musics)
    }

    async findMany({ }: FindManyParams): Promise<FindManyResponse> {

        return await drizzleClient
            .select()
            .from(Musics)
    }

    async findUnique({ id }: FindUniqueParams): Promise<FindUniqueResponse> {
        return await drizzleClient
            .select()
            .from(Musics)
            .where(eq(Musics.id, id))
            .then(([musics]) => musics)
    }

    async update({ id, data }: UpdateParams): Promise<UpdateResponse> {
        return await drizzleClient
            .update(Musics)
            .set({
                ...data
            })
            .where(eq(Musics.id, id))
            .returning()
            .then(([musics]) => musics)
    }

    async delete({ id }: DeleteParams): Promise<IMusics> {

        return await drizzleClient
            .delete(Musics)
            .where(eq(Musics.id, id))
            .returning()
            .then(([musics]) => musics)

    }

    async findByArtistId({ artistId }: FindByArtistIdParams): Promise<FindByArtistIdResponse> {

        return await drizzleClient
            .select()
            .from(Musics)
            .where(eq(Musics.artistId, artistId))
            .then(([musics]) => musics)
    }
}

export {
    DrizzleMusicsRepository
}