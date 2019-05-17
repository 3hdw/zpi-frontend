import {HostListener} from '@angular/core';

export abstract class CanDeactivate {

  abstract canDeactivate(): boolean;

  abstract cleanUp();

  constructor() {
  }

//   @HostListener('window:beforeunload', ['$event'])
//   unloadNotification($event: any) {
//     // if shouldnt be closed ask for confirm
//     if (!this.canDeactivate()) {
//       $event.preventDefault();
//       $event.returnValue = true;
//     }
//     // it would be ideal for me if something like this was possible
//     // but according to what I have read so far browsers dont allow checking user's response
//     // for this event
//     if(userDecidedToLeave){
//       this.cleanUp();
//     }
//   }
}
