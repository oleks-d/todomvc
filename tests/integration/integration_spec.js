// integration_spec.js
// Description: Set of requested tests

//page object
var TodoListPage = require("./pages/todoList_page.js");

describe('Todo list Test',function(){

      //get page object
      var page = new TodoListPage();

      //open page before each test
      beforeEach(function() {
        page.openPage();
      });

      // remove all todo items after test
      afterEach(function() {
        page.cleanup();
      });

  it("The URL is correct.", function(){
      var expected_url  = "http://localhost:8080/examples/angularjs/#/";
      expect(browser.getCurrentUrl()).toEqual(expected_url);
  })

  it("The page title is correct.", function(){
      var expected_title = "todos";
      expect(page.getHeader()).toEqual(expected_title);
  })

  it("The list of current todo items is correct (blank by default).", function(){
    expect(page.getListOfTodos().count()).toEqual(0);
  })

  it("A user can add a todo item.", function(){
    //get random text for too item
    var todoitem = new Date().getTime()
    page.addTodoText(todoitem);

    //check number of todo items left
    expect(page.getNumberOfTodos()).toEqual('1');
    //check number of todo items in list
    expect(page.getListOfTodos().get(0).getText()).toEqual(String(todoitem));
  })


  it("A user can change views.", function(){
      //get random text for too item
      var todoitem = new Date().getTime();
      //add items to edit
      page.addTodoText(todoitem);
      page.addTodoText(todoitem);
      page.addTodoText(todoitem);
      //check number of todo items left
      expect(page.getNumberOfTodos()).toEqual('3');

      //mark one item as done
      page.getListOfMarkButtons().get(0).click();
      expect(page.getNumberOfTodos()).toEqual('2');

      //go to 'active' tab
      page.openActiveTodos();
      //check number of todo items in list
      expect(page.getListOfTodos().count()).toEqual(2);

      //go to 'completed' tab
      page.openCompletedTodos();
      //check number of todo items in list
      expect(page.getListOfTodos().count()).toEqual(1);

      //back to 'all' tab
      page.openAllTodos();
      //check number of todo items in list
      expect(page.getListOfTodos().count()).toEqual(3);

  })

  it("A user can mark an item as completed.", function(){
      //get random text for too item
       var todoitem = new Date().getTime()
       //add item to edit
       page.addTodoText(todoitem);
       //mark item as completed
       page.getListOfMarkButtons().get(0).click();
       //check number of todo items left
       expect(page.getNumberOfTodos()).toEqual('0');
       //check that item style was changed
       expect(page.getListOfTodos().get(0).getCssValue("text-decoration")).toEqual("line-through");

  })

   it("A user can delete an item.", function(){
     //get random text for too item
     var todoitem = new Date().getTime()
     //add item to edit
     page.addTodoText(todoitem);
     //check number of todo items left
     expect(page.getNumberOfTodos()).toEqual('1');
     //get list of delete buttons
     expect(page.getListOfDeleteButtons().count()).toEqual(1);
     browser.waitForAngular();
     //activate todo item
     browser.actions().mouseMove(page.getListOfTodos().get(0)).click().perform();
     //click on delete button
     page.getListOfDeleteButtons().get(0).click();
     //check number of todo items left
     expect(page.getListOfTodos().count()).toEqual(0);
   })

  it("A user can clear the completed items.", function(){
      //get random text for too item
      var todoitem = new Date().getTime()
      //add item to edit
      page.addTodoText(todoitem);
      // click om mark button
      page.getListOfMarkButtons().get(0).click();
      //check number of todo items left
      expect(page.getNumberOfTodos()).toEqual('0');
      //check that style was changed
      expect(page.getListOfTodos().get(0).getCssValue("text-decoration")).toEqual("line-through");
      //clean items and check number of items in list
      page.cleanCompletedTodos();
      expect(page.getListOfTodos().count()).toEqual(0);
  })

  it("A user can select all items from list.", function(){
    //get random text for too item
    var todoitem = new Date().getTime()
    //add items to edit
    page.addTodoText(todoitem);
    page.addTodoText(todoitem);
    page.addTodoText(todoitem);
    //check number of todo items left
    expect(page.getNumberOfTodos()).toEqual('3');
    //complete all
    page.completeAllTodos();
    // check that all elements were selected
    expect(page.getNumberOfTodos()).toEqual('0');
    page.getListOfTodos().each(function(element, index) {
        element.getCssValue("text-decoration").then(function (value) {
            expect(value).toEqual("line-through");
          });
        });

  })

  it("User can edit items.", function(){
    //get random text for too item
    var todoitem = new Date().getTime()
    //set updated item value
    var updateditem =  "UP";
    //add item to edit
    page.addTodoText(todoitem);
    //edit item
    browser.actions().doubleClick(page.getListOfTodos().get(0)).sendKeys(updateditem).sendKeys(protractor.Key.ENTER).perform();
    //check expected text in item
    expect(page.getListOfTodos().get(0).getText()).toEqual(String(todoitem + updateditem));

  })

});
