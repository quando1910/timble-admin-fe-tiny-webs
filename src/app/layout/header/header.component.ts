import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from 'app/core/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
	// Properties
	@Input() showNotifMenu = false;
  @Input() showToggleMenu = false;
  @Input() darkClass = '';
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(private config: NgbDropdownConfig,
							private themeService: ThemeService,
							private authSevice: AuthService) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
	}

	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu() {
		this.themeService.showHideMenu();
	}

	logout() {
		this.authSevice.logout();
	}
}
