document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('amiiboForm');
  const amiiboList = document.getElementById('amiiboList');
  const apiUrl = 'https://www.amiiboapi.com/api/amiibo/';

  let db;

  const openDB = () => {
      const request = window.indexedDB.open('amiiboDB', 1);

      request.onerror = (event) => {
          console.error('Error al abrir la base de datos:', event.target.error);
      };

      request.onsuccess = (event) => {
          db = event.target.result;
          console.log('Base de datos abierta correctamente');
          displayAmiiboList();
      };

      request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore('amiiboStore', { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('name', 'name', { unique: false });
          objectStore.createIndex('image', 'image', { unique: false });
          objectStore.createIndex('type', 'type', { unique: false });
          objectStore.createIndex('gameSeries', 'gameSeries', { unique: false });
          objectStore.createIndex('character', 'character', { unique: false });
      };
  };

  const addAmiibo = async () => {
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          const randomAmiibo = data.amiibo[Math.floor(Math.random() * data.amiibo.length)];
          const amiibo = {
              name: randomAmiibo.name,
              image: randomAmiibo.image,
              type: randomAmiibo.type,
              gameSeries: randomAmiibo.gameSeries,
              character: randomAmiibo.character,
          };

          const transaction = db.transaction(['amiiboStore'], 'readwrite');
          const objectStore = transaction.objectStore('amiiboStore');

          objectStore.add(amiibo).onsuccess = () => {
              console.log('Amiibo agregado correctamente');
              displayAmiiboList();
          };
      } catch (error) {
          console.error('Error al obtener datos de la API:', error);
      }
  };

  const updateAmiibo = (amiiboId, updatedName, updatedType, updatedGameSeries, updatedCharacter) => {
      const transaction = db.transaction(['amiiboStore'], 'readwrite');
      const objectStore = transaction.objectStore('amiiboStore');

      const request = objectStore.get(amiiboId);

      request.onsuccess = (event) => {
          const amiibo = event.target.result;

          if (amiibo) {
              amiibo.name = updatedName;
              amiibo.type = updatedType;
              amiibo.gameSeries = updatedGameSeries;
              amiibo.character = updatedCharacter;

              const updateRequest = objectStore.put(amiibo);

              updateRequest.onsuccess = () => {
                  console.log('Amiibo actualizado correctamente');
                  displayAmiiboList();
              };

              updateRequest.onerror = (event) => {
                  console.error('Error al actualizar amiibo:', event.target.error);
              };
          }
      };

      request.onerror = (event) => {
          console.error('Error al obtener amiibo:', event.target.error);
      };
  };

  const deleteAmiibo = (amiiboId) => {
      const transaction = db.transaction(['amiiboStore'], 'readwrite');
      const objectStore = transaction.objectStore('amiiboStore');

      const request = objectStore.get(amiiboId);

      request.onsuccess = (event) => {
          const amiibo = event.target.result;

          if (amiibo) {
              const deleteRequest = objectStore.delete(amiiboId);

              deleteRequest.onsuccess = () => {
                  console.log('Amiibo eliminado correctamente');
                  displayAmiiboList();
              };

              deleteRequest.onerror = (event) => {
                  console.error('Error al eliminar amiibo:', event.target.error);
              };
          }
      };

      request.onerror = (event) => {
          console.error('Error al obtener amiibo:', event.target.error);
      };
  };

  const displayAmiiboList = () => {
      amiiboList.innerHTML = '';

      const objectStore = db.transaction('amiiboStore').objectStore('amiiboStore');
      objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;

          if (cursor) {
              const amiiboContainer = document.createElement('div');
              amiiboContainer.className = 'amiibo-container';

              const amiiboImage = document.createElement('img');
              amiiboImage.src = cursor.value.image;
              amiiboImage.alt = cursor.value.name;

              const amiiboInfo = document.createElement('div');
              amiiboInfo.className = 'amiibo-info';
              amiiboInfo.innerHTML = `
                  <p>${cursor.value.name}</p>
                  <p>Tipo: ${cursor.value.type}</p>
                  <p>Serie: ${cursor.value.gameSeries}</p>
                  <p>Personaje: ${cursor.value.character}</p>
              `;

              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Eliminar';
              deleteButton.onclick = () => {
                  deleteAmiibo(cursor.value.id);
              };

              const updateButton = document.createElement('button');
              updateButton.textContent = 'Actualizar';
              updateButton.onclick = () => {
                  const updatedName = prompt('Ingrese el nuevo nombre:', cursor.value.name);
                  const updatedType = prompt('Ingrese el nuevo tipo:', cursor.value.type);
                  const updatedGameSeries = prompt('Ingrese la nueva serie:', cursor.value.gameSeries);
                  const updatedCharacter = prompt('Ingrese el nuevo personaje:', cursor.value.character);
                  if (updatedName !== null && updatedType !== null && updatedGameSeries !== null && updatedCharacter !== null) {
                      updateAmiibo(cursor.value.id, updatedName, updatedType, updatedGameSeries, updatedCharacter);
                  }
              };

              amiiboContainer.appendChild(amiiboImage);
              amiiboContainer.appendChild(amiiboInfo);
              amiiboContainer.appendChild(updateButton);
              amiiboContainer.appendChild(deleteButton);

              amiiboList.appendChild(amiiboContainer);

              cursor.continue();
          }
      };
  };

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      addAmiibo();
  });

  openDB();
});
