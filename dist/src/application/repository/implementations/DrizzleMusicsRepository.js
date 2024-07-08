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
exports.DrizzleMusicsRepository = void 0;
const drizzle_1 = require("src/db/drizzle");
const schema_1 = require("src/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class DrizzleMusicsRepository {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const { title, description, artistId } = data;
            return yield drizzle_1.drizzleClient
                .insert(schema_1.Musics)
                .values({
                title,
                description,
                artistId
            })
                .returning()
                .then(([musics]) => musics);
        });
    }
    findMany(_a) {
        return __awaiter(this, arguments, void 0, function* ({}) {
            return yield drizzle_1.drizzleClient
                .select()
                .from(schema_1.Musics);
        });
    }
    findUnique(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            return yield drizzle_1.drizzleClient
                .select()
                .from(schema_1.Musics)
                .where((0, drizzle_orm_1.eq)(schema_1.Musics.id, id))
                .then(([musics]) => musics);
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            return yield drizzle_1.drizzleClient
                .update(schema_1.Musics)
                .set(Object.assign({}, data))
                .where((0, drizzle_orm_1.eq)(schema_1.Musics.id, id))
                .returning()
                .then(([musics]) => musics);
        });
    }
    delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            return yield drizzle_1.drizzleClient
                .delete(schema_1.Musics)
                .where((0, drizzle_orm_1.eq)(schema_1.Musics.id, id))
                .returning()
                .then(([musics]) => musics);
        });
    }
    findByArtistId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ artistId }) {
            return yield drizzle_1.drizzleClient
                .select()
                .from(schema_1.Musics)
                .where((0, drizzle_orm_1.eq)(schema_1.Musics.artistId, artistId))
                .then(([musics]) => musics);
        });
    }
}
exports.DrizzleMusicsRepository = DrizzleMusicsRepository;
