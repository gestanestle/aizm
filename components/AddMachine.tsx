"use client";

import { addMachine } from "@/lib/actions/add-machine";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = -2;

export default function AddMachine({ uid }: { uid: string }) {
  const [state, formAction] = useFormState(addMachine, initialState);
  const [isToasting, setIsToasting] = useState(false);

  const closeModal = () =>
    (document.getElementById("add-machine-modal").open = false);

  useEffect(() => {
    if (state != -2) setIsToasting(true);
  }, [state]);

  useEffect(() => {
    if (isToasting) {
      const timeoutId = setTimeout(() => {
        setIsToasting(false);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        location.reload();
      }
    } else {
      closeModal();
    }
  }, [isToasting]);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="flex justify-center w-full my-4 pt-4">
        <button
          className="btn btn-secondary w-5/6"
          onClick={() =>
            document.getElementById("add-machine-modal").showModal()
          }
        >
          Add new machine
        </button>
      </div>
      <dialog id="add-machine-modal" className="modal">
        <div className="modal-box grid justify-items-center items-center h-1/2">
          {state === 1 && isToasting && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-info">
                <span>Machine sucessfully registered.</span>
              </div>
            </div>
          )}
          {state === 0 && isToasting && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-warning">
                <span>Invalid key. Machine already exists.</span>
              </div>
            </div>
          )}
          {state === -1 && isToasting && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-error">
                <span>
                  An error occured while processing your request. Close this
                  window and try again.
                </span>
              </div>
            </div>
          )}

          <form action={formAction} className="grid justify-items-center gap-8">
            <p className="font-semibold text-lg ">AIZM Product Key</p>
            <label className="input input-bordered flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              |
              <input
                name="id"
                type="text"
                className="grow"
                placeholder="Machine ID"
              />
            </label>
            <button className="btn btn-outline btn-success" type="submit">
              Register
            </button>

            <input name="admin" value={uid} readOnly hidden />
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
    </div>
  );
}
