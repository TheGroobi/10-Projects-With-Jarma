/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { dropTargetIndex, taskDragging } = await request.json();
    let taskList = [...JSON.parse(cookies.get('task') as string)];
    const movedTask = taskList.splice(taskDragging, 1);
    taskList = [...taskList.splice(dropTargetIndex, 0, ...movedTask), ...taskList];
    cookies.set('task', JSON.stringify(taskList), { path: '/'})
    return new Response();
}