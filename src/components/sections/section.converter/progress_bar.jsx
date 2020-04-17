import React, {Component} from 'react';

export default class ProgressBar extends Component {
    render() {
        let percentComplete = `${this.props.progress}%`;
        let messageToShow = `${this.props.messageText}`;
        const font_color = this.props.progress > 95 ? "#F6F0E9 !important" : "#68717a !important";

        return (
            <div>
                <div className="progress">
                    <div className="progress__bar btn-primary" style={{width: percentComplete}} />
                </div>
                <div className="center mb-2">
                    <div className="progress__percentage" style={{color: font_color}}>
                        {percentComplete}
                    </div>
                    <span className="progress__info">{messageToShow}</span>
                </div>
            </div>
        );
    }
}
