const STORAGE_KEY = "liftTrackerV2";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const RATINGS = [
    "Easy",
    "Good",
    "Barely",
    "Failed"
];

const BAR_WEIGHT = 45;

const AVAILABLE_PLATES = [
    45,
    25,
    10,
    5,
    2.5
];


const pageTitle =
    document.getElementById("page-title");

const pageSubtitle =
    document.getElementById("page-subtitle");

const appContainer =
    document.getElementById("app-container");

const menuButton =
    document.getElementById("menu-button");


/* =========================================================
   DATA
========================================================= */

function createDefaultData() {

    return {
        setupComplete: false,
        name: "",
        trainingDays: [],
        workouts: {},
        ratings: {}
    };
}


function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);


    if (!saved) {
        return createDefaultData();
    }


    try {

        const loaded =
            JSON.parse(saved);


        return {
            ...createDefaultData(),
            ...loaded,
            ratings: loaded.ratings || {},
            workouts: loaded.workouts || {}
        };

    } catch (error) {

        console.error(
            "Could not load Lift Tracker data:",
            error
        );

        return createDefaultData();
    }
}


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );
}


let appData =
    loadData();


/* =========================================================
   HELPERS
========================================================= */

function clearScreen() {
    appContainer.innerHTML = "";
}


function setHeader(
    title,
    subtitle = ""
) {

    pageTitle.textContent =
        title;

    pageSubtitle.textContent =
        subtitle;
}


function showMenuButton() {

    if (appData.setupComplete) {

        menuButton.classList.remove(
            "hidden"
        );

    } else {

        menuButton.classList.add(
            "hidden"
        );
    }
}


function createID() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 7)
    );
}


function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function positiveNumber(
    value,
    fallback
) {

    const number =
        Number(value);


    if (
        !Number.isFinite(number) ||
        number < 1
    ) {

        return fallback;
    }


    return number;
}


/* =========================================================
   CURRENT DAY
========================================================= */

function getCurrentDay() {

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    return dayNames[
        new Date().getDay()
    ];
}


function getFormattedDate() {

    return new Date()
        .toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );
}


/* =========================================================
   MENU
========================================================= */

menuButton.addEventListener(
    "click",
    showMenu
);


function showMenu() {

    clearScreen();

    setHeader(
        "Menu",
        `Lift Tracker for ${appData.name}`
    );


    appContainer.innerHTML = `

        <div class="menu-card">

            <button
                id="menu-workout"
                class="menu-option"
                type="button"
            >
                Back to Workout
            </button>


            <button
                id="menu-edit-lifts"
                class="menu-option"
                type="button"
            >
                Edit Lifts
            </button>


            <button
                id="menu-days"
                class="menu-option"
                type="button"
            >
                Change Workout Days
            </button>

        </div>
    `;


    document
        .getElementById(
            "menu-workout"
        )
        .addEventListener(
            "click",
            showTodayWorkout
        );


    document
        .getElementById(
            "menu-edit-lifts"
        )
        .addEventListener(
            "click",
            showEditRoutine
        );


    document
        .getElementById(
            "menu-days"
        )
        .addEventListener(
            "click",
            showEditDays
        );
}


/* =========================================================
   NAME SETUP
========================================================= */

