/**
 * skylark-sidecomments - A version of side-comments that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sidecomments/
 * @license MIT
 */
!function(e,t){var n=t.define,require=t.require,i="function"==typeof n&&n.amd,o=!i&&"undefined"!=typeof exports;if(!i&&!n){var s={};n=t.define=function(e,t,n){"function"==typeof n?(s[e]={factory:n,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var n=t.split("/"),i=e.split("/");n.pop();for(var o=0;o<i.length;o++)"."!=i[o]&&(".."==i[o]?n.pop():n.push(i[o]));return n.join("/")}(t,e)}),resolved:!1,exports:null},require(e)):s[e]={factory:null,resolved:!0,exports:n}},require=t.require=function(e){if(!s.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=s[e];if(!module.resolved){var n=[];module.deps.forEach(function(e){n.push(require(e))}),module.exports=module.factory.apply(t,n)||null,module.resolved=!0}return module.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("templates/section.html",[],function(){return'<div class="side-comment <%= sectionClasses %>">\n  <a href="#" class="marker">\n    <span><%= comments.length %></span>\n  </a>\n  \n  <div class="comments-wrapper">\n    <ul class="comments">\n      <% _.forEach(comments, function( comment ){ %>\n        <%= _.template(commentTemplate, { comment: comment, currentUser: currentUser }) %>\n      <% }) %>\n    </ul>\n    \n    <a href="#" class="add-comment">Leave a comment</a>\n    \n    <% if (currentUser){ %>\n      <div class="comment-form">\n        <div class="author-avatar">\n          <img src="<%= currentUser.avatarUrl %>">\n        </div>\n        <p class="author-name">\n          <%= currentUser.name %>\n        </p>\n        <input type="text" class="comment-box right-of-avatar" placeholder="Leave a comment...">\n        <div class="actions right-of-avatar">\n          <a href="#" class="action-link post">Post</a>\n          <a href="#" class="action-link cancel">Cancel</a>\n        </div>\n      </div>\n    <% } %>\n  </div>\n</div>'}),e("skylark-sidecomments/templates/comment.html",[],function(){return'<li data-comment-id="<%= comment.id %>">\n  <div class="author-avatar">\n    <img src="<%= comment.authorAvatarUrl %>">\n  </div>\n  <% if (comment.authorUrl) { %>\n    <a class="author-name right-of-avatar" href="<%= comment.authorUrl %>">\n      <%= comment.authorName %>\n    </a>\n  <% } else { %>\n    <p class="author-name right-of-avatar">\n      <%= comment.authorName %>\n    </p>\n  <% } %>\n  <p class="comment right-of-avatar">\n    <%= comment.comment %>\n  </p>\n  <% if (currentUser && comment.authorId === currentUser.id){ %>\n  <a href="#" class="action-link delete">Delete</a>\n  <% } %>\n</li>'}),e("skylark-sidecomments/helpers/mobile-check",[],function(){return function(){var e=!1;return t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e;var t}}),e("skylark-sidecomments/Section",["skylark-langx/langx","skylark-jquery","../templates/section.html","./templates/comment.html","./helpers/mobile-check"],function(e,t,n,i,o){function s(t,n,i,s){this.eventPipe=t,this.$el=n,this.comments=s?s.comments:[],this.currentUser=i||null,this.clickEventName=o()?"touchstart":"click",this.id=n.data("section-id"),this.$el.on(this.clickEventName,".side-comment .marker",e.proxy(this.markerClick,this)),this.$el.on(this.clickEventName,".side-comment .add-comment",e.proxy(this.addCommentClick,this)),this.$el.on(this.clickEventName,".side-comment .post",e.proxy(this.postCommentClick,this)),this.$el.on(this.clickEventName,".side-comment .cancel",e.proxy(this.cancelCommentClick,this)),this.$el.on(this.clickEventName,".side-comment .delete",e.proxy(this.deleteCommentClick,this)),this.render()}return s.prototype.markerClick=function(e){e.preventDefault(),this.select()},s.prototype.addCommentClick=function(e){e.preventDefault(),this.currentUser?this.showCommentForm():this.eventPipe.emit("addCommentAttempted")},s.prototype.showCommentForm=function(){this.comments.length>0&&(this.$el.find(".add-comment").addClass("hide"),this.$el.find(".comment-form").addClass("active")),this.focusCommentBox()},s.prototype.hideCommentForm=function(){this.comments.length>0&&(this.$el.find(".add-comment").removeClass("hide"),this.$el.find(".comment-form").removeClass("active")),this.$el.find(".comment-box").empty()},s.prototype.focusCommentBox=function(){setTimeout(e.proxy(function(){this.$el.find(".comment-box").get(0).focus()},this),300)},s.prototype.cancelCommentClick=function(e){e.preventDefault(),this.cancelComment()},s.prototype.cancelComment=function(){this.comments.length>0?this.hideCommentForm():(this.deselect(),this.eventPipe.emit("hideComments"))},s.prototype.postCommentClick=function(e){e.preventDefault(),this.postComment()},s.prototype.postComment=function(){var e=this.$el.find(".comment-box"),t=e.val(),n={sectionId:this.id,comment:t,authorAvatarUrl:this.currentUser.avatarUrl,authorName:this.currentUser.name,authorId:this.currentUser.id,authorUrl:this.currentUser.authorUrl||null};e.val(""),this.eventPipe.emit("commentPosted",n)},s.prototype.insertComment=function(t){this.comments.push(t);var n=e.template(i)({comment:t,currentUser:this.currentUser});this.$el.find(".comments").append(n),this.$el.find(".side-comment").addClass("has-comments"),this.updateCommentCount(),this.hideCommentForm()},s.prototype.updateCommentCount=function(){this.$el.find(".marker span").text(this.comments.length)},s.prototype.deleteCommentClick=function(e){e.preventDefault();var n=t(e.target).closest("li").data("comment-id");window.confirm("Are you sure you want to delete this comment?")&&this.deleteComment(n)},s.prototype.deleteComment=function(t){var n=e.find(this.comments,function(e){return e.id==t});n.sectionId=this.id,this.eventPipe.emit("commentDeleted",n)},s.prototype.removeComment=function(t){this.comments=e.filter(this.comments,function(e){return e.id!=t}),this.$el.find('.side-comment .comments li[data-comment-id="'+t+'"]').remove(),this.updateCommentCount(),this.comments.length<1&&this.$el.find(".side-comment").removeClass("has-comments")},s.prototype.select=function(){this.isSelected()?(this.deselect(),this.eventPipe.emit("sectionDeselected",this)):(this.$el.find(".side-comment").addClass("active"),0===this.comments.length&&this.currentUser&&this.focusCommentBox(),this.eventPipe.emit("sectionSelected",this))},s.prototype.deselect=function(){this.$el.find(".side-comment").removeClass("active"),this.hideCommentForm()},s.prototype.isSelected=function(){return this.$el.find(".side-comment").hasClass("active")},s.prototype.sectionClasses=function(){var e="";return this.comments.length>0&&(e+=" has-comments"),this.currentUser||(e+=" no-current-user"),e},s.prototype.render=function(){this.$el.find(".side-comment").remove(),t(e.template(n,{commentTemplate:i,comments:this.comments,sectionClasses:this.sectionClasses(),currentUser:this.currentUser})).appendTo(this.$el)},s.prototype.destroy=function(){this.$el.off()},s}),e("skylark-sidecomments/SideComments",["skylark-langx/skylark","skylark-langx/langx","skylark-jquery","./Section"],function(e,t,n,i){var o=t.Emitter.inherit({_construct:function(e,i,o){this.$el=n(e),this.$body=n("body"),this.eventPipe=new t.Emitter,this.currentUser=t.clone(i)||null,this.existingComments=t.clone(o)||[],this.sections=[],this.activeSection=null,this.eventPipe.on("showComments",t.bind(this.showComments,this)),this.eventPipe.on("hideComments",t.bind(this.hideComments,this)),this.eventPipe.on("sectionSelected",t.bind(this.sectionSelected,this)),this.eventPipe.on("sectionDeselected",t.bind(this.sectionDeselected,this)),this.eventPipe.on("commentPosted",t.bind(this.commentPosted,this)),this.eventPipe.on("commentDeleted",t.bind(this.commentDeleted,this)),this.eventPipe.on("addCommentAttempted",t.bind(this.addCommentAttempted,this)),this.$body.on("click",t.bind(this.bodyClick,this)),this.initialize(this.existingComments)},initialize:function(e){var o=this;t.forEach(this.$el.find(".commentable-section"),function(e){var s=n(e),m=s.data("section-id").toString(),c=t.find(o.existingComments,function(e){return e.sectionId==m});o.sections.push(new i(o.eventPipe,s,o.currentUser,c))})},showComments:function(){this.$el.addClass("side-comments-open")},hideComments:function(){this.activeSection&&(this.activeSection.deselect(),this.activeSection=null),this.$el.removeClass("side-comments-open")},sectionSelected:function(e,t){this.showComments(),this.activeSection&&this.activeSection.deselect(),this.activeSection=t},sectionDeselected:function(e,t){this.hideComments(),this.activeSection=null},commentPosted:function(e,t){this.emit("commentPosted",t)},commentDeleted:function(e,t){this.emit("commentDeleted",t)},addCommentAttempted:function(){this.emit("addCommentAttempted")},insertComment:function(e){var n=t.find(this.sections,function(t){return t.id==e.sectionId});n.insertComment(e)},removeComment:function(e,n){var i=t.find(this.sections,function(t){return t.id==e});i.removeComment(n)},deleteComment:function(e,n){var i=t.find(this.sections,function(t){return t.id==e});i.deleteComment(n)},commentsAreVisible:function(){return this.$el.hasClass("side-comments-open")},bodyClick:function(e){var t=n(e.target);t.closest(".side-comment").length<1&&t.closest("body").length>0&&(this.activeSection&&this.activeSection.deselect(),this.hideComments())},setCurrentUser:function(e){this.hideComments(),this.currentUser=e,t.forEach(this.sections,function(e){e.currentUser=this.currentUser,e.render()})},removeCurrentUser:function(){this.hideComments(),this.currentUser=null,t.forEach(this.sections,function(e){e.currentUser=null,e.render()})},destroy:function(){this.hideComments(),this.$el.off()}});return e.attach("intg.SlideComments",o)}),e("skylark-sidecomments/main",["./SideComments"],function(e){return e}),e("skylark-sidecomments",["skylark-sidecomments/main"],function(e){return e})}(n),!i){var m=require("skylark-langx/skylark");o?module.exports=m:t.skylarkjs=m}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sidecomments.js.map
