import { Sidebar } from 'flowbite-react';
import CreateDm from 'pages/chat/components/list/create-dm';
import DmItem from 'pages/chat/components/list/dm-item';
import { dmList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const Dms = () => {
	const [dms, setDms] = useState<Dm[]>();
	const chat = useRecoilValue(chatState);

	useEffect(() => {
		//get dm list
		const sortedList = dmList.sort(
			(a, b) => a.updatedTime.getTime() - b.updatedTime.getTime()
		);

		setDms(sortedList);
	}, []);

	return (
		<Sidebar.Collapse label='다이렉트 메시지'>
			{dms?.map((dm, id) => (
				<DmItem key={id} dm={dm} isSelected={chat?.id === dm.id} />
			))}
			<CreateDm />
		</Sidebar.Collapse>
	);
};

export default Dms;
