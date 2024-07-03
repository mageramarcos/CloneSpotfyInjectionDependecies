import { PlaylistsRepository } from 'src/application/repository/playlists/PlaylistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IPlaylists } from 'src/application/entities/IPlaylists'
import { ArtistsRepository } from 'src/application/repository/artists/ArtistsRepository'
import { MusicsRepository } from 'src/application/repository/musics/MusicsRepository'

type UpdatePlaylistRequest = {
    id: string
    data: Omit<IPlaylists,
        | 'id'
        | 'created_at'
        | 'updated_at'
    >
}
type T = UpdatePlaylistRequest
type UpdatePlaylistResponse = {
    playlist: IPlaylists
    message?: string
}
type K = UpdatePlaylistResponse

class UpdatePlaylist implements IUseCase<T, K> {
    constructor(
        private playlistsRepository: PlaylistsRepository,
        private artistsRepository: ArtistsRepository,
        private musicsRepository: MusicsRepository
    ) { }

    async execute({ id, data }: T): Promise<Response<K>> {
        try {

            if (!id || !data) {
                return normalizationResponse.notFound('Playlist settings')
            }

            const findUniquePlaylist = await this.playlistsRepository.findUnique({
                id
            })


            if (!findUniquePlaylist) {
                return normalizationResponse.notFound('Playlist not found')
            }


            const findUniqueArtist = await this.artistsRepository.findUnique({
                id: data.artistId
            })

            if (!findUniqueArtist) {
                return normalizationResponse.conflict('The artist does not own this playlist')
            }

            let validMusicIds: string[] = []
            let invalidMusicIds: string[] = []

            if (data.musicIds !== null) {
                for (const musicId of data.musicIds) {
                    const findUniqueMusic = await this.musicsRepository.findUnique({
                        id: musicId
                    })

                    if (findUniqueMusic) {
                        validMusicIds.push(musicId)
                    } else {
                        invalidMusicIds.push(musicId)
                    }
                }
            }

            const updatePlaylist = await this.playlistsRepository.update({
                id,
                data: {
                    ...data,
                    musicIds: validMusicIds
                }
            })

            let message = ''
            if (invalidMusicIds.length > 0) {
                message = `The following music IDs do not exist and were not added: ${invalidMusicIds.join(', ')}.`
            }

            return normalizationResponse.ok({ playlist: updatePlaylist, message })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }

}

export {
    UpdatePlaylist
}
