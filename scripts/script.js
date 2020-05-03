var firebaseConfig = {
    apiKey: "AIzaSyAl7n-491RillgKM26yYTY_7C3zjLXU2pE",
    authDomain: "quarantine4kids-5cfbf.firebaseapp.com",
    databaseURL: "https://quarantine4kids-5cfbf.firebaseio.com",
    projectId: "quarantine4kids-5cfbf",
    storageBucket: "quarantine4kids-5cfbf.appspot.com",
    messagingSenderId: "820598508139",
    appId: "1:820598508139:web:a92ceb278e1020296abf2e",
    measurementId: "G-R7WWB7Z319"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

$( document ).ready(function() {

    getAllClasses();

});

const colors = [
    "#FC515C",
    "#4C58E0",
    "#27AAE2",
    "#555"
];

function getAllClasses() {
    db.ref('/classes').once('value').then(function(snapshot) {
        const data = snapshot.val();
        const keys = Object.keys(data);

        var workshopList = [];
        for (var i = 0; i < keys.length; i++) {
            workshopList.push(data[keys[i]]);
        }

        addWorkshops(workshopList)
      });
}

function addWorkshops(workshopList) {
    var count = 0;
    workshopList.forEach(function(workshop) {

        addClass(workshop, colors[count % 4]);
        count++;

    });
}

function addStartRow() {
    let addition = '<div class="row">';
    $("#classContainer").html($("#classContainer").html() + addition);
}

function addEndRow() {
    let addition = '</div>';
    $("#classContainer").html($("#classContainer").html() + addition);
}

function addClass(workshop, color) {
    const photo = workshop.photo;
    const name = workshop.name;
    const link = workshop.link;
    const descr = workshop.descr;
    const age = workshop.age;
    const type = workshop.type;
    const date = workshop.date;

    console.log(link)

    
    var addition = '<div class="col-md-4" style="float: left;">' + 
                        '<div class="class-modal" style="padding: 20px; border-bottom: solid 10px ' + color + ';">' +
                            '<img class="class-modal-img" src="' + 
                            photo + 
                            '"/>' + 
                            '<div style="width: 100%; height: 10px; background-color: ' + color + ';"></div>' +
                            '<div class="row">' +
                                '<div class="col-md-12" style="padding: 15px !important;">' +
                                    '<p style="font-weight: bold; font-size: large; margin: 0px; margin-left: 15px;">' +
                                        name +
                                    '</p>' +
                                    '<p style="font-weight: bold; font-size: medium; margin: 0px; color: #777; margin-left: 15px;">Ages ' +
                                        age + ' (' + type + ')' +
                                    '</p>' +
                                    '<p style="font-weight: bold; font-size: medium; margin: 0px; color: ' + color + ' !important; margin-left: 15px;">' +
                                        date +
                                    '</p>' +
                                '</div>' + 
                            '</div>' +
                            '<div>' +
                                '<p style="font-weight: bold; font-size: smaller; margin: 0px; margin-left: 15px; margin-right: 15px; padding-bottom: 20px;">' +
                                    descr +
                                '</p>' +
                                '<p style="color: ' + color + '; margin: 0px; text-align: center;" class="col-md-12">100% Free</p>' +
                                    '<button class="col-md-8 offset-md-2 signupbutton white" style="background-color: ' + color + ';" onclick="launchInNewTab(' + "'" + link + "'" + ')" target="_blank">Sign Up</button><br><br>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
    $("#classContainer").html($("#classContainer").html() + addition);
}

function launchInNewTab(link) {
    console.log(link)
    window.open(link, "_blank");
}

// Filter Methods
function getFilteredClasses(filter) {
    db.ref('/classes').once('value').then(function(snapshot) {
        const data = snapshot.val();
        const keys = Object.keys(data);

        var workshopList = [];
        for (var i = 0; i < keys.length; i++) {
            var obj = data[keys[i]];

            if (obj.type === filter) {
                workshopList.push(obj);
            }
        }

        addWorkshops(workshopList)
      });
}

function getAgeClasses(filter) {
    db.ref('/classes').once('value').then(function(snapshot) {
        const data = snapshot.val();
        const keys = Object.keys(data);

        var workshopList = [];
        for (var i = 0; i < keys.length; i++) {
            var obj = data[keys[i]];

            if (obj.age === filter) {
                workshopList.push(obj);
            }
        }

        addWorkshops(workshopList)
      });
}

function allClasses() {
    $("#classContainer").html("");
    $("#classTitle").html("All Classes")
    getAllClasses();
}

function drawingClasses() {
    $("#classContainer").html("");
    $("#classTitle").html("Drawing")
    getFilteredClasses("drawing");
}

function readingClasses() {
    $("#classContainer").html("");
    $("#classTitle").html("Reading")
    getFilteredClasses("reading");
}

function craftClasses() {
    $("#classContainer").html("");
    $("#classTitle").html("Craft")
    getFilteredClasses("craft");
}

function ages3_6() {
    $("#classContainer").html("");
    $("#classTitle").html("Ages 3-6")
    getAgeClasses("3-6");
}

function ages6_9() {
    $("#classContainer").html("");
    $("#classTitle").html("Ages 6-9")
    getAgeClasses("6-9");
}

function ages8_12() {
    $("#classContainer").html("");
    $("#classTitle").html("Ages 9-12")
    getAgeClasses("9-12");
}


function ages12_15() {
    $("#classContainer").html("");
    $("#classTitle").html("Ages 12-15")
    getAgeClasses("12-15");
}

// Links
function goToInnerArtists() {
    window.open( 
        "https://docs.google.com/presentation/d/1LBa0FGergME2v215YNUV9Hl43MCSaUPR1qgVqP4GJsg/edit?fbclid=IwAR1rzBQeIMvKaVVBAqZffH0qwUSFYpO7aD1f0m8Jf9qanz_8pLKbLUGsyl8#slide=id.g76dd172e27_0_7", 
        "_blank"
    ); 
}

function goToPreviousReadings() {
    window.open(
        "https://docs.google.com/spreadsheets/d/1Fh7FpTuZdxJtGld3uG5Fep7wsCyU9IS6Czff3_WDIF4/edit?usp=sharing",
        "_blank"
    );
}

function goToGoFundMe() {
    window.open(
        "https://www.gofundme.com/f/quarantine4kids-campaign-for-feeding-america",
        "_blank"
    );
}

function goToDonate() {
    location.href = "#donate"
}

function goToVolunteerForm() {
    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSc5mGcTubwFFM0k26DyD36S7m4H0qMhz5AQsyIRA9zKqS1RUA/viewform",
        "_blank"
    )
}

function goToClasses() {
    location.href = "#classes"
}

function goToResources() {
    location.href = "#resources"
}

function goToGetInvolved() {
    location.href= "#getInvolved"
}

function goToMailingListForm() {
    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLScE5amDxce6X7Gtg0eo6qJalwq2KuqZbU616M3JTTsaD5JJVA/viewform",
        "_blank"
    );
}

function emailQ4K() {
    window.open('mailto:quarantine4kids@gmail.com');
}

