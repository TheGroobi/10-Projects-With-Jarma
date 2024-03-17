import { auth } from '$lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { goto } from '$app/navigation'
import type { clickOutsideAction } from '$types/types.type';

export const TINYMCE_API_KEY: string = "9bg0drjqatftklvnmlensjqug66xm0h3ydnocv8zhcyvle3k"

export const tinymceConfig = {
    plugins: 'advlist lists emoticons image link typography visualblocks codesample autolink quickbars fullscreen',
    toolbar: ['bold italic underline | alignleft aligncenter bullist | link quickimage emoticons codesample | blocks | undo redo'],
    link_default_target: '_blank',
    toolbar_mode: 'wrap',
    menubar: false,
    skin: 'oxide-dark',
    icons: 'material',
    content_css: 'dark',
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
};

export function handleEnterSubmit(e: KeyboardEvent, form: HTMLFormElement) {
    if (e.key === 'Enter') {
        form.submit();
    }
};

export function signOutWithGoogle() {
    signOut(auth);
    setTimeout(() => {
        goto('/');
    }, 200);
};

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
};

export async function setUidCookies(uid: string) {
    fetch('/api', {
        method: 'PUT',
        body: JSON.stringify({ uid }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const clickOutside: clickOutsideAction = element => {
    function handleClick(event: MouseEvent) {
        const targetEl = event.target as HTMLElement;

        if (element && !element.contains(targetEl)) {
            const clickOutsideEvent = new CustomEvent('outside');
            element.dispatchEvent(clickOutsideEvent);
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
    };
};

export function serializeText(text: string) {
    return text.replace(/<[^>]*>?/gm, '');
}