import { GameMode } from 'ts/enums/game/game-mode.enum';

interface GameOptionControl {
	isOpen: boolean;
	onClose: () => void;
	onMatch: (mode: GameMode) => void;
}

export default GameOptionControl;
