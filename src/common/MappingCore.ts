export abstract class MappingCore<IModel, ISchema> {
  abstract serialize(doc: ISchema): IModel;
  abstract deserialize(model: IModel): ISchema;
}
