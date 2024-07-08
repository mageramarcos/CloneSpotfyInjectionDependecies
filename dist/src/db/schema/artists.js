"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistRelations = exports.Artists = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const cuid2_1 = require("@paralleldrive/cuid2");
const drizzle_orm_1 = require("drizzle-orm");
const musics_1 = require("./musics");
const playlists_1 = require("./playlists");
exports.Artists = (0, pg_core_1.pgTable)('artists', {
    id: (0, pg_core_1.text)('id').primaryKey().$defaultFn(() => (0, cuid2_1.createId)()),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    password: (0, pg_core_1.text)('password').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
});
exports.artistRelations = (0, drizzle_orm_1.relations)(exports.Artists, ({ many }) => ({
    musics: many(musics_1.Musics),
    playlists: many(playlists_1.Playlists)
}));
