let flipCount = 0;
let pileCount = 0;
let faceCount = 0;

const coin = document.getElementById('coin');
const result = document.getElementById('result');
const flipBtn = document.getElementById('flipBtn');
const history = document.getElementById('history');

flipBtn.addEventListener('click', flipCoin);

function flipCoin() {
    // Désactiver le bouton pendant l'animation
    flipBtn.disabled = true;
    
    // Nombre de rotations aléatoires
    const rotations = Math.floor(Math.random() * 10) + 10;
    const randomResult = Math.random();
    
    // Mettre à jour la rotation
    coin.style.transform = `rotateY(${rotations * 360 + (randomResult > 0.5 ? 0 : 180)}deg)`;
    
    // Déterminer le résultat
    setTimeout(() => {
        flipCount++;
        let result_text;
        
        if (randomResult > 0.5) {
            result_text = 'PILE';
            pileCount++;
        } else {
            result_text = 'FACE';
            faceCount++;
        }
        
        // Afficher le résultat
        result.textContent = '🎯 ' + result_text;
        result.classList.add('show-result');
        
        // Ajouter à l'historique
        addToHistory(result_text);
        
        // Réactiver le bouton
        flipBtn.disabled = false;
        
        // Retirer la classe d'animation
        setTimeout(() => {
            result.classList.remove('show-result');
        }, 1000);
    }, 1000);
}

function addToHistory(resultText) {
    const historyItem = document.createElement('span');
    historyItem.textContent = resultText === 'PILE' ? '🪙' : '🔷';
    historyItem.title = resultText;
    history.insertBefore(historyItem, history.firstChild);
    
    // Garder seulement les 20 derniers lancers
    if (history.children.length > 20) {
        history.removeChild(history.lastChild);
    }
    
    // Mettre à jour les statistiques
    updateStats();
}

function updateStats() {
    const percentage = flipCount > 0 ? Math.round((pileCount / flipCount) * 100) : 0;
    flipBtn.title = `Lancers: ${flipCount} | Pile: ${pileCount} (${percentage}%) | Face: ${faceCount} (${100 - percentage}%)`;
}
