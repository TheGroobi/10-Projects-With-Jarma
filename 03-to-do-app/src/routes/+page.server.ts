/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad, Actions } from './$types.js';

export const load = (async ({ cookies }) => {
    const taskList = cookies.get('task') as string;
    const error = cookies.get('error') as string;
    if (!taskList) {
        cookies.set('task', JSON.stringify([{value: 'Add your first task to start!', id: 1298371278936, checked: false}]), { path: '/' });
        return { taskList, error };
    }
    return { taskList, error };
}) satisfies PageServerLoad;

export const actions = {
    storeTasks: async ({ request, cookies }) => {
        cookies.delete('error', { path: '/' })

        const id = Math.floor(Math.random() * 1000000000000);
        const data = await request.formData();

        if (!data.get('taskInput')) {
            return cookies.set('error', 'Tasks must have a value', { path: '/' });
        }

        const task = {value: data.get('taskInput') as string, checked: false, id: id};
        const storedTaskList = JSON.parse(cookies.get('task') as string);
        const taskList = JSON.stringify([...storedTaskList, task]);
        cookies.set('task', taskList, { path: '/' });
    },
    removeTask: async ({ request, cookies }) => {
        const data = await request.formData();
        const value = data.get('taskValue') as string;
        const tasks = cookies.get('task');
        console.log(tasks)
        cookies.set('lksdgfjkdjfgh', JSON.stringify(value), { path: '/' });
    }

} satisfies Actions;