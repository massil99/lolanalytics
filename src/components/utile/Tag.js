import { useEffect, useRef } from 'react';
import '../../style/Tag.css';

const Tag = ({ text, color, textColor }) => {
    const tag = useRef(null);
    useEffect(()=>{
        tag.current.style.backgroundColor = color || "#113";
        tag.current.style.color = textColor || "#fff";
    },[]);

    return (
        <div className='tag' ref={tag}>{text}</div>
    )
}

export default Tag;