import { Grid } from "gridjs";
import { useEffect, useRef } from "react";
import React from "react";
import "gridjs/dist/theme/mermaid.css";

const generateColumn = (data) =>{
  let result = [];
  let keys = Object.keys(data[0]);
  for(let i = 0; i< keys.length;i++){
    result.push({id:keys[i], name:keys[i]});
  }
  console.log(result);
  return result;

}

function Table (props) {
  const wrapperRef = useRef(null);

  const grid = new Grid({
    columns: generateColumn(props.data),
    search: true,
    // fixedHeader: true,
    // height:'200px',
    sort: true,
    data: props.data
  });
  
  useEffect(() => {
    console.log(props.data);
    grid.render(wrapperRef.current);
  },[]);
  
  return <div ref={wrapperRef} />;
}

export default Table