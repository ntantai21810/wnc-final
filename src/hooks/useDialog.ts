import React from 'react';
import { DialogContext } from '../provider/dialog-provider';

export const useDialog = () => React.useContext(DialogContext);
