/** @type {import('./$types').PageServerLoad} */
import taskList from './+page.svelte';

export async function load() {
    return {
        tasks: taskList.map(task => ({
            id: task.id,
            value: task.value,
            checked: task.checked,
        }))
    };
};