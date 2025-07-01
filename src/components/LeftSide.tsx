'use client'

import { Box, InputAdornment, TextField } from "@mui/material";
import { icons } from "@/untils";
import { Notification } from "./notification/Notification";
import { useEffect } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { toast } from 'react-toastify';
import Link from "next/link";
import { common, red } from "@mui/material/colors";
import { PostDetailComp } from "./post/PostDetail";
import { useGetPost } from "@/hooks/useGetPost";

type LeftSideProps = {
  keyword: string,
  onKeywordChange: (value: string) => void
}

export function LeftSide({ keyword, onKeywordChange }: LeftSideProps) {

  const { notifList, refetch: getnotifRefetch } = useGetNotifications()

  const { notifications } = useWebSocket()

  useEffect(() => {
    console.log('4444444444444444444444444444444', notifications)
    if (!!notifications && notifications.length > 0) {
      toast.info(
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          width={"100%"}
        >
          <span>
            {notifications[0].message}
          </span>
          <Box
            display={"flex"}
            justifyContent={"end"}
            width={"100%"}
          >
            <Link href={`/${notifications[0].postId}`} className="underline">
              Xem ngay →
            </Link>
          </Box>
        </Box>, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    getnotifRefetch()
    // if (Array.isArray(notifList)) {
    //   setNotifList([notifications[0], ...notifList])
    // } else {
    //   setNotifList(notifications)
    // }
  }, [notifications])
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"start"}
      justifyContent={"start"}
      position={"fixed"}
      left={0}
      top={0}
      // right={0}
      bottom={0}
      // maxWidth={"100%"}
      width={"25vw"}
      height={"100vh"}
      border={1}
      borderColor={"grey.300"}
      borderRadius={2}
      boxShadow={1}
      padding={2}
      gap={2}
      overflow={'scroll'}
    >
      <Box
        width={"100%"}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value.toString())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <icons.search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"center"}
        width={"100%"}
      >
        {!!notifList && notifList.length > 0 && notifList.map((notif) => (
          <Box
            key={notif.id}
            width={"100%"}
          >
            <Notification notif={notif} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}