'use client'
import { NewPostOptions, Post, LeftSide, RightSide} from "@/components";
import { instance } from "@/lib/axios";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type UserType = {
    id: string,
    fullName: string,
    email: string
}

type PostType = {
    id: string,
    access: string,
    content: string,
    image: string,
    user: UserType
}

export function HomeComp() {
    const [posts, setPosts] = useState<PostType[]>();

    useEffect(() => {
        instance.get('/post').then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            console.error('Failed to load posts!', err.message);
        })
    },[])
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"start"}
      justifyContent={"space-between"}
      gap={2}
      width={"100%"}
      height={"100%"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        height={"100%"}
        padding={2}
        flex={1}
      >
          <LeftSide />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        height={"100%"}
        padding={2}
        flex={2}
      >
          <NewPostOptions />
          {posts && posts.map((post) => (
            <Post post={post} key={post.id}/>
          ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"start"}
        gap={2}
        width={"100%"}
        height={"100vh"}
        padding={2}
        flex={1}
      >
          <RightSide />
      </Box>
    </Box>
  );
}