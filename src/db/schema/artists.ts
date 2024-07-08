import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { Musics } from './musics'
import { Playlists } from './playlists'

export const Artists = pgTable('artists', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
})

export const artistRelations = relations(Artists, ({ many }) => ({
    musics: many(Musics),
    playlists: many(Playlists),
}))