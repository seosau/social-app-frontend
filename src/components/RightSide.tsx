'use client'
import { IUser } from "@/interfaces/user.interfaces";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RightSide() {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const userExisted = localStorage.getItem('user');
        if (userExisted) {
            setUser(JSON.parse(userExisted));
        }
    }, [])

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
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
                    />
                    User Name   
                </Link>
            </Box>
        </Box>
    )
}