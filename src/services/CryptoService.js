import HttpService from "./HttpService"

function getOrders() {
    return HttpService.get('Order')
}

function getTicker() {
    return HttpService.get('Ticker')
}
export default {
    getOrders,
    getTicker
}