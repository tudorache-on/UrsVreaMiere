const target = document.querySelector('.target');
const over = document.querySelector('.over');
const points = document.querySelectorAll('.points');

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

let progress = 3000, count = 0;

const options = {
    root: target,
    rootMargin: '0px',
    threshold: 0,
  };

  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        clearInterval(interval);
        over.classList.add('active');
      }
    });
  }

const observer = new IntersectionObserver(callback, options);

function spawnEnemies() {
    const enemy = document.createElement('img');
    enemy.src = 'images/urs gata.png';
    enemy.classList.add('enemy');

    if (Math.random() >= 0.5) {
        if (Math.random() >= 0.5) {
            enemy.style.transform = 'translate(-100vw, ' + randomNumber(window.innerHeight) + 'px)';
        } else {
            enemy.style.transform = 'translate(150vw, ' + randomNumber(window.innerHeight) + 'px)';
        }
    } else {
        if (Math.random() >= 0.5) {
            enemy.style.transform = 'translate(' + randomNumber(window.innerWidth) + 'px, -100vh)';
        } else {
            enemy.style.transform = 'translate(' + randomNumber(window.innerWidth) + 'px, 150vh)';
        }
    }

    enemy.addEventListener('click', (event) => {
        count++;
        points.forEach(point => {
            point.textContent = count;
        })
        event.target.remove();
    });

    if (progress >= 1000) progress-=100;
    if (count % 15 == 0 && count != 0) setInterval(spawnEnemies, 3000);

    
    target.append(enemy);
    observer.observe(enemy);
}

spawnEnemies();

const interval = setInterval(spawnEnemies, progress);
