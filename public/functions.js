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
      <input type="text" name="description" />
      Quantity
      <input type="text" name="quantity"  />
      <input type ="hidden" name="item${$('#ingredientname').val()}" value ="${checkboxValues}"/>
    </li>`
  )
  $('#ingredientList').append(added)

  }
