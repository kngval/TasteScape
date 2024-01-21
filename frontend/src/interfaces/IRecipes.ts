


interface Recipe {
        recipe : {
            uri: string,
            label : string,
            image: string,
            cuisineType: string,
            calories: number,
            yield: number,
            totalTime: number,
            ingredientLines: string[]
        }
}

export default Recipe;