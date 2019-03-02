import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinRoomPageComponent } from './join-room-page/join-room-page.component';
import { CreateRoomPageComponent } from './create-room-page/create-room-page.component';
import { JoinOrCreatePageComponent } from './join-or-create-page/join-or-create-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ScrabbleBlockComponent } from './scrabble-block/scrabble-block.component';
import { GamePanelComponent } from './game-panel/game-panel.component';
import { TestPageComponent } from './test-page/test-page.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterPageComponent } from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    JoinRoomPageComponent,
    CreateRoomPageComponent,
    JoinOrCreatePageComponent,
    LoginPageComponent,
    LoadingScreenComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    GamePageComponent,
    ScrabbleBlockComponent,
    GamePanelComponent,
    TestPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
