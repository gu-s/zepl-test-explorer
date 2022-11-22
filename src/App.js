import logo from './logo.svg';
import './App.scss';
import SearchBar from './Components/SearchBar/searchBar';
import AddressDetail from './Components/AddressDetail/addressDetail';
import TransactionDetail from './Components/TransactionDetail/transactionDetail';
import React, { useState, useEffect } from 'react'
import apiBlockchain from './Services/apiBlockchain';



const App = ()=>{

  const [currency, setCurrency] = useState('BTC');
  const [addressShow, setAddressShow] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [transactionShow, setTransactionShow] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [addressesSubscribed, setAddressesSubscribed] = useState([]);

  //TODO manage
  // useEffect(() => {
  //   localStorage.setItem('addressesSubscribed', JSON.stringify(addressesSubscribed));
  // }, []);

  //
  const onSearch = (searchData)=>{
    if(searchData.type == 'address'){
      setAddressShow(true);
      setAddressData(searchData.data);
    }
    else if(searchData.type == 'transaction'){
      setTransactionShow(true);
      setTransactionData(searchData.data);
    }
  }
  const subscribeTransaction=(txs)=>{
    console.log("subscribe:",txs);

  }

  const subscribeAddress=(address)=>{
    console.log("subscribe:",address);



    if(!addressesSubscribed.includes(address)){
      setAddressesSubscribed([...addressesSubscribed, address]);
      apiBlockchain.subscribeAddressWS(address);
    }

    // let addressesSubscribed = JSON.parse(localStorage.getItem('addressesSubscribed'));
    // if (!addressesSubscribed) {
    //   addressesSubscribed = [];
    // }
    // if(!addressesSubscribed.includes(address)){
    //   addressesSubscribed = [...addressesSubscribed, address]
    //   setAddressesSubscribed(addressesSubscribed);
    //   localStorage.setItem('addressesSubscribed', JSON.stringify(addressesSubscribed));

    //   apiBlockchain.subscribeAddressWS(address);
    // }
  }

  return (
    <div className="App">
      <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
          <span className="fs-4">Zeply Test</span>
        </a>
      </header>
      <main>
        <div className="container">
          <h1>Explorer</h1>
          <SearchBar onSearch={onSearch}></SearchBar>
          <AddressDetail show={addressShow} 
          addressData={addressData} 
          onSubscribe={(address)=>subscribeAddress(address)}
          onHide={() => setAddressShow(false)} ></AddressDetail>

        <TransactionDetail show={transactionShow} 
          transactionData={transactionData} 
          onSubscribe={(transaction)=>subscribeTransaction(transaction)}
          onHide={() => setTransactionShow(false)} ></TransactionDetail>

        </div>
      </main>
    </div>
  );
}

export default App;
