## CHANGES FROM EXAMPLE
All instances of "employee(s)" from API converted to "user(s)"
Replaced employeeController.createNewEmployee() with modified registerController.handleNewUser()
    old createNewEmployee seemed pretty useless, and I don't see the need for a separate register URL and router, so I combined the two into createNewUser()