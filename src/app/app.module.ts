import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { WinRefService } from './core/win-ref.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ResolverService } from './core/resolver.service';
import { HomeComponent } from './home/home.component';
import { DappComponent } from './dapp/dapp.component';
import { AppRoutingModule } from './app-routing.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';
import { CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhitepaperComponent } from './whitepaper/whitepaper.component'
import { FComponent } from './f/f.component';
import { BlogComponent } from './blog/blog.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './share/footer/footer.component';
import { HeaderComponent } from './share/header/header.component';
import { ServiceService } from './share/service.service';
import { HttpClientModule } from '@angular/common/http';




const routes: Routes = [{ path: 'app', component: DappComponent},
  { path: 'whitepaper', component: WhitepaperComponent},
  { path: 'faq', component: FComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'landing', component: LandingPageComponent},
  { path: 'aboutus', component: AboutComponent},
  { path: 'app/:id', component: DappComponent,resolve:{app:ResolverService} },
  { path: '**', component: HomeComponent},

];

@NgModule({
  declarations: [

      DappComponent,HomeComponent,AppComponent, WhitepaperComponent, FComponent, BlogComponent, HeaderComponent, LandingPageComponent, AboutComponent, FooterComponent,
  ],
  imports: [ RouterModule.forRoot(routes),
    BrowserModule,ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    AppRoutingModule,ClipboardModule,ToastrModule.forRoot(),CountdownModule,BrowserAnimationsModule


  ],
  providers: [WinRefService,ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
