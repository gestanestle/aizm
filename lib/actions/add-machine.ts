"use server";

import { insertMachine } from "../server/mutations";
import { queryID } from "../server/queries";
import { Machine } from "../server/types";

export const addMachine = async (prevState: any, formData: FormData) => {
  const m: Machine = {
    id: formData.get("id") as string,
    admin: formData.get("admin") as string,
  };

  try {
    const machine = await queryID.execute({ id: m.id });
    if (machine != null) return 0;
    await insertMachine(m);
  } catch (err) {
    console.log(err);
    return -1;
  }

  return 1;
};
