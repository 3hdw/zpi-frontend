import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {JoinOrCreatePageComponent} from './join-or-create-page/join-or-create-page.component';
import {CreateRoomPageComponent} from './create-room-page/create-room-page.component';
import {JoinRoomPageComponent} from './join-room-page/join-room-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {GamePageComponent} from './game-page/game-page.component';

const routes: Routes = [
  {path: 'home', component: StartPageComponent},
  {path: 'jorcr', component: JoinOrCreatePageComponent},
  {path: 'create', component: CreateRoomPageComponent},
  {path: 'join', component: JoinRoomPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'play', component: GamePageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
