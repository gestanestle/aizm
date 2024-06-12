"use server";

import { insertMachine, insertSettings } from "../server/mutations";
import { queryID } from "../server/queries";
import { InsertMachine, InsertSettings } from "../server/types";

export const addMachine = async (prevState: any, formData: FormData) => {
  console.log("Adding machine...");

  const id = formData.get("id") as string;
  const m: InsertMachine = {
    id: id,
    admin: formData.get("admin") as string,
  };

  const s: InsertSettings = {
    id: id,
    temp: 0,
    humidity: 0,
    tRange: 0,
    hRange: 0,
  };

  try {
    const machine = await queryID.execute({ id: m.id });
    if (machine != null) return 0;
    await insertMachine(m);
    await insertSettings(s);
  } catch (err) {
    console.log(err);
    return -1;
  }

  return 1;
};
