import { AcademicDetails } from "../interface";

export class User {
	id?: number;
	fullName?: string;
	email?: string;
	address?: string | null;
	mobile?: string | null;
	status?: string;
	userRoleId?: number;
	color?: string;
	profession?: string;
	academicsDetailId?: number;
	dob?: string | null;
	permission?: string;
	isVerified?: boolean;
	createdAt?: string;
	updatedAt?: string;
	academicDetails?: AcademicDetails;
	role?: string | null;

	constructor() {}
}
