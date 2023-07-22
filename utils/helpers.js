import createHttpError from 'http-errors';

// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
export function getIdParam(req) {
	const { id } = req.params;
	if (req.body?.id) {
		throw createHttpError.BadRequest(`Body must not contain id.`);
	}
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw createHttpError.BadRequest(`Invalid ':id' param: '${id}'`);
}
