/* Navbar */

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

window.addEventListener("scroll", function(){
    let header = document.querySelector("header")
    let nav = document.querySelector("#nav")
    header.classList.toggle("abajo", window.scrollY>0)
    nav.classList.toggle("abajo", window.scrollY>0);
})