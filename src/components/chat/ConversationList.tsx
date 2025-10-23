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
import { useGetAllConversation } from '@/hooks/useGetAllConversation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { IUser } from '@/interfaces/user.interfaces';
import { useGetOneConversation } from '@/hooks/useGetOneConversation';

export default function ConversationList() {
    const {allConversation} = useGetAllConversation();
    const {setConverId} = useGetOneConversation();
    const user = useSelector((state: RootState) => state.user.user);

    const getOtherMember = (members: IUser[]) => {
        return members.find((member) => member.id !== user?.id);
    }
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
            {!!allConversation && !!allConversation.conversations && allConversation.conversations.map((chat) => (
                <>
                    <Button
                        sx={{
                            textTransform: 'none',
                            width: '100%',
                        }}
                        onClick={() => setConverId(chat.conversation.id)}
                    >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={getOtherMember(chat.conversation.members)?.fullName} src={getOtherMember(chat.conversation.members)?.image} />
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
                                            {getOtherMember(chat.conversation.members)?.fullName}
                                        </Typography>
                                    </Fragment>
                                }
                                secondary={
                                    <Fragment>
                                        <span className='text-blue-300'>{chat.messageList[0].senderId === user?.id ? 'You: ' : ''}</span>
                                        {chat.messageList[0].content}
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