const FormattedDate = (props: { date: Date; hasYear: boolean }) => {
	const { date, hasYear } = props;

	const month = date.getMonth() + 1;
	const day = date.getDate();

	const formattedYear = date.getFullYear();
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;

	const formattedDate = hasYear
		? `${formattedYear}년 ${formattedMonth}월 ${formattedDay}일`
		: `${formattedMonth}월 ${formattedDay}일`;

	return <div>{formattedDate}</div>;
};

export default FormattedDate;
