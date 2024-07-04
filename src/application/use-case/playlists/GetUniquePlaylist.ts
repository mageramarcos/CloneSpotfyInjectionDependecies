import { PlaylistsRepository } from 'src/application/repository/playlists/PlaylistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IPlaylists } from 'src/application/entities/IPlaylists'

type GetUniquePlaylistRequest = {
    id: string
}
type T = GetUniquePlaylistRequest
type GetUniquePlaylistResponse = {
    playlist: IPlaylists | null | {}
}
type K = GetUniquePlaylistResponse

class GetUniquePlaylist implements IUseCase<T, K> {
    constructor(private playlistsRepository: PlaylistsRepository) { }

    async execute({ id }: T): Promise<Response<K>> {
        try {

            if (!id) {
                return normalizationResponse.notFound('Playlist settings')
            }

            const getUniquePlaylist = await this.playlistsRepository.findUnique({ id })

            if (!getUniquePlaylist) {
                return normalizationResponse.notFound('Playlist')
            }

            return normalizationResponse.ok({ playlist: getUniquePlaylist })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    GetUniquePlaylist
}