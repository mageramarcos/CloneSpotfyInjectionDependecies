"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRelations = exports.Musics = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const cuid2_1 = require("@paralleldrive/cuid2");
const artists_1 = require("./artists");
const drizzle_orm_1 = require("drizzle-orm");
const playlistMusics_1 = require("./playlistMusics");
exports.Musics = (0, pg_core_1.pgTable)('musics', {
    id: (0, pg_core_1.text)('id').primaryKey().$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    artistId: (0, pg_core_1.text)('artist_id').references(() => artists_1.Artists.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
});
exports.musicRelations = (0, drizzle_orm_1.relations)(exports.Musics, ({ many }) => ({
    artists: many(artists_1.Artists, {
        relationName: 'artists',
    }),
    playlists: many(playlistMusics_1.PlaylistMusics, {
        relationName: 'playlists',
    })
}));
