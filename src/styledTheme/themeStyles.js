import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const myTheme = createTheme({
  palette: {
    primary: {
      main: blue[400],
    },
  },
  background: {
    default: "#fff",
  },
});
