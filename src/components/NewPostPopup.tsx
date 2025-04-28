import { Avatar, Box, Button, Divider, MenuItem, Select, Typography } from "@mui/material";

export function NewPostPopup() {
  return (
    <Box
      display={"flex"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      bgcolor={"rgba(0, 0, 0, 0.1)"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        maxWidth={500}
        height={"100%"}
        maxHeight={500}
        border={1}
        borderColor={"grey.300"}
        borderRadius={2}
        boxShadow={3}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={"text.primary"}
          textAlign={"center"}
          width={"100%"}
        >
          Create new post
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: 2 }} />
        <Box
          display="flex"
          flexDirection="row"
          alignItems={"center"}
          // justifyContent={"center"}
          width={"100%"}
          height={"100%"}
          gap={2}
        >
          <Avatar 
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40, border: 1, borderColor: "grey.300" }}
          />
          <Box>
            <Typography
              fontSize={15}
              color="text.secondary"
              textTransform={"none"}
              padding={1}
              // bgcolor={"grey.100"}
              // borderRadius={5}
              width={"100%"}
              textAlign={"left"}
            >
              Remy Sharp
            </Typography>
            <Select value={"public"} sx={{ width: "100%" }}>
              <MenuItem value="public" sx={{ padding: 1 }}>
                Public
              </MenuItem>
              <MenuItem value="friends" sx={{ padding: 1 }}>
                Friends
              </MenuItem>
              <MenuItem value="private" sx={{ padding: 1 }}>
                Private
              </MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}