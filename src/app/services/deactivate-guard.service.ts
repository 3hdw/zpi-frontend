import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {LobbyPageComponent} from '../pages/lobby-page/lobby-page.component';
import {FetchDataService} from './fetch-data.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService implements CanDeactivate<LobbyPageComponent> {

  constructor(private fetchDataService: FetchDataService) {
  }

  canDeactivate(component: LobbyPageComponent): boolean {
    if (!component.canDeactivate()) {
      if (!confirm('Czy na pewno chcesz opuścić lobby?')) {
        return false;
      }
    }
//    this.fetchDataService.quitLobby(component.lobbyName);  EventListener sprzata na disconnect
    return true;
  }
}