function showNameSetup() {

    clearScreen();


    menuButton.classList.add(
        "hidden"
    );


    setHeader(
        "Welcome",
        "Let's build your Lift Tracker."
    );


    appContainer.innerHTML = `

        <div class="card">

            <h2>
                What's your name?
            </h2>


            <p style="color:#999;">
                Your workout data stays
                on this device.
            </p>


            <div class="input-group">

                <label for="name-input">
                    Name
                </label>

                <input
                    id="name-input"
                    type="text"
                    maxlength="30"
                    placeholder="Enter your name"
                >

            </div>


            <button
                id="continue-name"
                class="primary-button"
                type="button"
            >
                Continue
            </button>


            <div
                style="
                    margin:24px 0 18px;
                    border-top:1px solid #292929;
                "
            ></div>


            <p
                style="
                    color:#999;
                    text-align:center;
                    margin-bottom:12px;
                "
            >
                Already used Lift Tracker?
            </p>


            <button
                id="restore-button"
                class="secondary-button"
                type="button"
            >
                Restore from Backup
            </button>


            <input
                id="backup-file-input"
                type="file"
                accept=".json,application/json"
                style="display:none;"
            >

        </div>
    `;


    const input =
        document.getElementById(
            "name-input"
        );


    document
        .getElementById(
            "continue-name"
        )
        .addEventListener(
            "click",
            () => {

                const name =
                    input.value.trim();


                if (!name) {

                    alert(
                        "Enter your name."
                    );

                    return;
                }


                appData.name =
                    name;


                saveData();


                showDaySelection();
            }
        );


    /*
        Hidden file input.

        Pressing Restore opens the
        phone/computer file picker.
    */

    const fileInput =
        document.getElementById(
            "backup-file-input"
        );


    document
        .getElementById(
            "restore-button"
        )
        .addEventListener(
            "click",
            () => {

                fileInput.click();
            }
        );


    /*
        Once the user selects a JSON
        backup, restore it.
    */

    fileInput.addEventListener(
        "change",
        () => {

            const file =
                fileInput.files[0];


            if (!file) {
                return;
            }


            restoreBackup(
                file
            );
        }
    );
}


/* =========================================================
   FIRST-TIME DAY SELECTION
========================================================= */

function showDaySelection() {

    clearScreen();

    setHeader(
        `Hey, ${appData.name}.`,
        "Which days do you lift?"
    );


    const list =
        createDayCheckboxList();


    appContainer.appendChild(
        list
    );


    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.className =
        "primary-button";

    button.textContent =
        "Build My Routine";


    button.addEventListener(
        "click",
        () => {

            const selected =
                getSelectedDays(
                    list
                );


            if (
                selected.length === 0
            ) {

                alert(
                    "Choose at least one day."
                );

                return;
            }


            updateTrainingDays(
                selected
            );


            saveData();

            showRoutineBuilder(
                false
            );
        }
    );


    appContainer.appendChild(
        button
    );
}


/* =========================================================
   EDIT WORKOUT DAYS
========================================================= */

function showEditDays() {

    clearScreen();

    setHeader(
        "Workout Days",
        "Choose the days you train."
    );


    const list =
        createDayCheckboxList();


    appContainer.appendChild(
        list
    );


    const saveButton =
        document.createElement(
            "button"
        );

    saveButton.type =
        "button";

    saveButton.className =
        "primary-button";

    saveButton.textContent =
        "Save Workout Days";


    saveButton.addEventListener(
        "click",
        () => {

            const selected =
                getSelectedDays(
                    list
                );


            if (
                selected.length === 0
            ) {

                alert(
                    "Choose at least one workout day."
                );

                return;
            }


            const oldDays = [
                ...appData.trainingDays
            ];


            const newDays =
                selected.filter(
                    day =>
                        !oldDays.includes(
                            day
                        )
                );


            updateTrainingDays(
                selected
            );


            saveData();


            /*
                If the user added a new
                training day, take them
                straight to Edit Lifts so
                they can add exercises.
            */

            if (
                newDays.length > 0
            ) {

                alert(
                    "Workout days saved. Add lifts to your new training day."
                );

                showEditRoutine();

                return;
            }


            showTodayWorkout();
        }
    );


    appContainer.appendChild(
        saveButton
    );


    const cancelButton =
        document.createElement(
            "button"
        );

    cancelButton.type =
        "button";

    cancelButton.className =
        "secondary-button";

    cancelButton.textContent =
        "Cancel";


    cancelButton.addEventListener(
        "click",
        showMenu
    );


    appContainer.appendChild(
        cancelButton
    );
}


/* =========================================================
   DAY CHECKBOX HELPERS
========================================================= */

