import ReactDOM from 'react-dom/client';
import UserScriptApp from './UserScriptApp';
import { Provider } from 'jotai';

const container = (() => {
  const root = document.createElement('div');
  root.id = 'old-driver-helper-root';
  document.body.append(root);
  return root;
})();

ReactDOM.createRoot(container).render(
  <Provider>
    <UserScriptApp />
  </Provider>,
);
