//Config
var profileUrlCol = "L";
var profileHTMLCol = "M";
var nameCol = "A";
var sheetName = "profiles";
var ss = SpreadsheetApp.getActive();
var proSheet = ss.getSheetByName(sheetName);
//var row;
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
function getProfile(row_num) {
  var profileUrlColIndex = letterToColumn(profileUrlCol)
  var url = proSheet.getRange(row_num, profileUrlColIndex).getValue().trim();

  if (!url) {
    return null;
  }

  var json
  try {
    json = UrlFetchApp.fetch(url).getContentText();
    json = JSON.parse(json);
  } catch (err) {
    json = null;
  }
  //row += 1;
  return json;
}

function getName(row_num) {
  var nameIndex = letterToColumn(nameCol)
  var name = proSheet.getRange(row_num, nameIndex).getValue();
  return name;
}

function writeHtml(row_num) {
  var jsonProfile = getProfile(row_num);
  var template_file;
  var renderedHtmp;
  if (!jsonProfile) {
    //empty
    renderedHtmp = 'Profile is not availble, please contact your Jarvis account manager';
  } else {
    if (jsonProfile.hasOwnProperty('template')) {
      //special tempalte
      template_file = jsonProfile.template;
    } else {
      //current template
      template_file = "profile_template";
    }
    try {
      var htmlTemp = HtmlService.createTemplateFromFile(template_file);
      htmlTemp.profile = jsonProfile
      renderedHtmp = htmlTemp.evaluate().getContent();
    } catch (err) {
      renderedHtmp = 'Profile is not availble, please contact your Jarvis account manager (template error)';
    }
  }

  //write html google google sheet cell
  var profileHTMLColIndex = letterToColumn(profileHTMLCol)
  proSheet.getRange(row_num, profileHTMLColIndex).setValue(renderedHtmp.trim());
}

//Main loop
var emptyNameCount = 0

function buildHTML() {
  for (var j = 2; j < proSheet.getLastRow() + 1; j++) {
    //row = j;
    if (getName(j)) {
      emptyNameCount = 0;
      writeHtml(j);
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