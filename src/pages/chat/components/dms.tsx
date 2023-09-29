import { Sidebar } from 'flowbite-react';
import DmItem from 'pages/chat/components/dm-item';
import CreateDm from 'pages/chat/components/create-dm';
import { dmList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { Dm } from 'ts/interfaces/dm.model';

const Dms = () => {
	const [dms, setDms] = useState<Dm[]>();

	useEffect(() => {
		//get dm list
		const sortedList = dmList.sort(
			(a, b) => a.updatedTime.getTime() - b.updatedTime.getTime()
		);

		setDms(sortedList);
	}, []);

	return (
		<Sidebar.Collapse label='다이렉트 메시지'>
			{dms?.map((dm, id) => <DmItem key={id} dm={dm} />)}
			<CreateDm />
		</Sidebar.Collapse>
	);
};

export default Dms;
