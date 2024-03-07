document.addEventListener('DOMContentLoaded', function() {
    fetchVideos();
});

function fetchVideos() {
    fetch('https://doodapi.com/api/folder/list?key=371853a5wg0f549e22yrh2&fld_id=1300977')
    .then(response => response.json())
    .then(data => {
        const videoContainer = document.getElementById('videoContainer');
        if (data.result && data.result.files) {
            data.result.files.forEach(video => {
                const card = document.createElement('div');
                card.classList.add('col-md-6', 'mb-4');

                const cardContent = `
                    <div class="card">
                        <a href="video.php?id=${video.file_code}&title=${encodeURIComponent(video.title)}">
                            <img src="${video.single_img}" class="card-img-top" alt="${video.title}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="video.php?id=${video.file_code}&title=${encodeURIComponent(video.title)}">${video.title}</a>
                            </h5>
                            <p class="card-text">Duration: ${video.length} seconds</p>
                        </div>
                    </div>
                `;
                card.innerHTML = cardContent;
                videoContainer.appendChild(card);
            });
        } else {
            videoContainer.innerHTML = '<p>Failed to fetch videos.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
        document.getElementById('videoContainer').innerHTML = '<p>Failed to fetch videos.</p>';
    });
}
