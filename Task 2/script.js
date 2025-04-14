// Modal Zoom Effect for Profile Picture
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const profilePic = document.getElementById('profile-pic');
const closeBtn = document.getElementsByClassName('close')[0];

profilePic.onclick = function () {
  modal.style.display = 'block';
  modalImg.src = this.src;
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};
