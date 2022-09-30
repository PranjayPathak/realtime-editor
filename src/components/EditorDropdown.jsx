import React, { useState, useRef, useEffect } from 'react'

function EditorDropdown({ listItems, onSelectItem, placeholderText }) {
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState("")
    const ref = useRef(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    // const handleSelect = (item) => {
    //     onSelect(item.value);
    //     setText(item.label);
    // }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
                // onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref}
            className={isOpen ? "dropdown active" : "dropdown"}
            onClick={handleClick} >
            <div className="dropdown__text para-1">
                <span>{!text ? placeholderText : text}</span>
            </div>
            <div className="dropdown__items para-1">
                {listItems.map((item) => (
                    <div
                        className="dropdown__item"
                        key={item.id}
                        onClick={() => {
                            onSelectItem(item);
                            if (item.label.length > 15) {
                                setText(`${item.label.slice(0, 15)}...`);
                            } else {
                                setText(item.label);
                            }

                        }}
                    >
                        {item.label}
                    </div>
                ))
                } </div>
        </div>
    )
}

export default EditorDropdown;
