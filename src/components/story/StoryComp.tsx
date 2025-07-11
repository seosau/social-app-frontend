'use client'

import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { StoryCard } from "./card/StoryCard";
import { IStory } from "@/interfaces/story.interfaces";
import { blue, grey } from "@mui/material/colors";
import { useGetAllStory } from "@/hooks/useGetAllStory";
import Link from "next/link";
import { icons } from "@/untils";

export function StoryComp() {
    const { allStory } = useGetAllStory()
    return (
        <Box
            width={"100%"}
        >
            <Grid
                // display={"flex"}
                // justifyContent={"space-between"}
                // alignContent={"center"}
                // width={"100%"}
                // overflow={"scroll"}
                // padding={1}
                // // bgcolor={blue[400]}
                // gap={2}
                container
                spacing={2}
                sx={{
                    // width: "full",
                    justifyContent: "start",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    padding: 1

                }}
            >
                <Grid>
                    <Link href={'/story/create'}>
                        <Paper
                            sx={{
                                height: 140,
                                width: 100,
                                backgroundColor: '#fff',
                                // ...theme.applyStyles('dark', {
                                //     backgroundColor: '#1A2027',
                                // }),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {/* <Box></Box> */}
                            <icons.addBox sx={{
                                color: blue[500],
                                width: 80,
                                height: 80,
                                opacity: 0.5
                            }}/>
                        </Paper>
                    </Link>
                </Grid>
                {!!allStory && allStory.map((story) => (
                    <Grid key={story.id}>
                        <Paper
                            sx={{
                                height: 140,
                                width: 100,
                                backgroundColor: '#fff',
                                // ...theme.applyStyles('dark', {
                                //     backgroundColor: '#1A2027',
                                // }),
                            }}
                        >
                            <StoryCard story={story} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}