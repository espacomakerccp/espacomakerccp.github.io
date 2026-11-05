(function () {
  var top = document.getElementById("topo");
  if (top) {
    var nav = top.querySelector("nav");
    var btn = top.querySelector(".menu");
    if (btn && nav) {
      btn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
    }
    if (nav) {
      var here = location.pathname;
      [].forEach.call(nav.children, function (a) {
        var p = a.pathname.replace(/index\.html$/, "");
        var section = p.replace(/\.html$/, "");
        if (section !== "/" && here.indexOf(section) === 0) {
          a.setAttribute("aria-current", "page");
        }
      });
    }
  }

  var list = document.getElementById("lista-posts");
  var chips = document.getElementById("filtros");
  if (list && chips) {
    var articles = [].slice.call(list.querySelectorAll("article"));
    var cats = [];
    articles.forEach(function (a) {
      var c = a.getAttribute("data-categoria");
      if (c && cats.indexOf(c) === -1) cats.push(c);
    });
    chips.innerHTML = ["Todas"]
      .concat(cats)
      .map(function (c, i) {
        return (
          '<button type="button" aria-pressed="' +
          (i === 0) +
          '">' +
          c +
          "</button>"
        );
      })
      .join("");
    var empty = document.getElementById("sem-posts");
    chips.addEventListener("click", function (e) {
      if (e.target.tagName !== "BUTTON") return;
      var cat = e.target.textContent === "Todas" ? "" : e.target.textContent;
      [].forEach.call(chips.children, function (b) {
        b.setAttribute("aria-pressed", b === e.target);
      });
      var shown = 0;
      articles.forEach(function (a) {
        var show = !cat || a.getAttribute("data-categoria") === cat;
        a.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  var f = document.getElementById("agenda");
  if (f)
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(f);
      var corpo =
        "Nome: " +
        d.get("nome") +
        "\nCurso/instituição: " +
        d.get("inst") +
        "\nEquipamento: " +
        d.get("equip") +
        "\nData desejada: " +
        d.get("data") +
        "\n\nDescrição do projeto:\n" +
        d.get("desc");
      location.href =
        "mailto:espacomaker.agendamentos.ccp@uenp.edu.br?subject=" +
        encodeURIComponent("Agendamento – " + d.get("nome")) +
        "&body=" +
        encodeURIComponent(corpo);
    });
})();
