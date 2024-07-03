import { PlaylistsRepository } from 'src/application/repository/playlists/PlaylistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IPlaylists } from 'src/application/entities/IPlaylists'
import { ArtistsRepository } from 'src/application/repository/artists/ArtistsRepository'
import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'

type CreatePlaylistRequest = {
    title: string
    description: string
    artistId: string
    musicIds: string[] | null

}
type T = CreatePlaylistRequest
type CreatePlaylistResponse = {
    playlist: IPlaylists
}
type K = CreatePlaylistResponse

class CreatePlaylist implements IUseCase<T, K> {
    constructor(
        private playlistsRepository: PlaylistsRepository,
        private artistsRepository: ArtistsRepository,
        private musicsRepository: MusicsRepository
    ) { }

    async execute({ title, description, artistId, musicIds }: T): Promise<Response<K>> {
        try {
            if (!title || !description || !artistId || !artistId || !musicIds) {
                return normalizationResponse.notFound('Playlist settings')
            }

            const findUniqueArtist = await this.artistsRepository.findUnique({
                id: artistId
            })

            if (!findUniqueArtist) {
                return normalizationResponse.conflict('Artist does not exist')
            }

            const findUniqueMusic = await this.musicsRepository.findUnique({
                id:
                    musicIds[0]
            })


            if (!findUniqueMusic) {
                return normalizationResponse.conflict('Music not exist')
            }


            const createPlaylist = await this.playlistsRepository.create({
                data: {
                    title,
                    description,
                    artistId,
                    musicIds
                }
            })

            return normalizationResponse.ok({ playlist: createPlaylist })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }


}

export {
    CreatePlaylist
}