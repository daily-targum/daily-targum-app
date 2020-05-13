import { FixedSizeArray } from '../types';

export function chunkArray<I, L extends number>(arr: I[], chunkSize: L): FixedSizeArray<I, L>[] {
	var result = [];
	for (var i = 0; i < arr.length; i += chunkSize) {
		result.push(arr.slice(i, chunkSize + i));
	}
	return result as FixedSizeArray<I, L>[];
}