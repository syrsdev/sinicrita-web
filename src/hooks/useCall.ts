import { useEffect, useRef, useState } from "react";
import api from "../services/axios.service";
import Echo from "../services/echo";
import { useWebRtcSignaling } from "./useWebrtcSignaling";

type CallStatus = "idle" | "ringing" | "connected" | "ended";

export interface UseCallResult {
  status: CallStatus;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: () => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  error: string | null;
}

export const useCall = ({
  peerId,
  sessionId,
  onCallEnded,
  onCallReceived,
  enabled = true,
  userId, // Tambahkan userId untuk WebSocket
}: {
  peerId: number | null;
  sessionId: number | null;
  onCallEnded: () => void;
  onCallReceived: () => void;
  enabled?: boolean;
  userId: number; // Diperlukan untuk WebSocket
}): UseCallResult => {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const hasInitialized = useRef(false);

  // Gunakan WebSocket untuk signaling WebRTC (offer/answer/candidate)
  const { sendOffer, sendAnswer, sendCandidate } = useWebRtcSignaling(userId, {
    onOffer: (data) => {
      if (peerConnectionRef.current && data.offer) {
        peerConnectionRef.current
          .setRemoteDescription(data.offer)
          .then(() => {
            setStatus("ringing");
            onCallReceived();
          })
          .catch((err) => {
            console.error("❌ Gagal setRemoteDescription (offer):", err);
            endCall();
          });
      }
    },
    onAnswer: (data) => {
      if (peerConnectionRef.current && data.answer) {
        peerConnectionRef.current
          .setRemoteDescription(data.answer)
          .then(() => setStatus("connected"))
          .catch((err) => {
            console.error("❌ Gagal setRemoteDescription (answer):", err);
            endCall();
          });
      }
    },
    onCandidate: (data) => {
      if (peerConnectionRef.current && data.candidate) {
        peerConnectionRef.current
          .addIceCandidate(data.candidate)
          .catch(console.error);
      }
    },
  });

  // Reset saat disabled
  useEffect(() => {
    if (!enabled) {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      setStatus("idle");
      setError(null);
      setLocalStream(null);
      setRemoteStream(null);
      hasInitialized.current = false;
    }
  }, [enabled]);

  const sendToServer = async (type: string, payload: any) => {
    if (!enabled || !sessionId) return;
    try {
      const endpointMap: Record<string, string> = {
        initiate: `/call/initiate`, // Hanya untuk status panggilan
        end: `/call/${sessionId}/end`,
        missed: `/call/${sessionId}/missed`,
      };

      const endpoint = endpointMap[type];
      if (!endpoint) return;

      await api.post(endpoint, payload);
    } catch (err) {
      console.error(`[Call] Gagal kirim ${type}:`, err);
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setStatus("ended");
    if (enabled && sessionId) {
      sendToServer("end", {});
    }
    onCallEnded();
  };

  useEffect(() => {
    if (!enabled || !peerId || !sessionId || hasInitialized.current) return;

    hasInitialized.current = true;
    let isCancelled = false;

    const initializeCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false, // Hanya audio
        });
        if (isCancelled) return;
        setLocalStream(stream);

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        peerConnectionRef.current = pc;

        stream.getAudioTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (e) => {
          if (isCancelled) return;
          if (e.streams[0]) setRemoteStream(e.streams[0]);
        };

        // Kirim ICE candidate via WebSocket
        pc.onicecandidate = (e) => {
          if (e.candidate && peerId) {
            sendCandidate(peerId, e.candidate);
          }
        };

        // Gunakan Echo hanya untuk status panggilan (bukan signaling WebRTC)
        const channel = Echo.private(`call.${sessionId}`);
        channel.listen(".CallEnded", onCallEnded);
        channel.listen(".CallMissed", onCallEnded);

        return () => {
          channel.stopListening(".CallEnded");
          channel.stopListening(".CallMissed");
          if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
          }
        };
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message);
          endCall();
        }
      }
    };

    initializeCall();

    return () => {
      isCancelled = true;
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      Echo.leave(`call.${sessionId}`);
    };
  }, [enabled, peerId, sessionId]);

  const startCall = async () => {
    if (!enabled || !peerConnectionRef.current || !peerId) return;
    try {
      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      });
      await peerConnectionRef.current.setLocalDescription(offer);

      // Kirim offer via WebSocket (bukan API)
      sendOffer(peerId, offer);
      setStatus("ringing");
    } catch (err: any) {
      setError(err.message);
      endCall();
    }
  };

  const acceptCall = async () => {
    if (!enabled || !peerConnectionRef.current || !peerId) return;
    try {
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      // Kirim answer via WebSocket (bukan API)
      sendAnswer(peerId, answer);
      setStatus("connected");
    } catch (err: any) {
      setError(err.message);
      endCall();
    }
  };

  const rejectCall = () => {
    if (enabled && sessionId) {
      sendToServer("missed", {});
    }
    endCall();
  };

  return {
    status,
    localStream,
    remoteStream,
    startCall: enabled ? startCall : () => {},
    acceptCall: enabled ? acceptCall : () => {},
    rejectCall: enabled ? rejectCall : () => {},
    endCall: enabled ? endCall : () => {},
    error,
  };
};
