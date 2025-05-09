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

export function ProfileComp() {
    const [posts, setPosts] = useState<IPost[]>();
    const user = useSelector((state: RootState) => state.user.user);
    const [thisProfileUser, setThisProfileUser] = useState<IUser>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const params = useParams<{slug: string}>();
    const [keyword, setKeyword] = useState("");
    const debouncedSearch = useDebounce(keyword, 500);

    const getPosts = () => {
        instance.get(`/post/user/${params.slug}`).then((res) => {
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
        instance.get(`/post/search/${debouncedSearch}/${thisProfileUser?.id}`)
        .then((res) => {
        setPosts(res.data);
        })
        .catch((err) => {
        console.error('Search error: ', err.message);
        getPosts();
        })
    }, [debouncedSearch])

    const handleClickUpdate = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(!user?.id) return;
        getPosts();
    },[user])

    useEffect(() => {
        if(!user?.id || !params.slug) return;
        if(user.id !== params.slug) {
            instance.get(`/user/${params.slug}`).then((res) => {
                setThisProfileUser(res.data);
            })
            .catch((err) => {
                console.error('Failed to load posts!', err.message);
            })
        }
        else {
            setThisProfileUser(user);
        }
    },[user, params])

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
                {/* <RightSide /> */}
            </Box>
        </Box>
    )
}