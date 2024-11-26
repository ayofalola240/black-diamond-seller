"use client";

import { format } from "date-fns";
import { useEffect } from "react";
import { cn, getRelativeTime } from "@/lib/utils";

export const DataTableTime: React.FC<{
  date: Date;
  index: number;
  showOnlyMinutesPassed?: boolean;
}> = ({ date, index, showOnlyMinutesPassed = false }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const relativeTime = getRelativeTime(date);
      document.getElementById(`last-bid-time-ago-${index}`)!.textContent =
        relativeTime;
    }, 1000);
    return () => clearInterval(interval);
  }, [date, index]);

  return (
    <div
      className={cn(
        "flex gap-4 sm:min-w-auto flex-row items-center",
        !showOnlyMinutesPassed && "min-w-[250px]"
      )}
    >
      {!showOnlyMinutesPassed && (
        <span className="text-white">
          {format(new Date(date), "MMM d, yyyy h:mm a")}
        </span>
      )}

      <span className="text-[#666666]" id={`last-bid-time-ago-${index}`}>
        {getRelativeTime(new Date())}
      </span>
    </div>
  );
};
