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
  private sqliteConnection: SQLiteConnection;

  constructor(
    private orm: OrmProvider
  ) {}

  async ngOnInit(): Promise<void> {
    this.orm.initialize().then((connection) => (this.sqliteConnection = connection));
  }

  @HostListener('window:beforeunload')
  @HostListener('window:pagehide')
  private onBeforeUnload() {
    this.sqliteConnection.closeAllConnections();
  }
}
