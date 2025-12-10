const API_KEY = 'a1e72fd93ed59f56e6332813b9f8dcae';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/original';
    let currentItem;
let currentSeason = 1;
let currentEpisode = 1;
let urlss = null;
let imdbIdd = null;



const subtitleControls = document.getElementById('subtitle-controls');

// Hide the whole controls
function hideSubtitleControls() {
  subtitleControls.style.display = 'none';
}

// Show the whole controls
function showSubtitleControls() {
try{
  if(tampermonkey){

document.getElementById('subtitle-section').display = 'block';
subtitleControls.style.display = 'flex';

}
}catch(e){}

 hideSubtitleControls();
  
}

// ---------------- PARENT PAGE SCRIPT ----------------
let subtitleOptions = []; 
// each item: { label: string, type: "remote"|"custom", value: string }

// window.addEventListener("message", async (event) => {
//     if (typeof event.data === "string" && event.data.includes("http")) {
//         const htmlUrls = event.data.split(",").map(u => u.trim());
//         //alert(htmlUrls);
//         subtitleOptions = []; 
//         for (const url of htmlUrls) {
//             const subtitlesMeta = await fetchSubtitleList(url);
//             subtitlesMeta.forEach(sub => {
//                 subtitleOptions.push({ label: sub.label, type: "remote", value: sub.url });
//             });
//         }
        
//         refreshSubtitlePicker();
//     }
// });


async function fetchSubtitleList(htmlUrl) {
    try {
        const html = await fetch(htmlUrl).then(r => r.text());
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const rows = doc.querySelectorAll("table tbody tr");
        const list = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length < 4) return;

            const label = cells[0].innerText.trim();
            const link = cells[3].querySelector("a");
            const subtitleUrl = link?.href;
            if (!subtitleUrl) return;

            list.push({ label: label || "Unknown", url: subtitleUrl });
        });

        return list;
    } catch (err) {
        console.error("Error fetching subtitle list:", err);
        return [];
    }
}

function refreshSubtitlePicker() {
    const picker = document.getElementById("subtitlePicker");
    picker.innerHTML = "";

    // "Off" option
    const offOption = document.createElement("option");
    offOption.value = "off";
    offOption.textContent = "Off";
    picker.appendChild(offOption);

    // Append from subtitleOptions
    subtitleOptions.forEach((sub, idx) => {
        const opt = document.createElement("option");
        opt.value = idx; // index in subtitleOptions
        opt.textContent = sub.label + (sub.type === "custom" ? " (Custom)" : "");
        picker.appendChild(opt);
    });
}

// Apply button click
document.getElementById("applySubtitle").addEventListener("click", function() {
    const picker = document.getElementById("subtitlePicker");
    const selected = picker.value;
    const iframe = document.getElementById('modal-video').contentWindow;

    if (selected === "off") {
       iframe.postMessage({ type: "disable-subtitles" }, "*");
    } else {
        const sub = subtitleOptions[selected];
        if (sub.type === "remote") {
            //alert(sub.value);
            iframe.postMessage({ type: "subtitle-url", url: sub.value }, "*");
        } else if (sub.type === "custom") {
            iframe.postMessage({ type: "subtitle-data", data: sub.value, label: sub.label }, "*");
        }
    }
});

// Upload custom subtitle → add to list
document.getElementById("uploadSubtitle").addEventListener("change", async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    let vtt = text.startsWith("WEBVTT") ? text : srtToVtt(text);

    const dataUri = "data:text/vtt;charset=utf-8," + encodeURIComponent(vtt);
    subtitleOptions.push({ label: file.name, type: "custom", value: dataUri });
    refreshSubtitlePicker();
});

function srtToVtt(srt) {
    srt = srt.replace(/^\uFEFF/, '');
    srt = srt.replace(/^\d+\s*$/gm, '');
    srt = srt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
    return 'WEBVTT\n\n' + srt.trim();
}


window.addEventListener("message", (event) => {
   
   if (typeof event.data === "string" && event.data.includes("http")) {
    urlss = event.data;
    //alert(urlss);
   }

if (event.data === "ready") {
     const iframe = document.getElementById('modal-video');
     iframe.contentWindow.postMessage("id:"+urlss, "*");
     //alert("id:"+urlss);
  }
});

