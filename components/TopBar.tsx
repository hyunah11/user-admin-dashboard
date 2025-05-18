'use client'

import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Badge, Tooltip } from '@mui/material'

import NotificationsIcon from '@mui/icons-material/Notifications'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import PersonIcon from '@mui/icons-material/Person'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'

export default function TopBar() {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        color: 'black',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight={300} color="#575757">
            User Admin Dashboard
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="메일함">
            <IconButton sx={{ color: '#737272' }}>
              <Badge badgeContent={2} color="warning">
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="알림">
            <IconButton sx={{ color: '#737272' }}>
              <Badge badgeContent={4} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="로그아웃">
            <IconButton sx={{ color: '#737272' }}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}