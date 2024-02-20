<script lang="ts" type="module">
	import { flip } from "svelte/animate";
	import { fade, scale } from "svelte/transition";
	import { enhance } from "$app/forms";

	export let data;
	let taskDragging: any;
	$: taskList = data.taskList
		? JSON.parse(data.taskList)
		: [{ value: "Add your first task to start!", id: 0, checked: false }];

	function taskListDragging(e: DragEvent) {
		const id = (e.target as HTMLElement).getAttribute("id");
		const task = taskList.find((task: any) => task.id === Number(id));
		if (task && !task.checked) {
			taskDragging = task;
		} else {
			taskDragging = null;
		}
	}

	function assignedDrop(e: DragEvent) {
		if (!taskDragging) return;
		const dropTarget = e.target as HTMLElement;
		if (dropTarget.nodeName === "LI") {
			const id = dropTarget.getAttribute("id");
			const dropTagetTask = taskList.find(
				(task: any) => task.id === Number(id)
			);
			if (dropTagetTask && !dropTagetTask.checked) {
				const dropTargetIndex = taskList.indexOf(dropTagetTask);
				taskList.splice(taskList.indexOf(taskDragging), 1);
				taskList = [
					...taskList.splice(dropTargetIndex, 0, taskDragging),
					...taskList,
				];
			}
		}
		taskDragging = null;
	}
</script>

<svelte:head>
	<title>To Do List</title>
</svelte:head>

<main class="wrapper">
	<h1>Lista zadań</h1>
	<div
		on:drop={assignedDrop}
		on:dragover={(e) => e.preventDefault()}
		role="list"
	>
		<ul class="task-container">
			{#each taskList as task, i (task.id)}
				<li
					class="task"
					on:drag={taskListDragging}
					id={task.id}
					class:completed-task={task.checked}
					draggable={task.checked ? false : true}
					animate:flip
					out:fade
				>
					<form method="POST" action="?/checkTask" use:enhance>
						<button
							type="submit"
							class="checkbox-btn"
							class:checked={task.checked}
						>
							<input type="hidden" value={task.id} name="checkbox" />
							{#if task.checked}
								<svg
									class="check"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
									><path
										fill="#fff"
										fill-rule="evenodd"
										d="M12.08 3.088a.583.583 0 0 1 0 .824L5.661 10.33a.583.583 0 0 1-.824 0L1.92 7.412a.583.583 0 0 1 .825-.824L5.25 9.092l6.004-6.004a.583.583 0 0 1 .825 0Z"
										clip-rule="evenodd"
									/></svg
								>
							{/if}
						</button>
					</form>
					<span class:completed={task.checked}>{task.value}</span>
					<form method="POST" action="?/removeTask" use:enhance>
						<input type="hidden" name="taskId" value={task.id} />
						<button type="submit" class="delete-btn">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-x"
								><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
							>
						</button>
					</form>
				</li>
			{/each}
		</ul>
		<form method="POST" action="?/addTask" use:enhance>
			<div class="submit-input">
				<input
					name="taskInput"
					type="text"
					class="form-input"
					placeholder="Wpisz treść zadania"
				/>
				<button type="submit" class="submit-btn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-send-horizontal form-submit-svg"
						><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg
					>
				</button>
			</div>
		</form>
	</div>
	{#if data.error}
		<p class="error" transition:scale>{data.error}</p>
	{/if}
</main>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

	$text: #1e293b;
	$text-completed: #64748b;
	$checkbox-green: #84cc16;
	$background: #f1f5f9;
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
		font-family: "Inter", sans-serif;
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
		button {
			border: none;
			outline: none;
			padding: 0;
			background-color: transparent;
			&:hover {
				cursor: pointer;
			}
		}
		svg {
			transition: all 0.1s ease-in-out;
			pointer-events: none;
		}
		.task-container {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 26.25rem;
			position: relative;
			padding-inline-start: 0;
			.task {
				gap: 0.75rem;
				display: flex;
				position: relative;
				@include input;
				text-wrap: wrap;
				word-break: break-word;
				position: relative;
				form {
					height: 1.5rem;
					.checkbox-btn {
						height: 1.5rem;
						width: 1.5rem;
						position: relative;
						&::after {
							content: "";
							display: inline-block;
							width: 1.5rem;
							height: 1.5rem;
							border-radius: 3px;
							background-color: $background;
						}
						&.checked::after {
							background-color: $checkbox-green;
						}
					}
				}
				.check {
					width: 0.875rem;
					height: 0.875rem;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				.delete-btn {
					width: 1rem;
					height: 1rem;
					border: none;
					position: absolute;
					right: 1rem;
					top: 1rem;
					&:hover {
						svg {
							color: red;
						}
					}
					svg {
						color: $text;
						width: 1rem;
						height: 1rem;
					}
				}
			}
		}
		.completed {
			text-decoration: line-through;
			opacity: 0.5;
		}
		.completed-task {
			background-color: $whiteFade !important;
		}
		form {
			.form-input {
				@include input;
				outline: none;
				border: none;
				position: relative;
				&::placeholder {
					color: $text-completed;
					opacity: 1;
				}
			}
			.submit-input {
				margin-top: 0.5rem;
				position: relative;
				button {
					position: absolute;
					top: 0.825rem;
					right: 1rem;
					width: 1rem;
					height: 1rem;
					&:hover {
						.form-submit-svg {
							color: $checkbox-green;
						}
					}
					.form-submit-svg {
						color: $text;
						width: 1rem;
						height: 1rem;
					}
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
