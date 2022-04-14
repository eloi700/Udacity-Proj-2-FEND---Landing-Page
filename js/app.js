/* ------building the nav------ */

/*identify and declare the variables for the container, sections,
 create lists and links.*/

/* Global Variables*/
const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
/* an array for the links */
let menuLinks = [];

/* Dynamic nav from list, link, class*/
sections.forEach((section) => {
  /* Local Variables*/
  const menuList = document.createElement("li");
  const aLink = document.createElement("a");
  const link = document.createTextNode(".section.dataset.nav");

  /* Use appendChild to add child to ul*/
  /* Add href, dataset, class, innerHtml to the link*/
  aLink.dataset.page = section.id;
  aLink.classList.add("menu-link");
  navbarList.appendChild(menuList);
  menuList.appendChild(aLink);
  aLink.href = "#" + section.id;
  aLink.innerHTML = section.dataset.nav;

  /* add links into an array*/
  menuLinks.push(aLink);

  /* listen to click and provide smooth transition */
  aLink.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });
});

/* Threshold option that observes the scroll until it reaches 80% of the section*/
const options = {
  threshold: 0.8,
};

/* variable declaration for the observer*/
let observer = new IntersectionObserver(navScroll, options);

/* Function for scroll navigation*/
function navScroll(entries) {
  entries.forEach(function (entry) {
    /* local variables - call for the ID and the attribute */
    /* detect the element location relative to the viewport,
      use of getBoundingClientRect()*/
    const sectionID = entry.target.id;
    const activeLink = document.querySelector(`[data-page="${sectionID}"]`);
    const activeSection = document.getElementById(sectionID);

    /* remove classlist active for each section*/
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    /* remove classlist active for each link*/
    menuLinks.forEach((menuLink) => {
      menuLink.classList.remove("active");
    });

    /* add classlist active for each section & link*/
    activeSection.classList.add("active");
    activeLink.classList.add("active");
  });
}

/* spread nodelist for sections, call on function section & reverse them to establish the initiation of active state */
[...sections].reverse().forEach(function (section) {
  observer.observe(section);
});
