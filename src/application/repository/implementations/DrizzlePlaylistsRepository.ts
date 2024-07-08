import { drizzleClient } from 'src/db/drizzle'
import { Playlists, PlaylistMusics, Artists, Musics } from 'src/db/schema';
import { IPlaylists } from 'src/application/entities/IPlaylists';
import { CreateParams, CreateResponse, PlaylistsRepository, FindManyParams, FindManyResponse, FindUniqueParams, FindUniqueResponse, UpdateParams, UpdateResponse, DeleteParams, FindByArtistIdParams, FindByArtistIdResponse, AddPlaylistMusicsParams, AddPlaylistMusicsResponse } from "../playlists/PlaylistsRepository";
import { eq } from 'drizzle-orm'

class DrizzlePlaylistsRepository implements PlaylistsRepository {

    async create({ data }: CreateParams): Promise<CreateResponse> {

        const { title, description, artistId, musicIds } = data

        return await drizzleClient
            .insert(Playlists)
            .values({
                title,
                description,
                artistId
            })
            .returning()
            .then(([playlists]) => playlists)
    }

    async findMany({ }: FindManyParams): Promise<FindManyResponse> {

        return await drizzleClient
            .query.Playlists.findMany()

    }

    async findUnique({ id }: FindUniqueParams): Promise<FindUniqueResponse> {


        return await drizzleClient
            .query.Playlists.findFirst({
                where: eq(Playlists.id, id),
                with: {
                    artist: {
                        columns: {
                            name: true,
                            id: true
                        }
                    },
                    musics: {
                        with: {
                            music: {
                                columns: {
                                    title: true,
                                    description: true
                                },
                                with: {
                                    artist: {
                                        columns: {
                                            name: true,
                                            id: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }) || null
    }

    async update({ id, data }: UpdateParams): Promise<UpdateResponse> {
        return await drizzleClient
            .update(Playlists)
            .set({
                ...data
            })
            .where(eq(Playlists.id, id))
            .returning()
            .then(([playlists]) => playlists)
    }

    async delete({ id }: DeleteParams): Promise<IPlaylists> {

        return await drizzleClient
            .delete(Playlists)
            .where(eq(Playlists.id, id))
            .returning()
            .then(([playlists]) => playlists)

    }

    async findByArtistId({ artistId }: FindByArtistIdParams): Promise<FindByArtistIdResponse> {

        return await drizzleClient
            .select()
            .from(Playlists)
            .where(eq(Playlists.artistId, artistId))
            .then(([playlists]) => playlists)
    }

    async addPlaylistMusics({ musicId, playlistId }: AddPlaylistMusicsParams): Promise<AddPlaylistMusicsResponse> {


        return await drizzleClient
            .insert(PlaylistMusics)
            .values({
                playlistId,
                musicId
            })
            .returning()
            .then(([playlistMusics]) => playlistMusics)
    }
}

export {
    DrizzlePlaylistsRepository
}