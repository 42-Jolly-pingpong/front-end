import HistoryDoughnutChart from 'pages/chat/components/sidebar/history-doughnut-chart';
import { useRecoilValue } from 'recoil';
import User from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const HistoryField = () => {
	const otherUser = useRecoilValue(chatSidebarState).profile as User;

	return (
		<div className='my-4'>
			<div className='mx-4'>
				<div className='font-bold text-sm'>전적 정보</div>
				<HistoryDoughnutChart
					winCount={otherUser.winCount}
					loseCount={otherUser.loseCount}
				/>
			</div>
		</div>
	);
};

export default HistoryField;
