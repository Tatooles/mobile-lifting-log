// database.ts
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("app.db");

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS form_data (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        email TEXT,
        message TEXT
      );`
    );
  });
};

export const insertFormData = (
  name: string,
  email: string,
  message: string
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO form_data (name, email, message) VALUES (?, ?, ?);`,
        [name, email, message],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export default db;
