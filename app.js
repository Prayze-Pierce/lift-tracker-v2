// ============================================================
// LIFT TRACKER
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================

const BAR_WEIGHT = 45;

const AVAILABLE_PLATES = [
    45,
    25,
    10,
    5,
    2.5
];


// Name used to store our data inside the browser.
const STORAGE_KEY = "liftTrackerData";


// ============================================================
// WORKOUT DATA
//
// IMPORTANT:
// These are DEFAULT values.
//
// Once you change a target inside the app, the current value
// will be stored in localStorage.
//
// Example:
//
// Source code default: 165
// You change it to:    170
//
// The app will use 170 until saved data is cleared.
// ============================================================

const workoutSchedule = {

    // --------------------------------------------------------
    // MONDAY
    // --------------------------------------------------------

    monday: {

        name: "Chest / Tris",

        sections: [

            {
                name: "Neck Work",

                exercises: [

                    {
                        name: "Neck Curls",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    },

                    {
                        name: "Chin Tucks",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    }

                ]
            },


            {
                name: "Strength Circuit",

                exercises: [

                    {
                        id: "mon-incline-smith",

                        name: "Incline Smith Press",

                        sets: 2,
                        minReps: 5,
                        maxReps: 8,

                        weight: 165,
                        unit: "lb",

                        plateLoaded: true
                    },

                    {
                        id: "mon-chest-press",

                        name: "Chest Press",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 130,
                        unit: "lb",

                        note: "Back: 3 | Seat: 3"
                    },

                    {
                        id: "mon-pec-deck",

                        name: "Pec Deck",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 110,
                        unit: "lb",

                        note: "Bars: 5 | Seat: 1"
                    },

                    {
                        id: "mon-triceps-pushdown",

                        name: "Cable Triceps Pushdown",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 7,
                        unit: "setting"
                    },

                    {
                        id: "mon-overhead-triceps",

                        name: "Overhead Cable Triceps Extension",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 7,
                        unit: "setting"
                    }

                ]
            }

        ]
    },


    // --------------------------------------------------------
    // TUESDAY
    // --------------------------------------------------------

    tuesday: {

        name: "Back / Bis",

        sections: [

            {
                name: "Neck Work",

                exercises: [

                    {
                        name: "Neck Curls",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    },

                    {
                        name: "Chin Tucks",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    }

                ]
            },


            {
                name: "Strength Circuit",

                exercises: [

                    {
                        id: "tue-lat-pulldown",

                        name: "Lat Pulldown",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 275,
                        unit: "lb"
                    },

                    {
                        id: "tue-chest-supported-row",

                        name: "Chest-Supported Row",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 225,
                        unit: "lb"
                    },

                    {
                        id: "tue-single-arm-pulldown",

                        name: "Single-Arm Cable Lat Pulldown",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 4,
                        unit: "setting"
                    },

                    {
                        id: "tue-bb-curl",

                        name: "BB Curl",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 135,
                        unit: "lb"
                    },

                    {
                        id: "tue-incline-db-curl",

                        name: "Incline DB Curl",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 135,
                        unit: "lb"
                    }

                ]
            }

        ]
    },


    // --------------------------------------------------------
    // WEDNESDAY
    // --------------------------------------------------------

    wednesday: {

        name: "Legs",

        sections: [

            {
                name: "Neck Work",

                exercises: [

                    {
                        name: "Neck Curls",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    },

                    {
                        name: "Chin Tucks",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    }

                ]
            },


            {
                name: "Strength Circuit",

                exercises: [

                    {
                        id: "wed-leg-press",

                        name: "Leg Press",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        // 8 total 45 lb plates
                        weight: 360,
                        unit: "lb",

                        plateLoaded: true,

                        // No 45 lb bar on the leg press.
                        barWeight: 0
                    },

                    {
                        id: "wed-leg-extension",

                        name: "Leg Extension",

                        sets: 2,
                        minReps: 8,
                        maxReps: 10,

                        weight: 145,
                        unit: "setting"
                    },

                    {
                        id: "wed-leg-curl",

                        name: "Leg Curl",

                        sets: 2,
                        minReps: 8,
                        maxReps: 10,

                        weight: 115,
                        unit: "setting"
                    }

                ]
            }

        ]
    },


    // --------------------------------------------------------
    // THURSDAY
    // --------------------------------------------------------

    thursday: {

        name: "Shoulders / Arms",

        sections: [

            {
                name: "Neck Work",

                exercises: [

                    {
                        name: "Neck Curls",
                        sets: 2,
                        minReps: 15,
                        maxReps: 15
                    },

                    {
                        name: "Chin Tucks",
                        sets: 2,
                        minReps: 15,
                        maxReps: 15
                    }

                ]
            },


            {
                name: "Strength Circuit",

                exercises: [

                    {
                        id: "thu-shoulder-press",

                        name: "Machine Shoulder Press",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 160,
                        unit: "setting"
                    },

                    {
                        id: "thu-lateral-raise",

                        name: "Cable Lateral Raise",

                        sets: 2,
                        minReps: 8,
                        maxReps: 15,

                        weight: 60,
                        unit: "setting"
                    },

                    {
                        id: "thu-reverse-pec-deck",

                        name: "Reverse Pec Deck",

                        sets: 2,
                        minReps: 8,
                        maxReps: 10,

                        weight: 12,
                        unit: "setting"
                    },

                    {
                        id: "thu-preacher-curl",

                        name: "Preacher Curl",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 50,
                        unit: "lb"
                    },

                    {
                        id: "thu-hammer-curl",

                        name: "Hammer Curl",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 40,
                        unit: "lb"
                    },

                    {
                        id: "thu-rope-pushdown",

                        name: "Rope Pushdown",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 40,
                        unit: "setting"
                    },

                    {
                        id: "thu-overhead-extension",

                        name: "Overhead Cable Extension",

                        sets: 2,
                        minReps: 8,
                        maxReps: 12,

                        weight: 40,
                        unit: "setting"
                    }

                ]
            }

        ]
    },


    // --------------------------------------------------------
    // FRIDAY
    // --------------------------------------------------------

    friday: {

        name: "Upper Body (Heavy)",

        sections: [

            {
                name: "Neck Work",

                exercises: [

                    {
                        name: "Neck Curls",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    },

                    {
                        name: "Chin Tucks",
                        sets: 2,
                        minReps: 20,
                        maxReps: 20
                    }

                ]
            },


            {
                name: "Strength Circuit",

                exercises: [

                    {
                        id: "fri-incline-smith",

                        name: "Incline Smith",

                        sets: 2,
                        minReps: 5,
                        maxReps: 8,

                        weight: 175,
                        unit: "lb"
                    },

                    {
                        id: "fri-lat-pulldown",

                        name: "Lat Pulldown",

                        sets: 2,
                        minReps: 5,
                        maxReps: 8,

                        weight: 20,
                        unit: "setting"
                    },

                    {
                        id: "fri-chest-supported-row",

                        name: "Chest Supported Row",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 100,
                        unit: "lb"
                    },

                    {
                        id: "fri-machine-chest-press",

                        name: "Machine Chest Press",

                        sets: 2,
                        minReps: 6,
                        maxReps: 10,

                        weight: 30,
                        unit: "setting"
                    },

                    {
                        id: "fri-cable-lat-raise",

                        name: "Cable Lat Raise",

                        sets: 2,
                        minReps: 8,
                        maxReps: 10,

                        weight: 9,
                        unit: "setting"
                    }

                ]
            }

        ]
    }

};


