import React, { useState } from 'react'
import apiBlockchain from '../../Services/apiBlockchain';


const SearchBar = ({onSearch}) => {

    // const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const textInput = e.target.textInput.value;
        // setSearchInput(textInput);
        searchTextInput(textInput);
    };

    const searchTextInput = async (textInput)=>{
        const res = await apiBlockchain.explore(textInput);
        if(res){
            // const data = await res.json();
            console.log("res", res);
            onSearch(res);
        }
    };

    return <>
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                name="textInput"
                className="form-control me-2"
                type="search"
                placeholder="Search for Hash,Transaction or address"
                aria-label="Search"
            />

            <button
                className="btn btn-outline-primary"
                type="submit">
                Search
            </button>
        </form>


    </>


};

export default SearchBar;