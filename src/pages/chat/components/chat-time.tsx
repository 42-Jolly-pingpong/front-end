import { Tooltip } from 'flowbite-react';

const ChatTime = (props: { time: Date }) => {
	const { time } = props;

	const date = () => {
		const formattedYear =
			time.getFullYear() === new Date().getFullYear()
				? ''
				: `${time.getFullYear()}년 `;
		const month = time.getMonth() + 1;
		const day = time.getDate();

		const formattedMonth = month < 10 ? `0${month}` : month;
		const formattedDay = day < 10 ? `0${day}` : day;

		const formattedDate = `${formattedYear}${formattedMonth}월 ${formattedDay}일`;

		return formattedDate;
	};

	const sentTime = () => {
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const meridiem = hours < 12 ? '오전' : '오후';
		const formattedHours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

		const formattedTime = `${meridiem} ${formattedHours}:${formattedMinutes}`;
		return formattedTime;
	};

	return (
		<Tooltip content={date()} animation='duration-300'>
			<div className='text-gray-500 text-sm font-light'>{sentTime()}</div>
		</Tooltip>
	);
};

export default ChatTime;
