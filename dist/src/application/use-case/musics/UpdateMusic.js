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
exports.UpdateMusic = void 0;
const response_1 = require("../../../shared/utils/response");
class UpdateMusic {
    constructor(musicsRepository, artistsRepository) {
        this.musicsRepository = musicsRepository;
        this.artistsRepository = artistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            try {
                if (!id || !data) {
                    return response_1.normalizationResponse.notFound('Music settings');
                }
                const findUniqueArtist = yield this.artistsRepository.findUnique({
                    id: data.artistId
                });
                if (!findUniqueArtist) {
                    return response_1.normalizationResponse.conflict('The artist does not own this song');
                }
                const updateMusic = yield this.musicsRepository.update({
                    id,
                    data: Object.assign({}, data)
                });
                if (!updateMusic) {
                    return response_1.normalizationResponse.notFound('Music');
                }
                return response_1.normalizationResponse.ok({ music: updateMusic });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.UpdateMusic = UpdateMusic;