function createDayCheckboxList() {

    const list =
        document.createElement(
            "div"
        );

    list.className =
        "day-list";


    DAYS.forEach(day => {

        const label =
            document.createElement(
                "label"
            );

        label.className =
            "day-option";


        const checkbox =
            document.createElement(
                "input"
            );

        checkbox.type =
            "checkbox";

        checkbox.value =
            day;

        checkbox.checked =
            appData.trainingDays
                .includes(day);


        const text =
            document.createElement(
                "span"
            );

        text.textContent =
            day;


        label.append(
            checkbox,
            text
        );


        list.appendChild(
            label
        );
    });


    return list;
}


function getSelectedDays(list) {

    return Array.from(
        list.querySelectorAll(
            "input:checked"
        )
    )
        .map(
            input =>
                input.value
        );
}


function updateTrainingDays(
    selectedDays
) {

    appData.trainingDays =
        selectedDays;


    selectedDays.forEach(
        day => {

            if (
                !appData.workouts[day]
            ) {

                appData.workouts[day] =
                    [];
            }
        }
    );
}


/* =========================================================
   CREATE EXERCISE
========================================================= */

function createExercise() {

    return {

        id: createID(),

        name: "",

        type: "freeWeight",

        sets: 2,

        minReps: 5,

        maxReps: 8,

        target: 0,

        plateLoaded: false,

        machineIncrement: 1
    };
}


/* =========================================================
   FIRST-TIME ROUTINE BUILDER
========================================================= */

function showRoutineBuilder() {

    renderRoutineBuilder(
        false
    );
}


/* =========================================================
   EDIT EXISTING ROUTINE
========================================================= */

function showEditRoutine() {

    renderRoutineBuilder(
        true
    );
}


/* =========================================================
   ROUTINE BUILDER
========================================================= */

function renderRoutineBuilder(
    editing
) {

    clearScreen();


    if (editing) {

        setHeader(
            "Edit Lifts",
            "Add, remove, or change exercises."
        );

    } else {

        setHeader(
            "Build Your Routine",
            "Add your exercises."
        );
    }


    appData.trainingDays.forEach(
        day => {

            const section =
                document.createElement(
                    "section"
                );

            section.className =
                editing
                    ? "day-builder day-dropdown"
                    : "day-builder";


            const content =
                document.createElement(
                    editing
                        ? "div"
                        : "section"
                );

            if (editing) {

                const summary =
                    document.createElement(
                        "button"
                    );

                summary.type =
                    "button";

                summary.className =
                    "day-dropdown-toggle";

                summary.innerHTML = `
                    <span>${day}</span>
                    <span class="day-dropdown-arrow">⌄</span>
                `;

                summary.addEventListener(
                    "click",
                    () => {

                        const wasOpen =
                            section.classList
                                .contains(
                                    "open"
                                );

                        document
                            .querySelectorAll(
                                ".day-dropdown.open"
                            )
                            .forEach(
                                other => {

                                    other.classList.remove(
                                        "open"
                                    );
                                }
                            );

                        if (!wasOpen) {

                            section.classList.add(
                                "open"
                            );
                        }
                    }
                );

                content.className =
                    "day-dropdown-content";

                section.append(
                    summary,
                    content
                );

            } else {

                const heading =
                    document.createElement(
                        "h2"
                    );

                heading.textContent =
                    day;

                section.appendChild(
                    heading
                );
            }


            const exercises =
                appData.workouts[day] ||
                [];


            exercises.forEach(
                (
                    exercise,
                    index
                ) => {

                    content.appendChild(
                        buildExerciseCard(
                            day,
                            exercise,
                            index,
                            editing
                        )
                    );
                }
            );


            const addButton =
                document.createElement(
                    "button"
                );

            addButton.type =
                "button";

            addButton.className =
                "add-button";

            addButton.textContent =
                "+ Add Exercise";


            addButton.addEventListener(
                "click",
                () => {

                    saveBuilder();

                    appData.workouts[
                        day
                    ].push(
                        createExercise()
                    );

                    saveData();

                    renderRoutineBuilder(
                        editing
                    );
                }
            );


            content.appendChild(
                addButton
            );


            if (!editing) {

                section.appendChild(
                    content
                );
            }


            appContainer.appendChild(
                section
            );
        }
    );


    const saveButton =
        document.createElement(
            "button"
        );

    saveButton.type =
        "button";

    saveButton.className =
        editing
            ? "primary-button floating-save-button"
            : "primary-button finish-setup";


    saveButton.textContent =
        editing
            ? "Save Changes"
            : "Finish Setup";


    saveButton.addEventListener(
        "click",
        () => {

            if (
                validateAndSaveRoutine()
            ) {

                if (editing) {

                    alert(
                        "Routine updated."
                    );

                    showTodayWorkout();

                } else {

                    appData.setupComplete =
                        true;

                    appData.ratings = {};

                    saveData();

                    showMenuButton();

                    showTodayWorkout();
                }
            }
        }
    );


    if (editing) {

        const floatingBar =
            document.createElement(
                "div"
            );

        floatingBar.className =
            "floating-save-island";

        floatingBar.appendChild(
            saveButton
        );


        const cancelButton =
            document.createElement(
                "button"
            );

        cancelButton.type =
            "button";

        cancelButton.className =
            "floating-cancel-button";

        cancelButton.textContent =
            "Cancel";


        cancelButton.addEventListener(
            "click",
            showMenu
        );


        floatingBar.appendChild(
            cancelButton
        );

        appContainer.appendChild(
            floatingBar
        );

    } else {

        appContainer.appendChild(
            saveButton
        );
    }
}


