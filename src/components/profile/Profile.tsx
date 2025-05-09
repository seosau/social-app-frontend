'use client'

import { instance } from "@/lib/axios";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Post } from "../Post";
import { LeftSide } from "../LeftSide";
import { UpdateProfilePopup } from "./UpdateProfilePopup";
import { IPost } from "@/interfaces/post.interfaces";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { IUser } from "@/interfaces/user.interfaces";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

type getPostsType = {
    keyword: string, 
    slug: string
}

const getPosts = async({keyword, slug} : getPostsType) => {
    try {
        const url = keyword.trim()? `/post/search/${keyword}/${slug}` : `/post/user/${slug}`;
        const res = await instance.get(url)
        return res.data;
    } catch (err) {
        console.error('Failed to load posts!', err);
        throw err;
    }
}

export function ProfileComp() {
    // const [posts, setPosts] = useState<IPost[]>();
    const user = useSelector((state: RootState) => state.user.user);
    const [thisProfileUser, setThisProfileUser] = useState<IUser>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const params = useParams<{slug: string}>();
    const [keyword, setKeyword] = useState("");
    const debouncedSearch = useDebounce(keyword, 500);
    const {data, isLoading, error} = useQuery({
        queryKey: ['userPosts', debouncedSearch, thisProfileUser],
        queryFn: () => getPosts({keyword: debouncedSearch, slug: params.slug}),
        retry: 3,
        staleTime: 5*60*1000,
        gcTime: 10*60*1000,
        refetchInterval: 30*1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true
    })
    // useEffect(() => {
    //     if(debouncedSearch.trim() === "") {
    //     getPosts();
    //     return;
    //     };
    //     instance.get(`/post/search/${debouncedSearch}/${thisProfileUser?.id}`)
    //     .then((res) => {
    //     setPosts(res.data);
    //     })
    //     .catch((err) => {
    //     console.error('Search error: ', err.message);
    //     getPosts();
    //     })
    // }, [debouncedSearch])

    const handleClickUpdate = () => {
        setIsOpen(!isOpen);
    }

    // useEffect(() => {
    //     if(!user?.id) return;
    //     getPosts();
    // },[user])

    useEffect(() => {
        if(!user?.id || !params.slug) return;
        if(user.id !== params.slug) {
            queryClient.invalidateQueries({queryKey: ['userPosts']})
            instance.get(`/user/${params.slug}`).then((res) => {
                setThisProfileUser(res.data);
            })
            .catch((err) => {
                console.error('Failed to load posts!', err.message);
            })
        }
        else {
            queryClient.invalidateQueries({queryKey: ['userPosts']})
            setThisProfileUser(user);
        }
    },[user, params])

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: Loading failed!!!</div>
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
            {isOpen && thisProfileUser && <UpdateProfilePopup user={thisProfileUser} open={isOpen} onClose={handleClickUpdate} />   }
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
                <LeftSide onKeywordChange={setKeyword}/>
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
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    // justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
                    {user?.id === params.slug && 
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{
                                position: 'fixed',
                                top: 20,
                                right: 20,
                            }}
                            onClick={handleClickUpdate}
                        >
                            Update Profile
                        </Button>
                    }
                    
                    <Avatar 
                    alt="Remy Sharp" 
                    src={thisProfileUser?.image}
                    sx={{ width: 100, height: 100, border: 1, borderColor: "grey.300" }}
                    />
                    <Box>
                    <Typography
                        fontSize={15}
                        color="text.secondary"
                        textTransform={"none"}
                        // bgcolor={"grey.100"}
                        // borderRadius={5}
                        width={"100%"}
                        textAlign={"left"}
                    >
                        {thisProfileUser?.fullName}
                    </Typography>
                    </Box>
                </Box>
                {data && data.map((post: IPost) => (
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
                {/* <RightSide /> */}
            </Box>
        </Box>
    )
}