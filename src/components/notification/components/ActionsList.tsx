'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { icons } from '@/untils';
import { boolean } from 'yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';

type ActionsListProps = {
  id: string,
  setIdToDelete: Dispatch<SetStateAction<string>>,
  setIdToMarkAsRead: Dispatch<SetStateAction<string>>,
}

export default function ActionsList(props: ActionsListProps) {
  const {
    id,
    setIdToDelete,
    setIdToMarkAsRead
  } = props
  const [isShowActionList, setShowActionList] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = () => {
    setIdToMarkAsRead(id)
    handleClose()
  }

  const handleDelete = () => {
    setIdToDelete(id)
    handleClose()
  }
  return (
    <>
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: 360, 
            // bgcolor: 'background.paper' ,

          }}
        >
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                border: 'solid',
                borderColor: grey[300],
                bgcolor: 'background.paper' ,
              }}
            >
              <icons.more />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem 
                onClick={handleMarkAsRead}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 1,
                  justifyContent: 'start',
                  alignItems: 'end'
                }}
              >
                <icons.checked />
                Mark as read
              </MenuItem>
              <MenuItem 
                onClick={handleDelete}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 1,
                  justifyContent: 'start',
                  alignItems: 'end'
                }}
              >
                <icons.remove />
                Delete this notification
              </MenuItem>
            </Menu>
          </div>
        </Box> 
    </>
  );
}
