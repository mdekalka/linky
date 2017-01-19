import React, { Component } from 'react';
import dateFormat from 'dateformat';

class CurrentTime extends Component {
    render() {
        const now = new Date();
        const { format } = this.props || 'fullDate';

        return <div>{dateFormat(now, format)}</div>
    }
}

export default CurrentTime;