import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from 'app/auth/login.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
