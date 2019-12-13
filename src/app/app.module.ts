import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/module/core.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/api';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    DynamicDialogModule,
    NgxGalleryModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule
  ],
  providers: [
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
