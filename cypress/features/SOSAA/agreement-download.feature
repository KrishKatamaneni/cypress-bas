Feature: Download feature
    Scenario Outline: 1 - Download and compare
        Given I am on the sosaa login page
        When I navigate to the "<url>" and download "<filename>"
        Then I read the downloaded file
        Then I verify records with the saved data
        Examples:
            | url                                                                                                             | filename                            |
            | https://pwp:eye-T$B33!@beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/nightly-report | aocama_accords-sosaa_agreements.csv |

# Scenario: 2 - verify the records with the sosa app displayed number, re-run the script if fails 1st time
#     Given I am on the sosaa login page
#     Then I verify records with the saved data