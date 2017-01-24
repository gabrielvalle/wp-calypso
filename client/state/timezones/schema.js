
export const timezonesSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		manual_utc_offsets: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					label: { type: 'string' },
					value: { type: 'string' }
				}
			}
		},

		timezones_by_continent: {
			type: 'object',
			patternProperties: {
				'^[a-z]{2}$': {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							label: { type: 'string' },
							value: { type: 'string' }
						}
					}
				}
			}
		}
	}
};
