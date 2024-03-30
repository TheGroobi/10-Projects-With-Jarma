export function handleEnterSubmit(formEl: HTMLFormElement) {
    (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            formEl.submit()
            }
        }
}
