/* global: $ */
function addIngredient(){
  var checkboxValues = []
  $('input[name=meat]:checked')
    .map(function() {
        checkboxValues.push($(this).val())
    })

   $('input[name=dairy]:checked')
     .map(function() {
        checkboxValues.push($(this).val());
     })

   $('input[name=gluten]:checked').map(function() {
      checkboxValues.push($(this).val());
   })

   checkboxValues = checkboxValues.join(" ")

  let added = $.parseHTML(
    `<li>
      ${$('#ingredientname').val()}
      <input type="checkbox" value="${$('#ingredientname').val()}" name="ingredients" />
      Description
      <input type="text" name="description" value="${$('#ingredientname').val()}" />
      Quantity
      <input type="text" name="quantity" value="${$('#ingredientname').val()}" />
      <input type ="hidden" value ="${checkboxValues}"/>
    </li>`
  )
  $('#ingredientList').append(added)

  }
