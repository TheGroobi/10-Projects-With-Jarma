<script lang="ts">
    
    $: password = '&oH2++Ao3S';
    let length: number = 23;
    let uppercaseLetters: boolean = true;
    let digits: boolean = true;
    let specialChars: boolean = true;
    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let special = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    function generatePassword() {
        let selection = lowercase;
        if (uppercaseLetters) selection += uppercase;
        if (digits) selection += numbers;
        if (specialChars) selection += special;
        password = '';
        for (let i = 0; i < length; i++) {
            password += selection[Math.floor(Math.random() * selection.length)];
        }
        if (password.length === 0) password = '';
        if (password.length < 47) password = generatePassword();
        console.log(password)
        return password;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(password);
    }
</script>
<main class="wrapper">
    <div class="password-container">
        <p class="title">Wygeneruj hasło</p>
        <input 
        type="text"
        name="password"
        class="password"
        bind:value={password}
        on:click={copyToClipboard}
        on:keydown={(e) => e.preventDefault()}
        >
        <button on:click={copyToClipboard} class="clipboard-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><g fill="#1E293B" fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path d="M7.5 6.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H7.5Zm-2.25.75A2.25 2.25 0 0 1 7.5 5.25H15a2.25 2.25 0 0 1 2.25 2.25V15A2.25 2.25 0 0 1 15 17.25H7.5A2.25 2.25 0 0 1 5.25 15V7.5Z"/><path d="M3 2.25c-.41 0-.75.34-.75.75v7.5c0 .41.34.75.75.75a.75.75 0 0 1 0 1.5c-1.24 0-2.25-1.01-2.25-2.25V3C.75 1.76 1.76.75 3 .75h7.5c1.24 0 2.25 1.01 2.25 2.25a.75.75 0 0 1-1.5 0c0-.41-.34-.75-.75-.75H3Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h18v18H0z"/></clipPath></defs></svg>
        </button>
        <button on:click={generatePassword} class="random-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><g fill="#1E293B" fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path d="M3 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75V9A.75.75 0 0 0 9 8.25H3ZM.75 9A2.25 2.25 0 0 1 3 6.75h6A2.25 2.25 0 0 1 11.25 9v6A2.25 2.25 0 0 1 9 17.25H3A2.25 2.25 0 0 1 .75 15V9Z"/><path d="M9.563 1.378a2.43 2.43 0 0 1 3.278.022l3.75 3.69.031.033a2.43 2.43 0 0 1-.027 3.282L13.97 11.03a.75.75 0 1 1-1.06-1.06l2.609-2.61a.93.93 0 0 0 .002-1.218l-3.719-3.66a.93.93 0 0 0-1.222-.001l-2.55 2.55A.75.75 0 1 1 6.97 3.97l2.565-2.565a.745.745 0 0 1 .028-.027ZM3.75 13.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM6.75 10.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75Z"/><path d="M10.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 0 1.5h-.008a.75.75 0 0 1-.75-.75ZM12.75 6.75A.75.75 0 0 1 13.5 6h.008a.75.75 0 0 1 0 1.5H13.5a.75.75 0 0 1-.75-.75Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h18v18H0z"/></clipPath></defs></svg>
        </button>
    </div>
    <div class="length-container">
        <p class="title">Długość hasła</p>
        <div class="length-input-container">
            <input
                aria-label="password-length-input"
                type="text"
                maxlength="2"
                name="password-length-input"
                bind:value={length}
                on:input={generatePassword}
            >
            <input
                aria-label="password-length"
                type="range"
                min="1"
                max="46"
                step="1"
                name="password-length"
                bind:value={length}
                on:input={generatePassword}
            >
        </div>
    </div>
    <div class="options-container">
        <div class="uppercase-letters-option">
            <label for="uppercase-letters">Duże litery</label>
            <input
            id="uppercase-letters"
            type="checkbox"
            name="uppercase-letters"
            bind:checked={uppercaseLetters}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0791 3.08752C12.307 3.31533 12.307 3.68467 12.0791 3.91248L5.66248 10.3291C5.43467 10.557 5.06533 10.557 4.83752 10.3291L1.92085 7.41248C1.69305 7.18467 1.69305 6.81533 1.92085 6.58752C2.14866 6.35972 2.51801 6.35972 2.74581 6.58752L5.25 9.09171L11.2542 3.08752C11.482 2.85972 11.8513 2.85972 12.0791 3.08752Z" fill="white"/></svg>
        </div>
        <div class="digits-option">
            <label for="digits">Cyfry</label>
            <input
            id="digits"
            type="checkbox"
            name="digits"
            bind:checked={digits}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0791 3.08752C12.307 3.31533 12.307 3.68467 12.0791 3.91248L5.66248 10.3291C5.43467 10.557 5.06533 10.557 4.83752 10.3291L1.92085 7.41248C1.69305 7.18467 1.69305 6.81533 1.92085 6.58752C2.14866 6.35972 2.51801 6.35972 2.74581 6.58752L5.25 9.09171L11.2542 3.08752C11.482 2.85972 11.8513 2.85972 12.0791 3.08752Z" fill="white"/></svg>
        </div>
        <div class="special-chars-option">
            <label for="special-chars">Znaki specjalne</label>
            <input
            id="special-chars"
            type="checkbox"
            name="special-chars"
            bind:checked={specialChars}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0791 3.08752C12.307 3.31533 12.307 3.68467 12.0791 3.91248L5.66248 10.3291C5.43467 10.557 5.06533 10.557 4.83752 10.3291L1.92085 7.41248C1.69305 7.18467 1.69305 6.81533 1.92085 6.58752C2.14866 6.35972 2.51801 6.35972 2.74581 6.58752L5.25 9.09171L11.2542 3.08752C11.482 2.85972 11.8513 2.85972 12.0791 3.08752Z" fill="white"/></svg>
        </div>
    </div>
