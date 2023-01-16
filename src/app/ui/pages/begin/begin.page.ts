import { Component, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    templateUrl: 'begin.page.html',
    styleUrls: ['begin.page.scss'],
})
export class BeginPage {

    constructor(
        public navCtrl: NavController
    ) {
    }

    async ngOnInit() {        
    }

    getWorkspaces() { 

    }

    advance() {
        this.navCtrl.navigateForward("workspace").then();
    }

}
