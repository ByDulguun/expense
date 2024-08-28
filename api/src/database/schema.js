const { relations } = require("drizzle-orm");
const { pgTable, varchar, uuid, integer } = require("drizzle-orm/pg-core");
const { v4: uuidv4 } = require("uuid"); // Import the UUID v4 generator

const users = pgTable("users", {
  id: uuid("id").primaryKey().default(uuidv4()), // Generate UUID here
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }), // Add the password column
});

const records = pgTable("records", {
  id: uuid("id").primaryKey().default(uuidv4()),
  title: varchar("title", { length: 256 }),
  icon: varchar("icon", { length: 256 }),
  iconColor: varchar("iconColor", { length: 256 }),
  userId: varchar("userId"),
});

const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));

module.exports = { users, records, usersRelations, recordsRelations };
