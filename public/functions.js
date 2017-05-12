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
      <label>${$('#ingredientname').val()}</label><label>
      <input type="checkbox" value="${$('#ingredientname').val()}" name="ingredients" /></label>
      <label>Description</label>
      <input type="text" name="description" />
      <label>Quantity</label>
      <input type="text" name="quantity"  />
      <input type ="hidden" name="item${$('#ingredientname').val()}" value ="${checkboxValues}"/>
    </li>`
  )
  $('#ingredientList').append(added)

  }
