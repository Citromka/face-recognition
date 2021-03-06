import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/facerecognition-app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {UploadStepComponent} from './components/upload-step/upload-step.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ResultStepComponent } from './components/result-step/result-step.component';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilestackModule} from '@filestack/angular';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { NewPageComponent } from './components/new-page/new-page.component';
import { ViewPageComponent } from './components/view-page/view-page.component';
import { FaceAttributesComponent } from './components/face-attributes/face-attributes.component';
import { FaceImageViewComponent } from './components/face-image-view/face-image-view.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    UploadStepComponent,
    ResultStepComponent,
    FileDragDropDirective,
    NewPageComponent,
    ViewPageComponent,
    FaceAttributesComponent,
    FaceImageViewComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FilestackModule,
        MatToolbarModule,
        AppRoutingModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
