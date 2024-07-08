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
exports.GetUniquePlaylist = void 0;
const response_1 = require("../../../shared/utils/response");
class GetUniquePlaylist {
    constructor(playlistsRepository) {
        this.playlistsRepository = playlistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                if (!id) {
                    return response_1.normalizationResponse.notFound('Playlist settings');
                }
                const getUniquePlaylist = yield this.playlistsRepository.findUnique({ id });
                if (!getUniquePlaylist) {
                    return response_1.normalizationResponse.notFound('Playlist');
                }
                return response_1.normalizationResponse.ok({ playlist: getUniquePlaylist });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.GetUniquePlaylist = GetUniquePlaylist;
