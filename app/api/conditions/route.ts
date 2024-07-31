import { insertConditions } from "@/lib/server/mutations"
import { InsertConditions } from "@/lib/server/types"

export async function POST(request: Request) {
  const res = await request.json()
  const data = JSON.parse(res.payload)

  const conditions: InsertConditions = {
    id: data.id as string,
    temp: data.temp,
    humidity: data.humidity,
    time: new Date(data.time)
  }

  try {
    await insertConditions(conditions);
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200 });
}
