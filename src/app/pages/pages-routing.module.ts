import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: '', component: HomeComponent, pathMatch: 'full', title: 'Herbezy' },
			{ path: 'Home', component: HomeComponent, title: 'Herbezy' },
			{
				path: 'Authenticate',
				loadChildren: async () =>
					(await import('./authenticate/authenticate.module')).AuthenticateModule,
			},
		]),
	],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
