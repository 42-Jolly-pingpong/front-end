import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const HistoryDoughnutChart = (props: {
	winCount: number;
	loseCount: number;
}) => {
	const { winCount, loseCount } = props;
	const winRate =
		winCount === 0 && loseCount === 0
			? (0.0).toFixed(1)
			: ((winCount / (winCount + loseCount)) * 100).toFixed(1);

	const data = {
		datasets: [
			{
				data: [winCount, loseCount],
				backgroundColor: ['rgba(253, 206, 2, 1)', 'rgba(229, 231, 235, 1)'],
			},
		],
	};

	const label = () => {
		const numberStyle = 'text-xs font-bold';
		const labelStyle = 'text-xs font-normal';

		return (
			<div className='flex'>
				<div className={`${numberStyle} mr-1`}>{winCount + loseCount}</div>
				<div className={`${labelStyle} mr-4`}>games</div>
				<div className={`${numberStyle} mr-1`}>{winCount}</div>
				<div className={`${labelStyle} mr-4`}>wins</div>
				<div className={`${numberStyle} mr-1`}>{loseCount}</div>
				<div className={`${labelStyle}`}>losses</div>
			</div>
		);
	};

	return (
		<div className='relative'>
			<div>
				<Doughnut
					data={data}
					width={180}
					height={180}
					options={{ maintainAspectRatio: false, cutout: 65 }}
				/>
			</div>
			<div className='absolute top-20 w-full flex items-center justify-center text-2xl font-bold'>
				{winRate}%
			</div>
			<div className='w-full mt-4 flex justify-center'>{label()}</div>
		</div>
	);
};

export default HistoryDoughnutChart;
