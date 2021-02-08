const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealElement = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading');
const singleMealElement = document.getElementById('single-meal')

submit.addEventListener('submit', searchMeal);
function searchMeal(e) {
    e.preventDefault();
    singleMealElement.innerHTML = '';
    const term = search.value;
    console.log(term);
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                //  console.log(data)
                resultHeading.innerHTML = `<h2 class="search-result"> Search result for '${term}'`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p style="text-align:center; color:red;"> There are no search results. Try again! </p>`
                }
                else {
                    mealElement.innerHTML = data.meals.map(meal => `<div onclick = showMealDetails('${meal.idMeal}') class="meal">
                     <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}">
                     <h3> ${meal.strMeal}</h3>
                     </div>
                     `)
                        .join('');
                }
            });
        search.value = '';
    }
    else {
        alert('Please enter a search term');
    }
}

const showMealDetails = idMeal => {
    const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${idMeal}`)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            renderMealInfo(meal)
        });
}

const renderMealInfo = meal => {
    console.log(meal);
    const mealDtails = document.getElementById('meal-details');
    mealDtails.innerHTML = `
         <div  >
            <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}">
            <h1> ${meal.strMeal}</h1>
            <h2> Area: ${meal.strArea} </h2>
            <h2>Category: ${meal.strCategory}</h2>
            <h3> Ingredients:</h3>
            <ul>
             <li> ${meal.strIngredient1} </li> 
             <li> ${meal.strIngredient2} </li> 
             <li> ${meal.strIngredient3} </li> 
             <li> ${meal.strIngredient4} </li> 
             <li> ${meal.strIngredient5} </li> 
             <li> ${meal.strIngredient6} </li>             
            </ul>
            <p> <span>INSTRUCTION:</span> ${meal.strInstructions}</p>
            <hr>
            
        </div>
         `;
}

