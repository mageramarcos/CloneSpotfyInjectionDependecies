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
exports.CreatePlaylist = void 0;
const response_1 = require("../../../shared/utils/response");
class CreatePlaylist {
    constructor(playlistsRepository, artistsRepository, musicsRepository) {
        this.playlistsRepository = playlistsRepository;
        this.artistsRepository = artistsRepository;
        this.musicsRepository = musicsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, artistId, musicIds }) {
            try {
                if (!title || !description || !artistId) {
                    return response_1.normalizationResponse.notFound('Playlist settings');
                }
                const findUniqueArtist = yield this.artistsRepository.findUnique({
                    id: artistId
                });
                if (!findUniqueArtist) {
                    return response_1.normalizationResponse.conflict('Artist does not exist');
                }
                let validMusicIds = [];
                let invalidMusicIds = [];
                if (musicIds !== null) {
                    for (const musicId of musicIds) {
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
                const createPlaylist = yield this.playlistsRepository.create({
                    data: {
                        title,
                        description,
                        artistId,
                        musicIds: validMusicIds
                    }
                });
                let message = '';
                if (invalidMusicIds.length > 0) {
                    message = `The following music IDs do not exist and were not added: ${invalidMusicIds.join(', ')}.`;
                }
                for (const musicId of validMusicIds) {
                    yield this.playlistsRepository.addPlaylistMusics({
                        musicId,
                        playlistId: createPlaylist.id
                    });
                }
                return response_1.normalizationResponse.ok({ playlist: createPlaylist, message });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.CreatePlaylist = CreatePlaylist;
