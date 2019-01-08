function getRecipeById(url) {
    $.get(url, function (data) {
        // console.log('Recipe Data', data.data);
        $('#instructionsUL').empty();
        $('#ingredientUL').empty();

        // let result = ''
        let result = data.data;
        console.log(result)
        let imageSrc = result.image;
        // console.log(imageSrc)
        $('#recipeImage').attr('src', imageSrc);
        let title = result.title;
        $('#recipeTitle').text(title);
        let servings = `Serves: ${result.servings}`;
        $('#recipeServes').text(servings);
        try {
            let steps = result.analyzedInstructions[0].steps;
            if (steps.length > 0) {
                steps.forEach(step => {
                    // console.log('step', step.step);
                    let process = step.step;
                    let stepLi = '';
                    let equip = '';
                    step.equipment.forEach(piece => {
                        // console.log('Equip:', piece.name, 'Equip Image', `https://spoonacular.com/cdn/equipment_100x100/${piece.image}`);
                        equip = equip + `<img src="https://spoonacular.com/cdn/equipment_100x100/${piece.image}" style="width: 30px; height: 30px;">`;
                    });
                    stepLi = `<li class="list-group-item">${process} ${equip}</li>`;
                    // stepLi = `<li>${process} ${equip}</li>`;
                    $(stepLi).appendTo('#instructionsUL');
                });
            } else {
                let stepLi = result.instructions;
                stepLi = `<li class="list-group-item">${stepLI} ${equip}</li>`;
                // stepLi = `<li>${stepLI} ${equip}</li>`;
                $(stepLi).appendTo('#instructionsUL');
            }
        } catch (e) {}
        let ingredients = result.extendedIngredients;
        // console.log(ingredients);
        ingredients.forEach(ingredient => {
            let ingredientAmount = ingredient.measures.metric.amount;
            if (ingredient.measures.metric.unitLong === 'grams') {
                ingredientAmount = parseInt(ingredient.measures.metric.amount);
            } else {
                ingredientAmount = (ingredient.measures.metric.amount);
            }
            // console.log('Ingredients:', ingredient.name, 'imageURL:', `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`, 'Ingredient Amount:', ingredient.amount, 'Metric Name:', ingredient.measures.metric.unitLong, 'Metric Amount:', ingredient.measures.metric.amount, 'US Name:', ingredient.measures.us.unitLong, 'US Amount:', ingredient.measures.us.amount);
            let testLi = `<li class="list-group-item" >${ingredientAmount} ${ingredient.measures.metric.unitLong} - ${ingredient.name}         <img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}" style="width: 30px; height: 30px;"></li>`;
            $(testLi).appendTo('#ingredientUL');
        });
        // $('.ui.link.cards').css('display', 'none').fadeOut();
        // $('.ui.icon.message').fadeOut();
        $("#recipes").css('display', 'none').fadeOut();
        $("#individualRecipeDisplay").css('display', 'block').fadeIn();
        $(window).scrollTop($('#individualRecipeDisplay').offset().top-20)


    });
    // $("#recipeDisplay").css('display', 'block').fadeIn();


}

function getRecipesByIngredient(url) {
    $.get(url, function (data) {
            recipes = data.data;
            console.log('Ingredients are:', recipes);
            try {
                $.each(recipes, function (i, value) {
                    let instructions = (recipes[i].instructions);
                    console.log(instructions);
                    console.log('RecipeImage is ', recipes[i].image)
                    recipeCard = `<div class="col-md-3 recipeCard d-flex flex-column">
                        <img class="card-img-top" src="${recipes[i].image}" alt="Card image cap">

                        <div class="card-body d-flex flex-column">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><h5 class="card-title">${recipes[i].title}</h5></li>
                                <li class="list-group-item">Used Ingredients: ${recipes[i].usedIngredientCount} <br>
                                <li class="list-group-item">Missed Ingredients: ${recipes[i].missedIngredientCount} <br>
                                <li class="list-group-item"><p class="card-text" ><button class="btn btn-default recipeBtn mt-auto" id="${recipes[i].id}">Get Recipe</button></li>
                            </ul>
                        </div>
                    </div>`;
                    $(recipeCard).appendTo('#recipeDisplay');
                });
            } catch (e) {
                $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
            setTimeout(() => {
                $('.alert.alert-danger.connectionError').css('display', 'none').fadeOut();
            }, 3000);
            }

        })
        .fail(function () {
            $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
            setTimeout(() => {
                $('.alert.alert-danger.connectionError').css('display', 'none').fadeOut();
            }, 3000);


        })
        .done(function (data) {
            console.log('DONE- AWESOME')
        });
};


