import { DrizzlePlaylistsRepository } from "src/application/repository/implementations/DrizzlePlaylistsRepository"
import { CreatePlaylist } from "./CreatePlaylist"
import { UseCaseHandler } from "src/shared/utils/use_cases"
import { DrizzleArtistsRepository } from "src/application/repository/implementations/DrizzleArtistsRepository"
import { DrizzleMusicsRepository } from "src/application/repository/implementations/DrizzleMusicsRepository"

const createPlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository
    const artistsRepository = new DrizzleArtistsRepository
    const musicsRepository = new DrizzleMusicsRepository
    return new UseCaseHandler(new CreatePlaylist(playlistsRepository, artistsRepository, musicsRepository))
}

export {
    createPlaylist
}