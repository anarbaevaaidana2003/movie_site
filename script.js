const apiKey = '391fa33f';
let currentPage = 1;  // Текущая страница

async function searchMovies() {
  const query = document.getElementById('search').value;
  currentPage = 1;  // Сбрасываем текущую страницу при новом поиске
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&language=ru&page=${currentPage}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = document.getElementById('results');
  const loadMoreButton = document.getElementById('load-more-button');

  // Очищаем старые результаты
  results.innerHTML = '';

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

    // Проверяем, если есть еще фильмы для загрузки
    if (data.totalResults > currentPage * 10) {  // Если еще есть фильмы для загрузки
      loadMoreButton.style.display = 'inline-block';  // Показываем кнопку
    } else {
      loadMoreButton.style.display = 'none';  // Скрываем кнопку, если нет дополнительных фильмов
    }
  } else {
    results.innerHTML = '<p>Андай фильм табылган жок.</p>';
  }
}


async function loadMoreMovies() {
  currentPage++;  // Увеличиваем номер страницы
  const query = document.getElementById('search').value;
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&language=ru&page=${currentPage}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = document.getElementById('results');
  const loadMoreButton = document.getElementById('load-more-button');

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

    // Проверяем, если есть еще фильмы для загрузки
    if (data.totalResults > currentPage * 10) {  // Если еще есть фильмы для загрузки
      loadMoreButton.style.display = 'inline-block';  // Показываем кнопку
    } else {
      loadMoreButton.style.display = 'none';  // Скрываем кнопку, если нет дополнительных фильмов
    }
  }
}


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
  
  // Скрыть кнопку "Загрузить больше"
  document.getElementById('load-more-container').style.display = 'none';
}

function goBack() {
  document.getElementById('search-section').style.display = 'block';
  document.getElementById('results').style.display = 'flex';
  document.getElementById('details-section').style.display = 'none';

  // Показать кнопку "Загрузить больше" при возвращении
  document.getElementById('load-more-container').style.display = 'flex';

  // Центрировать поисковый блок и результаты
  const resultsContainer = document.getElementById('search-section');
  resultsContainer.style.display = 'flex';
  resultsContainer.style.justifyContent = 'center'; // Центрирование по горизонтали
}
