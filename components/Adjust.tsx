"use client";

import { adjustParameters } from "@/lib/actions/adjust-parameters";
import { useClient } from "@/lib/client/mqtt";
import { useState } from "react";

export default function Adjust({ id }: { id: string }) {
  const [temp, setTemp] = useState(0.0);
  const [humidity, setHumidty] = useState(0.0);
  const [tempRange, setTempRange] = useState(0);
  const [humidityRange, setHumidtyRange] = useState(0);

  const client = useClient();

  const publishSettings = async () => {
    console.log("Publishing...");

    const topic = "aizm/settings";
    const payload = {
      id: id,
      temp: temp,
      humidity: humidity,
      tempRange: tempRange,
      humidityRange: humidityRange,
    };

    client.on("connect", () => {
      client.subscribe(topic, (err) => {
        if (!err) {
          client.publish(topic, JSON.stringify(payload));
          console.log("Publish successful!");
          location.reload();
        } else {
          console.log(err);
        }
      });
    });
  };

  const arr = Array.from(Array(10).keys());
  const closeModal = () => {
    document.getElementById(`adjust-modal-${id}`).open = false;
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        key={id}
        className="btn btn-secondary"
        onClick={() =>
          document.getElementById(`adjust-modal-${id}`).showModal()
        }
      >
        Adjust
      </button>
      <dialog id={`adjust-modal-${id}`} className="modal">
        <div className="modal-box">
          <form
            className="m-2"
            action={adjustParameters}
            onSubmit={publishSettings}
          >
            <div className="p-4">
              <div className="flex flex-none items-center my-4">
                <p className="flex-auto">Input desired temperature: </p>
                <p className="flex-none">{temp} &deg;C</p>
                <select
                  name="tRange"
                  className="select select-warning w-1/4 ml-4 flex-none"
                  defaultValue={0}
                  onChange={(e) => setTempRange(Number(e.target.value))}
                >
                  <option disabled>Tolerance</option>
                  {arr.map((a) => (
                    <option key={a} value={a}>
                      &plusmn; {a}
                    </option>
                  ))}
                </select>
              </div>
              <input
                name="temp"
                type="range"
                min={15}
                max={35}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="range range-primary"
                step={0.5}
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
              <div className="flex items-center my-4 flex-none">
                <p className="flex-auto">Input desired humidity: </p>
                <p className="flex-none">{humidity} %</p>
                <select
                  name="hRange"
                  className="select select-warning w-1/4 ml-4 flex-none"
                  defaultValue={0}
                  onChange={(e) => setHumidtyRange(Number(e.target.value))}
                >
                  <option>Tolerance</option>
                  {arr.map((a) => (
                    <option key={a} value={a}>
                      &plusmn; {a}
                    </option>
                  ))}
                </select>
              </div>
              <input
                name="humidity"
                type="range"
                min={20}
                max={80}
                value={humidity}
                onChange={(e) => setHumidty(Number(e.target.value))}
                className="range range-secondary"
                step={0.5}
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
                <span>35</span>
                <span>50</span>
                <span>65</span>
                <span>80</span>
              </div>
            </div>
            <div className="w-full grid justify-items-center content-end mt-4">
              <button
                className="btn btn-success"
                type="submit"
                onClick={closeModal}
              >
                Submit
              </button>
            </div>
            <input name="mid" value={id} readOnly hidden />
          </form>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
