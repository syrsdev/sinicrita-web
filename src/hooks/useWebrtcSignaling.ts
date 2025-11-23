// src/hooks/useWebRtcSignaling.ts
import { useEffect, useCallback } from "react";
import { initSocket } from "../services/SocketIo";

export const useWebRtcSignaling = (
  userId: number,
  callbacks: {
    onOffer: (data: any) => void;
    onAnswer: (data: any) => void;
    onCandidate: (data: any) => void;
  }
) => {
  useEffect(() => {
    const socket = initSocket(userId);

    if (socket) {
      socket.on("offer", callbacks.onOffer);
      socket.on("answer", callbacks.onAnswer);
      socket.on("candidate", callbacks.onCandidate);
    }

    return () => {
      if (socket) {
        socket.off("offer", callbacks.onOffer);
        socket.off("answer", callbacks.onAnswer);
        socket.off("candidate", callbacks.onCandidate);
      }
    };
  }, [userId, callbacks]);

  const sendOffer = useCallback(
    (targetUserId: number, offer: any) => {
      const socket = initSocket(userId);
      socket.emit("offer", { targetUserId, offer });
    },
    [userId]
  );

  const sendAnswer = useCallback(
    (targetUserId: number, answer: any) => {
      const socket = initSocket(userId);
      socket.emit("answer", { targetUserId, answer });
    },
    [userId]
  );

  const sendCandidate = useCallback(
    (targetUserId: number, candidate: any) => {
      const socket = initSocket(userId);
      socket.emit("candidate", { targetUserId, candidate });
    },
    [userId]
  );

  return { sendOffer, sendAnswer, sendCandidate };
};
