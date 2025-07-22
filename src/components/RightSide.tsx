'use client'

import { clearUser } from "@/lib/redux/features/userSlice";
import { RootState } from "@/lib/redux/store";
import { Avatar, Box, Button, Divider } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "./chat/Chat";
import { useLogout } from "@/hooks/useLogOut";
import { toast } from "react-toastify";
import { blue } from "@mui/material/colors";
import ListUser from "./chat/ListUser";

export function RightSide() {
    const user = useSelector((state: RootState) => state.user.user);
    const {isPending, logout} = useLogout()
    const handleLogout = () => {
        logout();
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"start"}
            justifyContent={"space-between"}
            position={"fixed"}
            bottom={0}
            // left={0}
            right={0}
            top={0}
            width={"25vw"}
            height={"100vh"}
            border={1}
            borderColor={"grey.300"}
            borderRadius={2}
            boxShadow={1}
            padding={2}
            // gap={2}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"start"}
                justifyContent={"space-between"}
                // position={"fixed"}
                width={"100%"}
                // height={"100vh"}
                // border={1}
                // borderColor={"grey.300"}
                // borderRadius={2}
                // boxShadow={1}
                padding={2}
                gap={2}
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
                {user?.id ? (
                    <Box
                        padding={0}
                        width={"100%"}
                        display={'flex'}
                        justifyContent={'end'}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                            loading={isPending}
                        >
                            Logout
                        </Button>
                    </Box>                    
                ): (
                    <Box
                        padding={0}
                        width={"100%"}
                        display={'flex'}
                        justifyContent={'end'}
                    >
                        <Link
                            href={'/auth/login'}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Link>
                    </Box> 
                )}
            </Box>    
            <Box
                width={'100%'}
            >
                <Divider variant="fullWidth"/>
            </Box>
            <Box
                // position={"fixed"}
                // bottom={0}
                // // left={0}
                // right={0}
                // width={"100%"}
                // height={"100vh"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"start"}
                // padding={2}
                // gap={2}
                // border={1}
                // borderColor={"grey.300"}
                // borderRadius={2}
                // boxShadow={1}
                bgcolor={blue[200]}
                width={"100%"}
                height={"100%"}
            >
                <ChatComponent receiverId={''} />
                <ListUser />
            </Box>        
        </Box>
    )
}