const SERVER_MAP = {
  server1: "https://vidsrc.cc/v2/embed/",
  server2: "https://vidsrc.me/embed/",
  server3: "https://vidjoy.pro/embed/",
  server4: "https://player.videasy.net/",
  server5: "https://111movies.com/",
  server6: "https://vidsrc.dev/embed/",
  server7: "https://vidlink.pro/",
  server8: "https://vidsrc.io/embed/",
  server9: "https://vidsrc.xyz/embed/",
  server10: "https://www.2embed.cc/embed/",
  server11: "https://moviesapi.club/"
};




function getEmbedUrl(server, type, tmdbId, season = 1, episode = 1) {

const picker = document.getElementById("subtitlePicker");
picker.innerHTML = "";
    
const iframe = document.getElementById('modal-video');
    
if(type === 'tv'){
document.getElementById('subtitle-preview').src = `https://subtitle.jemaroctavo.workers.dev/?url=https://vidlink.pro/tv/${tmdbId}/${season}/${episode}&imdbId=${imdbIdd}`;
}else{
document.getElementById('subtitle-preview').src = `https://subtitle.jemaroctavo.workers.dev/?url=https://vidlink.pro/movie/${tmdbId}&imdbId=${imdbIdd}`;
}
    
showSubtitleControls();

  switch (server) {
    case 'server1': // vidsrc.cc
iframe.removeAttribute('sandbox');
    // return type === 'tv'
    //     ? `https://apimocine.vercel.app/tv/${tmdbId}/${season}/${episode}`
    //     : `https://apimocine.vercel.app/movie/${tmdbId}`;
// return type === 'tv'
//     ? `https://vidsrc.jemaroctavo.workers.dev/?url=https://player.videasy.net/tv/${tmdbId}/${season}/${episode}`
//     : `https://vidsrc.jemaroctavo.workers.dev/?url=https://player.videasy.net/movie/${tmdbId}`;
 return type === 'tv'
       ? `https://player.videasy.net/tv/${tmdbId}/${season}/${episode}`
        : `https://player.videasy.net/movie/${tmdbId}`;

    case 'server2': // vidsrc.me
iframe.removeAttribute('sandbox');
      return type === 'tv'
       ? `https://vidjoy.pro/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidjoy.pro/embed/movie/${tmdbId}`;
    case 'server3': // vidjoy.pro
iframe.removeAttribute('sandbox');
      return type === 'tv'
         ? `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.cc/v2/embed/movie/${tmdbId}`;
    case 'server4': // player.videasy.net
iframe.removeAttribute('sandbox');
      return type === 'tv'
      ? `https://vidsrc.me/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.me/embed/movie/${tmdbId}`;
    case 'server5': // 111movies.com
    iframe.removeAttribute('sandbox');
      return type === 'tv'
         ? `https://moviesapi.club/tv/${tmdbId}/${season}/${episode}`
         : `https://moviesapi.club/movie/${tmdbId}`;
    // case 'server6': // vidsrc.dev
    // iframe.removeAttribute('sandbox');
    //   return type === 'tv'
    //    ? `https://player.videasy.net/tv/${tmdbId}/${season}/${episode}`
    //     : `https://player.videasy.net/movie/${tmdbId}`;
    case 'server6': // vidlink.pro
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://111movies.com/tv/${tmdbId}/${season}/${episode}`
       : `https://111movies.com/movie/${tmdbId}`;
    case 'server7': // vidsrc.io
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://vidsrc.vip/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.vip/embed/movie/${tmdbId}`;
    case 'server8': // vidsrc.xyz
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`
        : `https://vidlink.pro/movie/${tmdbId}`;
    case 'server9': // 2embed.cc
    iframe.removeAttribute('sandbox');
      return type === 'tv'
       ? `https://vidsrc.io/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.io/embed/movie/${tmdbId}`;
    case 'server10': // moviesapi.club
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.xyz/embed/movie/${tmdbId}`;
    case 'server11': // moviesapi.club
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://www.2embed.cc/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://www.2embed.cc/embed/${tmdbId}`;
  case 'server12': // moviesapi.club
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://player.smashystream.com/m/tv/${tmdbId}/${season}/${episode}`
        : `https://player.smashystream.com/movie/${tmdbId}`;     

 
    case 'admin-server1': // moviesapi.club
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://player-vidsrc.jemaroctavo.workers.dev/?url=https://player.vidsrc.co/embed/tv/${tmdbId}/${season}/${episode}?autoplay=true&server=1?autoplay=true&autonext=true&nextbutton=true&poster=true&primarycolor=db0000&secondarycolor=a2a2a2&iconcolor=eefdec`
        : `https://player-vidsrc.jemaroctavo.workers.dev/?url=https://player.vidsrc.co/embed/movie/${tmdbId}?autoplay=true&server=1?autoplay=true&autonext=true&nextbutton=true&poster=true&primarycolor=db0000&secondarycolor=a2a2a2&iconcolor=eefdec`;     
 
    case 'admin-server2': // moviesapi.club
    iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://vidjoy.jemaroctavo.workers.dev/?url=https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`
        : `https://vidjoy.jemaroctavo.workers.dev/?url=https://vidlink.pro/movie/${tmdbId}`;    
 
    case 'admin-server3': // moviesapi.club
    iframe.removeAttribute('sandbox');
  //  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');

    
     return type === 'tv'
        ? `https://strip-ads-cleaner.jemaroctavo.workers.dev/?url=https://vidjoy.pro/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://strip-ads-cleaner.jemaroctavo.workers.dev/?url=https://vidjoy.pro/embed/movie/${tmdbId}`;     


  
    case 'admin-server4': // moviesapi.club
 
        iframe.removeAttribute('sandbox');
      return type === 'tv'
        ? `https://embed.jemaroctavo.workers.dev/?url=https://www.2embed.cc/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://embed.jemaroctavo.workers.dev/?url=https://www.2embed.cc/embed/${tmdbId}`;     

 
  case 'admin-server5': // moviesapi.club
  
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
      return type === 'tv'
        ? `https://iframe.pstream.org/embed/tmdb-tv-${tmdbId}/${season}/${episode}?theme=grape&language=en&logo=false&downloads=false&language-order=en%2Chi%2Cfr%2Cde%2Cnl%2Cpt&allinone=true&scale=1.0&backlink=https%3A%2F%2Ffreeflix.top&fedapi=false&interface-settings=false&tips=false&has-watchparty=false`
        : `https://iframe.pstream.org/embed/tmdb-movie-${tmdbId}?theme=grape&language=en&logo=false&downloads=false&language-order=en%2Chi%2Cfr%2Cde%2Cnl%2Cpt&allinone=true&scale=1.0&backlink=https%3A%2F%2Ffreeflix.top&fedapi=false&interface-settings=false&tips=false&has-watchparty=false`;     


          
    default:
      return '';
  }
}












