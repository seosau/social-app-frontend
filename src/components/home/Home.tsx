'use client'
import { NewPostOptions, Post, LeftSide, RightSide} from "@/components";
import { instance } from "@/lib/axios";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IPost } from "@/interfaces/post.interfaces";
import { useDebounce } from "@/hooks/useDebounce";

export function HomeComp() {
    const [posts, setPosts] = useState<IPost[]>();
    const [keyword, setKeyword] = useState("");
    const debouncedSearch = useDebounce(keyword, 500);

    const getPosts = () => {
      instance.get('/post').then((res) => {
          setPosts(res.data);
      })
      .catch((err) => {
          console.error('Failed to load posts!', err.message);
      })
    }

    useEffect(() => {
      if(debouncedSearch.trim() === "") {
        getPosts();
        return;
      };
      instance.get(`/post/search/${debouncedSearch}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('Search error: ', err.message);
        getPosts();
      })
    }, [debouncedSearch])

    useEffect(() => {
      getPosts();
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
        width={1/4}
        height={"100%"}
        padding={2}
        flex={1}
      >
          <LeftSide keyword={keyword} onKeywordChange={setKeyword} />
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
        width={1/4}
        height={"100vh"}
        padding={2}
        flex={1}
      >
          <RightSide />
      </Box>
    </Box>
  );
}