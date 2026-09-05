export default function Popup({
    imgNum,
    xPos,
    yPos,
    relX,
    relY,
    characters,
    text,
    setText,
    hidden,
}) {
    const handleCheck = async (e, charNum) => {
        console.log(relX);
        console.log(relY);
        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL +
                "pictures/" +
                imgNum +
                "/validation/" +
                charNum,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    x: relX,
                    y: relY,
                }),
            },
        );
        const check = await res.json();
        if (check.correct) {
            setText(<p>You got it!</p>);
        } else {
            setText(<p>Try again.</p>);
        }
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
            hidden={hidden}
            style={{
                position: "absolute",
                width: "min(200px, 20vw)",
                top: yPos + "px",
                left: xPos + "px",
                background: "#FFFFFF",
            }}
        >
            {text}
            <p>{checkButtons}</p>
        </div>
    );
}
