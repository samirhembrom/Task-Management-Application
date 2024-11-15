import { Form, useLoaderData } from "react-router-dom";
import { getTask } from "./getTasks";

export async function loader({params}) {
  const task = getTask(params.id);
  return {task}
}

export default function Task() {
  const {task} = useLoaderData();
  
  return (
    <div className="flex task">
      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <p>{task.priority}</p>
        <p>{task.completed}</p>
      </div>
      <div className="flex">
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this task."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
      </div>
    </div>
  )
}
/*
title
description
due date
priority level
status
completed
*/