let bannerItem = null;




function watchNow() {
  const user = firebase.auth().currentUser;
  if (!user) {
     document.getElementById('login-alert').style.display = 'flex';
    return;
  }

  if (!bannerItem) {
    alert("No content available.");
    return;
  }

  showDetails(bannerItem); // 👈 this loads the banner content into modal
}
























    // async function fetchTrending(type) {
    //   const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
    //   const data = await res.json();
    //   return data.results;
    // }



// async function fetchTrending(type) {
//   const totalPages = 30; // 5 pages × 20 results = 100 items
//   const results = [];

//   for (let page = 1; page <= totalPages; page++) {
//     const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${page}`);
//     const data = await res.json();
//     if (data.results) {
//       results.push(...data.results);
//     }
//   }

//   return results;
// }





// async function fetchByGenre(genreId) {
//   const totalPages = 30; // Fetch 5 pages for up to 100 results
//   const results = [];

//   for (let page = 1; page <= totalPages; page++) {
//     const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
//     const data = await res.json();
//     if (data.results) {
//       results.push(...data.results);
//     }
//   }

//   return results;
// }





// async function fetchTrendingAnime() {
//   const allResults = [];

//   for (let page = 1; page <= 50; page++) {
//     const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
//     const data = await res.json();

//     const filtered = data.results.filter(item =>
//       item.original_language === 'ja' && item.genre_ids.includes(16)
//     );

//     allResults.push(...filtered);
//   }

//   return allResults;
// }





//     async function fetchTrendingAnime() {
//   let allResults = [];

//   // Fetch from multiple pages to get more anime (max 3 pages for demo)
//   for (let page = 1; page <= 3; page++) {
//     const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
//     const data = await res.json();
//     const filtered = data.results.filter(item =>
//       item.original_language === 'ja' && item.genre_ids.includes(16)
//     );
//     allResults = allResults.concat(filtered);
//   }

//   return allResults;
// }






function requireLogin(actionCallback) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please log in to continue.");
    // Optionally: redirect to login page
    // window.location.href = "/login.html";
    return false;
  }
  if (typeof actionCallback === "function") actionCallback();
  return true;
}