// ============================================================
// LOCAL STORAGE
// ============================================================

/*
    localStorage can only store strings.

    Therefore we store one JavaScript object by converting it
    to JSON.

    Our saved object looks roughly like:

    {
        targets: {
            "mon-incline-smith": 170,
            "mon-chest-press": 130
        },

        ratings: {
            "mon-incline-smith": "Good"
        }
    }
*/


function loadAppData() {

    const savedData =
        localStorage.getItem(STORAGE_KEY);


    // Nothing has ever been saved.
    if (savedData === null) {

        return {
            targets: {},
            ratings: {}
        };

    }


    try {

        return JSON.parse(savedData);

    }

    catch (error) {

        console.error(
            "Could not read saved Lift Tracker data:",
            error
        );


        return {
            targets: {},
            ratings: {}
        };

    }

}


function saveAppData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );

}


// Load saved information when the app starts.
const appData = loadAppData();


// Make sure these objects exist even if we later change
// the storage format.

if (!appData.targets) {
    appData.targets = {};
}

if (!appData.ratings) {
    appData.ratings = {};
}


// ============================================================
// PLATE CALCULATOR
// ============================================================

function calculatePlates(
    totalWeight,
    barWeight = BAR_WEIGHT
) {

    let weightPerSide =
        (totalWeight - barWeight) / 2;


    if (weightPerSide < 0) {
        return null;
    }


    const result = [];


    for (const plate of AVAILABLE_PLATES) {

        let count = 0;


        while (
            weightPerSide >=
            plate - 0.001
        ) {

            weightPerSide -= plate;

            count++;

        }


        if (count > 0) {

            result.push({

                weight: plate,

                count: count

            });

        }

    }


    if (weightPerSide > 0.001) {
        return null;
    }


    return result;
}

