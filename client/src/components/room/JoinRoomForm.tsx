import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { authApi } from "../../utils/api";

const joinRoomSchema = z.object({
    roomId: z
        .string()
        .min(3, "roomId must be at least 3 characters")
        .max(100, "roomId must be at most 100 characters"),
});

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        color: "#e9d5ff",
        "& fieldset": { borderColor: "rgba(167,139,250,0.4)" },
        "&:hover fieldset": { borderColor: "rgba(167,139,250,0.7)" },
        "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
    },
    "& .MuiInputLabel-root": { color: "rgba(196,167,255,0.7)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
    "& .MuiFormHelperText-root": { color: "#f87171" },
};

type JoinRoomFormData = z.infer<typeof joinRoomSchema>;

interface JoinRoomFormProps {
    onClose?: () => void;
}

export const JoinRoomForm = ({ onClose }: JoinRoomFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<JoinRoomFormData>({
        resolver: zodResolver(joinRoomSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: JoinRoomFormData) => {
        console.log(data);
        const res = await authApi.post("/room/join", data);
        console.log("[JoinRoom] API response:", res.data);
        const { roomId } = res.data;
        navigate(`/room/${roomId}`);
    };

    return (
        /* Full-viewport wrapper with video background */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* GIF background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/video.mp4"
                autoPlay
                loop
                muted
            />

            {/* Dark overlay on top of video */}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

            {/* Close button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 z-10 text-white/60 hover:text-white text-3xl leading-none transition-colors duration-200"
                    aria-label="Close"
                >
                    ✕
                </button>
            )}

            {/* Form card — centered in viewport */}
            <form
                className="relative z-10 flex flex-col gap-7 w-[min(420px,88vw)] bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-3xl px-10 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Heading */}
                <div className="flex flex-col gap-1 text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Join Room
                    </h2>
                    <p className="text-white/45 text-sm">Join a room</p>
                </div>

                {/* Room name input */}
                <TextField
                    label="Room Id"
                    variant="outlined"
                    fullWidth
                    sx={fieldSx}
                    {...register("roomId")}
                    error={!!errors.roomId}
                    helperText={errors.roomId?.message}
                />

                {/* Submit */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                        paddingY: 1.4,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        borderRadius: "14px",
                        textTransform: "none",
                        letterSpacing: "0.03em",
                        background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                        boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #6d28d9 0%, #7e22ce 100%)",
                            boxShadow: "0 12px 36px rgba(124,58,237,0.6)",
                        },
                        "&:disabled": {
                            opacity: 0.6,
                        },
                    }}
                >
                    {isSubmitting ? "joining…" : "Join Room"}
                </Button>
            </form>
        </div>
    );
};
