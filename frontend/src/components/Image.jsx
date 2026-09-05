import "./Image.css";
import Popup from "./Popup.jsx";
import { useState } from "react";
import useComponentVisible from "../hooks/useComponentVisible.jsx";

export default function Image({ imgNum }) {
    // xPos and yPost are used to position the popup div
    const [xPos, setXPos] = useState(null);
    const [yPos, setYPos] = useState(null);
    // relX and relY are values sent to the backend to
    // validate character positions
    const [relX, setRelX] = useState(null);
    const [relY, setRelY] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [text, setText] = useState(
        <p>Please pick the character you would like to verify.</p>,
    );
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);
    const fetchImage = async () => {
        console.log("fetch image");
        const blob = await fetch(
            import.meta.env.VITE_BACKEND_URL + "pictures/" + imgNum,
        );
        // TODO: add error checking as well so we can display
        // "backend refused to connect or something"
        const imgBlob = await blob.blob();
        console.log(imgBlob);
        setImgURL(URL.createObjectURL(imgBlob));
    };

    const fetchCharacters = async () => {
        console.log("fetch chara");
        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL +
                "pictures/" +
                imgNum +
                "/characters",
        );
        if (!res.ok) {
            console.log("the response is not ok");
        }
        const chars = await res.json();
        console.log(chars);
        setCharacters(chars);
    };

    // TODO: make popup div not go past the borders of the image
    const onClick = (e) => {
        const domImgRect = e.target.getBoundingClientRect();
        // +8 because by default the dom rectangle's x and y vals are 8
        // might be kind of a hardcoded fix
        setXPos(e.clientX);
        setYPos(e.clientY);
        console.log(domImgRect);
        // console.log("Mouse x location: " + e.clientX);
        // console.log("Mouse y location: " + e.clientY);
        // console.log("Relative mouse x location: " + (e.clientX - domImgRect.x));
        // console.log("Relative mouse y location: " + (e.clientY - domImgRect.y));
        const relX = (e.clientX - domImgRect.x) / domImgRect.width;
        const relY = (e.clientY - domImgRect.y) / domImgRect.height;
        setRelX(relX);
        setRelY(relY);
        setIsComponentVisible(true);
        setText(<p>Please pick the character you would like to verify.</p>);
        console.log("Relative mouse x location in decimal: " + relX);
        console.log("Relative mouse y location in decimal: " + relY);
    };

    if (!imgURL) {
        fetchImage();
    }

    if (!characters) {
        fetchCharacters();
    }

    if (!characters || !imgURL) {
        return <p>Loading...</p>;
    }

    return (
        <div className={"imgContainer"} ref={ref}>
            <img src={imgURL} onClick={onClick} alt="a where's waldo puzzle" />
            {xPos && yPos && relX && relY && (
                <Popup
                    xPos={xPos}
                    yPos={yPos}
                    relX={relX}
                    relY={relY}
                    text={text}
                    hidden={!isComponentVisible}
                    setText={setText}
                    imgNum={imgNum}
                    characters={characters}
                />
            )}
        </div>
    );
}
