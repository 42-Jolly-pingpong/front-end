const Header = () => {
	return (
		<header className="flex justify-between items-center bg-gray-200 border-b-2 border-gray-300" style={{height: "10%", padding: "1.5%"}}>
			<div className="flex max-h-full h-16">
				<a href="">
					<img src="images/logo2.png" className="flex max-h-full" />
				</a>
			</div>
			<div className="flex" style={{ fontSize: "3.5vw"}}>
				<a href="">
					Jolly Ping Pong!
				</a>
			</div>
			<div className="avatar online flex max-h-full aspect-square h-20">
					<div className="flex rounded-full">
						<a href="">
							<img className="flex" src="https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000" />
						</a>
					</div>
			</div>
		</header>
	)
}

/* md:h-32 2xl:h-48 */ 
export default Header