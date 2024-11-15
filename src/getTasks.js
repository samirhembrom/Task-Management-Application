import { nanoid } from 'nanoid'
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export function getAllTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
}

export function getTasks(query,completed,priority) {
  let tasks = getAllTasks();
  if(!tasks) tasks = [];
  if(query) 
    tasks = matchSorter(tasks, query, { keys: ["title"]});
  if(completed==="true"||completed==="false") 
    tasks = matchSorter(tasks, completed, { keys: ["completed"]}) 
  if(priority==="low"||priority==="medium"||priority==="high") 
    tasks = matchSorter(tasks, priority, { keys: ["priority"]});
  return tasks.sort(sortBy("title","createdAt"));
}

export function setTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function createTask() {
  let id = nanoid();
  let task = {
    id,
    createdAt: Date.now(),
    completed: false
  };
  let tasks = getAllTasks();
  tasks.unshift(task);
  setTasks(tasks);
  return task;
}

export function getTask(id) {
  let tasks = getAllTasks();
  let task = tasks.find(task=>task.id===id);
  return task ?? null;
}

export function updateTask(id, updates) {
  let tasks = getAllTasks();
  let task = tasks.find(task=> task.id===id);
  if(!task) throw new Error("No task found for", id);
  Object.assign(task,updates);
  setTasks(tasks);
  return task;
}

export function deleteTask(id) {
  let tasks = getAllTasks();
  console.log(tasks);
  let index = tasks.findIndex(task => task.id === id);
  if(index > -1) {
    tasks.splice(index, 1);
    setTasks(tasks);
    return true;
  }
  return false;
}