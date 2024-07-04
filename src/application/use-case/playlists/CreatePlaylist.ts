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
    playlist: IPlaylists,
    message?: string
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
            if (!title || !description || !artistId) {
                return normalizationResponse.notFound('Playlist settings')
            }

            const findUniqueArtist = await this.artistsRepository.findUnique({
                id: artistId
            })

            if (!findUniqueArtist) {
                return normalizationResponse.conflict('Artist does not exist')
            }

            let validMusicIds: string[] = []
            let invalidMusicIds: string[] = []

            if (musicIds !== null) {
                for (const musicId of musicIds) {
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

            const createPlaylist = await this.playlistsRepository.create({
                data: {
                    title,
                    description,
                    artistId,
                    musicIds: validMusicIds
                }
            })

            let message = ''
            if (invalidMusicIds.length > 0) {
                message = `The following music IDs do not exist and were not added: ${invalidMusicIds.join(', ')}.`
            }

            for (const musicId of validMusicIds) {
                await this.playlistsRepository.addPlaylistMusics({
                    musicId,
                    playlistId: createPlaylist.id
                });
            }


            return normalizationResponse.ok({ playlist: createPlaylist, message })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export { CreatePlaylist }
