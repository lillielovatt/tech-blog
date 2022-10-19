async function deleteFormHandler(event) {
    event.preventDefault();
    // capture id of post
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    // fetch request to delete, api/posts/:id
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });
    // if successful, redirect user using document.location.replace("/dashboard")

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector(".delete-post-btn")
    .addEventListener("click", deleteFormHandler);
