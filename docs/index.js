// Set up the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

// Set up the game variables
let snake = [{x: 10, y: 10}];
let food = {x: Math.floor(Math.random() * canvas.width / 10), y: Math.floor(Math.random() * canvas.height / 10)};
let direction = 'right';

// Set up the game loop
function gameLoop() {
  // Move the snake
  let head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  snake.unshift(head);

  // Check for collision with the food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food
    food.x = Math.floor(Math.random() * canvas.width / 10);
    food.y = Math.floor(Math.random() * canvas.height / 10);
  } else {
    // Remove the tail segment
    snake.pop();
  }

  // Check for collision with the walls or the snake's body
  if (head.x < 0 || head.x >= canvas.width / 10 ||
      head.y < 0 || head.y >= canvas.height / 10 ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    clearInterval(intervalId);
    alert('Game over!');
    // Reset the game variables
    snake = [{x: 10, y: 10}];
    food = {x: Math.floor(Math.random() * canvas.width / 10), y: Math.floor(Math.random() * canvas.height / 10)};
    direction = 'right';
    intervalId = setInterval(gameLoop, 100);
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the game
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
  });
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

let intervalId = setInterval(gameLoop, 100);

// Set up the keyboard controls
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
});