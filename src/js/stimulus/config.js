import { Application } from '@hotwired/stimulus';
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers';

const application = Application.start();

const startStimulus = (context) => {
  application.load(definitionsFromContext(context));
};

export default startStimulus;
