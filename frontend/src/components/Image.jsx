import waldo from "../assets/waldo.jpg";
import "./Image.css";
import { useState } from "react";

export default function Image() {
    const [xPos, setXPos] = useState(100);
    const [yPos, setYPos] = useState(100);
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
    return (
        <div>
            <img src={waldo} onClick={onClick} alt="a where's waldo puzzle" />
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
            </div>
        </div>
    );
}
