import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginForm = () => {
  return (
    <form className="flex flex-col gap-8 w-[75%]">
      {/* Heading */}
      <h2
        className="
      text-3xl font-bold text-center
      text-[#452c6d]   /* lavender-purple-700 */
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
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#452c6d",
            "& fieldset": { borderColor: "#452c6d" },
            "&:hover fieldset": { borderColor: "#522f6a" },
            "&.Mui-focused fieldset": { borderColor: "#452c6d" },
          },
          "& .MuiInputLabel-root": { color: "#6e3f8d" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#452c6d" },
        }}
      />

      {/* Password */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#452c6d",
            "& fieldset": { borderColor: "#452c6d" },
            "&:hover fieldset": { borderColor: "#522f6a" },
            "&.Mui-focused fieldset": { borderColor: "#452c6d" },
          },
          "& .MuiInputLabel-root": { color: "#6e3f8d" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#452c6d" },
        }}
      />

      {/* Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          paddingY: 1.25,
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
