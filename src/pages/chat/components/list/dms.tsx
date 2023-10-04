import { Sidebar } from 'flowbite-react';
import CreateDm from 'pages/chat/components/list/create-dm';
import DmItem from 'pages/chat/components/list/dm-item';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Dm } from 'ts/interfaces/dm.model';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const Dms = () => {
	const [dms, setDms] = useState<Dm[]>();
	const dmList = useRecoilValue(chatListState).dmList;
	const chat = useRecoilValue(chatState);

	useEffect(() => {
		const list = [...dmList];
		setDms(
			list.sort((a, b) => b.updatedTime.getTime() - a.updatedTime.getTime())
		);
	}, [dmList]);

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
