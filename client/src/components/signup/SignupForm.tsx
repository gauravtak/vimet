import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import api from "../../utils/api";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignupFormData = z.infer<typeof signupSchema>;

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

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    await api.post("/auth/register", data);
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
        Create Your Account
      </h2>

      {/* Username */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        sx={fieldSx}
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

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
        Sign Up
      </Button>
    </form>
  );
};
