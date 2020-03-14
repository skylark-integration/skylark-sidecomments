/**
 * skylark-sidecomments - A version of side-comments that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sidecomments/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('templates/section.html',[], function() { return "<div class=\"side-comment <%= sectionClasses %>\">\n  <a href=\"#\" class=\"marker\">\n    <span><%= comments.length %></span>\n  </a>\n  \n  <div class=\"comments-wrapper\">\n    <ul class=\"comments\">\n      <% _.forEach(comments, function( comment ){ %>\n        <%= _.template(commentTemplate, { comment: comment, currentUser: currentUser }) %>\n      <% }) %>\n    </ul>\n    \n    <a href=\"#\" class=\"add-comment\">Leave a comment</a>\n    \n    <% if (currentUser){ %>\n      <div class=\"comment-form\">\n        <div class=\"author-avatar\">\n          <img src=\"<%= currentUser.avatarUrl %>\">\n        </div>\n        <p class=\"author-name\">\n          <%= currentUser.name %>\n        </p>\n        <input type=\"text\" class=\"comment-box right-of-avatar\" placeholder=\"Leave a comment...\">\n        <div class=\"actions right-of-avatar\">\n          <a href=\"#\" class=\"action-link post\">Post</a>\n          <a href=\"#\" class=\"action-link cancel\">Cancel</a>\n        </div>\n      </div>\n    <% } %>\n  </div>\n</div>"; });
define('skylark-sidecomments/templates/comment.html',[], function() { return "<li data-comment-id=\"<%= comment.id %>\">\n  <div class=\"author-avatar\">\n    <img src=\"<%= comment.authorAvatarUrl %>\">\n  </div>\n  <% if (comment.authorUrl) { %>\n    <a class=\"author-name right-of-avatar\" href=\"<%= comment.authorUrl %>\">\n      <%= comment.authorName %>\n    </a>\n  <% } else { %>\n    <p class=\"author-name right-of-avatar\">\n      <%= comment.authorName %>\n    </p>\n  <% } %>\n  <p class=\"comment right-of-avatar\">\n    <%= comment.comment %>\n  </p>\n  <% if (currentUser && comment.authorId === currentUser.id){ %>\n  <a href=\"#\" class=\"action-link delete\">Delete</a>\n  <% } %>\n</li>"; });
define('skylark-sidecomments/helpers/mobile-check',[],function() {

	function mobileCheck() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	return mobileCheck;
});



define('skylark-sidecomments/Section',[
	"skylark-langx/langx",
	"skylark-jquery",
	"../templates/section.html",
	"./templates/comment.html",
	"./helpers/mobile-check"
],function(langx,$,Template,CommentTemplate,mobileCheck){

	/**
	 * Creates a new Section object, which is responsible for managing a
	 * single comment section.
	 * @param {Object} eventPipe The Emitter object used for passing around events.
	 * @param {Array} comments   The array of comments for this section. Optional.
	 */
	function Section( eventPipe, $el, currentUser, comments ) {
		this.eventPipe = eventPipe;
		this.$el = $el;
		this.comments = comments ? comments.comments : [];
		this.currentUser = currentUser || null;
		this.clickEventName = mobileCheck() ? 'touchstart' : 'click';
		
		this.id = $el.data('section-id');

		this.$el.on(this.clickEventName, '.side-comment .marker', langx.proxy(this.markerClick, this));
		this.$el.on(this.clickEventName, '.side-comment .add-comment', langx.proxy(this.addCommentClick, this));
		this.$el.on(this.clickEventName, '.side-comment .post', langx.proxy(this.postCommentClick, this));
		this.$el.on(this.clickEventName, '.side-comment .cancel', langx.proxy(this.cancelCommentClick, this));
		this.$el.on(this.clickEventName, '.side-comment .delete', langx.proxy(this.deleteCommentClick, this));
		this.render();
	}

	/**
	 * Click callback event on markers.
	 * @param  {Object} event The event object.
	 */
	Section.prototype.markerClick = function( event ) {
		event.preventDefault();
		this.select();
	};

	/**
	 * Callback for the comment button click event.
	 * @param {Object} event The event object.
	 */
	Section.prototype.addCommentClick = function( event ) {
	  event.preventDefault();
	  if (this.currentUser) {
	  	this.showCommentForm();
	  } else {
	  	this.eventPipe.emit('addCommentAttempted');
	  }
	};

	/**
	 * Show the comment form for this section.
	 */
	Section.prototype.showCommentForm = function() {
	  if (this.comments.length > 0) {
	    this.$el.find('.add-comment').addClass('hide');
	    this.$el.find('.comment-form').addClass('active');
	  }

	  this.focusCommentBox();
	};

	/**
	 * Hides the comment form for this section.
	 */
	Section.prototype.hideCommentForm = function() {
	  if (this.comments.length > 0) {
	    this.$el.find('.add-comment').removeClass('hide');
	    this.$el.find('.comment-form').removeClass('active');
	  }

	  this.$el.find('.comment-box').empty();
	};

	/**
	 * Focus on the comment box in the comment form.
	 */
	Section.prototype.focusCommentBox = function() {
		// NOTE: !!HACK!! Using a timeout here because the autofocus causes a weird
		// "jump" in the form. It renders wider than it should be on screens under 768px
		// and then jumps to a smaller size.
		setTimeout(langx.proxy(function(){
			this.$el.find('.comment-box').get(0).focus();
		}, this), 300);
	};

	/**
	 * Cancel comment callback.
	 * @param  {Object} event The event object.
	 */
	Section.prototype.cancelCommentClick = function( event ) {
	  event.preventDefault();
	  this.cancelComment();
	};

	/**
	 * Cancel adding of a comment.
	 */
	Section.prototype.cancelComment = function() {
	  if (this.comments.length > 0) {
	    this.hideCommentForm();
	  } else {
	  	this.deselect();
	    this.eventPipe.emit('hideComments');
	  }
	};

	/**
	 * Post comment callback.
	 * @param  {Object} event The event object.
	 */
	Section.prototype.postCommentClick = function( event ) {
	  event.preventDefault();
	  this.postComment();
	};

	/**
	 * Post a comment to this section.
	 */
	Section.prototype.postComment = function() {
		var $commentBox = this.$el.find('.comment-box');
	  var commentBody = $commentBox.val();
	  var comment = {
	  	sectionId: this.id,
	  	comment: commentBody,
	  	authorAvatarUrl: this.currentUser.avatarUrl,
	  	authorName: this.currentUser.name,
	  	authorId: this.currentUser.id,
	  	authorUrl: this.currentUser.authorUrl || null
	  };
	  $commentBox.val(''); // Clear the comment.
	  this.eventPipe.emit('commentPosted', comment);
	};

	/**
	 * Insert a comment into this sections comment list.
	 * @param  {Object} comment A comment object.
	 */
	Section.prototype.insertComment = function( comment ) {
		this.comments.push(comment);
		var newCommentHtml = langx.template(CommentTemplate)({ 
			comment: comment,
			currentUser: this.currentUser
		});
		this.$el.find('.comments').append(newCommentHtml);
		this.$el.find('.side-comment').addClass('has-comments');
		this.updateCommentCount();
		this.hideCommentForm();
	};

	/**
	 * Increments the comment count for a given section.
	 */
	Section.prototype.updateCommentCount = function() {
		this.$el.find('.marker span').text(this.comments.length);
	};

	/**
	 * Event handler for delete comment clicks.
	 * @param  {Object} event The event object.
	 */
	Section.prototype.deleteCommentClick = function( event ) {
		event.preventDefault();
		var commentId = $(event.target).closest('li').data('comment-id');

		if (window.confirm("Are you sure you want to delete this comment?")) {
			this.deleteComment(commentId);
		}
	};

	/**
	 * Finds the comment and emits an event with the comment to be deleted.
	 */
	Section.prototype.deleteComment = function( commentId ) {
		var comment = langx.find(this.comments, function(comment) {
			return comment.id == commentId ;
		});
		comment.sectionId = this.id;
		this.eventPipe.emit('commentDeleted', comment);
	};

	/**
	 * Removes the comment from the list of comments and the comment array.
	 * @param commentId The ID of the comment to be removed from this section.
	 */
	Section.prototype.removeComment = function( commentId ) {
		this.comments = langx.filter(this.comments, function(comment) {
			return comment.id != commentId ;
		});

		this.$el.find('.side-comment .comments li[data-comment-id="'+commentId+'"]').remove();
		this.updateCommentCount();
		if (this.comments.length < 1) {
			this.$el.find('.side-comment').removeClass('has-comments');
		}
	};

	/**
	 * Mark this section as selected. Delsect if this section is already selected.
	 */
	Section.prototype.select = function() {
		if (this.isSelected()) {
			this.deselect();
			this.eventPipe.emit('sectionDeselected', this);
		} else {
			this.$el.find('.side-comment').addClass('active');

			if (this.comments.length === 0 && this.currentUser) {
			  this.focusCommentBox();
			}

			this.eventPipe.emit('sectionSelected', this);
		}
	};

	/**
	 * Deselect this section.
	 */
	Section.prototype.deselect = function() {
		this.$el.find('.side-comment').removeClass('active');
		this.hideCommentForm();
	};

	Section.prototype.isSelected = function() {
		return this.$el.find('.side-comment').hasClass('active');
	};

	/**
	 * Get the class to be used on the side comment section wrapper.
	 * @return {String} The class names to use.
	 */
	Section.prototype.sectionClasses = function() {
		var classes = '';

		if (this.comments.length > 0) {
			classes = classes + ' has-comments';
		}
		if (!this.currentUser) {
			classes = classes + ' no-current-user'
		}

		return classes;
	};

	/**
	 * Render this section into the DOM.
	 */
	Section.prototype.render = function() {
		this.$el.find('.side-comment').remove();
		$(langx.template(Template,{
		  commentTemplate: CommentTemplate,
		  comments: this.comments,
		  sectionClasses: this.sectionClasses(),
		  currentUser: this.currentUser
		})).appendTo(this.$el);
	};

	/**
	 * Desttroy this Section object. Generally meaning unbind events.
	 */
	Section.prototype.destroy = function() {
		this.$el.off();
	}

	return Section;

});

