// import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { blue } from '@mui/material/colors';
import { Button } from '@mui/material';

export default function ListUser() {
    return (
        <List
            sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                // '&:hover': {
                //     scrollbarWidth: 'thin',
                // },
            }}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1].map((item) => (
                <>
                    <Button
                        sx={{
                            textTransform: 'none',
                            width: '100%',
                        }}
                    >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://res.cloudinary.com/dmwr1iglt/image/upload/v1751265284/upload/vuqt3ylw3ia4eyzo51wv.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Fragment>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            sx={{
                                                color: blue[500],
                                                fontWeight: 'bold',
                                                display: 'inline'
                                            }}
                                        >
                                            Nguyen Van A
                                        </Typography>
                                    </Fragment>
                                }
                                secondary={
                                    <Fragment>
                                        Toi nay ranh khong ban e
                                    </Fragment>
                                }
                            />
                        </ListItem>
                    </Button>
                    {/* <Divider variant="inset" component="li" /> */}
                </>
            ))}
        </List>
    );
}