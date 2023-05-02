import { Model, Document, AnyKeys, AnyObject } from "mongoose";
export const getItemById = <IResponse>(
  model: Model<any, any, any>,
  id: string
): Promise<IResponse> => {
  return model.findById(id);
};
export const getOneItem = <IOpts, IResponse>(
  model: Model<any, any, any>,
  opts: IOpts
): Promise<IResponse> => {
    console.log(opts)
  return model.findOne({ ...opts });
};
export const createOneItem = (
  model: Model<any, any, any>,
  item: (AnyKeys<Document<any, any, any>> & AnyObject) | undefined
): Promise<Document<any, any, any>> => {
  return new model(item).save();
};
export const getItems = <IOpts, IResponse>(
  model: Model<any, any, any>,
  opts: IOpts
): Promise<IResponse> => {
  return model.find({ ...opts });
};
export const deleteItems = <IOpts, IResponse>(
  model: Model<any, any, any>,
  opts: IOpts
): Promise<IResponse> => {
  return model.deleteMany({ ...opts });
};
export const getItemByIdAndUpdate = <IOpts, IResponse>(
  model: Model<any, any, any>,
  id: string,
  opts: IOpts
): Promise<IResponse> => {
  return model.findByIdAndUpdate(
    id,
    { ...opts },
    { new: true, useFindAndModify: false }
  );
};
