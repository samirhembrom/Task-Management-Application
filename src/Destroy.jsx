import { redirect } from "react-router-dom";
import { deleteTask } from "./getTasks";

export async function action({params}) {
  deleteTask(params.id);
  return redirect("/");
}