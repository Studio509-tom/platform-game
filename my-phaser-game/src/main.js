import { Preloader } from './Preloader';
import { Play } from './Play';
import Phaser from 'phaser';

const config = {
    title: 'Card Memory Game',
    type: Phaser.AUTO,
    width: 549,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#192a56',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Play
    ]
};

new Phaser.Game(config);

// Gérer l'ajout dynamique de cartes face cachée
document.getElementById('add-hidden-card').addEventListener('click', function() {
  const numHiddenCardsField = document.getElementById('num-hidden-cards');
  const numHiddenCards = parseInt(numHiddenCardsField.value);

  // Créer un nouvel input de type file pour chaque image face cachée
  const newInputDiv = document.createElement('div');
  
  const newLabel = document.createElement('label');
  newLabel.textContent = `Image de la carte ${numHiddenCards + 1} (face cachée) :`;
  
  const newFileInput = document.createElement('input');
  newFileInput.type = 'file';
  newFileInput.name = `hidden-card-${numHiddenCards + 1}`;
  newFileInput.accept = 'image/*';
  newFileInput.addEventListener('change', handleFileUpload);
  
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Supprimer';
  deleteButton.addEventListener('click', function() {
    newInputDiv.remove();
    updateNumHiddenCards();
  });
  
  newInputDiv.appendChild(newLabel);
  newInputDiv.appendChild(newFileInput);
  newInputDiv.appendChild(deleteButton);
  
  document.getElementById('hidden-cards-container').appendChild(newInputDiv);
  
  numHiddenCardsField.value = numHiddenCards + 1;
});

// Gérer la soumission du formulaire
document.getElementById('card-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData();
  const fileInputs = document.querySelectorAll('input[type="file"][name^="hidden-card-"]');
  
  // Ajouter les fichiers de cartes face cachée à FormData
  fileInputs.forEach(input => {
    if (input.files.length > 0) {
      formData.append('hidden-card-images', input.files[0]);
    }
  });

  // Ajouter l'image du dos des cartes si elle est sélectionnée
  const backImageInput = document.getElementById('card-back');
  if (backImageInput.files.length > 0) {
    formData.append('card-back', backImageInput.files[0]);
		console.log(backImageInput.GetFile(files[0]));
		console.log(URL.backImageInput);
		
		// var object = new ActiveXObject("Scripting.FileSystemObject");
		// var file = object.GetFile("C:\\wamp\\www\\phptest.php");
		// file.Move("C:\\wamp\\");
		// document.write("File is moved successfully");
		// Ecrit dans la destination
  }

  // Affichage des images sélectionnées dans un conteneur d'aperçu
  // displayPreviewImages(fileInputs, backImageInput);
});

// Fonction pour afficher un aperçu des images téléchargées localement
function displayPreviewImages(fileInputs, backImageInput) {
  const previewContainer = document.getElementById('image-preview-container');
  previewContainer.innerHTML = ''; // Réinitialiser les aperçus précédents

  // Afficher l'aperçu de l'image du dos des cartes
  if (backImageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(backImageInput.files[0]);
  }

  // Afficher l'aperçu des images des cartes face cachée
  fileInputs.forEach(input => {
    if (input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
}

// Fonction pour mettre à jour le champ caché num-hidden-cards
function updateNumHiddenCards() {
  const numHiddenCardsField = document.getElementById('num-hidden-cards');
  const numHiddenCards = document.querySelectorAll('input[type="file"][name^="hidden-card-"]').length;
  numHiddenCardsField.value = numHiddenCards;
}

// Fonction pour gérer le téléchargement d'un fichier et afficher un aperçu
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewContainer = document.getElementById('image-preview-container');
      const img = document.createElement('img');
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

  
  