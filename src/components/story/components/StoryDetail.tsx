import { IStory } from "@/interfaces/story.interfaces";
import { formatTimeAgo, formatTimeAgoUTC7, icons } from "@/untils";
import { Avatar, Box, Button, LinearProgress } from "@mui/material";
import { blue, common } from "@mui/material/colors";
import { useEffect, useState } from "react";

type StoryDetailProps = {
    story: IStory,
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>,
    numberOfStory: number,
}

export function StoryDetail({story, activeTab, setActiveTab, numberOfStory} : StoryDetailProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        if (activeTab < numberOfStory - 1) {
                            setActiveTab(activeTab + 1);
                        }
                    }, 300); // đợi thêm 150ms cho chắc
                    return prev;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={common.black}
            gap={5}
        >
            <Button
                onClick={() => setActiveTab(activeTab - 1)}
                disabled = {activeTab === 0}
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: blue[200],
                    color: common.black
                }}
            >
                <icons.west />
            </Button>
            <Box
                width={"50%"}
                height={"100vh"}
                bgcolor={common.white}
            >
                <LinearProgress
                    variant="determinate"
                    color="primary"
                    value={progress}
                />
                <Box
                    display={'flex'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    width="100%"
                    gap={2}
                    paddingX={1}
                >
                    <Avatar
                        src={story.user.image}
                        sx={{
                            // border: 4,
                            // borderColor: blue[500]
                            boxShadow: 2,
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                    >
                        <span className='truncate' >Ma Seo Sau</span>
                        <span>{formatTimeAgoUTC7(story.createdAt)}</span>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    maxHeight={"90vh"}
                    height={"100%"}
                >
                    <img 
                        src={story.image} 
                        loading="lazy"
                        className="object-scale-down w-full flex justify-center items-center"
                    />
                </Box>
            </Box>
            <Button
                onClick={() => setActiveTab(activeTab + 1)}
                disabled = {activeTab === numberOfStory-1}
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: blue[200],
                    color: common.black
                }}
            >
                <icons.east />
            </Button>
        </Box>
    )
}