/*function changeServer() {
  const server = document.getElementById('server').value;
  const type = currentItem.media_type === "movie" ? "movie" : "tv";
  const tmdbId = currentItem.id;

 // const season = document.getElementById('season-select')?.value || 1;
//  const episode = document.getElementById('episode-select')?.value || 1;

//const embedURL = getEmbedUrl(server, type, tmdbId, season, episode);
    
 const embedURL = getEmbedUrl(server, type, tmdbId, currentSeason, currentEpisode);
 //document.getElementById('modal-video').removeAttribute('src');    
  document.getElementById('modal-video').src = embedURL;
}
*/




function changeServer() {
  const server = document.getElementById('server').value;
  const type = currentItem.media_type === "movie" ? "movie" : "tv";
  const tmdbId = currentItem.id;

 // const season = document.getElementById('season-select')?.value || 1;
//  const episode = document.getElementById('episode-select')?.value || 1;

//const embedURL = getEmbedUrl(server, type, tmdbId, season, episode);
    
const iframe = document.getElementById('modal-video');
const embedURL = getEmbedUrl(server, type, tmdbId, currentSeason, currentEpisode);


    
// Temporarily disable iframe by replacing with a clone
const clone = iframe.cloneNode(true);
clone.removeAttribute('src'); // remove src to prevent instant load

iframe.replaceWith(clone); // swap it
clone.src = embedURL; // assign new video source
clone.id = 'modal-video';


}




// function changeServer() {
//   const server = document.getElementById('server').value;
//   const type = currentItem.media_type === "movie" ? "movie" : "tv";
//   const tmdbId = currentItem.id;

//   const iframe = document.getElementById('modal-video');
//   const embedURL = getEmbedUrl(server, type, tmdbId, currentSeason, currentEpisode);

//   // Replace with a clone
//   const clone = iframe.cloneNode(true);
//   clone.removeAttribute('src');
//   iframe.replaceWith(clone);

//   // Wait for iframe to load before posting
//   clone.addEventListener('load', () => {
//     clone.contentWindow.postMessage("id:" + tmdbId, "*");
//   });

//   clone.src = embedURL;
//   clone.id = 'modal-video';
// }





function markEpisodeWatched(tmdbId, seasonNumber, episodeNumber) {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please log in to mark episodes as watched.");
    return Promise.resolve(); // fallback
  }

  const docRef = firebase.firestore()
    .collection("users")
    .doc(user.uid)
    .collection("watchedEpisodes")
    .doc(String(tmdbId));

  const update = {};
  update[`season_${seasonNumber}.episode_${episodeNumber}`] = true;

  return docRef.set(update, { merge: true });
}











function createEpisodeCard(ep, seasonNumber, watchedData, activeEpisode) {
  const tmdbId = currentItem.id;
  const watched = watchedData[`season_${seasonNumber}.episode_${ep.episode_number}`];
  const isActive = ep.episode_number === activeEpisode;

  const card = document.createElement('div');
  card.className = 'episode-card';
  if (watched) card.classList.add('watched');
  if (isActive) card.classList.add('active');

  card.onclick = () => {
    document.getElementById('season-select').value = seasonNumber;
    changeEpisodeFromCard(seasonNumber, ep.episode_number);
  };

  const thumb = ep.still_path
    ? `${IMG_URL}${ep.still_path}`
    : 'https://via.placeholder.com/160x90?text=No+Image';

  card.innerHTML = `
    <img src="${thumb}" alt="Ep ${ep.episode_number}">
    <div class="episode-info">Ep ${ep.episode_number}<br><p>${ep.name}</p></div>
  `;

  return card;
}









/*async function changeEpisodeFromCard(season, episode) {

    currentSeason = season;
    currentEpisode = episode;
    
  document.getElementById('season-select').value = season;

  const server = document.getElementById('server').value;
  const embedURL = getEmbedUrl(server, 'tv', currentItem.id, season, episode);
  document.getElementById('modal-video').src = embedURL;

  // 🔁 Save watched status first before refreshing UI
  await markEpisodeWatched(currentItem.id, season, episode);

  // ✅ Now re-populate AFTER marking watched is done
  populateEpisodes(season, episode);
}
*/



