import {Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'page-begin',
    templateUrl: 'begin.page.html',
    styleUrls: ['begin.page.scss'],
})
export class BeginPage {
    constructor(
        public navCtrl: NavController
    ) {
        // this.storage.create();
    }

    advance() {
        // this.storage.set('teste', "Diogo Camilo");
        this.navCtrl.navigateForward("home").then();
    }

}
