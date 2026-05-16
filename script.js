const currentUser = {
  plan: "basic"
};

const lessons = [
  { title: "HTML Basics", plan: "basic", progress: 100 },
  { title: "CSS Layout", plan: "basic", progress: 40 },
  { title: "Advanced JS", plan: "pro", progress: 0 }
];

const select = document.getElementById("select");
const search = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const dashboard = document.getElementById("dashboard");

const mapping = lessons.map(lesson => {
  const badgeText = lesson.plan === "basic" ? "FREE" : "PRO";

  let progressText;
  if (lesson.progress === 100) {
    progressText = "Completed";
  } else if (lesson.progress > 0 && lesson.progress < 100) {
    progressText = "In Progress";
  } else {
    progressText = "Not Started";
  }

  let buttonText;
  if (lesson.progress === 100) {
    buttonText = "Review";
  } else if (lesson.progress > 0 && lesson.progress < 100) {
    buttonText = "Continue";
  } else {
    buttonText = "Start";
  }

  const locked = lesson.plan === "pro" && currentUser.plan === "basic";
  const statusText = locked ? "Upgrade Required" : "Available";

  return {
    title: lesson.title,
    badgeText,
    progressText,
    buttonText,
    locked,
    statusText
  };
});

function renderLessons(list) {
  dashboard.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = `${item.title} [${item.badgeText}] - ${item.progressText}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${item.statusText}`;

    const button = document.createElement("button");
    button.textContent = item.buttonText;

    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(button);

    dashboard.appendChild(card);
  });
}

function filterLessons() {
  const selectedPlan = select.value;
  const searchValue = search.value.toLowerCase().trim();

  return mapping.filter(item => {
    const matchesPlan =
      selectedPlan === "all" || item.badgeText === selectedPlan;

    const matchesSearch =
      item.title.toLowerCase().includes(searchValue);

    return matchesPlan && matchesSearch;
  });
}

function updateUI() {
  const filteredLessons = filterLessons();
  renderLessons(filteredLessons);
}


select.addEventListener("change", updateUI);

search.addEventListener("input", updateUI);

searchBtn.addEventListener("click", updateUI);

renderLessons(mapping);
