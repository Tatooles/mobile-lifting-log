import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  getDb,
  syncDatabase,
  isSyncAvailable,
  runMigrations,
  LibsqlDatabase,
} from "./client";

interface DatabaseContextValue {
  db: LibsqlDatabase;
  sync: () => Promise<{ success: boolean; message: string }>;
  isSyncAvailable: boolean;
  refreshKey: number;
  triggerRefresh: () => void;
  isReady: boolean;
}

const DatabaseContext = createContext<DatabaseContextValue | null>(null);

interface DatabaseProviderProps {
  children: ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [db] = useState(() => getDb());
  const [refreshKey, setRefreshKey] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await runMigrations();
        setIsReady(true);
      } catch (error) {
        console.error("[DB] Migration failed:", error);
        throw error;
      }
    };
    init();
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const sync = useCallback(async () => {
    const result = await syncDatabase();
    if (result.success) {
      // Trigger a refresh after successful sync to update UI
      triggerRefresh();
    }
    return result;
  }, [triggerRefresh]);

  const value: DatabaseContextValue = {
    db,
    sync,
    isSyncAvailable: isSyncAvailable(),
    refreshKey,
    triggerRefresh,
    isReady,
  };

  if (!isReady) {
    return null;
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase(): DatabaseContextValue {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}