// ============================================================
// PROGRESSION
// ============================================================

function calculateNextTarget(currentTarget, unit, rating) {

    let newTarget = Number(currentTarget);


    // Make sure the target is actually a number.
    if (Number.isNaN(newTarget)) {
        return currentTarget;
    }


    // --------------------------------------------------------
    // EASY
    // --------------------------------------------------------

    if (rating === "Easy") {

        if (unit === "lb") {
            newTarget += 10;
        }

        else if (unit === "setting") {
            newTarget += 2;
        }

    }


    // --------------------------------------------------------
    // GOOD
    // --------------------------------------------------------

    else if (rating === "Good") {

        if (unit === "lb") {
            newTarget += 5;
        }

        else if (unit === "setting") {
            newTarget += 1;
        }

    }


    // --------------------------------------------------------
    // BARELY
    // --------------------------------------------------------

    else if (rating === "Barely") {

        // Keep the same target.
        newTarget = currentTarget;

    }


    // --------------------------------------------------------
    // FAILED
    // --------------------------------------------------------

    else if (rating === "Failed") {

        if (unit === "lb") {
            newTarget -= 5;
        }

        else if (unit === "setting") {
            newTarget -= 1;
        }

    }


    // --------------------------------------------------------
    // SAFETY LIMITS
    // --------------------------------------------------------

    // Machine settings cannot go below 1.
    if (unit === "setting" && newTarget < 1) {
        newTarget = 1;
    }


    // Pound targets cannot go below 0.
    if (unit === "lb" && newTarget < 0) {
        newTarget = 0;
    }


    return newTarget;
}

// ============================================================
// DATE
// ============================================================

const today = new Date();


const dayNames = [

    "sunday",

    "monday",

    "tuesday",

    "wednesday",

    "thursday",

    "friday",

    "saturday"

];


// ============================================================
// TESTING DAY
// ============================================================

/*
    Keep Monday forced while we're developing.

    When we're ready for normal operation, replace this:

        const currentDay = "monday";

    with:

        const currentDay = dayNames[today.getDay()];
*/

const currentDay = dayNames[today.getDay()];


// ============================================================
// HTML REFERENCES
// ============================================================

const workoutTitle =
    document.getElementById("workout-title");


const currentDate =
    document.getElementById("current-date");


const workoutContainer =
    document.getElementById("workout-container");


// ============================================================
// DISPLAY DATE
// ============================================================

currentDate.textContent =
    today.toLocaleDateString(

        undefined,

        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }

    );


// ============================================================
// GET TODAY'S WORKOUT
// ============================================================

const workout =
    workoutSchedule[currentDay];


// ============================================================
// REST DAY
// ============================================================

if (!workout) {

    workoutTitle.textContent =
        "Rest Day";


    workoutContainer.innerHTML = `

        <div class="rest-day">
            No workout scheduled today.
        </div>

    `;

}


// ============================================================
// WORKOUT DAY
// ============================================================