/* =========================================================
   EXERCISE BUILDER CARD
========================================================= */

function buildExerciseCard(
    day,
    exercise,
    index,
    editing
) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "exercise-card";

    card.dataset.day =
        day;

    card.dataset.id =
        exercise.id;


    card.innerHTML = `

        <div class="exercise-header">

            <h3>
                Exercise ${index + 1}
            </h3>

            <button
                class="remove-button"
                type="button"
            >
                Remove
            </button>

        </div>


        <div class="input-group">

            <label>
                Exercise Name
            </label>

            <input
                class="exercise-name"
                type="text"
                value="${escapeHTML(
                    exercise.name
                )}"
                placeholder="Incline Bench"
            >

        </div>


        <div class="input-group">

            <label>
                Exercise Type
            </label>


            <div class="type-buttons">

                <button
                    class="type-button ${
                        exercise.type ===
                        "machine"
                            ? "selected"
                            : ""
                    }"
                    data-type="machine"
                    type="button"
                >
                    Machine
                </button>


                <button
                    class="type-button ${
                        exercise.type ===
                        "freeWeight"
                            ? "selected"
                            : ""
                    }"
                    data-type="freeWeight"
                    type="button"
                >
                    Free Weight
                </button>


                <button
                    class="type-button ${
                        exercise.type ===
                        "bodyweight"
                            ? "selected"
                            : ""
                    }"
                    data-type="bodyweight"
                    type="button"
                >
                    Bodyweight
                </button>

            </div>

        </div>


        <div class="number-row">

            <div class="input-group">

                <label>
                    Sets
                </label>

                <input
                    class="exercise-sets"
                    type="number"
                    min="1"
                    value="${exercise.sets}"
                >

            </div>


            <div class="input-group">

                <label>
                    Min Reps
                </label>

                <input
                    class="exercise-min"
                    type="number"
                    min="1"
                    value="${exercise.minReps}"
                >

            </div>


            <div class="input-group">

                <label>
                    Max Reps
                </label>

                <input
                    class="exercise-max"
                    type="number"
                    min="1"
                    value="${exercise.maxReps}"
                >

            </div>

        </div>


        <div class="target-area">
        </div>
    `;


    card
        .querySelector(
            ".remove-button"
        )
        .addEventListener(
            "click",
            () => {

                saveBuilder();


                appData.workouts[day] =
                    appData.workouts[day]
                        .filter(
                            item =>
                                item.id !==
                                exercise.id
                        );


                delete appData.ratings[
                    exercise.id
                ];


                saveData();


                renderRoutineBuilder(
                    editing
                );
            }
        );


    card
        .querySelectorAll(
            ".type-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        saveBuilder();


                        exercise.type =
                            button.dataset.type;


                        if (
                            exercise.type ===
                            "bodyweight"
                        ) {

                            exercise.target =
                                0;

                            exercise.plateLoaded =
                                false;
                        }


                        saveData();


                        renderRoutineBuilder(
                            editing
                        );
                    }
                );
            }
        );


    renderTarget(
        card,
        exercise
    );


    return card;
}


