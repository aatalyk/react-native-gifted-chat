import moment from 'moment';

const DEPRECATION_MESSAGE =
	'isSameUser and isSameDay should be imported from the utils module instead of using the props functions';

export function isSameDay(currentMessage = {}, diffMessage = {}) {
	if (!diffMessage.createdAt) {
		return false;
	}

	const currentCreatedAt = moment(currentMessage.createdAt);
	const diffCreatedAt = moment(diffMessage.createdAt);

	if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
		return false;
	}

	return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
	return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
}

export function warnDeprecated(fn) {
	return (...args) => {
		// eslint-disable-next-line
		console.warn(DEPRECATION_MESSAGE);
		return fn(...args);
	};
}

export function formatDate(date, lang = 'rus') {
	const monthNames = {
		kaz: [
			'Қаңтар',
			'Ақпан',
			'Наурыз',
			'Сәуір',
			'Мамыр',
			'Маусым',
			'Шілде',
			'Тамыз',
			'Қыркүйек',
			'Қазан',
			'Қараша',
			'Желтоқсан'
		],
		rus: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь'
		]
	};
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' ' + monthNames[lang][monthIndex] + ' ' + year;
}
