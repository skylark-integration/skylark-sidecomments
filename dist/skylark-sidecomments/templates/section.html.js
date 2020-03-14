/**
 * skylark-sidecomments - A version of side-comments that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sidecomments/
 * @license MIT
 */
define([],function(){return'<div class="side-comment <%= sectionClasses %>">\n  <a href="#" class="marker">\n    <span><%= comments.length %></span>\n  </a>\n  \n  <div class="comments-wrapper">\n    <ul class="comments">\n      <% _.forEach(comments, function( comment ){ %>\n        <%= _.template(commentTemplate, { comment: comment, currentUser: currentUser }) %>\n      <% }) %>\n    </ul>\n    \n    <a href="#" class="add-comment">Leave a comment</a>\n    \n    <% if (currentUser){ %>\n      <div class="comment-form">\n        <div class="author-avatar">\n          <img src="<%= currentUser.avatarUrl %>">\n        </div>\n        <p class="author-name">\n          <%= currentUser.name %>\n        </p>\n        <input type="text" class="comment-box right-of-avatar" placeholder="Leave a comment...">\n        <div class="actions right-of-avatar">\n          <a href="#" class="action-link post">Post</a>\n          <a href="#" class="action-link cancel">Cancel</a>\n        </div>\n      </div>\n    <% } %>\n  </div>\n</div>'});
//# sourceMappingURL=../sourcemaps/templates/section.html.js.map
