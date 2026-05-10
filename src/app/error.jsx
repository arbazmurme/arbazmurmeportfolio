"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Keep errors visible in dev without spamming production logs.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-gray-800 bg-black/40 p-6 text-center">
          <h1 className="text-2xl font-bold text-[#ffb400]">Something went wrong</h1>
          <p className="mt-3 text-gray-300">
            Please try again. If the issue persists, refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[#ffb400] px-6 py-3 font-semibold hover:bg-[#ffb400] hover:text-black transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

