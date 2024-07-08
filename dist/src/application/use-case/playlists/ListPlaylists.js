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
exports.ListPlaylist = void 0;
const response_1 = require("../../../shared/utils/response");
class ListPlaylist {
    constructor(playlistsRepository) {
        this.playlistsRepository = playlistsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({}) {
            try {
                const listMusics = yield this.playlistsRepository.findMany({});
                return response_1.normalizationResponse.ok({ playlist: listMusics });
            }
            catch (error) {
                return response_1.normalizationResponse.serverError(error.message);
            }
        });
    }
}
exports.ListPlaylist = ListPlaylist;
