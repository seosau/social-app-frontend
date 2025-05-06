'use client'

import { Avatar, Box, Button, Typography, ImageList, ImageListItem, Divider, colors, Menu, MenuItem } from "@mui/material";
import { icons } from "@/untils";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interfaces";
import { IPost } from "@/interfaces/post.interfaces";
import { useEffect, useState } from "react";
import { instance } from "@/lib/axios";
import React from "react";

const interactButtonSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    borderRadius: 1,
    textTransform: "none",
    color: "text.secondary",
    padding: 0,
}
const likedButtonSx = {
    ...interactButtonSx,
    color: colors.blue[500],
}

type Post = {
    post: IPost
}

export function Post({post}: Post) {
    const [user, setUser] = useState<IUser>();
    const [likeCount, setLikeCount] = useState<number>(post.likedBy.length);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClickDelete = () => {
        instance.delete(`/post/${post.id}`).then(() => {
            alert('This Post was deleted!')
            handleClose();
        })
        .catch((err) => {
            console.error('Delete error!', err.message);
        })
    }

    const handleToggleLike = () => {
        instance.post(`/post/${post.id}/toggleLike`).then(() => {
            if (isLiked) {
                setLikeCount(likeCount - 1);
            } else {
                setLikeCount(likeCount + 1);
            }
            setIsLiked(!isLiked);
        })
        .catch((err) => {
            console.error('Toggle like Error!', err.message);
        })
    }
    
    useEffect(() => {
        const userExisted = localStorage.getItem('user');
        if (userExisted) {
            setUser(JSON.parse(userExisted));
        }
    }, [])

    useEffect(() => {
        const index = post.likedBy.findIndex(likedUser => likedUser.id === user?.id);
        if (index > -1) {
            setIsLiked(true);
        }
    }, [user])
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            width={"100%"}
            height={"100%"}
            padding={2}
            border={1}
            borderColor={"grey.300"}
            borderRadius={2}
            boxShadow={1}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"100%"}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    // justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                    >
                    <Link href={`/profile/${post.user.id}`}>
                        <Avatar 
                            alt={post.user.fullName} 
                            src={post.user.image}
                            sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
                        />
                    </Link>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={0}
                    >
                        <Link href={`/profile/${post.user.id}`}>
                            <Typography
                                fontSize={15}
                                color="text.secondary"
                                textTransform={"none"}
                                width={"100%"}
                                textAlign={"left"}
                            >
                                {post.user.fullName}
                            </Typography>
                        </Link>
                        <Typography
                            fontSize={10}
                            color="text.secondary"
                            textTransform={"none"}
                            width={"100%"}
                            textAlign={"left"}
                        >
                            April 28, 12:30 PM
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"end"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
                    {post.user.id === user?.id && (
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    borderRadius: "50%",
                                }}
                            >
                                <icons.more 
                                    sx={{ 
                                        color: "text.secondary", 
                                        fontSize: 20, 
                                        cursor: "pointer", 
                                    }} 
                                />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Update</MenuItem>
                                <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
                gap={2}
            >
                <Typography
                    fontSize={15}
                    color="text.secondary"
                    textTransform={"none"}
                    width={"100%"}
                    textAlign={"left"}
                >
                    {post.content}
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
                    <ImageList cols={1} rowHeight={"auto"}>
                            <ImageListItem>
                                <img
                                    src={post.image}
                                    alt={post.content}
                                    loading="lazy"
                                />
                            </ImageListItem>
                    </ImageList>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"auto"}
                marginTop={2}
                marginBottom={0}
            >
                <Typography
                    fontSize={15}
                    color="text.secondary"
                    textTransform={"none"}
                    sx={{ whiteSpace: "nowrap" }}
                >
                    {likeCount} Likes
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"end"}
                    width={"100%"}
                    height={"auto"}
                    gap={2}
                >
                    <Typography
                        fontSize={15}
                        color="text.secondary"
                        textTransform={"none"}
                    >
                        0 Comments
                    </Typography>
                    <Typography
                        fontSize={15}
                        color="text.secondary"
                        textTransform={"none"}
                    >
                        0 Shares
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ width: '100%', padding: 0, margin: 0}}/>
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"auto"}
                marginTop={1}
            >
                <Button
                    onClick={handleToggleLike}
                    sx={isLiked ? likedButtonSx : interactButtonSx} // Xet dieu kien da like chua
                >
                    {isLiked ? // Xet dieu kien da like chua
                        <icons.liked 
                            sx={{ 
                                color: colors.blue[500], 
                                fontSize: 20, 
                                cursor: "pointer", 
                            }} 
                        /> 
                        : 
                        <icons.like 
                            sx={{ 
                                color: "text.secondary", 
                                fontSize: 20, 
                                cursor: "pointer", 
                            }} 
                        />
                    }
                    Like
                </Button>
                <Button
                    sx={interactButtonSx}
                >
                    <icons.comment 
                        sx={{ 
                            color: "text.secondary", 
                            fontSize: 20, 
                            cursor: "pointer", 
                        }} 
                    />
                    Comment
                </Button>
                <Button
                    sx={interactButtonSx}
                >
                    <icons.share 
                        sx={{ 
                            color: "text.secondary", 
                            fontSize: 20, 
                            cursor: "pointer", 
                        }} 
                    />
                    Share
                </Button>
            </Box>
        </Box>
    )
}