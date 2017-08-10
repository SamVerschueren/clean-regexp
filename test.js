import test from 'ava';
import m from '.';

function macro(t, regex, flags, expected) {
	if (!expected) {
		expected = flags;
		flags = '';
	}

	t.is(m(regex, flags), expected);
}

macro.title = (providedTitle, regex, flags, expected) => {
	if (!expected) {
		expected = flags;
		flags = '';
	}

	return `/${regex}/${flags} => /${expected}/${flags}`;
};

test(macro, '[0-9]', '\\d');
test(macro, '[0-9]', 'ig', '\\d');
test(macro, '[^0-9]', '\\D');
test(macro, '[a-zA-Z0-9_]', '\\w');
test(macro, '[a-zA-Z0-9_]', 'i', '\\w');
test(macro, '[a-zA-Z\\d_]', '\\w');
test(macro, '[A-Za-z0-9_]', '\\w');
test(macro, '[A-Za-z\\d_]', '\\w');
test(macro, '[a-z0-9_]', 'i', '\\w');
test(macro, '[a-z0-9_]', 'ig', '\\w');
test(macro, '[a-z\\d_]', 'i', '\\w');
test(macro, '[^a-zA-Z0-9_]', '\\W');
test(macro, '[^A-Za-z0-9_]', '\\W');
test(macro, '[^a-zA-Z\\d_]', '\\W');
test(macro, '[^A-Za-z\\d_]', '\\W');
test(macro, '[^a-z0-9_]', 'i', '\\W');
test(macro, '[^a-z0-9_]', 'g', '[^a-z0-9_]');
test(macro, '[^a-z\\d_]', 'i', '\\W');
test(macro, '[a-zA-Z0-9]', '[a-zA-Z0-9]');
test(macro, '[0-9]+\\.[^0-9]?\\.[a-zA-Z0-9_]+', '\\d+\\.\\D?\\.\\w+');
test(macro, '[0-9]+\\.[^0-9]?\\.[a-zA-Z0-9_]+\\.[^a-z0-9_]', 'i', '\\d+\\.\\D?\\.\\w+\\.\\W');
test(macro, '[0-9]+\\.[^0-9]?\\.[a-zA-Z0-9_]+\\.[^a-z0-9_]', 'g', '\\d+\\.\\D?\\.\\w+\\.[^a-z0-9_]');

test('error', t => {
	t.throws(() => m(98), 'Expected regexp to be of type `string`, got `number`');
	t.throws(() => m('[0-9]', {}), 'Expected flags to be of type `string`, got `object`');
});
