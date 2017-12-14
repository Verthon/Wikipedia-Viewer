function grabElement(name){
    this.element = document.getElementById(name);
    return this.element;
}
function output(link, header, content){
    let template = `<li class="single-article">
    <a href="${link}" target="_blank">
      <article class="wiki-article">
        <h1 class="article-header">${header}</h1>
        <p class="article-content">${content}</p>
      </article>
    </a> 
    </li>`;
    return template;
}
let searchbar = new grabElement('searchbar');
let btn = new grabElement('submit');
let ul = new grabElement('list');
btn.addEventListener('click', search);
btn.addEventListener('submit', search);
function search(e){
    e.preventDefault();
    let input = searchbar.value;
    let req = new XMLHttpRequest();
    req.open('GET', `https://en.wikipedia.org/w/api.php?  action=opensearch&format=json&origin=*&search=${input}`);
    req.onload = function(){
        ul.innerHTML = "";
        let wikiResponse = JSON.parse(this.responseText);
        for(let i = 0; i < wikiResponse[1].length; i++){
            let article = output(wikiResponse[3][i], wikiResponse[1][i], wikiResponse[2][i]);
            ul.innerHTML += article;
            //loop add new items when you search another query, need to reset before typing new query
        }
    }   
    req.send();
}