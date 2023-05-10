import {
  getItems,
  createOneItem,
  TodoModel,
  ITodo,
  getItemByIdAndUpdate,
  deleteItems,
  getItemById,
} from "@libs/database";

export default class TodoService {
  // private Tablename: string = "TodosTable";

  constructor() {}

  async getAllTodos(): Promise<ITodo[]> {
    const todos = await getItems(TodoModel, {});

    return todos as ITodo[];
  }

  async createTodo(todo: ITodo): Promise<ITodo> {

    const todoDoc = await createOneItem(TodoModel, todo);
    return todoDoc as unknown as ITodo;
  }

  async getTodo(id: string): Promise<any> {
    const todo = await getItemById(TodoModel, id);
    if (!todo) {
      throw new Error("Id does not exit");
    }
    return todo as ITodo;
  }

  async updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo> {
    const updated = await getItemByIdAndUpdate(TodoModel, id, todo);
    return updated as ITodo;
  }
  async deleteTodo(id: string): Promise<any> {
    return await deleteItems(TodoModel, { _id: id });
  }
}
