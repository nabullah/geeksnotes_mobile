export enum HTTP_ERROR_CODE {
	Unknown = 0,
	OK = 200,
	CREATED = 201,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	UnprocessableEntity = 422,
	InternalServerError = 500,
	GatewayTimeout = 504,
}
