import "./Image.css";
import Popup from "./Popup.jsx";
import { useEffect, useState } from "react";
import useComponentVisible from "../hooks/useComponentVisible.jsx";

export default function Image({ imgNum }) {
    const [err, setErr] = useState(null);
    // xPos and yPost are used to position the popup div
    const [xPos, setXPos] = useState(null);
    const [yPos, setYPos] = useState(null);
    // relX and relY are values sent to the backend to
    // validate character positions
    const [relX, setRelX] = useState(null);
    const [relY, setRelY] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [portraits, setPortraits] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [text, setText] = useState(
        <p>Please pick the character you would like to verify.</p>,
    );
    // hook for detecting outside clicks
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    // fetch EVERYTHING
    useEffect(() => {
        const fetchImage = async () => {
            console.log("fetch image");
            const blob = await fetch(
                import.meta.env.VITE_BACKEND_URL + "pictures/" + imgNum,
            );
            if (!blob.ok) {
                setErr("Failed to fetch image");
                return;
            }
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
                setErr("Failed to fetch characters");
                return;
            }
            const chars = await res.json();
            console.log(chars);
            await fetchPortraits(chars);
            setCharacters(chars);
        };
        const fetchPortraits = async (characters) => {
            // for each character in characters fetch a portrait and
            // add it to an array
            const portraits = [];
            for (let char of characters) {
                const blob = await fetch(
                    import.meta.env.VITE_BACKEND_URL +
                        "pictures/" +
                        imgNum +
                        "/characters/" +
                        char.id,
                );
                if (!blob.ok) {
                    setErr("Failed to fetch image");
                    return;
                }
                const imgBlob = await blob.blob();
                const imgURL = URL.createObjectURL(imgBlob);
                portraits.push(
                    <img src={imgURL} alt={char.name} key={char.id} />,
                );
            }
            console.log("portraits");
            console.log(portraits);
            setPortraits(portraits);
        };

        const fetchAll = async () => {
            await fetchImage();
            await fetchCharacters();
        };
        fetchAll();
    }, [imgNum]);

    // TODO: make popup div not go past the borders of the image
    const onClick = (e) => {
        const domImgRect = e.target.getBoundingClientRect();
        // just set the div's position to where the cursor is
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

    if ((!characters || !imgURL) && !err) {
        return <p>Loading...</p>;
    }

    if (err) {
        return <div>{err}</div>;
    }

    return (
        <>
            <div className={"portraits"}>{portraits}</div>
            <div className={"imgContainer"} ref={ref}>
                <img
                    src={imgURL}
                    onClick={onClick}
                    alt="a where's waldo puzzle"
                />
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
        </>
    );
}
