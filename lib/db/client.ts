import { open, openSync, DB } from "@op-engineering/op-sqlite";
import { drizzle } from "drizzle-orm/op-sqlite";
import * as schema from "@/db/schema";

const DATABASE_NAME = "lifting-log.db";

// Migration SQL - Create tables if they don't exist
const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS "workout" (
  "id" integer PRIMARY KEY NOT NULL,
  "user_id" text(64),
  "name" text(256) NOT NULL,
  "date" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "exercise" (
  "id" integer PRIMARY KEY NOT NULL,
  "name" text(256) NOT NULL,
  "notes" text NOT NULL,
  "workout_id" integer NOT NULL,
  FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON UPDATE no action ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS "set" (
  "id" integer PRIMARY KEY NOT NULL,
  "reps" text(16) NOT NULL,
  "weight" text(16) NOT NULL,
  "rpe" text(16) DEFAULT '' NOT NULL,
  "exercise_id" integer NOT NULL,
  FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON UPDATE no action ON DELETE cascade
);
`;

// Get Turso credentials from environment variables
const TURSO_DATABASE_URL = process.env.EXPO_PUBLIC_TURSO_DB_URL;
const TURSO_AUTH_TOKEN = process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN;
let dbConnection: DB | null = null;

/**
 * Initialize the op-sqlite database with optional Turso sync.
 * If Turso credentials are configured, enables embedded replica sync.
 */
export function getConnection(): DB {
  if (dbConnection) {
    return dbConnection;
  }

  if (TURSO_DATABASE_URL && TURSO_AUTH_TOKEN) {
    // Embedded replica mode: local SQLite + remote Turso sync
    // Requires libsql: true in package.json
    dbConnection = openSync({
      name: DATABASE_NAME,
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    });
    console.log("[DB] Initialized op-sqlite with Turso sync enabled");
  } else {
    // Local-only mode when credentials are not configured
    dbConnection = open({
      name: DATABASE_NAME,
    });
    console.log(
      "[DB] Initialized op-sqlite in local-only mode (no Turso credentials)"
    );
  }

  return dbConnection;
}

/**
 * Get the drizzle ORM instance backed by op-sqlite.
 */
export function getDb() {
  const connection = getConnection();
  return drizzle(connection, { schema });
}

/**
 * Manually sync local database with remote Turso database.
 * Returns true if sync succeeded, false if sync is not available.
 */
export async function syncDatabase(): Promise<{
  success: boolean;
  message: string;
}> {
  if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
    return {
      success: false,
      message: "Sync not available: Turso credentials not configured",
    };
  }

  try {
    const connection = getConnection();
    connection.sync();
    return {
      success: true,
      message: "Database synced successfully",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[DB] Sync failed:", errorMessage);
    return {
      success: false,
      message: `Sync failed: ${errorMessage}`,
    };
  }
}

/**
 * Check if Turso sync is configured and available.
 */
export function isSyncAvailable(): boolean {
  return Boolean(TURSO_DATABASE_URL && TURSO_AUTH_TOKEN);
}

/**
 * Run database migrations to ensure tables exist.
 */
export async function runMigrations(): Promise<void> {
  const connection = getConnection();
  const statements = MIGRATION_SQL.split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    connection.executeSync(statement);
  }
  console.log("[DB] Migrations completed");
}

// Export types
export type LibsqlDatabase = ReturnType<typeof getDb>;