/* =========================================================
   TARGET INPUT
========================================================= */

function renderTarget(
    card,
    exercise
) {

    const area =
        card.querySelector(
            ".target-area"
        );


    if (
        exercise.type ===
        "machine"
    ) {

        area.innerHTML = `

            <div class="input-group">

                <label>
                    Current Machine Setting
                </label>

                <input
                    class="exercise-target"
                    type="number"
                    min="1"
                    step="1"
                    value="${
                        exercise.target || 1
                    }"
                >

            </div>

            <div class="input-group">

                <label>
                    Progression Interval
                </label>

                <select
                    class="machine-increment"
                >
                    <option value="1" ${Number(exercise.machineIncrement || 1) === 1 ? "selected" : ""}>
                        1 per step
                    </option>

                    <option value="2.5" ${Number(exercise.machineIncrement) === 2.5 ? "selected" : ""}>
                        2.5 per step
                    </option>

                    <option value="5" ${Number(exercise.machineIncrement) === 5 ? "selected" : ""}>
                        5 per step
                    </option>

                    <option value="10" ${Number(exercise.machineIncrement) === 10 ? "selected" : ""}>
                        10 per step
                    </option>
                </select>

                <p class="input-help">
                    Good = +1 step · Easy = +2 steps · Failed = -1 step
                </p>

            </div>
        `;


        return;
    }


    if (
        exercise.type ===
        "freeWeight"
    ) {

        area.innerHTML = `

            <div class="input-group">

                <label>
                    Current Weight (lb)
                </label>

                <input
                    class="exercise-target"
                    type="number"
                    min="0"
                    step="2.5"
                    value="${
                        exercise.target
                    }"
                >

            </div>


            <div class="checkbox-row">

                <input
                    class="plate-loaded"
                    type="checkbox"
                    ${
                        exercise.plateLoaded
                            ? "checked"
                            : ""
                    }
                >

                <span>
                    Plate Loaded
                </span>

            </div>
        `;


        return;
    }


    area.innerHTML = `

        <p style="color:#999;">
            Bodyweight exercise —
            progression changes the
            rep range.
        </p>
    `;
}


/* =========================================================
   SAVE BUILDER
========================================================= */

function saveBuilder() {

    document
        .querySelectorAll(
            ".exercise-card"
        )
        .forEach(
            card => {

                const day =
                    card.dataset.day;

                const id =
                    card.dataset.id;


                const exercise =
                    appData.workouts[
                        day
                    ]
                        .find(
                            item =>
                                item.id ===
                                id
                        );


                if (!exercise) {
                    return;
                }


                exercise.name =
                    card
                        .querySelector(
                            ".exercise-name"
                        )
                        .value
                        .trim();


                exercise.sets =
                    positiveNumber(
                        card.querySelector(
                            ".exercise-sets"
                        ).value,
                        1
                    );


                exercise.minReps =
                    positiveNumber(
                        card.querySelector(
                            ".exercise-min"
                        ).value,
                        1
                    );


                exercise.maxReps =
                    positiveNumber(
                        card.querySelector(
                            ".exercise-max"
                        ).value,
                        exercise.minReps
                    );


                const target =
                    card.querySelector(
                        ".exercise-target"
                    );


                if (target) {

                    exercise.target =
                        Number(
                            target.value
                        ) || 0;
                }


                const machineIncrement =
                    card.querySelector(
                        ".machine-increment"
                    );

                if (machineIncrement) {

                    exercise.machineIncrement =
                        Number(
                            machineIncrement.value
                        ) || 1;
                }


                const plate =
                    card.querySelector(
                        ".plate-loaded"
                    );


                exercise.plateLoaded =
                    plate
                        ? plate.checked
                        : false;
            }
        );


    saveData();
}


