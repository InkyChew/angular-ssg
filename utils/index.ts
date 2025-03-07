export * from './post';

export const slugify = (value: string) => value.replace(/[ ]+/g, '-');

export const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start }, (_, index) => start + index);
}