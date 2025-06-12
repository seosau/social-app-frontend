'use client'

import { Avatar, Box, Button, Typography, ImageList, ImageListItem, Divider, colors, Menu, MenuItem, TextField } from "@mui/material";
import { icons } from "@/untils";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interfaces";
import { IPost } from "@/interfaces/post.interfaces";
import { useEffect, useState } from "react";
import React from "react";
import { UpdatePostPopup } from "./UpdatePostPopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { postApi } from "@/apis/post.api";
import { CommentList } from "./comment/Comment";
import { grey } from "@mui/material/colors";
import { ICommentCreateFormData, ICommentListExtra } from "@/interfaces/comment.interfaces";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


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

const schema = yup.object({
    postId: yup.string().required("PostId is required"),
    // userId: yup.string().required("UserId is required"),
    content: yup.string().required("Content is required"),
    parentId: yup.string().required().nullable(),
})

type FormData = yup.InferType<typeof schema>


const createComment = async (data: FormData) => {
    try {
        const res = await postApi.createComment(data as ICommentCreateFormData)
        alert('Reply successfully!')
    } catch (err) {
        console.error('Reply error: ', err)
        throw err
    }
}

const deletePost = async (postId: string) => {
    try {
        const res = await postApi.delete(postId);
        alert('This post was deleted!');
        return res.data;
    } catch (err) {
        console.error('Delete error!', err)
    }
}

const getComments = async (postId: string) => {
    try {
        const res = await postApi.getComments(postId);
        return res.parentWithChilds;
    } catch (err) {
        console.error('Get comment error!', err)
    }
}

export function Post({ post }: Post) {
    const [user, setUser] = useState<IUser>();
    const [likeCount, setLikeCount] = useState<number>(post.likeCount ?? 0);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [visibleComment, setVisibleComment] = useState<boolean>(false)
    const [visibleCommentInput, setVisibleCommentInput] = useState<boolean>(false)
    const [comments, setComments] = useState<ICommentListExtra[]>()

    const { data, isLoading, isError } = useQuery({
        queryKey: [`allComments:${post.id}`],
        queryFn: () => getComments(post.id),
        retry: 3,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchInterval: 30 * 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true
    })

    useEffect(() => {
        setComments(data)
    }, [data])
    
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        }
    })

    const createCommentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`allComments:${post.id}`] })
        }
    })

    const { control, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            postId: post.id,
            content: '',
            parentId: null,
        }
    })

    const onSubmit = (data: FormData) => {
        createCommentMutation.mutate(data);
    }

    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
    const handleClickUpdate = () => {
        handleClose();
        setIsOpenUpdate(!isOpenUpdate);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickDelete = () => {
        try {
            deleteMutation.mutate(post.id);
            handleClose();
        } catch (err) {
            console.error('Delete error!', err)
        }
    }

    const handleToggleLike = () => {
        const preLikeStatus = isLiked
        const preCount = likeCount
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
        postApi.toggleLike(post.id).then(() => {
            // if (isLiked) {
            //     setLikeCount(likeCount - 1);
            // } else {
            //     setLikeCount(likeCount + 1);
            // }
            // setIsLiked(!isLiked);
        })
            .catch((err) => {
                console.error('Toggle like Error!', err.message);
                setLikeCount(preCount)
                setIsLiked(preLikeStatus);
            })
    }

    const handleClickComment = async (postId: string) => {
        try {
            setVisibleCommentInput(!visibleCommentInput)
            if (!comments) {
                // const res = await postApi.getComments(postId)
                // const commentList = res.parentWithChilds

                // console.log(commentList)
                // setComments(commentList)
            } else {
                setVisibleComment(!visibleComment)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const userExisted = localStorage.getItem('user');
        if (userExisted) {
            setUser(JSON.parse(userExisted));
        }
    }, [])

    // useEffect(() => {
    //     // setVisibleCommentInput(true)
    //     setVisibleComment(true)
    // }, [comments])

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
            <UpdatePostPopup post={post} open={isOpenUpdate} onClose={handleClickUpdate} />
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
                                <MenuItem onClick={handleClickUpdate}>Update</MenuItem>
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
                        {post.commentCount} Comments
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
            <Divider sx={{ width: '100%', padding: 0, margin: 0 }} />
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
                    onClick={() => {
                        handleClickComment(post.id)
                    }}
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
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: Loading failed!!!</div>}
            {comments &&
                <Box
                    display={visibleComment ? "flex" : "none"}
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}
                    height={"auto"}
                    // marginTop={1}
                >
                    <CommentList comments={comments} />
                </Box>
            }
            <Box
                display={visibleCommentInput ? "flex" : "none"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <TextField
                    {...register('content')}
                    type="text"
                    placeholder="Type a message..."
                    sx={{
                        flex: 5,
                        // paddingY: 0
                    }}
                    name="content"
                    id="content"
                />
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    sx={{
                        flex: 1,
                        // paddingY: 0,
                        marginLeft: 1,
                        textTransform: "none",
                        width: '100%',
                        height: "100%"
                    }}
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}