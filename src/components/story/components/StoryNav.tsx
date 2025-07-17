'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import { formatTimeAgo } from '@/untils';
import { blue } from '@mui/material/colors';
import { StoryDetail } from './StoryDetail';
import { useGetAllStory } from '@/hooks/useGetAllStory';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            className='w-full h-full'
        >
            {value === index && (
                <Box sx={{ height: "100%" }}>
                    <Typography sx={{ height: "100%" }}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function StoryNav() {
    const { allStory } = useGetAllStory()

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'white', display: 'flex', height: '100vh' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {!!allStory && allStory.map((story) => (
                    <Tab
                        key={story.id}
                        label={
                            <Box
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                width="100%"
                                gap={2}
                            >
                                <Avatar
                                    src={story.user.image}
                                    sx={{
                                        border: 4,
                                        borderColor: blue[500]
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
                        }
                        sx={{
                            textTransform: 'none',
                            width: 360,
                        }}
                    />
                ))}
            </Tabs>
            {!!allStory && allStory.map((story, index) => (
                <TabPanel
                    value={value}
                    index={index}
                >
                    <StoryDetail story={story} activeTab={value} setActiveTab={setValue} numberOfStory={allStory.length}/>
                </TabPanel>
            ))}
        </Box>
    );
}
