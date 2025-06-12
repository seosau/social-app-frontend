import { RootState } from "@/lib/redux/store";
import { formatTimeAgo } from "@/untils";
import { Avatar, Box, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Link from "next/link";
import { useSelector } from "react-redux";

export function Notification() {
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={2}
            width={"100%"}
            // border={1}
            // borderColor={grey[400]}
            // borderRadius={1}
            p={1}
            maxWidth={"100%"}
        >
            <Box>
                <Link href={`/profile/${user?.id}`}
                    className="flex flex-row gap-2 items-start justify-start"
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={user?.image}
                        sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
                    />
                </Link>
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"center"}
                gap={1}
            >
                <Link href={`/post/{postId}`}
                    className="flex flex-row gap-2 items-center justify-start"
                >
                    <Typography
                        sx={{
                            color: blue[500]
                        }}
                    >
                        {user?.fullName} has like/comment your post
                    </Typography>
                </Link>
                <Typography
                    sx={{
                        color: grey[500],
                        fontSize: 13
                    }}
                >
                    {formatTimeAgo(new Date(1749502000 * 1000).toISOString())}
                </Typography>
            </Box>
        </Box>
    )
}