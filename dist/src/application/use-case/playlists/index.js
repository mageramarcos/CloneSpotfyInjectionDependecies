"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlaylist = exports.updatePlaylist = exports.getUniquePlaylist = exports.listPlaylist = exports.createPlaylist = void 0;
const DrizzlePlaylistsRepository_1 = require("src/application/repository/implementations/DrizzlePlaylistsRepository");
const CreatePlaylist_1 = require("./CreatePlaylist");
const use_cases_1 = require("src/shared/utils/use_cases");
const DrizzleArtistsRepository_1 = require("src/application/repository/implementations/DrizzleArtistsRepository");
const DrizzleMusicsRepository_1 = require("src/application/repository/implementations/DrizzleMusicsRepository");
const ListPlaylists_1 = require("./ListPlaylists");
const GetUniquePlaylist_1 = require("./GetUniquePlaylist");
const UpdatePlaylist_1 = require("./UpdatePlaylist");
const DeletePlaylist_1 = require("./DeletePlaylist");
const createPlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository_1.DrizzlePlaylistsRepository();
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    return new use_cases_1.UseCaseHandler(new CreatePlaylist_1.CreatePlaylist(playlistsRepository, artistsRepository, musicsRepository));
};
exports.createPlaylist = createPlaylist;
const listPlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository_1.DrizzlePlaylistsRepository();
    return new use_cases_1.UseCaseHandler(new ListPlaylists_1.ListPlaylist(playlistsRepository));
};
exports.listPlaylist = listPlaylist;
const getUniquePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository_1.DrizzlePlaylistsRepository();
    return new use_cases_1.UseCaseHandler(new GetUniquePlaylist_1.GetUniquePlaylist(playlistsRepository));
};
exports.getUniquePlaylist = getUniquePlaylist;
const updatePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository_1.DrizzlePlaylistsRepository();
    const artistsRepository = new DrizzleArtistsRepository_1.DrizzleArtistsRepository();
    const musicsRepository = new DrizzleMusicsRepository_1.DrizzleMusicsRepository();
    return new use_cases_1.UseCaseHandler(new UpdatePlaylist_1.UpdatePlaylist(playlistsRepository, artistsRepository, musicsRepository));
};
exports.updatePlaylist = updatePlaylist;
const deletePlaylist = () => {
    const playlistsRepository = new DrizzlePlaylistsRepository_1.DrizzlePlaylistsRepository();
    return new use_cases_1.UseCaseHandler(new DeletePlaylist_1.DeletePlaylist(playlistsRepository));
};
exports.deletePlaylist = deletePlaylist;
