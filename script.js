const apiKey = '391fa33f'; // Вставьте ваш API-ключ OMDb

// Поиск фильмов
async function searchMovies() {
  const query = document.getElementById('search').value;
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&language=ru`;
  const response = await fetch(url);
  const data = await response.json();

  const results = document.getElementById('results');
  results.innerHTML = ''; // Очищаем предыдущие результаты

  if (data.Search) {
    data.Search.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';
      movieDiv.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}" />
        <p>${movie.Title}</p>
        <button onclick="showDetails('${movie.imdbID}')">Кененирээк маалымат</button>
      `;
      results.appendChild(movieDiv);
    });
  } else {
    results.innerHTML = '<p>Андай фильм табылган жок.</p>';
  }
}

// Отображение деталей фильма
async function showDetails(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&language=ru`;
  const response = await fetch(url);
  const movie = await response.json();

  const movieDetails = document.getElementById('movie-details');
  movieDetails.innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}" alt="${movie.Title}" style="width: 300px; height: auto;" />
    <p><strong>Жыл:</strong> ${movie.Year}</p>
    <p><strong>Жанр:</strong> ${movie.Genre}</p>
    <p><strong>Сюжети:</strong> ${movie.Plot}</p>
  `;

  document.getElementById('search-section').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('details-section').style.display = 'flex';
}

// Возврат к результатам поиска
function goBack() {
  document.getElementById('search-section').style.display = 'block';
  document.getElementById('results').style.display = 'flex';
  document.getElementById('details-section').style.display = 'none';
}
