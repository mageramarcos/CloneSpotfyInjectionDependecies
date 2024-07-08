import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { Artists } from './artists'
import { relations } from 'drizzle-orm'

export const Musics = pgTable('musics', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    artistId: text('artist_id').references(() => Artists.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
})

export const musicRelations = relations(Musics, ({ one }) => ({
    artist: one(Artists, {
        fields: [Musics.artistId],
        references: [Artists.id]
    })
}))