/* =========================================================
   VALIDATE ROUTINE
========================================================= */

function validateAndSaveRoutine() {

    saveBuilder();


    for (
        const day
        of appData.trainingDays
    ) {

        const exercises =
            appData.workouts[
                day
            ] || [];


        if (
            exercises.length === 0
        ) {

            alert(
                `Add at least one exercise to ${day}.`
            );

            return false;
        }


        for (
            const exercise
            of exercises
        ) {

            if (!exercise.name) {

                alert(
                    `${day} has an exercise without a name.`
                );

                return false;
            }


            if (
                exercise.maxReps <
                exercise.minReps
            ) {

                alert(
                    `${exercise.name}: max reps must be at least min reps.`
                );

                return false;
            }


            if (
                exercise.type ===
                "machine" &&
                exercise.target < 1
            ) {

                alert(
                    `${exercise.name}: machine setting must be at least 1.`
                );

                return false;
            }
        }
    }


    saveData();

    return true;
}


/* =========================================================
   TODAY'S WORKOUT
========================================================= */

function showTodayWorkout() {

    clearScreen();

    showMenuButton();


    const today =
        getCurrentDay();


    if (
        !appData.trainingDays
            .includes(today)
    ) {

        showRestDay(
            today
        );

        return;
    }


    const exercises =
        appData.workouts[
            today
        ] || [];


    setHeader(
        `${today} Workout`,
        getFormattedDate()
    );


    exercises.forEach(
        exercise => {

            appContainer.appendChild(
                createWorkoutCard(
                    exercise
                )
            );
        }
    );


    const finishButton =
        document.createElement(
            "button"
        );

    finishButton.type =
        "button";

    finishButton.className =
        "primary-button";

    finishButton.style.marginTop =
        "15px";

    finishButton.textContent =
        "Finish Workout";


    finishButton.addEventListener(
        "click",
        () => {

            finishWorkout(
                exercises
            );
        }
    );


    appContainer.appendChild(
        finishButton
    );
}


/* =========================================================
   WORKOUT CARD
========================================================= */

function createWorkoutCard(
    exercise
) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "card";


    card.innerHTML = `

        <h2 class="workout-exercise-name">
            ${escapeHTML(
                exercise.name
            )}
        </h2>


        <div class="workout-reps">

            ${exercise.sets}
            sets

            ·

            ${exercise.minReps}
            – ${exercise.maxReps}
            reps

        </div>


        <div class="workout-target">

            ${getTargetText(
                exercise
            )}

        </div>


        <div class="plate-info">
        </div>


        <p class="rating-label">
            HOW DID IT FEEL?
        </p>


        <div class="rating-buttons">
        </div>
    `;


    if (
        exercise.type ===
        "freeWeight" &&
        exercise.plateLoaded
    ) {

        card
            .querySelector(
                ".plate-info"
            )
            .textContent =
                getPlateText(
                    exercise.target
                );
    }


    const ratingContainer =
        card.querySelector(
            ".rating-buttons"
        );


    RATINGS.forEach(
        rating => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "rating-button";

            button.textContent =
                rating;


            if (
                appData.ratings[
                    exercise.id
                ] === rating
            ) {

                button.classList.add(
                    "selected"
                );
            }


            button.addEventListener(
                "click",
                () => {

                    appData.ratings[
                        exercise.id
                    ] = rating;


                    saveData();


                    ratingContainer
                        .querySelectorAll(
                            ".rating-button"
                        )
                        .forEach(
                            other => {

                                other.classList.remove(
                                    "selected"
                                );
                            }
                        );


                    button.classList.add(
                        "selected"
                    );
                }
            );


            ratingContainer.appendChild(
                button
            );
        }
    );


    return card;
}


