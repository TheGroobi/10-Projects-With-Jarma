<svelte:head>
    <title>To Do List</title>
</svelte:head>
<script>
    function completed() {
        if(this.checked) {
            this.classList.add('completed');
        } else {
            this.classList.remove('completed');
        }
    }

</script>
<main class="wrapper">
    <h1>Lista zadań</h1>
    <form>
        <div class="task">
            <input type="checkbox" on:change={completed}/>
            <span>Tworzenie komponentu pogodowego</span>
        </div>
        <input type="text" placeholder="Wpisz treść zadania" />
        <button type="submit">Dodaj</button>
</main>
<style lang="scss">
    .completed {
        text-decoration: line-through;
    }
</style>