async function changeEpisodeFromCard(season, episode) {

    currentSeason = season;
    currentEpisode = episode;
    
  document.getElementById('season-select').value = season;

  const server = document.getElementById('server').value;
  const embedURL = getEmbedUrl(server, 'tv', currentItem.id, season, episode);
 const iframe = document.getElementById('modal-video');
const clone = iframe.cloneNode(true);
clone.removeAttribute('src');
iframe.replaceWith(clone);
clone.src = embedURL;
clone.id = 'modal-video';


  // 🔁 Save watched status first before refreshing UI
  await markEpisodeWatched(currentItem.id, season, episode);

  // ✅ Now re-populate AFTER marking watched is done
  populateEpisodes(season, episode);

  const response = await fetch(`https://api.themoviedb.org/3/tv/${currentItem.id}/season/${season}?api_key=${API_KEY}`);
  const data = await response.json();

  const episodeData = data.episodes.find(e => e.episode_number === episode);
  const releaseDate = episodeData?.air_date || 'Unknown';

  const infoDiv = document.getElementById('extra-info');
  infoDiv.innerHTML = `<br><strong>Episode Air Date:</strong> ${releaseDate}`;



    
}





async function populateEpisodes(seasonNumber = 1, scrollToEpisode = null) {
  if (!currentItem || !currentItem.id || currentItem.media_type !== 'tv') return;

  const tmdbId = currentItem.id;
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) return;

  const container = document.getElementById('episode-slider');
  const scrollLeft = container.scrollLeft; // save scroll position

  const res = await fetch(`${BASE_URL}/tv/${tmdbId}/season/${seasonNumber}?api_key=${API_KEY}`);
  const data = await res.json();

  container.innerHTML = '';

  let watchedData = {};
  try {
    const doc = await firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('watchedEpisodes')
      .doc(String(tmdbId))
      .get();
    if (doc.exists) watchedData = doc.data();
  } catch (err) {
    console.warn('Could not fetch watched episodes:', err.message);
  }

  data.episodes.forEach(ep => {
  const card = createEpisodeCard(ep, seasonNumber, watchedData, scrollToEpisode);
  container.appendChild(card);
});

  // Restore scroll position
  container.scrollLeft = scrollLeft;
}
















function generateEpisodeOption(ep, seasonNumber, watchedData) {
  const key = `season_${seasonNumber}.episode_${ep.episode_number}`;
  const watched = watchedData[key] === true;

  const option = document.createElement('option');
  option.value = ep.episode_number;

  // Build thumbnail URL based on ep.still_path
  const thumbUrl = ep.still_path
    ? `${IMG_URL}${ep.still_path}`
    : 'default_thumb.jpg'; // fallback image

  option.innerHTML = `
    <span class="thumb-container">
      <img class="ep-thumb" src="${thumbUrl}" alt="Ep ${ep.episode_number}" />
      <span class="ep-title">${watched ? '✅ ' : ''}Ep ${ep.episode_number}: ${ep.name}</span>
    </span>`;
  return option;
}











function handleSeasonChange() {
  const selectedSeason = document.getElementById('season-select').value;
  populateEpisodes(selectedSeason);
}






/*async function changeEpisode() {
  const episode = document.getElementById('episode-select').value;
  const server = document.getElementById('server').value;
  const tmdbId = currentItem.id;
  const season = document.getElementById('season-select')?.value || 1;

  const user = firebase.auth().currentUser;
  if (!user) return;

  markEpisodeWatched(tmdbId, season, episode);

  const ref = firebase.firestore()
    .collection("users")
    .doc(user.uid)
    .collection("watchedEpisodes")
    .doc(String(tmdbId));

  await ref.set({
    [`season_${season}.episode_${episode}`]: true
  }, { merge: true });

  try {
    const doc = await ref.get();
    const watchedData = doc.exists ? doc.data() : {};

    const res = await fetch(`${BASE_URL}/tv/${tmdbId}/season/${season}?api_key=${API_KEY}`);
    const data = await res.json();

    const select = document.getElementById('episode-select');
    select.innerHTML = '';
    data.episodes.forEach(ep => {
      const option = generateEpisodeOption(ep, season, watchedData);
      select.appendChild(option);
    });

    select.value = episode;
  } catch (err) {
    console.error("Error refreshing episode list:", err.message);
  }

  // Embed video
  const base = SERVER_MAP[server];
 const embedURL = getEmbedUrl(server, 'tv', tmdbId, season, episode);

  document.getElementById('modal-video').src = embedURL;
}
*/




