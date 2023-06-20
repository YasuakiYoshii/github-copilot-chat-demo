// Set up the canvas and context
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

// Set up the game variables
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
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

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * canvas.width);
    food.y = Math.floor(Math.random() * canvas.height);
  } else {
    snake.pop();
  }

  // Check for collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(intervalId);
    alert('Game over!');
  }

  // Draw the game
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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