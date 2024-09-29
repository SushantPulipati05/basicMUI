import React, { useEffect, useState } from 'react'
import axios from 'axios';


function DataDisplay() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        })
    },[]);

    if(loading){
        return (
            <div>Loading....</div>
        )
    }
    if(error){
        return(
            <div>{error}</div>
        )
    }
  return (
    <div>
        <h1>Data from JSON</h1>
        <ul>
            {data.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    </div>
);
}

export default DataDisplay