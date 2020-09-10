import React from "react";

export const CocktailName = (props) => {
     /**
      * A react component of the name of the cocktail.
      * @param properties from parent.
      * @return a <p>-element with the name-string.
      */

    if(!props.c){
        return null;
    }
    return(
        <p> {props.c.strDrink} </p>
    );
};