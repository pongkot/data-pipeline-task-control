import { IConfigurationModel } from './interfaces/IConfigurationModel';

export class ConfigurationModel implements IConfigurationModel {
  private _id: string;
  private value: string;

  getValue(): string {
    return this.value;
  }

  getId(): string {
    return this._id;
  }

  setValue(value: string): void {
    this.value = value;
  }

  setId(id: string): void {
    this._id = id;
  }
}
