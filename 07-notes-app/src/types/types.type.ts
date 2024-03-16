import type { Action } from 'svelte/action'

export interface Note {
    title: string;
    content: string;
    date: Date;
}

export interface Attributes {
    'on:outside'?: (event: CustomEvent) => void
}

export type clickOutsideAction = Action<HTMLElement, any, Attributes>