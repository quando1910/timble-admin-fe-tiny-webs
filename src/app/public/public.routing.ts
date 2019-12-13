import { Routes, RouterModule } from '@angular/router';
import { PublicContractComponent } from './contracts/public-contract.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'contracts/:id', component: PublicContractComponent, data: { title: 'Login :: Lucid Angular' } },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
