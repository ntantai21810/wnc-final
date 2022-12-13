//components
import { Box } from '@mui/material';
import { DashboardNavbar } from '../components/Header/DashboardNavBar';
import { DashboardSidebar } from '../components/Header/DashboardSideBar';
//others
import * as React from 'react';
import theme from '../configs/theme';

export default function AdminLayout(children: React.ReactNode) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box>
      <Box
        sx={{
          paddingTop: '64px',
          [theme.breakpoints.up('lg')]: {
            paddingLeft: '280px',
          },
        }}
      >
        <Box>{children}</Box>
      </Box>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </Box>
  );
}
