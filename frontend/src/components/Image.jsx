import waldo from "../assets/waldo.jpg";
import "./Image.css";

export default function Image() {
    const onClick = (e) => {
        const domImgRect = e.target.getBoundingClientRect();
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
    return <img src={waldo} onClick={onClick} alt="a where's waldo puzzle" />;
}
