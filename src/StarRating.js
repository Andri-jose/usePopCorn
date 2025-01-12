const containerStyle = {
    display : "flex",
    alignItems: "center",
    gap: "16px",

};


export default function StarRating({maxRating = 5}){
    return(
        <div style={containerStyle}>
            <div>
               {Array.from({length: maxRating}, (_, i) => <span>X{i + 1}</span>)}
            </div>
            <p>10</p>
        </div>
       
    )
}