import axios from "axios";
const reposEl = document.getElementById("repos");
let modal = document.getElementById("myModal");
let modalCommit = document.getElementById("modal-commit");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const getRepos = async () => {
  const token = process.env.TOKEN;
  const result = await axios.get(
    "https://api.github.com/users/googleapis/repos?per_page=50",
    {
      method: "GET",
      Authorization: `Token ${token}`,
    }
  );

  let repos = result.data;
  // Json results for first 50 repos from googleapis
  console.log(repos);
  // looping data and displaying on html, i will not use React instead of this becuase of security and efficieny in production
  reposEl.innerHTML = repos.map((repo) => {
    return `<div>
    <div id=${
      repo.id
    } class="card m-2 " style="width: 18rem; min-height: 15rem; ">
      <div class="card-body">
        <h5 class="card-title">${repo.name}</h5>
        <p class="card-text">${
          repo.description || "A Owner not provide Description for this Repo"
        }</p>
        <a href="#" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary" data-commit=${repo.commits_url.replace(
          "{/sha}",
          ""
        )} >Commit Message</a>
      </div>
  </div>
</div>`;
  });

  // select all btns and apply click event
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const queryCommitUrl = event.target.dataset.commit;
      const resultCommit = await axios.get(
        `${queryCommitUrl}?per_page=10&sort=committer-date`,
        {
          method: "GET",
          Authorization: `Token ${token}`,
        }
      );
      console.log("commit", resultCommit.data);
      modalCommit.innerHTML = `<h3 class='text-center mb-3 bg-primary text-white'>Latest Commits Messages</h3>`;
      modalCommit.innerHTML += resultCommit.data.map((commit) => {
        return `
        <h5>${commit.commit.message || "NA"}</h5>
        `.replace(",", "");
      });
      modal.style.display = "block";
    });
  });
};
getRepos();

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
