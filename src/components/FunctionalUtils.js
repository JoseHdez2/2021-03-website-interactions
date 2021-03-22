export const sum = (ary) => ary.reduce((acc, item) => acc + item);

export const mean = (ary) => sum(ary) / ary.length;
