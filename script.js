document.addEventListener("DOMContentLoaded", function () {
    // 게시판 기능 (NEW 아이콘 추가 + 최신 글 정렬)
    const postList = document.getElementById("postList");
  
    if (postList) {
        const posts = [
            { title: "첫 번째 글", date: "2025-03-18" },
            { title: "두 번째 글", date: "2024-03-12" },
            { title: "세 번째 글", date: "2024-03-18" } // 최근 2주 이내 (NEW 추가)
        ];
  
        // 날짜 기준으로 내림차순 정렬
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        posts.forEach((post) => {
            const li = document.createElement("li");
            li.style.listStyleType = "none"; // 목록 스타일 제거 (동그라미 제거)
  
            const postDate = new Date(post.date);
            const now = new Date();
            const diffTime = Math.abs(now - postDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
            const newIconPlaceholder = document.createElement("span");
            newIconPlaceholder.classList.add("new-icon-placeholder");
            newIconPlaceholder.style.display = "inline-block";
            newIconPlaceholder.style.width = "30px"; // 고정된 공간 설정
  
            if (diffDays <= 14) { // 최근 2주 이내 글이면 NEW 아이콘 추가
                newIconPlaceholder.innerHTML = `<span class="new-icon">NEW</span>`;
            }
  
            li.innerHTML = `${newIconPlaceholder.outerHTML} <a href="post.html">${post.title}</a> <span class="post-date">${post.date}</span>`;
            postList.appendChild(li);
        });
    }
  

  // 📌 웹박수 기능 (익명 메시지 작성 + 비밀글 + 삭제 기능)
  const guestbookForm = document.getElementById("guestbookForm");
  const messageList = document.getElementById("messageList");

  if (guestbookForm && messageList) {
      let messages = JSON.parse(localStorage.getItem("guestbookMessages")) || [];

      function renderMessages() {
          messageList.innerHTML = "";
          messages.forEach((msg, index) => {
              const li = document.createElement("li");

              if (msg.isSecret) {
                  li.innerHTML = `<strong>비밀글입니다. 🔒</strong>`;
              } else {
                  li.innerHTML = `<strong>익명:</strong> ${msg.text}`;
              }

              // 관리자 삭제 버튼
              const deleteButton = document.createElement("button");
              deleteButton.innerText = "삭제";
              deleteButton.classList.add("delete-btn");
              deleteButton.onclick = function () {
                  messages.splice(index, 1);
                  localStorage.setItem("guestbookMessages", JSON.stringify(messages));
                  renderMessages();
              };

              li.appendChild(deleteButton);
              messageList.appendChild(li);
          });
      }

      guestbookForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const messageText = document.getElementById("guestbookMessage").value;
          const isSecret = document.getElementById("secretCheck").checked;

          if (!messageText.trim()) {
              alert("메시지를 입력해주세요!");
              return;
          }

          const newMessage = { text: messageText, isSecret };
          messages.unshift(newMessage);
          localStorage.setItem("guestbookMessages", JSON.stringify(messages));

          guestbookForm.reset();
          renderMessages();
      });

      renderMessages();
  }
});
