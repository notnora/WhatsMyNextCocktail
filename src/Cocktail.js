

const BASEURL="https://www.thecocktaildb.com/api/json/v1/1/";
const waitABit = ms => new Promise(resolve => setTimeout(() => resolve(), ms));


export async function filterAlcoholic(alcoholic){
    /**
     * API-call to get alcoholic or non-alcoholic beverages based on the parameter.
     * @param alcoholic: Boolean, true if a list of alcoholic drinks are requested, false if not.
     * @return cocktail-object.
     */
    await waitABit(1000);
    let response = "";
    if(alcoholic){
        response = await fetch(
            `${BASEURL}/filter.php?a=Alcoholic`,
            );
    }
    else {
        response = await fetch(
            `${BASEURL}/filter.php?a=Non_Alcoholic`,
            );
    }
    const data = await response.json();
    let min = 0;
    let max = data.drinks.length;
    return data.drinks[Math.floor(Math.random() * (max - min)) + min];
}


export async function getDetails(id) {
    /**
     * API-call to get information about a specific cocktail based on an id.
     * @param id: The id of the cocktail to get information of.
     * @return A string with instructions on how to make the specified cocktail.
     */
    await waitABit(1000);
    let response = await fetch(
        `${BASEURL}lookup.php?i=${id}`,
    );
    const data = await response.json();
    return data.drinks[0].strInstructions;
}


export  async function getIngredients(id) {
    /**
     * An API-call to get details about a cocktail based on id.
     * This api-call is redundant as the getDetails()-function does the same and could be it's own function.
     * I also hard-coded the max number of loops, which is not optimal.
     * @param id: id of the cocktail in which to get information of.
     * @return a 2d-array of ingredients and measurements of each ingredient.
     */
    let baseStrIngr =  "strIngredient";
    let baseStrMeasure= "strMeasure";
    let ingrList = [];
    let measureLst = [];

    await waitABit(1000);
    let response = await fetch(
        ` ${BASEURL}/lookup.php?i=${id}`,
    );
    const data = await response.json();
    let str = baseStrIngr + 1;
   for(let i = 1; i<20; i++){
        let ings=baseStrIngr+i;
        let msr=baseStrMeasure+i;

        if(data.drinks[0][ings] === ""){
            break;
        }
        ingrList[i-1] = data.drinks[0][ings];
        measureLst[i-1] = data.drinks[0][msr];

    }
    return [ingrList, measureLst]
}
