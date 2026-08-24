// ============================================
// STATE
// ============================================

let classArray = [];
let finalGPA;
let GradeArray = [];



// ============================================
// ELEMENT REFERENCES
// ============================================

// class grade card
const classGrade = document.getElementById('classGrade');
const altList = document.getElementById('altList');
const appendGrade = document.getElementById('appendGrade');
const gradeCalc = document.getElementById("gradeCalculation");
const gradeResult = document.getElementById('gradeResult'); 
const classGradeBack = document.getElementById('classGradeBack');
// --- body --- 
const body = document.getElementById("body");

// --- dark and light mode ---
const on =document.getElementById("on");
const off = document.getElementById("off"); 
// --- Login ---
const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name-input");
const logIn = document.getElementById("access");
const warning = document.getElementById("warning");

// --- Dashboard ---
const afterAccess = document.getElementById("afterAccess");
const msgHolder = document.getElementById("msgholder");
const gpa = document.getElementById('gpa');
const ranking = document.getElementById("ranking");
const grade = document.getElementById("grade");

// --- GPA Card ---
const gpaCard = document.getElementById("gpaCard");
const appendClass = document.getElementById("appendClass");
const classlist = document.getElementById("classlist");
const gpaCalculate = document.getElementById("gpaCalculation");
const gpaDiv = document.getElementById("gpaCalc");
const gpaResult = document.getElementById("gpaResult");
const gpaOutput = document.getElementById("gpaOutput");
const encouragement = document.getElementById("encouragement");

// --- Class Ranking ---
const classRanking = document.getElementById("classRanking");

// --- Back Buttons ---
const AfterAccessBack = document.getElementById("AfterAccessBack");
const gpaCardBack = document.getElementById("gpaCardBack");
const rankingBack = document.getElementById("rankingBack");




// ============================================
// UTILITY FUNCTIONS
// ============================================

function specialize(element){
    element.className = "username";
}

function hide(element){
    element.style.display = "none";
}

function visible(element){
    element.style.display = "block";
}




// ============================================
// INITIAL HIDDEN ELEMENTS
// ============================================

hide(afterAccess);
hide(gpaCard);
hide(gpaDiv);
hide(classRanking);
hide(classGrade);



// ============================================
// NAVIGATION — BACK BUTTONS
// ============================================

rankingBack.onclick = function(){
    hide(classRanking);
    visible(afterAccess);
}

afterAccessBack.onclick = function(){
    msgHolder.textContent = '';
    hide(afterAccess);
    visible(logIn);
}

gpaCardBack.onclick = function(){
    hide(gpaCard);
    visible(afterAccess);
}

classGradeBack.onclick = function(){

    hide(classGrade); 
    visible(afterAccess);
}


// ============================================
// LOGIN
// ============================================

submitBtn.onclick = function(){
    if(nameInput.value === ""){
        warning.textContent = "please type in your name.";
    }
    else{
        let userName = nameInput.value;
        hide(logIn);
        visible(afterAccess);

        welcomeMsg = document.createElement('h1');
        welcomeMsg.textContent = `Welcome, `;
        welcomeMsg.className = 'inline';
        msgHolder.appendChild(welcomeMsg);

        welcomeUser = document.createElement('h1');
        welcomeUser.textContent = `${userName}`;
        welcomeUser.ClassName = "inline";
        msgHolder.appendChild(welcomeUser);
        specialize(welcomeUser);
    }
}




// ============================================
// DASHBOARD — CARD NAVIGATION
// ============================================

gpa.onclick = function(){
    hide(afterAccess);
    visible(gpaCard);
}

ranking.onclick = function(){
    hide(afterAccess);
    visible(classRanking);
}

grade.onclick = function(){
    hide(afterAccess);
    visible(classGrade);
}




// ============================================
// GPA CARD — ADD CLASS
// ============================================

