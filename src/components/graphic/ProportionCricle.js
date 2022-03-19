import { useRef, useEffect } from 'react';

const ProportionCircle = ({text, percentage, width, height, color}) =>{
    console.log(percentage);
    const canvasRef = useRef(null);
    const text_ = text || '';
    const width_ = width || 0;
    const height_ = height || 0;
    const color_ = color || 'black';
    const percentage_ = percentage || 0;
    const weight_ = Math.floor(width/15);
    const textSize_ = Math.floor(width/5);
    const draw = ctx => {
       ctx.strokeStyle = 'grey';
       ctx.beginPath()
       ctx.lineWidth = weight_;
       ctx.arc(width_/2, height_/2, width_/2 - weight_, 0,2*Math.PI);
       ctx.stroke();
       ctx.strokeStyle = color_;
       ctx.beginPath()
       ctx.lineWidth = weight_;
       ctx.arc(width_/2, height_/2,  width_/2 - weight_, Math.PI*3/2, percentage_*2*Math.PI - (Math.PI/2));
       ctx.stroke();
       ctx.fillStyle = color_;
       ctx.font = textSize_+'px sans-serif';
       ctx.textAlign = 'center';
       ctx.fillText(text_, width_/2, height_/2 + textSize_/2);
       //ctx.clearRect(0, 0, width_, height_);
    }

    useEffect(() => {
       const canvas = canvasRef.current
       const context = canvas.getContext('2d')
    
       draw(context)
    }, [draw])
    if(percentage_ < 0 || percentage_ > 100)
        return '';
    return(
        <canvas ref={canvasRef} width={width_} height={height_}/>
    );
}

export default ProportionCircle;