</main>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
    $background: #FFFFFF;
    $background-2: #F1F5F9;
    $background-2-hover: #f1f5f9be;
    $blue: #0EA5E9;
    $text: #1E293B;

    :global(body) {
        margin: 0;
        padding: 0;
        background: $background-2;
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
    :global(*) {
        color: $text;
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
    }
    .wrapper {
        display: flex;
        padding: 4rem;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        gap: 2.5rem;
        background: $background;
        .title {
            font-size: 0.5em;
            text-transform: uppercase;
            margin-top: calc(1.5rem - 2.5rem );
        }
        .password-container {
            gap: 0.6875rem;
            position: relative;
            input {
                padding: 1rem;
                width: 26.25rem;
                border: none;
                background-color: $background-2;
                gap: 0.75rem;
                padding-right: 4rem;
                text-overflow: ellipsis;
                &:focus, &:active {
                    outline: none;
                }
            }
            button {
                width: 1rem;
                aspect-ratio: 1;
                cursor: pointer;
                position: absolute;
                top: 1.125rem;
                right: 1rem;
                outline: none;
                border: none;
                background-color: transparent;
                padding: 0;
            }
            .clipboard-btn {
                right: 2.875rem;
            }
        }
        .length-container {
            .length-input-container {
                display: flex;
                gap: 0.70rem;
                width: 100%;
            }
            input[type=range] {
                appearance: none;
                -webkit-appearance: none;
                width: 23rem;
                background-color: transparent;
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0.75rem;
                    aspect-ratio: 1;
                    background-color: $blue;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-top: -0.25rem;
                }
                &::-moz-range-thumb {
                    width: 0.75rem;
                    aspect-ratio: 1;
                    background-color: $blue;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-top: -0.25rem;
                }
                &::-ms-thumb {
                    width: 0.75rem;
                    aspect-ratio: 1;
                    background-color: $blue;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-top: -0.25rem;
                }
                &::-ms-track {
                    cursor: pointer;
                    background: transparent; 
                    border-color: transparent;
                    color: transparent;
                    top: 0;
                }
                &::-webkit-slider-runnable-track {
                    cursor: pointer;
                    width: 11.625rem;
                    height: 0.25rem;
                    background: $blue;
                    border-radius: 8px;
                }
                &::-moz-range-track {
                    cursor: pointer;
                    width: 23rem;
                    height: 0.25rem;
                    background: $blue;
                    border-radius: 8px;
                }
            }
            input[name=password-length-input] {
                padding: 0.75rem;
                width: 2.6125rem !important;
                border-radius: 8px;
            }
            input {
                border: none;
                background-color: $background-2;
                gap: 0.75rem;
                margin: 0;
                &:focus, &:active {
                    outline: none;
                }
            }
        }
        .options-container {
            display: flex;
            gap: 1.5rem;
            svg {
                display: none;
                width: 0.875rem;
                aspect-ratio: 1;
                color: black;
                position: absolute;
                left: 0.30rem;
                pointer-events: none;
            }
            .uppercase-letters-option,
            .digits-option,
            .special-chars-option {
                position: relative;
                display: flex;
                flex-direction: row-reverse;
                gap: 0.75rem;
                align-items: center;
                label {
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                input {
                    width: 1.5rem;
                    margin: 0;
                    aspect-ratio: 1;
                    appearance: none;
                    -webkit-appearance: none;
                    background-color: $background-2;
                    border-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    &:checked {
                        background-color: $blue;
                    }
                }
            }
            .uppercase-letters-option {
                input:checked + svg {
                    display: block;
                }
            }
            .digits-option {
                input:checked + svg {
                    display: block;
                }
            }
            .special-chars-option {
                input:checked + svg {
                    display: block;
                }
            }    
        }
    }
    </style>