<script>
    import { onMount } from "svelte";
    // @ts-ignore
    import { createEditor } from '$lib/components/Editor.jsx'
    import sharedStateStore, { updateState } from '$lib/stores/svelteStore';

    export let data

    onMount(() => {
        createEditor({ 
            container: document.getElementById('editor'), 
        });

        // @ts-ignore
        updateState((state) => ({...state, name: data.name}))
    })

    // Function to update the state
    const incrementCounter = () => {
        // @ts-ignore
        updateState((state) => ({ ...state, counter: state.counter + 1 }));
    };

    // @ts-ignore
    const nameChange = (event) => {
        const newName = event.target.value;
        // @ts-ignore
        updateState((state) => ({ ...state, name: newName }))
    }

</script>

<svelte:head>
    <link
        href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
        rel="stylesheet"
    />

    <style>
        .polotno-side-tabs-container .polotno-side-panel-tab.active {
            background-color: #D4163C !important;
            color: white ;
        }
        .polotno-side-tabs-container .polotno-side-panel-tab:hover {
            background-color: #F26155 !important;
            color: white ;
        }
        .polotno-side-tabs-container {
            min-width: 80px !important;
        }
    </style>
</svelte:head>

<div style="text-align: center; margin-block: 10px;">
    <p>Svelte Counter: {$sharedStateStore.counter}</p>
    <button
      class="bp5-button"
      style="width: 100px;"
      on:click={incrementCounter}
    >
      Increment
    </button>
    <br/>
    <label for="nameInput">Svelte Name: </label>
    <input id="nameInput" bind:value={$sharedStateStore.name} on:input={nameChange} />
</div>

<div id="editor"></div>

<style>
    #editor {
        width: 100%;
        height: calc(100vh - 120px);
        color: #1c2127;
        z-index: 1;
        position: relative;
    }

    #nameInput {
        margin-top: 10px;
    }
</style>