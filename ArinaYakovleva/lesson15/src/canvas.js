const colors = ["#47c9c5", "#75d18d", "#d19475"];
const canvas = document.querySelector('#statistics');
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let newDiagram = new Chart(ctx, colors);

newDiagram.createCanvas();