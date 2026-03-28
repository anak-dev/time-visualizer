const CLASS_PASSED = "node-passed";
const CLASS_ANTICIPATED = "node-anticipated";
const CLASS_CURRENT_WEEK = "node-current-week";
const STORAGE_THEME_KEY = "theme"
const STORAGE_THEME_VALUE_LILI = "lili"
const STORAGE_THEME_VALUE_AZURE = "azure"

const startDate = new Date(2025, 11, 19);
const endDate = new Date(2026, 9, 1);
const currentDate = new Date();
const totalWeeks = getDifferenceInWeeks(startDate, endDate);
const totalWeeksPassed = getDifferenceInWeeks(startDate, currentDate);
const container = document.getElementById("container");

let isLiliTheme = localStorage.getItem(STORAGE_THEME_KEY) !== STORAGE_THEME_VALUE_AZURE;

function setTheme(isLili) {
    const nodePassedElement = document.querySelectorAll(`.${CLASS_PASSED}`);
    const nodeAnticipatedElement = document.querySelectorAll(`.${CLASS_ANTICIPATED}`);
    const bodyElement = document.body;
    const azureModeClassName = 'azure-mode'

    if (!isLili) {
        nodePassedElement.forEach(node => node.classList.add(azureModeClassName));
        nodeAnticipatedElement.forEach(node => node.classList.add(azureModeClassName));
        bodyElement.classList.add(azureModeClassName);
    } else {
        nodePassedElement.forEach(node => node.classList.remove(azureModeClassName));
        nodeAnticipatedElement.forEach(node => node.classList.remove(azureModeClassName));
        bodyElement.classList.remove(azureModeClassName);
    }

    isLiliTheme = isLili;
    localStorage.setItem(STORAGE_THEME_KEY, isLili ? STORAGE_THEME_VALUE_LILI : STORAGE_THEME_VALUE_AZURE);
}

function getDifferenceInWeeks(startDate, endDate) {
    return Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

document.addEventListener("click", () => {
    setTheme(!isLiliTheme);
});

const nodes = Array.from({ length: totalWeeks }).map((_, i) => {
    const circle = document.createElement("div");
    if (i < totalWeeksPassed) {
        circle.className = CLASS_PASSED;
    } else if (i === totalWeeksPassed) {
        circle.className = `${CLASS_ANTICIPATED} ${CLASS_CURRENT_WEEK}`;
    } else {
        circle.className = CLASS_ANTICIPATED;
    }
    return circle;
});

container.append(...nodes);

setTheme(isLiliTheme);