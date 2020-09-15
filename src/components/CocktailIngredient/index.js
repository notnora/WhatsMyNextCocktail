import React from "react";
import './style.css'

 export const  CocktailIngredient = (props) => {
     /**
      * A react component of the ingredient and its measurement.
      * @param properties from parent.
      * @return a <p>-element with the ingredient and measurement-string.
      */
    if(!props.list){
        return null;
    }

    return(
        <p className="ingredient-list">{props.ingredient}  {props.measure}</p>
    );
 };