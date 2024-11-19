import Image from "next/image";
import Adjust from "./Adjust";
import { Status } from "@/lib/server/types";
import Monitoring from "./Monitoring";

export default function Card({
  id,
  ct,
  dt,
  ch,
  dh,
  dtr,
  dhr,
  t,
}: {
  id: string;
  ct: number;
  dt: number;
  ch: number;
  dh: number;
  dtr: number;
  dhr: number;
  t: Date;
}) {
  return (
    <div className="w-5/6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex">
            <div className="flex-auto">Machine {id}</div>
            <div className="flex-none">{/* <Adjust key={id} id={id} /> */}</div>
          </h2>
          {t != null && (
            <div>
              <p className="font-semibold text-sm">
                Last updated at: {t.toUTCString()}
              </p>
            </div>
          )}
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
              <div className="stat-title">
                <p className="font-semibold">Temperature</p>
              </div>
              <div className="stat-value text-primary">{ct} &deg;C</div>
              <div className="stat-desc">
                <p className="text-sm">
                  Desired temp: {dt} &deg;C &plusmn; {dtr}
                </p>
              </div>
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
              <div className="stat-title">
                <p className="font-semibold">Humidity</p>
              </div>
              <div className="stat-value text-secondary">{ch} %</div>
              <div className="stat-desc">
                <p className="text-sm">
                  Desired humidity: {dh} % &plusmn; {dhr}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block bg-base-300 rounded-lg p-4">
            <Monitoring id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
