import { Routes } from '@angular/router';

export const cusomerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'contracts',
  },
  {
    path: 'contracts',
    loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule),
  },
  {
    path: 'costume',
    loadChildren: () => import('./costume/costume.module').then(m => m.CostumeModule),
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule),
  },
];
