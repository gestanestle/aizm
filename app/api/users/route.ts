import { insertUser } from "@/lib/server/mutations";
import { User } from "@/lib/server/types";

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const user: User = {
      id: req.data.id,
      fname: req.data.first_name,
      lname: req.data.last_name,
    };

    await insertUser(user);
    console.log("New user: " + user.id);
  } catch (err) {
    console.log(err);
  }
}
