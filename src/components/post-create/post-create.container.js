import React, { Component } from 'react';
import CurrentTime from '../time/current-time.container';

class NewPost extends Component {

    render() {
        return (
            <div className="new-post-container">
                <h4>Create new code snippet</h4>
                <form className="form">
                    <div className="form-group">
                        <label className="form-label">Title*:</label>
                        <input type="text" ref={(node) => this.title = node} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description*:</label>
                        <input type="text" ref={(node) => this.title = node} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tags*:</label>
                        <input type="text" ref={(node) => this.title = node} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Code*:</label>
                        <textarea type="text" ref={(node) => this.title = node} ></textarea>
                    </div>
                    <CurrentTime />
                    <div className="btn-group">
                        <button className="btn btn-apply">Create</button>
                        <button className="btn btn-primary">Return to</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPost;