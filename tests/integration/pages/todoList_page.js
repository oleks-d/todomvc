var ToDoListPage = (function () {
    function ToDoListPage() {
      // attributes

      this.todoList_url = "/examples/angularjs/#/";

        //labels
         this.header_label = element(By.id("header"));
         this.todoField_input = element(By.id("new-todo"));
         this.numberOfItems_label = element(By.xpath("//span[@id='todo-count']/strong"));

         this.currentTodos_list = element.all(By.xpath("//ul[@id='todo-list']/li/div/label"));
         this.markButtons_list = element.all(By.xpath("//input[@ng-model='todo.completed']")) ;
         this.deleteButtons_list = element.all(By.xpath("//button[@class='destroy']"));
         this.listOfViews_div = element.all(By.xpath("//div[@class='view']"));

         this.allTodos_link = element(By.xpath("//ul[@id='filters']/li/a[text()='All']"));
         this.activeTodos_link = element(By.xpath("//ul[@id='filters']/li/a[text()='Active']"));
         this.completedTodos_link = element(By.xpath("//ul[@id='filters']/li/a[text()='Completed']"));
         this.clearCompleted_link = element(By.id("clear-completed"));

         this.selectAll_checkbox = element(By.id("toggle-all"));
    }

    ToDoListPage.prototype.openPage = function () {
        browser.get(this.todoList_url);
    };

    ToDoListPage.prototype.addTodoText = function (todoText) {
        this.todoField_input.sendKeys(todoText);
        this.todoField_input.sendKeys(protractor.Key.ENTER);
    };

    ToDoListPage.prototype.getHeader = function () {
        return this.header_label.getText();
    };


    ToDoListPage.prototype.openAllTodos = function () {
        this.allTodos_link.click();
    };

    ToDoListPage.prototype.openActiveTodos = function () {
        this.activeTodos_link.click();
    };

    ToDoListPage.prototype.openCompletedTodos = function () {
        this.completedTodos_link.click();
    };

    ToDoListPage.prototype.cleanCompletedTodos = function () {
        this.clearCompleted_link.click();
    };


    ToDoListPage.prototype.completeAllTodos = function () {
        this.selectAll_checkbox.click();
    };

    ToDoListPage.prototype.getNumberOfTodos = function () {
        return this.numberOfItems_label.getText();
    };

    ToDoListPage.prototype.getListOfTodos = function () {
        return this.currentTodos_list;
    };

    ToDoListPage.prototype.getListOfMarkButtons = function () {
        return this.markButtons_list;
    };

    ToDoListPage.prototype.getListOfDeleteButtons = function () {
        return this.deleteButtons_list;
    };

    ToDoListPage.prototype.cleanup = function () {
        //remove all todos
      todos = this.getListOfTodos();
      delButtons = this.getListOfDeleteButtons();
      todos.each(function(button) {
        //activate Delete button
        browser.actions().mouseMove(todos.get(0)).click().perform();
        //click on delete button
        delButtons.get(0).click();
      });

    };

    return ToDoListPage;

})();

module.exports = ToDoListPage;
