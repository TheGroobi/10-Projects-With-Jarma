
export function handleEnterSubmit(e: KeyboardEvent, form: HTMLFormElement) {
    if (e.key === 'Enter') {
        form.submit();
    }
}

export const TINYMCE_API_KEY: string = "9bg0drjqatftklvnmlensjqug66xm0h3ydnocv8zhcyvle3k"

export const tinymceConfig = {
    // selector: 'textarea#note',
    plugins: 'advlist lists emoticons image link typography visualblocks autoresize codesample autolink quickbars fullscreen ',
    toolbar: ['bold italic underline | alignleft aligncenter bullist | link quickimage emoticons codesample | blocks | undo redo'],
    link_default_target: '_blank',
    toolbar_mode: 'wrap',
    menubar: false,
    skin: 'oxide-dark',
    icons: 'material',
    content_css: ['dark', 'css.css'],
    min_height: 550,
    language: 'pl',
    max_height: 550,
    advlist_bullet_styles: 'disc',
    advlist_number_styles: 'lower-alpha',
    statusbar: false,
    content_style: `
    p{
        margin:0;
    }
    body{
        border:none;
        font-family:Inter,Helvetica,sans-serif;
        font-size:16px;
        background-color:rgba(30, 41, 59, 1);
        color:rgba(248, 250, 252, 1);
        overflow: hidden;
    }
    img {
        border-radius: 10px;
    }`
}

