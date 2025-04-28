import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    return (
        <div className='flex flex-row items-center justify-center gap-40 min-h-screen'>
            <div>
                <Image
                    src="/next.svg"
                    alt="Logo"
                    width={500}
                    height={500}
                />
            </div>
            <div>
                <Box>
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
                            Register Page
                        </Typography>
                        <TextField
                            label="Full name"
                            id="full-name"
                            variant="outlined"
                            type="text"
                            size='small'
                        />
                        <TextField
                            label="Email"
                            id="email"
                            variant="outlined"
                            type="text"
                            size='small'
                        />
                        <TextField
                            label="Password"
                            id="password"
                            variant="outlined"
                            type="password"
                            size='small'
                        />
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={{ mt: 2, fontWeight: 'bold' }}
                        >
                            Register
                        </Button>
                    </Stack>
                </Box>
                <div className="flex flex-row items-center justify-center mt-4 gap-2">
                    <p className="text-gray-500">Already have an account?</p>
                    <Link href="/auth/login" className="text-blue-500 italic underline">Login now</Link>
                </div>
            </div>
        </div>
    )
}