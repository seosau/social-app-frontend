import { INotification } from "@/interfaces/notification.interfaces";
import { RootState } from "@/lib/redux/store";
import { formatTimeAgo } from "@/untils";
import { Avatar, Box, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Link from "next/link";
import ActionsList from "./components/ActionsList";
import { useMarkAsReadNotif } from "@/hooks/useMarkAsReadNotif";
import { useDeleteNotif } from "@/hooks/useDeleteNotif";

type NotificationProps = {
    notif: INotification
}

export function Notification({ notif }: NotificationProps) {
    const {idToMarkAsRead, setIdToMarkAsRead} = useMarkAsReadNotif();
    const {idToDelete, setIdToDelete} = useDeleteNotif();
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            width={"100%"}
            // border={1}
            // borderColor={grey[400]}
            // borderRadius={1}
            p={1}
            maxWidth={"100%"}
            sx={{
                position: 'relative',
                '&:hover .actions': {
                    display: 'flex',
                },
            }}
        >
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
                // maxWidth={"100%"}
            >
                <Box>
                    <Link href={`/profile/${notif.creatorId}`}
                        className="flex flex-row gap-2 items-start justify-start"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={notif.creatorAvtUrl}
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
                    <Link href={`/${notif.postId}`}
                        className="flex flex-row gap-2 items-center justify-start"
                    >
                        <Typography
                            sx={notif.isRead ? {
                                color: grey[500]
                            } : {
                                color: blue[500],
                            }}
                        >
                            {notif.message}
                        </Typography>
                    </Link>
                    <Typography
                        sx={{
                            color: grey[500],
                            fontSize: 13
                        }}
                    >
                        {formatTimeAgo(notif.createdAt)}
                    </Typography>
                </Box>
            </Box>  
            <Box
                className="actions"
                sx={{
                    display: 'none',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundColor: 'white',
                    zIndex: 10,
                }}
                justifyContent={"end"}
                alignItems={"center"}
            >
                <ActionsList id={notif.id} setIdToMarkAsRead={setIdToMarkAsRead} setIdToDelete={setIdToDelete} />
            </Box>
        </Box>
    )
}