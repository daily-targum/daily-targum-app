/**
 * @typeParam T element type
 * @typeParam L length of array
 */
export type FixedSizeArray<T, L extends number> = L extends 0 ? never[] : {
	0: T;
	length: L;
} & ReadonlyArray<T>;