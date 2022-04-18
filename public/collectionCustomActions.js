const photoDeletionBtn = document.querySelector("#show-deletion-div");
const collectionDeletionBtn = document.querySelector("#delete-collection");
const photosDiv = document.querySelector("#photosDiv");
const deleteWarnDiv = document.querySelector("#deleteWarning");
const denyDelete = document.querySelector("#denyDelete");

photoDeletionBtn.addEventListener("click", () => {
    if (photosDiv.style.display === "none" || photosDiv.style.display === "") {
        photoDeletionBtn.innerText = "HIDE PHOTOS LIST";
        photosDiv.style.display = "block";
    } else {
        photoDeletionBtn.innerText = "SHOW PHOTOS LIST";
        photosDiv.style.display = "none";
    }
});

collectionDeletionBtn.addEventListener("click", () => {
    if (deleteWarnDiv.style.display === "none" || deleteWarnDiv.style.display === "") {
        deleteWarnDiv.style.display = "block";
    } else {
        deleteWarnDiv.style.display = "none";
    }
});

denyDelete.addEventListener("click", () => {deleteWarnDiv.style.display = "none";});