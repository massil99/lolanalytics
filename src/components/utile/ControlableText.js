
const ControlableText = ({text, length}) => {
    const sub = text.length > length ? text.substr(0, length)+'...': text;
    return (
        <p>{sub}</p>
    )
}

export default ControlableText;