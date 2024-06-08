"use client";

import mqtt from "mqtt";
import { useState } from "react";

export default function Adjust({ id }: { id: string }) {
  const [temp, setTemp] = useState(0.0);
  const [humidity, setHumidty] = useState(0.0);

  const client = mqtt.connect(
    String("ws://" + process.env.NEXT_PUBLIC_MQTT_HOST + "/mqtt"),
    {
      protocol: "ws",
      username: "admin",
      password: "public",
      host: "broker.emqx.io",
      port: 8083,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    },
  );

  const publishSettings = async () => {
    const topic = "aizm/settings";
    const payload = { id: id, temp: temp, humidity: humidity };
    client.on("connect", () => {
      client.subscribe(topic, (err) => {
        if (!err) {
          client.publish(topic, JSON.stringify(payload));
          console.log("Publish successful!");
        } else {
          console.log(err);
        }
      });
    });
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-secondary"
        onClick={() => document.getElementById("adjust").showModal()}
      >
        Adjust
      </button>
      <dialog id="adjust" className="modal">
        <div className="modal-box">
          <form method="dialog" className="m-2">
            <div className="p-4">
              <div className="flex items-center my-4">
                <p className="flex-auto">Input desired temperature: </p>
                <p className="flex-none">{temp} &deg;C</p>
              </div>
              <input
                type="range"
                min={15}
                max={35}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="range range-primary"
                step={0.1}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
              <div className="w-full flex justify-between text-xs px-2">
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center my-4">
                <p className="flex-auto">Input desired humidity: </p>
                <p className="flex-none">{humidity} %</p>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                value={humidity}
                onChange={(e) => setHumidty(Number(e.target.value))}
                className="range range-secondary"
                step={0.1}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
              <div className="w-full flex justify-between text-xs px-2">
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
                <span>60</span>
                <span>70</span>
              </div>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="w-full grid justify-items-center content-end mt-4">
              <button className="btn btn-success" onClick={publishSettings}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
