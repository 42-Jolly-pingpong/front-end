import { Tooltip } from 'flowbite-react';
import formattedDate from 'pages/chat/components/formatted-date';

const ChatTime = (props: { time: Date }) => {
	const { time } = props;

	const date = () => {
		return formattedDate(time, time.getFullYear() !== new Date().getFullYear());
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
			<div className='text-gray-500 text-xs font-light'>{sentTime()}</div>
		</Tooltip>
	);
};

export default ChatTime;
