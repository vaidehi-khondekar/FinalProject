// Select all unread notifications
const notifications = document.querySelectorAll('.notification.unread');
const markAllBtn = document.getElementById('markAll');

// Click on each notification → mark it read
notifications.forEach(note => {
  note.addEventListener('click', () => {
    note.classList.remove('unread');
    note.style.borderLeft = '5px solid transparent';
    note.style.opacity = '0.8';
  });
});

// "Mark All as Read" button
markAllBtn.addEventListener('click', () => {
  notifications.forEach(note => {
    note.classList.remove('unread');
    note.style.borderLeft = '5px solid transparent';
    note.style.opacity = '0.8';
  });
  alert('✅ All notifications marked as read');
});
