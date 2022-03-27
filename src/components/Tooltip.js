import { useState } from 'react';
import '../style/Tooltip.css';

const Tooltip = ( { children, disable, title, text } ) => {
	const [enable, setEnable] = useState(false);

    const handleMouseEnter = () =>{
    	setEnable(true)
    }

    const handleMouseLeave = () =>{
        setEnable(false);
    }
	return (
		enable && !disable  ?  
		<div 
			onMouseLeave={handleMouseLeave}
			style={{margin:0, padding:0}}>
		<div className='tooltip-container'>
			<h1>{ title }</h1>	
			<p>{ text }</p>
		</div>
		{children}
		</div>:<div onMouseEnter={handleMouseEnter} >{children}</div>
	);
}

export default Tooltip;
