'use client'

import { NewPostOptions, Post, LeftSide, RightSide } from "@/components";
import { Box } from "@mui/material";
import { useGetPost } from "@/hooks/useGetPost";
import Link from "next/link";
import { icons } from "@/untils";

export function PostDetailComp() {

    const {post, setIdToGet} = useGetPost();
    // if(isLoading) return <div>Loading...</div>
    // if(error) return <div>Error: Loading failed!!!</div>
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
                alignItems={"start"}
                justifyContent={"start"}
                gap={2}
                width={1 / 4}
                height={"100%"}
                padding={2}
                flex={1}
            >
                {/* <LeftSide keyword={keyword} onKeywordChange={setKeyword} /> */}
                <Link href={'/'} className="flex gap-1 text-blue-500 text-xl items-center justify-start">
                    <icons.back />
                    Back
                </Link>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                width={"100%"}
                height={"100%"}
                flex={2}
            >
                <NewPostOptions />
                {!!post && (
                    <Post post={post} key={post.id} />
                )}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"start"}
                gap={2}
                width={1 / 4}
                height={"100vh"}
                padding={2}
                flex={1}
            >
                <RightSide />
            </Box>
        </Box>
    );
}