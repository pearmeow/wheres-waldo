export default function Portrait({ imgURL, charName }) {
    return (
        <div className="portrait">
            <p>{charName}</p>
            <img src={imgURL} alt={charName} />
        </div>
    );
}
