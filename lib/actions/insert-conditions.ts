"use server";

import { insertConditions } from "../server/mutations";
import { InsertConditions } from "../server/types";

export const indexConditions = async (prevState: any, formData: FormData) => {
  const conditions: InsertConditions = {
    id: formData.get("id") as string,
    temp: Number(formData.get("ct")),
    humidity: Number(formData.get("dt")),
    time: new Date(formData.get("time") as string),
  };

  try {
    await insertConditions(conditions);
  } catch (err) {
    console.log(err);
    return -1;
  }

  return 0;
};
