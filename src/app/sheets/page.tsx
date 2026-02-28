'use client';

import { callSheets } from "./backend";
import { useState } from "react";

// 1. Define what a Resource looks like
interface Resource {
  title: string;
  descrip: string;
  image: string;
}

export default function Sheets() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const data = await callSheets();
    setResources(data);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-black font-sans">
      <button 
        onClick={handleFetch}
        className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Load Campus Resources"}
      </button>

      {/* 3. Grid container for your "small popups" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {resources.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col p-5 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">
              {item.title}
            </h3>
            
            <p className="text-sm text-zinc-500 mb-4 truncate">
              {/* This is the 'Website' column */}
              <a href={item.descrip} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {item.descrip}
              </a>
            </p>

            <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
               <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                 On Campus Resource
               </span>
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && !loading && (
        <p className="text-zinc-400">No resources loaded yet.</p>
      )}
    </div>
  );
}