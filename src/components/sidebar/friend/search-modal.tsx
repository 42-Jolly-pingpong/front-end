const SearchModal = (props : {setState: React.Dispatch<React.SetStateAction<boolean>>}) => {
	//목록 가져오는 함수 받아오기.

	const onClickSearch = () => {
		//api
	}

	const onClickClear = () => {
		props.setState(false);
	}

	return (
		<div>
			<div className="flex">
				<input className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
					placeholder="추가할 친구의 닉네임을 입력하세요.">
				</input>
				<button onClick={onClickSearch}>🔎</button>
				<button onClick={onClickClear}>x</button>
			</div>
			<div className="h-full overflow-y-auto">
				{/*받아온 목록 map으로 띄우기*/}
			</div>
		</div>
	);
}

export default SearchModal