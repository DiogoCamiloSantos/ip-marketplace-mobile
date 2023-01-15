import { Component, OnInit } from '@angular/core';
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
  ) {
  }

  async ngOnInit(): Promise<void> {
    const sqliteConnection = await this.orm.initialize();

    window.onbeforeunload = () => {
      sqliteConnection.closeAllConnections();
    };
  }
}
