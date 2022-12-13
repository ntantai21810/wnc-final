import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';

export interface IToolBarProps {
  onSearch?: (value: string) => void;
  onFilter?: () => void;
}

export default function ToolBar({ onSearch, onFilter }: IToolBarProps) {
  const [search, setSearch] = React.useState('');

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ '& > *:not(:last-child)': { marginRight: 3 } }}
        >
          {onSearch && (
            <Box flex={1}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                value={search}
                placeholder="Search"
                variant="outlined"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSearch) {
                    onSearch(search);
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          )}
          {onFilter && (
            <Button
              variant="contained"
              sx={{ marginLeft: 'auto' }}
              onClick={onFilter}
            >
              Filter
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
