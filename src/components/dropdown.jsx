const { useState } = require("react");

// const listItems = ['dracula', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night'];


const Dropdown = ({ listItems, onSelectItem, placeholderText }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState("")

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    // const handleSelect = (item) => {
    //     onSelect(item.value);
    //     setText(item.label);
    // }

    return (
        <div
            className={isOpen ? "dropdown active" : "dropdown"}
            onClick={handleClick} >
            <div className="dropdown__text">
                <span>{!text ? placeholderText : text}</span>
            </div>
            <div className="dropdown__items">
                {listItems.map((item) => (
                    <div
                        onClick={() => {
                            onSelectItem(item);
                            if (item.label.length > 15) {
                                setText(`${item.label.slice(0, 15)}...`);
                            } else {
                                setText(item.label);
                            }

                        }}
                        className="dropdown__item"
                        key={item.id}
                    >
                        {item.label}
                    </div>
                ))
                } </div>
        </div>
    )
}

export default Dropdown;
