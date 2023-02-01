import { Component, HostListener, OnInit } from '@angular/core';
import { SQLiteConnection } from '@capacitor-community/sqlite';
import "reflect-metadata";
import { OrmProvider } from './core/db/sqlite/typeorm/orm/orm';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor(
    private orm: OrmProvider
  ) {}

  async ngOnInit(): Promise<void> {
    await this.orm.initialize();
  }

  @HostListener('window:beforeunload')
  @HostListener('window:pagehide')
  private async onBeforeUnload() {
    await this.orm.closeConnection();
  }
}
