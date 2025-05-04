'use client'

import { instance } from "@/lib/axios";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Post } from "../Post";
import { LeftSide } from "../LeftSide";
import { IUser } from "@/interfaces/user.interfaces";
import { IPost } from "@/interfaces/post.interfaces";
import UpdateProfilePopup from "./UpdateProfilePopup";

export function ProfileComp() {
    const [posts, setPosts] = useState<IPost[]>();
    const [user, setUser] = useState<IUser>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickUpdate = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const userExisted = localStorage.getItem('user');
        if (userExisted) {
            setUser(JSON.parse(userExisted));
        }
    }, [])

    useEffect(() => {
        if(!user?.id) return;
        instance.get('/post/user', { params: { userId: user?.id } }).then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            console.error('Failed to load posts!', err.message);
        })
    },[user])
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
            {isOpen && user && <UpdateProfilePopup user={user} open={isOpen} onClose={handleClickUpdate} />   }
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
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    // justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
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
                    <Avatar 
                    alt="Remy Sharp" 
                    src={user?.image}
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
                        {user?.fullName}
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