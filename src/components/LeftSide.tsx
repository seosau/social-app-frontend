'use client'

import { Box, InputAdornment, TextField } from "@mui/material";
import { icons } from "@/untils";

type LeftSideProps = {
  keyword: string,
  onKeywordChange: (value: string) => void
}

export function LeftSide({keyword, onKeywordChange}: LeftSideProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"start"}
            // position={"fixed"}
            width={"100%"}
            height={"100vh"}
            // border={1}
            // borderColor={"grey.300"}
            // borderRadius={2}
            // boxShadow={1}
            padding={2}
        >
            <Box>
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
        </Box>
    )
}