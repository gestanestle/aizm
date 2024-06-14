"use client";

import { indexConditions } from "@/lib/actions/insert-conditions";
import { useClient } from "@/lib/client/mqtt";
import { InsertConditions } from "@/lib/server/types";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = -2;

export default function Subscriber() {
  const [state, formAction] = useFormState(indexConditions, initialState);

  const [conditions, setConditions] = useState<InsertConditions>({
    id: "",
    temp: 0.0,
    humidity: 0.0,
    time: new Date(),
  });

  const client = useClient();
  const topic = "aizm/conditions";

  client.subscribe(topic, (err) => {
    if (err) {
      console.log("Subscribe to topics error", err);
    }
  });

  client.on("message", (topic, message) => {
    console.log("Message incoming...");
    if (topic != "aizm/conditions") return;

    try {
      const state = JSON.parse(message.toString());

      setConditions((prevState) => ({
        ...prevState,
        id: state.id,
        temp: state.temp,
        humidity: state.humidity,
        time: state.time,
      }));

      document.getElementById("sub-submit").click();
      client.end();
    } catch (err) {
      console.log("Error parsing message. " + err);
      return;
    }
  });

  return (
    <div>
      <form action={formAction}>
        <input name="id" type="text" value={conditions.id} hidden readOnly />
        <input
          name="ct"
          type="number"
          value={conditions.temp}
          hidden
          readOnly
        />
        <input
          name="dt"
          type="number"
          value={conditions.humidity}
          hidden
          readOnly
        />
        <input
          name="time"
          type="text"
          value={conditions.time.toString()}
          hidden
          readOnly
        />
        <button id="sub-submit" type="submit" hidden>
          Submit
        </button>
      </form>
    </div>
  );
}
