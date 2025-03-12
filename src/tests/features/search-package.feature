Feature: Search packages on the homepage
    As a customer
    I want to search packages
    So that I can find a package that match my keyword

    Scenario: Successfully search for an existing package
        Given I am on the homepage for search
        When I enter "<keyword>" in the search bar
        And I click the search button
        Then I should see "<keyword>" in the search results

        Examples:
            | keyword         |
            | ExistingPackage |
            | TestPackage1    |
            | Test3           |

    Scenario: Search for a non-existing package
        Given I am on the homepage for search
        When I enter "NonExistingPackage" in the search bar
        And I click the search button
        Then I should see a message "No packages found"