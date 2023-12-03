import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ArtistsComponent } from './components/categories/artists/artists.component';
import { DetailComponent } from './components/categories/artists/detail/detail.component';
import { ArtComponent } from './components/art/art.component';
import { BlogComponent } from './components/blog/blog.component';
import { BidComponent } from './components/bid/bid.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserListComponent } from './components/board-admin/user-list/user-list.component';
import { OrderListComponent } from './components/board-admin/order-list/order-list.component';
import { ArtListComponent } from './components/board-admin/art-list/art-list.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { ReadBlogComponent } from './components/blog/read-blog/read-blog.component';
import { WonBidComponent } from './components/bid/won-bid/won-bid.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SuccessSubscriptionComponent } from './components/success-subscription/success-subscription.component';
import { GeneralConditionsComponent } from './components/general-conditions/general-conditions.component';
import { ReglementsComponent } from './components/reglements/reglements.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ResultsComponent } from './components/results/results.component';
import { UserBidsComponent } from './components/board-user/user-bids/user-bids.component';
import { UserPurchasesComponent } from './components/board-user/user-purchases/user-purchases.component';
import { UserArticlesComponent } from './components/board-user/user-articles/user-articles.component';
import { UserArtComponent } from './components/board-user/user-art/user-art.component';
import { UserOfferComponent } from './components/board-user/user-offer/user-offer.component';





const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login-signup/register', component: RegistrationComponent},
  { path: 'login-signup', component: LoginSignupComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/artists', component: ArtistsComponent },
  { path: 'categories/artists/detail', component: DetailComponent },
  { path: 'artworks', component: ArtComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'bid', component: BidComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'dashboard', component: BoardAdminComponent},
  { path: 'userList', component: UserListComponent},
  { path: 'orderList', component: OrderListComponent},
  { path: 'artList', component:  ArtListComponent},
  { path: 'blog/add-blog', component:  AddBlogComponent},
  { path: 'blog/post/:id', component:  ReadBlogComponent},
  { path: 'user/dashboard', component:  BoardUserComponent},
  { path: 'bid/won-art/:id', component:  WonBidComponent},
  { path: 'cart', component:  CartComponent},
  { path: 'success', component: SuccessComponent},
  { path: 'cancel', component: CancelComponent },
  { path: 'payment-confirm', component:PaymentConfirmationComponent},
  { path: 'login-signup/forgot-password', component: ForgotPasswordComponent},
  { path: 'subscription-success', component: SuccessSubscriptionComponent },
  { path: 'general-conditions', component : GeneralConditionsComponent},
  { path: 'general-warranty', component: ReglementsComponent},
  { path: 'contact-us', component:ContactUsComponent},
  { path: 'results', component:ResultsComponent},
  { path: 'user/bids', component: UserBidsComponent},
  { path: 'user/orders', component: UserPurchasesComponent},
  { path: 'user/articles', component: UserArticlesComponent},
  { path: 'user/art', component: UserArtComponent},
  { path: 'user/offer', component: UserOfferComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
