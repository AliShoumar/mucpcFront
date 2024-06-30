export interface IActivityEvaluation {
	studentCount: number;
	trainer: {
		question: string;
		answer: Rating1;
	}[];
	educationalContent: {
		question: string;
		answer: Rating2;
	}[];
	educationalContent2: {
		question: string;
		answer: Rating1;
	}[];
	trainingClimate: {
		question: string;
		asnwer: Rating2;
	}[];
}

enum Rating1 {
	Excellent = 'Excellent',
	Weak = 'Weak',
	Good = 'Good',
}
enum Rating2 {
	Yes = 'Yes',
	No = 'No',
}
