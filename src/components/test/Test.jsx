import React, { useState } from "react";
import { notify, successNotify } from "../tools/CustomToaster";
import InlineLoading from "../tools/InlineLoading";
import { FaCheck } from "react-icons/fa";


const Spinner = () => <span style={{ marginLeft: 8 }}><InlineLoading  size={0.3}/></span>;

export default function ProgressTracker() {
  const [logs, setLogs] = useState([]); // each entry: { text: string, status: "loading" | "done" }
  const [isRunning, setIsRunning] = useState(false);
  const [eventSource, setEventSource] = useState(null);

  const startProgress = () => {
    setLogs([]);
    setIsRunning(true);

    const es = new EventSource("http://localhost:8000/progress");

    es.onmessage = (event) => {
      setLogs((prevLogs) => {
        const updatedLogs = prevLogs.map((log, i) =>
          i === prevLogs.length - 1 ? { ...log, status: "done" } : log
        );

        const isFinal = event.data === "Done";

        updatedLogs.push({
          text: event.data,
          status: isFinal ? "done" : "loading",
        });

        return updatedLogs;
      });

      if (event.data === "Done") {
        // successNotify("Done");
        es.close();
        setIsRunning(false);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error:", err);
      notify("Connection lost. Please try again.");
      es.close();
      setIsRunning(false);
    };

    setEventSource(es);
  };

  return (
    <div className="font-inter">
      <div className="flex justify-center">
        <button
          className="border-2 text-xl border-gray-300 p-2 rounded-2xl cursor-pointer"
          onClick={startProgress}
          disabled={isRunning}
        >
          {isRunning ? "In Progress..." : "Start Search"}
        </button>
      </div>

      <div>
        <ul>
          {logs.map(({ text, status }, idx) => (
            <li className={`text-[15px] flex items-center  leading-snug ${status === 'done' ? 'text-gray-500/50' : '' }`} key={idx}>
              {text}
              {status === "done" && <span className="mx-4 text-green-400/50"><FaCheck /></span>}
              {status === "loading" && <Spinner />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
