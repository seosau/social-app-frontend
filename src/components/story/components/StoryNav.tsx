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

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function StoryNav() {
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((value) => (
                    <Tab
                        key={value}
                        label={
                            <Box
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                width="100%"
                                gap={2}
                            >
                                <Avatar
                                    src='https://res.cloudinary.com/dmwr1iglt/image/upload/v1751438306/upload/iqyf72gqvfuik9dyhmex.png'
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
                        {...a11yProps(0)}
                    />
                ))}
            </Tabs>
            {[1, 2, 3, 4, 5, 6, 7].map((valuee, index) => (
                <TabPanel
                    value={value}
                    index={index}
                >
                    <StoryDetail />
                </TabPanel>
            ))}
        </Box>
    );
}
