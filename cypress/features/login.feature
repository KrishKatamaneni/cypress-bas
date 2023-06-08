Feature: Basic feature
    Scenario: 1 - Find a right agreement
        Given I am on the sosaa login page
        When I enter the value "E60PD-19OSFB" in the title field
        Then I select "Regional Master Standing Offer (RMSO)" from the type field
        And I select "None" from CCPI
        And I select "Published" from state
        Then I click Apply


