'use client'

import RecipeListItem from "@/components/recipes/RecipeListItem";
import { Recipe } from "@/types/recipe";
import { getRecipes } from "@/actions/recipe-actions";
import { useActionState, useEffect, startTransition } from "react";

const initialState = {
  message: '',
}

const Home = () => {
  const [state, formAction, pending] = useActionState(getRecipes, initialState)

  useEffect(() => {
    startTransition(() => {
      formAction()
    })
  }, [formAction])

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
      {pending && <div>Loading...</div>}
      {state.message && <div>{state.message}</div>}
      {state.data && state.data.map((recipe: Recipe) => (
        <RecipeListItem recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}

export default Home
