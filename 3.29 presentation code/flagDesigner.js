function renderFlag() {
    let code = document.getElementById("codeInput").value.trim();
    let canvas = document.getElementById("flagCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Default values
    let commands = code.split("\n");
    for (let i = 0; i < commands.length; i++) {
        let parts = commands[i].split(" ");
        let command = parts[0];
        let params = parts.slice(1);
        if (command === "rectangle") {
            drawRectangle(ctx, params);
        } else if (command === "circle") {
            drawCircle(ctx, params);
        }
    }
}

function drawRectangle(ctx, params) {
    let x = parseInt(params[0]);
    let y = parseInt(params[1]);
    let width = parseInt(params[2]);
    let height = parseInt(params[3]);
    let color = params[4];
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(ctx, params) {
    let x = parseInt(params[0]);
    let y = parseInt(params[1]);
    let radius = parseInt(params[2]);
    let color = params[3];
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}