import { openDB } from "idb";

export const useIndexedDB = () => {
  const dbName = "whatsappCloneDB";

  const initializeDB = async () => {
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore("contacts", { keyPath: "id" });
        db.createObjectStore("messages", { keyPath: "id" });
      },
    });
    return db;
  };

  const saveToDB = async (storeName, data) => {
    const db = await initializeDB();
    const tx = db.transaction(storeName, "readwrite");
    await tx.store.put(data);
    await tx.done;
  };

  const getFromDB = async (storeName) => {
    const db = await initializeDB();
    const tx = db.transaction(storeName, "readonly");
    return await tx.store.getAll();
  };

  return { saveToDB, getFromDB };
};