/* =========================================================
   TARGET DISPLAY
========================================================= */

function getTargetText(
    exercise
) {

    if (
        exercise.type ===
        "machine"
    ) {

        return (
            `Setting ${exercise.target}`
        );
    }


    if (
        exercise.type ===
        "freeWeight"
    ) {

        return (
            `${exercise.target} lb`
        );
    }


    return "Bodyweight";
}


/* =========================================================
   PLATE CALCULATOR
========================================================= */

function getPlateText(
    totalWeight
) {

    if (
        totalWeight ===
        BAR_WEIGHT
    ) {

        return "Empty 45 lb bar";
    }


    if (
        totalWeight <
        BAR_WEIGHT
    ) {

        return "Below 45 lb bar weight";
    }


    let weightPerSide =
        (
            totalWeight -
            BAR_WEIGHT
        ) / 2;


    const plates = [];


    for (
        const plate
        of AVAILABLE_PLATES
    ) {

        const count =
            Math.floor(
                weightPerSide /
                plate
            );


        if (
            count > 0
        ) {

            plates.push(
                `${plate} × ${count}`
            );


            weightPerSide -=
                plate * count;
        }
    }


    if (
        weightPerSide > 0.01
    ) {

        return (
            "Exact plate combination unavailable"
        );
    }


    return (
        `Per side: ${plates.join(" + ")}`
    );
}


/* =========================================================
   PROGRESSION
========================================================= */

function applyProgression(
    exercise,
    rating
) {

    /*
        MACHINE

        Easy   +2
        Good   +1
        Barely same
        Failed -1
    */

    if (
        exercise.type ===
        "machine"
    ) {

        const interval =
            Number(
                exercise.machineIncrement
            ) || 1;

        let steps = 0;


        if (
            rating === "Easy"
        ) {

            steps = 2;
        }

        else if (
            rating === "Good"
        ) {

            steps = 1;
        }

        else if (
            rating === "Failed"
        ) {

            steps = -1;
        }


        exercise.target =
            Math.max(
                interval,
                Number(
                    exercise.target
                ) +
                (
                    steps *
                    interval
                )
            );


        return;
    }


    /*
        FREE WEIGHT

        Easy   +10 lb
        Good   +5 lb
        Barely same
        Failed -5 lb
    */

    if (
        exercise.type ===
        "freeWeight"
    ) {

        let change = 0;


        if (
            rating === "Easy"
        ) {

            change = 10;
        }

        else if (
            rating === "Good"
        ) {

            change = 5;
        }

        else if (
            rating === "Failed"
        ) {

            change = -5;
        }


        exercise.target =
            Math.max(
                0,
                Number(
                    exercise.target
                ) + change
            );


        return;
    }


    /*
        BODYWEIGHT

        Easy   +2 reps
        Good   +1 rep
        Barely same
        Failed -1 rep
    */

    if (
        exercise.type ===
        "bodyweight"
    ) {

        let change = 0;


        if (
            rating === "Easy"
        ) {

            change = 2;
        }

        else if (
            rating === "Good"
        ) {

            change = 1;
        }

        else if (
            rating === "Failed"
        ) {

            change = -1;
        }


        exercise.minReps =
            Math.max(
                1,
                exercise.minReps +
                change
            );


        exercise.maxReps =
            Math.max(
                exercise.minReps,
                exercise.maxReps +
                change
            );
    }
}
/* =========================================================
   AUTOMATIC BACKUP
========================================================= */

function downloadBackup() {

    const backup = {
        version: 2,
        createdAt: new Date().toISOString(),

        data: appData
    };


    const json =
        JSON.stringify(
            backup,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    const date =
        new Date()
            .toISOString()
            .split("T")[0];


    link.href = url;

    link.download =
        `lift-tracker-backup-${date}.json`;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );
}

