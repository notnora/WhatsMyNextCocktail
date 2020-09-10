import React from "react";
import './style.css'

export const GetCocktailButton = (props) => {
    /**
     * A react-component of a button that calls the api-calling-function.
     * While it's waiting for the cocktail to load, the button shows "Loading..."
     *
     * @param props: properties from parent
     * @return a <button>-element that does what's described above.
     */
  const [isLoading, setLoading] = React.useState(false);

  const handleClick = () => {
      /*
      Calls the API-call-function and set the loading-state to true.
       */
    props.getCocktailCall(props.alc);
    setLoading(true);


  };

  React.useEffect(()=>{
      /*
      When the cocktail-object has "arrived", the loading is set to false.
       */
      if(props.cocktailList){
        setLoading(false);
      }
  }, [props.cocktailList]);

    return (
        <div>
          <button
              className="get-cocktail-button"
            onClick={() => {handleClick()}}
          >
            {isLoading ? 'Loading…' : props.text}
          </button>

        </div>
    );
}