import React from "react";

export default function Die(props) {
    return (
        <div className="dice-face">
            <h2>{props.value}</h2>
        </div>
    )
}