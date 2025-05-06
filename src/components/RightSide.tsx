'use client'

import { RootState } from "@/lib/redux/store";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

export function RightSide() {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"start"}
            // position={"fixed"}
            width={"100%"}
            height={"100vh"}
            border={1}
            borderColor={"grey.300"}
            borderRadius={2}
            boxShadow={1}
            padding={2}
        >
            <Box
                padding={0}
                width={"100%"}
            >
                <Link href={`/profile/${user?.id}`}
                    className="flex flex-row gap-2 items-center justify-start"
                >
                    <Avatar 
                    alt="Remy Sharp" 
                    src={user?.image}
                    sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
                    />
                    {user?.fullName}   
                </Link>
            </Box>
        </Box>
    )
}