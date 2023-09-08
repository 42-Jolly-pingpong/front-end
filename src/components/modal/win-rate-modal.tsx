import React, { useState } from 'react';
import XButton from 'components/button/x-button';
import BackDrop from 'components/modal/utils/backdrop';
import { User } from 'ts/interfaces/user.model';
import userData from 'ts/mock/user-data';
import winRateData from 'ts/mock/win-rate-data';
import ProfileBadge from 'pages/profile/components/profile-badge';
import GetUserInfo from 'components/services/getUserInfo';

interface winRateResultProps {
	win_rate: number;
}

const WinRateTitle = () => {
	return (
		<div
			className='font-bold text-lg text-center mb-2'
			style={{ fontSize: '24px' }}
		>
			🏆 Win-Rate 🏆
		</div>
	);
};

// recoil로 내 win-rate 가져오기
const WinRateResult: React.FC<winRateResultProps> = ({ win_rate }) => {
	return (
		<div className='flex flex-col justify-center items-center mt-1'>
			<div className='text-xl flex justify-center mb-2'>{`승률 : ${win_rate}%`}</div>
			<progress
				className='progress flex justify-between items-center w-2/3 h-5'
				value={`${win_rate}`}
				max='100'
			/>
		</div>
	);
};

// back-end API : recoil로 user정보가져오기

// back-end API : user와 관련된 승률 데이터 리스트 받아오는 함수
const getWinRateList = () => {
	return winRateData;
};

// back-end API : select * from user where userIdx===item.userIdx
const getUser = (userIdx: number) => {
	return userData[userIdx];
};

const getUserNickName = (userIdx: number) => {
	return userData[userIdx].nickname;
};

const WinRateData = () => {
	const [user, setUser] = useState(GetUserInfo(1));
	const myWinRate = getWinRateList();

	if (user == null) return <div>여긴 나오면 안되는 페이지</div>;
	return (
		<div className='py-4 border-solid border-t-2'>
			<WinRateResult
				win_rate={user.winCount / (user.winCount + user.loseCount)}
			/>
			{myWinRate.map((item, index) => (
				<div className='flex flex-col w-full border-opacity-50' key={index}>
					<div className='divider mb-0' />
					<div className='flex  justify-center items-center text-3xl'>
						{item.winPlayerIdx == user.idx ? 'Win' : 'Lose'}
					</div>
					<div className='flex justify-between items-center px-2'>
						<div className='flex flex-col justify-center items-center w-1/6 bg-green-300 h-28 rounded-br-box'>
							<ProfileBadge {...getUser(item.winPlayerIdx)} />
							<div className='mt-2'>{getUserNickName(item.winPlayerIdx)}</div>
						</div>

						<div className='flex justify-between items-center h-20 bg-base-300 rounded-box w-1/2 px-6'>
							<div className='border-solid border-2 w-10 h-10 flex justify-center items-center text-2xl'>
								{item.winScore}
							</div>
							<div className='flex-col text-center text-xl'>
								<div>{item.playDate.toLocaleDateString()}</div>
								<div>{`Play Time : ${item.playTime} sec`}</div>
							</div>
							<div className='border-solid border-2 w-10 h-10 flex justify-center items-center text-2xl'>
								{item.loseScore}
							</div>
						</div>
						<div className='flex flex-col justify-center items-center w-1/6 bg-red-300 h-28 rounded-br-box'>
							<ProfileBadge {...getUser(item.losePlayerIdx)} />
							<div className='mt-2'>{getUserNickName(item.losePlayerIdx)}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const WinRateModal = () => {
	return (
		<dialog id='winRateModal' className='modal'>
			<form
				method='dialog'
				className='modal-box'
				style={{
					maxWidth: 'none',
					minHeight: '70%',
				}}
			>
				<XButton />
				<WinRateTitle />
				<WinRateData />
			</form>
			<BackDrop />
		</dialog>
	);
};

export default WinRateModal;
