"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationTokens = exports.sessions = exports.accounts = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Users table
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").unique(),
    name: (0, pg_core_1.text)("name"),
    image: (0, pg_core_1.text)("image"),
    emailVerified: (0, pg_core_1.timestamp)("email_verified"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// Accounts table (for OAuth providers)
exports.accounts = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    type: (0, pg_core_1.text)("type").notNull(),
    provider: (0, pg_core_1.text)("provider").notNull(),
    providerAccountId: (0, pg_core_1.text)("provider_account_id").notNull(),
    refresh_token: (0, pg_core_1.text)("refresh_token"),
    access_token: (0, pg_core_1.text)("access_token"),
    expires_at: (0, pg_core_1.integer)("expires_at"),
    token_type: (0, pg_core_1.text)("token_type"),
    scope: (0, pg_core_1.text)("scope"),
    id_token: (0, pg_core_1.text)("id_token"),
    session_state: (0, pg_core_1.text)("session_state"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// Sessions table
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    expires: (0, pg_core_1.timestamp)("expires").notNull(),
    sessionToken: (0, pg_core_1.text)("session_token").unique().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow()
});
// Verification tokens table
exports.verificationTokens = (0, pg_core_1.pgTable)("verification_tokens", {
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expires: (0, pg_core_1.timestamp)("expires").notNull()
});
