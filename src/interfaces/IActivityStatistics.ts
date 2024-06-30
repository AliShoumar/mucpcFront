export interface IActivityStatistics {
	registeredStudents: Number;
	studentMajor: {
		major: string;
		count: number;
		percent: number;
	}[];
	studentFromWhichYear: {
		year: string;
		count: number;
		percent: number;
	}[];
	studentGender: {
		gender: Gender;
		count: number;
		percent: number;
	}[];
	StudentWithSpecialNeeds: {
		specialNeeds: string;
		count: number;
		percent: number;
	}[];
}

export enum Gender {
	Male = 'Male',
	Female = 'Female',
}

