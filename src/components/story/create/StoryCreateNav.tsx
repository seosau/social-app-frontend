'use client'

import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StoryCreateComp from './components/StoryCreateComp';
import { icons } from '@/untils';

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

export function StoryCreateNav() {
    const [value, setValue] = React.useState(0);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    // };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'white', display: 'flex', height: '100vh' }}
        >
            <Tabs
                orientation="vertical"
                // variant="scrollable"
                value={value}
                // onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"start"}
                    justifyContent={"start"}
                    gap={2}
                    width={360}
                    padding={2}
                >
                    <Link href={'/'} className="flex gap-1 text-blue-500 text-xl items-center justify-start underline-offset-0">
                        <icons.back />
                        Back
                    </Link>
                </Box>
            </Tabs>
            <TabPanel
                value={value}
                index={0}
            >
                <StoryCreateComp />
            </TabPanel>
        </Box>
    );
}
