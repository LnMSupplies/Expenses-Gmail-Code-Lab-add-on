# Expenses-Gmail-Code-Lab-add-on
## Credit to Google for the Code lab and the foundation from which I made this
 
This is mostly copied from the Google Repo for Gmail Add-ons https://github.com/googlecodelabs/gmail-add-ons.git , which I got while doing the Google Code-lab: https://codelabs.developers.google.com/codelabs/gmail-add-ons/#0 . 

It will parse an open email and suggest the highest number it can find as the expense amount along with a few other pertenant fields:  
 - ID: Create an Expense ID starting at 0
 - Date Received: the date the email arrived to the inbox.
 - Total Amount: Highest amount as total amount 
 - Tax/CAD total: Calculates the HST (Ontario Tax rate on goods and services) or calculate the USD amount in CAD dollars using the Exchange rate at the time of receipt.
 - Description: Prefills this field with the senders email and the email subject line.  
 - Spreadsheet URL: Prepopulate the destination URL of the Google Spreadsheet last used to be saved to.  
   
   
I've added some of my own code which will show a calculated Ontario Tax amount of 13% or, if the regex (Lot's of room for improvement here) see's 'USD' 1 space before or after the final price with no dollar sign between them, it will look up the 'CAD' to 'USD' exchange rate from the Exchange Rate API using the date the email was received and apply it to the amount. https://api.exchangeratesapi.io . It will then show it in the Tax field, because in most cases there would not have been any tax applied.   

I was hoping to add an auto-save option as well for any pdf attachments but I have to actually do my taxes at some point and stop making tools to help me do the work itself. 

This has not been published to the addon store and is available to apply yourself in a developer mode state using the developer id from the script in your gmail addons screen.
