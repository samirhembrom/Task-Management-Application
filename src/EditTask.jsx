import { Form, useLoaderData, redirect,useNavigate } from "react-router-dom";
import { updateTask } from "./getTasks";

export async function action({request, params}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(typeof(updates.dueDate)); 
  updateTask(params.id,updates);
  return redirect(`/tasks/${params.id}`);
}
// title
// description
// due date
// priority level
// status
// completed

export default function EditTask() {
  const {task} = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <label>
        <span>Title</span>
        <input 
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={task?.title}
        />
      </label>
      <label>
        <span>Description</span>
        <input 
          placeholder="Description"
          aria-label="Description"
          type="text"
          name="description"
          defaultValue={task?.description}
          />
      </label>
      <label>
        <span>Due Date</span>
        <input 
          aria-label="Date"
          type="date"
          name="dueDate"
          defaultValue={task?.dueDate|new Date()}
        />
      </label>
      <label>
        <span>Priority</span>
        <select name="priority" defaultValue={task?.priorty}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <p>
        <button type="submit">Submit</button>
        <button type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</button>
      </p>
    </Form>
  );
}