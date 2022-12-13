import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InterestsIcon from '@mui/icons-material/Interests';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import { IBasePageRole, IPageRole } from '../model/page';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import TokenIcon from '@mui/icons-material/Token';
import { TRole } from '../model/role';
import BackpackIcon from '@mui/icons-material/Backpack';

export const ROLES: { label: string; value: TRole }[] = [
  { label: 'Super admin', value: 'Super_Admin' },
  { label: 'Tokenizer admin', value: 'Tokenizer_Admin' },
  { label: 'Tokenizer manager', value: 'Tokenizer_Manager' },
];

export const RBAC: Record<TRole | '', (IBasePageRole | IPageRole)[]> = {
  Super_Admin: [
    //Base
    {
      url: '/login',
      discriminatedType: 'base',
    },
    {
      url: '/logout',
      discriminatedType: 'base',
    },
    {
      url: '/organization/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/user-management/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset-group/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/top-up/[id]/confirmation',
      discriminatedType: 'base',
    },
    //Full
    {
      url: '/',
      label: 'Dashboard',
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/organization',
      label: 'Organization',
      icon: <InterestsIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },

    {
      url: '/user-management',
      label: 'User management',
      icon: <GroupIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/transaction',
      label: 'Transaction',
      icon: <PaymentIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/top-up',
      label: 'Top up',
      icon: <ControlPointDuplicateIcon fontSize="small" />,
      permission: ['UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/template',
      label: 'Template',
      icon: <AdfScannerIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset-group',
      label: 'Asset group',
      icon: <TypeSpecimenIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset',
      label: 'Asset',
      icon: <WebAssetIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/tokenization-request',
      label: 'Tokenization request',
      icon: <TokenIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/underlying',
      label: 'Underlying',
      icon: <BackpackIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/setting',
      label: 'Setting',
      icon: <SettingsIcon fontSize="small" />,
      permission: ['UPDATE'],
      discriminatedType: 'full',
    },
  ],
  Tokenizer_Admin: [
    //Base
    {
      url: '/login',
      discriminatedType: 'base',
    },
    {
      url: '/logout',
      discriminatedType: 'base',
    },
    {
      url: '/user-management/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/organization/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/top-up/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset-group/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/top-up/[id]/confirmation',
      discriminatedType: 'base',
    },
    //Full
    {
      url: '/',
      label: 'Dashboard',
      icon: <DashboardIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/organization',
      label: 'Organization',
      icon: <InterestsIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/user-management',
      label: 'User management',
      icon: <GroupIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/transaction',
      label: 'Transaction',
      icon: <PaymentIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/top-up',
      label: 'Top up',
      icon: <ControlPointDuplicateIcon fontSize="small" />,
      permission: ['CREATE'],
      discriminatedType: 'full',
    },
    {
      url: '/template',
      label: 'Template',
      icon: <AdfScannerIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset-group',
      label: 'Asset group',
      icon: <TypeSpecimenIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset',
      label: 'Asset',
      icon: <WebAssetIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/tokenization-request',
      label: 'Tokenization request',
      icon: <TokenIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/underlying',
      label: 'Underlying',
      icon: <BackpackIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/setting',
      label: 'Setting',
      icon: <SettingsIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
  ],
  Tokenizer_Manager: [
    //Base
    {
      url: '/login',
      discriminatedType: 'base',
    },
    {
      url: '/logout',
      discriminatedType: 'base',
    },
    {
      url: '/top-up/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/organization/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/template/asset-group-attr-template-attr/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset-group/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/asset/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/top-up/[id]/confirmation',
      discriminatedType: 'base',
    },
    //Full
    {
      url: '/',
      label: 'Dashboard',
      icon: <DashboardIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/organization',
      label: 'Organization',
      icon: <InterestsIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/transaction',
      label: 'Transaction',
      icon: <PaymentIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
    {
      url: '/top-up',
      label: 'Top up',
      icon: <ControlPointDuplicateIcon fontSize="small" />,
      permission: ['CREATE'],
      discriminatedType: 'full',
    },
    {
      url: '/template',
      label: 'Template',
      icon: <AdfScannerIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset-group',
      label: 'Asset group',
      icon: <TypeSpecimenIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset',
      label: 'Asset',
      icon: <WebAssetIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/tokenization-request',
      label: 'Tokenization request',
      icon: <TokenIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/underlying',
      label: 'Underlying',
      icon: <BackpackIcon fontSize="small" />,
      discriminatedType: 'full',
    },
    {
      url: '/setting',
      label: 'Setting',
      icon: <SettingsIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE', 'DELETE'],
      discriminatedType: 'full',
    },
  ],
  Supplier: [
    //Base
    {
      url: '/',
      discriminatedType: 'base',
    },
    {
      url: '/tokenization-request/[id]',
      discriminatedType: 'base',
    },
    {
      url: '/logout',
      discriminatedType: 'base',
    },
    {
      url: '/login',
      discriminatedType: 'base',
    },
    {
      url: '/top-up/add',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    {
      url: '/top-up/[id]/confirmation',
      discriminatedType: 'base',
    },
    {
      url: '/asset/[id]',
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'base',
    },
    //Full
    {
      url: '/tokenization-request',
      label: 'Tokenization request',
      icon: <TokenIcon fontSize="small" />,
      permission: ['CREATE', 'UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/top-up',
      label: 'Top up',
      icon: <ControlPointDuplicateIcon fontSize="small" />,
      permission: ['UPDATE'],
      discriminatedType: 'full',
    },
    {
      url: '/asset',
      label: 'Asset',
      icon: <WebAssetIcon fontSize="small" />,
      permission: ['UPDATE'],
      discriminatedType: 'full',
    },
  ],
  '': [
    {
      url: '/login',
      discriminatedType: 'base',
    },
    {
      url: '/logout',
      discriminatedType: 'base',
    },
    {
      url: '/',
      discriminatedType: 'base',
    },
  ],
};
