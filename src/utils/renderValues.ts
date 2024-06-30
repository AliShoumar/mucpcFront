export function renderValue(value:any) {
	if (typeof value === 'boolean') {
		return value ? 'True' : 'False';
	} else {
		return value;
	}
}
