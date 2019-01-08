$(document).ready(function () {

  

  let randomURL = '/random';
  let getRecipeByIdURL = '/byIngredient/:ingredients';



  $(".scroll").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });

  $('#getRecipesBtn').click(function(e){
    $('#getRecipes').css('display', 'none').fadeOut();
    setTimeout(function(){
      $('#showSearch').css('display', 'block').fadeIn();
    }, 500)
  });

  function hideSearch(){
    $('#showSearch').css('display', 'none').fadeOut();
    setTimeout(function(){
    $('#getRecipes').css('display', 'block').fadeIn();
    }, 500)
  };

 

  $('#randomRecipeBtn').click(function(e){
    $('#recipeDisplay').empty();
    e.preventDefault();
    let url = randomURL;
    console.log('URL', url);
    getRecipes(url);
    $(this).blur();
    hideSearch();
    $(window).scrollTop($('#recipes').offset().top-20)
  });

  $('#searchIngredientBtn').click(function(e){
    $('#recipeDisplay').empty();
     e.preventDefault();
        let ingredients = $('#searchIngredientInput').val();
        console.log(ingredients);
        let url = '/byIngredient/' + ingredients;
        getRecipesByIngredient(url); //recipeFunctions.js
        $('#searchIngredientInput').val('')
        $(this).blur();
        hideSearch();
        
  });

  $('#searchComplexBtn').click(function(e){
    $('#recipeDisplay').empty();
     e.preventDefault();
        let diet = $('#diet').val();
        let cuisine = $('#cuisine').val();
        let mealType = $('#mealType').val();
        let intolerances = $('#intolerances').val();
        let ingredients = $('#searchComplexIngredientInput').val();
        ingredients.trim();
        if (ingredients === '') {
          ingredients = 0;
        }
        console.log(diet);
        console.log(cuisine);
        console.log(mealType);
        console.log(intolerances);
        console.log(ingredients);
        // console.log(ingredients);
        let url = `/complex/${cuisine}/${diet}/${ingredients}/${mealType}/${intolerances}`;
        // getRecipesByIngredient(url); //recipeFunctions.js
        getRecipesComplex(url)
        $(this).blur();
        hideSearch();
  });

  



  $('#recipeDisplay').on('click', '.recipeBtn', function (e) {
    let recipeID = parseInt($(this).attr('id'));
    console.log('Recide ID::::::', recipeID);
    let url = '/byID/' + recipeID;
    console.log(url)
    $("#recipeDisplay").css('display', 'block').fadeIn();
    getRecipeById(url);
    $(this).blur();
    });

    $('#closeBtn').click(function(e){
      showRecipe();
      $(this).blur();
    });

    function showRecipe() {
        $("#individualRecipeDisplay").css('display', 'none').fadeOut(750);
        $("#recipes").css('display', 'block').fadeIn(750);   
    }



  $("body").click(function (event) {
    // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
    if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
      $('.navbar-collapse').collapse('toggle');
    }
  });

  
  $('#contactBtn').click(function (e) {
    e.preventDefault();
    let subscribeInfo = {
      Cemail: $('#contactEmail').val(),
      Cname: $('#contactName').val(),
      Cphone: $('#contactPhone').val(),
      Cmessage: $('#contactMessage').val()
    }

    console.log(subscribeInfo);
    let url = '/send-email';
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        subscribeInfo
      },

      dataType: 'json'
    }).done(function (response) {
      console.log(response);
      $('#contactSuccess').css('display', 'block').fadeIn(750);
      $('#contactEmail').val('');
      $('#contactName').val('');
      $('#contactPhone').val('');
      $('#contactMessage').val('');
      $('#contactBtn').blur();
      setTimeout(function () {
        $('#contactSuccess').css('display', 'none').fadeOut(750);
      }, 1500);

    }).fail(function (response) {
      console.log(response);
      // $('#mailingFailure').css('display', 'block').fadeIn(750);
      $('#contactFailure').css('display', 'block').fadeIn(750);
      $('#contactEmail').val('');
      $('#contactName').val('');
      $('#contactPhone').val('');
      $('#contactMessage').val('');
      $('#contactBtn').blur();
      setTimeout(function () {
        $('#contactFailure').css('display', '').fadeOut(750);
      }, 1500);

    });
  })

  $('#btn-signup').click(function(e){
    e.preventDefault();

  });

 
  
  $('#enterPassword').blur(function(){
    var validLower = /[a-z]/g
    var validUpper = /[A-Z]/g
    var validNumber = /[0-9]/g
    var validSpecial = /\W+/g

    // if (!$(this).val().match(validLower) || !$(this).val().match(validUpper) || !$(this).val().match(validNumber) || !$(this).val().match(validSpecial) || $(this).val().length < 6) {
    //   $('#subscribeFailure').text('Password must be a minimum of 6 characters long and have at least one number, one lowercase letter, one uppercase letter and one special charcter')
    //   $('#subscribeFailure').css('display', 'block');
    //   $(this).focus().val('');
    //   hideWarning();
    // }

    if (!$(this).val().match(validLower)) {
      $('#subscribeFailure').text('You must have at least one lowercase Character')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning();
    } else
    if (!$(this).val().match(validUpper)) {
      $('#subscribeFailure').text('You must have at least one  uppercase Character')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning()
    } else
    if (!$(this).val().match(validNumber)) {
      $('#subscribeFailure').text('You must have at least one  Number')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning()
    } else
    if (!$(this).val().match(validSpecial)) {
      $('#subscribeFailure').text('You must have at least one  special character')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning()
    } else
    if ($(this).val().length < 6 ) {
      console.log($(this).val().length)
      $('#subscribeFailure').text('Password must be a minimum of 6 characters')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning()
    }
  })

  function hideWarning() {
    setTimeout(function(){
      $('#subscribeFailure').css('display', 'none').fadeOut();

    }, 1250)
  }

  $('#confirmPassword').blur(function(){
    if ($(this).val() !== $('#enterPassword').val()) {
      $('#subscribeFailure').text('Passwords do not match!')
      $('#subscribeFailure').css('display', 'block');
      $(this).val('');
      hideWarning();
    }
  })
 
});