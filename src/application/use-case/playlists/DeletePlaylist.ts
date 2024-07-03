
import { PlaylistsRepository } from 'src/application/repository/playlists/PlaylistsRepository'
import { Response, normalizationResponse } from '../../../shared/utils/response'
import { IUseCase } from '../../../shared/utils/use_cases'


type DeletePlaylistRequest = {
    id: string
    artistId: string
}
type T = DeletePlaylistRequest
type DeletePlaylistResponse = {
    message: string
}
type K = DeletePlaylistResponse

class DeletePlaylist implements IUseCase<T, K> {
    constructor(private playlistsRepository: PlaylistsRepository) { }

    async execute({ id, artistId }: T): Promise<Response<K>> {
        try {

            if (!id || !artistId) {
                return normalizationResponse.notFound('Playlist settings')
            }

            const findByArtistId = await this.playlistsRepository.findByArtistId({ artistId })

            if (!findByArtistId) {
                return normalizationResponse.conflict('Playlist does not belong to the artist')

            }

            const deletePlaylist = await this.playlistsRepository.delete({
                id

            })
            if (!deletePlaylist) {
                return normalizationResponse.notFound('Playlist')
            }


            return normalizationResponse.ok({ message: "Successfully Deleted" })
        } catch (error) {
            return normalizationResponse.serverError(error.message)
        }
    }


}

export {
    DeletePlaylist
}