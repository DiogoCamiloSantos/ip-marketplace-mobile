import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import "reflect-metadata";

@Component({
    selector: 'page-begin',
    templateUrl: 'begin.page.html',
    styleUrls: ['begin.page.scss'],
})
export class BeginPage {
    constructor(
        public navCtrl: NavController
    ) {
    }

    advance() {
        this.navCtrl.navigateForward("home").then();
    }



}
