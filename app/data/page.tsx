import { queryConditions } from "@/lib/server/queries";
import { Conditions } from "@/lib/types/conditions";
export default async function page() {
  const conditions: Conditions[] = await queryConditions.execute({
    id: "0000001",
    limit: 60,
  });
  return (
    <div>
      {conditions.map((c) => (
        <h3 key={c.time.toUTCString()}>
          {c.time.toUTCString()} {c.temp} {c.humidity}
        </h3>
      ))}
    </div>
  );
}
