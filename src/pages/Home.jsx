import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "340px",
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  marginTop: "20px",
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  height: "340px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "300px",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.down("md")]: {
    height: "140px",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.down("md")]: {
    height: "160px",
  },
}));

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(posts);

  const firstpost = posts.slice(0, 1);
  const restposts = posts.slice(1, 8);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {firstpost.map((fpost) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={fpost?._id}>
            <Link
              to={`/post/${fpost._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <StyledCard>
                <StyledCardActionArea>
                  <StyledCardMedia
                    component="img"
                    image={fpost?.img}
                    alt={fpost?.title}
                  />
                  <StyledCardContent>
                    <Link
                      to={`/post/${fpost._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ "&:hover": { color: blue[400] } }}
                      >
                        {fpost?.title.substring(0, 50)}...
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {fpost?.desc.substring(0, 130)}...
                    </Typography>
                  </StyledCardContent>
                </StyledCardActionArea>
              </StyledCard>
            </Link>
          </Grid>
        ))}
        {restposts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={post?._id}>
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card sx={{ height: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post?.img}
                    alt={post?.title}
                  />
                  <CardContent sx={{ height: 160 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ "&:hover": { color: blue[400] } }}
                    >
                      {post?.title.substring(0, 50)}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post?.desc.substring(0, 130)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
