module.exports = function validate(title, excerpt, body) {

    errorMessagesArray = [];

    if(!title.trim()) {
      errorMessagesArray.push("Title cannot be blank");
    }
    if(!excerpt.trim()) {
      errorMessagesArray.push("Excerpt cannot be blank");
    }
    if(!body.trim()) {
      errorMessagesArray.push("Body cannot be blank");
    }

    if(errorMessagesArray.length > 0) {
      return errorMessagesArray;
    };

};
