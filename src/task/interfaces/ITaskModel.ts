export interface ITaskModel {
  getSince(): Date;
  getUntil(): Date;
  getMetadata(): {
    createAt: number;
  };
}
