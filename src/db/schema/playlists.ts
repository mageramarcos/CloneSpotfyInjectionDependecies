import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { Artists } from './artists';
import { relations } from 'drizzle-orm';
import { PlaylistMusics } from './playlistMusics';

export const Playlists = pgTable('playlists', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    artistId: text('artist_id').references(() => Artists.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
    // musicIds: text('music_ids').array().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
});


export const playlistRelations = relations(Playlists, ({ one, many }) => ({
    artist: one(Artists, {
        fields: [Playlists.artistId],
        references: [Artists.id]
    }),
    musics: many(PlaylistMusics)
}));