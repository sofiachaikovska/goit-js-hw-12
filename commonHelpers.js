import{S as b,i,a as w}from"./assets/vendor-da186403.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();let n=1,c="";const f=40;l();const L={captionsData:"alt",captionsDelay:250},g=new b(".image-card",L),v=document.querySelector("form"),p=document.querySelector(".load-more");u();v.addEventListener("submit",function(s){if(s.preventDefault(),c=document.querySelector("input").value.trim(),c===""){i.error({title:"Error",message:"Please enter a search query."});return}y(),n=1,h(c,n).then(t=>{l(),t.hits.length>0?($(t.hits),g.refresh(),E()):(P(),q(),u())}).catch(t=>{l(),console.error("Error fetching images:",t.message),i.error({title:"Error",message:"An error occurred while fetching images. Please try again."})})});p.addEventListener("click",function(){y(),n++,h(c,n).then(s=>{l(),s.totalHits>0?(S(s.hits),g.refresh(),M(),s.totalHits<=n*f&&(u(),m())):(u(),m())}).catch(s=>{l(),console.error("Error fetching more images:",s.message),i.error({title:"Error",message:"An error occurred while fetching more images. Please try again."})})});function h(s,t){const o=`https://pixabay.com/api/?key=42011600-6d993b5d4f0ba2a9af1a5ffd0&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&page=${t}&per_page=${f}`;return w.get(o).then(e=>{if(e.status!==200)throw new Error(`HTTP error! Status: ${e.status}`);return e.data})}function $(s){const t=document.querySelector(".gallery");t.innerHTML="";const a=document.createElement("ul");a.className="image-list";const o=s.map(e=>`
      <li class="image-item">
        <a href="${e.largeImageURL}" class="image-card">
          <div class="image-container">
            <img src="${e.webformatURL}" alt="${e.tags}">
          </div>
          <div class="image-info">
            <span><span class="label">Likes</span> ${e.likes}</span>
            <span><span class="label">Views</span> ${e.views}</span>
            <span><span class="label">Comments</span> ${e.comments}</span>
            <span><span class="label">Downloads</span> ${e.downloads}</span>
          </div>
        </a>
      </li>
    `).join("");a.innerHTML=o,t.appendChild(a)}function S(s){const a=document.querySelector(".gallery").querySelector(".image-list"),o=s.map(e=>`
        <li class="image-item">
          <a href="${e.largeImageURL}" class="image-card">
            <div class="image-container">
              <img src="${e.webformatURL}" alt="${e.tags}">
            </div>
            <div class="image-info">
              <span><span class="label">Likes</span> ${e.likes}</span>
              <span><span class="label">Views</span> ${e.views}</span>
              <span><span class="label">Comments</span> ${e.comments}</span>
              <span><span class="label">Downloads</span> ${e.downloads}</span>
            </div>
          </a>
        </li>
      `).join("");a.insertAdjacentHTML("beforeend",o)}function q(){const s=document.querySelector(".gallery");s.innerHTML=""}function y(){const s=document.querySelector(".loader");s.style.display="block"}function l(){const s=document.querySelector(".loader");s.style.display="none"}function P(){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}function E(){p.style.visibility="visible"}function u(){p.style.visibility="hidden"}function m(){i.info({title:"Info",message:"We are sorry, but you have reached the end of search results."})}function M(){const s=document.querySelector(".image-card").getBoundingClientRect().height,t=4,o=window.scrollY+s*t;window.scrollTo({top:o,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
