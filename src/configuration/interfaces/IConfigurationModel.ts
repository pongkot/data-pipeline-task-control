export interface IConfigurationModel {
  getId(): string;

  getValue(): string;

  setId(id: string): void;

  setValue(value: string): void;
}
