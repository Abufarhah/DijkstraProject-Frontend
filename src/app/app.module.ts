import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DijkstraService } from './dijkstra.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzzGGLiV-prVWK1iGF6M1BpKz0blRQNa8'
    }),HttpClientModule
  ],
  providers: [DijkstraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
