const startDate = new Date(2025, 11, 19);
const endDate = new Date(2026, 9, 1);
const currentDate = new Date();
const totalWeeks = getDifferenceInWeeks(startDate, endDate);
const totalWeeksPassed = getDifferenceInWeeks(startDate, currentDate);
const container = document.getElementById("container");

let isLiliTheme = true;

document.addEventListener("click", () => {
    setTheme(!isLiliTheme);
});

function setTheme(isLili) {
    const nodePassedElement = document.querySelectorAll(".node-passed");
    const nodeAnticipatedElement = document.querySelectorAll(".node-anticipated");
    const bodyElement = document.body;
    const azureModeClassName = 'azure-mode'

    if (!isLili) {
        nodePassedElement.forEach(el => el.classList.add(azureModeClassName));
        nodeAnticipatedElement.forEach(el => el.classList.add(azureModeClassName));
        bodyElement.classList.add(azureModeClassName);
    } else {
        nodePassedElement.forEach(el => el.classList.remove(azureModeClassName));
        nodeAnticipatedElement.forEach(el => el.classList.remove(azureModeClassName));
        bodyElement.classList.remove(azureModeClassName);
    }

    isLiliTheme = isLili;
}

function getDifferenceInWeeks(startDate, endDate) {
    return Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

for (let i = 0; i < totalWeeks; i++) {
    const circle = document.createElement("div");
    if (i < totalWeeksPassed) {
        circle.className = "node-passed"
    } else if (i === totalWeeksPassed) {
        circle.className = "node-anticipated node-current-week";
    } else {
        circle.className = "node-anticipated";
    }
    container.appendChild(circle);
}