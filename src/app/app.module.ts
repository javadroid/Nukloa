import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { WinRefService } from './core/win-ref.service';
import { ReactiveFormsModule } from '@angular/forms';
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



const routes: Routes = [{ path: 'app', component: DappComponent},
  { path: 'whitepaper', component: WhitepaperComponent},
  { path: 'faq', component: FComponent},
  { path: 'app/:id', component: DappComponent,resolve:{app:ResolverService} },
  { path: '**', component: HomeComponent},
  
];

@NgModule({
  declarations: [
   
      DappComponent,HomeComponent,AppComponent, WhitepaperComponent, FComponent,
  ],
  imports: [ RouterModule.forRoot(routes),
    BrowserModule,ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    AppRoutingModule,ClipboardModule,ToastrModule.forRoot(),CountdownModule,BrowserAnimationsModule
    
    
  ],
  providers: [WinRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
