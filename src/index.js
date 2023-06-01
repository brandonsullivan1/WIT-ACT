let testButton = document.getElementById('test');

function test() {
    testButton.innerHTML = 'Tested';
    sideMenu.hidden = true;
}

testButton.onclick = test;