async function changeEpisode() {
  const episode = document.getElementById('episode-select').value;
  const server = document.getElementById('server').value;
  const tmdbId = currentItem.id;
  const season = document.getElementById('season-select')?.value || 1;

  const user = firebase.auth().currentUser;
  if (!user) return;

  markEpisodeWatched(tmdbId, season, episode);

  const ref = firebase.firestore()
    .collection("users")
    .doc(user.uid)
    .collection("watchedEpisodes")
    .doc(String(tmdbId));

  await ref.set({
    [`season_${season}.episode_${episode}`]: true
  }, { merge: true });

  try {
    const doc = await ref.get();
    const watchedData = doc.exists ? doc.data() : {};

    const res = await fetch(`${BASE_URL}/tv/${tmdbId}/season/${season}?api_key=${API_KEY}`);
    const data = await res.json();

    const select = document.getElementById('episode-select');
    select.innerHTML = '';
    data.episodes.forEach(ep => {
      const option = generateEpisodeOption(ep, season, watchedData);
      select.appendChild(option);
    });

    select.value = episode;
  } catch (err) {
    console.error("Error refreshing episode list:", err.message);
  }

  // Embed video
  const base = SERVER_MAP[server];
 const embedURL = getEmbedUrl(server, 'tv', tmdbId, season, episode);

const iframe = document.getElementById('modal-video');
const clone = iframe.cloneNode(true);
clone.removeAttribute('src');
iframe.replaceWith(clone);
clone.src = embedURL;
clone.id = 'modal-video';

}






    function displayBanner(item) {
     bannerItem = item; 
    //   document.getElementById('banner-image').src = `${IMG_URL}${item.backdrop_path}`;
      //document.getElementById('banner-title').textContent = item.title || item.name;


const img = document.getElementById('banner-image');
  img.classList.remove('loaded'); // reset state
  img.src = `${IMG_URL}${item.backdrop_path}`;
  document.getElementById('banner-title').textContent = item.title || item.name;

  // Wait for image to load before showing
  img.onload = () => {
    img.classList.add('loaded');
  };
    }









//    function displayList(items, containerId) {
//   const container = document.getElementById(containerId);
//   container.innerHTML = '';
//   items.forEach(item => {
//     const img = document.createElement('img');
//     img.src = `${IMG_URL}${item.poster_path}`;
//     img.alt = item.title || item.name;
//     img.onclick = () => {
//       const user = firebase.auth().currentUser;
//       if (!user) {
//         document.getElementById('login-alert').style.display = 'flex';
//         return;
//       }
//       showDetails(item);
//     };
//     container.appendChild(img);
//   });
// }





