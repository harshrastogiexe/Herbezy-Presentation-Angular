import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActionTypes } from '@common/ngrx/authenticate/authenticate.action';

import { Store } from '@ngrx/store';

@Component({
	selector: 'app-sidebar, [app-sidebar]',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	private readonly router: Router;

	private readonly store: Store;

	private isOpen = false;

	private elementRef: ElementRef<Element>;

	public navigationRoutes = [
		{ path: '.', boxIconClassName: 'bx bx-home', label: 'Dashboard' },
		{ path: 'Restaurants', boxIconClassName: 'bx bx-store', label: 'Restaurant' },
		{ path: 'Setting', boxIconClassName: 'bx bx-cog', label: 'Setting' },
	];

	@HostBinding('class') public className =
		'fixed bg-white translate-x-0 min-h-screen shadow w-full top-0 lg:max-w-xs lg:static sidebar-container flex flex-col';

	public get isActive() {
		return this.isOpen;
	}

	@Input() public set isActive(active: boolean) {
		this.isOpen = active;

		const { classList } = this.elementRef.nativeElement;
		const CLASSNAMES = 'close';

		if (active) {
			classList.remove(CLASSNAMES);
			return;
		}
		classList.add(CLASSNAMES);
	}

	@Output() sidebarCollapse = new EventEmitter<boolean>();

	constructor(elementRef: ElementRef<HTMLElement>, router: Router, store: Store) {
		this.elementRef = elementRef;
		this.router = router;
		this.store = store;
	}

	public logout() {
		const action = AuthActionTypes.logout();
		this.store.dispatch(action);
		this.router.navigate(['Authenticate', 'Login']);
	}
}
