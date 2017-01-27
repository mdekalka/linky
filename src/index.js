import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf'
import './assets/normalize.css';
import './assets/skeleton.css';
import './assets/font-awesome.css';
import './assets/forms.css';
import './assets/code-mirror/code-mirror.css';
import './assets/code-mirror/monokai.css';
import './assets/buttons.css';
import './assets/scroll.css';
import './assets/prism.css';
import './index.css';
import routes from './config/routes';

window.Perf = Perf;

ReactDOM.render(routes, document.getElementById('root'));
