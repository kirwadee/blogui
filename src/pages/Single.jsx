import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuSuggestions from "../components/MenuSuggestions";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStart, fetchPostSuccess } from "../features/post/postSlice";

const SingleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "50px",
  marginTop: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const SinglePageContentContainer = styled(Box)(() => ({
  flex: 5,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const MenuContentContainer = styled(Box)(() => ({
  flex: 2,
}));

const UserDiv = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
}));

const InfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Single = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostDataAndUserData = async () => {
      dispatch(fetchPostStart());

      try {
        const res = await axios.get(`/posts/${postId}`);
        dispatch(fetchPostSuccess(res.data));

        //fetch the user who own this post also
        const userRes = await axios.get(`/users/profile/${res.data.userId}`);
        setUser(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostDataAndUserData();
  }, [postId, dispatch]);

  const { currentUser } = useSelector((state) => state.auth);
  const { currentPost } = useSelector((state) => state.post);

  return (
    <SingleContainer>
      <SinglePageContentContainer>
        <Box
          component="img"
          src={currentPost?.img}
          alt=""
          sx={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <UserDiv>
          {currentUser && (
            <Box
              component="img"
              src={user?.profilePic}
              alt={user?.username}
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}

          <InfoWrapper>
            {currentUser && (
              <Typography variant="h6" fontSize={16}>
                {user?.username}
              </Typography>
            )}
            <Typography variant="h6" fontSize={14}>
              Posted {moment(currentPost?.createdAt).fromNow()}
            </Typography>
          </InfoWrapper>
        </UserDiv>
        <Typography variant="h1" sx={{ fontSize: "34px" }}>
          {currentPost?.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", lineHeight: "25px" }}
        >
          {currentPost?.desc}
        </Typography>
      </SinglePageContentContainer>
      <MenuContentContainer>
        <MenuSuggestions postId={postId} />
      </MenuContentContainer>
    </SingleContainer>
  );
};

export default Single;
