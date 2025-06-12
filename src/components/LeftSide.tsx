'use client'

import { Box, InputAdornment, TextField } from "@mui/material";
import { icons } from "@/untils";
import { Notification } from "./notification/Notification";

type LeftSideProps = {
  keyword: string,
  onKeywordChange: (value: string) => void
}

export function LeftSide({keyword, onKeywordChange}: LeftSideProps) {
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
            >
              <Box>
                <Notification />
              </Box>
              <Box>
                <Notification />
              </Box>
              <Box>
                <Notification />
              </Box>
            </Box>
        </Box>
    )
}