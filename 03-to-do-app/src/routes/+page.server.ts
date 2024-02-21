/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad, Actions } from './$types.js';

export const load = (async ({ cookies }) => {
    const taskList = cookies.get('task') as string;
    if (!taskList) {
        cookies.set('task', JSON.stringify([{value: 'Add your first task to start!', id: 0, checked: false}]), { path: '/' });
        return { taskList };
    }
    return { taskList };
}) satisfies PageServerLoad;

export const actions = {
    addTask: async ({ request, cookies }) => {
        const expires = new Date('12-12-2030');
        const data = await request.formData();
        let taskList = JSON.parse(cookies.get('task') as string);

        const taskValue = data.get('taskInput') as string
        if (!taskValue) {
            return { error: 'Tasks must have a value' };
        }
        const id = taskList.reduce((max: number, task: {id: number}) => max > task.id ? max : task.id + 1, 0);
        const task = {
            id,
            value: taskValue,
            checked: false,
        };

        const taskListNotChecked = taskList.filter((task: any) => !task.checked)
        const taskListChecked = taskList.filter((task: any) => task.checked)

        taskList = JSON.stringify([...taskListNotChecked, task, ...taskListChecked])
        cookies.set('task', taskList, { path: '/', expires });
    },

    removeTask: async ({ request, cookies }) => {
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
    }
} satisfies Actions;