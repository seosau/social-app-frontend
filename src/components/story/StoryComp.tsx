import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { StoryCard } from "./card/StoryCard";
import { IStory } from "@/interfaces/story.interfaces";
import { blue } from "@mui/material/colors";

const story = {
    id: "c6540f5c-568e-402a-a61b-17126a8e99bc",
    image: "https://res.cloudinary.com/dmwr1iglt/image/upload/v1751438306/upload/iqyf72gqvfuik9dyhmex.png",
    userId: "07b40520-b08f-4090-b56d-b80ec1939f06",
    createdAt: "2025-07-02T06:38:27.704Z",
    updateAt: "2025-07-02T06:38:27.704Z",
    deletedAt: "",
} as IStory

export function StoryComp() {

    return (
        <>
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
                    width: "100%",
                    justifyContent: "start",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    padding: 1
                    
                }}
            >
                {[0, 1, 2, 3, 4, 5, 6].map((value) => (
                    <Grid key={value}>
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
        </>
    )
}