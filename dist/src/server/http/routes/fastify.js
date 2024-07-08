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
exports.routes = routes;
const apply_use_case_1 = require("../../middlewares/apply_use_case");
const artists_1 = require("src/application/use-case/artists");
const authenticate_artist_1 = require("src/server/middlewares/authenticate_artist");
const musics_1 = require("src/application/use-case/musics");
const playlists_1 = require("src/application/use-case/playlists");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Artists
        fastify.post('/login', (0, apply_use_case_1.applyUseCase)(artists_1.loginArtist));
        fastify.post('/artists', (0, apply_use_case_1.applyUseCase)(artists_1.createArtist));
        fastify.register((instance, opts) => __awaiter(this, void 0, void 0, function* () {
            instance.addHook('preHandler', authenticate_artist_1.authenticate);
            instance.get('/artists', (0, apply_use_case_1.applyUseCase)(artists_1.listArtists));
            instance.get('/artists/:id', (0, apply_use_case_1.applyUseCase)(artists_1.getUniqueArtist));
            instance.patch('/artists/:id', (0, apply_use_case_1.applyUseCase)(artists_1.updateArtist, { separate_body: true, param_key: 'id' }));
            instance.delete('/artists/:id', (0, apply_use_case_1.applyUseCase)(artists_1.deleteArtist));
            // Musics
            instance.post('/musics', (0, apply_use_case_1.applyUseCase)(musics_1.createMusic));
            instance.get('/musics', (0, apply_use_case_1.applyUseCase)(musics_1.listMusics));
            instance.get('/musics/:id', (0, apply_use_case_1.applyUseCase)(musics_1.getUniqueMusic));
            instance.patch('/musics/:id', (0, apply_use_case_1.applyUseCase)(musics_1.updateMusic, { separate_body: true, param_key: 'id' }));
            instance.delete('/musics/:id', (0, apply_use_case_1.applyUseCase)(musics_1.deleteMusic));
            // Playlists
            instance.post('/playlists', (0, apply_use_case_1.applyUseCase)(playlists_1.createPlaylist));
            instance.get('/playlists', (0, apply_use_case_1.applyUseCase)(playlists_1.listPlaylist));
            instance.get('/playlists/:id', (0, apply_use_case_1.applyUseCase)(playlists_1.getUniquePlaylist));
            instance.patch('/playlists/:id', (0, apply_use_case_1.applyUseCase)(playlists_1.updatePlaylist, { separate_body: true, param_key: 'id' }));
            instance.delete('/playlists/:id', (0, apply_use_case_1.applyUseCase)(playlists_1.deletePlaylist));
        }));
    });
}
