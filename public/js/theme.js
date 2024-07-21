const themes = ["light", "darkmode"];

$(function () {
  let currentTheme = window.localStorage.getItem("theme") ?? themes[0];

  const setTheme = (theme) => {
    currentTheme = theme;
    window.localStorage.setItem("theme", currentTheme);

    document.getElementById("theme").href = "./css/" + currentTheme + ".css";
  };

  setTheme(currentTheme);

  $(".theme-button").on("click", () => {
    const curThemeIdx = themes.findIndex((x) => x === currentTheme);
    const newThemeIdx = (curThemeIdx + 1) % themes.length;

    setTheme(themes[newThemeIdx]);
  });
});
