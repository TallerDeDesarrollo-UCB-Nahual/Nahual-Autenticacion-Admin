import React, { Component } from 'react'
import './style.css'
export class Error extends Component {
    render() {
        return (
            <div className="app">
                <span>403</span>
                <span className="txt">
                    Prohibido<span className="blink">_</span>
                </span>
            </div>
        )
    }
}

export default Error
