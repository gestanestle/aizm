import { insertUser } from "@/lib/server/mutations";
import { InsertUser } from "@/lib/server/types";

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const user: InsertUser = {
      id: req.data.id,
      fname: req.data.first_name,
      lname: req.data.last_name,
    };

    const users = await insertUser(user);
    console.log("New user: " + users[0].id);
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200 });
}
