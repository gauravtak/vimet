import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const SignupForm = () => {
  return (
    <form className="flex flex-col gap-8 w-[75%]">
      {/* Heading */}
      <h2
        className="
      text-3xl font-bold text-center
      text-[#452c6d]   /* lavender-purple-700 */
    "
      >
        Create Your Account
      </h2>

      {/* Username */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#452c6d",
            "& fieldset": { borderColor: "#452c6d" },
            "&:hover fieldset": { borderColor: "#522f6a" }, // velvet-orchid-700
            "&.Mui-focused fieldset": { borderColor: "#452c6d" },
          },
          "& .MuiInputLabel-root": { color: "#6e3f8d" }, // softer dark purple
          "& .MuiInputLabel-root.Mui-focused": { color: "#452c6d" },
        }}
      />

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

      {/* Button (kept same, still matches) */}
      <Button
        variant="contained"
        fullWidth
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