else {

    workoutTitle.textContent =
        workout.name;


    workout.sections.forEach(section => {


        const sectionElement =
            document.createElement("div");


        sectionElement.className =
            "workout-section";


        const sectionTitle =
            document.createElement("h2");


        sectionTitle.className =
            "section-title";


        sectionTitle.textContent =
            section.name;


        sectionElement.appendChild(
            sectionTitle
        );


        // ====================================================
        // EXERCISES
        // ====================================================

        section.exercises.forEach(exercise => {


            const card =
                document.createElement("div");


            card.className =
                "exercise-card";


            // ------------------------------------------------
            // NAME
            // ------------------------------------------------

            const name =
                document.createElement("h3");


            name.className =
                "exercise-name";


            name.textContent =
                exercise.name;


            card.appendChild(name);


            // ------------------------------------------------
            // SETS / REPS
            // ------------------------------------------------

            const target =
                document.createElement("p");


            target.className =
                "exercise-target";


            if (
                exercise.minReps ===
                exercise.maxReps
            ) {

                target.textContent =
                    `${exercise.sets} sets × ${exercise.minReps} reps`;

            }

            else {

                target.textContent =
                    `${exercise.sets} sets × ${exercise.minReps}-${exercise.maxReps} reps`;

            }


            card.appendChild(target);


            // ------------------------------------------------
            // NOTES
            // ------------------------------------------------

            if (exercise.note) {

                const note =
                    document.createElement("p");


                note.className =
                    "exercise-note";


                note.textContent =
                    exercise.note;


                card.appendChild(note);

            }


            // =================================================
            // EDITABLE WEIGHT
            // =================================================

            if (exercise.weight !== undefined) {


                const weightArea =
                    document.createElement("div");


                weightArea.className =
                    "weight-area";


                const weightLabel =
                    document.createElement("p");


                weightLabel.className =
                    "weight-label";


                weightLabel.textContent =
                    "Target";


                weightArea.appendChild(
                    weightLabel
                );


                // ------------------------------------------------
                // INPUT ROW
                // ------------------------------------------------

                const inputRow =
                    document.createElement("div");


                inputRow.className =
                    "weight-input-row";


                const weightInput =
                    document.createElement("input");


                weightInput.className =
                    "weight-input";


                // =================================================
                // LOAD SAVED TARGET
                // =================================================

                /*
                    ?? means:

                    Use the saved value IF one exists.

                    Otherwise use exercise.weight.

                    Similar idea to:

                    savedValue != null
                        ? savedValue
                        : exercise.weight
                */

                const currentTarget =
                    appData.targets[exercise.id]
                    ?? exercise.weight;


                weightInput.value =
                    currentTarget;


                if (exercise.unit === "lb") {

                    weightInput.type =
                        "number";


                    weightInput.step =
                        "2.5";

                }

                else {

                    weightInput.type =
                        "text";

                }


                inputRow.appendChild(
                    weightInput
                );


                // ------------------------------------------------
                // UNIT
                // ------------------------------------------------

                const unitLabel =
                    document.createElement("span");


                unitLabel.className =
                    "unit-label";


                if (exercise.unit === "lb") {

                    unitLabel.textContent =
                        "lb";

                }

                else {

                    unitLabel.textContent =
                        "setting";

                }


                inputRow.appendChild(
                    unitLabel
                );


                weightArea.appendChild(
                    inputRow
                );


                // =================================================
                // SAVE WEIGHT WHEN CHANGED
                // =================================================

                weightInput.addEventListener(
                    "change",
                    () => {


                        let newValue;


                        if (exercise.unit === "lb") {

                            newValue =
                                Number(weightInput.value);


                            if (
                                Number.isNaN(newValue)
                            ) {

                                return;

                            }

                        }

                        else {

                            newValue =
                                weightInput.value;

                        }


                        appData.targets[exercise.id] =
                            newValue;


                        saveAppData();


                        console.log(
                            `${exercise.name} saved as ${newValue}`
                        );

                    }
                );


                // =================================================
                // PLATE CALCULATOR
                // =================================================

                if (
                    exercise.unit === "lb" &&
                    exercise.plateLoaded === true
                ) {


                    const plateDisplay =
                        document.createElement("div");


                    plateDisplay.className =
                        "plate-display";


                    function updatePlateDisplay() {


                        const enteredWeight =
                            Number(weightInput.value);


                        if (
                            Number.isNaN(enteredWeight)
                        ) {

                            plateDisplay.textContent =
                                "Enter a valid weight.";

                            return;

                        }


                        const barWeight =
                            exercise.barWeight
                            ?? BAR_WEIGHT;


                        const plates =
                            calculatePlates(
                                enteredWeight,
                                barWeight
                            );


                        if (plates === null) {

                            plateDisplay.textContent =
                                "Cannot make this weight with available plates.";

                            return;

                        }


                        if (plates.length === 0) {

                            if (barWeight > 0) {

                                plateDisplay.textContent =
                                    `${barWeight} lb bar only`;

                            }

                            else {

                                plateDisplay.textContent =
                                    "No plates required";

                            }


                            return;

                        }


                        const plateText =
                            plates

                                .map(
                                    plate =>
                                        `${plate.count} × ${plate.weight} lb`
                                )

                                .join(" + ");


                        plateDisplay.textContent =
                            `Per side: ${plateText}`;

                    }


                    updatePlateDisplay();


                    weightInput.addEventListener(
                        "input",
                        updatePlateDisplay
                    );


                    weightArea.appendChild(
                        plateDisplay
                    );

                }


                card.appendChild(
                    weightArea
                );

            }


            // =================================================
            // DIFFICULTY
            //
            // Only exercises with IDs are tracked.
            // Neck work currently does not need progression.
            // =================================================

            if (exercise.id) {


                const difficultyArea =
                    document.createElement("div");


                difficultyArea.className =
                    "difficulty-area";


                const difficultyLabel =
                    document.createElement("p");


                difficultyLabel.className =
                    "difficulty-label";


                difficultyLabel.textContent =
                    "How did it feel?";


                difficultyArea.appendChild(
                    difficultyLabel
                );


                const difficultyButtons =
                    document.createElement("div");


                difficultyButtons.className =
                    "difficulty-buttons";


                const ratings = [

                    "Easy",

                    "Good",

                    "Barely",

                    "Failed"

                ];


                ratings.forEach(rating => {


                    const button =
                        document.createElement("button");


                    button.className =
                        "difficulty-button";


                    button.textContent =
                        rating;


                    // -----------------------------------------
                    // RESTORE SAVED SELECTION
                    // -----------------------------------------

                    if (
                        appData.ratings[exercise.id]
                        === rating
                    ) {

                        button.classList.add(
                            "selected"
                        );

                    }


                    // -----------------------------------------
                    // BUTTON CLICK
                    // -----------------------------------------

                    button.addEventListener(
                        "click",
                        () => {


                            const buttons =
                                difficultyButtons
                                    .querySelectorAll(
                                        ".difficulty-button"
                                    );


                            buttons.forEach(
                                otherButton => {

                                    otherButton
                                        .classList
                                        .remove(
                                            "selected"
                                        );

                                }
                            );


                            button.classList.add(
                                "selected"
                            );


                            // Save rating.
                            appData.ratings[exercise.id] =
                                rating;


                            saveAppData();


                            console.log(
                                `${exercise.name}: ${rating}`
                            );

                        }
                    );


                    difficultyButtons.appendChild(
                        button
                    );

                });


                difficultyArea.appendChild(
                    difficultyButtons
                );


                card.appendChild(
                    difficultyArea
                );

            }


            sectionElement.appendChild(
                card
            );

        });


        workoutContainer.appendChild(
            sectionElement
        );

    });
}
// ============================================================
// FINISH WORKOUT
// ============================================================

