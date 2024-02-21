/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad, Actions } from './$types.js';

export const load = (async ({ cookies }) => {
    const taskList = cookies.get('task') as string;
    const error = cookies.get('error') as string;
    if (!taskList) {
        cookies.set('task', JSON.stringify([{value: 'Add your first task to start!', id: 0, checked: false}]), { path: '/' });
        return { taskList, error };
    }
    return { taskList, error };
}) satisfies PageServerLoad;

export const actions = {
    addTask: async ({ request, cookies }) => {
        const expires = new Date('12-12-2030');
        const data = await request.formData();
        let taskList = JSON.parse(cookies.get('task') as string);

        const taskValue = data.get('taskInput') as string
        if (!taskValue) {
            return cookies.set('error', 'Tasks must have a value', { path: '/' });
        } else {
            cookies.delete('error', { path: '/' });
        }
        const id = taskList.reduce((max: number, task: {id: number}) => max > task.id ? max : task.id + 1, 0);
        const task = {value: taskValue , checked: false, id: id};

        const taskListNotChecked = taskList.filter((task: any) => !task.checked)
        const taskListChecked = taskList.filter((task: any) => task.checked)

        taskListChecked
            ? taskList = JSON.stringify([...taskListNotChecked, task, ...taskListChecked])
            : taskList = JSON.stringify([...taskList, task])

        cookies.set('task', taskList, { path: '/', expires });
    },

    removeTask: async ({ request, cookies }) => {
        cookies.delete('error', { path: '/' });
        const expires = new Date('12-12-2030');
        const data = await request.formData();
        let taskList = JSON.parse(cookies.get('task') as string);

        const taskId = Number(data.get('taskId') as string);
        taskList = JSON.stringify(taskList.filter((task: any) => task.id !== taskId));

        cookies.set('task', taskList, { path: '/', expires });
    },

    checkTask: async ({ request, cookies }) => {
        const expires = new Date('12-12-2030');
        const data = await request.formData();
        let taskList = JSON.parse(cookies.get('task') as string);

        const taskId = Number(data.get('checkbox') as string);
        const task = taskList.find((task: any) => task.id === taskId);

        let checked = task.checked = !task.checked;
        const taskIndex = taskList.indexOf(task)
        const movedTask = taskList.splice(taskIndex, 1)
        if (checked) {
            taskList = JSON.stringify([...taskList, movedTask[0]])
        } else {
            taskList = JSON.stringify([movedTask[0], ...taskList])
        }
        
        cookies.set('task', taskList, { path: '/', expires});
    },

    changeOrderOfTask: async ({ request, cookies}) => {
        const data = await request.formData();
        console.log(data)
        //pass the grabbed task 
        //pass the dropped on task
        //taskList.splice(grabbedTaskIndex, 1)
        //taskList = [...taskList.splice(droppedOnTaskIndex, 0, grabbedTask), ...taskList]

    }
} satisfies Actions;