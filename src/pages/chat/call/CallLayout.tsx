// components/call/CallLayout.tsx
import React from "react";
import { FaPhoneAlt, FaPhoneSlash, FaTimes } from "react-icons/fa";

interface CallLayoutProps {
  status: "idle" | "ringing" | "connected" | "ended";
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCaller: boolean; // true = pemanggil, false = penerima
  onStartCall: () => void;
  onAccept: () => void;
  onReject: () => void;
  onEndCall: () => void;
  onClose: () => void;
}

const CallLayout: React.FC<CallLayoutProps> = ({
  status,
  localStream,
  remoteStream,
  isCaller,
  onStartCall,
  onAccept,
  onReject,
  onEndCall,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Panggilan Suara</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* 🔹 1. Pemanggil: Klik untuk mulai */}
        {status === "idle" && (
          <div className="flex flex-col items-center gap-4">
            <video
              ref={(ref) => {
                if (ref && localStream) ref.srcObject = localStream;
              }}
              autoPlay
              muted
              className="w-32 h-32 rounded-full object-cover"
            />
            <p>Siap memanggil</p>
            <button
              onClick={onStartCall}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Mulai Panggilan
            </button>
          </div>
        )}

        {/* 🔹 2. Pemanggil: Sedang menghubungi */}
        {status === "ringing" && isCaller && (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p>Menghubungi...</p>
            <button
              onClick={onReject}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Batalkan
            </button>
          </div>
        )}

        {/* 🔹 3. Penerima: Dapat panggilan */}
        {status === "ringing" && !isCaller && (
          <div className="flex flex-col items-center gap-4">
            <video
              ref={(ref) => {
                if (ref && localStream) ref.srcObject = localStream;
              }}
              autoPlay
              muted
              className="w-32 h-32 rounded-full object-cover"
            />
            <p>Panggilan Masuk</p>
            <div className="flex gap-3">
              <button
                onClick={onAccept}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <FaPhoneAlt /> Terima
              </button>
              <button
                onClick={onReject}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <FaPhoneSlash /> Tolak
              </button>
            </div>
          </div>
        )}

        {/* 🔹 4. Terhubung */}
        {status === "connected" && (
          <div className="flex flex-col items-center gap-4">
            <video
              ref={(ref) => {
                if (ref && remoteStream) ref.srcObject = remoteStream;
              }}
              autoPlay
              playsInline
              className="w-32 h-32 rounded-full object-cover"
            />
            <p>Panggilan Berlangsung</p>
            <button
              onClick={onEndCall}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FaPhoneSlash /> Akhiri
            </button>
          </div>
        )}

        {/* 🔹 5. Selesai */}
        {status === "ended" && (
          <div className="flex flex-col items-center gap-4">
            <p>Panggilan Selesai</p>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLayout;