if (workout) {

    const finishButton =
        document.createElement("button");


    finishButton.className =
        "finish-workout-button";


    finishButton.textContent =
        "Finish Workout";


    workoutContainer.appendChild(
        finishButton
    );


    // ========================================================
    // FINISH BUTTON CLICK
    // ========================================================

    finishButton.addEventListener(
        "click",
        () => {


            // ------------------------------------------------
            // CHECK THAT EVERY STRENGTH EXERCISE HAS A RATING
            // ------------------------------------------------

            const unratedExercises = [];


            workout.sections.forEach(section => {

                section.exercises.forEach(exercise => {


                    // Exercises without IDs, such as neck work,
                    // do not need ratings.
                    if (!exercise.id) {
                        return;
                    }


                    if (!appData.ratings[exercise.id]) {

                        unratedExercises.push(
                            exercise.name
                        );

                    }

                });

            });


            // ------------------------------------------------
            // STOP IF SOMETHING HAS NOT BEEN RATED
            // ------------------------------------------------

            if (unratedExercises.length > 0) {

                alert(
                    "Rate every strength exercise before finishing your workout."
                );

                return;
            }


            // ------------------------------------------------
            // APPLY PROGRESSION
            // ------------------------------------------------

            workout.sections.forEach(section => {

                section.exercises.forEach(exercise => {


                    if (!exercise.id) {
                        return;
                    }


                    // Get current target.
                    const currentTarget =
                        appData.targets[exercise.id]
                        ?? exercise.weight;


                    // Get today's rating.
                    const rating =
                        appData.ratings[exercise.id];


                    // Calculate next workout's target.
                    const newTarget =
                        calculateNextTarget(
                            currentTarget,
                            exercise.unit,
                            rating
                        );


                    // Save the new target.
                    appData.targets[exercise.id] =
                        newTarget;


                    console.log(
                        `${exercise.name}: ${currentTarget} -> ${newTarget}`
                    );

                });

            });


            // ------------------------------------------------
            // CLEAR TODAY'S RATINGS
            // ------------------------------------------------

            workout.sections.forEach(section => {

                section.exercises.forEach(exercise => {


                    if (!exercise.id) {
                        return;
                    }


                    delete appData.ratings[
                        exercise.id
                    ];

                });

            });


            // ------------------------------------------------
            // SAVE EVERYTHING
            // ------------------------------------------------

            saveAppData();


            // ------------------------------------------------
            // CONFIRM
            // ------------------------------------------------

            alert(
                "Workout finished! Your next targets have been updated."
            );


            // Reload page so the new targets appear.
            location.reload();

        }
    );

}