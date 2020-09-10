import React from 'react';
import {CocktailDetails} from './components/CocktailDetails'
import {GetCocktailButton} from './components/GetCocktailButton'
import {CocktailImg} from './components/CocktailImg'
import {CocktailName} from './components/CocktailName'
import {CocktailIngredient} from "./components/CocktailIngredient";
import {Header} from './components/Header'
import './App.css';
import * as ct from './Cocktail.js'





function App() {
    /**
     * This app suggests a random alcoholic or non-alchoholic cocktail/drink based on the users preferance.
     * It will give an example picture, ingredients with measures and directions of how to compose the drink.
     * The API used is called "The Cocktail DB" https://www.thecocktaildb.com/api.php .
     *
     * @param: N/A
     * @return React-Components that make up the application.
     */

    // States used
    const [cocktail, setCocktail] = React.useState(null); // Contains a cocktail object from the api
    const [details, setDetail] = React.useState(null); // Contains the directions of creating a particular cocktail
    const [ingredientsList, setIngredients] = React.useState([]); //Contains the ingredient list to a particular cocktail


    const getCocktail = (alc) => {
        /*
        A function in which the api-call-function is called.
         */
        setIngredients(ingredientsList =>[]); // Resets the ingredient list each time a new cocktail is requested.
        ct.filterAlcoholic(alc).then(cocktailObj => {
            /*
            After the response from the API has "arrived", cocktail-state is changed,
            directions and ingredients are requested based on the cocktail-id.
             */
            setCocktail(cocktailObj);
            ct.getDetails(cocktailObj.idDrink).then(details =>{
                setDetail(details); // Add directions to details-state
            });
            ct.getIngredients(cocktailObj.idDrink).then( ingrMeasure => {

                for(let i =0; i<ingrMeasure[0].length; i++){
                    const newIngredient = {
                        id: i+ingrMeasure[0][i]+ingrMeasure[1][i],
                        ingredient: ingrMeasure[0][i],
                        measure: ingrMeasure[1][i],
                    };
                    setIngredients(ingredientsList =>[...ingredientsList, newIngredient]); // Append an ingredient to the ingredient list-state.

                }
            });
        });

   };


  return (
    <div className="App">
      <div className="App-header">
        <Header/>
        <div className="cocktail-display">
             <CocktailName c={cocktail}/>
             <CocktailImg c={cocktail}/>
             {ingredientsList.map(ingredientsList => ( // Creates a CocktailIngredient-component for each ingredient in the ingredientlist-state.
                 <CocktailIngredient
                     list={ingredientsList}
                     key={ingredientsList.id}
                     ingredient={ingredientsList.ingredient}
                     measure={ingredientsList.measure}/>
             ))}
             <CocktailDetails detail={details}/>
        </div>
        <ul className="container">
          <li className="Nav-item"><GetCocktailButton alc={true} text={"Alcoholic"} getCocktailCall={getCocktail} cocktailList={cocktail}/></li>
          <li className="Nav-item"><GetCocktailButton alc={false} text={"Non-Alcoholic"} getCocktailCall={getCocktail} cocktailList={cocktail}/></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
