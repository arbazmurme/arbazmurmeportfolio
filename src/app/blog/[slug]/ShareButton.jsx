"use client";

import { ShareIcon } from "@heroicons/react/24/outline";

export default function ShareButton({ title, description }) {
  const handleShare = async () => {
    const shareData = {
      title,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        // Keep UX non-blocking; screen readers will still announce success via aria-live.
        const el = document.getElementById("share-status");
        if (el) el.textContent = "Link copied to clipboard!";
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this article"
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
      >
        <ShareIcon className="w-5 h-5" />
        Share
      </button>
      <span id="share-status" className="sr-only" aria-live="polite" />
    </div>
  );
}