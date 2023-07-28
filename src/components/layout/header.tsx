import HeaderTitle from "./header-title"

const Header = () => {
	return (
		<header className="flex justify-between items-center bg-gray-100 border-b-2 border-gray-200" style={{height: "10%", padding: "1%"}}>
			<div className="flex max-h-full aspect-square h-max">
				<a href="">
					<img src="images/logo2.png" className="flex max-h-full" />
				</a>
			</div>
			<HeaderTitle />
			<div className="avatar online flex max-h-full aspect-square h-max">
					<div className="rounded-full">
						<a href="">
							<img src="https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000" />
						</a>
					</div>
			</div>
		</header>
	)
}

/* md:h-32 2xl:h-48 */ 
export default Header