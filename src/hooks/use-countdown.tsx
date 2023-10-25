import { useEffect, useRef } from 'react';

/**
 *
 * Countdown 컴포넌트는 기다릴 시간(value)동안 주어진 간격(interval) 으로 카운트다운을 진행합니다.
 * 카운트 할 때마다 'onTick' 콜백 함수를 호출하여, 현재 카운트 값을 전달합니다.
 * 지정된 시간 이후에는 'end' 콜백 함수를 호출합니다.
 *
 * 	@param {number} value - 카운트다운 시간(초).
 * 	@param {number} interval - 카운트다운 간격(밀리초).
 * 	@param {Function} onTick - 각 카운트다운 단계에서 호출되는 콜백 함수. 현재 카운트 값이 전달됩니다.
 * 	@param {Function} end - 카운트다운이 끝났을 때 호출되는 콜백 함수.
 *
 */

interface CountdownProps {
	value: number;
	interval: number;
	end: () => void;
	onTick: (value: number) => void;
}

const useCountdown: React.FC<CountdownProps> = ({
	value,
	interval,
	onTick,
	end,
}) => {
	const countRef = useRef(value);

	useEffect(() => {
		const timer = setInterval(() => {
			countRef.current -= 1;
			const newCount = countRef.current;

			if (newCount < 0) {
				clearInterval(timer);
				end();
			}
			onTick(newCount);
			return newCount;
		}, interval);
		return () => clearInterval(timer);
	}, [interval, end, onTick]);
	return null;
};

export default useCountdown;
