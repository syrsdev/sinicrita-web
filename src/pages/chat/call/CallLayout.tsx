import React from "react";
import {
  FaPhoneAlt,
  FaPhoneSlash,
  FaTimes,
  FaMicrophone,
} from "react-icons/fa";

interface CallLayoutProps {
  status: "idle" | "ringing" | "connected" | "ended";
  isCaller: boolean;
  onStartCall: () => void;
  onAccept: () => void;
  onReject: () => void;
  onEndCall: () => void;
  onClose: () => void;
}

const CallLayout: React.FC<CallLayoutProps> = ({
  status,
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
            onClick={() => {
              if (status !== "idle" && status !== "ended") {
                onEndCall();
              } else {
                onClose();
              }
            }}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        {status === "idle" && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
              <FaMicrophone className="text-4xl text-gray-600" />
            </div>
            <p>Siap memanggil</p>
            <button
              onClick={onStartCall}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Mulai Panggilan
            </button>
          </div>
        )}

        {status === "ringing" && isCaller && (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-pulse bg-blue-100 rounded-full w-32 h-32 flex items-center justify-center">
              <FaMicrophone className="text-4xl text-blue-500" />
            </div>
            <p>Menghubungi...</p>
            <button
              onClick={onReject}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Batalkan
            </button>
          </div>
        )}

        {status === "ringing" && !isCaller && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-green-100 rounded-full w-32 h-32 flex items-center justify-center">
              <FaMicrophone className="text-4xl text-green-500" />
            </div>
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

        {status === "connected" && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-blue-100 rounded-full w-32 h-32 flex items-center justify-center">
              <FaMicrophone className="text-4xl text-blue-500" />
            </div>
            <p>Panggilan Berlangsung</p>
            <button
              onClick={onEndCall}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FaPhoneSlash /> Akhiri
            </button>
          </div>
        )}

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
