var cloak = (function() {

    function uncheckNav() {
      document.getElementById("navi-toggle").checked = false;
    }

    function setNavOnclick() {
      Array.from(
          document.getElementsByClassName("navigation__link")
      )
      .map(navLink => navLink.addEventListener("click", uncheckNav));
    }

    function modalVideoAnchorListener(anchor, player) {
      if ("onhashchange" in window) {
        window.onhashchange = function() {
          if (
            window.location.hash !== anchor &&
            player.getPlayerState() !== YT.PlayerState.PAUSED
          ) {
            player.stopVideo();
          }
        }
      }
    }

    function loadIFramePlayerAPI() {
      // Loads the IFrame Player API code asynchronously.
      // See: https://developers.google.com/youtube/iframe_api_reference
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function main() {
      setNavOnclick();
      loadIFramePlayerAPI(); 

      return {
        videoId: 'modal-video',
        modalVideoAnchorListener: modalVideoAnchorListener,
      }
    }

    return main();
})()

var iframePlayer;
function onYouTubeIframeAPIReady() {
  iframePlayer = new YT.Player(cloak.videoId, {});
  cloak.modalVideoAnchorListener("modal-video", iframePlayer);
}
