const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'login.html';
}

async function createPost() {
    const contentInput = document.getElementById('content');
    const content = contentInput.value.trim();

    if (!content) return;

    await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: user.id,
            content: content
        })
    });

    contentInput.value = '';
    loadPosts();
}

async function loadComments(postId) {
    const res = await fetch(`http://localhost:3000/api/comments/${postId}`);
    return await res.json();
}

async function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();

    if (!content) return;

    await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            post_id: postId,
            user_id: user.id,
            content: content
        })
    });

    loadPosts();
}

async function loadPosts() {
    const res = await fetch('http://localhost:3000/api/posts');
    const posts = await res.json();

    const container = document.getElementById('posts');
    container.innerHTML = '';

    for (const p of posts) {
        const comments = await loadComments(p.id);

        const div = document.createElement('div');
        div.className = 'post-card';

        const firstLetter = p.username ? p.username.charAt(0).toUpperCase() : '?';
        const dateText = new Date(p.created_at).toLocaleString();

        div.innerHTML = `
            <div class="post-header">
                <div class="avatar">${firstLetter}</div>
                <div>
                    <div class="post-user">${p.username}</div>
                    <div class="post-date">${dateText}</div>
                </div>
            </div>

            <div class="post-content">${p.content}</div>

            <div class="comments-box">
                <div>
                    ${comments.map(c => `<div class="comment"><b>${c.username}:</b> ${c.content}</div>`).join('')}
                </div>

                <div class="comment-form">
                    <input id="comment-input-${p.id}" placeholder="Write a comment...">
                    <button onclick="addComment(${p.id})">Send</button>
                </div>
            </div>
        `;

        container.appendChild(div);
    }
}

loadPosts();