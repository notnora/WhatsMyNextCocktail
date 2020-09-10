import React from "react";
import './style.css'

export const CocktailImg = (props) => {
     /**
      * A react component of the thumbnail of the cocktail
      * @param properties from parent.
      * @return an <img>-element with alt-text as the name of the drink.
      */
    if(!props.c){
        return null;
    }
    return (
        <img
            className="cocktail-thumb"
            src={props.c.strDrinkThumb}
            alt={props.c.strDrink}
        />
        );
};