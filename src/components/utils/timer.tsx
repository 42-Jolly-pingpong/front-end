import { useEffect, useState } from 'react';

interface TimerProps {
	min: number;
	sec: number;
}

const Timer: React.FC<TimerProps> = ({ min, sec }) => {
	const [minutes, setMinutes] = useState(min);
	const [seconds, setSeconds] = useState(sec);

	useEffect(() => {
		const countdown = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(countdown);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => clearInterval(countdown);
	}, [minutes, seconds]);

	return (
		<div>
			{minutes} : {seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
};

export default Timer;
