import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard'},
            {
              path: 'staff',
              loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
            },
            {
              path: 'customer',
              loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
            }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
