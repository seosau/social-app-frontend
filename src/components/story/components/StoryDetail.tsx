import { formatTimeAgo, icons } from "@/untils";
import { Avatar, Box, Button, LinearProgress } from "@mui/material";
import { blue, common } from "@mui/material/colors";
import { useEffect, useState } from "react";

export function StoryDetail() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
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
                        src='https://res.cloudinary.com/dmwr1iglt/image/upload/v1751438306/upload/iqyf72gqvfuik9dyhmex.png'
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
                        <span>{formatTimeAgo('2025-07-02T06:38:27.704Z')}</span>
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
                        src='https://res.cloudinary.com/dmwr1iglt/image/upload/v1751438306/upload/iqyf72gqvfuik9dyhmex.png' 
                        loading="lazy"
                        className="object-scale-down w-full flex justify-center items-center"
                    />
                </Box>
            </Box>
            <Button
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