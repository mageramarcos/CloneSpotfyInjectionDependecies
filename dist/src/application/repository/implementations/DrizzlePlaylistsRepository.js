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
exports.DrizzlePlaylistsRepository = void 0;
const drizzle_1 = require("src/db/drizzle");
const schema_1 = require("src/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class DrizzlePlaylistsRepository {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const { title, description, artistId, musicIds } = data;
            return yield drizzle_1.drizzleClient
                .insert(schema_1.Playlists)
                .values({
                title,
                description,
                artistId,
                musicIds
            })
                .returning()
                .then(([playlists]) => playlists);
        });
    }
    findMany(_a) {
        return __awaiter(this, arguments, void 0, function* ({}) {
            return yield drizzle_1.drizzleClient
                .query.Playlists.findMany();
        });
    }
    findUnique(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            return (yield drizzle_1.drizzleClient
                .query.Playlists.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.Playlists.id, id),
                with: {
                    musics: true
                    //     // musics: {
                    //     //     with: {
                    //     //         music: true,
                    //     //         playlist: true
                    //     //     }
                }
            })) || null;
            //      });
            //      return await drizzleClient
            //         .select()
            //         .from(Playlists)
            //          .where(eq(Playlists.id, id))
            //          .innerJoin(Artists, eq(Playlists.artistId, Artists.id))
            //          .innerJoin(PlaylistMusics, eq(Playlists.id, PlaylistMusics.playlistId))
            //         .innerJoin(Musics, eq(PlaylistMusics.musicId, Musics.id))
            //          .then(([playlistMusic]) => ({ playlistMusic }));
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            return yield drizzle_1.drizzleClient
                .update(schema_1.Playlists)
                .set(Object.assign({}, data))
                .where((0, drizzle_orm_1.eq)(schema_1.Playlists.id, id))
                .returning()
                .then(([playlists]) => playlists);
        });
    }
    delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            return yield drizzle_1.drizzleClient
                .delete(schema_1.Playlists)
                .where((0, drizzle_orm_1.eq)(schema_1.Playlists.id, id))
                .returning()
                .then(([playlists]) => playlists);
        });
    }
    findByArtistId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ artistId }) {
            return yield drizzle_1.drizzleClient
                .select()
                .from(schema_1.Playlists)
                .where((0, drizzle_orm_1.eq)(schema_1.Playlists.artistId, artistId))
                .then(([playlists]) => playlists);
        });
    }
    addPlaylistMusics(_a) {
        return __awaiter(this, arguments, void 0, function* ({ musicId, playlistId }) {
            return yield drizzle_1.drizzleClient
                .insert(schema_1.PlaylistMusics)
                .values({
                playlistId,
                musicId
            })
                .returning()
                .then(([playlistMusics]) => playlistMusics);
        });
    }
}
exports.DrizzlePlaylistsRepository = DrizzlePlaylistsRepository;
