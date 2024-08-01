
const characters = {
    dog: { imageSrc: `Resources/dog.gif`, width: 62, height: 62, speed: 5, zIndex: 10000 },
    mario: { imageSrc: `Resources/mario.gif`, width: 52, height: 52, speed: 7, zIndex: 9999 },
    fox: { imageSrc: `Resources/fox.gif`, width: 42, height: 42, speed: 6, zIndex: 10001 },
    goomba: { imageSrc: `Resources/goomba.gif`, width: 42, height: 42, speed: 3, zIndex: 10002 }
};

const activeCharacters = {};

function createRunningCharacter(options) {
    const characterElement = document.createElement('div');
    characterElement.className = 'running-character';
    characterElement.style.backgroundImage = `url('${options.imageSrc}')`;
    characterElement.style.width = `${options.width}px`;
    characterElement.style.height = `${options.height}px`;
    characterElement.style.zIndex = options.zIndex;

    document.getElementById('character-container').appendChild(characterElement);

    let characterX = 0;
    let characterY = 0;
    let characterSpeed = options.speed;
    let characterDirection = 1; 
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    function setCharacterPosition() {
        characterY = Math.floor(Math.random() * (screenHeight - options.height));
        if (characterDirection === 1) {
            characterX = -options.width; 
        } else {
            characterX = screenWidth; 
        }
        characterElement.style.left = `${characterX}px`;
        characterElement.style.top = `${characterY}px`;
    }

    function updateCharacterPosition() {
        characterX += characterSpeed * characterDirection;

        if (characterX > screenWidth || characterX < -options.width) {
            characterDirection *= -1;
            characterElement.style.transform = `scaleX(${characterDirection})`;
            characterElement.style.display = 'none';
            
            setTimeout(() => {
                setCharacterPosition();
                characterElement.style.display = 'block';
            }, 1000);
        } else {
            characterElement.style.left = `${characterX}px`;
        }
    }

    function animate() {
        updateCharacterPosition();
        requestAnimationFrame(animate);
    }

    function setScreenDimensions() {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    }

    setScreenDimensions();
    setCharacterPosition();
    animate();

    window.addEventListener('resize', setScreenDimensions);

    return characterElement;
}

function toggleCharacter(characterName) {
    const checkbox = document.getElementById(`${characterName}-checkbox`);
    if (checkbox.checked) {
        if (!activeCharacters[characterName]) {
            activeCharacters[characterName] = createRunningCharacter(characters[characterName]);
        }
        activeCharacters[characterName].style.display = 'block';
    } else {
        if (activeCharacters[characterName]) {
            activeCharacters[characterName].style.display = 'none';
        }
    }
}

const menuToggle = document.getElementById('character-menu-toggle');
const menu = document.getElementById('character-menu');

function toggleMenu(event) {
    event.stopPropagation();
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

menuToggle.addEventListener('click', toggleMenu);

toggleCharacter('dog');

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuToggle) {
        menu.style.display = 'none';
    }
});

menu.addEventListener('click', (event) => {
    event.stopPropagation();
});