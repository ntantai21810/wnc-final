import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';

interface ISliderRightProps extends React.ComponentProps<typeof Drawer> {
  onClose: () => void;
}

export default function SliderRight({ onClose, ...props }: ISliderRightProps) {
  const _handleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      (event as React.KeyboardEvent).key !== 'Escape'
    ) {
      return;
    }

    onClose?.();
  };
  return (
    <Drawer onClose={_handleClose} {...props}>
      <Box
        sx={{
          width:
            props.anchor === 'top' || props.anchor === 'bottom' ? 'auto' : 500,
          maxWidth: '100vw',
          ...props.sx,
        }}
        role="presentation"
        onKeyDown={_handleClose}
      >
        {props.children}
      </Box>
    </Drawer>
  );
}
