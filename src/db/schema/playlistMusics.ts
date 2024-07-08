import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { Musics } from './musics'
import { Playlists } from './playlists'

export const PlaylistMusics = pgTable('playlist_musics', {
  playlistId: text('playlist_id').references(() => Playlists.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
  musicId: text('music_id').references(() => Musics.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull()
})

export const playlistMusicRelations = relations(PlaylistMusics, ({ one }) => ({
  playlist: one(Playlists, {
    fields: [PlaylistMusics.playlistId],
    references: [Playlists.id]
  }),
  music: one(Musics, {
    fields: [PlaylistMusics.musicId],
    references: [Musics.id]
  })
}))