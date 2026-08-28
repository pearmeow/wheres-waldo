export default function Popup({ imgNum, xPos, yPos, relX, relY, characters }) {
    const handleCheck = async (e, charNum) => {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL +
                "pictures/" +
                imgNum +
                "/validation/" +
                charNum,
            {
                method: "POST",
                body: {
                    x: relX,
                    y: relY,
                },
            },
        );
        const check = await res.json();
        console.log(check);
    };

    // each button has a character's name and will fetch from backend to
    // check for that character when the button is pressed
    const checkButtons = [];
    for (const char of characters) {
        checkButtons.push(
            <button key={char.id} onClick={(e) => handleCheck(e, char.id)}>
                {char.name}
            </button>,
        );
    }

    return (
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
            {checkButtons}
        </div>
    );
}
