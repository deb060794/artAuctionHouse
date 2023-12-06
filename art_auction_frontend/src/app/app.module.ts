import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {EditorModule} from '@tinymce/tinymce-angular'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxTranslateModule } from './translate/translate.module';
import { RouterModule } from '@angular/router';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BlogComponent } from './components/blog/blog.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ArtistsComponent } from './components/categories/artists/artists.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailComponent } from './components/categories/artists/detail/detail.component';
import { ArtComponent } from './components/art/art.component';
import { BidComponent } from './components/bid/bid.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserListComponent } from './components/board-admin/user-list/user-list.component';
import { ArtListComponent } from './components/board-admin/art-list/art-list.component';
import { OrderListComponent } from './components/board-admin/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './components/dialog/edit/edit-art-dialog/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/dialog/delete/delete-dialog/delete-dialog.component';
import { DeactivateDialogComponent } from './components/dialog/deactivate-dialog/deactivate-dialog.component';
import { AdminNavigationComponent } from './components/board-admin/admin-navigation/admin-navigation.component';
import { EditArtDialogComponent } from './components/dialog/edit/edit-art-dialog/edit-art-dialog.component';
import { CreateArtDialogComponent } from './components/dialog/create/create-art-dialog/create-art-dialog.component';
import { DeleteArtDialogComponent } from './components/dialog/delete/delete-art-dialog/delete-art-dialog.component';
import { StartAuctionComponent } from './components/dialog/start-auction/start-auction.component';
import { UserNavigationComponent } from './components/board-user/user-navigation/user-navigation.component';
import { BidSuccessfulDialogComponent } from './components/dialog/bid-successful-dialog/bid-successful-dialog.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { ReadBlogComponent } from './components/blog/read-blog/read-blog.component';
import { UserArtComponent } from './components/board-user/user-art/user-art.component';
import { UserBidsComponent } from './components/board-user/user-bids/user-bids.component';
import { UserPurchasesComponent } from './components/board-user/user-purchases/user-purchases.component';
import { UserArticlesComponent } from './components/board-user/user-articles/user-articles.component';
import { WonBidComponent } from './components/bid/won-bid/won-bid.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SuccessSubscriptionComponent } from './components/success-subscription/success-subscription.component';
import { ReglementsComponent } from './components/reglements/reglements.component';
import { GeneralConditionsComponent } from './components/general-conditions/general-conditions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ResultsComponent } from './components/results/results.component';
import { CreateLotDialogComponent } from './components/dialog/create-lot-dialog/create-lot-dialog.component';
import { UserOfferComponent } from './components/board-user/user-offer/user-offer.component';
import { RecentArtComponent } from './components/board-user/recent-art/recent-art.component';
import { RecentBidsComponent } from './components/board-user/recent-bids/recent-bids.component';
import { RecentOrdersComponent } from './components/board-user/recent-orders/recent-orders.component';
import { OffersReceivedComponent } from './components/board-user/offers-received/offers-received.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BlogComponent,
    AppHeaderComponent,
    AppFooterComponent,
    LoginSignupComponent,
    RegistrationComponent,
    ArtistsComponent,
    CategoriesComponent,
    DetailComponent,
    ArtComponent,
    BidComponent,
    WishlistComponent,
    UserListComponent,
    ArtListComponent,
    OrderListComponent,
    DeactivateDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AdminNavigationComponent,
    EditArtDialogComponent,
    CreateArtDialogComponent,
    DeleteArtDialogComponent,
    StartAuctionComponent,
    UserNavigationComponent,
    BidSuccessfulDialogComponent,
    AddBlogComponent,
    ReadBlogComponent,
    UserArtComponent,
    UserBidsComponent,
    UserPurchasesComponent,
    UserArticlesComponent,
    WonBidComponent,
    CartComponent,
    SuccessComponent,
    CancelComponent,
    PaymentConfirmationComponent,
    ForgotPasswordComponent,
    SuccessSubscriptionComponent,
    GeneralConditionsComponent,
    ReglementsComponent,
    ContactUsComponent,
    ResultsComponent,
    CreateLotDialogComponent,
    UserOfferComponent,
    RecentArtComponent,
    RecentBidsComponent,
    RecentOrdersComponent,
    OffersReceivedComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CarouselModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EditorModule,
    BsDropdownModule.forRoot(),
    NgxTranslateModule,
    FormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