function getRecipesComplex(url) {

    $.get(url, function (data) {
            recipes = data.data.results;
            console.log('Ingredients are:', recipes);
            try {
                $.each(recipes, function (i, value) {
                    let instructions = (recipes[i].instructions);
                    console.log(instructions);
                    console.log('RecipeImage is ', recipes[i].image)
                    recipeCard = `<div class="col-md-3 recipeCard d-flex flex-column">
                        <img class="card-img-top" src="${recipes[i].image}" alt="Card image cap">

                        <div class="card-body d-flex flex-column">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><h5 class="card-title">${recipes[i].title}</h5></li>
                                <li class="list-group-item">Used Ingredients: ${recipes[i].usedIngredientCount} <br>
                                <li class="list-group-item">Missed Ingredients: ${recipes[i].missedIngredientCount} <br>
                                <li class="list-group-item"><p class="card-text" ><button class="btn btn-default recipeBtn mt-auto" id="${recipes[i].id}">Get Recipe</button></li>
                            </ul>
                        </div>
                    </div>`;
                    $(recipeCard).appendTo('#recipeDisplay');
                });
            } catch (e) {
                $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
            setTimeout(() => {
                $('.alert.alert-danger.connectionError').css('display', 'none').fadeOut();
            }, 3000);
            }

        })
        .fail(function () {
            $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
            setTimeout(() => {
                $('.alert.alert-danger.connectionError').css('display', 'none').fadeOut();
            }, 3000);


        })
        .done(function (data) {
            console.log('DONE- AWESOME')
        });
};


function getRecipes(url) {

    $.get(url, function (data) {
            console.log(url);
            recipes = data.data;
            console.log(recipes);
            try {
                let x = 0;
                let z = 0;
                $.each(recipes, function (i) {
                    if (recipes[i].title.length > x) {
                        x = recipes[i].title.length;
                    }
                });
                $.each(recipes, function (i, value) {
                    let dishTypes = recipes[i].dishTypes.join(' ,');
                    let instructions = (recipes[i].instructions);
                    if (instructions.length <= 120) {
                        z = 124 - instructions.length;
                        instructions = instructions + ' .'.repeat(z);
                        console.log(instructions.length)
                    } else {
                        instructions = (recipes[i].instructions).substring(0, 120) + ' ...';
                    }
                    let title = recipes[i].title;



                    if (title.length < x) {
                        let y = x - title.length;
                        title = title + ' .'.repeat(y);
                    }
                    recipeCard = `<div class="col-md-3 recipeCard d-flex flex-column">
                        <img class="card-img-top" src="${recipes[i].image}" alt="Card image cap">

                        <div class="card-body d-flex flex-column">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h5 class="card-title">${title}
                             </h5></li>
                             <li class="list-group-item"><p class="card-text">${instructions}</p></li>
                             <li class="list-group-item"><p class="card-text" ><button class="btn btn-default recipeBtn mt-auto" id="${recipes[i].id}">Get Recipe</button></li>
                            </ul>
                        </div>
                    </div>`;
                    $(recipeCard).appendTo('#recipeDisplay');
                    console.log('RecipeID', recipes[i].id)


                });
            } catch (e) {

                $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
                setTimeout(() => {
                    $('.alert.alert-danger.connectionError').css('display', 'none').fadeOut();
                }, 3000);

            }

        })
        .done(function (data) {

        })
        .fail(function (error) {
            console.log('Error');
            alert(error);
            $('.alert.alert-danger.connectionError').css('display', 'block').fadeIn();
        })
        .always(function () {

        })

}