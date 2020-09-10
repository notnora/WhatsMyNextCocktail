import React from "react";
import './style.css'

 export const  CocktailDetails = (props) => {
     /**
      * A react component of the directions of how to make a specified cocktail.
      * @param properties from parent.
      * @return a <p>-element with the direction-string.
      */
    if(!props.detail){
        return null;
    }

    return(
        <p>{props.detail}</p>
    );
 };