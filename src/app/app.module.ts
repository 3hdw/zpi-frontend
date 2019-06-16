import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinRoomPageComponent } from './pages/join-room-page/join-room-page.component';
import { CreateRoomPageComponent } from './pages/create-room-page/create-room-page.component';
import { JoinOrCreatePageComponent } from './pages/join-or-create-page/join-or-create-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoadingScreenComponent } from './elements/loading-screen/loading-screen.component';
import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';
import { SideMenuComponent } from './elements/side-menu/side-menu.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ScrabbleBlockComponent } from './elements/scrabble-block/scrabble-block.component';
import { GamePanelComponent } from './elements/game-panel/game-panel.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlayerGamesPageComponent } from './pages/player-games-page/player-games-page.component';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SocketInterceptorService} from './services/socket-interceptor.service';
import { LoadingDivComponent } from './elements/loading-div/loading-div.component';

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
    PlayerGamesPageComponent,
    LobbyPageComponent,
    LoadingDivComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SocketInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
