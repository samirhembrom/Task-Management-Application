import { Link,Outlet,Form,useLoaderData,redirect,useSubmit,useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { getTasks, createTask } from "./getTasks";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const c = url.searchParams.get('completed');
  const p = url.searchParams.get('priority');
  const tasks = await getTasks(q,c,p);
  return {tasks, q,c,p};
}

export async function action() {
  const task = createTask();
  return redirect(`tasks/${task.id}/edit`);
}

export default function Dashboard() {
  const {tasks,q,c,p} = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");


  useEffect(()=> {
    document.getElementById("q").value = q;
  },[q]);

  useEffect(()=> {
    document.getElementById("c").value = c;
  })

  useEffect(()=> {
    document.getElementById("p").value = p;
  })

  return (
    <>
      <div id="sidebar">
        <h1>Tasks</h1>
        <Form id="search-form" role="search">
          <input
            id="q"
            className={searching ? "loading":""}
            aria-label="Search tasks"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
            onChange={(event)=> {
              const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
           <select id="c" name="completed" onChange={(event)=>{
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
           }} aria-label="Filter by completion status">
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>

          
          <select id="p" name="priority" onChange={(event)=>{
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
          }} aria-label="Filter by priority">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div id="search-spinner" aria-hidden hidden={!searching} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
      <Form method="post">
        <button type="submit">New</button>
      </Form>
      
      <nav>
        {tasks.length ? (
          <ul>
            {tasks.map(task=> (
              <li key={task.id}>
                <Link to={`tasks/${task.id}`}>
                  {task.title?(
                    <>
                      {task.title}
                    </>
                  ):(<i>No title</i>)}
                </Link>
              </li>
            ))}
          </ul>
        ):(
          <p>No tasks</p>
        )}
      </nav>
      </div>
      <div>
        <Outlet/>
      </div>
    </>
  )
}