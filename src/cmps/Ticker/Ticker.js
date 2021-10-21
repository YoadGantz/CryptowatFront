import React from 'react'
import './Ticker.css'
export default function Ticker(props) {
    let { ticker } = props
    return (
        <div className="ticker">
            {parseFloat(ticker[0]).toFixed(1)} USD
        </div>
    )
}
