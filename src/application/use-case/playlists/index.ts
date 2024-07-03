import { DrizzlePlaylistsRepository } from "src/application/repository/implementations/DrizzlePlaylistsRepository"
import { CreatePlaylist } from "./CreatePlaylist"
import { UseCaseHandler } from "src/shared/utils/use_cases"
import { DrizzleArtistsRepository } from "src/application/repository/implementations/DrizzleArtistsRepository"
import { DrizzleMusicsRepository } from "src/application/repository/implementations/DrizzleMusicsRepository"
import { ListPlaylist } from "./ListPlaylists"
import { GetUniquePlaylist } from "./GetUniquePlaylist"
import { UpdatePlaylist } from "./UpdatePlaylist"
import { DeletePlaylist } from "./DeletePlaylist"

const createPlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository()
    const artistsRepository = new DrizzleArtistsRepository()
    const musicsRepository = new DrizzleMusicsRepository()
    return new UseCaseHandler(new CreatePlaylist(playlistsRepository, artistsRepository, musicsRepository))
}

const listPlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository()
    return new UseCaseHandler(new ListPlaylist(playlistsRepository))
}

const getUniquePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository()
    return new UseCaseHandler(new GetUniquePlaylist(playlistsRepository))
}

const updatePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository()
    const artistsRepository = new DrizzleArtistsRepository()
    const musicsRepository = new DrizzleMusicsRepository()
    return new UseCaseHandler(new UpdatePlaylist(playlistsRepository, artistsRepository, musicsRepository))
}

const deletePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository()
    return new UseCaseHandler(new DeletePlaylist(playlistsRepository))
}

export {
    createPlaylist,
    listPlaylist,
    getUniquePlaylist,
    updatePlaylist,
    deletePlaylist
}