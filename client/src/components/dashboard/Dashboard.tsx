import { useState, useEffect } from "react";
import { authApi } from "../../utils/api";
import { CreateRoomForm } from "../room/CreateRoomForm";
import { JoinRoomForm } from "../room/JoinRoomForm";

export default function Dashboard() {
  const [hovered, setHovered] = useState(false);
  const [joinHovered, setJoinHovered] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await authApi.get("/user");
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 h-16 bg-white/[0.04] backdrop-blur-md border-b border-white/[0.08]">
        <span className="text-[1.4rem] font-bold tracking-widest text-violet-400 lowercase">
          vimet
        </span>
        <div className="cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-700 to-violet-400 flex items-center justify-center text-white font-bold text-sm border-2 border-violet-400/50 shadow-[0_0_0_3px_rgba(124,58,237,0.25)] select-none">
            {user?.username}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-white/45 text-base tracking-wider">
          Ready to connect?
        </p>

        {/* Create Room button */}
        <button
          onClick={() => setShowCreateRoom(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex items-center gap-2 px-11 py-4 text-lg font-bold tracking-wide text-white rounded-2xl border-0 cursor-pointer bg-gradient-to-br from-violet-700 to-purple-500 shadow-[0_8px_32px_rgba(124,58,237,0.45),0_0_0_1px_rgba(167,139,250,0.2)] transition-all duration-200 ${hovered
            ? "translate-y-[-3px] scale-[1.02] shadow-[0_14px_40px_rgba(124,58,237,0.6),0_0_0_1px_rgba(167,139,250,0.35)]"
            : ""
            }`}
        >
          <span className="text-2xl font-light leading-none">+</span>
          Create Room
        </button>

        {/* Join Room button */}
        <button
          onClick={() => setShowJoinRoom(true)}
          onMouseEnter={() => setJoinHovered(true)}
          onMouseLeave={() => setJoinHovered(false)}
          className={`flex items-center gap-2 px-11 py-4 text-lg font-bold tracking-wide text-white rounded-2xl border border-violet-400/40 cursor-pointer bg-white/[0.06] backdrop-blur-sm shadow-[0_4px_20px_rgba(124,58,237,0.2)] transition-all duration-200 ${joinHovered
            ? "translate-y-[-3px] scale-[1.02] bg-white/[0.10] border-violet-400/70 shadow-[0_8px_32px_rgba(124,58,237,0.35)]"
            : ""
            }`}
        >
          <span className="text-xl leading-none">→</span>
          Join Room
        </button>
      </main>

      {/* Create Room overlay — slides up from bottom */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${showCreateRoom ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCreateRoom(false)}
        />

        {/* Panel sliding from bottom */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out ${showCreateRoom ? "translate-y-0" : "translate-y-full"
            }`}
        >
          <CreateRoomForm onClose={() => setShowCreateRoom(false)} />
        </div>
      </div>

      {/* Join Room overlay — slides down from top */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${showJoinRoom ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowJoinRoom(false)}
        />

        {/* Panel sliding from top */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out ${showJoinRoom ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <JoinRoomForm onClose={() => setShowJoinRoom(false)} />
        </div>
      </div>
    </div>
  );
}
