export interface recipeObj {
    id: number;
    name: string;
    description: string;
    image_url: string;
    disclaimer: string;
}

export interface ingredientObj {
    id: number;
    name: string;
    recipe_id: number;
    completed: boolean;
}

export interface descriptionObj {
    id: number;
    description: string;
    recipe_id: number;
    order_step: number;
    completed: boolean;
}