appendClass.onclick = function(){

    // Reset result display when adding a new class
    hide(gpaDiv);
    gpaResult.textContent = "";

    // Create the input row elements
    let classes = document.createElement("div");
    classes.className = "class";

    let inputClassName = document.createElement("input");
    inputClassName.placeholder = "type name";

    let inputGradeName = document.createElement("input");
    inputGradeName.placeholder = "type grade in number";

    let inClass = document.createElement("button");
    inClass.textContent = 'create';

    // Append input row to the class list
    classlist.appendChild(classes);
    classes.appendChild(inputClassName);
    classes.appendChild(inputGradeName);
    classes.appendChild(inClass);

    // When user clicks "create", finalize the class card
    inClass.onclick = function(){

        let dropOptions = document.createElement("div");
        let NameClass = inputClassName.value;
        let NameGrade = inputGradeName.value;
        NameGrade.className = "special";

        // Create the class info display card
        ClassInfo = document.createElement("div");
        ClassInfo.className = 'listing';
        ClassInfo.textContent = `${NameClass}-${NameGrade}`;
        classes.appendChild(ClassInfo);

        // Hide the input fields now that the card is created
        hide(inputClassName);
        hide(inputGradeName);
        hide(inClass);

        // Build the dropdown for class type (Honors / AP / CP)
        let select = document.createElement("select");
        select.className = 'dropmenu';

        let opt1 = document.createElement("option");
        opt1.textContent = "Honors";

        let opt2 = document.createElement('option');
        opt2.textContent = "AP";

        let opt3 = document.createElement('option');
        opt3.textContent = "CP";

        select.appendChild(opt1);
        select.appendChild(opt2);
        select.appendChild(opt3);
        dropOptions.appendChild(select);
        ClassInfo.appendChild(dropOptions);

        // Build the remove button
        let removeBtn = document.createElement("button");
        removeBtn.className = "removeBtn";
        removeBtn.textContent = "X";
        dropOptions.appendChild(removeBtn);

        // Store class data as an object in the array
        let thisClass = {
            name: NameClass,
            grade: NameGrade,
            type: select.value
        };

        // Remove class from DOM and array when X is clicked
        removeBtn.onclick = function(){
            let index = classArray.indexOf(thisClass);
            classArray.splice(index, 1);
            classes.remove();
        }

        classArray.push(thisClass);

        // Keep the stored type in sync when dropdown changes
        select.onchange = function(){
            thisClass.type = select.value;
        }
    }
}




// ============================================
// GPA CARD — CALCULATE GPA
// ============================================

gpaCalculate.onclick = function(){

    // Guard: no classes added yet
    if(classArray.length === 0){
        visible(gpaDiv);
        gpaResult.textContent = "You must add classes first.";
        return;
    }

    // Loop through each class and calculate weighted GPA
    let avg = 0;
    for(let c of classArray){
        let increment = 0;

        if(c.type == 'Honors'){
            increment = 0.5;
        }
        else if(c.type == 'AP'){
            increment = 1;
        }
        else if(c.type == "CP"){
            increment = 0;
        }

        let indGpa = Number(c.grade) / 20 + increment;
        avg += indGpa;
    }

    // Display the final GPA
    visible(gpaDiv);
    gpaResult.textContent = `${avg / classArray.length}`;

    // Color code the result
    if(Number(avg / classArray.length) >= 4.8){
        gpaResult.className = 'green';
    }
    else{
        gpaResult.className = 'red';
    }

    // Store and display final GPA for use elsewhere
    finalGPA = Number(avg / classArray.length);
    if(finalGPA > 5){
        gpaOutput.textContent = 'Top 10% student';
        gpaOutput.className = 'green';

    }
    else if(finalGPA < 5 && finalGPA > 3){
        gpaOutput.textContent = 'Average Student';
        gpaOutput.className = 'yellow';
    }
    else if(finalGPA < 3){
        gpaOutput.textContent = 'lock in broski';
        gpaOutput.className = 'red';
    }
}
//===========================================
// ---------Grade Calculation Card-----------
//===========================================