/* =========================================================
   FINISH WORKOUT
========================================================= */

function finishWorkout(
    exercises
) {

    /*
        First make sure every exercise
        has been rated.
    */

    for (
        const exercise
        of exercises
    ) {

        if (
            !appData.ratings[
                exercise.id
            ]
        ) {

            alert(
                "Rate every exercise before finishing your workout."
            );

            return;
        }
    }


    /*
        Apply progression to every lift.
    */

    exercises.forEach(
        exercise => {

            const rating =
                appData.ratings[
                    exercise.id
                ];


            applyProgression(
                exercise,
                rating
            );


            /*
                Clear today's rating so
                the next workout starts
                fresh.
            */

            delete appData.ratings[
                exercise.id
            ];
        }
    );


    /*
        Save the NEW targets locally
        before creating the backup.
    */

    saveData();


    /*
        Automatically download a copy
        of the entire Lift Tracker data.
    */

    downloadBackup();

    /* =========================================================
   RESTORE BACKUP
========================================================= */

function restoreBackup(file) {

    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.addEventListener(
        "load",
        () => {

            try {

                const backup =
                    JSON.parse(
                        reader.result
                    );


                /*
                    Make sure this looks
                    like one of our
                    Lift Tracker backups.
                */

                if (
                    !backup ||
                    backup.version !== 2 ||
                    !backup.data
                ) {

                    alert(
                        "This doesn't look like a valid Lift Tracker backup."
                    );

                    return;
                }


                const restoredData =
                    backup.data;


                /*
                    Check the important
                    pieces before replacing
                    current app data.
                */

                if (
                    typeof restoredData.name !==
                    "string" ||

                    !Array.isArray(
                        restoredData.trainingDays
                    ) ||

                    typeof restoredData.workouts !==
                    "object"
                ) {

                    alert(
                        "This backup is missing required Lift Tracker data."
                    );

                    return;
                }


                /*
                    Rebuild the data using
                    our current default
                    structure.

                    This makes older backups
                    safer if we add more
                    fields later.
                */

                appData = {

                    ...createDefaultData(),

                    ...restoredData,

                    ratings:
                        restoredData.ratings ||
                        {},

                    workouts:
                        restoredData.workouts ||
                        {}
                };


                /*
                    A restored backup is
                    already a configured
                    Lift Tracker.
                */

                appData.setupComplete =
                    true;


                saveData();


                alert(
                    "Backup restored!"
                );


                showMenuButton();

                showTodayWorkout();

            } catch (error) {

                console.error(
                    "Restore failed:",
                    error
                );


                alert(
                    "That backup file couldn't be read."
                );
            }
        }
    );


    reader.readAsText(
        file
    );
}


    alert(
        "Workout finished! Your next targets have been updated and your backup was created."
    );


    showTodayWorkout();
}


/* =========================================================
   REST DAY
========================================================= */

function showRestDay(
    today
) {

    setHeader(
        "Rest Day",
        getFormattedDate()
    );


    const card =
        document.createElement(
            "div"
        );

    card.className =
        "card";

    card.style.textAlign =
        "center";


    card.innerHTML = `

        <div
            style="
                font-size:38px;
                margin-bottom:12px;
            "
        >
            ✓
        </div>


        <h2>
            No workout today.
        </h2>


        <p
            style="
                color:#999;
                line-height:1.5;
            "
        >
            ${today} isn't one of your
            selected training days.
        </p>


        <button
            id="change-days-rest"
            class="secondary-button"
            type="button"
        >
            Change Workout Days
        </button>
    `;


    appContainer.appendChild(
        card
    );


    document
        .getElementById(
            "change-days-rest"
        )
        .addEventListener(
            "click",
            showEditDays
        );
}


/* =========================================================
   START APP
========================================================= */

showMenuButton();


if (
    appData.setupComplete
) {

    showTodayWorkout();

}

else if (
    appData.name
) {

    showDaySelection();

}

else {

    showNameSetup();
}