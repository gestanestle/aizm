import AddMachine from "@/components/AddMachine";
import Card from "@/components/Card";
import { queryConditions, queryMachines } from "@/lib/server/queries";
import { SelectConditions, SelectMachine, Status } from "@/lib/server/types";
import { auth } from "@clerk/nextjs/server";

type MachineState = {
  id: string;
  ct: number;
  ch: number;
  dt: number;
  dh: number;
  dtr: number;
  dhr: number;
  s: Status;
};

export default async function Home() {
  const { userId } = auth();
  const machines: SelectMachine[] = await queryMachines.execute({
    admin: userId,
  });

  const promises = machines.map(async (m) => {
    const c: SelectConditions[] = await queryConditions.execute({
      id: m.id,
      limit: 1,
    });
    const machine: MachineState = {
      id: m.id,
      dt: m.settings.temp,
      dh: m.settings.humidity,
      dtr: m.settings.tRange,
      dhr: m.settings.hRange,
    };

    if (c[0]) {
      machine.id = m.id;
      machine.ct = c[0].temp;
      machine.ch = c[0].humidity;

      const isHealthy =
        machine.ct < machine.dt + machine.dtr &&
        machine.ct > machine.dt - machine.dtr &&
        machine.ch < machine.dh + machine.dhr &&
        machine.ch > machine.dh - machine.dhr;

      machine.s = isHealthy ? Status.HEALTHY : Status.UNHEALTHY;
    } else {
      machine.id = m.id;
      machine.ct = 0;
      machine.ch = 0;
      machine.s = Status.UNSET;
    }

    return machine;
  });

  var data = (await Promise.all(promises)) as MachineState[];
  data = data.filter((item) => item);

  return (
    <main className="bg-gradient-to-br from-violet-950 via-purple-600 to-pink-500">
      <AddMachine uid={userId as string} />
      <div className="grid grid-cols-1  xl:grid-cols-2 justify-items-center gap-y-4">
        {data.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            ct={card.ct}
            dt={card.dt}
            ch={card.ch}
            dh={card.dh}
            dtr={card.dtr}
            dhr={card.dhr}
            s={card.s}
          />
        ))}
      </div>
    </main>
  );
}
