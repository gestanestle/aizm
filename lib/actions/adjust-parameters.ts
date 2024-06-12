"use server";

import { updateSettings } from "../server/mutations";
import { InsertSettings } from "../server/types";

export const adjustParameters = async (formData: FormData) => {
  console.log("Adjusting parameters...");
  console.log(formData);
  const s: InsertSettings = {
    id: formData.get("mid") as string,
    temp: Number(formData.get("temp")),
    humidity: Number(formData.get("humidity")),
    tRange: Number(formData.get("tRange")),
    hRange: Number(formData.get("hRange")),
  };

  try {
    await updateSettings(s);
  } catch (err) {
    console.log(err);
  }
};
