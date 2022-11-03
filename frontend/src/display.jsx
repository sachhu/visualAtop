import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
import Table from './table';

function Display() {
    const [commanData, setCommandData] = useState({});
    const [mainData, setMainData] = useState([]);

    // useEffect(()=>{

    // },[mainData,commanData]);

    const getData = async () =>{
        let url = 'http://127.0.0.1:3000/api/runatop';
        const res = await fetch(url);
        const json = await res.json();
        setMainData(json.mainInfo);
        console.log(json);
    }

    return (
        <div className="Display">
            {mainData.length>0? <Table data={mainData}/>:<></>}
            <button className="Run" onClick={()=>{getData()}}>Run</button>
        </div>
    )
}

export default Display
