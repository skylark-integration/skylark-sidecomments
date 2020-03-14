/**
 * skylark-sidecomments - A version of side-comments that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sidecomments/
 * @license MIT
 */
define([],function(){return'<li data-comment-id="<%= comment.id %>">\n  <div class="author-avatar">\n    <img src="<%= comment.authorAvatarUrl %>">\n  </div>\n  <% if (comment.authorUrl) { %>\n    <a class="author-name right-of-avatar" href="<%= comment.authorUrl %>">\n      <%= comment.authorName %>\n    </a>\n  <% } else { %>\n    <p class="author-name right-of-avatar">\n      <%= comment.authorName %>\n    </p>\n  <% } %>\n  <p class="comment right-of-avatar">\n    <%= comment.comment %>\n  </p>\n  <% if (currentUser && comment.authorId === currentUser.id){ %>\n  <a href="#" class="action-link delete">Delete</a>\n  <% } %>\n</li>'});
//# sourceMappingURL=../sourcemaps/templates/comment.html.js.map
