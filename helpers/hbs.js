const moment = require("moment"); //to format dates

module.exports = {
  formatDate: function (date, format) {
    /*it has two parameters, first is the date that is suppose to be formatted and second is the particular format we need the date to be appear*/
    return moment(date).format(format);
  },
  truncate: function (str, len) {
    /*suppose the story is of 400 words , in that case it will overload the container thats why we are trunctating 
		the words upto a specific length (len) and replace the truncated one by ...*/
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    /*whenever user write a story in the editor it will be enclosed in tags, while displaying  the story we are replace tags with space*/
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    /*it has 4 params the_owner_of_the_story , the_logged_user , id_of_the_story and the_floating_flag */
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      /*if the_owner_of_the_story is same as the_logged_user  */
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      //no edit icon if you are not the owner of the story
      return "";
    }
  },

  /*this will come into play on the edit page when user want to select whether their story should by public or private*/
  select: function (selected, options) {
    //it will have one parameter as selected_option and the second is all_the_options (i.e public , private)
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
