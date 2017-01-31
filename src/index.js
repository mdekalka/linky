import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

// thirdparty css
import './assets/css/thirdparty/normalize.css';
import './assets/css/thirdparty/skeleton.css';
import './assets/css/thirdparty/font-awesome.css';
import './assets/css/thirdparty/prism.css';
// editors theme
import './assets/css/code-mirror/code-mirror.css';
import './assets/css/code-mirror/monokai.css';
// UI styles
import './assets/css/forms.css';
import './assets/css/buttons.css';
import './assets/css/scroll.css';
// global
import './index.css';
import routes from './config/routes';

window.Perf = Perf;

ReactDOM.render(routes, document.getElementById('root'));
