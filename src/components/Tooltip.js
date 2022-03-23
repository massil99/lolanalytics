import '../style/Tooltip.css';

const Tooltip = ( { title, text } ) => {
	return (
		<div className='tooltip-container'>
			<h1>{ title }</h1>	
			<p>{ text }</p>
		</div>
	);
}

export default Tooltip;
