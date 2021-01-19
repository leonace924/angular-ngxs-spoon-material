import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

import { MaterialModule } from './material.module';
import { ServicesModule } from './services/services.module';

import { environment as env } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { MenuItemState } from './states/menu-item.state';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    HeaderComponent,
    SearchBarComponent,
    MenuCardComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LazyLoadImageModule,
    MaterialModule,
    ServicesModule,
    InfiniteScrollModule,
    FormsModule,
    NgxsModule.forRoot([MenuItemState], { developmentMode: !env.production }),
    NgxsActionsExecutingModule.forRoot(),
    NgxsResetPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
