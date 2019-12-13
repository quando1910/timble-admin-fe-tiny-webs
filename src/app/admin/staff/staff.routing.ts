import { Routes } from '@angular/router';

export const staffRoutes: Routes = [
  {
    path: 'partners',
    loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule),
  },
  {
    path: 'inventories',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),
  },
  {
    path: 'contracts',
    loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule),
  },
  {
    path: 'resources',
    loadChildren: () => import('./resource/resource.module').then(m => m.ResourceModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./page-profile/page-profile.module').then(m => m.PageProfileModule),
  }
];
