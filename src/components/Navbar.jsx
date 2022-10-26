import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  minHeight: 70,
});

const StyledPaperForm = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "400px",
  [theme.breakpoints.down("md")]: {
    width: "200px",
    justifyContent: "center",
  },
  boxShadow: 0,
  border: "1px solid #ccc",
  borderRadius: 0,
  mr: 1,
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        top: 0,
        border: 0,
        backgroundColor: blue[400],
      }}
    >
      <StyledToolbar>
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton size="large" disabled>
            <PermContactCalendarIcon
              sx={{ mr: 2, color: "white", height: "40px", width: "40px" }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                color: "white",
                fontWeignt: "bold",
                textDecoration: "none",
                fontFamily: '"Cookie", cursive',
                display: { md: "inline", xs: "none" },
              }}
            >
              Person Of Interest
            </Typography>
            <Typography
              sx={{ display: { xs: "inline", md: "none", color: "white" } }}
            >
              POI
            </Typography>
          </IconButton>
        </Link>

        {/* SEARCH BAR */}

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <StyledPaperForm component="form">
              <InputBase
                sx={{ ml: 1, flex: 1, pl: 1 }}
                placeholder="Search..."
                onChange={(e) => setQ(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{ backgroundColor: "#eee", borderRadius: 0 }}
                aria-label="Search"
                onClick={() => navigate(`/search?q=${q}`)}
              >
                <SearchIcon />
              </IconButton>
            </StyledPaperForm>
          </Box>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
