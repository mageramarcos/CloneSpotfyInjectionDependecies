import { PlaylistsRepository } from 'src/application/repository/playlists/PlaylistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'
import { IPlaylists } from 'src/application/entities/IPlaylists'

type ListPlaylistRequest = {

}
type T = ListPlaylistRequest
type ListPlaylistResponse = {
    playlist: IPlaylists[]
}
type K = ListPlaylistResponse

class ListPlaylist implements IUseCase<T, K> {
    constructor(private playlistsRepository: PlaylistsRepository) { }

    async execute({ }: T): Promise<Response<K>> {
        try {

            const listMusics = await this.playlistsRepository.findMany({})

            return normalizationResponse.ok({ playlist: listMusics })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }
}

export {
    ListPlaylist
}
