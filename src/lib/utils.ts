import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export type WithElementRef<T> = T & {
	ref?: HTMLElement | null
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
