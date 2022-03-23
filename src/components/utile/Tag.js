import { useEffect, useRef } from 'react';
import '../../style/Tag.css';

const Tag = ({ text, color, textColor }) => {
    const tag = useRef(null);
    useEffect(()=>{
        tag.current.style.backgroundColor = color ;
        tag.current.style.color = textColor;
    },[]);

    return (
        <div className='tag' ref={tag}>{text}</div>
    )
}

export default Tag;