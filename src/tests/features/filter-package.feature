Feature: Filter packages on the homepage
    As a customer
    I want to filter packages
    So that I can see packages that match my filter

    Scenario: Successfully filter packages by category
        Given I am on the homepage for filter
        When I select "Event" from the category filter
        And I click the search button for filter
        Then I should see only packages related to "Event"

    # Examples:
    #     | category |
    #     | Portrait |
    #     | Wedding  |
    #     | Event    |

    Scenario: Filter packages with no matching results
        Given I am on the homepage for filter
        When I select "Sports" from the category filter
        And I click the search button for filter
        And there are no packages available in "Sports" category
        Then I should see a message "No packages found" for filter results