function displayList(items, containerId) {
  const container = document.getElementById(containerId);
  const itemsPerPage = 10;
  let currentPage = 1;

  function renderPage(page) {
    container.innerHTML = ''; // Clear container
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = items.slice(start, end);

    pageItems.forEach(item => {
      const img = document.createElement('img');
      img.src = `${IMG_URL}${item.poster_path}`;
      img.alt = item.title || item.name;
      img.onclick = () => {
        const user = firebase.auth().currentUser;
        if (!user) {
          document.getElementById('login-alert').style.display = 'flex';
          return;
        }
        showDetails(item);
      };
      container.appendChild(img);
    });

    renderNavigation();
  }



 function renderNavigation() {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (totalPages <= 1) return;

    const nav = document.createElement('div');
    nav.className = 'pagination-nav';

    const prev = document.createElement('button');
    prev.textContent = '<';
    prev.disabled = currentPage === 1;
    prev.className = 'nav-button';
    prev.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    };

    const next = document.createElement('button');
    next.textContent = '>';
    next.disabled = currentPage === totalPages;
    next.className = 'nav-button';
    next.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    };

    nav.appendChild(prev);
    const pageIndicator = document.createElement('span');
    pageIndicator.textContent = ` Page ${currentPage} of ${totalPages} `;
    nav.appendChild(pageIndicator);
    nav.appendChild(next);

    container.appendChild(nav);
  }

  renderPage(currentPage);
}




























    async function showDetails(item) {
  currentItem = item;

    if (!currentItem.media_type) {
    currentItem.media_type = item.title ? 'movie' : 'tv';
  }


const seasonWrapper = document.getElementById('season-wrapper');
const episodeWrapper = document.getElementById('episode-wrapper');

if (currentItem.media_type === 'tv') {
  if (seasonWrapper) seasonWrapper.style.display = 'block';
  if (episodeWrapper) episodeWrapper.style.display = 'block';
} else {
  if (seasonWrapper) seasonWrapper.style.display = 'none';
  if (episodeWrapper) episodeWrapper.style.display = 'none';
}


        
  document.getElementById('modal-title').textContent = item.title || item.name;
  document.getElementById('modal-description').textContent = item.overview;
  document.getElementById('modal-image').src = `${IMG_URL}${item.poster_path}`;
  document.getElementById('modal-rating').innerHTML = '★'.repeat(Math.round(item.vote_average / 2));

  // Extra info
  let imdbId = 'N/A';
  let slug = (item.title || item.name || '').toLowerCase().replace(/\s+/g, '-');
  let tmdbId = item.id;
  let releaseDate = item.release_date || item.first_air_date || 'Unknown';

  try {
    const res = await fetch(`${BASE_URL}/${item.media_type || 'movie'}/${tmdbId}/external_ids?api_key=${API_KEY}`);
    const data = await res.json();
    imdbId = data.imdb_id || 'N/A';
    imdbIdd = imdbId;
  } catch (e) {
    console.warn('Could not fetch IMDb ID', e);
  }
// extra info
 const infoDiv = document.getElementById('extra-info');

    //<strong>IMDb ID:</strong> ${imdbId}<br>
    //<strong>Slug:</strong> ${slug}<br>
   

  infoDiv.innerHTML = `
    <strong>🗓️•Release Date:</strong> ${releaseDate}
  `;



 // ➕ Save to Firebase movie collection
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      await firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .collection("movieCollection")
        .doc(String(tmdbId))
        .set({
          title: item.title || item.name,
          addedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      console.log("Movie saved to collection.");
    }
  } catch (e) {
    console.warn("Failed to save to movie collection:", e);
  }




  // TV Series Handling
  const seasonSelect = document.getElementById('season-select');
  const episodeSelect = document.getElementById('episode-select');

  if (item.media_type === 'tv') {
    seasonSelect.innerHTML = '';
    seasonSelect.style.display = 'inline-block';

    try {
      const res = await fetch(`${BASE_URL}/tv/${item.id}?api_key=${API_KEY}`);
      const data = await res.json();

      data.seasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season.season_number;
        option.textContent = `Season ${season.season_number}`;
        seasonSelect.appendChild(option);
      });

      await populateEpisodes(data.seasons[0].season_number); // Load episodes for first season
    } catch (e) {
      console.error('Error fetching seasons:', e);
    }
  } else {
  document.getElementById('season-wrapper').style.display = 'none';
  document.getElementById('episode-wrapper').style.display = 'none';
}


  changeServer();
  document.getElementById('modal').style.display = 'flex';
}



















    function closeModal() {
      document.getElementById('modal').style.display = 'none';
      document.getElementById('modal-video').src = '';
    }





 
   function openSearchModal() {
  const input = document.getElementById('search-input');
  document.getElementById('search-modal').style.display = 'flex';
  input.focus();
  if (input.value.trim()) {
    searchTMDB();
  }
}








    function closeSearchModal() {
      document.getElementById('search-modal').style.display = 'none';
      document.getElementById('search-results').innerHTML = '';
    }


function closeLoginAlert() {
  document.getElementById('login-alert').style.display = 'none';
}






   async function searchTMDB(triggeredByEnter = false) {
  const query = document.getElementById('search-input').value.trim();
  const container = document.getElementById('search-results');
  container.innerHTML = '';

  if (!query) return;

  // Show loading message
  const loadingMsg = document.createElement('p');
  loadingMsg.textContent = 'Loading...';
  container.appendChild(loadingMsg);

  try {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();

    container.innerHTML = '';

    if (!data.results || data.results.length === 0) {
      const noResult = document.createElement('p');
      noResult.textContent = 'No results found.';
      container.appendChild(noResult);
      return;
    }

    data.results.forEach(item => {
      if (!item.poster_path) return;
      const img = document.createElement('img');
      img.src = `${IMG_URL}${item.poster_path}`;
      img.alt = item.title || item.name;
     img.onclick = () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    document.getElementById('login-alert').style.display = 'flex';
    return;
  }
  closeSearchModal();
  showDetails(item);
};

      container.appendChild(img);
    });
  } catch (error) {
    container.innerHTML = '<p>Error fetching data.</p>';
    console.error('Search error:', error);
  }
}













firebase.auth().onAuthStateChanged(user => {
  const loginBtn = document.getElementById('login-btn');
  const profile = document.getElementById('profile');
  const usernameText = document.getElementById('profile-username');
  const profileCircle = document.getElementById('profile-circle');

  if (user) {
    loginBtn.style.display = 'none';
    profile.style.display = 'block';

    firebase.firestore().collection("users").doc(user.uid).get()
      .then(doc => {
        let displayName = user.email || 'User';

        if (doc.exists && doc.data().username) {
          displayName = doc.data().username;
        }

        usernameText.textContent = `Hello, ${displayName}`;
        profileCircle.textContent = displayName.charAt(0).toUpperCase();
      });
  } else {
    loginBtn.style.display = 'block';
    profile.style.display = 'none';
  }
});




