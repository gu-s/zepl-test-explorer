const toBtc = (satoshi) => {
    return satoshi / 100000000;
}

const toUSD = (satoshi) => {
    return satoshi / 100000000;//todo
}
const toEUR = (satoshi) => {
    return satoshi / 100000000;//todo
}

const converterTo = (satoshis, currency = "BTC") => {
    switch (currency) {
        case 'BTC':
            return toBtc(satoshis);
        case 'USD':
            return toBtc(satoshis);
        case 'EUR':
            return toBtc(satoshis);
    }


}

export default {converterTo};