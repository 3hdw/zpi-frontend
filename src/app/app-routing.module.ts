import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './pages/start-page/start-page.component';
import {JoinOrCreatePageComponent} from './pages/join-or-create-page/join-or-create-page.component';
import {CreateRoomPageComponent} from './pages/create-room-page/create-room-page.component';
import {JoinRoomPageComponent} from './pages/join-room-page/join-room-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {PlayerGamesPageComponent} from './pages/player-games-page/player-games-page.component';
import {LobbyPageComponent} from './pages/lobby-page/lobby-page.component';
import {DeactivateGuardService} from './services/deactivate-guard.service';

const routes: Routes = [
  {path: 'home', component: StartPageComponent},
  {path: 'menu', component: JoinOrCreatePageComponent, canActivate: [AuthGuardService]},
  {path: 'create', component: LobbyPageComponent, canActivate: [AuthGuardService], canDeactivate: [DeactivateGuardService]},
  {path: 'join', component: JoinRoomPageComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginPageComponent},
  {path: 'lobby/:name', component: LobbyPageComponent, canActivate: [AuthGuardService], canDeactivate: [DeactivateGuardService]},
  {path: 'register', component: RegisterPageComponent},
  {path: 'play', component: GamePageComponent, canActivate: [AuthGuardService], canDeactivate: [DeactivateGuardService]},
  {path: 'player-games', component: PlayerGamesPageComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
