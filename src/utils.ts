
export function sleep(ms: number) {
	const end = new Date()
	end.setMilliseconds(end.getMilliseconds() + ms)
	while(new Date().getTime() < end.getTime());
}
