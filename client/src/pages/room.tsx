import { useParams, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authProvider";
type PermissionState = "idle" | "requesting" | "granted" | "denied" | "error";

export default function Room() {
    const { roomId } = useParams<{ roomId: string }>();
    const location = useLocation();
    const { userId } = useAuth();
    console.log("[Room] location.state:", location.state);
    const roomName = (location.state as { roomName?: string })?.roomName ?? roomId;
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [permState, setPermState] = useState<PermissionState>("idle");
    const [camOn, setCamOn] = useState(true);
    const [micOn, setMicOn] = useState(true);

    /* Request camera + mic */
    const requestMedia = async () => {
        setPermState("requesting");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            streamRef.current = stream;
            setPermState("granted"); // triggers re-render → <video> mounts → useEffect sets srcObject
        } catch (err: any) {
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                setPermState("denied");
            } else {
                setPermState("error");
            }
        }
    };

    /* Toggle camera track */
    const toggleCam = () => {
        if (!streamRef.current) return;
        streamRef.current.getVideoTracks().forEach((t) => (t.enabled = !camOn));
        setCamOn((p) => !p);
    };

    /* Toggle mic track */
    const toggleMic = () => {
        if (!streamRef.current) return;
        streamRef.current.getAudioTracks().forEach((t) => (t.enabled = !micOn));
        setMicOn((p) => !p);
    };

    /* Assign stream to <video> once the element is in the DOM */
    useEffect(() => {
        if (permState === "granted" && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    }, [permState]);

    /* Cleanup on unmount */
    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach((t) => t.stop());
        };
    }, []);

    const handleJoin = () => {
        // TODO: connect to signalling server / WebRTC peer
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join-room",
                roomId,
                userId
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };

        ws.onerror = (err) => {
            console.log(err);
        }

        return () => {
            ws.close
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-sans px-4">

            {/* Room label */}
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-1">Room</p>
            <h1 className="text-2xl font-bold text-violet-300 tracking-tight mb-10 font-mono">
                {roomName}
            </h1>

            {/* Card */}
            <div className="w-full max-w-2xl bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 flex flex-col gap-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                {/* Preview area */}
                <div className="relative w-full aspect-video min-h-[360px] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
                    {permState === "granted" ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className={`w-full h-full object-cover transition-opacity duration-300 ${camOn ? "opacity-100" : "opacity-0"}`}
                            />
                            {!camOn && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-3xl">
                                        👤
                                    </div>
                                    <span className="text-white/40 text-xs tracking-wide">Camera off</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                            {permState === "idle" && (
                                <>
                                    <span className="text-4xl">🎥</span>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        Allow camera & microphone access<br />to join the call
                                    </p>
                                </>
                            )}
                            {permState === "requesting" && (
                                <>
                                    <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-white/50 text-sm">Waiting for permission…</p>
                                </>
                            )}
                            {permState === "denied" && (
                                <>
                                    <span className="text-4xl">🚫</span>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Permission denied. Please allow camera &<br />microphone access in your browser settings.
                                    </p>
                                </>
                            )}
                            {permState === "error" && (
                                <>
                                    <span className="text-4xl">⚠️</span>
                                    <p className="text-white/60 text-sm">Could not access your devices.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Controls row — only shown once granted */}
                {permState === "granted" && (
                    <div className="flex items-center justify-center gap-4">
                        {/* Mic toggle */}
                        <button
                            onClick={toggleMic}
                            title={micOn ? "Mute mic" : "Unmute mic"}
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-200 border ${micOn
                                ? "bg-white/10 border-white/15 hover:bg-white/20 text-white"
                                : "bg-red-500/25 border-red-400/40 hover:bg-red-500/35 text-red-300"
                                }`}
                        >
                            {micOn ? "🎙️" : "🔇"}
                        </button>

                        {/* Cam toggle */}
                        <button
                            onClick={toggleCam}
                            title={camOn ? "Turn off camera" : "Turn on camera"}
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-200 border ${camOn
                                ? "bg-white/10 border-white/15 hover:bg-white/20 text-white"
                                : "bg-red-500/25 border-red-400/40 hover:bg-red-500/35 text-red-300"
                                }`}
                        >
                            {camOn ? "📷" : "📵"}
                        </button>
                    </div>
                )}

                {/* CTA button */}
                {permState === "idle" || permState === "denied" || permState === "error" ? (
                    <button
                        onClick={requestMedia}
                        className="w-full py-3.5 rounded-2xl font-bold text-white text-base tracking-wide bg-gradient-to-br from-violet-700 to-purple-500 shadow-[0_8px_28px_rgba(124,58,237,0.45)] hover:shadow-[0_12px_36px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        Allow Camera & Microphone
                    </button>
                ) : permState === "granted" ? (
                    <button
                        onClick={handleJoin}
                        className="w-full py-3.5 rounded-2xl font-bold text-white text-base tracking-wide bg-gradient-to-br from-emerald-600 to-teal-500 shadow-[0_8px_28px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_36px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        Join Room
                    </button>
                ) : null}
            </div>
        </div>
    );
}
