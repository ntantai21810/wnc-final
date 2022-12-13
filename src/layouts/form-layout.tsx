import { Box, SxProps } from '@mui/material';
import * as React from 'react';

export interface IFormLayoutProps extends React.HTMLProps<HTMLFormElement> {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function FormLayout({
  children,
  sx,
  ...props
}: IFormLayoutProps) {
  return (
    <Box
      sx={{
        form: {
          display: 'flex',
          flexDirection: 'column',

          '& > *:not(:last-child)': {
            marginBottom: 3,
          },
        },
        ...sx,
      }}
    >
      <form {...props}>{children}</form>
    </Box>
  );
}
