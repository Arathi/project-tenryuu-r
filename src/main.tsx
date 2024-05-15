import ReactDOM from 'react-dom/client';
import UserScriptApp from './UserScriptApp';

const container = document.createElement('div');
container.id = 'old-driver-helper-root';
document.body.append(container);

ReactDOM.createRoot(container).render(<UserScriptApp />);
