import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDK4NvjsQQr6q_KCybHtHH1yuy7G4furL0"
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
