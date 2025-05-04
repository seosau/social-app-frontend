'use client';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from 'next/image';
import Link from 'next/link';
import { instance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

type FormData = yup.InferType<typeof schema>;

export function LoginComp() {

    const route = useRouter();

    const { register, handleSubmit, formState: { errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: FormData) => {
        instance.post('/auth/login', data).then((res) => {
            alert("Login successfully!");
            window.localStorage.setItem('user', JSON.stringify(res.data));
            route.push('/')
        }).catch((error) => {
            console.error('Login error: ', error.message)
        })
    }

    return (
        <Box className='flex flex-row items-center justify-center gap-40 min-h-screen'>
            <Box>
                <Image
                    src="/next.svg"
                    alt="Logo"
                    width={500}
                    height={500}
                />
            </Box>
            <Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                            Login Page
                        </Typography>
                        <Stack>
                            <TextField
                                label="Email"
                                id="email"
                                variant="outlined"
                                type="text"
                                size='small'
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
                            Login
                        </Button>
                    </Stack>
                </Box>
                <Box 
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    marginTop={2}
                    gap={1}
                >
                    <p className="text-gray-500">Dont have an account?</p>
                    <Link href="/auth/register" className="text-blue-500 italic underline">Register now</Link>
                </Box>
            </Box>
        </Box>
    )
}