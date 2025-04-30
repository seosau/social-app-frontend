import { Avatar, Box, Button, Typography, ImageList, ImageListItem, Divider, colors } from "@mui/material";
import { icons } from "@/untils";

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
  ];
const interactButtonSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    borderRadius: 1,
    textTransform: "none",
    color: "text.secondary",
    padding: 0,
}
const likedButtonSx = {
    ...interactButtonSx,
    color: colors.blue[500],
}
export function Post() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            width={"100%"}
            height={"100%"}
            padding={2}
            border={1}
            borderColor={"grey.300"}
            borderRadius={2}
            boxShadow={1}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"100%"}
            >
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
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={0}
                    >
                        <Typography
                            fontSize={15}
                            color="text.secondary"
                            textTransform={"none"}
                            // bgcolor={"grey.100"}
                            // borderRadius={5}
                            width={"100%"}
                            textAlign={"left"}
                        >
                            Remy Sharp
                        </Typography>
                        <Typography
                            fontSize={10}
                            color="text.secondary"
                            textTransform={"none"}
                            // bgcolor={"grey.100"}
                            // borderRadius={5}
                            width={"100%"}
                            textAlign={"left"}
                        >
                            April 28, 12:30 PM
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"end"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
                    <Button
                        sx={{
                            borderRadius: "50%",
                        }}
                    >
                        <icons.more 
                            sx={{ 
                                color: "text.secondary", 
                                fontSize: 20, 
                                cursor: "pointer", 
                            }} 
                        />
                    </Button>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
                gap={2}
            >
                <Typography
                    fontSize={15}
                    color="text.secondary"
                    textTransform={"none"}
                    // bgcolor={"grey.100"}
                    // borderRadius={5}
                    width={"100%"}
                    textAlign={"left"}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={2}
                >
                    <ImageList cols={2} rowHeight={"auto"}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    src={item.img}
                                    alt={item.img}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"auto"}
                marginTop={2}
                marginBottom={0}
            >
                <Typography
                    fontSize={15}
                    color="text.secondary"
                    textTransform={"none"}
                    sx={{ whiteSpace: "nowrap" }}
                >
                    1,234 Likes
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"end"}
                    width={"100%"}
                    height={"auto"}
                    gap={2}
                >
                    <Typography
                        fontSize={15}
                        color="text.secondary"
                        textTransform={"none"}
                    >
                        123 Comments
                    </Typography>
                    <Typography
                        fontSize={15}
                        color="text.secondary"
                        textTransform={"none"}
                    >
                        12 Shares
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ width: '100%', padding: 0, margin: 0}}/>
            <Box
                display="flex"
                flexDirection="row"
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"auto"}
                marginTop={1}
            >
                <Button
                    sx={1 ? likedButtonSx : interactButtonSx} // Xet dieu kien da like chua
                >
                    {1 ? // Xet dieu kien da like chua
                        <icons.liked 
                            sx={{ 
                                color: colors.blue[500], 
                                fontSize: 20, 
                                cursor: "pointer", 
                            }} 
                        /> 
                        : 
                        <icons.like 
                            sx={{ 
                                color: "text.secondary", 
                                fontSize: 20, 
                                cursor: "pointer", 
                            }} 
                        />
                    }
                    Like
                </Button>
                <Button
                    sx={interactButtonSx}
                >
                    <icons.comment 
                        sx={{ 
                            color: "text.secondary", 
                            fontSize: 20, 
                            cursor: "pointer", 
                        }} 
                    />
                    Comment
                </Button>
                <Button
                    sx={interactButtonSx}
                >
                    <icons.share 
                        sx={{ 
                            color: "text.secondary", 
                            fontSize: 20, 
                            cursor: "pointer", 
                        }} 
                    />
                    Share
                </Button>
            </Box>
        </Box>
    )
}