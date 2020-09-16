//Config
var profileUrlCol = "I";
var profileHTMLCol= "J";
var sheetName="profiles";
var ss = SpreadsheetApp.getActive();
var proSheet = ss.getSheetByName(sheetName);

//UI Setup
const ui = SpreadsheetApp.getUi();

function onOpen() {
    ui.createMenu('Jarvis')
        .addItem('Update All Porfiles', 'buildHTML')
        .addToUi();
}

//Helper function
function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return Number(column);
}

var row = 2;
//Get profile JSON
function getProfile() {
    var profileUrlColIndex = letterToColumn(profileUrlCol)
    var url = proSheet.getRange(row, profileUrlColIndex).getValue();
    var json = UrlFetchApp.fetch(url).getContentText();
    json = JSON.parse(json);

    row += 1;
    return json
}

//Main loop
function buildHTML() {
    for (var j = 2; j < proSheet.getLastRow() + 1; j++) {
        var rawHtml = HtmlService.createTemplateFromFile("profile_template").evaluate().getContent();
        proSheet.getRange(j, 10).setValue(rawHtml.trim());
    }
}


function log() {
    Logger.log(sheetName)
    PropertiesService.getScriptProperties().setProperty('index', 2)
    var ss = SpreadsheetApp.getActive();
    var proSheet = ss.getSheetByName('available profiles');
    Logger.log(proSheet.getLastRow())
}