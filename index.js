/**
 * App ID for the skill to restrict access
 */
var APP_ID = 'amzn1.ask.skill.be47c335-515f-4d14-9734-539352301711'; //for Anil personal Echo
//var APP_ID = 'amzn1.ask.skill.4f39f83c-bd65-4848-a15a-58fdd817df2c'; //for GE  Echo
//var APP_ID = 'amzn1.ask.skill.e04011d8-663e-41e4-ab6a-325f060b150a';//tom's Echo


/**
var CLIENT_ID = '3MVG9szVa2RxsqBbEn9aQZgROiiGLqd3Tyj97FB3FH3m4TU7uG8VBPEeUwR2f8.ncrIORIQ5KXyKRcoGNSVv0';
var CLIENT_SECRET = '5400340960606276740';
var USERNAME = 'anil@ge.com';
var PASSWORD = 'salesforce123LqsQxQZdy6A42owUAIVY1bKKQ';
var CALLBACK_URL = 'http://localhost:3000/oauth/_callback';
*/
var CLIENT_ID = '3MVG9szVa2RxsqBbEn9aQZgROiiGLqd3Tyj97FB3FH3m4TU7uG8VBPEeUwR2f8.ncrIORIQ5KXyKRcoGNSVv0';
var CLIENT_SECRET = '5400340960606276740';
var USERNAME = 'anil@ge.com';
var PASSWORD = 'salesforce123LqsQxQZdy6A42owUAIVY1bKKQ';
var CALLBACK_URL = 'http://localhost:3000/oauth/_callback';
*/


var CLIENT_ID = '3MVG9qwrtt_SGpCuSzk3Q6MkHSe2XxBc3XjEd.oUM7d9yIbMMQiHHaMaTx_99YXlFra.Hoh_jTlUDGZwSOD5D';
var CLIENT_SECRET = '2212284609771919606';
var USERNAME = 'anil.rai@ge.com.ipspoke';
var PASSWORD = 'salesforce123452sR3j7zqvQNCiKznoS5xw5qI';
var CALLBACK_URL = 'http://localhost:3000/oauth/_callback';


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var nforce = require('nforce');
var _ = require('lodash');
var moment = require('moment-timezone');
var pluralize = require('pluralize');

