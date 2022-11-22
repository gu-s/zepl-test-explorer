const NETWORK = "main"; //main - test test3
const ENDPOINT_API = 'https://api.blockcypher.com/v1/btc'; 
const TOKEN = '94d744f188584f2c9823cc3d800879e6';
const searchByAddress = (searchInput)=>{
    try {
        return fetch(`${ENDPOINT_API}/${NETWORK}/addrs/${searchInput}/balance`);//unspentOnly=true
    } catch (error) {
        console.log("addr error", error)
        throw error;
    }
}

const searchByTransactionHash = (searchInput)=>{
    return fetch(`${ENDPOINT_API}/${NETWORK}/txs/${searchInput}`);
}


const explore = async (searchInput) => {
    let toret = null;
    let resultAddress = await searchByAddress(searchInput);

    if (!resultAddress.ok) {
        let errorApi  = await resultAddress.json();
        console.log("wrong address", errorApi.error);
        let resultTxs = await searchByTransactionHash(searchInput);
        toret = {
            'type' : 'transaction',
            'data' : await resultTxs.json(),
        };
        
    }
    else{
        toret = {
            'type' : 'address',
            'data' : await resultAddress.json(),
        };
    }


    return toret

}

const listenAddress = (address) =>{

    // Get latest unconfirmed transactions live
    let ws = new WebSocket(`wss://socket.blockcypher.com/v1/btc/${NETWORK}?token=${TOKEN}`);
    let count = 0;
    ws.onmessage = function (event) {
        let tx = JSON.parse(event.data);
        if (!!tx.hash) {
            let shortHash = tx.hash.substring(0, 6) + "...";
            let total = tx.total / 100000000;
            let addrs = tx.addresses.join(", ");
            console.log("<div>Unconfirmed transaction " + shortHash + " totalling " + total + "BTC involving addresses " + addrs + "</div>");


        }
        count++;
        if (count > 30) ws.close();
    }
    ws.onopen = function (event) {
        ws.send(JSON.stringify({ event: "confirmed-tx", address: address }));
        ws.send(JSON.stringify({ event: "unconfirmed-tx", address: address }));
    }

    const ping=()=>{
        ws.send(JSON.stringify({ event: "ping" }))
    };

    let myVar = setInterval(function(){ping()}, 20000);

}

const subscribeAddressWS=(address)=>{
    // Get latest unconfirmed transactions live
    let ws = new WebSocket(`wss://ws.blockchain.info/inv`);
    let count = 0;
    ws.onmessage = function (event) {
        console.log("onmessage event:",event);
        alert(event);
        let tx = JSON.parse(event.data);
        if (!!tx.x) {

            tx.x.out.forEach((outItem)=>{
                console.log("outItem", outItem);
                alert(outItem);
            });


        }
        count++;
        if (count > 30) {
            ws.send(JSON.stringify({ op: "addr_unsub", addr: address }));
            ws.close();
        }
    }
    ws.onopen = function (event) {
        // ws.send(JSON.stringify({ event: "confirmed-tx", address: address }));
        // ws.send(JSON.stringify({ event: "unconfirmed-tx", address: address }));
        ws.send(JSON.stringify({ op: "addr_sub", addr: address }));
    }

    const ping=()=>{
        ws.send(JSON.stringify({ op: "ping" }))
    };

    let myVar = setInterval(function(){ping()}, 20000);

}

export default {explore, listenAddress, subscribeAddressWS};