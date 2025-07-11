'use client'

import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { Box, Button, Fab, Input, Slider, styled, Typography } from '@mui/material';
import { useCreateStory } from '@/hooks/useCreateStory';
import { base64ToFile, icons } from '@/untils';
import { blue, common, grey, pink } from '@mui/material/colors';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

export default function StoryCreateComp() {
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const nodeRef = useRef(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [captionFontSize, setCaptionFontSize] = useState<number>(24);
    const [captionArr, setCaptionArr] = useState<string[]>([]);
    const choosedCaptionRef = useRef<HTMLDivElement>(null)

    const { createStoryMuta } = useCreateStory()

    const handleClickChangeImage = () => {
        fileInputRef.current?.click();
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneratedImage(null)
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    const generateImage = async () => {
        if (!containerRef.current) return;

        const canvas = await html2canvas(containerRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: null
        });
        const dataUrl = canvas.toDataURL('image/png');
        setCaption('')
        setCaptionArr([])
        setGeneratedImage(dataUrl);

        const file = base64ToFile(dataUrl, 'generated.png')

        const formData = new FormData();
        formData.append('file', file)

        createStoryMuta(formData);

    };

    const actions = [
        { icon: <icons.photo />, name: 'Change image', onClick: handleClickChangeImage },
        { icon: <icons.note />, name: 'Add caption' },
        { icon: <icons.fontSize />, name: 'Caption size' },
    ];

    function handleChangeCaptionFontSize(event: Event, value: number, activeThumb: number): void {
        if (choosedCaptionRef.current) {
            choosedCaptionRef.current.style.fontSize = `${value}px`
        }
    }

    function handleClickCaption(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        choosedCaptionRef.current = event.currentTarget;
    }

    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            bgcolor={grey[100]}
            gap={5}
        >
            <Box
                width={"25%"}
                display={"flex"}
                justifyContent={"center"}
            >
                {/* {image && (
                    <Button variant="outlined" sx={{ mt: 2, textTransform: 'none' }} onClick={generateImage}>
                        Publish
                    </Button>
                )} */}
            </Box>
            <Box
                width={"50%"}
                height={"100vh"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                flexDirection={"column"}
                bgcolor={common.white}
            >
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                {!image && (
                    <Box
                        ref={containerRef}
                        // mt={2}
                        position="relative"
                        width="100%"
                        height="100vh"
                        // border="1px solid #ccc"
                        overflow="hidden"
                        sx={{
                            backgroundImage: `url(${generatedImage ?? image})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Button
                            sx={{
                                width: "50%",
                                height: "50%",
                                borderRadius: 5,
                            }}
                            component="label"
                            onClick={handleClickChangeImage}
                        >
                            <Box
                                display={"flex"}
                                width={"100%"}
                                height={"100%"}
                                borderRadius={5}
                                bgcolor={grey[300]}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <icons.photo
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        color: blue[500]
                                    }}
                                />
                            </Box>
                        </Button>
                    </Box>
                )}
                {/* Khu vực hiển thị ảnh + caption kéo thả */}
                {image && (
                    <Box
                        ref={containerRef}
                        mt={2}
                        position="relative"
                        width="100%"
                        height="100vh"
                        // border="1px solid #ccc"
                        overflow="hidden"
                        sx={{
                            backgroundImage: `url(${generatedImage ?? image})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* <Draggable bounds="parent" nodeRef={nodeRef}>
                            <div
                                ref={nodeRef}
                                style={{
                                    position: 'absolute',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: captionFontSize,
                                    // textShadow: '1px 1px 3px black',
                                    cursor: 'move',
                                    // padding: 5,
                                    // margin: 5,
                                    maxWidth: 400,
                                    maxHeight: 500,
                                    zIndex: 10
                                }}
                            >
                                {caption}
                            </div>
                        </Draggable> */}
                        {captionArr.length > 0 && captionArr.map((item) =>
                            <Draggable bounds="parent" nodeRef={nodeRef}>
                                <div
                                    ref={nodeRef}
                                    style={{
                                        position: 'absolute',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: 24,
                                        textShadow: nodeRef.current === choosedCaptionRef.current ? '1px 1px 3px red' : 'none',
                                        cursor: 'move',
                                        // padding: 5,
                                        // margin: 5,
                                        maxWidth: 400,
                                        maxHeight: 500,
                                        zIndex: 10
                                    }}
                                    onClick={handleClickCaption}
                                >
                                    {item}
                                </div>
                            </Draggable>
                        )}
                    </Box>
                )}
            </Box>
            <Box
                width={"25%"}
                height={"100%"}
                display={"flex"}
                bgcolor={common.white}
                flexDirection={"column"}
                gap={5}
                alignItems={"flex-end"}
                padding={2}
            >
                {image && (
                    <Fab color="primary" variant="extended" aria-label="add" onClick={generateImage}>
                        <icons.publish sx={{ mr: 1 }} />
                        Publish
                    </Fab>
                )}
                <Input
                    placeholder="Nhập caption..."
                    fullWidth
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    onBlur={() => setCaptionArr([...captionArr, caption])}
                />
                <Box sx={{ width: "100%" }}>
                    <Slider
                        size="small"
                        defaultValue={captionFontSize}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={handleChangeCaptionFontSize}
                    />
                </Box>
                <Box sx={{ position: 'relative', mt: 3, height: "100%" }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        hidden={false}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name} slotProps={{ tooltip: action.name }}
                                onClick={action.onClick}
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </Box>
        </Box>
    );
}
