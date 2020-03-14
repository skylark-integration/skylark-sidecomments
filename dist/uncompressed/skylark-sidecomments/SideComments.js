define([
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
