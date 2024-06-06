import Image from "next/image";
import Adjust from "./Adjust";

export enum Status {
  HEALTHY,
  UNHEALTHY,
}
export default function Card({
  id,
  ct,
  dt,
  ch,
  dh,
  s,
}: {
  id: string;
  ct: number;
  dt: number;
  ch: number;
  dh: number;
  s: Status;
}) {
  return (
    <div className="w-5/6 md:4/6 lg:3/6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex">
            <div className="flex-auto">Machine {id}</div>
            <div className="flex-none">
              <Adjust />
            </div>
          </h2>
          <div className="stats stats-vertical shadow">
            <div className="stat gap-y-2">
              <div className="stat-figure text-primary">
                <Image
                  src="/temp.svg"
                  alt="Temperature Logo"
                  className="dark:invert"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div className="stat-title">Temperature</div>
              <div className="stat-value text-primary">{ct} &deg;C</div>
              <div className="stat-desc">Desired temp: {dt} &deg;C</div>
            </div>

            <div className="stat gap-y-2">
              <div className="stat-figure text-secondary">
                <Image
                  src="/humidity.svg"
                  alt="Humidity Logo"
                  className="dark:invert"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div className="stat-title">Humidity</div>
              <div className="stat-value text-secondary">{ch}</div>
              <div className="stat-desc">Desired humidity: {dh} %</div>
            </div>
          </div>
          <div className="container-fluid h-12 border-y-2 border-indigo-200 mt-4">
            <div className="flex justify-center items-center h-full">
              {s == Status.HEALTHY && (
                <p className="text-center font-semibold">
                  Status: <span className="text-green-600">HEALTHY</span>
                </p>
              )}
              {s == Status.UNHEALTHY && (
                <p className="text-center">
                  Status: <span className="text-red-600">UNHEALTHY</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
