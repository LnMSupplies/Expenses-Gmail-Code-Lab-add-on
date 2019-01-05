/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * Determines date the email was received.
 *
 * @param {Message} message - The message currently open.
 * @returns {String}
 */
function getReceivedDate(message){
 return message.getDate().toLocaleDateString();
 }

/**
 * Determines Largest Value in the Body of the email .
 *
 * @param {Message} message - The message currently open.
 * @returns {String}
 */
function  getLargestAmount(message){
  var amount = 0;
  var messageBody = message.getPlainBody();
  var regex = /\*$[\d,]+\.\d\d\s|\CAD\s[\d*,]+\.\d*|\s[\d*,]+\.\d*\sUSD|\s[\d*,]+\.\d*\s\CAD/g;
  var match = regex.exec(messageBody);
  while (match) {
    amount = Math.max(amount, parseFloat(match[0].substring(1).replace(/,/g,'')));
    match = regex.exec(messageBody);
  }
  if(amount){
  return amount ? '$' + amount.toFixed(2).toString() : null;
  } else {
  return 'No Amount Detected';
  }
}
/**
* Determines the Tax Value in the Body of the email .
*
* @param {Message} message - The message currently open.
* @returns {String}
*/
function  getTaxAmount(message){
  var amount = 0;
  var hst = 1.13;
  var tax = 0 
  var messageBody = message.getPlainBody();
  var invDate = message.getDate();
  var regex = /\*$[\d,]+\.\d\d|\CAD\s[\d*,]+\.\d\d|\s[\d*,]+\.\d*\sUSD|\s[\d*,]+\.\d*\s\CAD/g;
  var match = regex.exec(messageBody);
  Logger.log(match);
  var regexNum = /USD/g;
  var matchTax = regexNum.exec(match);
  Logger.log(match);
  Logger.log(matchTax);
  
  while (match) {
    amount = Math.max(amount, parseFloat(match[0].substring(1).replace(/,/g,'')));
    match = regex.exec(messageBody);
  };
  while (amount) {
    if(!matchTax){
      tax = amount-(amount/hst);
      return tax ? '$' + tax.toFixed(2).toString() : null;
    } else{
      var rate = getRates(invDate);
      console.log("rate",rate)
      Logger.log("rate",rate);
      Logger.log("amount",amount);
      var cadAmount = parseFloat(amount * rate) ; 
      return cadAmount ? '$' + cadAmount.toFixed(2).toString() : null;
    }
   return 'No amount detected';
    
  }
}
/**
* Determines the Context of the email.
*
* @param {Message} message - The message currently open.
 * @returns {String}
 */
function getExpenseDescription(message){
  var sender = message.getFrom();
  var subject = message.getSubject();
  return sender + " | " + subject;
}

function  getSheetUrl(){
  var url = PropertiesService.getUserProperties().getProperty('SPREADSHEET_URL');
  //var ss       = SpreadsheetApp.openById('1qbLn3FB7E6zXEW7CGa1zMXXykg2HeU2wDgEQLDZgrRU');
  //var url      = ss.getUrl();
  return url
}

function getRates(date){
  var year = date.getFullYear();
  var month = Number(date.getMonth()+1);
  var day = date.getDate()
  var fullDate = year+'-'+month+'-'+day;
  Logger.log(fullDate);
  var params = '?base=USD&symbols=CAD';
  var url = "https://api.exchangeratesapi.io/"+ fullDate + params;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response);
  response = JSON.parse(response);
  Logger.log(response);
  var rate = Number(response.rates.CAD);
  rate = parseFloat(rate)
  Logger.log(rate);
  return rate
}