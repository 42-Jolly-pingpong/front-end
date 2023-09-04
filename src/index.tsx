import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/default.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
