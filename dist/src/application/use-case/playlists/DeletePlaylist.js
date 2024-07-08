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
exports.DeletePlaylist = void 0;
const response_1 = require("../../../shared/utils/response");
class DeletePlaylist {
    constructor(playlistsRepository) {
        this.playlistsRepository = playlistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, artistId }) {
            try {
                if (!id || !artistId) {
                    return response_1.normalizationResponse.notFound('Playlist settings');
                }
                const findByArtistId = yield this.playlistsRepository.findByArtistId({ artistId });
                if (!findByArtistId) {
                    return response_1.normalizationResponse.conflict('Playlist does not belong to the artist');
                }
                const deletePlaylist = yield this.playlistsRepository.delete({
                    id
                });
                if (!deletePlaylist) {
                    return response_1.normalizationResponse.notFound('Playlist');
                }
                return response_1.normalizationResponse.ok({ message: "Successfully Deleted" });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.DeletePlaylist = DeletePlaylist;
