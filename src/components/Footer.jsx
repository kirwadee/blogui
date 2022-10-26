import { Box, Tooltip, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const FooterWrapper = styled(Box)(({ theme }) => ({
  marginTop: "100px",
  backgroundColor: blue[400],
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SocialWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  color: "white",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <PermContactCalendarIcon
          sx={{ mr: 2, color: "white", height: "40px", width: "40px" }}
        />
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeignt: "bold",
            textDecoration: "none",
            fontFamily: '"Cookie", cursive',
          }}
        >
          Person Of Interest
        </Typography>
      </Box>
      <Typography variant="h6" color="white" textAlign="center" gutterBottom>
        Get To Know Interesting Personalities
      </Typography>
      <SocialWrapper>
        <Typography>Follow Us On</Typography>
        <Tooltip title="oyamobeauchannel">
          <YouTubeIcon />
        </Tooltip>
        <Tooltip title="oyamobeauchannel">
          <FacebookIcon />
        </Tooltip>
        <Tooltip title="oyamobeauchannel">
          <TwitterIcon />
        </Tooltip>
      </SocialWrapper>
    </FooterWrapper>
  );
};

export default Footer;
