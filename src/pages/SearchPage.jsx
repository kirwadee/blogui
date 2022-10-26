import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";

const SearchPage = () => {
  //get searched parameters
  const query = useLocation().search;
  console.log(query);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/find${query}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [query]);

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card sx={{ height: 350 }}>
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

export default SearchPage;
