const { useState } = require("react");

const theme = ['dracula', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night'];


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [haveText, setHaveText] = useState("")

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleText = (ev) => {
        setHaveText(ev.currentTarget.textContent)
    }

    return (
        <div
            className={isOpen ? "dropdown active" : "dropdown"}
            onClick={handleClick} >
            <div className="dropdown__text">
                {!haveText ? "Select Theme" : haveText}
            </div>
            <div className="dropdown__items">
                {theme.map((item) => (
                    <div
                        onClick={handleText}
                        className="dropdown__item"
                        key={item.toString()}>
                        {item}
                    </div>
                ))
                } </div>
        </div>
    )
}


export default Dropdown