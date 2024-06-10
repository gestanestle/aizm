import AddMachine from "@/components/AddMachine";
import Card, { Status } from "@/components/Card";
import { queryConditions, queryMachines } from "@/lib/server/queries";
import { Conditions } from "@/lib/server/types";
import { auth } from "@clerk/nextjs/server";

type CurrentConditions = {
  id: string;
  ct: number;
  ch: number;
};

export default async function Home() {
  const { userId } = auth();
  const machines = await queryMachines.execute({ admin: userId });

  const promises = machines.map(async (m) => {
    const c: Conditions[] = await queryConditions.execute({
      id: m.id,
      limit: 1,
    });
    return c[0] ? { id: m.id, ct: c[0].temp, ch: c[0].humidity } : undefined;
  });

  var data = (await Promise.all(promises)) as CurrentConditions[];
  data = data.filter((item) => item);

  return (
    <main className="bg-gradient-to-br from-violet-950 via-purple-600 to-pink-500">
      <AddMachine uid={userId as string} />
      <div className="grid justify-items-center space-y-4">
        {data.map((u) => (
          <Card
            key={u.id}
            id={u.id}
            ct={u.ct}
            dt={40.2}
            ch={u.ch}
            dh={89}
            s={Status.HEALTHY}
          />
        ))}
      </div>
    </main>
  );
}
