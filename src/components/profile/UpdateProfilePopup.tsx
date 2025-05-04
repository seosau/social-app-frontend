import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { instance } from "@/lib/axios";
import { IUser } from "@/interfaces/user.interfaces";

const schema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      image: yup
        .mixed()
        .required("Image is required")
        .test("fileExists", "Image is required", (value) => {
          return value instanceof File || (value && value != null);
        }),
})

interface UpdateProfilePopupProps {
    user: IUser,
    open: boolean,
    onClose: () => void;
}

type FormData = yup.InferType<typeof schema>;

export default function UpdateProfilePopup ({user, open, onClose} : UpdateProfilePopupProps) {

    console.log(open);
    const { register, handleSubmit, formState: { errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: FormData) => {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('image', (data.image as FileList)[0]);
        instance.patch('/user', formData).then((res) => {
            alert("Update successfully!");
            onClose();
        }).catch((err) => {
            console.error('Update error: ', err.response?.data || err.message);
        });
    }
    return (
        <Box 
            position={'fixed'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1000}
            bgcolor={"rgba(0, 0, 0, 0.2)"}
        >
            <Box 
                component="form" 
                onSubmit={handleSubmit(onSubmit)}
                bgcolor={'white'}
                borderRadius={2} 
            >
                <Stack
                    spacing={2}
                    border={1} 
                    padding={3} 
                    borderRadius={2} 
                    width={400}
                    borderColor="gray"
                    boxShadow={5}
                >
                    <Typography
                        variant="h4" 
                        component="h1" 
                        gutterBottom
                        textAlign="center"
                        color='primary'
                        fontWeight="bold"
                    >
                        Update Form
                    </Typography>
                    <Stack>
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
                    </Stack>
                    <Stack>
                        <TextField
                            label="Full name"
                            id="full-name"
                            variant="outlined"
                            type="text"
                            size='small'
                            defaultValue={user.fullName}
                            {...register("fullName")}
                        />
                        {errors.fullName && (
                            <Typography
                                color="error"
                                variant="caption"
                            >
                                {errors.fullName.message}
                            </Typography>
                        )}
                    </Stack>
                    <Stack>
                        <TextField
                            label="Email"
                            id="email"
                            variant="outlined"
                            type="text"
                            size='small'
                            defaultValue={user.email}
                            {...register("email")}
                        />
                        {errors.email && (
                            <Typography
                                color="error"
                                variant="caption"
                            >
                                {errors.email.message}
                            </Typography>
                        )}
                    </Stack>
                    <Stack>
                        <TextField
                            label="Password"
                            id="password"
                            variant="outlined"
                            type="password"
                            size='small'
                            {...register("password")}
                        />
                        {errors.password && (
                            <Typography
                                color="error"
                                variant="caption"
                            >
                                {errors.password.message}
                            </Typography>
                        )}
                    </Stack>
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        sx={{ mt: 2, fontWeight: 'bold' }}
                    >
                        Update
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        color='error'
                        size='large'
                        sx={{ mt: 2, fontWeight: 'bold' }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}