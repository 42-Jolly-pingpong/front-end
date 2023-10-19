const formattedDate = (date: Date, hasYear: boolean) => {
	const dateObj = new Date(date);
	const month = dateObj.getMonth() + 1;
	const day = dateObj.getDate();

	const formattedYear = dateObj.getFullYear();
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;

	const formattedDate = hasYear
		? `${formattedYear}년 ${formattedMonth}월 ${formattedDay}일`
		: `${formattedMonth}월 ${formattedDay}일`;

	return formattedDate;
};

export default formattedDate;
