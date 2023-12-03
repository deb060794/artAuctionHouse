import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { TranslateService } from '@ngx-translate/core';
import { ArtService } from 'src/app/_services/art.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  private subscription!: Subscription;
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
  ];
  searchTerm:string = '';

  eventBusSub?: Subscription;
  itemCount = 0;



  
  private updateItemCount(): void {
    this.itemCount = this.cartService.getItemCount();
    
  }


  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private translate: TranslateService,
    private artService:ArtService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        const user = this.storageService.getUser();
        this.roles = user.roles;
        console.log(this.roles);
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        console.log(this.showAdminBoard);
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
        this.updateItemCount();
      }
  


    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }

  ngOnDestroy() {
    
    this.subscription.unsubscribe();
  }

  search() {
    this.artService.search(this.searchTerm).subscribe(
      results => {
        this.artService.setSearchResults(results);
      this.router.navigate(['/results']);
      },
      error => {
        console.error('Error fetching search results:', error);
      }
    );
  }

}


