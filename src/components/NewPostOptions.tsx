import { Avatar, Box, Divider, Button } from "@mui/material";
import { icons } from "@/untils";


const commonSx = {
  fontSize: 13,
  fontWeight: "bold",
  color: "text.secondary",
  padding: 1,
  width: "100%",
  textAlign: "left",
  display: "flex",
  gap: 1,
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
};

export function NewPostOptions() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      width={"100%"}
      height={"100%"}
      border={1}
      borderColor={"grey.300"}
      borderRadius={2}
      boxShadow={3}
      padding={2}

    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        gap={2}
      >
        <Avatar 
          alt="Remy Sharp" 
          src="/static/images/avatar/1.jpg"
          sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
        />
        <Button
          sx={{
            fontSize: 15,
            color: "text.secondary",
            textTransform: "none",
            padding: 1,
            bgcolor: "grey.100",
            borderRadius: 5,
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          What are you thinking, Remy?
        </Button>
      </Box>
      <Divider sx={{ width: '100%'}}/>
      <Box
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        gap={2}
      >
        <Button sx={commonSx} startIcon={<icons.video sx={{ color: "red" }} />}>
          Livestream
        </Button>
        <Button sx={commonSx} startIcon={<icons.photo sx={{ color: "green" }} />}>
          Picture/Video
        </Button>
        <Button sx={commonSx} startIcon={<icons.mood sx={{ color: "orange" }} />}>
          Mood
        </Button>
      </Box>
    </Box>
  );
}