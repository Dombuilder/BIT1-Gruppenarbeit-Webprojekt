let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  const slides = document.querySelectorAll(".PlanetSlides");
  if (slides.length === 0) return; //Die Tabelle auf der Startseite funktioniert sonst nicht

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  slides.forEach(slide => {
    slide.style.display = "none";
  });

  slides[slideIndex - 1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('th button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const th = button.closest('th');
      const tr = th.closest('tr');
      const table = th.closest('table');
      const tbody = table.querySelector('tbody');

      // Spaltenindex automatisch bestimmen 
      const colIndex = Array.from(tr.children).indexOf(th);
      
      // Aktuellen Zustand prüfen und umkehren
      const currentSort = th.getAttribute('aria-sort');
      const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';

      // Alle anderen Spalten mit aria-sort zurücksetzen
      tr.querySelectorAll('th[aria-sort]').forEach(header => {
        header.setAttribute('aria-sort', 'none');
      });

      // Aktive Spalte aktualisieren
      th.setAttribute('aria-sort', newSort);

      // Zeilen auslesen (falls kein <tbody> existiert, alle <tr> außer der Kopfzeile nehmen)
      const rows = Array.from(table.querySelectorAll('tr'))
  .filter(row => !row.querySelector('th'));
      rows.sort((rowA, rowB) => {
        const cellA = rowA.children[colIndex].textContent.trim();
        const cellB = rowB.children[colIndex].textContent.trim();

        // Zahlen aus Texten extrahieren 
        const numA = parseFloat(cellA.replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]+/g, ''));
        const numB = parseFloat(cellB.replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]+/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
          return newSort === 'ascending' ? numA - numB : numB - numA;
        }

        // Alphabetische Sortierung für Text 
        return newSort === 'ascending'
          ? cellA.localeCompare(cellB, 'de', { sensitivity: 'base' })
          : cellB.localeCompare(cellA, 'de', { sensitivity: 'base' });
      });

      // Sortierte Zeilen wieder einfügen
      const targetContainer = tbody || table;
      rows.forEach(row => targetContainer.appendChild(row));
    });
  });
});