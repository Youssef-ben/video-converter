import React from "react";

import ProgressBar from "./progress_bar.jsx";
import DetailsCard from "./details_card.jsx"

export default class DetailsSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show_progress: false,
      progress: 0,
      progress_message: 'Fetching...'
    };
  }

  startProcess = () => {
    let {progress} = this.state;
    this.setState({show_progress: true});

    let inter = setInterval(() => {

      this.setState({progress: ++progress});

      if (progress === 100){
        clearInterval(inter);
        this.props.cancel();
      }

    },200);
  }

  cancel = () => {
    (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);

    this.props.cancel();
  }

  render() {
    const {show_progress, progress, progress_message} = this.state;

    return (
      <section className="container section-converter mb-2">
        {show_progress &&
          <ProgressBar progress={progress} messageText={progress_message} />
        }

        <DetailsCard
          video_details={this.props.video_details}
          startProcess={this.startProcess}
          cancel={this.cancel}
        />
      </section>
    );
  }
}