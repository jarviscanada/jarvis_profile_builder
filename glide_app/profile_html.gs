//Config
var profileUrlCol = "G";
var profileHTMLCol = "H";
var nameCol = "A";
var sheetName = "profiles";
var ss = SpreadsheetApp.getActive();
var proSheet = ss.getSheetByName(sheetName);
var row = 2;
var profileArr = [];

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Jarvis')
    .addItem('Update All Porfiles', 'buildHTML')
    .addToUi();
}

//Helper function
function letterToColumn(letter) {
  var column = 0,
    length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return Number(column);
}

//Get profile JSON
function getProfile() {
  var profileUrlColIndex = letterToColumn(profileUrlCol)
  var url = proSheet.getRange(row, profileUrlColIndex).getValue();
  
  if (!url) {
    return null;
  }
  
  var json = UrlFetchApp.fetch(url).getContentText();
  json = JSON.parse(json);
//
  row += 1;
  return json;
}

function getName(row_num) {
  var nameIndex = letterToColumn(nameCol)
  var name = proSheet.getRange(row_num, nameIndex).getValue();
  return name;
}


//Main loop
var emptyNameCount=0
function buildHTML() {
  for (var j = 2; j < proSheet.getLastRow() + 1; j++) {
    row = j;
    if (getName(j)) {
      emptyNameCount = 0;
      var rawHtml = HtmlService.createTemplateFromFile("profile_template").evaluate().getContent();
      var profileHTMLColIndex = letterToColumn(profileHTMLCol)
      proSheet.getRange(j, profileHTMLColIndex).setValue(rawHtml.trim());
    } else if (emptyNameCount > 10) { 
      break;
    } else {
      emptyNameCount += 1 
    } 
  }
}


function log() {
  Logger.log(sheetName)
  PropertiesService.getScriptProperties().setProperty('index', 2)
  var ss = SpreadsheetApp.getActive();
  var proSheet = ss.getSheetByName('available profiles');
  Logger.log(proSheet.getLastRow())
}
