import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginRepository } from '@repositories/login';
import { LoginService } from '@services/login';
import { LoginRulesService } from '@services/login-rules';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationProvider } from '@providers/authentication/authentication';
import { StorageProvider } from '@providers/storage/storage';
import { HelperProvider } from '@providers/helper/helper';
import { ApiProvider } from '@providers/api/api';
import { LoginComunicationProvider } from '@providers/login-comunication/login-comunication.provider';
import { ThemeProvider } from '@providers/theme/theme';
import { ComponentsCircularButtonComponent } from '@components/components-circular-button/components-circular-button.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    // HttpClientModule
  ],
  declarations: [LoginPage, ComponentsCircularButtonComponent],
   providers: [    
    LoginRepository,
    LoginService,
    LoginRulesService,
    // ApiProvider,
    // HelperProvider,
    StorageProvider,
    // AuthenticationProvider,
    // LoginComunicationProvider,
    // ThemeProvider,
    NavParams
   ]
})
export class LoginPageModule {}
