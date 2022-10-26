import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MenuContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
}));

const PostContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
}));

const MenuSuggestions = ({ postId }) => {
  const [posts, setPosts] = useState([]);

  const filteredPosts = posts?.filter((post) => post._id !== postId);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const res = await axios.get(`/posts`);
        setPosts(res.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostsByCategory();
  }, []);

  return (
    <MenuContainer>
      <Typography variant="h1" sx={{ fontSize: "30px" }}>
        Other Posts you may like
      </Typography>

      <Divider />

      {filteredPosts.length < 0 ? (
        <Alert severity="info">No Recommended Posts For you</Alert>
      ) : (
        filteredPosts.map((post) => (
          <PostContainer key={post._id}>
            <ImageContainer>
              <Box
                component="img"
                src={post.img}
                alt={post.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageContainer>

            <Typography variant="h6" sx={{ fontSize: "20px", color: "#555" }}>
              {post.title}
            </Typography>
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                sx={{ width: "max-content", textTransform: "none" }}
                variant="outlined"
              >
                Read More
              </Button>
            </Link>
          </PostContainer>
        ))
      )}
    </MenuContainer>
  );
};

export default MenuSuggestions;
