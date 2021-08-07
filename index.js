import escapeStringRegexp from 'escape-string-regexp';
import mapping from './lib/mappings.js';

const hasFlags = (regexFlags, replaceFlags) => {
	if (!replaceFlags) {
		return true;
	}

	// Check if every flag in the replace flags is part of the original regex flags
	return replaceFlags.split('').every(flag => regexFlags.includes(flag));
};

export default function cleanRegexp(regexp, flags = '') {
	if (typeof regexp !== 'string') {
		throw new TypeError(`Expected regexp to be of type \`string\`, got \`${typeof regexp}\``);
	}

	if (typeof flags !== 'string') {
		throw new TypeError(`Expected flags to be of type \`string\`, got \`${typeof flags}\``);
	}

	for (const [key, replacement] of mapping) {
		if (hasFlags(flags, replacement.flags)) {
			regexp = regexp.replace(new RegExp(escapeStringRegexp(key), 'g'), replacement.value);
		}
	}

	return regexp;
}
