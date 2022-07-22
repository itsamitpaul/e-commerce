import React from 'react';
import {PulseLoader} from "react-spinners";

const Spinner = (props)=>{
    return(
        <PulseLoader loading={props.showLoader}/>
    );
}

export default Spinner;