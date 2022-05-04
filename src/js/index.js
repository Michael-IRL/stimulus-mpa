import '../css/index.css';
import log from './components/log';
import startStimulus from './stimulus/config';
startStimulus(require.context('./controllers', true, /\.js$/));
log();