// Show/hide profile dropdown menu
document.getElementById("profile-circle").onclick = function () {
  const menu = document.getElementById("profile-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};






// Change Username
function changeUsername() {
  const newUsername = document.getElementById("new-username").value.trim();
  const user = firebase.auth().currentUser;
  if (!user || !newUsername) return;

  firebase.firestore().collection("users").doc(user.uid).set({
    username: newUsername
  }, { merge: true }).then(() => {
    document.getElementById("profile-username").textContent = `Hello, ${newUsername}`;
    document.getElementById("profile-circle").textContent = newUsername.charAt(0).toUpperCase();
    alert("Username updated!");
  }).catch(err => {
    alert("Error updating username.");
    console.error(err);
  });
}






// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    location.reload();
  }).catch(error => {
    console.error("Logout error:", error);
  });
}

// Reset watched episodes
function resetWatched() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  if (confirm("Are you sure you want to reset all watched episodes?")) {
    firebase.firestore().collection("users")
      .doc(user.uid)
      .collection("watchedEpisodes")
      .get()
      .then(snapshot => {
        const batch = firebase.firestore().batch();
        snapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => alert("Watched episodes reset."))
      .catch(err => console.error("Error resetting watched:", err));
  }
}






// async function fetchVivamax() {
//   const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=149142`);
//   const data = await res.json();
//   return data.results;
// }






async function fetchVivamax() {
  const totalPages = 150; // Fetch 5 pages (up to 100 movies)
  const results = [];

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=149142&page=${page}`);
    const data = await res.json();
    if (data.results) {
      results.push(...data.results);
    }
  }

  return results;
}









//     async function init() {
//       const movies = await fetchTrending('movie');
//       const tvShows = await fetchTrending('tv');
//       const anime = await fetchTrendingAnime('anime');

//       displayBanner(movies[Math.floor(Math.random() * movies.length)]);
//       displayList(movies, 'movies-list');
//       displayList(tvShows, 'tvshows-list');
//       displayList(anime, 'anime-list');
//       document.getElementById('search-input').addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     searchTMDB(true);
//   }
// });

// const horror = await fetchByGenre(27);       // Horror = 27
// const romance = await fetchByGenre(10749);   // Romance = 10749
// const action = await fetchByGenre(28);       // Action = 28

// displayList(horror, 'horror-list');
// displayList(romance, 'romance-list');
// displayList(action, 'action-list');
// const vivamax = await fetchVivamax();
// displayList(vivamax, 'vivamax-list');

//     }



async function fetchTrending(type, totalPages = 3) {
  const results = [];
  const fetches = [];

  for (let page = 1; page <= totalPages; page++) {
    fetches.push(fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${page}`));
  }

  const responses = await Promise.all(fetches);
  for (const res of responses) {
    const data = await res.json();
    if (data.results) results.push(...data.results);
  }

  return results;
}

async function fetchByGenre(genreId, totalPages = 3) {
  const results = [];
  const fetches = [];

  for (let page = 1; page <= totalPages; page++) {
    fetches.push(fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`));
  }

  const responses = await Promise.all(fetches);
  for (const res of responses) {
    const data = await res.json();
    if (data.results) results.push(...data.results);
  }

  return results;
}

async function fetchTrendingAnime(totalPages = 3) {
  const results = [];
  const fetches = [];

  for (let page = 1; page <= totalPages; page++) {
    fetches.push(fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`));
  }

  const responses = await Promise.all(fetches);
  for (const res of responses) {
    const data = await res.json();
    const filtered = data.results.filter(item =>
      item.original_language === 'ja' && item.genre_ids.includes(16)
    );
    results.push(...filtered);
  }

  return results;
}




















async function init() {
  // Start all fetches in parallel
  const [movies, tvShows, anime, horror, action] = await Promise.all([
    fetchTrending('movie', 100),
    fetchTrending('tv', 100),
    fetchTrendingAnime(100),
    fetchByGenre(27, 100),
    fetchByGenre(28, 100)
  ]);

  // Display
  displayBanner(movies[Math.floor(Math.random() * movies.length)]);
  displayList(movies, 'movies-list');
  displayList(tvShows, 'tvshows-list');
  displayList(anime, 'anime-list');
  displayList(horror, 'horror-list');
  displayList(action, 'action-list');

  // Search
  document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchTMDB(true);
  });
}










    init();






































































































