define('skylark-sidecomments/SideComments',[
  "skylark-langx/skylark",
  "skylark-langx/langx",
  "skylark-jquery",
  "./Section"
],function(skylark,langx, $, Section){

  /**
   * Creates a new SideComments instance.
   * @param {Object} el               The selector for the element for
   *                                  which side comments need to be initialized
   * @param {Object} currentUser      An object defining the current user. Used
   *                                  for posting new comments and deciding
   *                                  whether existing ones can be deleted
   *                                  or not.
   * @param {Array} existingComments An array of existing comments, in
   *                                 the proper structure.
   * 
   * TODO: **GIVE EXAMPLE OF STRUCTURE HERE***
   */

   var SideComments = langx.Emitter.inherit({
      _construct : function ( el, currentUser, existingComments ) {
        this.$el = $(el);
        this.$body = $('body');
        this.eventPipe = new langx.Emitter();

        this.currentUser = langx.clone(currentUser) || null;
        this.existingComments = langx.clone(existingComments) || [];
        this.sections = [];
        this.activeSection = null;
        
        // Event bindings
        this.eventPipe.on('showComments', langx.bind(this.showComments, this));
        this.eventPipe.on('hideComments', langx.bind(this.hideComments, this));
        this.eventPipe.on('sectionSelected', langx.bind(this.sectionSelected, this));
        this.eventPipe.on('sectionDeselected', langx.bind(this.sectionDeselected, this));
        this.eventPipe.on('commentPosted', langx.bind(this.commentPosted, this));
        this.eventPipe.on('commentDeleted', langx.bind(this.commentDeleted, this));
        this.eventPipe.on('addCommentAttempted', langx.bind(this.addCommentAttempted, this));
        this.$body.on('click', langx.bind(this.bodyClick, this));
        this.initialize(this.existingComments);
      },

      /**
       * Adds the comments beside each commentable section.
       */
      initialize : function( existingComments ) {
        var self = this;
        langx.forEach(this.$el.find('.commentable-section'), function( section ){
          var $section = $(section);
          var sectionId = $section.data('section-id').toString();
          var sectionComments = langx.find(self.existingComments, function(comment){
            return comment.sectionId == sectionId;
          });

          self.sections.push(new Section(self.eventPipe, $section, self.currentUser, sectionComments));
        });
      },

      /**
       * Shows the side comments.
       */
      showComments : function() {
        this.$el.addClass('side-comments-open');
      },

      /**
       * Hide the comments.
       */
      hideComments : function() {
        if (this.activeSection) {
          this.activeSection.deselect();
          this.activeSection = null;
        }

        this.$el.removeClass('side-comments-open');
      },

      /**
       * Callback after a section has been selected.
       * @param  {Object} section The Section object to be selected.
       */
      sectionSelected : function( e,section ) {
        this.showComments();

        if (this.activeSection) {
          this.activeSection.deselect();
        }
        
        this.activeSection = section;
      },

      /**
       * Callback after a section has been deselected.
       * @param  {Object} section The Section object to be selected.
       */
      sectionDeselected : function( e,section ) {
        this.hideComments();
        this.activeSection = null;
      },

      /**
       * Fired when the commentPosted event is triggered.
       * @param  {Object} comment  The comment object to be posted.
       */
      commentPosted : function( e,comment ) {
        this.emit('commentPosted', comment);
      },

      /**
       * Fired when the commentDeleted event is triggered.
       * @param  {Object} comment  The commentId of the deleted comment.
       */
      commentDeleted : function( e,comment ) {
        this.emit('commentDeleted', comment);
      },

      /**
       * Fire an event to to signal that a comment as attempted to be added without
       * a currentUser.
       */
      addCommentAttempted : function() {
        this.emit('addCommentAttempted');
      },

      /**
       * Inserts the given comment into the right section.
       * @param  {Object} comment A comment to be inserted.
       */
      insertComment : function( comment ) {
        var section = langx.find(this.sections, function(section){
          return section.id == comment.sectionId 
        });
        section.insertComment(comment);
      },

      /**
       * Removes the given comment from the right section.
       * @param sectionId The ID of the section where the comment exists.
       * @param commentId The ID of the comment to be removed.
       */
      removeComment : function( sectionId, commentId ) {
        var section = langx.find(this.sections, function(section){
          return section.id == sectionId 
        });
        section.removeComment(commentId);
      },

      /**
       * Delete the comment specified by the given sectionID and commentID.
       * @param sectionId The section the comment belongs to.
       * @param commentId The comment's ID
       */
      deleteComment : function( sectionId, commentId ) {
        var section = langx.find(this.sections, function(section){
          return section.id == sectionId 
        });
        section.deleteComment(commentId);
      },

      /**
       * Checks if comments are visible or not.
       * @return {Boolean} Whether or not the comments are visible.
       */
      commentsAreVisible : function() {
        return this.$el.hasClass('side-comments-open');
      },

      /**
       * Callback for body clicks. We hide the comments if someone clicks outside of the comments section.
       * @param  {Object} event The event object.
       */
      bodyClick : function( event ) {
        var $target = $(event.target);
        
        // We do a check on $('body') existing here because if the $target has
        // no parent body then it's because it belongs to a deleted comment and 
        // we should NOT hide the SideComments.
        if ($target.closest('.side-comment').length < 1 && $target.closest('body').length > 0) {
          if (this.activeSection) {
            this.activeSection.deselect();
          }
          this.hideComments();
        }
      },

      /**
       * Set the currentUser and update the UI as necessary.
       * @param {Object} currentUser The currentUser to be used.
       */
      setCurrentUser : function( currentUser ) {
        this.hideComments();
        this.currentUser = currentUser;
        langx.forEach(this.sections, function( section ) {
          section.currentUser = this.currentUser;
          section.render();
        });
      },

      /**
       * Remove the currentUser and update the UI as necessary.
       */
      removeCurrentUser : function() {
        this.hideComments();
        this.currentUser = null;
        langx.forEach(this.sections, function( section ) {
          section.currentUser = null;
          section.render();
        });
      },

      /**
       * Destroys the instance of SideComments, including unbinding from DOM events.
       */
      destroy : function() {
        this.hideComments();
        this.$el.off();
      }

   });



  return skylark.attach("intg.SlideComments", SideComments);

});

define('skylark-sidecomments/main',[
	"./SideComments"
],function(SlideComments){
	return SlideComments;
});
define('skylark-sidecomments', ['skylark-sidecomments/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-sidecomments.js.map
