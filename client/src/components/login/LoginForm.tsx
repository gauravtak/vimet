import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../utils/api";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authProvider";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#452c6d",
    "& fieldset": { borderColor: "#452c6d" },
    "&:hover fieldset": { borderColor: "#522f6a" },
    "&.Mui-focused fieldset": { borderColor: "#452c6d" },
  },
  "& .MuiInputLabel-root": { color: "#6e3f8d" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#452c6d" },
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await api.post("/auth/login", data);
    const { accessToken, user } = res.data;
    if (accessToken && user) {
      login(accessToken, user?.id);
      navigate("/dashboard");
    }
  };

  return (
    <form
      className="flex flex-col gap-8 w-[75%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Heading */}
      <h2
        className="
          text-3xl font-bold text-center
          text-[#452c6d]
        "
      >
        Welcome Back
      </h2>

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        sx={fieldSx}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Password */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={fieldSx}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{
          paddingY: 1.25,
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "12px",
          textTransform: "none",
          background: "linear-gradient(135deg, #9f608e 0%, #7349b6 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #804d72 0%, #5c3a92 100%)",
          },
        }}
      >
        Login
      </Button>
    </form>
  );
};
