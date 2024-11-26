"use client";

import { useEffect, useState } from "react";

export const useCountDown = ({ closingDate, status, disabled = false }: { closingDate?: Date; status?: string; disabled?: boolean }) => {
  const [time, setTime] = useState("");
  const [isClosed, setIsClosed] = useState(Boolean(status != "ongoing"));

  useEffect(() => {
    if (!closingDate || disabled) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = new Date(closingDate).getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        setIsClosed(true);
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const timeLeft = minutes > 60 ? `${Math.floor(minutes / 60)}hrs, ${minutes % 60}mins, ${seconds}sec` : `${minutes}mins ${seconds}sec`;

        setTime(timeLeft);
      }
    }, 1000);

    if (status != "ongoing") {
      setIsClosed(true);
      clearInterval(intervalId);
    } else {
      setIsClosed(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [closingDate, status, disabled]);

  return { isClosed, time };
};
