"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlaylist = void 0;
const response_1 = require("../../../shared/utils/response");
class UpdatePlaylist {
    constructor(playlistsRepository, artistsRepository, musicsRepository) {
        this.playlistsRepository = playlistsRepository;
        this.artistsRepository = artistsRepository;
        this.musicsRepository = musicsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            try {
                if (!id || !data) {
                    return response_1.normalizationResponse.notFound('Playlist settings');
                }
                const findUniquePlaylist = yield this.playlistsRepository.findUnique({
                    id
                });
                if (!findUniquePlaylist) {
                    return response_1.normalizationResponse.notFound('Playlist not found');
                }
                const findUniqueArtist = yield this.artistsRepository.findUnique({
                    id: data.artistId
                });
                if (!findUniqueArtist) {
                    return response_1.normalizationResponse.conflict('The artist does not own this playlist');
                }
                let validMusicIds = [];
                let invalidMusicIds = [];
                if (data.musicIds !== null) {
                    for (const musicId of data.musicIds) {
                        const findUniqueMusic = yield this.musicsRepository.findUnique({
                            id: musicId
                        });
                        if (findUniqueMusic) {
                            validMusicIds.push(musicId);
                        }
                        else {
                            invalidMusicIds.push(musicId);
                        }
                    }
                }
                const updatePlaylist = yield this.playlistsRepository.update({
                    id,
                    data: Object.assign(Object.assign({}, data), { musicIds: validMusicIds })
                });
                let message = '';
                if (invalidMusicIds.length > 0) {
                    message = `The following music IDs do not exist and were not added: ${invalidMusicIds.join(', ')}.`;
                }
                return response_1.normalizationResponse.ok({ playlist: updatePlaylist, message });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.UpdatePlaylist = UpdatePlaylist;
