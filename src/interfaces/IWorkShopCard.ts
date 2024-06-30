export interface IWorkShopCardItem {
	id:String
	title: string;
	date: string;
	organizedBy: string;
	price?: number;
	isFree: boolean;
	durationInHours: string;
	img?: string;
	startTime: string;
	semester: string;
	department: string;
	description?: string;
	attendance: string;
	maxNumberOfStudents: number;
	registrationLink:string;
	speakers:string;
	targetFaculties:string;
}
