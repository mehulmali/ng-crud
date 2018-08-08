import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { BikeListComponent } from './components/bike-list/bike-list.component';
import { CreateComponent } from './components/create/create.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './components/edit/edit.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BikeListComponent,
    CreateComponent,
    PageNotFoundComponent,
    SearchPipe,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6Ldd4mgUAAAAABJmhZedFp-qNTJ-GNi-a-cVha_r'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
