import { ReactNode } from 'react';
import { TPermission } from './permission';

export interface IBasePage {
  url: string;
}

export interface IPage extends IBasePage {
  label: string;
  icon: ReactNode;
}

export interface IBasePageRole extends IBasePage {
  permission?: TPermission[];
  discriminatedType: 'base';
}

export interface IPageRole extends IPage {
  permission?: TPermission[];
  discriminatedType: 'full';
}
