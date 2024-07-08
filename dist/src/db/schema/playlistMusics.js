"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistMusicRelations = exports.PlaylistMusics = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const musics_1 = require("./musics");
const playlists_1 = require("./playlists");
exports.PlaylistMusics = (0, pg_core_1.pgTable)('playlist_musics', {
    playlistId: (0, pg_core_1.text)('playlist_id').references(() => playlists_1.Playlists.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
    musicId: (0, pg_core_1.text)('music_id').references(() => musics_1.Musics.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull()
});
exports.playlistMusicRelations = (0, drizzle_orm_1.relations)(exports.PlaylistMusics, ({ one }) => ({
    playlist: one(playlists_1.Playlists, {
        fields: [exports.PlaylistMusics.playlistId],
        references: [playlists_1.Playlists.id]
    }),
    music: one(musics_1.Musics, {
        fields: [exports.PlaylistMusics.musicId],
        references: [musics_1.Musics.id]
    })
}));