appendGrade.onclick = function(){


    // create the input row elements
    gradeResult.textContent = "";
    let gradeRes = document.createElement('div');
    gradeRes.className = 'class';

    let inputGradName = document.createElement("input");
    inputGradName.placeholder = 'type name';

    let inputResName = document.createElement('input');
    inputResName.placeholder = 'type result';

    let inGrade = document.createElement('button');
    inGrade.textContent = 'create';

    // Append input row to the class list
    altList.appendChild(gradeRes);
    gradeRes.appendChild(inputGradName);
    gradeRes.appendChild(inputResName);
    gradeRes.appendChild(inGrade);

    // When user clicks 'create', finalize the grade card
    inGrade.onclick = function(){
        let OptionDrop = document.createElement('div');
        let NameGrad = inputGradName.value;
        let NameRes = inputResName.value;
        NameRes.className = 'special';

        //Create the grade info display card
        GradeInfo = document.createElement('div');
        GradeInfo.className = 'listing';
        GradeInfo.textContent = `${NameGrad}-${NameRes}`; 
        gradeRes.appendChild(GradeInfo); 

        // hide input fields

        hide(inputResName);
        hide(inputGradName);
        hide(inGrade); 
        // Build the dropdown for weighing
        let selec = document.createElement('select');
        selec.className = 'dropmenu';

        let opti1 = document.createElement('option');
        opti1.textContent = 'Major';

        let opti2 = document.createElement('option');
        opti2.textContent = 'Minor';
        
        selec.appendChild(opti1);
        selec.appendChild(opti2); 
        OptionDrop.appendChild(selec);
        GradeInfo.appendChild(OptionDrop);

        //Build the remove button
        let removeBttn = document.createElement('button');
        removeBttn.className = 'removeBtn';
        removeBttn.textContent = 'X';
        OptionDrop.appendChild(removeBttn);

        let thisGrade = {
            grad: NameGrad, 
            res: NameRes, 
            type: selec.value
        }; 

        removeBttn.onclick = function(){
            let indexOf = GradeArray.indexOf(thisGrade);
            GradeArray.splice(indexOf, 1);
            gradeRes.remove();
        }

        GradeArray.push(thisGrade);

        // keep in sync

        selec.onchange = function(){
            thisGrade.type = selec.value; 
        }
    }
}

// ============================================
// GRADE CARD -- CALCULATE GRADE
// ============================================


gradeCalc.onclick = function(){

    if(GradeArray.length === 0){
        gradeResult.textContent = 'You must add grades first!';
        return;
    }
    let coefficient;
    let total = 0;
    let totCoefficient = 0;
    for(let i of GradeArray){
        if(i.type == 'Major'){
            coefficient = 0.6;
        }
        else if(i.type == 'Minor'){
            coefficient = 0.4;
        }
        let Grading = Number(i.res)*coefficient;
        total += Grading;
        totCoefficient += coefficient;  
    }
    
    gradeResult.textContent = `${Math.round(total)/totCoefficient}`;
    if((Math.round(total)/totCoefficient)> 90){
        gradeResult.className = 'green'; 
    }
    else if((Math.round(total)/totCoefficient)<90 && (Math.round(total)/totCoefficient) > 75 ){
        gradeResult.className ='yellow';
    
    }
    else{
        gradeResult.className = 'red';
    }
}



// =============================================
// --- toggle dark mode and light mode --- 
// =============================================

off.onclick = function(){
    document.querySelectorAll('nav').forEach(el =>{
        el.style.color = 'black';
    });
    classRanking.style.background = 'rgba(0, 0, 0, 0.68)';
    afterAccess.style.background = 'rgba(0, 0, 0, 0.68)';
    gpaCard.style.background = 'rgba(0, 0, 0, 0.68)';
    logIn.style.background = 'rgba(0, 0, 0, 0.68)';
    body.style.background = ` radial-gradient(ellipse at 20% 50%, #d8b4fe 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, #93c5fd 0%, transparent 35%),
            radial-gradient(ellipse at 60% 80%, #c4b5fd 0%, transparent 30%),
            radial-gradient(ellipse at 10% 90%, #bfdbfe 0%, transparent 25%),
            #f0f4ff`;
  
    off.style.background = 'black';
    off.style.borderRadius = '.6em';
    off.style.color = 'white';
    on.style.background = 'none';
    classGrade.style.background = 'rgba(0,0,0,.68)';

}
on.onclick = function(){
    document.querySelectorAll('nav').forEach(el =>{
        el.style.color = 'white';
    });
     classGrade.style.background = 'rgba(0,0,0,.2)';
    classRanking.style.background = 'rgba(0,0,0,0.2';
    afterAccess.style.background = 'rgba(0, 0, 0, 0.2)';
    gpaCard.style.background = 'rgba(0, 0, 0, 0.2)';
    logIn.style.background = 'rgba(0, 0, 0, 0.2)';
    body.style.background = ` radial-gradient(ellipse at 20% 50%, #6b21a8 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, #1d4ed8 0%, transparent 35%),
            radial-gradient(ellipse at 60% 80%, #7c3aed 0%, transparent 30%),
            radial-gradient(ellipse at 10% 90%, #1e40af 0%, transparent 25%),
            #0f172a`;
    off.style.background = 'none';
    on.style.background = 'white';
    body.style.color = 'white';

}