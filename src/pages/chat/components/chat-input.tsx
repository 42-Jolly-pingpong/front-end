import { Textarea } from 'flowbite-react';
import useFetch from 'hooks/use-fetch';
import { useEffect, useRef, useState } from 'react';
import { IoSend, IoSendOutline } from 'react-icons/io5';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from 'ts/states/chat-state';

export const ChatInput = () => {
	const [input, setInput] = useState<string>('');
	const [scrollbar, setSrollbar] = useState<string>('hide-scrollbar');
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const chat = useRecoilValue(chatState).chatRoom;
	const addChats = useSetRecoilState(chatState);
	const sendApi = useFetch();

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	}, [chat]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.style.height = '0px';
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = scrollHeight + 'px';
			setSrollbar(scrollHeight <= 88 ? 'hide-scrollbar' : '');
		}
	}, [textareaRef.current?.value]);

	const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const onClickSend = () => {
		if (chat) {
			(async () => {
				sendApi('POST', `/chat-rooms/${chat?.id}/chats`, {
					content: input.trim(),
				})
					.then((res) => res.json())
					.then((data) =>
						addChats((pre) => ({ ...pre, chats: [...pre.chats, data] }))
					)
					.catch((err) => console.log(err));
			})();
			setInput('');
		}
	};

	const sendButton = () => {
		if (input.trim().length === 0) {
			return (
				<button className='mx-3' disabled={chat === null}>
					<IoSendOutline />
				</button>
			);
		}
		return (
			<button className='mx-3' onClick={onClickSend}>
				<IoSend />
			</button>
		);
	};

	const onDownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (input.trim().length !== 0) {
				onClickSend();
			}
		}
	};

	return (
		<div className=''>
			<div className='flex mx-4 mb-3 bg-gray-100 border border-gray-300 rounded-lg items-center justify-stretch'>
				<Textarea
					disabled={chat === null}
					ref={textareaRef}
					rows={1}
					className={`bg-white my-2 ml-2 resize-none rounded-lg border border-gray-300 max-h-20 overflow-y-auto ${scrollbar} focus:ring-0 focus:border focus:border-gray-400`}
					value={input}
					onChange={onChangeInput}
					onKeyDown={onDownEnter}
					maxLength={4000}
				/>
				{sendButton()}
			</div>
		</div>
	);
};
