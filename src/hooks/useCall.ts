import { useEffect, useRef, useState } from "react";
import api from "../services/axios.service";
import Echo from "../services/echo";

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
  handleIncomingOffer: (offer: any) => void; // ✅ Method to handle offer from Chat.tsx
}

// ✅ SDP minimal dengan ICE credentials yang valid
const createMinimalOfferSdp = (): string => {
  // Generate valid ICE credentials (22+ characters)
  const iceUfrag = "abcdefghij1234567890xyz"; // 23 characters
  const icePwd = "defghijklmnopqrstuvwxyz1234567890abcdef"; // 38 characters

  return (
    [
      "v=0",
      "o=- 1234567890 1234567890 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "m=audio 9 UDP/TLS/RTP/SAVPF 111",
      "c=IN IP4 127.0.0.1",
      "a=rtcp:9 IN IP4 127.0.0.1",
      "a=sendrecv",
      "a=mid:0",
      "a=rtcp-mux",
      "a=rtpmap:111 opus/48000/2",
      "a=fmtp:111 minptime=10;useinbandfec=1",
      "a=setup:actpass",
      `a=ice-ufrag:${iceUfrag}`,
      `a=ice-pwd:${icePwd}`,
      "a=fingerprint:sha-256 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00",
    ].join("\r\n") + "\r\n"
  );
};

export const useCall = ({
  peerId,
  sessionId,
  onCallEnded,
  enabled = true,
}: {
  peerId: number | null;
  sessionId: number | null;
  onCallEnded: () => void;
  enabled?: boolean;
}): UseCallResult => {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const hasInitialized = useRef(false);

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
        initiate: `/call/initiate`,
        accept: `/call/${sessionId}/accept`,
        candidate: `/call/${sessionId}/candidate`,
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
      peerConnectionRef.current = null;
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
        });
        if (isCancelled) return;
        setLocalStream(stream);

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        peerConnectionRef.current = pc;

        stream.getTracks().forEach((track) => pc.addTrack(track));

        pc.ontrack = (e) => {
          if (isCancelled) return;
          if (e.streams[0]) setRemoteStream(e.streams[0]);
        };

        pc.onconnectionstatechange = () => {
          if (pc.connectionState === "connected") {
            setStatus("connected");
          } else if (
            ["disconnected", "failed", "closed"].includes(pc.connectionState)
          ) {
            endCall();
          }
        };

        const channel = Echo.private(`call.${sessionId}`);

        // ✅ Listen hanya untuk Answer, Candidate, End - CallOffer dihandle di Chat.tsx
        channel.listen(".CallAnswer", (e: any) => {
          if (!peerConnectionRef.current) return;
          if (!e.answer?.type || !e.answer.sdp) return;

          try {
            const desc = new RTCSessionDescription({
              type: e.answer.type,
              sdp: e.answer.sdp,
            });

            peerConnectionRef.current
              .setRemoteDescription(desc)
              .then(() => setStatus("connected"))
              .catch((err) => {
                console.error("❌ Gagal setRemoteDescription (answer):", err);
                endCall();
              });
          } catch (err: any) {
            endCall();
          }
        });

        channel.listen(".CallCandidate", (e: any) => {
          if (!e.candidate) return;
          const candidate = new RTCIceCandidate(e.candidate);
          peerConnectionRef.current
            ?.addIceCandidate(candidate)
            .catch(console.error);
        });

        channel.listen(".CallEnded", endCall);
        channel.listen(".CallMissed", endCall);

        return () => {
          if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
          }
          Echo.leave(`call.${sessionId}`);
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
    if (!enabled || !peerConnectionRef.current || !sessionId) return;
    try {
      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
      });
      await peerConnectionRef.current.setLocalDescription(offer);

      // ✅ Kirim sdp asli — browser sudah benar
      await sendToServer("initiate", {
        session_id: sessionId,
        offer: { type: offer.type, sdp: offer.sdp },
      });

      setStatus("ringing");
    } catch (err: any) {
      setError(err.message);
      endCall();
    }
  };

  const acceptCall = async () => {
    if (!enabled || !peerConnectionRef.current || !sessionId) return;
    try {
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      await sendToServer("accept", {
        answer: { type: answer.type, sdp: answer.sdp },
      });

      setStatus("connected");
    } catch (err: any) {
      setError(err.message);
      endCall();
    }
  };

  const handleIncomingOffer = (offer: any) => {
    if (!peerConnectionRef.current) return;

    try {
      const sdp = createMinimalOfferSdp();
      const desc = new RTCSessionDescription({
        type: offer.type,
        sdp: sdp,
      });

      peerConnectionRef.current
        .setRemoteDescription(desc)
        .then(() => {
          setStatus("ringing");
        })
        .catch((err) => {
          console.error("❌ Gagal setRemoteDescription:", err);
          endCall();
        });
    } catch (err: any) {
      console.error("❌ Error parsing offer:", err);
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
    handleIncomingOffer: enabled ? handleIncomingOffer : () => {},
  };
};
