<svelte:head>
    <title>To Do List</title>
</svelte:head>

<script lang="ts">
    import { flip, } from 'svelte/animate';
    import { fade, scale } from 'svelte/transition';

let taskInputValue: string = '';
let validation: boolean = true;
let maxTask: boolean = true;
let taskList = [{value: 'aplikacja do zarządzania zadaniami w svelcie (ToDo List)', checked: false, id: 0}, {value: '1', checked: false, id: 1}, {value: '2', checked: false, id: 2}, {value: '3', checked: false, id: 3}, {value: '4', checked: false, id: 4}, {value: '5', checked: false, id: 5}, {value: '6', checked: false, id: 6}, {value: '7', checked: false, id: 7}, {value: '8', checked: false, id: 8}, {value: '9', checked: false, id: 9}, {value: '10', checked: false, id: 10}];

let taskDragging: any;
function capitalizeFirstLetter(input: string) {
    if (input.length) {
        taskInputValue = input[0].toUpperCase() + input.slice(1);
    }
}

function addTask() {
    if (taskList.length <= 15) {
        maxTask = true;
        if (taskInputValue === '') {
            validation = false;
            return;
        } else {
            validation = true;
            capitalizeFirstLetter(taskInputValue);
            const task = { value: taskInputValue, checked: false, id: taskList.length + 1}
            taskList = [...taskList, task];
            taskInputValue = '';
        }
    } else {
        maxTask = false;
        return;
    }
}

function removeTask(i: number) {
    if (taskList.length <= 16) {
        maxTask = true;
    }
    taskList.splice(i, 1);
    taskList = [...taskList];
}

function moveDownTask(i: number) {
    if (taskList[i].checked) {
        const movedTask = taskList.splice(i, 1);
        taskList = [...taskList, movedTask[0]];
    } else {
        const movedTask = taskList.splice(i, 1);
        taskList = [...movedTask, ...taskList];    
    }
}
function taskListDragging (e: DragEvent) {
    const id = (e.target as HTMLElement).getAttribute('id');
    const task = taskList.find(task => task.id === Number(id));
    if (task && !task.checked) {
        taskDragging = task;
    } else {
        taskDragging = null;
    }
}
function assignedDrop (e: DragEvent) {
    if (!taskDragging) return;
    const dropTarget = (e.target as HTMLElement);
    if (dropTarget.nodeName === 'LI') {
        const id = dropTarget.getAttribute('id');
        const dropTagetTask = taskList.find(task => task.id === Number(id));
        if (dropTagetTask && !dropTagetTask.checked) {
            const dropTargetIndex = taskList.indexOf(dropTagetTask);
            taskList.splice(taskList.indexOf(taskDragging), 1);
            taskList = [...taskList.splice(dropTargetIndex, 0, taskDragging), ...taskList];
        }
    }
}
</script>

<main class="wrapper">
    <h1>Lista zadań</h1>
    <div 
        on:drop={assignedDrop}
        on:dragover={(e) => e.preventDefault()}
        role="list"
    >
        <ul class="task-container">
            {#each taskList as task, i (task.id)}
                <li class="task"
                    on:drag={taskListDragging}
                    draggable="true"
                    id="{task.id.toString()}"
                    out:fade
                    animate:flip={{delay: 200, duration: 1500 - (i * 50)}}
                    class:completed-task={task.checked}
                >
                    <input
                        type="checkbox"
                        name="task-checkbox"
                        bind:checked={task.checked}
                        on:change={() => moveDownTask(i)}
                    />
                    {#if task.checked}
                        <svg transition:scale class="check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path fill="#fff" fill-rule="evenodd" d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z" clip-rule="evenodd"/></svg>
                    {/if}
                    <span class:completed={task.checked}>{task.value}</span>
                    <button type="button" on:click={() => removeTask(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </li>
                {/each}
        </ul>
    </div>
        <form>
            <input 
            bind:value={taskInputValue}
            name="task-input"
            type="text"
            placeholder="Wpisz treść zadania"
            />
            <button type="submit" on:click={addTask}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
            </button>
        </form>
        {#if validation === false}
            <p class="error" transition:scale>Zadanie musi mieć treść</p>
        {/if}
        {#if maxTask === false}
            <p class="error" transition:scale>Możesz dodać maksymalnie 15 zadań</p>
        {/if}
</main>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    $text: #1E293B;
    $text-completed: #64748B;
    $checkbox-green: #84CC16;
    $background: #F1F5F9;
    $white: #fff;
    $whiteFade: rgba(248, 250, 252, 1);

    @mixin input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1rem;
        padding-right: 2.25rem;
        width: 100%;
        background-color: $white;
        color: $text;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        background-color: $background;
    }
    :global(*) {
        margin: 0;
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 1rem;
    }
    .wrapper {
        height: 100svh;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1 {
            margin-bottom: 2rem;
            color: $text;
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.1px;
        }
        .task-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 26.25rem;
            position: relative;
            padding-inline-start: 0;
            .task {
                display: flex;
                gap: 0.75rem;
                position: relative;
                @include input;
                text-wrap: wrap;
                word-break: break-word;
                input {
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    -ms-appearance: none;
                    height: 1.5rem;
                    transition: all 0.2s ease-in-out;
                    &::after {
                        content: '';
                        display: inline-block;
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 3px;
                        background-color: $background;
                    }
                    &:checked::after {
                        background-color: $checkbox-green;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
                input:checked + .check {
                    display: block;
                }
                .check {
                    display: none;
                    pointer-events: none;
                    width: 0.875rem;
                    height: 0.875rem;
                    left: 1.31rem;
                    position: absolute;
                }
                input:checked + .check + span {
                    text-decoration: line-through;
                    color: $text-completed;
                }
                button {
                    width: 1rem;
                    height: 1rem;
                    padding: 0;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    position: absolute;
                    right: 1rem;
                    &:hover {
                        svg {
                            color: red;
                        }
                    }
                    svg {
                        pointer-events: none;
                        color: $text;
                        width: 1rem;
                        height: 1rem;
                        transition: all 0.1s ease-in-out;
                    }
                }
            }
        }
        .completed-task {
            background-color: $whiteFade !important;
        }
            form {
                position: relative;
                width: 26.25rem;
                margin-top: 0.5rem;
                input {
                    @include input;
                    outline: none;
                    border: none;
                    &::placeholder {
                        color: $text-completed;
                        opacity: 1;
                    }
                }
                button {
                    padding: 0;
                    background-color: transparent;
                    position: absolute;
                    outline: none;
                    border: none;
                    top: 0.825rem;
                    right: 1rem;
                    width: 1rem;
                    height: 1rem;
                    &:hover {
                        svg {
                            color: $checkbox-green;
                        }
                    }
                    svg {
                        pointer-events: none;
                        color: $text;
                        width: 1rem;
                        height: 1rem;
                        transition: all 0.1s ease-in-out;
                    }
                }
            }
        .error {
            color: red;
            font-size: 0.65rem;
            font-weight: 700;
            margin-top: 0.5rem;
        }
    }
</style>