import { Injectable } from "@angular/core";
const buildSettingsJson = require("../../../../build-settings.json");

@Injectable()
export class HelperActiveModuleProvider {
  constructor() {}

  public checkIsActive(moduleName: string): boolean {
    const isModuleEnabled = buildSettingsJson
      ? buildSettingsJson.active_modules[moduleName]
      : false;

    return isModuleEnabled;
  }
}
