import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from './helper/service/api.service';
import { RouteGuard } from './helper/guard/route.guard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoProcessesComponent } from './components/common/photo-processes/photo-processes.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PhotoProcessesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    ScrollingModule
  ],
  providers: [ApiService, RouteGuard],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
