import React from 'react'
import { connect } from 'react-redux'
import CatControl from '../components/cat-control'
import CuisineControl from '../components/cuisine'
import ListItem from '../components/list-item'

import {
  map,
  filter,
  compose,
  contains,
  equals,
  intersection,
  allPass
} from 'ramda'

const Form = props => {
  console.log('do i have the recipes?', props)
  console.log('categories', props.recipe)

  const recipeToListItemObj = recipe => ({
    _id: recipe._id,
    title: recipe.title,
    imageUrl: recipe.imageUrl,
    rating: recipe.rating,
    linkUrl: '/recipes/' + recipe._id,
    linkDescription: 'View Recipe'
  })

  const li = li => <ListItem key={li._id} {...li} />

  //
  // const selectedRecipes = (recipe) => {
  //   return (
  //     (recipe.categories===props.control)
  //
  // )}
  console.log('MMMMM', props.cuisineControl)
  const recipes = compose(
    map(recipeToListItemObj),
    filter(r => r.cuisine === props.cuisineControl),
    filter(
      r =>
        intersection(r.categories, props.control).length ===
          props.control.length
    )
  )(props.recipes)

  return (
    <div className='pw4 ph1 mw6-ns center-ns'>
      {true && (
      <div>
        <h2 className='orange'>STEP 1</h2>
        <CatControl value={props.control} onChange={props.changeCat} />
        <h2 className='orange'>STEP 2</h2>
        <CuisineControl
          value={props.cuisineControl}
          onChange={props.changeCuisine}
              />
        <h2 className='orange'>STEP 3</h2>
        <div className='mt2'>
          <button
            className='pa3 f3 w-100 square bg-orange white-80'
            onSubmit={props.submit}
                >
                  Find Dinner
                </button>
        </div>
      </div>
          )}
      <h3>{props.cuisineControl}</h3>
      {true && (
      <div>
        <h3>Selected Recipes:</h3>
        <ul className='list'>
          {map(li, recipes)}
        </ul>
      </div>
          )}
    </div>
  )
}

const mapStateToProps = state => state

const mapActionsToProps = dispatch => ({
  changeCat: v => {
    dispatch({ type: 'SET_CONTROL', payload: v })
  },
  changeCuisine: v => {
    dispatch({ type: 'SET_CUISINE_CONTROL', payload: v })
  },
  getRecipes: recipe => {
    dispatch({ type: 'INIT_RECIPES', payload: recipe })
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Form)
