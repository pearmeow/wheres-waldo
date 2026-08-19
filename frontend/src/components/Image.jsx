import "./Image.css";
import { useState } from "react";

export default function Image() {
    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(100);
    const [imgURL, setImgURL] = useState(null);
    async function fetchImage() {
        const blob = await fetch(
            // TODO: the 1 should be replaced with some number from
            // a parent component probably when the user chooses
            import.meta.env.VITE_BACKEND_URL + "pictures/1",
        );
        const imgBlob = await blob.blob();
        console.log(imgBlob);
        setImgURL(URL.createObjectURL(imgBlob));
    }
    const onClick = (e) => {
        const domImgRect = e.target.getBoundingClientRect();
        setXPos(e.clientX);
        setYPos(e.clientY);
        // console.log(domImgRect);
        // console.log("Mouse x location: " + e.clientX);
        // console.log("Mouse y location: " + e.clientY);
        // console.log("Relative mouse x location: " + (e.clientX - domImgRect.x));
        // console.log("Relative mouse y location: " + (e.clientY - domImgRect.y));
        const relX = (e.clientX - domImgRect.x) / domImgRect.width;
        const relY = (e.clientY - domImgRect.y) / domImgRect.height;
        console.log("Relative mouse x location in decimal: " + relX);
        console.log("Relative mouse y location in decimal: " + relY);
    };

    // TODO: implement checking character positions
    const handleCheck = (e) => {
        console.log("submit to the backend here");
    };

    if (!imgURL) {
        fetchImage();
        return <p>Loading...</p>;
    }

    return (
        <div>
            <img src={imgURL} onClick={onClick} alt="a where's waldo puzzle" />
            <div
                style={{
                    position: "absolute",
                    height: "100px",
                    width: "200px",
                    top: yPos + "px",
                    left: xPos + "px",
                    background: "#FFFFFF",
                }}
            >
                "hello"
                <button onClick={handleCheck}>Check</button>
            </div>
        </div>
    );
}