/**
 * Salesforce is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Salesforce = function () {
    AlexaSkill.call(this, APP_ID);
};

var org = nforce.createConnection({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: CALLBACK_URL,
  mode: 'single'
});

// Extend AlexaSkill
Salesforce.prototype = Object.create(AlexaSkill.prototype);
Salesforce.prototype.constructor = Salesforce;

Salesforce.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Salesforce onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Salesforce.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Salesforce onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Salesforce.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Salesforce onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Salesforce.prototype.intentHandlers = {

  // check the status of an apportunity by name
  OpportunityStatusEvent: function (intent, session, response) {
      handleOpportunityStatusRequest(intent, response);
  },

//Start New code to create Opportunity
  // start the new Opportunity creation process
  OpportunityStartIntent: function (intent, session, response) {
    handleOpportunityStartRequest(session, response);
  },

  // add the name to the Opportunity session
  OpportunityNameIntent: function (intent, session, response) {
    handleOpportunityNameIntent(intent, session, response);
  },

  // add the closing date to the Opportunity session
  OpportunityClosingDateIntent: function (intent, session, response) {
    handleOpportunityClosingDateIntent(intent, session, response);
  },

  // add the stage to the Opportunity session
  OpportunityStageIntent: function (intent, session, response) {
    handleOpportunityStageIntent(intent, session, response);
  },
//END New code to create Opportunity


  // start the new lead creation process
  LeadStartIntent: function (intent, session, response) {
      handleLeadStartRequest(session, response);
  },

  // add the name to the lead session
  LeadNameIntent: function (intent, session, response) {
      handleLeadNameIntent(intent, session, response);
  },

  // get the name and create the lead
  LeadCompanyIntent: function (intent, session, response) {
      handleLeadCompanyIntent(intent, session, response);
  },

  // check for any new leads
  NewLeadsIntent: function (intent, session, response) {
      handleNewLeadsRequest(response);
  },

  // check my calendar
  MyCalendarIntent: function (intent, session, response) {
      handleMyCalendarRequest(response);
  },

  //Start New code to create Event
    // start the new Event creation process
    MyCalendarStartIntent: function (intent, session, response) {
      handleCalendarStartRequest(session, response);
    },

    // add the name to the Event session
    MyCalendarNameIntent: function (intent, session, response) {
      handleCalendarNameIntent(intent, session, response);
    },

    // add the subject to the Event session
    MyCalendarSubjectIntent: function (intent, session, response) {
      handleCalendarSubjectIntent(intent, session, response);
    },

    // add the date to the Event session
    MyCalendarDateIntent: function (intent, session, response) {
      handleCalendarDateIntent(intent, session, response);
    },
  //END New code to create Event

  // help with 'Salesforce'
  HelpIntent: function (intent, session, response) {
      response.ask("You can ask Salesforce to check for any new leads, your calendar for today, the status of a specific opportunity or to create a new lead, or, you can say exit... What can I help you with?");
  }
};

//New code to create new Opportunity

// start a new session to create a Opportunity
function handleOpportunityStartRequest(session, response) {
  var speechOutput = "OK, let's create a new Opportunity., What is the person's first and last name?";
  response.ask(speechOutput);
}

// continue the session, collect the person's name
function handleOpportunityNameIntent(intent, session, response) {
  var speechOutput = "Got it. the name is, " + intent.slots.Name.value + "., What is the closing date for this Opportunity?";
  session.attributes.name = intent.slots.Name.value;
  response.ask(speechOutput);
}

// collect the closing date for this Opportunity
function handleOpportunityClosingDateIntent(intent, session, response) {
  var speechOutput = "Got it. the closing date is, " + intent.slots.Date.value + "., In what stage is this Opportunity?";
  session.attributes.date = intent.slots.Date.value;
  response.ask(speechOutput);
}


// collect the stage for this Opportunity and then create it
function handleOpportunityStageIntent(intent, session, response) {
  var speechOutput = "Bingo! I created a new Opportunity for  "
    + session.attributes.name + " with the date " + session.attributes.date + "and stage "
    + intent.slots.Stage.value;


  var obj = nforce.createSObject('Opportunity');
  obj.set('Name', session.attributes.name);
  obj.set('CloseDate', session.attributes.date);
  obj.set('StageName', intent.slots.Stage.value);

  obj.set('CloseDate', new Date().toISOString());

  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.insert({ sobject: obj })
  }).then(function(results) {
    if (results.success) {
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    } else {
      speechOutput = 'Darn, there was a salesforce problem while creating opportunity, sorry.'+err;
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem while creating opportunity, sorry.'+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}


//End New code to create new Opportunity


// start a new session to create a lead
function handleLeadStartRequest(session, response) {
  var speechOutput = "OK, let's create a new lead., What is the person's first and last name?";
  response.ask(speechOutput);
}

// continue the session, collect the person's name
function handleLeadNameIntent(intent, session, response) {
  var speechOutput = "Got it. the name is, " + intent.slots.Name.value + "., What is the company name?";
  session.attributes.name = intent.slots.Name.value;
  response.ask(speechOutput);
}

// collect the company name and create the actual lead
function handleLeadCompanyIntent(intent, session, response) {
  var speechOutput = "Bingo! I created a new lead for  "
    + session.attributes.name + " with the company name " + intent.slots.Company.value;
  var names = session.attributes.name.split(' ');
  var obj = nforce.createSObject('Lead');
  obj.set('FirstName', names[0]);
  obj.set('LastName', names[1]);
  obj.set('Company', intent.slots.Company.value);

  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.insert({ sobject: obj })
  }).then(function(results) {
    if (results.success) {
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    } else {
      speechOutput = 'Darn, there was a salesforce problem, sorry 1.'+err;
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem, sorry 2'+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}

// fetch an opportunity by name
function handleOpportunityStatusRequest(intent, response) {
  var opportunityName = intent.slots.OpportunityName.value;
  var query = "Select Name, StageName, Probability, Amount from Opportunity where Name = '" + opportunityName + "'";
  // auth and run query
  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.query({ query: query })
  }).then(function(results) {
    var speechOutput = 'Sorry, I could not find an Opportunity named, ' + opportunityName;
    if (results.records.length > 0) {
      var opp = results.records[0];
      speechOutput = 'I found Opportunity ' + opportunityName + ' for $' + opp.get('Amount')
        + ', the stage is ' + opp.get('StageName') + ' and the probability is '
        + opp.get('Probability') + '%';
    }
    response.tellWithCard(speechOutput, "Salesforce", speechOutput);
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem, sorry 3'+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}

// find any calendar events for today
function handleMyCalendarRequest(response) {
  var query = 'select id, StartDateTime, Subject, Who.Name from Event where startdatetime = TODAY order by StartDateTime';
  // auth and run query
  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.query({ query: query })
  }).then(function(results) {
    var speechOutput = 'You have  ' + results.records.length + ' ' + pluralize('event', results.records.length) + ' for today, ';
    _.forEach(results.records, function(rec) {
      speechOutput += 'At ' + moment(rec.get('StartDateTime')).tz('America/New_York').format('h:m a') + ', ' + rec.get('Subject');
      if (rec.get('Who')) speechOutput += ', with  ' + rec.get('Who').Name;
      speechOutput += ', ';
    });
    response.tellWithCard(speechOutput, "Salesforce", speechOutput);
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem, sorry 4'+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}

// find any leads created today
function handleNewLeadsRequest(response) {
  var query = 'Select Name, Company from Lead where CreatedDate = TODAY';
  // auth and run query
  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.query({ query: query })
  }).then(function(results) {
    speechOutput = 'Sorry, you do not have any new leads for today.'
    var recs = results.records;
    if (recs.length > 0) {
      speechOutput = 'You have ' + recs.length + ' new ' + pluralize('lead', recs.length) + ', ';
      for (i=0; i < recs.length; i++){
        speechOutput +=  i+1 + ', ' + recs[i].get('Name') + ' from ' + recs[i].get('Company') + ', ';
        if (i === recs.length-2) speechOutput += ' and ';
      }
      speechOutput += ', Go get them tiger!';
    }
    // Create speech output
    response.tellWithCard(speechOutput, "Salesforce", speechOutput);
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem, sorry error stack is 5- '+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}

//New code to create new Event

// start a new session to create a Event
function handleCalendarStartRequest(session, response) {
  var speechOutput = "OK, let's create a new Event., With whom are you meeting?";
  response.ask(speechOutput);
}

// continue the session, collect the person's name
function handleCalendarNameIntent(intent, session, response) {
  var speechOutput = "Got it. the name is, " + intent.slots.CalendarName.value + "., What is the subject and Date of this meeting?";
  session.attributes.CalendarName = intent.slots.CalendarName.value;

  response.ask(speechOutput);
}

// collect the subhect for this Event
function handleCalendarSubjectIntent(intent, session, response) {
  session.attributes.CalendarSubject = intent.slots.CalendarSubject.value;

  var speechOutput = "Bingo! I created a new Event for  "
    + session.attributes.CalendarName + " with the subject " + session.attributes.CalendarSubject;


    var query = 'Select Name, Company from Lead where CreatedDate = TODAY';
    var leadObj = null;

    // auth and run query
    org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
      return org.query({ query: query })
    }).then(function(results) {
      speechOutput = 'Sorry, you do not have any new leads for today.'
      var recs = results.records;
      if (recs.length > 0) {
        speechOutput = 'You have ' + recs.length + ' new ' + pluralize('lead', recs.length) + ', ';
        for (i=0; i < recs.length; i++){
          leadObj = recs[i];
          speechOutput +=  i+1 + ', ' + recs[i].get('Name') + ' from ' + recs[i].get('Company') + ', ';
          if (i === recs.length-2) speechOutput += ' and ';
        }
        speechOutput += ', Go get them tiger!';
      }
      // Create speech output
      //response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }).error(function(err) {
      var errorOutput = 'Darn, there was a Salesforce problem, sorry error stack is 5- '+err;
      //response.tell(errorOutput, "Salesforce", errorOutput);
    });


  var obj = nforce.createSObject('Event');
  obj.set('WhoId', leadObj);
  obj.set('Subject', session.attributes.CalendarSubject);
  var datetoprint = new Date();
  obj.set('StartDateTime', new Date());
  obj.set('EndDateTime',new Date());
  //obj.set('Location','Milan');
  //obj.set('StartDateTime','2016-01-10T11:00:00Z');
  //obj.set('EndDateTime','2016-01-10T11:00:00Z');
  //obj.set('IsAllDayEvent',true);
  //obj.set('Description',null);

  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.insert({ sobject: obj })
  }).then(function(results) {
    if (results.success) {
      speechOutput = "Bingo! I created a new Event for  "
        + session.attributes.CalendarName + " with the subject " + session.attributes.CalendarSubject;
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    } else {
      speechOutput = 'Darn, there was a salesforce problem while creating event, sorry 1.'+err;
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem while creating event, sorry 2.'+datetoprint+' error - '+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}


// collect the date for this event and then create it
function handleCalendarDateIntent(intent, session, response) {
  var speechOutput = "Bingo! I created a new Event for  "
    + session.attributes.CalendarName + " with the subject " + session.attributes.CalendarSubject + " on "
    + intent.slots.Date.value;


    var query = 'Select Name, Company from Lead where CreatedDate = TODAY';
    var leadObj = null;

    // auth and run query
    org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
      return org.query({ query: query })
    }).then(function(results) {
      speechOutput = 'Sorry, you do not have any new leads for today.'
      var recs = results.records;
      if (recs.length > 0) {
        speechOutput = 'You have ' + recs.length + ' new ' + pluralize('lead', recs.length) + ', ';
        for (i=0; i < recs.length; i++){
          leadObj = recs[i];
          speechOutput +=  i+1 + ', ' + recs[i].get('Name') + ' from ' + recs[i].get('Company') + ', ';
          if (i === recs.length-2) speechOutput += ' and ';
        }
        speechOutput += ', Go get them tiger!';
      }
      // Create speech output
      //response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }).error(function(err) {
      var errorOutput = 'Darn, there was a Salesforce problem, sorry error stack is 5- '+err;
      //response.tell(errorOutput, "Salesforce", errorOutput);
    });


  var obj = nforce.createSObject('Event');
  obj.set('WhoId', leadObj);
  obj.set('Subject', session.attributes.subject);
  var datetoprint = new Date();
  obj.set('StartDateTime', new Date());
  obj.set('EndDateTime',new Date());
  obj.set('Subject','New Event');
  obj.set('Location','Milan');
  //obj.set('StartDateTime','2016-01-10T11:00:00Z');
  //obj.set('EndDateTime','2016-01-10T11:00:00Z');
  obj.set('IsAllDayEvent',true);
  obj.set('Description',null);

  org.authenticate({ username: USERNAME, password: PASSWORD }).then(function(){
    return org.insert({ sobject: obj })
  }).then(function(results) {
    if (results.success) {
      speechOutput = 'New event created!!!!';
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    } else {
      speechOutput = 'Darn, there was a salesforce problem while creating event, sorry 1.'+err;
      response.tellWithCard(speechOutput, "Salesforce", speechOutput);
    }
  }).error(function(err) {
    var errorOutput = 'Darn, there was a Salesforce problem while creating event, sorry 2.'+datetoprint+' error - '+err;
    response.tell(errorOutput, "Salesforce", errorOutput);
  });
}


//End New code to create new Event

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Salesforce skill.
    var salesforce = new Salesforce();
    salesforce.execute(event, context);
};
