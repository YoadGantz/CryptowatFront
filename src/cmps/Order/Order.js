import React from 'react'
import './Order.css'

export default function Order(props) {
    function markHovers() {
        console.log(props.idx);
        let markedRows = document.querySelectorAll('.hovered')
        markedRows.forEach(markedRow => {
            markedRow.classList.remove('hovered')
        })

        let rows = document.querySelectorAll(`[data-idx="${props.idx}"]`)
        rows.forEach(row => {
            row.classList.add('hovered')
        })
    }
    let { order, isBid, idx } = props
    console.log(order);
    let order1 = parseFloat(order[0]).toFixed(1) + ''
    let order2 = parseFloat(order[1]).toFixed(8) + ''
    let order3 = parseFloat(order[2]).toFixed(8) + ''
    return (
        <div
            className="row flex"
            data-idx={idx}
            onMouseEnter={() => markHovers()}>
            {order &&
                <div className={`short-${isBid ? 'bid' : 'ask'}`}>
                    <span className={`${isBid ? 'bid' : 'ask'}-weak`}>{order1.substring(0, order[3])}</span>
                    <span>{order1.substring(order[3])}</span>
                </div>}
            {order && <div> <span>{order2.substring(0, 2)}</span><span className="weak">{order2.substring(2)}</span></div>}
            {order && <div> <span className="weak">{order3.substring(0, 2)}</span><span >{order3.substring(2)}</span></div>}
        </div >
    )
}
