import { queryConditions } from "@/lib/server/queries";
import { FormattedState, SelectConditions } from "@/lib/server/types";
import dynamic from "next/dynamic";

const ChartNoSSR = dynamic(() => import("@/components/Chart"), { ssr: false });

export default async function Monitoring({ id }: { id: string }) {
  const states: SelectConditions[] = await queryConditions.execute({
    id: id,
    limit: 30,
  });
  const data: FormattedState[] = states.map((state) => ({
    time: `${state.time.getHours()}:${state.time.getMinutes()}`,
    temperature: state.temp,
    humidity: state.humidity,
  }));

  return (
    <div>
      <ChartNoSSR data={data} />
    </div>
  );
}
