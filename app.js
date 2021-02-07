     const search = document.getElementById('search');
     const submit =document.getElementById('submit');
    //  const random = document.getElementById('random');
     const mealElement =document.getElementById('meals')
     const resultHeading =document.getElementById('result-heading');
     const singleMealElement= document.getElementById('single-meal')
 
     function searchMeal (e) {
         e.preventDefault();

         singleMealElement.innerHTML = '';

         const term =search.value;
         console.log(term);
         if (term.trim ()) {  
             fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
             .then(res =>res.json())
             .then(data => {
                //  console.log(data)
                 resultHeading.innerHTML = `<h2 class="search-result"> Search result for '${term}'`;
                 if (data.meals === null) {
                     resultHeading.innerHTML =`<p> There are no search results. Try again!`
                 }
                 else{
                     mealElement.innerHTML = data.meals.map(meal =>`<div class="meal">
                     <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}">
                     <h3> ${meal.strMeal}</h3>
                     </div>
                     `)
                     .join('');
                 }
                });
                search.value = '';
         }
         else{
             alert('Please enter a search term');
         }
     }
    // event listeners 
     submit.addEventListener('submit',searchMeal);