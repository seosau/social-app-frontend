import { NewPostOptions, Post, LeftSide, RightSide} from "@/components";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"start"}
      justifyContent={"space-between"}
      gap={2}
      width={"100%"}
      height={"100%"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        height={"100%"}
        padding={2}
        flex={1}
      >
          <LeftSide />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        height={"100%"}
        padding={2}
        flex={2}
      >
          <NewPostOptions />
          <Post />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"start"}
        gap={2}
        width={"100%"}
        height={"100vh"}
        padding={2}
        flex={1}
      >
          <RightSide />
      </Box>
    </Box>
  );
}