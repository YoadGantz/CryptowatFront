import React, { Component } from 'react'
import uniqid from 'uniqid'

import CryptoService from '../services/CryptoService'

import Order from '../cmps/Order/Order'
import Ticker from '../cmps/Ticker/Ticker'
import './OrderBook.css'

export default class OrderBook extends Component {
    state = {
        asks: [],
        bids: [],
        ticker: [],
        intervalId: 0
    }
    getData = async (intervalId = 0) => {
        let ticker = await CryptoService.getTicker()
        let orders = await CryptoService.getOrders()
        console.log(orders);
        let asks = this.formatData(orders.result.XXBTZUSD.asks)
        let bids = this.formatData(orders.result.XXBTZUSD.bids)
        this.setState({ asks: asks, bids: bids, ticker: ticker.result.XXBTZUSD.b, intervalId })

    }
    componentDidMount() {
        this.getData()
        let intervalId = setInterval(async () => {
            this.getData(intervalId)
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    findFirstDiffPos = (str1, str2) => {
        let shorterLength = Math.min(str1.length, str2.length);

        for (let i = 0; i < shorterLength; i++) {
            if (str1[i] !== str2[i]) return i;
        }

        if (str1.length !== str2.length) return shorterLength;

        return -1;
    }

    formatData = (items) => {
        items.forEach((item, i) => {
            if (i === 0) {
                console.log('first val', item);
                item[2] = item[1]
                item[3] = 0
            }
            else {
                console.log('middle', items[i][1], 'right', items[i - 1][2]);
                item[2] = (parseFloat(items[i][1]) + parseFloat(items[i - 1][2]))
                item[3] = this.findFirstDiffPos(items[i][0], items[i - 1][0])
            }
        })
        return items
    }
    render() {
        let { asks, bids, ticker } = this.state
        console.log(this.state.asks);
        return (
            <div className="container">
                <div className="flex reverse-column">
                    {asks.map((ask, idx) => {
                        return <Order key={uniqid()} order={ask} isBid={false} idx={idx} />
                    })}
                </div>
                {ticker.length > 0 && <Ticker ticker={ticker} />}
                < div className="flex column">
                    {bids.map((bid, idx) => {
                        return <Order key={uniqid()} order={bid} isBid={true} idx={idx} />

                    })}
                </div>
            </div >
        )
    }
}
