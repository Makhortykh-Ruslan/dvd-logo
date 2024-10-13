import {crateBall} from "./ball.js";

const balls = [];
const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8']

const body = document.querySelector('body');
const dvd = document.querySelector('.svg-icon');

let dvdPositionX = 200;
let dvdPositionY = 200;

let dvdVelocityX = 2;
let dvdVelocityY = 2;

body.addEventListener('click', (event) => {
    const ball = crateBall();
    addBall(ball, event.pageX, event.pageY);
    ball.addEventListener('click', removeBall)
    ball.classList.add(colors[randomColor()])
    body.insertAdjacentElement('beforeend', ball)
})


function addBall(ball, x, y) {
    balls.push({
        element: ball,
        positionX: x,
        positionY: y,
        velocityX: 2,
        velocityY: 2,
        idx: 0
    })
}

function updateBalls() {
    balls.forEach((ball, idx) => {
        ball.positionX += ball.velocityX;
        ball.positionY += ball.velocityY;

        if (ball.positionX + 50 >= window.innerWidth || ball.positionX <= 0) {
            ball.velocityX = -ball.velocityX;
        }

        if (ball.positionY + 50 >= window.innerHeight || ball.positionY <= 0) {
            ball.velocityY = -ball.velocityY;
        }

        ball.element.style.left = `${ball.positionX}px`;
        ball.element.style.top = `${ball.positionY}px`;

        ball.element.setAttribute('id', idx);
    })

    dvdPositionX += dvdVelocityX;
    dvdPositionY += dvdVelocityY;

    if (dvdPositionX + 200 >= window.innerWidth || dvdPositionX <= 0) {
        const className = dvd.classList[1]
        dvd.classList.remove(className);
        const color = colors[randomColor()];
        dvd.classList.add(color)
        dvdVelocityX = -dvdVelocityX;
    }

    if (dvdPositionY + 200 >= window.innerHeight || dvdPositionY <= 0) {
        const className = dvd.classList[1]
        dvd.classList.remove(className);
        const color = colors[randomColor()];
        dvd.classList.add(color)
        dvdVelocityY = -dvdVelocityY;
    }

    dvd.style.left = `${dvdPositionX}px`;
    dvd.style.top = `${dvdPositionY}px`;

    requestAnimationFrame(updateBalls);
}

function removeBall(event) {
    balls.splice(+event.target.getAttribute('id'), 1);
    const el = document.getElementById(event.target.getAttribute('id'));
    el.remove();
}

function randomColor() {
    return Math.floor(Math.random() * 8) + 1;
}

requestAnimationFrame(updateBalls)