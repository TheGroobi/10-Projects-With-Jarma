import type { Action } from 'svelte/action'

export interface Attributes {
    'on:outside'?: (event: CustomEvent) => void
}

export type clickOutsideAction = Action<HTMLElement, any, Attributes>