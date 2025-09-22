import api from "./axios.service";

// export const callInitiate = (
//   sessionId: number,
//   offer: RTCSessionDescriptionInit
// ) =>
//   api.post("/call/initiate", {
//     session_id: sessionId,
//     offer: { type: offer.type, sdp: offer.sdp }, // ONLY {type,sdp}
//   });

// export const callAccept = (
//   sessionId: number,
//   answer: RTCSessionDescriptionInit
// ) =>
//   api.post(`/call/${sessionId}/accept`, {
//     answer: { type: answer.type, sdp: answer.sdp },
//   });

export const callSendCandidate = (
  sessionId: number,
  candidate: RTCIceCandidateInit
) =>
  api.post(`/call/${sessionId}/candidate`, {
    candidate: {
      candidate: candidate.candidate,
      sdpMid: candidate.sdpMid,
      sdpMLineIndex: candidate.sdpMLineIndex,
    },
  });

export const callEnd = (sessionId: number) =>
  api.post(`/call/${sessionId}/end`);
export const callRinging = (sessionId: number) =>
  api.post(`/call/${sessionId}/ringing`);
export const callMissed = (sessionId: number) =>
  api.post(`/call/${sessionId}/missed`);
