'use client';
import { Avatar, Box, Button, Divider, TextField, MenuItem, Select, Typography } from "@mui/material";
import { useForm } from 'react-hook-form'; 
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { icons } from "@/untils";
import { instance } from "@/lib/axios";

const rolesSx = {
  padding: 1, 
  fontSize: 10, 
  display: "flex", 
  alignItems: "center", 
  gap: 0.5
}

const schema = yup.object({
  access: yup.string().required("Access is required"),
  content: yup.string().required("Content is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileExists", "Image is required", (value) => {
      return value instanceof File || (value && value != null);
    }),
})

type FormData = yup.InferType<typeof schema>;

interface NewPostPopupProps {
  open: boolean;
  onClose: () => void;
}

export function NewPostPopup({open, onClose}: NewPostPopupProps) {

  const { register, handleSubmit, formState: { errors}} = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('access', data.access);
    formData.append('content', data.content);
    formData.append('image', (data.image as FileList)[0]);
    instance.post('/post', formData).then((res) => {
      if (res.status == 201) {
        alert('This Post was Created!')
        onClose();
      }
    }).catch((err) => {
      console.error('Loi khi tao bai post: ', err)
    })
  }

  if (!open) return null; 

  return (
    <Box
      display={"flex"}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      bgcolor={"rgba(0, 0, 0, 0.2)"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={2}
      width={"100vw"}
      height={"100vh"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        width={"100%"}
        maxWidth={500}
        height={"auto"}
        maxHeight={500}
        border={1}
        borderColor={"grey.300"}
        borderRadius={2}
        boxShadow={3}
        padding={2}
        bgcolor={"white"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          position={"relative"}
          width={"100%"}
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
          <Button
            onClick={onClose}
            sx={{
              color: "text.secondary",
              position: "absolute",
              right: 0,
              top: 0,
              padding: 0,
              maxWidth: "auto",
              width: "auto",
              height: "auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <icons.close 
              sx={{ 
                color: "text.secondary", 
                fontSize: 30, 
                cursor: "pointer", 
                // position: "absolute",
              }} 
            />
          </Button>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          // justifyContent={"center"}
          width={"100%"}
          height={"100%"}
          gap={2}
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
            <Box>
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
              <Select 
                {...register("access")}
                value={"public"} 
                sx={{ 
                  width: "100%",
                  backgroundColor: "grey.100",
                  borderRadius: 2,   
                  height: 20,
                  fontSize: 10,
                  padding: 0,
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <MenuItem value="public" sx={rolesSx}>
                  <icons.public sx={{ width:10, height: 10}}/> Public
                </MenuItem>
                <MenuItem value="friends" sx={rolesSx}>
                  <icons.friend sx={{ width:10, height: 10}}/> Friends
                </MenuItem>
                <MenuItem value="private" sx={rolesSx}>
                  <icons.lock sx={{ width:10, height: 10}}/> Private
                </MenuItem>
              </Select>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <TextField
              {...register("content")}
              placeholder="What are you thinking, Remy?"
              multiline
              rows={4}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                resize: "none",
              }}
            />
            {errors.content && (
              <Typography
                variant="caption"
                color="error"
                sx={{ marginTop: 1 }}
              >
                {errors.content.message}
              </Typography>
            )}
            <TextField
              {...register("image")}
              label="Select File"
              type="file"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{
                marginTop: 2,
              }}
            />
            <Button
              variant="contained"
              size="medium"
              color="primary"
              // onClick={handleSubmit(onSubmit)}
              type="submit"
              sx={{
                width: "100%",
                marginTop: 2,
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}