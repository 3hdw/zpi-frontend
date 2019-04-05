import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {JoinOrCreatePageComponent} from './join-or-create-page/join-or-create-page.component';
import {CreateRoomPageComponent} from './create-room-page/create-room-page.component';
import {JoinRoomPageComponent} from './join-room-page/join-room-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {GamePageComponent} from './game-page/game-page.component';
import {TestPageComponent} from './test-page/test-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {path: 'home', component: StartPageComponent},
  {path: 'jorcr', component: JoinOrCreatePageComponent, canActivate: [AuthGuardService]},
  {path: 'create', component: CreateRoomPageComponent, canActivate: [AuthGuardService]},
  {path: 'join', component: JoinRoomPageComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'play', component: GamePageComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
