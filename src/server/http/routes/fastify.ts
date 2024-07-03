import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { applyUseCase } from "../../middlewares/apply_use_case"
import { createArtist, deleteArtist, getUniqueArtist, listArtists, updateArtist, loginArtist } from "src/application/use-case/artists"
import { authenticate } from "src/server/middlewares/authenticate_artist"
import { createMusic, deleteMusic, getUniqueMusic, listMusics, updateMusic } from 'src/application/use-case/musics';
import { createPlaylist, deletePlaylist, getUniquePlaylist, listPlaylist, updatePlaylist } from 'src/application/use-case/playlists';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {


    // Artists

    fastify.post('/login', applyUseCase(loginArtist))
    fastify.post('/artists', applyUseCase(createArtist))


    fastify.register(async (instance, opts) => {
        instance.addHook('preHandler', authenticate)

        instance.get('/artists', applyUseCase(listArtists))
        instance.get('/artists/:id', applyUseCase(getUniqueArtist))
        instance.patch('/artists/:id', applyUseCase(updateArtist, { separate_body: true, param_key: 'id' }))
        instance.delete('/artists/:id', applyUseCase(deleteArtist))

        // Musics

        instance.post('/musics', applyUseCase(createMusic))
        instance.get('/musics', applyUseCase(listMusics))
        instance.get('/musics/:id', applyUseCase(getUniqueMusic))
        instance.patch('/musics/:id', applyUseCase(updateMusic, { separate_body: true, param_key: 'id' }))
        instance.delete('/musics/:id', applyUseCase(deleteMusic))

        // Playlists
        instance.post('/playlists', applyUseCase(createPlaylist))
        instance.get('/playlists', applyUseCase(listPlaylist))
        instance.get('/playlists/:id', applyUseCase(getUniquePlaylist))
        instance.patch('/playlists/:id', applyUseCase(updatePlaylist, { separate_body: true, param_key: 'id' }))
        instance.delete('/playlists/:id', applyUseCase(deletePlaylist))



    })
}